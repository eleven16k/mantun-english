"use client";

/**
 * /phonics — 拼读馆主页。
 * 三个区块（对齐方案 §3.1）：音标图鉴（44 音标 8 组分组）· 单词闯关（课程地图）
 * · 复习本（错词聚合）。皮肤：juyouenglish 子主题（ph- 前缀，暖色浅色固定，
 * 不跟随全站深色模式——低龄模块决策，方案 §7 R3）。
 */

import Link from "next/link";
import { AbcIcon, PigIcon, MapIcon, HourglassIcon, CheckIcon, BookOpenIcon } from "@/components/icons";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { getPhonemeProfile } from "@/lib/api";
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
  // V8-E2 发音画像：弱项定向 banner（数据足够才显示，宁缺毋滥）
  const [weakTag, setWeakTag] = useState<string | null>(null);

  useEffect(() => {
    setMastered(masteredPhonemeSymbols());
    setStats(phonicsStats());
    getPhonemeProfile()
      .then((p) => setWeakTag(p.ready && p.weak.length > 0 ? p.weak[0].tag : null))
      .catch(() => {});
  }, []);

  // 弱项 tag → 最贴近的既有关卡（词首匹配 > 音标 focus 匹配）
  const weakUnit = useMemo(() => {
    if (!weakTag) return null;
    const FOCUS_SYM: Record<string, string> = { th: "θ", sh: "ʃ", ch: "tʃ", r: "r", l: "l", v_w: "v", s: "s" };
    for (const level of PHONICS_LEVELS) {
      for (const unit of level.units ?? []) {
        if (unit.words?.some((w) => w.text.toLowerCase().startsWith(weakTag))) return unit;
        const sym = FOCUS_SYM[weakTag];
        if (sym && unit.focus?.includes(sym)) return unit;
      }
    }
    return null;
  }, [weakTag]);

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
          <span className="ph-sticker">PHONICS · 44 SOUNDS</span>
          <h1 className="ph-h1">{t("phonics.title")}</h1>
          <p className="ph-sub">{t("phonics.sub")}</p>

          {/* ── E2 弱项专攻 banner（跟读画像驱动）── */}
          {weakTag && (
            <Link href={weakUnit ? `/phonics/unit/${weakUnit.id}` : "/phonics/review"} className="mb-5 flex items-center gap-3 rounded-2xl border-2 border-[var(--ph-amber, #E8B54D)] bg-[#FFF6E3] p-4">
              <span className="text-2xl text-brand-text inline-flex"><PigIcon size={26} /></span>
              <span className="min-w-0 flex-1">
                <b className="block text-sm font-black" style={{ color: "var(--ph-ink, #3B2F1E)" }}>
                  {t("phonics.weakBanner").replace("{tag}", weakTag)}
                </b>
                <small className="block text-xs" style={{ color: "var(--ph-ink-3, #8A7A5C)" }}>
                  {weakUnit ? `${t("phonics.weakUnit")}: ${weakUnit.title} ${weakUnit.focus}` : t("phonics.weakGoReview")}
                </small>
              </span>
              <span className="ph-pill ph-pill--gold">{t("phonics.weakCta")}</span>
            </Link>
          )}

          {/* ── 单词闯关（课程地图）── */}
          <div className="ph-group-title">
            <MapIcon size={15} className="inline" /> {t("phonics.levels")} <small>{t("phonics.levelsSub")}</small>
          </div>
          <div className="ph-level-list">
            {PHONICS_LEVELS.map((level) => (
              <div key={level.id} className={`ph-card ${level.status === "soon" ? "ph-card--locked" : ""}`}>
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <b className="font-black text-[1.05rem]">{level.name}</b>
                  {level.status === "soon" ? (
                    <span className="ph-pill ph-pill--gold inline-flex items-center gap-1"><HourglassIcon size={12} /> {t("phonics.soon")}</span>
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
                            {isCleared ? <CheckIcon size={15} /> : unit.number}
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
                <span className="ph-unit-num inline-flex items-center justify-center" style={{ background: "var(--ph-red-bg)" }}><BookOpenIcon size={15} /></span>
                <div className="ph-unit-main">
                  <p className="ph-unit-title">{t("phonics.review")}</p>
                  <p className="ph-unit-meta">{t("phonics.reviewSub")}</p>
                </div>
                {stats.failed.length > 0 ? (
                  <span className="ph-pill ph-pill--bad">{stats.failed.length}</span>
                ) : (
                  <span className="ph-pill ph-pill--good"><CheckIcon size={13} /></span>
                )}
              </div>
            </Link>
          </div>

          {/* ── 音标图鉴 ── */}
          <div className="ph-group-title">
            <AbcIcon size={15} className="inline" /> {t("phonics.chart")} <small>{t("phonics.chartSub")}</small>
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
