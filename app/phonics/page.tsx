"use client";

/**
 * /phonics — 拼读馆主页。
 * 三个区块（对齐方案 §3.1）：音标图鉴（44 音标 8 组分组）· 单词闯关（课程地图）
 * · 复习本（错词聚合）。皮肤：juyouenglish 子主题（ph- 前缀，暖色浅色固定，
 * 不跟随全站深色模式——低龄模块决策，方案 §7 R3）。
 */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import {
  PHONEMES,
  PHONEME_GROUP_META,
  PHONICS_LEVELS,
  type PhonemeGroup,
} from "@/content/phonics/data";
import { masteredPhonemeSymbols, phonicsStats, unlockAudio, underlineParts } from "@/lib/phonics";
import "./phonics.css";

const GROUP_ORDER: PhonemeGroup[] = [
  "short",
  "long",
  "diphthong",
  "plosive",
  "fricative",
  "affricate",
  "nasal",
  "liquid",
];

export default function PhonicsPage() {
  const { t } = useI18n();
  // 水合安全：首帧渲染固定值（与服务端一致），挂载后再读 localStorage——
  // 若在 render 期读本地存储，SSR "0/3" vs 客户端 "3/3" 会触发 hydration 错误
  const [mastered, setMastered] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState({ cleared: 0, total: 0, words: 0, failed: [] as string[] });

  useEffect(() => {
    setMastered(masteredPhonemeSymbols());
    setStats(phonicsStats());
  }, []);

  const grouped = useMemo(() => {
    return GROUP_ORDER.map((g) => ({
      group: g,
      items: PHONEMES.filter((p) => p.group === g),
    }));
  }, []);

  return (
    <AppShell>
      <div className="ph-page">
        <div className="ph-wrap">
          <span className="ph-sticker">🔤 PHONICS · 44 SOUNDS</span>
          <h1 className="ph-h1">{t("phonics.title")}</h1>
          <p className="ph-sub">{t("phonics.sub")}</p>

          {/* ── 单词闯关（课程地图）── */}
          <div className="ph-group-title">
            🗺️ {t("phonics.levels")} <small>{t("phonics.levelsSub")}</small>
          </div>
          <div className="ph-level-list">
            {PHONICS_LEVELS.map((level) => (
              <div key={level.id} className={`ph-card ${level.status === "soon" ? "ph-card--locked" : ""}`}>
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <b className="font-black text-[1.05rem]">{level.name}</b>
                  {level.status === "soon" ? (
                    <span className="ph-pill ph-pill--gold">⏳ {t("phonics.soon")}</span>
                  ) : (
                    <span className="ph-pill ph-pill--info">
                      {stats.cleared}/{level.units.length} {t("phonics.cleared")}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm font-semibold" style={{ color: "var(--ph-ink-3)" }}>
                  {level.desc}
                </p>

                {level.status === "live" && (
                  <div className="mt-4 flex flex-col gap-2.5">
                    {level.units.map((unit) => {
                      const isCleared = stats.cleared > 0 && unit.number <= stats.cleared;
                      return (
                        <div key={unit.id} className="ph-unit-row">
                          <span className={`ph-unit-num ${isCleared ? "ph-unit-num--done" : ""}`}>
                            {isCleared ? "✓" : unit.number}
                          </span>
                          <div className="ph-unit-main">
                            <p className="ph-unit-title">
                              {unit.title} <span style={{ color: "var(--ph-blue-deep)" }}>{unit.focus}</span>
                            </p>
                            <p className="ph-unit-meta">
                              {unit.words.length} {t("phonics.words")}
                            </p>
                          </div>
                          <Link href={`/phonics/unit/${unit.id}`} className="ph-btn ph-btn--sm">
                            {t("phonics.start")}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* 复习本入口 */}
            <Link href="/phonics/review" className="ph-card ph-card--lift block">
              <div className="ph-unit-row">
                <span className="ph-unit-num" style={{ background: "var(--ph-red-bg)" }}>📖</span>
                <div className="ph-unit-main">
                  <p className="ph-unit-title">{t("phonics.review")}</p>
                  <p className="ph-unit-meta">{t("phonics.reviewSub")}</p>
                </div>
                {stats.failed.length > 0 ? (
                  <span className="ph-pill ph-pill--bad">{stats.failed.length}</span>
                ) : (
                  <span className="ph-pill ph-pill--good">✓</span>
                )}
              </div>
            </Link>
          </div>

          {/* ── 音标图鉴 ── */}
          <div className="ph-group-title">
            🔤 {t("phonics.chart")} <small>{t("phonics.chartSub")}</small>
          </div>
          <p className="mb-3 text-xs font-bold" style={{ color: "var(--ph-ink-3)" }}>
            {mastered.size} / {PHONEMES.length} {t("phonics.mastered")}
          </p>
          {grouped.map(({ group, items }) => (
            <div key={group}>
              <p className="ph-group-title" style={{ marginTop: "1.25rem" }}>
                {PHONEME_GROUP_META[group].label}{" "}
                <small>
                  {PHONEME_GROUP_META[group].en} · {items.length}
                </small>
              </p>
              <div className="ph-phoneme-grid">
                {items.map((p) => {
                  const on = mastered.has(p.symbol);
                  return (
                    <Link
                      key={p.slug}
                      href={`/phonics/phoneme/${p.slug}`}
                      className={`ph-phoneme ${on ? "ph-phoneme--on" : ""}`}
                      onClick={() => unlockAudio()}
                      title={p.exampleWord}
                    >
                      <span
                        className="ph-dot"
                        style={{ background: PHONEME_GROUP_META[group].hue, opacity: on ? 1 : 0.35 }}
                      />
                      <b>{p.symbol}</b>
                      <span className="ph-ul-word">
                        {underlineParts(p.exampleWord, p.grapheme).map((seg, i2) =>
                          seg.ul ? (
                            <i key={i2} className="ph-ul" style={{ textDecorationColor: PHONEME_GROUP_META[group].hue }}>{seg.text}</i>
                          ) : (
                            <span key={i2}>{seg.text}</span>
                          ),
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
