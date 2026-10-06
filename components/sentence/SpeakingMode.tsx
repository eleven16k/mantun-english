"use client";

/**
 * SpeakingMode — 句法馆题型「语音口语」（跟读 + 逐词打分）。
 * 听 TTS（正常速/慢速）→ 手势内起 SpeechRecognition（en-US 单次，scenarios 页
 * 模式）→ 转写与原句做 LCS 对齐 → 逐词 hit/miss 配色 + 得分条；≥0.6 过。
 * 不支持 ASR 的浏览器 → 跟读自评兜底；麦克风被拒 → 友好横幅 + 跳过。
 */

import { useEffect, useRef, useState } from "react";
import { PartyPopperIcon } from "@/components/SvgIcons";

import { VolumeIcon, TurtleIcon, RepeatIcon, MicIcon } from "@/components/icons";

import { useI18n } from "@/lib/i18n";
import { unlockAudio } from "@/lib/phonics";
import { speakEn, stopSpeakEn } from "@/lib/speak";
import {
  SPEAK_PASS_THRESHOLD,
  scoreTranscript,
  tokenizeSentence,
  type SpeakScore,
} from "@/lib/sentence";
import type { Sentence } from "@/content/sentence/data";

interface Props {
  sentence: Sentence;
  onDone: (passed: boolean, attempt?: string) => void;
}

type Recognizer = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (e: { results: { [k: number]: { [j: number]: { transcript: string } } } }) => void;
  onerror: (e: { error: string }) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

function createRecognizer(): Recognizer | null {
  const w = window as unknown as Record<string, unknown>;
  const SR = (w.SpeechRecognition ?? w.webkitSpeechRecognition) as (new () => Recognizer) | undefined;
  if (!SR) return null;
  const rec = new SR();
  rec.continuous = false;
  rec.interimResults = false;
  rec.lang = "en-US";
  return rec;
}

export function SpeakingMode({ sentence, onDone }: Props) {
  const { t } = useI18n();
  const [asrSupported, setAsrSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [grading, setGrading] = useState<SpeakScore | null>(null);
  const [micError, setMicError] = useState<string | null>(null);

  const recRef = useRef<Recognizer | null>(null);
  const seqRef = useRef(0); // 防竞态：换句/卸载后旧 TTS 作废
  const finishedRef = useRef(false); // onDone 只回调一次

  // 换句重置 + 检测 ASR 支持 + 自动领读（严格模式双跑用 seqRef 拦截）
  useEffect(() => {
    setAsrSupported(createRecognizer() !== null);
    setListening(false);
    setTranscript(null);
    setGrading(null);
    setMicError(null);
    finishedRef.current = false;
    const seq = ++seqRef.current;
    // V8 清晰度修复：神经 TTS 优先（原浏览器合成音色听设备脸色）
    void speakEn(sentence.en, 0.95).then(() => {
      if (seqRef.current === seq) setTranscript(null);
    });
    return () => {
      seqRef.current++;
      stopSpeakEn();
    };
  }, [sentence.en]);

  // 卸载时停掉可能还开着的识别器
  useEffect(() => {
    return () => {
      try {
        recRef.current?.abort();
      } catch {
        /* noop */
      }
    };
  }, []);

  const replay = (rate: number) => {
    unlockAudio();
    void speakEn(sentence.en, rate);
  };

  const grade = (text: string) => {
    setTranscript(text);
    const g = scoreTranscript(sentence.en, text);
    setGrading(g);
    if (g.score >= SPEAK_PASS_THRESHOLD && !finishedRef.current) {
      finishedRef.current = true;
      setTimeout(() => onDone(true), 1600);
    }
  };

  const startReading = () => {
    if (listening || grading) return;
    unlockAudio();
    setMicError(null);
    setTranscript(null);
    setGrading(null);
    const rec = createRecognizer();
    if (!rec) {
      setAsrSupported(false);
      return;
    }
    recRef.current = rec;
    rec.onresult = (e) => {
      setListening(false);
      grade(e.results[0][0].transcript);
    };
    rec.onerror = (e) => {
      setListening(false);
      if (e.error === "not-allowed") setMicError(t("sentence.micDenied"));
    };
    rec.onend = () => setListening(false);
    try {
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  };

  const skip = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onDone(false, transcript ?? undefined); // 判断层证据：最后识别文本
  };

  const tokens = tokenizeSentence(sentence.en);
  const passed = grading !== null && grading.score >= SPEAK_PASS_THRESHOLD;

  return (
    <div>
      {/* 原句（打分后逐词配色） */}
      <p className="sn-en" aria-label={sentence.en}>
        {tokens.map((tok, i) => (
          <span
            key={i}
            className={
              grading
                ? grading.perWord[i]
                  ? "sn-tok--ok"
                  : "sn-tok--bad"
                : undefined
            }
          >
            {tok}
            {i < tokens.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
      <p className="mt-1 text-sm font-bold" style={{ color: "var(--ph-ink-3)" }}>
        {sentence.cn}
      </p>

      {/* 听 */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button type="button" className="ph-sound" aria-label={t("sentence.replay")} onClick={() => replay(0.95)}>
          <VolumeIcon size={20} />
        </button>
        <button type="button" className="ph-sound ph-sound--blue" aria-label={t("sentence.slow")} onClick={() => replay(0.55)}>
          <TurtleIcon size={20} />
        </button>
      </div>

      {!asrSupported && (
        <p className="mx-auto mt-4 max-w-sm text-xs font-bold" style={{ color: "var(--ph-orange)" }}>
          {t("sentence.asrUnsupported")}
        </p>
      )}
      {micError && (
        <p className="mx-auto mt-4 max-w-sm text-xs font-bold" style={{ color: "var(--ph-red)" }}>
          {micError}
        </p>
      )}

      {/* 得分 */}
      {grading && (
        <div className="mt-4">
          <div className="sn-score-row">
            <div className="ph-progress">
              <i style={{ width: `${Math.round(grading.score * 100)}%` }} />
            </div>
            <b>{Math.round(grading.score * 100)}%</b>
          </div>
          <p className="sn-transcript">
            {t("sentence.youSaid")}：{transcript}
          </p>
          {grading.extras.length > 0 && <p className="sn-extras">＋ {grading.extras.join(" · ")}</p>}
          {passed ? (
            <p className="mt-4">
              <span className="ph-pill ph-pill--good inline-flex items-center gap-1"><PartyPopperIcon size={13} /> {t("sentence.nice")}</span>
            </p>
          ) : (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button type="button" className="ph-btn ph-btn--sm" onClick={startReading}>
                <RepeatIcon size={14} className="inline" /> {t("sentence.tryAgain")}
              </button>
              <button type="button" className="ph-btn ph-btn--ghost ph-btn--sm" onClick={skip}>
                {t("sentence.skip")}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 麦克风 / 兜底自评 */}
      {!grading && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {asrSupported ? (
            <button type="button" className="ph-btn" onClick={startReading} disabled={listening}>
              {listening ? <span className="sn-rec" /> : <MicIcon size={15} className="inline" />} {listening ? t("sentence.micListening") : t("sentence.micStart")}
            </button>
          ) : (
            <button type="button" className="ph-btn" onClick={() => { if (!finishedRef.current) { finishedRef.current = true; onDone(true); } }}>
              {t("sentence.selfChecked")}
            </button>
          )}
          <button type="button" className="ph-btn ph-btn--ghost ph-btn--sm" onClick={skip}>
            {t("sentence.skip")}
          </button>
        </div>
      )}
    </div>
  );
}
