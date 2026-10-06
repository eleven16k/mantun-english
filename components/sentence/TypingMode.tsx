"use client";

/**
 * TypingMode — 句法馆题型「键盘打字」（句乐部式：看中文敲英文）。
 * 一个真实受控 <input> 盖住舞台收集击键（opacity 0.01 + fontSize 16px 防
 * iOS 聚焦缩放，绝不 display:none）；目标句按词渲染，已提交词整词 ok/bad、
 * 当前词逐字符着色；自由退格自纠、无生命值；Enter 不匹配仅装饰性抖动。
 * 「看答案」该句不计通过（对齐拼读馆提示规则）。
 */

import { useEffect, useRef, useState } from "react";
import { PartyPopperIcon } from "@/components/SvgIcons";

import { KeyboardIcon } from "@/components/icons";

import { useI18n } from "@/lib/i18n";
import { typingStates, typingDone } from "@/lib/sentence";
import type { Sentence } from "@/content/sentence/data";

interface Props {
  sentence: Sentence;
  /** passed = 未看答案敲对；failed = 看过答案 */
  onDone: (passed: boolean, attempt?: string) => void;
}

export function TypingMode({ sentence, onDone }: Props) {
  const { t } = useI18n();
  const [input, setInput] = useState("");
  const [peeked, setPeeked] = useState(false);
  const [showPeek, setShowPeek] = useState(false);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 换句重置（桌面端顺手聚焦；移动端由「点这里输入」按钮/点舞台唤起）
  useEffect(() => {
    setInput("");
    setPeeked(false);
    setShowPeek(false);
    setDone(false);
    setShake(false);
    inputRef.current?.focus({ preventScroll: true });
  }, [sentence.en]);

  const onChange = (v: string) => {
    if (done) return;
    setInput(v);
    if (typingDone(sentence.en, v)) {
      setDone(true);
      setTimeout(() => onDone(!peeked, v), 900);
    }
  };

  // Enter：匹配即过；不匹配仅抖动提示（打字错误靠退格自纠）
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || done) return;
    if (!typingDone(sentence.en, input)) {
      setShake(true);
      setTimeout(() => setShake(false), 550);
    }
  };

  const peek = () => {
    if (done || showPeek) return;
    setPeeked(true);
    setShowPeek(true);
    setTimeout(() => setShowPeek(false), 2000);
  };

  const states = typingStates(sentence.en, input);

  return (
    <div>
      <p className="sn-cn">{sentence.cn}</p>

      <div
        className={`relative ${shake ? "ph-shake" : ""}`}
        style={{ cursor: "text" }}
        onClick={() => !done && inputRef.current?.focus({ preventScroll: true })}
      >
        {/* 目标句 token 渲染（打字家教式逐词/逐字符着色） */}
        <div className="sn-toks" aria-label="目标句">
          {states.map((w, i) => (
            <span key={i} className={`sn-tok--${w.status}`}>
              {w.status === "current" && w.chars ? (
                w.chars.map((c, j) => (
                  <span key={j} className={c.ok === undefined ? undefined : c.ok ? "sn-char--ok" : "sn-char--bad"}>
                    {c.ok === undefined ? "_" : c.ch}
                  </span>
                ))
              ) : (
                w.target
              )}
              {w.status === "current" && <span className="caret" />}
            </span>
          ))}
        </div>

        {/* 真实输入层：盖住舞台，击键全部落在它身上 */}
        <input
          ref={inputRef}
          className="sn-input-cover"
          value={input}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={done}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          inputMode="text"
          enterKeyHint="done"
          aria-label={t("sentence.typeIt")}
        />
      </div>

      {!done && (
        <p className="text-center text-xs font-bold" style={{ color: "var(--ph-ink-3)" }}>
          <KeyboardIcon size={13} className="inline" /> {t("sentence.typeHint")}
        </p>
      )}

      {showPeek && <p className="sn-peek">{sentence.en}</p>}

      {!done && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button type="button" className="ph-btn ph-btn--ghost ph-btn--sm" onClick={peek} disabled={showPeek}>
            {t("sentence.peek")}
          </button>
          <span className="text-xs font-bold" style={{ color: "var(--ph-ink-3)" }}>
            {t("sentence.peekNote")}
          </span>
        </div>
      )}

      {done && (
        <p className="mt-5">
          <span className="ph-pill ph-pill--good inline-flex items-center gap-1"><PartyPopperIcon size={13} /> {t("sentence.nice")}</span>
        </p>
      )}
    </div>
  );
}
