"use client";

/**
 * SentenceOrder — 听后排序：听句子（自动播放），乱序词卡点选填槽还原
 * 原句；点已填槽撤回；「看答案」揭示且本题不得分。交互克隆句法馆
 * PuzzleMode，判定基准改为 content 的 correctOrder。
 */

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { quizAudioUrl } from "@/content/reading";
import type { ReadingQuizSentenceOrder, ReadingTrack } from "@/content/reading/types";
import { QuestPlayButton, type QuestSpeed } from "./ParagraphAudio";

interface Props {
  q: ReadingQuizSentenceOrder;
  storyId: string;
  track: ReadingTrack;
  quizIdx: number;
  speed: QuestSpeed;
  onDone: (passed: boolean) => void;
}

interface Chip {
  id: number;
  word: string;
  used: boolean;
}

function makeChips(words: string[]): Chip[] {
  let chips = words.map((word, id) => ({ id, word, used: false }));
  for (let i = chips.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chips[i], chips[j]] = [chips[j], chips[i]];
  }
  const identical = chips.every((c, i) => c.word === words[i]);
  if (identical && words.length > 2) chips = [...chips].reverse();
  return chips;
}

type Phase = "input" | "correct" | "reveal";

export function SentenceOrder({ q, storyId, track, quizIdx, speed, onDone }: Props) {
  const { t } = useI18n();
  const [chips, setChips] = useState<Chip[]>([]);
  const [filled, setFilled] = useState<{ word: string; chipId: number }[]>([]);
  const [phase, setPhase] = useState<Phase>("input");
  const [peeked, setPeeked] = useState(false);
  const [showPeek, setShowPeek] = useState(false);

  useEffect(() => {
    setChips(makeChips(q.correctOrder));
    setFilled([]);
    setPhase("input");
    setPeeked(false);
    setShowPeek(false);
  }, [q.correctOrder]);

  const done = phase === "correct" || phase === "reveal";
  const answerText = q.correctOrder.join(" ");

  const pickChip = (chip: Chip) => {
    if (done || chip.used) return;
    const next = [...filled, { word: chip.word, chipId: chip.id }];
    setFilled(next);
    setChips((cs) => cs.map((c) => (c.id === chip.id ? { ...c, used: true } : c)));
    if (next.length === q.correctOrder.length) {
      const ok = next.map((f) => f.word).join(" ") === answerText;
      setPhase(ok ? "correct" : "reveal");
      if (!ok) setPeeked(true);
      setTimeout(() => onDone(ok && !peeked), ok ? 1000 : 2400);
    }
  };

  const undoFrom = (slotIdx: number) => {
    if (done) return;
    const removed = filled.slice(slotIdx);
    const ids = new Set(removed.map((f) => f.chipId));
    setFilled(filled.slice(0, slotIdx));
    setChips((cs) => cs.map((c) => (ids.has(c.id) ? { ...c, used: false } : c)));
  };

  const peek = () => {
    if (done || showPeek) return;
    setPeeked(true);
    setShowPeek(true);
    setTimeout(() => setShowPeek(false), 2000);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-center gap-3">
        <QuestPlayButton
          src={quizAudioUrl(track, storyId, quizIdx)}
          slowSrc={quizAudioUrl(track, storyId, quizIdx, true)}
          fallbackText={q.audioText || answerText}
          speed={speed}
          auto
        />
      </div>

      <div className="sn-slots" aria-label="slots">
        {q.correctOrder.map((_, i) => {
          const f = filled[i];
          return (
            <button
              key={i}
              type="button"
              className={`sn-slot ${f ? "sn-slot--filled" : ""}`}
              onClick={() => f && undoFrom(i)}
              aria-label={`第 ${i + 1} 个词`}
            >
              {f?.word ?? ""}
            </button>
          );
        })}
      </div>

      {showPeek && <p className="sn-peek">{q.audioText || answerText}</p>}
      {phase === "reveal" && <p className="ph-reveal">{answerText}</p>}

      <div className="sn-chips" role="listbox" aria-label="word cards">
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`sn-chip-word ${c.used ? "sn-chip-word--used" : ""}`}
            onClick={() => pickChip(c)}
            aria-label={`单词 ${c.word}`}
          >
            {c.word}
          </button>
        ))}
      </div>

      {!done && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button type="button" className="ph-btn ph-btn--ghost ph-btn--sm" onClick={peek} disabled={showPeek}>
            {t("reading.peek")}
          </button>
          <span className="text-xs font-bold" style={{ color: "var(--ph-ink-3)" }}>
            {t("reading.peekNote")}
          </span>
        </div>
      )}

      {phase === "correct" && (
        <p className="mt-5 text-center">
          <span className="ph-pill ph-pill--good">🎉 {t("reading.nice")}</span>
        </p>
      )}
    </div>
  );
}
