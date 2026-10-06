"use client";

/**
 * LetterTiles — 拼读核心题型「字母块拼词」。
 * 机制复刻 phonicsword 已验证的闭环：乱序字母卡点选填槽（重复字母独立成卡）
 * → 可点已填槽回退 → 填满自动判定；3 次机会，错 2 次抖动重试，
 * 第 3 次失败揭示答案；「提示」展开 IPA 拆音块（用过提示不计通过）。
 * 视觉走 juyou 皮肤（ph- 前缀类，见 app/phonics/phonics.css）。
 */

import { useEffect, useMemo, useState } from "react";
import { LightbulbIcon, PartyPopperIcon} from "@/components/SvgIcons";

import { makeLetterTiles, type LetterTile } from "@/lib/phonics";

interface Props {
  word: string;
  ipa: string;
  phonemes: string[];
  /** digraph 拼法块（与 phonemes 对齐），缺省按字母拆 */
  graphemes?: string[];
  /** 结果回调：passed = 未经提示拼对；failed = 3 次机会用尽或使用提示后完成 */
  onDone: (passed: boolean, attempt?: string) => void;
}

type Phase = "input" | "correct" | "tryagain" | "reveal";

export function LetterTiles({ word, ipa, phonemes, graphemes, onDone }: Props) {
  const target = word.toLowerCase();
  const [tiles, setTiles] = useState<LetterTile[]>([]);
  const [filled, setFilled] = useState<{ ch: string; tileId: number }[]>([]);
  const [phase, setPhase] = useState<Phase>("input");
  const [attempts, setAttempts] = useState(0);
  const [hinted, setHinted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // 换词重置
  useEffect(() => {
    setTiles(makeLetterTiles(word, graphemes));
    setFilled([]);
    setPhase("input");
    setAttempts(0);
    setHinted(false);
    setShowHint(false);
  }, [word]);

  const done = phase === "correct" || phase === "reveal";

  const pickTile = (tile: LetterTile) => {
    if (done || phase === "tryagain" || tile.used) return;
    const next = [...filled, { ch: tile.ch, tileId: tile.id }];
    setFilled(next);
    setTiles((ts) => ts.map((t) => (t.id === tile.id ? { ...t, used: true } : t)));
    if (next.length === target.length) setTimeout(() => check(next), 250);
  };

  const undoFrom = (slotIdx: number) => {
    if (done || phase === "tryagain") return;
    const removed = filled.slice(slotIdx);
    const removedIds = new Set(removed.map((f) => f.tileId));
    setFilled(filled.slice(0, slotIdx));
    setTiles((ts) => ts.map((t) => (removedIds.has(t.id) ? { ...t, used: false } : t)));
  };

  const check = (seq: { ch: string; tileId: number }[]) => {
    const ok = seq.map((f) => f.ch).join("") === target;
    if (ok) {
      setPhase("correct");
      // 用过提示 / 已错过：不记 PASSED（错过即进复习本，对齐机制）
      setTimeout(() => onDone(!hinted && attempts === 0), 1400);
    } else {
      const n = attempts + 1;
      setAttempts(n);
      if (n >= 3) {
        setPhase("reveal");
        // 判断层证据：带上学生最终拼错的串（诊断混淆方向的原料）
        setTimeout(() => onDone(false, seq.map((f) => f.ch).join("")), 3200);
      } else {
        setPhase("tryagain");
        setTimeout(() => {
          setFilled([]);
          setTiles((ts) => ts.map((t) => ({ ...t, used: false })));
          setPhase("input");
        }, 650);
      }
    }
  };

  const tilesByKey = useMemo(() => tiles, [tiles]);

  return (
    <div className={phase === "tryagain" ? "ph-shake" : undefined}>
      {showHint && (
        <div className="ph-chips" aria-label="音标拆解提示">
          {phonemes.map((p, i) => (
            <span key={i} className="ph-chip ph-chip--hot">{p}</span>
          ))}
          <span className="ph-chip" style={{ borderStyle: "dashed" }}>{ipa}</span>
        </div>
      )}

      <div className="ph-slots">
        {Array.from({ length: target.length }).map((_, i) => {
          const f = filled[i];
          return (
            <button
              key={i}
              type="button"
              aria-label={`第 ${i + 1} 个字母${f ? `：${f.ch}` : "，空"}`}
              className={`ph-slot ${f ? "ph-slot--filled" : ""}`}
              onClick={() => f && undoFrom(i)}
            >
              {f?.ch ?? ""}
            </button>
          );
        })}
      </div>

      {phase === "reveal" && <p className="ph-reveal">{word.toUpperCase()}</p>}

      <div className="ph-tiles" role="listbox" aria-label="字母块">
        {tilesByKey.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`ph-tile ${t.used ? "ph-tile--used" : ""}`}
            onClick={() => pickTile(t)}
            aria-label={`字母 ${t.ch}`}
          >
            {t.ch}
          </button>
        ))}
      </div>

      {!done && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            className="ph-btn ph-btn--ghost ph-btn--sm"
            onClick={() => {
              setHinted(true);
              setShowHint(true);
            }}
            disabled={showHint}
          >
            <LightbulbIcon size={13} className="inline" /> 提示（看过不记通过）
          </button>
          <span className="text-xs font-bold" style={{ color: "var(--ph-ink-3)" }}>
            还剩 {3 - attempts} 次机会
          </span>
        </div>
      )}

      {phase === "correct" && (
        <p className="mt-5">
          <span className="ph-pill ph-pill--good inline-flex items-center gap-1"><PartyPopperIcon size={13} /> 拼对了！{word}</span>
        </p>
      )}
      {phase === "tryagain" && (
        <p className="mt-5">
          <span className="ph-pill ph-pill--bad">再想一想～</span>
        </p>
      )}
      {phase === "reveal" && (
        <p className="mt-3">
          <span className="ph-pill ph-pill--info">这个词进复习本了，别灰心！</span>
        </p>
      )}
    </div>
  );
}
