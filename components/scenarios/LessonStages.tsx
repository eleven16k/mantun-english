"use client";

/**
 * S1 四段式课程段（V8 用户故事集 S1）：示范（看）→ 跟读（读，E1 三色反馈）→
 * 词汇（点读）→ 实战（回到既有 chat/call）。custom 场景没有 lesson 数据，
 * 页面直接跳过本组件——向后兼容。
 *
 * E1 跟读：ASR 用浏览器 SpeechRecognition（场景页听写同款链路，零引擎
 * 依赖）；服务端 /api/pronunciation/attempt 做词级对齐并落库。空转写 =
 * 「没听清」，不标色不计画像（stars null）。段内发音用浏览器 TTS
 * （speechSynthesis，en-US）——神经 TTS 接入留待后续，不阻塞交付。
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { AbcIcon, CheckCircleIcon, PhoneIcon, VolumeIcon, ClapperIcon, MicIcon } from "@/components/icons";

import { submitPronunciationAttempt, type AlignedWord, type PronunciationResult } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import { speakEn } from "@/lib/speak";
import { prefetchTts } from "@/lib/tts";
import type { ScenarioLesson } from "@/lib/scenario-lessons";

export type LessonStageName = "demo" | "drill" | "vocab";

const STAGE_ORDER: LessonStageName[] = ["demo", "drill", "vocab"];

export function StageBar({ current, done }: { current: LessonStageName; done: Set<LessonStageName> }) {
  const { t } = useI18n();
  const meta: Record<LessonStageName, { icon: React.ReactNode; label: string }> = {
    demo: { icon: <ClapperIcon size={15} />, label: t("lesson.demo") },
    drill: { icon: <MicIcon size={15} />, label: t("lesson.drill") },
    vocab: { icon: <AbcIcon size={15} />, label: t("lesson.vocab") },
  };
  return (
    <div className="flex gap-1.5">
      {STAGE_ORDER.map((s) => (
        <div
          key={s}
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl border-2 pb-1 pt-1.5 text-[10px] font-bold transition ${
            s === current
              ? "border-[var(--ink)] bg-brand-subtle text-brand-text"
              : done.has(s)
                ? "border-subtle bg-canvas text-primary"
                : "border-subtle bg-canvas text-tertiary opacity-60"
          }`}
        >
          <span className="text-sm leading-none">{done.has(s) && s !== current ? <CheckCircleIcon size={15} /> : meta[s].icon}</span>
          {meta[s].label}
        </div>
      ))}
      <div className="flex flex-1 flex-col items-center gap-0.5 rounded-xl border-2 border-subtle bg-canvas pb-1 pt-1.5 text-[10px] font-bold text-tertiary opacity-60">
        <span className="text-sm leading-none"><PhoneIcon size={15} /></span>
        {t("lesson.live")}
      </div>
    </div>
  );
}

export function DemoStage({ lesson, onNext }: { lesson: ScenarioLesson; onNext: () => void }) {
  const { t } = useI18n();
  return (
    <div className="space-y-4">
      <div className="g-card space-y-3 p-4 md:p-6">
        <p className="text-xs text-tertiary">{t("lesson.demoHint")}</p>
        {lesson.demo.map((turn, i) => (
          <div key={i} className={`flex ${turn.who === "user" ? "justify-end" : "justify-start"}`}>
            <button
              onClick={() => speakEn(turn.en)}
              title={speakEn.name ? "play" : undefined}
              className={`max-w-[85%] rounded-2xl p-3 text-left text-sm leading-relaxed ${
                turn.who === "user" ? "rounded-tr-sm bg-brand text-white" : "rounded-tl-sm border border-subtle bg-canvas"
              }`}
            >
              <p className="font-medium">
                {turn.who === "npc" && <VolumeIcon size={13} className="inline" />}{" "}
                {turn.en}
              </p>
              <p className={`mt-1 text-xs ${turn.who === "user" ? "text-white/75" : "text-tertiary"}`}>{turn.zh}</p>
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={onNext} className="game-btn flex-1 rounded-2xl bg-brand py-3.5 font-booster text-sm font-extrabold text-white">
          {t("lesson.demoNext")}
        </button>
      </div>
    </div>
  );
}

const VERDICT_CLASS: Record<AlignedWord["verdict"], string> = {
  good: "bg-[#e2f5e9] text-[#2e8b57]",
  fuzzy: "bg-[#fff3d6] text-[#c07f00]",
  miss: "bg-[#ffe4e4] text-[#d64545] line-through",
};

export function DrillStage({ lesson, scenarioId, onDone }: { lesson: ScenarioLesson; scenarioId: string; onDone: () => void }) {
  const { t } = useI18n();
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"idle" | "listening" | "result">("idle");
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const [fails, setFails] = useState(0);
  const recRef = useRef<{ start: () => void; stop: () => void } | null>(null);
  const sentence = lesson.drills[idx];
  const total = lesson.drills.length;

  // 神经 TTS 预热：段挂载即预取全部跟读句，点 🔊 时 0 等待
  useEffect(() => {
    lesson.drills.forEach((d) => prefetchTts(d.en));
  }, [lesson]);

  const score = useCallback(
    async (heard: string | null) => {
      try {
        const res = await submitPronunciationAttempt(sentence.en, heard, scenarioId);
        setResult(res);
        setPhase("result");
        if (res.stars !== null && res.stars < 3) setFails((f) => f + 1);
      } catch {
        setMicError(t("lesson.noHear"));
        setPhase("idle");
      }
    },
    [sentence.en, scenarioId, t]
  );

  const startListening = () => {
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
    if (!SR) {
      setMicError(t("lesson.micDenied"));
      return;
    }
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";
    recRef.current = rec;
    rec.onresult = (e) => {
      const heard = e.results[0][0].transcript;
      void score(heard);
    };
    rec.onerror = (e) => {
      setPhase("idle");
      if (e.error === "not-allowed") setMicError(t("lesson.micDenied"));
      else setMicError(t("lesson.noHear"));
    };
    rec.onend = () => {
      // result path handles UI; if no result arrived, show retry hint
      setPhase((p) => (p === "listening" ? "idle" : p));
    };
    setMicError(null);
    setResult(null);
    setPhase("listening");
    rec.start();
  };

  const retry = () => {
    setResult(null);
    setPhase("idle");
  };

  const next = () => {
    if (idx + 1 >= total) {
      onDone();
      return;
    }
    setIdx(idx + 1);
    retry();
    setFails(0);
  };

  return (
    <div className="space-y-4">
      <div className="g-card space-y-3 p-4 text-center md:p-6">
        <p className="text-xs text-tertiary">
          {t("lesson.drillProgress").replace("{a}", String(idx + 1)).replace("{b}", String(total))} · {t("lesson.drillTap")}
        </p>
        <button onClick={() => speakEn(sentence.en)} className="font-booster text-lg font-extrabold leading-relaxed text-primary">
          <VolumeIcon size={14} className="inline" /> {sentence.en}
        </button>
        <p className="text-xs text-tertiary">{sentence.zh}</p>

        {phase === "result" && result && (
          <div className="space-y-2">
            <div className="flex flex-wrap justify-center gap-1.5">
              {result.words.map((w, i) => (
                <span key={i} className={`rounded-lg px-2 py-1 text-sm font-bold ${VERDICT_CLASS[w.verdict]}`}>
                  {w.word}
                </span>
              ))}
            </div>
            {result.stars !== null && <p className="text-xl tracking-widest">{"⭐".repeat(result.stars)}</p>}
          </div>
        )}

        {micError && <p className="text-xs font-semibold text-critical">{micError}</p>}
        {fails >= 3 && phase !== "listening" && (
          <div className="space-y-2 rounded-2xl border border-brandborder/40 bg-brand-subtle/60 p-3">
            <p className="text-[11px] leading-relaxed text-brand-text">{t("lesson.drillHint")}</p>
            <button onClick={() => speakEn(sentence.en)} className="rounded-pill bg-brand px-3 py-1.5 text-[11px] font-bold text-white">
              {t("lesson.listenFirst")}
            </button>
          </div>
        )}
      </div>

      <button
        onClick={phase === "listening" ? undefined : startListening}
        disabled={phase === "listening"}
        className={`mx-auto grid h-20 w-20 place-items-center rounded-full text-3xl text-white transition ${
          phase === "listening" ? "animate-pulse bg-critical" : "game-btn bg-brand shadow-[0_6px_0_0_rgba(0,0,0,0.12)]"
        }`}
        aria-label="record"
      >
        {phase === "listening" ? "…" : <MicIcon size={18} />}
      </button>

      <div className="flex gap-2">
        {phase === "result" && result?.stars !== null && (
          <button onClick={retry} className="flex-1 rounded-2xl border border-subtle bg-canvas py-3 text-xs font-bold text-secondary">
            {t("lesson.retry")}
          </button>
        )}
        <button
          onClick={next}
          disabled={phase === "listening"}
          className="game-btn flex-1 rounded-2xl bg-brand py-3 font-booster text-sm font-extrabold text-white disabled:opacity-40"
        >
          {idx + 1 >= total ? t("lesson.drillDone") : t("lesson.next")}
        </button>
      </div>
    </div>
  );
}

export function VocabStage({ words, onDone }: { words: string[]; onDone: () => void }) {
  const { t } = useI18n();
  const [learned, setLearned] = useState<Set<string>>(new Set());
  const all = learned.size >= words.length;
  // 神经 TTS 预热
  useEffect(() => {
    words.forEach((w) => prefetchTts(w));
  }, [words]);
  const tap = (word: string) => {
    speakEn(word);
    setLearned((prev) => new Set(prev).add(word));
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {words.map((word) => (
          <button
            key={word}
            onClick={() => tap(word)}
            className={`g-card p-4 text-center transition ${learned.has(word) ? "!border-primary" : ""}`}
          >
            <p className="font-booster text-sm font-extrabold text-primary">
              {learned.has(word) && <VolumeIcon size={13} className="inline" />}{" "}
              {word}
            </p>
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-tertiary">{all ? t("lesson.vocabAll") : t("lesson.vocabHint")}</p>
      <button
        onClick={onDone}
        disabled={!all}
        className="game-btn w-full rounded-2xl bg-brand py-3.5 font-booster text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t("lesson.goLive")}
      </button>
    </div>
  );
}
