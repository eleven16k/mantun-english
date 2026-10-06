"use client";

/**
 * /scenarios/[id] — scenario session: mission briefing → NPC chat with
 * live voice call. Ported from NovaWorld: structured EN/translation/tip
 * replies, suggestion on your message, target-vocab highlighting, Gemini
 * TTS replay, and realtime voice calls via the speech-to-speech engine.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SparklesIcon, FileTextIcon, PhoneIcon } from "@/components/icons";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ScenarioCallOverlay, type CallTranscriptRow } from "@/components/scenarios/ScenarioCallOverlay";
import { DemoStage, DrillStage, StageBar, VocabStage, type LessonStageName } from "@/components/scenarios/LessonStages";
import { scenarioById, scenarioImg, buildCallInstructions, type Scenario, type VocabLevel } from "@/lib/scenarios";
import { lessonFor } from "@/lib/scenario-lessons";
import { fetchCustomScenarios } from "@/lib/api";
import { kv } from "@/lib/kv";
import { useI18n } from "@/lib/i18n";
import { lookupLexicon } from "@/lib/lexicon";
import { chatWithNpc, generateScenarioVocab, scenarioTTS, bankScenarioReward, translateScenarioText } from "@/lib/api";
import { playPcm } from "@/lib/tts";
import { useGameStore } from "@/lib/store";

const LEVEL_KEY = "lexi-scenario-level";
const CUSTOM_VOCAB_KEY = "lexi-scenario-custom-vocab";
// S1 四段式：完成标记 + 断点（中途退出可续）
const lessonDoneKey = (id: string) => `lexi-lesson-done:${id}`;
const lessonStageKey = (id: string) => `lexi-lesson-stage:${id}`;

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: number;
  suggestion?: string;
}

// Unique per-message key — timestamps collide when call-transcript rows are
// appended in one batch, so playback/translation state keys on this instead.
let msgSeq = 0;
const mkMsgId = () => `m${Date.now().toString(36)}-${msgSeq++}`;

export default function ScenarioSessionPage() {
  const { id } = useParams<{ id: string }>();
  const { t, locale } = useI18n();
  const [customScenario, setCustomScenario] = useState<Scenario | null>(null);
  const scenario = scenarioById(id) ?? customScenario;

  // Courseware-generated scenarios live server-side — fetch when not static.
  useEffect(() => {
    if (scenarioById(id)) return;
    let alive = true;
    fetchCustomScenarios()
      .then((list) => {
        if (alive) setCustomScenario(list.find((s) => s.id === id) ?? null);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [id]);

  const [briefing, setBriefing] = useState(true);
  const [level, setLevel] = useState<VocabLevel>("JuniorHigh");
  const [dynamicVocab, setDynamicVocab] = useState<string[]>([]);
  const [isGeneratingVocab, setIsGeneratingVocab] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [transShown, setTransShown] = useState<Record<string, boolean>>({});
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [translatingId, setTranslatingId] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [inCall, setInCall] = useState(false);
  const [callToast, setCallToast] = useState<string | null>(null);
  // S1 四段式：null = 不上课/已上完（直达 chat）；demo→drill→vocab→null(实战)
  const lesson = useMemo(() => (scenario ? lessonFor(scenario.id) : undefined), [scenario]);
  const [stage, setStage] = useState<LessonStageName | null>(null);

  const masteredRef = useRef<Set<string>>(new Set());
  const recognitionRef = useRef<{ start: () => void; stop: () => void } | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  // Playback handles — the cancel hook of the in-flight clip plus a
  // generation token so a superseded replay can never start playing.
  const speakingRef = useRef<string | null>(null);
  const stopAudioRef = useRef<(() => void) | null>(null);
  const replayTokenRef = useRef(0);

  const customVocab = useMemo(
    () => (customInput ? customInput.split(/[,\n\s]+/).map((w) => w.trim()).filter(Boolean) : []),
    [customInput]
  );
  const mergedVocab = useMemo(
    () => [...(scenario?.targetVocab ?? []), ...dynamicVocab, ...customVocab],
    [scenario, dynamicVocab, customVocab]
  );
  const vocabSet = useMemo(() => new Set(mergedVocab.map((w) => w.toLowerCase())), [mergedVocab]);

  // Restore level + custom vocab from the world-map page
  useEffect(() => {
    const savedLevel = kv.getItem(LEVEL_KEY) as VocabLevel | null;
    if (savedLevel) setLevel(savedLevel);
    const savedVocab = kv.getItem(CUSTOM_VOCAB_KEY) as string | null;
    if (savedVocab) setCustomInput(savedVocab.split(",").join(", "));
  }, []);

  // Mission briefing: generate the level-appropriate target list
  useEffect(() => {
    if (!briefing || !scenario) return;
    setIsGeneratingVocab(true);
    generateScenarioVocab(scenario.id, level)
      .then((res) => setDynamicVocab(res.vocab))
      .catch(() => setDynamicVocab(scenario.targetVocab))
      .finally(() => setIsGeneratingVocab(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [briefing, scenario?.id, level]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // SpeechRecognition dictation (Chrome/Safari)
  useEffect(() => {
    const w = window as unknown as Record<string, unknown>;
    const SR = (w.SpeechRecognition ?? w.webkitSpeechRecognition) as
      | (new () => {
          continuous: boolean;
          interimResults: boolean;
          lang: string;
          onresult: (e: { results: { [k: number]: { [j: number]: { transcript: string } } } }) => void;
          onerror: (e: { error: string }) => void;
          onend: () => void;
          start: () => void;
          stop: () => void;
        })
      | undefined;
    if (!SR) return;
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";
    rec.onresult = (e) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
      setMicError(null);
    };
    rec.onerror = (e) => {
      setListening(false);
      if (e.error === "not-allowed") setMicError(t("scn.micDenied"));
    };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Words from the vocab list that appear in a user utterance (new ones only). */
  const collectMastered = useCallback(
    (utterance: string): string[] => {
      const lower = utterance.toLowerCase();
      const found: string[] = [];
      for (const word of mergedVocab) {
        const w = word.toLowerCase();
        if (w && lower.includes(w) && !masteredRef.current.has(w)) {
          masteredRef.current.add(w);
          found.push(w);
        }
      }
      return found;
    },
    [mergedVocab]
  );

  const bankReward = useCallback(
    async (mode: "chat" | "call", turns: number, xp: number, coins: number, mastered: string[], transcript?: unknown[]) => {
      if (!scenario) return;
      try {
        const res = await bankScenarioReward({
          scenarioId: scenario.id,
          mode,
          turns,
          xp,
          coins,
          masteredWords: mastered,
          transcript,
          clientToken: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : undefined,
        });
        useGameStore.setState((s) => ({ coins: s.coins + coins, scorePoints: s.scorePoints + xp }));
        return res;
      } catch {
        // offline-friendly: rewards stay local-only
      }
    },
    [scenario]
  );

  const startBriefing = () => {
    if (!scenario) return;
    setBriefing(false);
    // S1：有课程内容且没上过（或上次中途退出）→ 进四段流程；否则直达 chat。
    if (lesson) {
      const done = kv.getItem(lessonDoneKey(scenario.id)) === "1";
      const saved = kv.getItem(lessonStageKey(scenario.id)) as string | null;
      const resumeStage = !done && saved && ["demo", "drill", "vocab"].includes(saved) ? (saved as LessonStageName) : null;
      if (!done || resumeStage) {
        setStage(resumeStage ?? "demo");
        return;
      }
    }
    const greeting = `Hello! I'm ${scenario.npc}, the ${scenario.npcRole.en}. Welcome to ${scenario.location.en}. How can I help you today?`;
    const translation = `你好！我是 ${scenario.npc}，${scenario.npcRole.zh}。欢迎来到 ${scenario.location.zh}。今天我能帮你什么吗？`;
    const tip = locale === "zh" ? "[Tip: 用英语向 NPC 打个招呼，告诉他们你需要什么。]" : "[Tip: Greet the NPC and tell them what you need.]";
    setMessages([{ id: mkMsgId(), role: "model", text: `${greeting} \n--- \n ${translation} \n--- \n ${tip}`, timestamp: Date.now() }]);
  };

  // S1 断点：段切换时记录，完成时清掉
  const gotoStage = (next: LessonStageName | null) => {
    if (!scenario) return;
    if (next === null) {
      kv.setItem(lessonDoneKey(scenario.id), "1");
      kv.removeItem(lessonStageKey(scenario.id));
      setStage(null);
      startBriefing();
      return;
    }
    kv.setItem(lessonStageKey(scenario.id), next);
    setStage(next);
  };

  const retakeLesson = () => {
    if (!scenario) return;
    kv.removeItem(lessonDoneKey(scenario.id));
    kv.removeItem(lessonStageKey(scenario.id));
    setMessages([]);
    setStage("demo");
  };

  const sendMessage = async () => {
    if (!input.trim() || !scenario || isLoading) return;
    const userMessage: Message = { id: mkMsgId(), role: "user", text: input, timestamp: Date.now() };
    const mastered = collectMastered(input);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, text: m.text }));
      const reply = await chatWithNpc({
        scenarioId: scenario.id,
        history,
        message: userMessage.text,
        level,
        customVocab: mergedVocab,
        locale,
      });
      setMessages((prev) => {
        const next = [...prev];
        const lastUser = next.map((m) => m.role).lastIndexOf("user");
        if (lastUser >= 0 && reply.userSuggestion) {
          next[lastUser] = { ...next[lastUser], suggestion: reply.userSuggestion };
        }
        return [...next, { id: mkMsgId(), role: "model", text: reply.npcResponse, timestamp: Date.now() }];
      });
      void bankReward("chat", 1, 10, 2, mastered);
    } catch {
      const msg = locale === "zh" ? "AI 服务暂时不可用，请稍后再试。" : "AI is unavailable right now — try again shortly.";
      setMessages((prev) => [...prev, { id: mkMsgId(), role: "model", text: msg, timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  /** Stop any in-flight playback (server PCM or browser TTS) and reset state. */
  const stopSpeaking = useCallback(() => {
    replayTokenRef.current += 1; // invalidate any replay still awaiting TTS
    stopAudioRef.current?.();
    stopAudioRef.current = null;
    try {
      window.speechSynthesis?.cancel();
    } catch {
      // speechSynthesis unavailable — nothing to cancel
    }
    speakingRef.current = null;
    setSpeakingId(null);
  }, []);

  // Leave the page → no dangling audio.
  useEffect(() => () => stopSpeaking(), [stopSpeaking]);

  // TTS 播放：服务端神经 TTS 优先（ZENMUX/Gemini），失败降级浏览器
  // speechSynthesis（en-US）——保证喇叭按钮任何情况下都有声音。
  // 每个气泡的播放按钮相互独立：再点同一气泡停止，点其他气泡打断
  // 当前播放并切换；播完自动复位，不会卡住其他按钮。
  const replay = async (msg: Message) => {
    if (speakingRef.current === msg.id) {
      stopSpeaking();
      return;
    }
    stopSpeaking();
    const token = ++replayTokenRef.current;
    speakingRef.current = msg.id;
    setSpeakingId(msg.id);
    // 只朗读英文部分（--- 之后的翻译/提示不读）
    const english = msg.text.split("---")[0].trim();
    try {
      const { audio, sampleRate } = await scenarioTTS(english);
      if (token !== replayTokenRef.current) return; // 已被更新的操作取代
      if (audio) {
        await playPcm(audio, sampleRate, (cancel) => {
          stopAudioRef.current = cancel;
        });
        if (speakingRef.current === msg.id) {
          speakingRef.current = null;
          setSpeakingId(null);
        }
        return;
      }
    } catch {
      // fall through to browser TTS
    }
    if (token !== replayTokenRef.current) return;
    try {
      window.speechSynthesis?.cancel();
      const u = new SpeechSynthesisUtterance(english);
      u.lang = "en-US";
      u.rate = 0.9;
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find((v) => /en[-_]US/i.test(v.voiceURI) || /en[-_]US/i.test(v.lang)) ?? voices.find((v) => v.lang.startsWith("en"));
      if (preferred) u.voice = preferred;
      u.onend = () => {
        if (speakingRef.current === msg.id) stopSpeaking();
      };
      stopAudioRef.current = () => window.speechSynthesis?.cancel();
      window.speechSynthesis.speak(u);
    } catch {
      if (speakingRef.current === msg.id) stopSpeaking();
    }
  };

  /** Toggle the translation card under a bubble. NPC replies carry a Chinese
   *  translation after '---'; everything else (user messages, call
   *  transcript rows) is translated on demand and cached per message. */
  const toggleTranslation = async (msg: Message) => {
    const embedded = msg.text.split("---")[1]?.trim();
    if (!embedded && translations[msg.id] === undefined && translatingId !== msg.id) {
      setTranslatingId(msg.id);
      try {
        const res = await translateScenarioText(msg.text.trim());
        setTranslations((prev) => ({ ...prev, [msg.id]: res.translation }));
      } catch {
        setTranslations((prev) => ({
          ...prev,
          [msg.id]: locale === "zh" ? "（翻译暂时不可用，请稍后再试）" : "(Translation unavailable — try again shortly)",
        }));
      } finally {
        setTranslatingId(null);
      }
    }
    setTransShown((prev) => {
      const next = { ...prev };
      if (next[msg.id]) {
        delete next[msg.id];
      } else {
        next[msg.id] = true;
      }
      return next;
    });
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
    } else {
      setMicError(null);
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const endCall = async (transcript: CallTranscriptRow[]) => {
    setInCall(false);
    if (!scenario) return;
    if (transcript.length > 0) {
      setMessages((prev) => [
        ...prev,
        ...transcript.map((r) => ({
          id: mkMsgId(),
          role: r.role === "user" ? ("user" as const) : ("model" as const),
          text: r.text,
          timestamp: Date.now(),
        })),
      ]);
      const userTurns = transcript.filter((r) => r.role === "user");
      const mastered = userTurns.map((r) => collectMastered(r.text)).flat();
      const xp = userTurns.length * 10;
      const coins = Math.min(20, userTurns.length * 2);
      await bankReward("call", userTurns.length, xp, coins, mastered, transcript);
      setCallToast(t("scn.callEndedHint").replace("{coins}", String(coins)));
      setTimeout(() => setCallToast(null), 4000);
    }
  };

  if (!scenario) {
    return (
      <AppShell>
        <div className="grid h-dvh place-items-center text-sm text-tertiary">
          <div className="space-y-3 text-center">
            <p>Scenario not found.</p>
            <Link href="/scenarios" className="text-brand-text underline">
              {t("scn.backToMap")}
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const renderHighlighted = (text: string) =>
    text.split(/(\b[\w-]+\b)/g).map((part, i) =>
      vocabSet.has(part.toLowerCase()) ? (
        <span
          key={i}
          className="cursor-pointer rounded bg-brand-subtle px-0.5 font-bold text-brand-text underline decoration-dotted underline-offset-4"
        >
          {part}
        </span>
      ) : (
        part
      )
    );

  /** Translation card — same style as the briefing greeting's example. */
  const renderTranslationCard = (text: string) => (
    <div className="rounded-xl border border-subtle bg-canvas p-2.5 text-xs leading-relaxed text-tertiary">
      <p className="mb-1 text-[8px] font-black uppercase tracking-[0.2em] text-brand-text/50">
        {t("scn.translation")}
      </p>
      {text}
    </div>
  );

  /** Split NPC reply into EN / translation / tip segments. The translation
   *  only renders when the learner toggles it via the bubble's button. */
  const renderNpcMessage = (msg: Message, showTranslation: boolean) => {
    const segments = msg.text.split("---").map((s) => s.trim());
    const en = segments[0] ?? msg.text;
    const translation = segments[1];
    const tip = segments[2];
    return (
      <div className="space-y-2.5">
        <p className="text-sm font-medium leading-relaxed">{renderHighlighted(en)}</p>
        {showTranslation && translation && renderTranslationCard(translation)}
        {tip && (
          <div className="flex items-start gap-2 rounded-xl border border-brandborder/30 bg-brand-subtle/60 p-2.5 text-[11px] font-medium leading-relaxed text-brand-text">
            <span aria-hidden><SparklesIcon size={16} /></span>
            <p>{tip}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <AppShell>
      <div className="mx-auto flex h-full max-w-5xl flex-col px-4 pb-24 pt-20 lg:px-8 lg:pt-24">
        {/* Header */}
        <header className="mb-4 flex items-center gap-3">
          <Link
            href="/scenarios"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-subtle bg-surface text-tertiary transition hover:text-primary"
            aria-label={t("scn.backToMap")}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
          <div className="min-w-0">
            <h1 className="truncate font-booster text-xl font-extrabold">
              {scenario.emoji} {scenario.title[locale]}
            </h1>
            <p className="text-xs text-tertiary">
              {scenario.location[locale]} · {scenario.npc} ({scenario.npcRole[locale]})
            </p>
          </div>
        </header>

        {briefing ? (
          /* ── Mission briefing ── */
          <div className="g-card mx-auto w-full max-w-3xl space-y-5 p-5 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-3">
                <div className="aspect-video overflow-hidden rounded-2xl border border-subtle bg-canvas">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={scenarioImg(scenario.image)} alt={scenario.title[locale]} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h2 className="font-booster text-lg font-extrabold">{scenario.title[locale]}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-tertiary">{scenario.description[locale]}</p>
                </div>
                <div className="rounded-2xl border border-subtle bg-canvas p-3.5">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-brand-text">
                    {t("scn.mission")}
                  </p>
                  <p className="text-xs leading-relaxed text-secondary">{scenario.description[locale]}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-subtle bg-canvas p-3.5">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-brand-text">
                    {t("scn.targetVocab")}
                  </p>
                  {isGeneratingVocab ? (
                    <p className="flex items-center gap-2 py-1.5 text-[11px] italic text-tertiary">
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                      {t("scn.generatingVocab")}
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {dynamicVocab.map((w) => (
                        <span key={w} className="rounded-lg border border-brandborder/30 bg-brand-subtle px-2 py-1 font-mono text-[11px] text-brand-text">
                          {w}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-subtle bg-canvas p-3.5">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-brand-text">
                    {t("scn.customizeVocab")}
                  </p>
                  <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder={t("scn.vocabPh")}
                    className="min-h-[80px] w-full resize-none rounded-xl border border-subtle bg-surface px-3 py-2 text-xs outline-none focus:border-brandborder"
                  />
                  <label className="mt-2 inline-flex cursor-pointer items-center gap-1.5 text-[11px] font-semibold text-brand-text hover:underline">
                    <input
                      type="file"
                      className="hidden"
                      accept=".txt,.csv"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        file.text().then(async (content) => {
                          // 词面解析后查统一词库回填释义——AI grounding 从「裸词面」升级为「词+义」
                          const words = content.split(/[\s,，;；、\n]+/).map((w) => w.trim().toLowerCase()).filter(Boolean);
                          const entries = await Promise.all(words.slice(0, 80).map((w) => lookupLexicon(w)));
                          const enriched = words
                            .map((w, i) => (entries[i] ? `${w}(${entries[i]!.cn.split(",")[0].split("、")[0]})` : w))
                            .join(", ");
                          setCustomInput((prev) => (prev ? `${prev}, ${enriched}` : enriched).slice(0, 2000));
                        });
                      }}
                    />
                    <FileTextIcon size={14} className="inline" /> {t("scn.importVocab")}
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={startBriefing}
              disabled={isGeneratingVocab}
              className={`w-full rounded-2xl py-4 font-booster text-base font-extrabold transition ${
                isGeneratingVocab ? "cursor-not-allowed bg-canvas text-tertiary" : "game-btn bg-brand text-white"
              }`}
            >
              {isGeneratingVocab ? t("scn.preparing") : t("scn.startSimulation")}
            </button>
          </div>
        ) : stage && lesson ? (
          /* ── S1 四段式课程 ── */
          <div className="mx-auto w-full max-w-3xl space-y-4">
            <StageBar
              current={stage}
              done={new Set<LessonStageName>([...(stage !== "demo" ? ["demo" as const] : []), ...(stage === "vocab" ? ["drill" as const] : [])])}
            />
            {stage === "demo" && <DemoStage lesson={lesson} onNext={() => gotoStage("drill")} />}
            {stage === "drill" && <DrillStage lesson={lesson} scenarioId={scenario.id} onDone={() => gotoStage("vocab")} />}
            {stage === "vocab" && <VocabStage words={scenario.targetVocab} onDone={() => gotoStage(null)} />}
          </div>
        ) : (
          /* ── Chat + call ── */
          <div className="g-card flex min-h-0 flex-1 flex-col overflow-hidden">
            {lesson && (
              <div className="border-b border-subtle px-4 pt-2 md:px-6">
                <button onClick={retakeLesson} className="rounded-pill border border-subtle bg-canvas px-3 py-1 text-[10px] font-bold text-tertiary transition hover:text-primary">
                  {t("lesson.retake")}
                </button>
              </div>
            )}
            {/* Chat scroll area */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6">
              {messages.map((msg) => {
                const embedded = msg.text.split("---")[1]?.trim();
                const translationText = embedded ?? translations[msg.id];
                const showTrans = !!transShown[msg.id];
                return (
                  <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed md:max-w-[75%] ${
                        msg.role === "user"
                          ? "rounded-tr-sm bg-brand text-white"
                          : "rounded-tl-sm border border-subtle bg-canvas"
                      }`}
                    >
                      {msg.role === "model" ? (
                        renderNpcMessage(msg, showTrans)
                      ) : (
                        <>
                          <p className="font-medium">{msg.text}</p>
                          {msg.suggestion && (
                            <span className="mt-2 block rounded-lg bg-[rgba(15,23,42,0.45)] p-2 text-[11px] italic leading-relaxed text-white">
                              <SparklesIcon size={11} className="inline" /> <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">
                                {t("scn.suggestion")}:
                              </span>{" "}
                              {msg.suggestion}
                            </span>
                          )}
                          {showTrans && translationText !== undefined && (
                            <div className="mt-2">{renderTranslationCard(translationText)}</div>
                          )}
                        </>
                      )}
                    </div>
                    {/* Per-bubble actions — each button only reflects its own bubble */}
                    <div className="mt-1 flex items-center gap-1">
                      {msg.role === "model" && (
                        <button
                          onClick={() => replay(msg)}
                          className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold text-tertiary transition hover:bg-canvas hover:text-primary"
                        >
                          <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${speakingId === msg.id ? "animate-pulse text-brand-text" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 5 6 9H2v6h4l5 4zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
                          </svg>
                          {speakingId === msg.id ? t("scn.speaking") : ""}
                        </button>
                      )}
                      <button
                        onClick={() => void toggleTranslation(msg)}
                        className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold transition hover:bg-canvas ${
                          showTrans ? "text-brand-text" : "text-tertiary hover:text-primary"
                        }`}
                      >
                        <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${translatingId === msg.id ? "animate-pulse" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m5 8 6 6" />
                          <path d="m4 14 6-6 2-3" />
                          <path d="M2 5h12" />
                          <path d="M7 2h1" />
                          <path d="m22 22-5-10-5 10" />
                          <path d="M14 18h6" />
                        </svg>
                        {translatingId === msg.id ? t("scn.translating") : t("scn.translate")}
                      </button>
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                <p className="flex items-center gap-2 text-xs text-tertiary">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                  {scenario.npc} {t("scn.typing")}
                </p>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input bar */}
            <div className="border-t border-subtle bg-canvas/60 p-3.5 md:p-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInCall(true)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-b-4 border-[var(--ink)] bg-brand text-white shadow-[0_2px_0_0_rgba(0,0,0,0.1)] transition active:translate-y-0.5"
                  aria-label={t("scn.startLive")}
                  title={t("scn.startLive")}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={`${t("scn.talkTo")} ${scenario.npc}…`}
                  className="min-w-0 flex-1 rounded-2xl border border-subtle bg-surface px-4 py-3 text-sm outline-none focus:border-brandborder"
                />
                <button
                  onClick={toggleListening}
                  disabled={!recognitionRef.current}
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-subtle transition disabled:opacity-30 ${
                    listening ? "animate-pulse bg-red-500/10 text-critical" : "bg-surface text-tertiary hover:text-primary"
                  }`}
                  aria-label="Dictate"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
                  </svg>
                </button>
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border-2 border-b-4 border-[var(--ink)] bg-brand text-white shadow-[0_2px_0_0_rgba(0,0,0,0.1)] transition active:translate-y-0.5 disabled:opacity-40"
                  aria-label={t("scn.send")}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4zM22 2 11 13" />
                  </svg>
                </button>
              </div>
              <p className="mt-2.5 text-center text-[10px] font-semibold uppercase tracking-widest text-tertiary">
                {micError ?? t("scn.tip")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Live call overlay */}
      {inCall && (
        <ScenarioCallOverlay
          npcName={scenario.npc}
          npcRole={scenario.npcRole[locale]}
          image={scenarioImg(scenario.image)}
          emoji={scenario.emoji}
          instructions={buildCallInstructions(scenario, level, customVocab)}
          onEnd={endCall}
        />
      )}

      {/* Call-ended toast */}
      {callToast && (
        <div className="fixed bottom-28 left-1/2 z-[150] -translate-x-1/2 rounded-full border-2 border-[var(--ink)] bg-primary px-5 py-3 text-xs font-bold text-app shadow-[0_3px_0_0_rgba(0,0,0,0.15)] lg:bottom-10">
          <PhoneIcon size={14} className="inline" /> {t("scn.callEnded")} · {callToast}
        </div>
      )}
    </AppShell>
  );
}
