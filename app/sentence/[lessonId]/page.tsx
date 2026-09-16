"use client";

/**
 * /sentence/[lessonId] — 句法训练会话页（句法馆核心闭环）。
 *
 * 一个引擎跑三种玩法（单词拼图/键盘打字/语音口语，tabs 随时切换、进度按
 * 玩法分桶存 localStorage `lexi-sentence-v1`）：
 *   每句：完成即记 PASSED/FAILED（错过即进弱点本）→ 经济上报
 *   （POST /api/economy，wordId = sent:{lessonId}:{idx}，金币/提分值/
 *   红心/周榜 SP 全复用）→ 全部句后结算：通过率 ≥80% 首通（任一玩法
 *   通关即解锁同包下一课，馆页口径）。
 * `ai-{packId}` 为 AI 加练伪课：句子来自 sessionStorage（馆页写入），
 * 会话内自闭环，不落进度。
 */

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PuzzleMode } from "@/components/sentence/PuzzleMode";
import { TypingMode } from "@/components/sentence/TypingMode";
import { SpeakingMode } from "@/components/sentence/SpeakingMode";
import { useI18n } from "@/lib/i18n";
import { isLoggedIn, submitAnswer } from "@/lib/api";
import { useGameStore } from "@/lib/store";
import { findLesson, nextLessonOf, type Sentence, type SentenceLesson } from "@/content/sentence/data";
import {
  getLastMode,
  getModeProgress,
  lessonUnlocked,
  registerEconomySubmitter,
  reportSentenceAnswer,
  saveLastMode,
  saveModeProgress,
  SENTENCE_MODES,
  type SentenceMode,
  type SentenceResultStatus,
} from "@/lib/sentence";
import { stopSpeech, unlockAudio } from "@/lib/phonics";
import "../../phonics/phonics.css";
import "../sentence.css";

/** 馆页「AI 加练」写入、会话页读取的交接键（quiz 页 lexi-import-quiz 同款） */
const AI_SESSION_KEY = "lexi-sentence-ai";

type Phase = "intro" | "playing" | "done";

const MODE_ICON: Record<SentenceMode, string> = { puzzle: "🧩", typing: "⌨️", speaking: "🎤" };

export default function SentenceSessionPage() {
  const { t } = useI18n();
  const params = useParams<{ lessonId: string }>();
  const lessonId = params.lessonId ?? "";
  const isAi = lessonId.startsWith("ai-");
  const found = isAi ? null : findLesson(lessonId);

  // ——— 状态 ———
  const [aiSentences, setAiSentences] = useState<Sentence[] | null>(null);
  const [phase, setPhase] = useState<Phase>("intro");
  const [mode, setMode] = useState<SentenceMode>("puzzle");
  const [results, setResults] = useState<{ en: string; status: SentenceResultStatus }[]>([]);
  const [idx, setIdx] = useState(0);
  const [reward, setReward] = useState({ coins: 0, sp: 0 });

  // 注册经济上报器（module 级单次），登录态下金币/SP/弱点本自动流转；
  // 游客态直接跳过——economy 401 会触发全局登录跳转，不能让训练页被踢走
  useEffect(() => {
    registerEconomySubmitter(async (wordId, isCorrect, prompt) => {
      if (!isLoggedIn()) return null;
      const r = await submitAnswer(wordId, isCorrect, prompt);
      return {
        coins: r.coinsEarned,
        sp: r.spEarned,
        hearts: r.hearts,
        enteredWeakness: r.enteredWeakness,
        conqueredWeakness: r.conqueredWeakness,
      };
    });
    return () => stopSpeech();
  }, []);

  // AI 伪课：从馆页交接的 sessionStorage 取句子
  useEffect(() => {
    if (!isAi) return;
    try {
      const raw = sessionStorage.getItem(AI_SESSION_KEY);
      const parsed = raw ? (JSON.parse(raw) as { sentences?: Sentence[] }) : null;
      if (parsed?.sentences?.length) setAiSentences(parsed.sentences);
    } catch {
      /* missing/corrupted → 404 兜底 */
    }
  }, [isAi]);

  const lesson: SentenceLesson | null = isAi
    ? aiSentences
      ? { id: lessonId, number: 0, title: t("sentence.aiPractice"), cnTitle: "", sentences: aiSentences }
      : null
    : (found?.lesson ?? null);

  // lesson 在 AI 伪课下每次渲染都是新对象字面量——effect 依赖不能用对象本身，
  // 用 ref 传递句总数，deps 只留稳定原语/状态（否则 resume→setState→新 lesson→再 resume 死循环）
  const totalRef = useRef(0);
  totalRef.current = lesson?.sentences.length ?? 0;

  // ——— 断点续练 / 玩法切换：恢复该玩法的进度（AI 伪课不落盘）———
  const resumeMode = useCallback(
    (m: SentenceMode) => {
      setMode(m);
      setResults([]);
      setIdx(0);
      if (isAi || !lessonId) return;
      const total = totalRef.current;
      const saved = getModeProgress(lessonId, m);
      if (saved && saved.idx > 0 && saved.idx < total && !saved.clearedAt) {
        setResults(saved.results);
        setIdx(saved.idx);
      }
    },
    [isAi, lessonId],
  );

  useEffect(() => {
    if (isAi && !aiSentences) return;
    resumeMode(isAi ? "puzzle" : (getLastMode(lessonId) ?? "puzzle"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, isAi, aiSentences]);

  const switchMode = (m: SentenceMode) => {
    if (m === mode || phase === "done") return;
    stopSpeech();
    if (!isAi && lessonId) saveLastMode(lessonId, m);
    resumeMode(m);
  };

  const sentence = lesson?.sentences[Math.min(idx, (lesson?.sentences.length ?? 1) - 1)];

  // ——— 完成一句：记结果 + 落盘 + 经济上报 ———
  const finishSentence = useCallback(
    (passed: boolean) => {
      if (!lesson || !sentence) return;
      const next = [...results, { en: sentence.en, status: (passed ? "PASSED" : "FAILED") as SentenceResultStatus }];
      setResults(next);
      const nextIdx = next.length;
      const total = lesson.sentences.length;
      if (!isAi && lessonId) {
        saveModeProgress(lessonId, mode, { results: next, idx: nextIdx, clearedAt: null });
      }
      void reportSentenceAnswer(lessonId, idx, sentence.en, passed, mode).then((r) => {
        if (r) {
          setReward((x) => ({ coins: x.coins + r.coins, sp: x.sp + r.sp }));
          const s = useGameStore.getState();
          useGameStore.setState({
            hearts: r.hearts ?? s.hearts,
            coins: s.coins + r.coins,
            scorePoints: s.scorePoints + r.sp,
          });
        }
      });
      if (nextIdx >= total) {
        const passedCount = next.filter((x) => x.status === "PASSED").length;
        const cleared = passedCount / total >= 0.8;
        if (!isAi && lessonId) {
          const saved = getModeProgress(lessonId, mode);
          saveModeProgress(lessonId, mode, {
            results: next,
            idx: nextIdx,
            clearedAt: cleared ? Date.now() : (saved?.clearedAt ?? null),
          });
        }
        stopSpeech();
        setPhase("done");
      } else {
        setIdx(nextIdx);
      }
    },
    [lesson, sentence, results, idx, isAi, lessonId, mode],
  );

  const retry = () => {
    if (!lesson) return;
    stopSpeech();
    setResults([]);
    setIdx(0);
    setReward({ coins: 0, sp: 0 });
    if (!isAi && lessonId) {
      saveModeProgress(lessonId, mode, { results: [], idx: 0, clearedAt: null });
    }
    setPhase("intro");
  };

  if (!lesson) {
    return (
      <AppShell>
        <div className="ph-page">
          <div className="ph-wrap text-center">
            <p className="ph-h1">404</p>
            <Link href="/sentence" className="ph-btn mt-6 inline-flex">
              {t("sentence.backToHall")}
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const total = lesson.sentences.length;
  const passedCount = results.filter((r) => r.status === "PASSED").length;
  const clearedNow = passedCount / total >= 0.8;
  const next = isAi ? null : nextLessonOf(lessonId);
  const progressPct = phase === "done" ? 100 : Math.round((results.length / total) * 100);
  const lessonTitle = isAi ? lesson.title : lesson.cnTitle ? `${lesson.cnTitle} · ${lesson.title}` : lesson.title;

  return (
    <AppShell>
      <div className="ph-page" style={{ paddingTop: "2.5rem" }}>
        <div className="ph-wrap">
          <Link href="/sentence" className="ph-back">
            ← {t("sentence.backToHall")}
          </Link>

          {/* 玩法切换 tabs（结算后隐藏） */}
          {phase !== "done" && (
            <div className="sn-tabs">
              {SENTENCE_MODES.map((m) => (
                <button key={m} type="button" className={`sn-tab ${mode === m ? "sn-tab--on" : ""}`} onClick={() => switchMode(m)}>
                  {MODE_ICON[m]} {t(`sentence.mode${m === "puzzle" ? "Puzzle" : m === "typing" ? "Typing" : "Speaking"}`)}
                </button>
              ))}
            </div>
          )}

          {/* 进度条 + 句计数 */}
          {phase !== "intro" && phase !== "done" && (
            <div className="mb-5 flex items-center gap-3">
              <div className="ph-progress flex-1">
                <i style={{ width: `${progressPct}%` }} />
              </div>
              <span className="text-xs font-black" style={{ color: "var(--ph-ink-2)" }}>
                {Math.min(results.length + 1, total)}/{total}
              </span>
            </div>
          )}

          {/* ── 开场 ── */}
          {phase === "intro" && (
            <div className="ph-card--ink ph-stage" style={{ padding: "2.5rem 1.5rem" }}>
              <span className="ph-sticker">
                {isAi ? "✨ AI BONUS" : `LESSON ${lesson.number}`}
              </span>
              <h1 className="ph-h1" style={{ fontSize: "1.7rem" }}>
                {lessonTitle}
              </h1>
              <p className="ph-sub mx-auto" style={{ maxWidth: "26rem" }}>
                {mode === "puzzle" ? t("sentence.tapToFill") : mode === "typing" ? t("sentence.typeIt") : t("sentence.readAloud")}
              </p>
              <p className="mt-2 text-xs font-semibold" style={{ color: "var(--ph-ink-3)" }}>
                {t("sentence.undoHint")}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-1.5">
                {lesson.sentences.slice(0, 4).map((s) => (
                  <span key={s.en} className="ph-pill ph-pill--info">
                    {s.en}
                  </span>
                ))}
                {total > 4 && <span className="ph-pill">+{total - 4}</span>}
              </div>
              <button
                type="button"
                className="ph-btn mt-7"
                onClick={() => {
                  unlockAudio();
                  setPhase("playing");
                }}
              >
                ▶ {t("sentence.start")}
              </button>
              <p className="mt-4 text-xs font-semibold" style={{ color: "var(--ph-ink-3)" }}>
                {t("sentence.modeTip")}
              </p>
            </div>
          )}

          {/* ── 训练 ── */}
          {phase === "playing" && sentence && (
            <div className="ph-card--ink ph-stage" style={{ padding: "2rem 1.25rem", position: "relative" }}>
              {mode === "puzzle" && <PuzzleMode key={`${sentence.en}-puzzle`} sentence={sentence} onDone={finishSentence} />}
              {mode === "typing" && <TypingMode key={`${sentence.en}-typing`} sentence={sentence} onDone={finishSentence} />}
              {mode === "speaking" && <SpeakingMode key={`${sentence.en}-speaking`} sentence={sentence} onDone={finishSentence} />}
            </div>
          )}

          {/* ── 结算 ── */}
          {phase === "done" && (
            <div className="ph-card--ink ph-stage" style={{ padding: "2.5rem 1.5rem" }}>
              <p className="text-6xl">🏆</p>
              <h1 className="ph-h1" style={{ fontSize: "1.7rem" }}>
                {isAi ? t("sentence.aiDone") : clearedNow ? t("sentence.done") : t("sentence.tryMore")}
              </h1>
              {clearedNow && !isAi && (
                <p className="mt-2">
                  <span className="ph-pill ph-pill--good">🎉 {t("sentence.lessonCleared")}</span>
                </p>
              )}
              <div className="mx-auto mt-5 grid max-w-sm grid-cols-3 gap-2.5">
                <div className="ph-stat">
                  <b style={{ color: "var(--ph-blue-deep)" }}>
                    {passedCount}/{total}
                  </b>
                  <span>{t("sentence.passedCount")}</span>
                </div>
                <div className="ph-stat">
                  <b style={{ color: "var(--ph-orange)" }}>+{reward.coins}</b>
                  <span>{t("sentence.coinsEarned")}</span>
                </div>
                <div className="ph-stat">
                  <b style={{ color: "var(--ph-green)" }}>+{reward.sp}</b>
                  <span>{t("sentence.spEarned")}</span>
                </div>
              </div>
              {passedCount < total && (
                <p className="mt-4">
                  <span className="ph-pill ph-pill--bad">📖 {t("sentence.revealNote")}</span>
                </p>
              )}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button type="button" className="ph-btn" onClick={retry}>
                  🔁 {t("sentence.retryLesson")}
                </button>
                {next && lessonUnlocked(next.id) && (
                  <Link href={`/sentence/${next.id}`} className="ph-btn ph-btn--sm" onClick={() => setPhase("intro")}>
                    {t("sentence.nextLesson")} →
                  </Link>
                )}
                <Link href="/sentence" className="ph-btn ph-btn--ghost">
                  {t("sentence.backToHall")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
