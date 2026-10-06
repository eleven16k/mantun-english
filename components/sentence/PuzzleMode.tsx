"use client";

/**
 * PuzzleMode — 句法馆核心题型「单词拼图」（复刻句游英语官网 hero demo）。
 * 乱序词卡点选填槽（重复词独立成卡）→ 点已填槽从那里撤回 → 填满自动判定；
 * 3 次机会，错后抖动重试，第 3 次失败揭示答案；「看答案」2 秒揭示且该句
 * 不计通过（对齐拼读馆提示规则）。视觉复用 ph- 皮肤 + sn- 词级槽位。
 */

import { useEffect, useState } from "react";
import { PartyPopperIcon } from "@/components/SvgIcons";

import { useI18n } from "@/lib/i18n";
import { makeWordChips, tokenizeSentence, type WordChip } from "@/lib/sentence";
import type { Sentence } from "@/content/sentence/data";

interface Props {
  sentence: Sentence;
  /** passed = 未看答案且一次拼对；failed = 看过答案 / 3 次机会用尽 */
  onDone: (passed: boolean, attempt?: string) => void;
}

type Phase = "input" | "correct" | "tryagain" | "reveal";

export function PuzzleMode({ sentence, onDone }: Props) {
  const { t } = useI18n();
  const tokens = tokenizeSentence(sentence.en);
  const [chips, setChips] = useState<WordChip[]>([]);
  const [filled, setFilled] = useState<{ word: string; chipId: number }[]>([]);
  const [phase, setPhase] = useState<Phase>("input");
  const [attempts, setAttempts] = useState(0);
  const [peeked, setPeeked] = useState(false);
  const [showPeek, setShowPeek] = useState(false);

  // 换句重置
  useEffect(() => {
    setChips(makeWordChips(sentence.en));
    setFilled([]);
    setPhase("input");
    setAttempts(0);
    setPeeked(false);
    setShowPeek(false);
  }, [sentence.en]);

  const done = phase === "correct" || phase === "reveal";

  const pickChip = (chip: WordChip) => {
    if (done || phase === "tryagain" || chip.used) return;
    const next = [...filled, { word: chip.word, chipId: chip.id }];
    setFilled(next);
    setChips((cs) => cs.map((c) => (c.id === chip.id ? { ...c, used: true } : c)));
    if (next.length === tokens.length) setTimeout(() => check(next), 250);
  };

  const undoFrom = (slotIdx: number) => {
    if (done || phase === "tryagain") return;
    const removed = filled.slice(slotIdx);
    const removedIds = new Set(removed.map((f) => f.chipId));
    setFilled(filled.slice(0, slotIdx));
    setChips((cs) => cs.map((c) => (removedIds.has(c.id) ? { ...c, used: false } : c)));
  };

  const check = (seq: { word: string; chipId: number }[]) => {
    const ok = seq.map((f) => f.word).join(" ") === sentence.en;
    if (ok) {
      setPhase("correct");
      // 看过答案 / 已错过：不记 PASSED（错过即进弱点本，对齐拼读馆机制）
      setTimeout(() => onDone(!peeked && attempts === 0), 1200);
    } else {
      const n = attempts + 1;
      setAttempts(n);
      if (n >= 3) {
        setPhase("reveal");
        setTimeout(() => onDone(false, seq.map((f) => f.word).join(" ")), 2600);
      } else {
        setPhase("tryagain");
        setTimeout(() => {
          setFilled([]);
          setChips((cs) => cs.map((c) => ({ ...c, used: false })));
          setPhase("input");
        }, 650);
      }
    }
  };

  const peek = () => {
    if (done || showPeek) return;
    setPeeked(true);
    setShowPeek(true);
    setTimeout(() => setShowPeek(false), 2000);
  };

  return (
    <div>
      <p className="sn-cn">{sentence.cn}</p>

      <div className={phase === "tryagain" ? "ph-shake" : undefined}>
        <div className="sn-slots" aria-label="句槽">
          {tokens.map((tok, i) => {
            const f = filled[i];
            return (
              <button
                key={i}
                type="button"
                aria-label={`第 ${i + 1} 个词${f ? `：${f.word}` : "，空"}`}
                className={`sn-slot ${f ? "sn-slot--filled" : ""}`}
                onClick={() => f && undoFrom(i)}
              >
                {f?.word ?? ""}
              </button>
            );
          })}
        </div>

        {phase === "reveal" && <p className="ph-reveal" style={{ letterSpacing: "0.02em" }}>{sentence.en}</p>}

        <div className="sn-chips" role="listbox" aria-label="词卡">
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
      </div>

      {showPeek && <p className="sn-peek">{sentence.en}</p>}

      {!done && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button type="button" className="ph-btn ph-btn--ghost ph-btn--sm" onClick={peek} disabled={showPeek}>
            {t("sentence.peek")}
          </button>
          <span className="text-xs font-bold" style={{ color: "var(--ph-ink-3)" }}>
            {t("sentence.peekNote")}
          </span>
        </div>
      )}

      {phase === "correct" && (
        <p className="mt-5">
          <span className="ph-pill ph-pill--good inline-flex items-center gap-1"><PartyPopperIcon size={13} /> {t("sentence.nice")}</span>
        </p>
      )}
      {phase === "tryagain" && (
        <p className="mt-5">
          <span className="ph-pill ph-pill--bad">{t("sentence.retry")}</span>
        </p>
      )}
      {phase === "reveal" && (
        <p className="mt-3">
          <span className="ph-pill ph-pill--info">{t("sentence.revealNote")}</span>
        </p>
      )}
    </div>
  );
}
