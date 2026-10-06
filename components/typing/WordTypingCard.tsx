"use client";

/**
 * WordTypingCard — 单词级打字卡（抽卡打字馆核心交互）。
 * 歌词进度式着色：目标词大字随输入逐字符变色（打对绿/打错红+卡片震动），
 * 不再有下方输入显示区——隐藏受控 input 盖住整卡收集击键（opacity 0.01 +
 * 16px 防 iOS 聚焦缩放）。听写/默写模式词面模糊遮挡，打对部分在揭示后可见。
 * 音效：Web Audio 合成（lib/sound.ts，遵循设置页 soundOn/hapticOn）——
 * 打对嗒声 / 打错低鸣+震动 / 通关上扬双音。连错 3 次自动揭示答案。
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { speakEn } from "@/lib/speak";
import { keyClick, keyError, successChime, vibrate, warmupSound } from "@/lib/sound";
import { VolumeIcon } from "@/components/icons";
import { PartyPopperIcon } from "@/components/SvgIcons";
import { typingMatch, type TypingStepId, type WordEntry } from "@/lib/typing";

const MAX_WRONG_BEFORE_REVEAL = 3;

interface Props {
  step: TypingStepId;
  word: WordEntry;
  /** 打对（自动过） */
  onPass: () => void;
  /** 打错一次（父级记 wrongCount / 上报） */
  onWrong: () => void;
}

export function WordTypingCard({ step, word, onPass, onWrong }: Props) {
  const { t } = useI18n();
  const [input, setInput] = useState("");
  const [wrong, setWrong] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(false);
  const [reveal, setReveal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevLen = useRef(0);

  const masked = step === "dictation" || step === "listen";

  // 换词重置；听写/默写自动播一遍发音
  useEffect(() => {
    setInput("");
    setWrong(0);
    setDone(false);
    setShake(false);
    setReveal(false);
    prevLen.current = 0;
    inputRef.current?.focus({ preventScroll: true });
    warmupSound();
    if (masked) {
      const timer = setTimeout(() => speakEn(word.en), 350);
      return () => clearTimeout(timer);
    }
  }, [word.en, masked]); // eslint-disable-line react-hooks/exhaustive-deps

  // 歌词进度着色：已输入位逐字符比对（对绿/错红），未到位保持墨色
  const chars = useMemo(() => {
    return word.en.split("").map((ch, i) => ({
      ch,
      state: i < input.length ? (input[i] === ch ? "ok" : "bad") : i === input.length ? "cursor" : "pending",
    }));
  }, [word.en, input]);

  const finish = () => {
    setDone(true);
    successChime();
    speakEn(word.en).catch(() => {});
    setTimeout(onPass, 750);
  };

  const onChange = (v: string) => {
    if (done) return;
    // 新增字符的即时音效/震动（删除不响）
    if (v.length > input.length) {
      const idx = v.length - 1;
      const hit = idx < word.en.length && v[idx] === word.en[idx];
      if (hit) {
        keyClick();
      } else {
        keyError();
        vibrate(60);
      }
    }
    setInput(v);
    if (typingMatch(word.en, v)) finish();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || done) return;
    if (!typingMatch(word.en, input)) {
      setWrong((w) => {
        const next = w + 1;
        if (next >= MAX_WRONG_BEFORE_REVEAL) setReveal(true);
        return next;
      });
      onWrong();
      keyError();
      vibrate(80);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const hint = step === "follow" ? t("typing.followHint") : t("typing.dictationHint");
  const stepLabel = step === "follow" ? t("typing.stepFollow") : t("typing.stepDictation");

  return (
    <div className="tp-stage-wrap">
      <div className={`tp-stage-card ${shake ? "tp-shake" : ""}`}>
        <span className="tp-step-tag">{stepLabel}</span>

        {/* 目标词：歌词进度式逐字符着色（听写/默写模糊遮挡，揭示后可见进度） */}
        <div
          className={`tp-target ${masked && !reveal && !done ? "tp-target--masked" : ""}`}
          onClick={() => !done && inputRef.current?.focus({ preventScroll: true })}
        >
          {chars.map((c, i) => (
            <span key={i} className={`tp-key tp-key--${c.state}`}>
              {c.ch}
            </span>
          ))}
        </div>
        {word.phonetic && <div className="tp-phonetic">{word.phonetic}</div>}

        {masked && <div className="tp-cn">{word.pos ? `${word.pos} ${word.cn}` : word.cn}</div>}

        <button type="button" className="tp-speaker tp-speaker--svg" aria-label="play" onClick={() => speakEn(word.en)}>
          <VolumeIcon size={22} />
        </button>

        {/* 单词解析：跟打常显（无剧透）；听写/默写答完后补解析 */}
        {(step === "follow" || done) && (
          <div className="tp-info">
            <p className="tp-info-cn">
              {word.pos ? <b>{word.pos}</b> : null}
              {word.cn}
            </p>
            {word.example && (
              <p className="tp-info-ex">
                <span className="tp-info-ex-en">{word.example}</span>
                {word.exampleCn && <span className="tp-info-ex-cn">{word.exampleCn}</span>}
              </p>
            )}
          </div>
        )}

        {/* 隐藏受控 input：盖住整卡收集击键 */}
        <input
          ref={inputRef}
          className="tp-input-cover"
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
          aria-label={t("typing.typeHere")}
        />

        <div className="tp-feedback">
          {done ? (
            <span style={{ color: "var(--text-positive, #15803d)" }} className="inline-flex items-center gap-1">
              <PartyPopperIcon size={14} /> {t("typing.nice")}
            </span>
          ) : wrong > 0 ? (
            <span style={{ color: "var(--text-critical, #dc2626)" }}>{t("typing.wrong")}</span>
          ) : (
            <span style={{ color: "var(--text-tertiary, #94a3b8)" }}>{hint}</span>
          )}
        </div>
      </div>
    </div>
  );
}
