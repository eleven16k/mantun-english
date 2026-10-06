"use client";

/**
 * WordBuilder — 字母拼装：听单词（自动播放），点乱序字母卡组词；点已填
 * 字母撤回，填满自动判定；「看答案」揭示且本题不得分（对齐句法馆 peek 规则）。
 */

import { useEffect, useState } from "react";
import { PartyPopperIcon } from "@/components/SvgIcons";

import { useI18n } from "@/lib/i18n";
import { quizAudioUrl } from "@/content/reading";
import type { ReadingQuizWordBuilder, ReadingTrack } from "@/content/reading/types";
import { QuestPlayButton, type QuestSpeed } from "./ParagraphAudio";

interface Props {
  q: ReadingQuizWordBuilder;
  storyId: string;
  track: ReadingTrack;
  quizIdx: number;
  speed: QuestSpeed;
  onDone: (passed: boolean, attempt?: string) => void;
}

interface Tile {
  id: number;
  ch: string;
  used: boolean;
}

function makeTiles(word: string): Tile[] {
  const letters = word.toLowerCase().split("");
  let tiles = letters.map((ch, id) => ({ id, ch, used: false }));
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  const identical = tiles.every((t, i) => t.ch === letters[i]);
  if (identical && letters.length > 2) tiles = [...tiles].reverse();
  return tiles;
}

type Phase = "input" | "correct" | "reveal";

export function WordBuilder({ q, storyId, track, quizIdx, speed, onDone }: Props) {
  const { t } = useI18n();
  const word = q.word.toLowerCase();
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [built, setBuilt] = useState<{ ch: string; id: number }[]>([]);
  const [phase, setPhase] = useState<Phase>("input");
  const [peeked, setPeeked] = useState(false);
  const [showPeek, setShowPeek] = useState(false);

  useEffect(() => {
    setTiles(makeTiles(word));
    setBuilt([]);
    setPhase("input");
    setPeeked(false);
    setShowPeek(false);
  }, [word]);

  const done = phase === "correct" || phase === "reveal";

  const pickTile = (tile: Tile) => {
    if (done || phase !== "input" || tile.used) return;
    const next = [...built, { ch: tile.ch, id: tile.id }];
    setBuilt(next);
    setTiles((ts) => ts.map((x) => (x.id === tile.id ? { ...x, used: true } : x)));
    if (next.length === word.length) {
      const ok = next.map((b) => b.ch).join("") === word;
      setPhase(ok ? "correct" : "reveal");
      if (!ok) setPeeked(true);
      setTimeout(() => onDone(ok && !peeked, next.map((b) => b.ch).join("")), ok ? 1000 : 1800);
    }
  };

  const undoFrom = (slotIdx: number) => {
    if (done || phase !== "input") return;
    const removed = built.slice(slotIdx);
    const ids = new Set(removed.map((r) => r.id));
    setBuilt(built.slice(0, slotIdx));
    setTiles((ts) => ts.map((x) => (ids.has(x.id) ? { ...x, used: false } : x)));
  };

  const peek = () => {
    if (done || showPeek) return;
    setPeeked(true);
    setShowPeek(true);
    setTimeout(() => setShowPeek(false), 2000);
  };

  return (
    <div>
      <div className="mt-1 flex items-center justify-center gap-3">
        <QuestPlayButton
          src={quizAudioUrl(track, storyId, quizIdx)}
          slowSrc={quizAudioUrl(track, storyId, quizIdx, true)}
          fallbackText={q.audioText || word}
          speed={speed}
          auto
        />
      </div>

      <div className="sn-slots" aria-label="letter slots" style={{ justifyContent: "center", marginTop: "1.25rem" }}>
        {word.split("").map((_, i) => {
          const b = built[i];
          return (
            <button
              key={i}
              type="button"
              className={`sn-slot ${b ? "sn-slot--filled" : ""}`}
              style={{ width: "2.4rem", minWidth: "2.4rem" }}
              onClick={() => b && undoFrom(i)}
              aria-label={`第 ${i + 1} 个字母`}
            >
              {b?.ch ?? ""}
            </button>
          );
        })}
      </div>

      {showPeek && <p className="sn-peek" style={{ textAlign: "center" }}>{word}</p>}
      {phase === "reveal" && (
        <p className="ph-reveal" style={{ textAlign: "center", letterSpacing: "0.2em" }}>{word}</p>
      )}

      <div className="sn-chips" role="listbox" aria-label="letters" style={{ justifyContent: "center" }}>
        {tiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            className={`sn-chip-word ${tile.used ? "sn-chip-word--used" : ""}`}
            onClick={() => pickTile(tile)}
            aria-label={`字母 ${tile.ch}`}
            style={{ minWidth: "2.6rem" }}
          >
            {tile.ch}
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
          <span className="ph-pill ph-pill--good inline-flex items-center gap-1"><PartyPopperIcon size={13} /> {t("reading.nice")}</span>
        </p>
      )}
    </div>
  );
}
