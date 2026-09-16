"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { LightbulbIcon, RocketIcon } from "@/components/SvgIcons";
import {
  createKnowledgeBase,
  waitUntilReady,
  generateQuestions,
  adaptQuizPairs,
  pingDeepTutor,
  listKnowledgeBases,
  type KBInfo,
} from "@/lib/deeptutor";
import { extractCoursewareText, wordlistQuiz } from "@/lib/api";
import type { Question } from "@/lib/types";
import { saveImport, getImports, isLoggedIn } from "@/lib/api";
import { useGameStore } from "@/lib/store";
import { useI18n, type MessageKey } from "@/lib/i18n";

type Phase =
  | "idle"          // pick files
  | "uploading"     // POST to sidecar
  | "indexing"      // waiting for KB ready
  | "configure"     // pick type / count / difficulty
  | "generating"    // WS stream
  | "done"          // ready to play
  | "error";

const QUESTION_TYPES = [
  { id: "choice", labelKey: "imp.qTypeChoiceLabel", descKey: "imp.qTypeChoiceDesc" },
  { id: "concept", labelKey: "imp.qTypeConceptLabel", descKey: "imp.qTypeConceptDesc" },
  { id: "fill_in_blank", labelKey: "imp.qTypeFillLabel", descKey: "imp.qTypeFillDesc" },
  { id: "short_answer", labelKey: "imp.qTypeShortLabel", descKey: "imp.qTypeShortDesc" },
] as const;

const PHASE_LABEL: Record<Phase, MessageKey> = {
  idle: "imp.phaseIdle",
  uploading: "imp.phaseUploading",
  indexing: "imp.phaseIndexing",
  configure: "imp.phaseConfigure",
  generating: "imp.phaseGenerating",
  done: "imp.phaseDone",
  error: "imp.phaseError",
};

function Spinner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`animate-spin ${className ?? ""}`} fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ImportPage() {
  const router = useRouter();
  const { t } = useI18n();
  const fileRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<"upload" | "paste">("upload");
  const [pasteText, setPasteText] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [sidecarUp, setSidecarUp] = useState<boolean | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [kbName, setKbName] = useState("");
  const [statusText, setStatusText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [generatedCount, setGeneratedCount] = useState(0);
  const [topic, setTopic] = useState("");
  const [wordList, setWordList] = useState<string[] | null>(null);
  const [qType, setQType] = useState<(typeof QUESTION_TYPES)[number]["id"]>("choice");
  const [count, setCount] = useState(5);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [existingKbs, setExistingKbs] = useState<KBInfo[]>([]);

  // Deep-link: /import?mode=paste opens the paste tab; ?topic= prefills the topic
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "paste") setMode("paste");
    const topicParam = params.get("topic");
    if (topicParam) setTopic(topicParam);
  }, []);

  // Reusable knowledge bases: the sidecar lists ALL KBs (no user isolation),
  // so intersect with MY import records to show only personal uploads
  useEffect(() => {
    if (phase !== "idle" || !isLoggedIn()) return;
    (async () => {
      const [kbs, imports] = await Promise.all([
        listKnowledgeBases(),
        getImports().catch(() => []),
      ]);
      const myKbNames = new Set(imports.map((im) => im.kb_name).filter(Boolean) as string[]);
      setExistingKbs(kbs.filter((k) => myKbNames.has(k.name)).slice(0, 6));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const reuseKb = async (kb: KBInfo) => {
    setPhase("uploading");
    setStatusText(t("imp.reusingKb"));
    // The KB list itself came from the sidecar — no need to re-probe health
    setSidecarUp(true);
    try {
      setPhase("indexing");
      setStatusText(t("imp.statusIndexing"));
      await waitUntilReady(kb.name, (p) => {
        const pct = typeof p.progress_percent === "number" ? p.progress_percent : 100;
        setStatusText(`${t("imp.indexingPct")} ${pct}%`);
      });
      setKbName(kb.name);
      setFiles([new File([], `${kb.name.replace(/^import-/, "")}.txt`)]);
      setPhase("configure");
      if (!topic) setTopic(kb.name.replace(/^import-/, ""));
    } catch (e) {
      setPhase("error");
      setErrorMsg(e instanceof Error ? e.message : String(e));
    }
  };

  const ensureSidecar = useCallback(async () => {
    if (sidecarUp !== null) return sidecarUp;
    const ok = await pingDeepTutor();
    setSidecarUp(ok);
    return ok;
  }, [sidecarUp]);

  /** A word list is mostly single short tokens, one per line, no sentences. */
  const asWordList = (text: string): string[] | null => {
    const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
    if (lines.length < 8) return null;
    const wordish = lines.filter((l) => /^[A-Za-z][A-Za-z'\- ]{0,30}$/.test(l));
    if (wordish.length / lines.length >= 0.7) return wordish;
    return null;
  };

  const ingest = async (picked: File[]) => {
    if (!picked.length) return;
    setFiles(picked);
    setPhase("uploading");
    setStatusText(t("imp.statusConnecting"));

    const up = await ensureSidecar();
    if (!up) {
      setPhase("error");
      setErrorMsg(
        `${t("imp.errUnreachable")}\ndocker compose -f docker-compose.deeptutor.yml up -d`
      );
      return;
    }

    try {
      // Images have no server-side parser — OCR them via the vision model and
      // feed the transcription to the KB as plain text instead.
      const imgs = picked.filter((f) => f.type.startsWith("image/"));
      let toUpload = picked;
      if (imgs.length) {
        setStatusText(t("imp.statusOcr"));
        const texts = await Promise.all(
          imgs.map((f) => extractCoursewareText(f).catch(() => ({ text: "", name: f.name })))
        );
        const ocrTxt = texts
          .map((r, i) => `【${r.name || `image-${i + 1}`}】\n${r.text}`)
          .filter((s) => s.replace(/\W/g, "").length > 40)
          .join("\n\n");
        if (!ocrTxt) throw new Error("Could not read any text from the image(s)");
        // Anchor the quiz on real content, never on the synthesized filename.
        if (!topic) setTopic(ocrTxt.split(/\n+/).filter(Boolean).slice(0, 8).join(", ").slice(0, 90));
        setWordList(asWordList(ocrTxt));
        const rest = picked.filter((f) => !f.type.startsWith("image/"));
        // Unique name per batch — a fixed "photos.txt" would funnel every
        // image upload into the same KB and pollute later quizzes.
        const stamp = Date.now().toString(36);
        toUpload = [...rest, new File([ocrTxt], `photos-${stamp}.txt`, { type: "text/plain" })];
      }

      const kb = `import-${toUpload[0].name.replace(/\W+/g, "-").slice(0, 30).toLowerCase()}-${Date.now().toString(36)}`;
      setKbName(kb);
      setStatusText(`${t("imp.statusUploadingPrefix")}${toUpload.length}${t("imp.statusUploadingSuffix")}`);
      await createKnowledgeBase(kb, toUpload);

      setPhase("indexing");
      setStatusText(t("imp.statusIndexing"));
      await waitUntilReady(kb, (p) => {
        const pct = typeof p.progress_percent === "number" ? p.progress_percent : 0;
        setStatusText(`${t("imp.indexingPct")} ${pct}%`);
      });

      setPhase("configure");
      if (!topic) setTopic(picked[0].name.replace(/\.[^.]+$/, ""));
    } catch (e) {
      setPhase("error");
      setErrorMsg(e instanceof Error ? e.message : String(e));
    }
  };

  const onPickFiles = (list: FileList | null) => ingest(Array.from(list ?? []));

  // Paste flow: wrap the pasted text in a .txt File and reuse the same pipeline
  const startPaste = () => {
    const text = pasteText.trim();
    if (text.length < 20) {
      setErrorMsg(t("imp.pasteTooShort"));
      setPhase("error");
      return;
    }
    if (!topic) setTopic(text.split(/\n+/).filter(Boolean).slice(0, 8).join(", ").slice(0, 90));
    setWordList(asWordList(text));
    const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    ingest([new File([text], `pasted-${stamp}.txt`, { type: "text/plain" })]);
  };

  const startGeneration = async () => {
    setPhase("generating");
    setStatusText(t("imp.statusGenerating"));
    try {
      let kb = kbName || `import-${(files[0]?.name ?? "upload").replace(/\W+/g, "-").slice(0, 30).toLowerCase()}`;
      let pairs;
      if (wordList && wordList.length >= 4) {
        // Word lists (OCR'd vocab sheets) get dedicated generation — the RAG
        // agent plans poorly from bare word lists.
        setStatusText(t("imp.statusWordlist"));
        pairs = (await wordlistQuiz(wordList, count)).pairs;
      } else {
        setKbName(kb);
        pairs = await generateQuestions(
          {
            kbName: kb,
            topic: topic || files[0]?.name || "English practice",
            count,
            difficulty,
            questionType: qType,
          },
        );
      }

      const questions = adaptQuizPairs(pairs);
      if (!questions.length) throw new Error(t("imp.errNoQuestions"));
      setGeneratedCount(questions.length);

      // Convert DeepTutor format → store Question format (choices/correctIndex).
      // Typed questions keep the freeform answer → QuizScreen renders a text input.
      const storeQuestions: Question[] = questions.map((q, i) => {
        const common = {
          id: q.id || `import-${i}`,
          wordId: `import-${i}`,
          type: "word-to-cn" as const,
          prompt: q.prompt,
          explanation: q.explanation,
        };
        if (q.type === "typed") {
          return {
            ...common,
            promptSub: t("imp.typeAnswer"),
            choices: [q.answer ?? ""],
            correctIndex: 0,
            answer: q.answer,
          };
        }
        return {
          ...common,
          promptSub: undefined,
          choices: q.options ?? ["True", "False"],
          correctIndex: q.answerIndex ?? 0,
        };
      });

      sessionStorage.setItem(
        "lexi-import-quiz",
        JSON.stringify({ deckTitle: topic || t("imp.imported"), kbName: kb, questions: storeQuestions }),
      );

      // Also save to server for history (fire-and-forget)
      saveImport({
        fileName: files[0]?.name ?? "upload",
        topic: topic || t("imp.imported"),
        questionType: qType,
        questionCount: storeQuestions.length,
        questions: storeQuestions,
        kbName: kb,
      }).catch(() => { /* server history is best-effort */ });

      // Save as a user deck so it shows in My decks and stays replayable
      useGameStore.getState().addUserDeck(topic || files[0]?.name || t("imp.imported"), storeQuestions, "rocket", "#7c3aed");

      setPhase("done");
    } catch (e) {
      setPhase("error");
      setErrorMsg(e instanceof Error ? e.message : String(e));
    }
  };

  const busy = phase === "uploading" || phase === "indexing" || phase === "generating";

  return (
    <AppShell>
      <div className="page-shell">
        <PageHeader badge="📥 UPLOAD COURSEWARE" title={t("imp.title")} />

        {/* Mode tabs — upload / paste */}
        <div className="mb-4 flex gap-1 rounded-pill bg-canvas p-1">
          {(["upload", "paste"] as const).map((m) => (
            <button
              key={m}
              type="button"
              disabled={busy}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-pill py-2 text-sm font-bold transition ${
                mode === m ? "bg-gold text-primary shadow-[0_2px_0_0_rgba(0,0,0,0.12)]" : "text-tertiary hover:text-secondary"
              }`}
            >
              {t(m === "upload" ? "imp.tabUpload" : "imp.tabPaste")}
            </button>
          ))}
        </div>

        {mode === "upload" ? (
        /* Hero — upload prompt */
        <section className="g-card-hero relative overflow-hidden p-6 pt-2 text-center">
          <div>
            <RocketIcon size={32} className="mx-auto text-brand-text" />
          </div>
          <h2 className="mt-2 font-booster text-[22px] font-extrabold text-primary">
            {t("imp.uploadTitle")}
          </h2>
          <p className="mt-1 text-sm text-secondary">
            {t("imp.uploadHint")}
          </p>

          <input
            ref={fileRef}
            type="file"
            multiple
            accept=".pdf,.docx,.txt,.md,.pptx,.csv,.json,.html,.epub,.zip,image/*"
            className="hidden"
            onChange={(e) => onPickFiles(e.target.files)}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
            className="mt-4 rounded-pill bg-brand px-5 py-2.5 text-sm font-bold text-white shadow transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          >
            {files.length ? <>{t("imp.fileCountPrefix")}{files.length}{t("imp.fileCountSuffix")}</> : t("imp.chooseFiles")}
          </button>
          <p className="mt-2 text-[11px] text-tertiary">
            {t("imp.photoHint")}
          </p>
        </section>
        ) : (
        /* Paste — text input for vocabulary lists / articles */
        <section className="g-card-hero overflow-hidden p-6 pt-4">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-brand-text" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 2h6v4H9zM9 12h6M9 16h4" />
            </svg>
            <h2 className="font-booster text-[18px] font-extrabold text-primary">
              {t("imp.pasteTitle")}
            </h2>
          </div>
          <p className="mt-1 text-xs text-tertiary">{t("imp.pasteHint")}</p>
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder={t("imp.pastePlaceholder")}
            rows={7}
            disabled={busy}
            className="mt-3 w-full resize-y rounded-xl border border-subtle bg-app px-3 py-2.5 text-sm text-primary outline-none placeholder:text-tertiary focus:border-brandborder disabled:opacity-50"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-tertiary">{pasteText.trim().length} {t("imp.pasteChars")}</span>
            <button
              type="button"
              disabled={busy || !pasteText.trim()}
              onClick={startPaste}
              className="rounded-pill bg-brand px-5 py-2.5 text-sm font-bold text-white shadow transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
            >
              {t("imp.pasteStart")}
            </button>
          </div>
        </section>
        )}

        {/* Pipeline status */}
        {phase !== "idle" && phase !== "error" && (
          <div className="mt-4 g-card p-4">
            {busy ? (
              <div className="flex items-center gap-3">
                <Spinner className="h-5 w-5 shrink-0 text-brand-text" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold capitalize">{t(PHASE_LABEL[phase])}</p>
                  <p className="text-xs text-tertiary">{statusText}</p>
                </div>
              </div>
            ) : phase === "configure" ? (
              <p className="text-sm font-semibold text-positive">{t("imp.indexedConfigure")}</p>
            ) : (
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-positive text-white">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                </span>
                <div>
                  <p className="text-sm font-semibold">{t("imp.generatedPrefix")}{generatedCount}{t("imp.questionsSuffix")}</p>
                  <p className="text-xs text-tertiary">{t("imp.readyToPlay")}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {phase === "error" && (
          <div className="mt-4 rounded-2xl border border-critical bg-surface p-4">
            <p className="text-sm font-bold text-critical">{t("imp.errorTitle")}</p>
            <p className="mt-1 whitespace-pre-line break-words text-xs text-secondary">{errorMsg}</p>
            <button onClick={() => { setPhase("idle"); setFiles([]); setErrorMsg(""); }} className="mt-3 rounded-pill border border-subtle px-4 py-1.5 text-xs font-bold hover:bg-canvas">
              {t("imp.startOver")}
            </button>
          </div>
        )}

        {/* Configure: topic / type / count / difficulty */}
        {phase === "configure" && (
          <section className="mt-4 g-card flex flex-col gap-4 p-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-tertiary">{t("imp.topic")}</span>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t("imp.topicPlaceholder")}
                className="rounded-xl border border-subtle bg-app px-3 py-2 text-sm outline-none focus:border-brandborder"
              />
            </label>

            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-tertiary">{t("imp.questionType")}</span>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {QUESTION_TYPES.map((qt) => (
                  <button
                    key={qt.id}
                    onClick={() => setQType(qt.id)}
                    className={`rounded-xl border p-3 text-left text-xs transition ${
                      qType === qt.id
                        ? "border-brandborder bg-brand-subtle"
                        : "border-subtle bg-app hover:bg-canvas"
                    }`}
                  >
                    <p className="font-bold">{t(qt.labelKey)}</p>
                    <p className="text-tertiary">{t(qt.descKey)}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <label className="flex flex-1 flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-tertiary">{t("imp.countLabel")}{count}</span>
                <input type="range" min={1} max={20} value={count} onChange={(e) => setCount(Number(e.target.value))}
                  className="accent-brand" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-tertiary">{t("imp.difficulty")}</span>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
                  className="rounded-xl border border-subtle bg-app px-3 py-2 text-sm outline-none">
                  <option value="easy">{t("imp.diffEasy")}</option>
                  <option value="medium">{t("imp.diffMedium")}</option>
                  <option value="hard">{t("imp.diffHard")}</option>
                </select>
              </label>
            </div>

            <button
              onClick={startGeneration}
              className="rounded-pill bg-action py-3 font-booster font-extrabold text-white transition hover:bg-actionhover active:scale-[0.98]"
            >
              {t("imp.generate")}
            </button>
          </section>
        )}

        {/* Done → play */}
        {phase === "done" && (
          <button
            onClick={() => router.push("/quiz?src=import")}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-pill bg-positive py-3.5 font-booster text-base font-extrabold text-white transition active:scale-[0.98]"
          >
            {t("imp.playNow")}
          </button>
        )}

        {/* Reusable knowledge bases — skip re-upload & re-indexing */}
        {phase === "idle" && existingKbs.length > 0 && (
          <div className="mt-4 g-card p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-tertiary">{t("imp.recentKbs")}</p>
            <div className="flex flex-col gap-1.5">
              {existingKbs.map((kb) => (
                <button
                  key={kb.name}
                  onClick={() => reuseKb(kb)}
                  className="flex items-center gap-2.5 rounded-xl border border-subtle bg-app px-3 py-2.5 text-left transition hover:bg-canvas"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-text" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  <span className="min-w-0 flex-1 truncate text-sm font-bold text-primary">
                    {kb.name.replace(/^import-/, "")}
                  </span>
                  <span className="text-xs font-bold text-brand-text">{t("imp.reuse")}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        {phase === "idle" && (
          <div className="mt-6 g-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <LightbulbIcon size={18} className="text-gold" />
              <span className="text-sm font-bold text-primary">{t("imp.tipsTitle")}</span>
            </div>
            <ul className="text-xs text-tertiary space-y-1">
              <li>{t("imp.tip1")}</li>
              <li>{t("imp.tip2")}</li>
              <li>{t("imp.tip3")}</li>
              <li>{t("imp.tip4")}</li>
            </ul>
          </div>
        )}
      </div>
    </AppShell>
  );
}
