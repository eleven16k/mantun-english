"use client";

/**
 * /phonics/unit/[unitId] — 单词闯关训练页（拼读馆核心闭环）。
 *
 * 流程（机制复刻 phonicsword，经济装进 Lexi 五元经济）：
 *   每词：慢速拆音领读（音标块逐个点亮）→ 正常速整词 → 字母块拼词（3 次机会，
 *   提示=展开 IPA 拆音块且不计通过）→ 记 PASSED/FAILED（错过即进复习本）
 *   全部词后：单元小测（听音辨词 4 选 1 × 4 题）
 *   结算：首通点亮单元 + 音标图鉴；经济经 POST /api/economy（金币/提分值/
 *   红心/弱点本/周榜 SP 全复用，wordId = phonics:{unit}:{word}）。
 *
 * 进度：localStorage 断点续练（results + wordIdx），中途退出重进自动续。
 */

import Link from "next/link";
import { VolumeIcon, TrophyIcon, BookOpenIcon, RepeatIcon} from "@/components/icons";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { LetterTiles } from "@/components/phonics/LetterTiles";
import { useI18n } from "@/lib/i18n";
import { isLoggedIn, reportAssignmentProgress, submitAnswer } from "@/lib/api";
import { useGameStore } from "@/lib/store";
import { findUnit } from "@/content/phonics/data";
import {
  buildUnitQuiz,
  getUnitProgress,
  registerEconomySubmitter,
  reportAnswer,
  saveUnitProgress,
  speakWord,
  speakWordUnits,
  stopSpeech,
  unlockAudio,
  type UnitQuizQuestion,
  type WordResult,
} from "@/lib/phonics";
import { autoPhonemeUnits } from "@/lib/autoPhoneme";
import "../../phonics.css";

type Mode = "intro" | "listen" | "spell" | "quiz" | "done";

export default function UnitTrainPage() {
  const { t } = useI18n();
  const params = useParams<{ unitId: string }>();
  const found = findUnit(params.unitId ?? "");

  // ——— 状态 ———
  const [mode, setMode] = useState<Mode>("intro");
  const [results, setResults] = useState<{ text: string; status: WordResult }[]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [hotChip, setHotChip] = useState(-1);
  const [reward, setReward] = useState({ coins: 0, sp: 0 });
  const [quiz, setQuiz] = useState<UnitQuizQuestion[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizPick, setQuizPick] = useState<number | null>(null);

  const seqRef = useRef(0); // 防竞态：词切换后旧播放序列作废
  const unit = found?.unit;

  // 注册经济上报器（module 级单次），登录态下金币/SP/弱点本自动流转；
  // 游客态直接跳过——economy 401 会触发全局登录跳转，不能让拼读页被踢走
  useEffect(() => {
    registerEconomySubmitter(async (wordId, isCorrect, prompt, evidence) => {
      if (!isLoggedIn()) return null;
      const r = await submitAnswer(wordId, isCorrect, prompt, evidence ?? {});
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

  // 断点续练：读取已存进度
  useEffect(() => {
    if (!unit) return;
    const saved = getUnitProgress(unit.id);
    if (saved && saved.wordIdx > 0 && saved.wordIdx < unit.words.length && !saved.clearedAt) {
      setResults(saved.results);
      setWordIdx(saved.wordIdx);
    }
  }, [unit]);

  const words = unit?.words ?? [];
  const word = words[Math.min(wordIdx, words.length - 1)];

  // ——— 拆音领读（真人音素逐个播放，字母组合块逐个点亮）———
  const units = word ? autoPhonemeUnits(word.text, word.ipa) : [];
  const playIntro = useCallback(async () => {
    if (!word) return;
    const seq = ++seqRef.current;
    setMode("listen");
    setHotChip(-1);
    await speakWordUnits(word, (i) => {
      if (seqRef.current === seq) setHotChip(i);
    });
    if (seqRef.current !== seq) return;
    setHotChip(-1);
    await speakWord(word.text, 1);
    if (seqRef.current !== seq) return;
    setMode("spell");
  }, [word]);

  useEffect(() => {
    if (mode !== "listen") return;
    void playIntro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIdx]);

  const finishWord = useCallback(
    (status: WordResult, attempt?: string) => {
      if (!unit || !word) return;
      const next = [...results, { text: word.text, status }];
      setResults(next);
      const idx = next.length;
      saveUnitProgress(unit.id, { results: next, wordIdx: idx, clearedAt: null });
      void reportAnswer(unit.id, word.text, status === "PASSED", "spell", { chosen: attempt }).then((r) => {
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
      if (idx >= words.length) {
        setQuiz(buildUnitQuiz(words));
        setQuizIdx(0);
        setQuizPick(null);
        setMode("quiz");
      } else {
        setWordIdx(idx);
      }
    },
    [unit, word, results, words],
  );

  // ——— 单元小测（混合题型：听音选词 / 看词选音标 / 辨音判断）———
  const answerQuiz = (i: number) => {
    if (quizPick !== null || !unit) return;
    setQuizPick(i);
    const q = quiz[quizIdx];
    const ok =
      q.kind === "pair" ? i === (q.same ? 0 : 1) : i === q.correctIndex;
    // 判断层证据：所选/正确选项原文（听音选词=词、辨音=音标、组对=同/不同）
    const chosen =
      q.kind === "pair" ? (i === 0 ? "same" : "different")
      : q.kind === "phoneme" ? q.choices[i]
      : q.choices[i].text;
    const correct =
      q.kind === "pair" ? (q.same ? "same" : "different")
      : q.kind === "phoneme" ? q.choices[q.correctIndex]
      : q.choices[q.correctIndex].text;
    void reportAnswer(unit.id, q.word.text, ok, "listen", { chosen, correct }).then((r) => {
      if (r) {
        setReward((x) => ({ coins: x.coins + r.coins, sp: x.sp + r.sp }));
      }
    });
    setTimeout(() => {
      if (quizIdx + 1 >= quiz.length) {
        finishUnit();
      } else {
        setQuizIdx((n) => n + 1);
        setQuizPick(null);
      }
    }, 1100);
  };

  const finishUnit = useCallback(() => {
    if (!unit) return;
    const saved = getUnitProgress(unit.id);
    const finalResults = saved?.results ?? results;
    const passed = finalResults.filter((r) => r.status === "PASSED").length;
    // 通关门槛：掌握率 ≥ 80% 才算首通（点亮单元序号）
    const cleared = passed / Math.max(1, words.length) >= 0.8;
    saveUnitProgress(unit.id, {
      results: finalResults,
      wordIdx: words.length,
      clearedAt: cleared ? Date.now() : null,
    });
    // 老师布置的拼读作业（?asg=ID）：按掌握词数回报进度（best-effort）
    const asgId = Number(new URLSearchParams(window.location.search).get("asg") ?? "");
    if (Number.isFinite(asgId) && asgId > 0 && isLoggedIn()) {
      void reportAssignmentProgress(asgId, passed).catch(() => {});
    }
    setMode("done");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit, results, words.length]);

  useEffect(() => {
    // 小测自动播题：听音选词/看词选音标播整词；辨音判断连播两词
    if (mode !== "quiz" || quizPick !== null) return;
    const q = quiz[quizIdx];
    if (!q) return;
    if (q.kind === "pair") {
      void speakWord(q.a.text, 0.9).then(() => speakWord(q.b.text, 0.9));
    } else {
      void speakWord(q.word.text, 0.9);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, quizIdx]);

  const retry = () => {
    if (!unit) return;
    seqRef.current++;
    stopSpeech();
    setResults([]);
    setWordIdx(0);
    setReward({ coins: 0, sp: 0 });
    setQuizIdx(0);
    setQuizPick(null);
    saveUnitProgress(unit.id, { results: [], wordIdx: 0, clearedAt: null });
    setMode("intro");
  };

  if (!found || !unit) {
    return (
      <AppShell>
        <div className="ph-page">
          <div className="ph-wrap text-center">
            <p className="ph-h1">404</p>
            <Link href="/phonics" className="ph-btn mt-6 inline-flex">
              {t("phonics.backToLand")}
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const passedCount = results.filter((r) => r.status === "PASSED").length;
  const progressPct =
    mode === "quiz" || mode === "done" ? 100 : Math.round((results.length / words.length) * 100);

  return (
    <AppShell>
      <div className="ph-page" style={{ paddingTop: "2.5rem" }}>
        <div className="ph-wrap">
          <Link href="/phonics" className="ph-back">
            ← {t("phonics.backToLand")}
          </Link>

          {/* 进度条 + 词计数 */}
          {mode !== "intro" && mode !== "done" && (
            <div className="mb-5 flex items-center gap-3">
              <div className="ph-progress flex-1">
                <i style={{ width: `${progressPct}%` }} />
              </div>
              <span className="text-xs font-black" style={{ color: "var(--ph-ink-2)" }}>
                {mode === "quiz"
                  ? `⭐ ${quizIdx + 1}/${quiz.length}`
                  : `${Math.min(results.length + 1, words.length)}/${words.length}`}
              </span>
            </div>
          )}

          {/* ── 开场 ── */}
          {mode === "intro" && (
            <div className="ph-card--ink ph-stage" style={{ padding: "2.5rem 1.5rem" }}>
              <span className="ph-sticker">
                UNIT {unit.number} · {unit.focus}
              </span>
              <h1 className="ph-h1" style={{ fontSize: "1.7rem" }}>
                {unit.title}
              </h1>
              <p className="ph-sub mx-auto" style={{ maxWidth: "26rem" }}>
                {t("phonics.unitIntro")}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-1.5 text-3xl">
                {words.map((w) => (
                  <span key={w.text} title={w.text}>
                    {w.emoji}
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="ph-btn mt-7"
                onClick={() => {
                  unlockAudio();
                  void playIntro();
                }}
              >
                {t("phonics.begin")}
              </button>
              <p className="mt-4 text-xs font-semibold" style={{ color: "var(--ph-ink-3)" }}>
                {t("phonics.offlineNote")}
              </p>
            </div>
          )}

          {/* ── 拆音领读 / 拼词 ── */}
          {(mode === "listen" || mode === "spell") && word && (
            <div className="ph-card--ink ph-stage" style={{ padding: "2rem 1.25rem" }}>
              <p className="ph-emoji" aria-label={word.text}>
                {word.emoji}
              </p>
              <div className="ph-chips" aria-label="字母组合拆读">
                {units.map((u, i) => (
                  <span
                    key={i}
                    className={`ph-chip ${hotChip === i ? "ph-chip--hot" : ""}`}
                    style={u.silent ? { opacity: 0.35 } : undefined}
                    title={u.silent ? "不发音" : undefined}
                  >
                    <b style={{ fontSize: "1.05em" }}>{u.t}</b>
                    {!u.silent && (
                      <span style={{ marginLeft: 4, fontSize: "0.72em", fontWeight: 700, color: "var(--ph-ink-3)" }}>
                        /{u.p}/
                      </span>
                    )}
                  </span>
                ))}
              </div>
              {/* 领读与拼词同屏：播放时只点亮上方字母块，不隐藏下方拼词区 */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  className="ph-sound"
                  aria-label={t("phonics.replay")}
                  onClick={() => {
                    seqRef.current++;
                    setMode("listen");
                    void playIntro();
                  }}
                >
                  <VolumeIcon size={20} />
                </button>
                <span className="text-xs font-bold" style={{ color: "var(--ph-ink-3)" }}>
                  {t("phonics.replay")}
                </span>
              </div>
              <p className="mt-4 text-sm font-black" style={{ color: "var(--ph-ink-2)" }}>
                {t("phonics.spellIt")}
              </p>
              <LetterTiles
                word={word.text}
                ipa={word.ipa}
                phonemes={word.phonemes}
                graphemes={word.graphemes}
                onDone={(passed, attempt) => finishWord(passed ? "PASSED" : "FAILED", attempt)}
              />
              <button
                type="button"
                className="mt-4 text-xs font-bold underline"
                style={{ color: "var(--ph-ink-3)" }}
                onClick={() => finishWord("FAILED")}
              >
                {t("phonics.skip")} →
              </button>
            </div>
          )}

          {/* ── 单元小测（听音选词 / 看词选音标 / 辨音判断）── */}
          {mode === "quiz" && quiz[quizIdx] && (() => {
            const q = quiz[quizIdx];
            const choiceCls = (right: boolean, i: number) =>
              `ph-choice${quizPick !== null && right ? " ph-choice--right" : ""}${quizPick === i ? " ph-choice--wrong" : ""}`;
            const promptText =
              q.kind === "pair" ? t("phonics.pairPrompt")
              : q.kind === "phoneme" ? t("phonics.phonemePrompt")
              : t("phonics.listenPrompt");
            return (
              <div>
                <p className="mb-3 text-center text-sm font-black" style={{ color: "var(--ph-ink-2)" }}>
                  {t("phonics.quizTitle")}
                </p>
                <div className="ph-card--ink ph-stage" style={{ padding: "1.5rem" }}>
                  <button
                    type="button"
                    className="ph-sound ph-sound--blue"
                    aria-label={t("phonics.listen")}
                    onClick={() =>
                      q.kind === "pair"
                        ? void speakWord(q.a.text, 0.9).then(() => speakWord(q.b.text, 0.9))
                        : void speakWord(q.word.text, 0.9)
                    }
                  >
                    <VolumeIcon size={20} />
                  </button>
                  {q.kind === "phoneme" && (
                    <p className="ph-word-ipa mt-3">
                      <b style={{ fontSize: "1.5rem", color: "var(--ph-ink)" }}>{q.word.text}</b>{" "}
                      <span className="text-2xl">{q.word.emoji}</span>
                    </p>
                  )}
                  <p className="mt-2 text-xs font-bold" style={{ color: "var(--ph-ink-3)" }}>
                    {promptText}
                  </p>
                </div>
                <div
                  className="mt-4 grid gap-2.5"
                  style={{ gridTemplateColumns: q.kind === "pair" ? "repeat(2, minmax(9rem, 1fr))" : "repeat(auto-fill, minmax(11rem, 1fr))" }}
                >
                  {q.kind === "pair"
                    ? [t("phonics.pairSame"), t("phonics.pairDiff")].map((label, i) => {
                        const right = i === (q.same ? 0 : 1);
                        return (
                          <button key={i} type="button" className={choiceCls(right, i)} onClick={() => answerQuiz(i)} disabled={quizPick !== null}>
                            <b className="font-black">{label}</b>
                          </button>
                        );
                      })
                    : q.choices.map((c, i) => {
                        const right = i === q.correctIndex;
                        return (
                          <button key={i} type="button" className={choiceCls(right, i)} onClick={() => answerQuiz(i)} disabled={quizPick !== null}>
                            {q.kind === "phoneme" ? (
                              <b className="font-black">{c}</b>
                            ) : (
                              <>
                                <span className="ph-emoji-sm">{c.emoji}</span>
                                <b className="font-black">{c.text}</b>
                              </>
                            )}
                          </button>
                        );
                      })}
                </div>
              </div>
            );
          })()}

          {/* ── 结算 ── */}
          {mode === "done" && (
            <div className="ph-card--ink ph-stage" style={{ padding: "2.5rem 1.5rem" }}>
              <p className="text-6xl text-brand-text inline-flex justify-center"><TrophyIcon size={60} /></p>
              <h1 className="ph-h1" style={{ fontSize: "1.7rem" }}>
                {t("phonics.done")}
              </h1>
              <div className="mx-auto mt-5 grid max-w-sm grid-cols-3 gap-2.5">
                <div className="ph-stat">
                  <b style={{ color: "var(--ph-blue-deep)" }}>
                    {passedCount}/{words.length}
                  </b>
                  <span>{t("phonics.masteredCount")}</span>
                </div>
                <div className="ph-stat">
                  <b style={{ color: "var(--ph-orange)" }}>+{reward.coins}</b>
                  <span>{t("phonics.coinsEarned")}</span>
                </div>
                <div className="ph-stat">
                  <b style={{ color: "var(--ph-green)" }}>+{reward.sp}</b>
                  <span>{t("phonics.spEarned")}</span>
                </div>
              </div>
              {passedCount < words.length && (
                <p className="mt-4">
                  <span className="ph-pill ph-pill--bad inline-flex items-center gap-1"><BookOpenIcon size={13} /> {t("phonics.toReview")}</span>
                </p>
              )}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button type="button" className="ph-btn" onClick={retry}>
                  <RepeatIcon size={14} className="inline" /> {t("phonics.retry")}
                </button>
                <Link href="/phonics" className="ph-btn ph-btn--ghost">
                  {t("phonics.backToLand")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
