"use client";

/**
 * ImageChoice — 听音辨图：自动播放问题（mp3 优先 / TTS 兜底），看 emoji
 * 选项作答，即点即判；「提示」消除一个错误项（消耗商店道具）。答错展示
 * 正确项后回调。
 */

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { quizAudioUrl } from "@/content/reading";
import type { ReadingQuizImageChoice, ReadingTrack } from "@/content/reading/types";
import { QuestPlayButton, type QuestSpeed } from "./ParagraphAudio";

interface Props {
  q: ReadingQuizImageChoice;
  storyId: string;
  track: ReadingTrack;
  quizIdx: number;
  speed: QuestSpeed;
  hintAvailable: boolean;
  onUseHint: () => boolean;
  onDone: (passed: boolean) => void;
}

export function ImageChoice({ q, storyId, track, quizIdx, speed, hintAvailable, onUseHint, onDone }: Props) {
  const { t } = useI18n();
  const [picked, setPicked] = useState<string | null>(null);
  const [eliminated, setEliminated] = useState<Set<string>>(new Set());
  const [usedHint, setUsedHint] = useState(false);
  const [settled, setSettled] = useState(false);

  const src = quizAudioUrl(track, storyId, quizIdx);
  const slowSrc = quizAudioUrl(track, storyId, quizIdx, true);

  const pick = (value: string) => {
    if (settled || eliminated.has(value)) return;
    setPicked(value);
    setSettled(true);
    const ok = value === q.answer;
    setTimeout(() => onDone(ok), 1200);
  };

  const hint = () => {
    if (settled || usedHint) return;
    if (!onUseHint()) return;
    setUsedHint(true);
    const wrong = q.options.filter((o) => o.value !== q.answer && !eliminated.has(o.value));
    if (wrong.length > 1) {
      const victim = wrong[Math.floor(Math.random() * wrong.length)];
      setEliminated(new Set([...eliminated, victim.value]));
    }
  };

  return (
    <div>
      <p className="sn-cn" style={{ fontSize: "1.05rem" }}>{q.question}</p>
      <div className="mt-3 flex items-center justify-center gap-3">
        <QuestPlayButton src={src} slowSrc={slowSrc} fallbackText={q.audioText || q.question} speed={speed} auto />
      </div>

      <div className="rq-img-grid">
        {q.options.map((o) => {
          const isPicked = picked === o.value;
          const showGood = settled && o.value === q.answer;
          const showBad = settled && isPicked && o.value !== q.answer;
          const dim = eliminated.has(o.value) || (settled && !isPicked && !showGood);
          return (
            <button
              key={o.value}
              type="button"
              className={`rq-img-opt ${showGood ? "rq-img-opt--good" : ""} ${showBad ? "rq-img-opt--bad" : ""} ${dim ? "rq-img-opt--dim" : ""}`}
              onClick={() => pick(o.value)}
              disabled={settled || eliminated.has(o.value)}
            >
              <span className="rq-img-emoji">{o.emoji}</span>
              <span>{o.text}</span>
            </button>
          );
        })}
      </div>

      {!settled && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {hintAvailable && (
            <button type="button" className="ph-btn ph-btn--ghost ph-btn--sm" onClick={hint}>
              💡 {t("reading.hint")}
            </button>
          )}
          <span className="text-xs font-bold" style={{ color: "var(--ph-ink-3)" }}>
            {t("reading.hintNote")}
          </span>
        </div>
      )}
    </div>
  );
}
