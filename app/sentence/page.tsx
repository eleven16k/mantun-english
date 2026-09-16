"use client";

/**
 * /sentence — 句法馆主页。
 * 区块：三种玩法介绍卡（单词拼图/键盘打字/语音口语）· 课程包（对齐句游
 * 课程线：零基础入门/升学考试/商务职场，课解锁 = 上一课任一玩法通关）
 * · 每包「AI 加练」（AI 出句，失败回退内置句库混排）。
 * 皮肤：juyou 子主题（复用拼读馆 ph- 类 + 句法馆 sn- 件）。
 */

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/lib/i18n";
import { generateSentences, isLoggedIn } from "@/lib/api";
import { shuffle } from "@/lib/phonics";
import { SENTENCE_PACKS, type SentencePack } from "@/content/sentence/data";
import {
  SENTENCE_MODES,
  getLessonProgress,
  type LessonProgress,
} from "@/lib/sentence";
import "../phonics/phonics.css";
import "./sentence.css";

/** AI 伪课句子经 sessionStorage 交接给 /sentence/ai-{packId} 会话页 */
const AI_SESSION_KEY = "lexi-sentence-ai";

const MODE_CARDS = [
  { mode: "puzzle", icon: "🧩", titleKey: "sentence.modePuzzle", descKey: "sentence.modePuzzleDesc" },
  { mode: "typing", icon: "⌨️", titleKey: "sentence.modeTyping", descKey: "sentence.modeTypingDesc" },
  { mode: "speaking", icon: "🎤", titleKey: "sentence.modeSpeaking", descKey: "sentence.modeSpeakingDesc" },
] as const;

export default function SentencePage() {
  const { t } = useI18n();
  const router = useRouter();
  // 水合安全：首帧渲染固定值（全部未解锁态），挂载后再读 localStorage
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [aiBusy, setAiBusy] = useState<SentencePack["id"] | null>(null);
  const [aiNote, setAiNote] = useState<string | null>(null);

  useEffect(() => {
    const next: Record<string, LessonProgress> = {};
    for (const pack of SENTENCE_PACKS) {
      for (const lesson of pack.lessons) {
        next[lesson.id] = getLessonProgress(lesson.id);
      }
    }
    setProgress(next);
  }, []);

  const modeDots = (lessonId: string) => {
    const lp = progress[lessonId] ?? {};
    return (
      <span className="sn-mode-dots">
        {SENTENCE_MODES.map((m) => (
          <i key={m} className={lp[m]?.clearedAt ? "on" : ""} />
        ))}
      </span>
    );
  };

  // 解锁/通关口径一律走 progress state（render 期直读 localStorage 会造成
  // SSR 首帧与服务端不一致 → hydration 错误；拼读馆同款教训）
  const anyClearedOf = (lessonId: string) =>
    SENTENCE_MODES.some((m) => !!progress[lessonId]?.[m]?.clearedAt);

  const unlockedOf = (lessonId: string, pack: SentencePack) => {
    const sorted = [...pack.lessons].sort((a, b) => a.number - b.number);
    const i = sorted.findIndex((l) => l.id === lessonId);
    if (i <= 0) return true;
    return anyClearedOf(sorted[i - 1].id);
  };

  const startAi = async (pack: SentencePack) => {
    setAiBusy(pack.id);
    setAiNote(null);
    const fallbackSentences = () =>
      shuffle(pack.lessons.flatMap((l) => l.sentences)).slice(0, 8);
    let sentences = fallbackSentences();
    let note = t("sentence.aiNote");
    // 游客不调 AI：fetchApi 的 401 处理器会直接跳登录页，必须先挡
    if (isLoggedIn()) {
      try {
        const res = await generateSentences(pack.id);
        if (res.generated && res.sentences.length > 0) {
          sentences = res.sentences;
          note = null;
        }
      } catch (e) {
        // 429 配额耗尽：提示后仍可用内置句库加练（加练不设门槛）
        const msg = e instanceof Error ? e.message : "";
        if (msg.includes("ai_quota_exceeded")) {
          setAiBusy(null);
          setAiNote(t("sentence.quota"));
          return;
        }
        // 网络失败等：静默回退内置句库
      }
    }
    try {
      sessionStorage.setItem(AI_SESSION_KEY, JSON.stringify({ packId: pack.id, sentences }));
      router.push(`/sentence/ai-${pack.id}`);
    } finally {
      setAiBusy(null);
      if (note) setAiNote(note);
    }
  };

  return (
    <AppShell>
      <div className="ph-page">
        <div className="ph-wrap">
          <span className="ph-sticker">🧩 SENTENCE · 3 WAYS</span>
          <h1 className="ph-h1">{t("sentence.title")}</h1>
          <p className="ph-sub">{t("sentence.sub")}</p>

          {/* ── 三种玩法 ── */}
          <div className="ph-group-title">
            🎮 {t("sentence.modes")}
          </div>
          <div className="sn-modes">
            {MODE_CARDS.map((c) => (
              <div key={c.mode} className="sn-mode-card">
                <i className={c.mode}>{c.icon}</i>
                <b>{t(c.titleKey)}</b>
                <span>{t(c.descKey)}</span>
              </div>
            ))}
          </div>

          {/* ── 课程包 ── */}
          <div className="ph-group-title">
            📚 {t("sentence.packs")}
          </div>
          {aiNote && (
            <p className="mb-3 text-xs font-bold" style={{ color: "var(--ph-orange)" }}>
              {aiNote}
            </p>
          )}
          <div className="ph-level-list">
            {SENTENCE_PACKS.map((pack) => {
              const clearedCount = pack.lessons.filter((l) => anyClearedOf(l.id)).length;
              return (
                <div key={pack.id} className={`ph-card ${pack.status === "soon" ? "ph-card--locked" : ""}`}>
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <b className="font-black text-[1.05rem]">
                      {pack.icon} {pack.cnName} · {pack.name}
                    </b>
                    {pack.status === "soon" ? (
                      <span className="ph-pill ph-pill--gold">⏳ SOON</span>
                    ) : (
                      <span className="ph-pill ph-pill--info">
                        {clearedCount}/{pack.lessons.length} {t("sentence.cleared")}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-semibold" style={{ color: "var(--ph-ink-3)" }}>
                    {pack.desc}
                  </p>

                  {pack.status === "live" && (
                    <div className="mt-4 flex flex-col gap-2.5">
                      {pack.lessons.map((lesson) => {
                        const unlocked = unlockedOf(lesson.id, pack);
                        const anyCleared = anyClearedOf(lesson.id);
                        const lp = progress[lesson.id] ?? {};
                        const started = SENTENCE_MODES.some((m) => !!lp[m] && lp[m]!.idx > 0);
                        return (
                          <div key={lesson.id} className={`ph-unit-row ${unlocked ? "" : "opacity-60"}`}>
                            <span className={`ph-unit-num ${anyCleared ? "ph-unit-num--done" : ""}`}>
                              {anyCleared ? "✓" : unlocked ? lesson.number : "🔒"}
                            </span>
                            <div className="ph-unit-main">
                              <p className="ph-unit-title">
                                {lesson.cnTitle} <span style={{ color: "var(--ph-blue-deep)" }}>{lesson.title}</span>
                              </p>
                              <p className="ph-unit-meta">
                                {lesson.sentences.length} {t("sentence.words")} · {modeDots(lesson.id)}
                              </p>
                            </div>
                            {unlocked ? (
                              <Link href={`/sentence/${lesson.id}`} className="ph-btn ph-btn--sm">
                                {started ? t("sentence.continue") : t("sentence.start")}
                              </Link>
                            ) : (
                              <span className="ph-pill ph-pill--gold">{t("sentence.locked")}</span>
                            )}
                          </div>
                        );
                      })}

                      {/* AI 加练 */}
                      <div className="ph-unit-row">
                        <span className="ph-unit-num" style={{ background: "var(--ph-blue)", color: "#fff" }}>✨</span>
                        <div className="ph-unit-main">
                          <p className="ph-unit-title">{t("sentence.aiPractice")}</p>
                          <p className="ph-unit-meta">{t("sentence.aiNote")}</p>
                        </div>
                        <button
                          type="button"
                          className="ph-btn ph-btn--sm"
                          disabled={aiBusy !== null}
                          onClick={() => void startAi(pack)}
                        >
                          {aiBusy === pack.id ? t("sentence.aiLoading") : t("sentence.start")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
