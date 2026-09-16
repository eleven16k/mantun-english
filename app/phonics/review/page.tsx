"use client";

/**
 * /phonics/review — 拼读复习本。
 * 数据源：本地单元进度里所有 FAILED 词（与 lexi 弱点本同源——错词已由
 * economy 接口写入服务端 weaknesses，这里是拼读模块的专项复习入口）。
 * 复习动作 = 拼词；通过时经 economy 上报 correct（correct_streak 达标后
 * 服务端自动从弱点本移除并奖励 SP——"攻克弱点"）。
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { LetterTiles } from "@/components/phonics/LetterTiles";
import { useI18n } from "@/lib/i18n";
import { isLoggedIn, submitAnswer } from "@/lib/api";
import { allWords } from "@/content/phonics/data";
import {
  failedWords,
  registerEconomySubmitter,
  speakWord,
  stopSpeech,
  unlockAudio,
} from "@/lib/phonics";
import "../phonics.css";

type ReviewItem = { text: string; ipa: string; phonemes: string[]; emoji: string; unitId: string };

export default function PhonicsReviewPage() {
  const { t } = useI18n();
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [active, setActive] = useState<ReviewItem | null>(null);
  const [cleared, setCleared] = useState<Set<string>>(new Set());
  const [reward, setReward] = useState({ coins: 0, sp: 0 });

  useEffect(() => {
    registerEconomySubmitter(async (wordId, isCorrect, prompt) => {
      if (!isLoggedIn()) return null; // 游客态跳过，避免全局 401 跳转
      const r = await submitAnswer(wordId, isCorrect, prompt);
      return {
        coins: r.coinsEarned,
        sp: r.spEarned,
        hearts: r.hearts,
        enteredWeakness: r.enteredWeakness,
        conqueredWeakness: r.conqueredWeakness,
      };
    });
    setItems(failedWords() as ReviewItem[]);
    return () => stopSpeech();
  }, []);

  const onDone = (item: ReviewItem, passed: boolean) => {
    void (async () => {
      // 游客态跳过经济上报——401 的全局跳转副作用发生在 fetchApi 内部，
      // 先于 .catch，必须调用前拦截
      if (!isLoggedIn()) {
        if (passed) setCleared((s) => new Set(s).add(item.text));
        return;
      }
      const r = await submitAnswer(
        `phonics:${item.unitId}:${item.text}`,
        passed,
        `复习拼词:${item.text}`,
      ).catch(() => null);
      if (r) setReward((x) => ({ coins: x.coins + (r.coinsEarned ?? 0), sp: x.sp + (r.spEarned ?? 0) }));
      if (passed) setCleared((s) => new Set(s).add(item.text));
    })();
  };

  return (
    <AppShell>
      <div className="ph-page" style={{ paddingTop: "2.5rem" }}>
        <div className="ph-wrap">
          <Link href="/phonics" className="ph-back">
            ← {t("phonics.backToLand")}
          </Link>

          <span className="ph-sticker">📖 REVIEW BOOK</span>
          <h1 className="ph-h1">{t("phonics.review")}</h1>
          <p className="ph-sub">{items.length ? t("phonics.reviewStart") : ""}</p>
          {reward.coins + reward.sp > 0 && (
            <p className="mt-3">
              <span className="ph-pill ph-pill--good">
                +{reward.coins} {t("phonics.coinsEarned")} · +{reward.sp} {t("phonics.spEarned")}
              </span>
            </p>
          )}

          {items.length === 0 ? (
            <div className="ph-card--ink ph-stage mt-6" style={{ padding: "3rem 1.5rem" }}>
              <p className="text-6xl">🌈</p>
              <p className="ph-h1" style={{ fontSize: "1.3rem" }}>
                {t("phonics.reviewEmpty")}
              </p>
              <Link href="/phonics" className="ph-btn mt-6 inline-flex">
                {t("phonics.backToLand")}
              </Link>
            </div>
          ) : (
            <div className="mt-6 flex flex-col gap-3">
              {items.map((item) => {
                const done = cleared.has(item.text);
                const open = active?.text === item.text;
                return (
                  <div key={`${item.unitId}-${item.text}`} className={done ? "ph-review-row" : "ph-card--ink"} style={{ borderRadius: "1.25rem" }}>
                    <div className="flex items-center gap-3" style={{ padding: open ? "0.9rem 1rem 0" : "0.8rem 1rem" }}>
                      <button
                        type="button"
                        className="ph-sound"
                        style={{ width: "2.8rem", height: "2.8rem", fontSize: "1.1rem" }}
                        aria-label={`play ${item.text}`}
                        onClick={() => {
                          unlockAudio();
                          void speakWord(item.text, 0.6).then(() => speakWord(item.text, 1));
                        }}
                      >
                        🔊
                      </button>
                      <span className="text-3xl">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-lg">
                          {item.text}{" "}
                          <span className="text-xs font-bold" style={{ color: "var(--ph-ink-3)" }}>
                            {item.ipa}
                          </span>
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.phonemes.map((p, i) => (
                            <span key={i} className="ph-chip" style={{ padding: "0.1rem 0.5rem", fontSize: "0.75rem" }}>
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                      {done ? (
                        <span className="ph-pill ph-pill--good">✓</span>
                      ) : (
                        <button
                          type="button"
                          className="ph-btn ph-btn--sm"
                          onClick={() => setActive(open ? null : item)}
                        >
                          {open ? "×" : t("phonics.again")}
                        </button>
                      )}
                    </div>
                    {open && !done && (
                      <div style={{ padding: "1rem" }}>
                        <LetterTiles
                          word={item.text}
                          ipa={item.ipa}
                          phonemes={item.phonemes}
                          onDone={(passed) => onDone(item, passed)}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
