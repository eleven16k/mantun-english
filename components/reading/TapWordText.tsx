"use client";

/**
 * TapWordText — 阅读文本点词查义。
 * 把英文段落按词切分为可点击 token，点击后查统一词库（lexicon，懒加载）
 * 并在点击位置附近弹出释义浮条（词/音标/词性/释义）；点其它区域关闭。
 * 词库未收录的词点击无响应（不打断阅读流）。
 */

import { useEffect, useRef, useState } from "react";
import { lookupLexicon, type LexiconEntry } from "@/lib/lexicon";

interface Pop {
  word: string;
  entry: LexiconEntry;
  x: number;
  y: number;
}

export function TapWordText({ text }: { text: string }) {
  const [pop, setPop] = useState<Pop | null>(null);
  const rootRef = useRef<HTMLSpanElement>(null);

  // 点击浮条外关闭
  useEffect(() => {
    if (!pop) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest?.("[data-tap-pop]")) setPop(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [pop]);

  const onWordClick = async (word: string, e: React.MouseEvent) => {
    const raw = word.toLowerCase().replace(/[^a-z'-]/g, "");
    if (!raw) return;
    const entry = await lookupLexicon(raw);
    if (!entry) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPop({ word: raw, entry, x: rect.left + rect.width / 2, y: rect.bottom });
  };

  // 词 token：按空白切，标点附着在词上（点击时剥离）
  const tokens = text.split(/(\s+)/);

  return (
    <span ref={rootRef} style={{ display: "block" }}>
      {tokens.map((tok, i) =>
        /^\s+$/.test(tok) ? (
          <span key={i}>{tok}</span>
        ) : (
          <span
            key={i}
            className="rq-tap-word"
            onClick={(e) => onWordClick(tok, e)}
          >
            {tok}
          </span>
        ),
      )}
      {pop && (
        <span
          data-tap-pop
          className="rq-tap-pop"
          style={{ left: Math.min(pop.x, (typeof window !== "undefined" ? window.innerWidth : 400) - 130), top: pop.y + 6 }}
        >
          <b>{pop.word}</b>
          {pop.entry.phonetic && <i>{pop.entry.phonetic}</i>}
          <em>{[pop.entry.pos, pop.entry.cn].filter(Boolean).join(" ")}</em>
        </span>
      )}
    </span>
  );
}
