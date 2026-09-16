"use client";

/**
 * FillBlank — 听后填空：听完整句（自动播放），从 3 个选项里选出挖空词；
 * 「提示」消除一个错误项（消耗商店道具）；答错展示正确项后回调。
 */

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { quizAudioUrl } from "@/content/reading";
import type { ReadingQuizFillBlank, ReadingTrack } from "@/content/reading/types";
import { QuestPlayButton, type QuestSpeed } from "./ParagraphAudio";

interface Props {
  q: ReadingQuizFillBlank;
  storyId: string;
  track: ReadingTrack;
  quizIdx: number;
  speed: QuestSpeed;
  hintAvailable: boolean;
  onUseHint: () => boolean;
  onDone: (passed: boolean) => void;
}

export function FillBlank({ q, storyId, track, quizIdx, speed, hintAvailable, onUseHint, onDone }: Props) {
  const { t } = useI18n();
  const [picked, setPicked] = useState<string | null>(null);
  const [eliminated, setEliminated] = useState<Set<string>>(new Set());
  const [usedHint, setUsedHint] = useState(false);
  const [settled, setSettled] = useState(false);

  const [before, after] = q.sentenceWithBlank.split(/_{2,}/);

  const pick = (choice: string) => {
    if (settled || eliminated.has(choice)) return;
    setPicked(choice);
    setSettled(true);
    const ok = choice === q.answer;
    setTimeout(() => onDone(ok), 1200);
  };

  const hint = () => {
    if (settled || usedHint) return;
    if (!onUseHint()) return;
    setUsedHint(true);
    const wrong = q.choices.filter((c) => c !== q.answer && !eliminated.has(c));
    if (wrong.length > 1) {
      const victim = wrong[Math.floor(Math.random() * wrong.length)];
      setEliminated(new Set([...eliminated, victim]));
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-center gap-3">
        <QuestPlayButton
          src={quizAudioUrl(track, storyId, quizIdx)}
          slowSrc={quizAudioUrl(track, storyId, quizIdx, true)}
          fallbackText={q.audioText || q.sentenceWithBlank.replace(/_{2,}/, q.answer)}
          speed={speed}
          auto
        />
      </div>

      <p className="sn-cn" style={{ fontSize: "1.05rem", letterSpacing: "0.01em" }}>
        {before}
        <span
          className="sn-slot sn-slot--filled"
          style={{
            display: "inline-grid",
            width: "5.5rem",
            minWidth: "5.5rem",
            verticalAlign: "middle",
            background: settled ? (picked === q.answer ? "var(--ph-green-bg)" : "var(--ph-red-bg)") : "var(--ph-yellow)",
          }}
        >
          {settled ? (picked === q.answer ? picked : q.answer) : picked ?? "?"}
        </span>
        {after}
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-2.5">
        {q.choices.map((c) => {
          const showGood = settled && c === q.answer;
          const showBad = settled && picked === c && c !== q.answer;
          const dim = eliminated.has(c) || (settled && picked !== c && !showGood);
          return (
            <button
              key={c}
              type="button"
              className={`sn-chip-word ${showGood ? "rq-img-opt--good" : ""} ${showBad ? "rq-img-opt--bad" : ""} ${dim ? "rq-img-opt--dim" : ""}`}
              style={{ minWidth: "5.5rem" }}
              onClick={() => pick(c)}
              disabled={settled || eliminated.has(c)}
            >
              {c}
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
