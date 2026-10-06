"use client";

/**
 * WordIdentifyCard — 辨认步（4 选 1 词义）。展示单词+音标+发音，
 * 从同词书抽 3 个干扰释义；选错标红抖动并计错误，选对自动过。
 */

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { speakEn } from "@/lib/speak";
import { VolumeIcon } from "@/components/icons";
import { PartyPopperIcon } from "@/components/SvgIcons";
import type { WordBook, WordEntry } from "@/lib/typing";
import { makeIdentifyChoices } from "@/lib/typing";

interface Props {
  book: WordBook;
  word: WordEntry;
  onPass: () => void;
  onWrong: () => void;
}

export function WordIdentifyCard({ book, word, onPass, onWrong }: Props) {
  const { t } = useI18n();
  const [picked, setPicked] = useState<string | null>(null);
  const [wrongPicks, setWrongPicks] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  // 干扰项固定生成一次（重渲染不换选项）
  const choices = useMemo(() => makeIdentifyChoices(book, word), [book, word]);

  useEffect(() => {
    setPicked(null);
    setWrongPicks([]);
    setShake(false);
    const timer = setTimeout(() => speakEn(word.en), 300);
    return () => clearTimeout(timer);
  }, [word.en]);

  const pick = (cn: string) => {
    if (picked === word.cn || wrongPicks.includes(cn)) return; // 已答对 / 已排除项不可再点
    setPicked(cn);
    if (cn === word.cn) {
      speakEn(word.en).catch(() => {});
      setTimeout(onPass, 650);
    } else {
      setWrongPicks((w) => [...w, cn]);
      onWrong();
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className={`tp-stage-card ${shake ? "tp-shake" : ""}`}>
      <span className="tp-step-tag">{t("typing.stepIdentify")}</span>

      <div className="tp-target">
        <span className="tp-target-word">{word.en}</span>
      </div>
      {word.phonetic && <div className="tp-phonetic">{word.phonetic}</div>}

      <button type="button" className="tp-speaker tp-speaker--svg" aria-label="play" onClick={() => speakEn(word.en)}>
        <VolumeIcon size={24} />
      </button>

      <div className="tp-choices">
        {choices.map((cn) => {
          const isRight = cn === word.cn;
          const isWrongPick = wrongPicks.includes(cn);
          // 点过的错项保持红色禁用（排除法）；答对后对项亮绿、其余变暗
          const state =
            picked === word.cn
              ? isRight
                ? "right"
                : "dim"
              : isWrongPick
                ? "wrong"
                : "idle";
          return (
            <button
              key={cn}
              type="button"
              className={`tp-choice tp-choice--${state}`}
              onClick={() => pick(cn)}
              disabled={picked === word.cn || isWrongPick}
            >
              {cn}
            </button>
          );
        })}
      </div>

      <div className="tp-feedback">
        {picked === word.cn ? (
          <span style={{ color: "var(--ph-green)" }} className="inline-flex items-center gap-1"><PartyPopperIcon size={14} /> {t("typing.nice")}</span>
        ) : picked ? (
          <span style={{ color: "var(--ph-red)" }}>{t("typing.wrong")}</span>
        ) : (
          <span style={{ color: "var(--ph-ink-3)" }}>{t("typing.identifyHint")}</span>
        )}
      </div>
    </div>
  );
}
