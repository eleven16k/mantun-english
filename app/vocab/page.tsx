"use client";

/**
 * /vocab — 教材词库浏览 + Speed Recall 闯关（题型评估 P0，Praktika
 * 「教 5 个 → 测 5 个 → 对 3 个过关」胜利条件开场）。
 *
 * 与旧版（10 题打包进 /quiz）的差别：
 * - 一局只学 5 个词、测 5 题、对 3 过关——3 分钟一局的小完结单元；
 * - 用真实 wordId（w01）走完整经济/错题闭环（QuizScreen 对 vocab- 前缀
 *   的题只上报证据不结算，旧版因此从未进过错题本——断层 #10 的一半）；
 * - 教段先看再测（Speak 四段式的「先输入」原则）。
 */
import { useState, useEffect } from "react";
import { PartyPopperIcon, MuscleIcon } from "@/components/SvgIcons";

import { BooksIcon, TargetIcon, VolumeIcon, TrophyIcon } from "@/components/icons";

import { PageHeader } from "@/components/PageHeader";
import { AppShell } from "@/components/AppShell";
import { VOCAB, getDistractors } from "@/lib/vocab";
import type { VocabWord } from "@/lib/types";
import { submitAnswer } from "@/lib/api";
import { speakEn } from "@/lib/speak";
import { useI18n } from "@/lib/i18n";

const TIERS = [
  { id: 1, labelKey: "vocab.tierBasic", descKey: "vocab.tierBasicDesc", color: "#16a34a" },
  { id: 2, labelKey: "vocab.tierExam", descKey: "vocab.tierExamDesc", color: "#2563eb" },
  { id: 3, labelKey: "vocab.tierAdvanced", descKey: "vocab.tierAdvancedDesc", color: "#7c3aed" },
] as const;

const PASS_LINE = 3;

type Phase =
  | { kind: "idle" }
  | { kind: "win" }
  | { kind: "learn"; idx: number }
  | { kind: "test"; idx: number; correct: number; answered: { word: VocabWord; isCorrect: boolean }[] }
  | { kind: "done"; correct: number };

function pick5(tierWords: VocabWord[]): VocabWord[] {
  return [...tierWords].sort(() => Math.random() - 0.5).slice(0, 5);
}

function makeChoices(word: VocabWord): { choices: string[]; correctIndex: number } {
  const distractors = getDistractors(word.cn, word.difficulty).slice(0, 3);
  const choices = [word.cn, ...distractors].sort(() => Math.random() - 0.5);
  return { choices, correctIndex: choices.indexOf(word.cn) };
}

export default function VocabPage() {
  // 词库异步扩容后刷新分档词数
  const [, setVocabTick] = useState(0);
  useEffect(() => {
    const onHydrated = () => setVocabTick((t) => t + 1);
    window.addEventListener("lexi:vocab-hydrated", onHydrated);
    return () => window.removeEventListener("lexi:vocab-hydrated", onHydrated);
  }, []);
  const { t } = useI18n();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [round, setRound] = useState<VocabWord[]>([]);
  const [lastFeedback, setLastFeedback] = useState<{ pick: string; correct: boolean } | null>(null);

  const tierWords = selectedTier ? VOCAB.filter(v => v.difficulty === selectedTier) : [];

  const startRound = () => {
    if (!selectedTier || tierWords.length === 0) return;
    setRound(pick5(tierWords));
    setPhase({ kind: "win" });
  };

  const answer = async (word: VocabWord, pick: string, pickIndex: number, correctIndex: number) => {
    if (lastFeedback) return; // 已作答，等「下一题」
    const isCorrect = pickIndex === correctIndex;
    setLastFeedback({ pick, correct: isCorrect });
    speakEn(word.en);
    // 真实 wordId → 服务端结算（经济 + card_states + weaknesses 全闭环）
    try {
      await submitAnswer(word.id, isCorrect, word.en, {
        chosen: pick,
        correct: word.cn,
        questionType: "word-to-cn",
        module: "vocab_tier",
      });
    } catch {
      // 离线不阻塞闯关
    }
    setPhase((p) =>
      p.kind === "test"
        ? { ...p, idx: p.idx + 1, correct: p.correct + (isCorrect ? 1 : 0), answered: [...p.answered, { word, isCorrect }] }
        : p
    );
  };

  const nextTest = () => {
    setLastFeedback(null);
    setPhase((p) => {
      if (p.kind !== "test") return p;
      if (p.idx >= round.length) {
        return { kind: "done", correct: p.correct };
      }
      return p;
    });
  };

  const retryTest = () => {
    // 未过关：同一组词再测一轮（重排出题）
    setRound((prev) => [...prev].sort(() => Math.random() - 0.5));
    setLastFeedback(null);
    setPhase({ kind: "test", idx: 0, correct: 0, answered: [] });
  };

  const stars = (correct: number) => (correct === 5 ? 3 : correct === 4 ? 2 : correct >= PASS_LINE ? 1 : 0);

  return (
    <AppShell>
      <div className="page-shell">
        <PageHeader badge="VOCAB" title={t("vocab.title")} />

        {phase.kind === "idle" && (
          <>
            {/* Tier cards */}
            <div className="grid gap-3 sm:grid-cols-3">
              {TIERS.map(tier => {
                const count = VOCAB.filter(v => v.difficulty === tier.id).length;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id === selectedTier ? null : tier.id)}
                    className={`g-card flex flex-col gap-2 p-5 text-left transition ${
                      selectedTier === tier.id ? "!border-[var(--ink)]" : ""
                    }`}
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-2xl text-white" style={{ background: tier.color }}>
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                    </span>
                    <p className="font-booster text-sm font-extrabold text-primary">{t(tier.labelKey)}</p>
                    <p className="text-xs text-tertiary">{t(tier.descKey)}</p>
                    <p className="text-xs font-bold text-secondary">{count} {t("vocab.words")}</p>
                  </button>
                );
              })}
            </div>

            {/* Word list for selected tier */}
            {selectedTier && (
              <>
                <div className="mt-6 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-primary">
                    {t(TIERS.find(x => x.id === selectedTier)?.labelKey ?? "vocab.tierBasic")} · {tierWords.length} {t("vocab.words")}
                  </h2>
                  <button
                    onClick={startRound}
                    className="rounded-pill bg-brand px-4 py-2 text-xs font-bold text-white transition hover:opacity-90"
                  >
                    {t("vocab.quizTier")}
                  </button>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  {tierWords.map(word => (
                    <div key={word.id} className="g-card flex items-center gap-3 p-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-booster text-sm font-extrabold text-primary">{word.en}</span>
                          <span className="text-xs text-tertiary">{word.phonetic}</span>
                          <span className="text-[10px] font-bold uppercase text-tertiary">{word.type}</span>
                        </div>
                        <p className="text-sm text-secondary">{word.cn}</p>
                        <p className="truncate text-xs italic text-tertiary">{word.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {phase.kind === "win" && (
          <div className="g-card mx-auto mt-6 max-w-md space-y-4 p-6 text-center">
            <p className="text-4xl text-brand-text inline-flex justify-center"><TargetIcon size={38} /></p>
            <h2 className="font-booster text-lg font-extrabold text-primary">{t("speed.winTitle")}</h2>
            <p className="text-sm leading-relaxed text-secondary">{t("speed.winDesc")}</p>
            <div className="flex justify-center gap-2 text-xs font-bold text-tertiary">
              <span className="rounded-pill bg-canvas px-3 py-1.5">1. {t("speed.stepLearn")}</span>
              <span className="rounded-pill bg-canvas px-3 py-1.5">2. {t("speed.stepQuiz")}</span>
              <span className="rounded-pill bg-canvas px-3 py-1.5">3. {t("speed.stepPass")}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPhase({ kind: "idle" })} className="flex-1 rounded-pill border border-subtle bg-canvas px-4 py-3 text-xs font-bold text-secondary">
                {t("speed.cancel")}
              </button>
              <button onClick={() => setPhase({ kind: "learn", idx: 0 })} className="game-btn flex-1 bg-brand px-4 py-3 font-booster text-sm text-white">
                {t("speed.start")}
              </button>
            </div>
          </div>
        )}

        {phase.kind === "learn" && (() => {
          const w = round[phase.idx];
          // 防御：idx 越界（连点/stale closure 竞态）时按完成处理，不崩溃
          if (!w) {
            return (
              <button onClick={() => setPhase({ kind: "test", idx: 0, correct: 0, answered: [] })} className="game-btn mx-auto mt-6 block w-full max-w-md bg-brand px-4 py-3 font-booster text-sm text-white">
                {t("speed.learnDone")}
              </button>
            );
          }
          return (
          <div className="g-card mx-auto mt-6 max-w-md space-y-4 p-6 text-center">
            <p className="text-xs font-bold text-tertiary">
              {t("speed.learnProgress").replace("{a}", String(phase.idx + 1)).replace("{b}", "5")}
            </p>
            <button onClick={() => speakEn(w.en)} className="font-booster text-3xl font-extrabold text-primary">
              <VolumeIcon size={15} className="inline" /> {w.en}
            </button>
            <p className="text-sm text-tertiary">{w.phonetic}</p>
            <p className="text-lg font-bold text-secondary">{w.cn}</p>
            <p className="text-xs italic text-tertiary">{w.example}</p>
            <p className="text-xs text-secondary">{w.exampleCn}</p>
            <button
              onClick={() =>
                setPhase((p) =>
                  p.kind === "learn" && p.idx + 1 < round.length
                    ? { ...p, idx: p.idx + 1 }
                    : { kind: "test", idx: 0, correct: 0, answered: [] }
                )
              }
              className="game-btn w-full bg-brand px-4 py-3 font-booster text-sm text-white"
            >
              {phase.idx + 1 >= round.length ? t("speed.learnDone") : t("speed.learnNext")}
            </button>
          </div>
          );
        })()}

        {phase.kind === "test" && (() => {
          const finished = phase.idx >= round.length;
          const w = finished ? null : round[phase.idx];
          const { choices, correctIndex } = w ? makeChoices(w) : { choices: [] as string[], correctIndex: -1 };
          return (
            <div className="g-card mx-auto mt-6 max-w-md space-y-4 p-6 text-center">
              <p className="text-xs font-bold text-tertiary">
                {t("speed.quizProgress").replace("{a}", String(Math.min(phase.idx + 1, round.length))).replace("{b}", String(round.length))} · {t("speed.passLine").replace("{n}", String(PASS_LINE))}/{String(round.length)}
              </p>
              {w && (
                <>
                  <button onClick={() => speakEn(w.en)} className="font-booster text-2xl font-extrabold text-primary"><VolumeIcon size={15} className="inline" /> {w.en}</button>
                  <div className="grid gap-2">
                    {choices.map((choice, i) => {
                      const picked = lastFeedback?.pick === choice;
                      const isRight = lastFeedback && i === correctIndex;
                      return (
                        <button
                          key={choice}
                          onClick={() => answer(w, choice, i, correctIndex)}
                          disabled={!!lastFeedback}
                          className={`rounded-2xl border-2 px-4 py-3 text-sm font-bold transition ${
                            isRight
                              ? "border-positive bg-[#F0FDF4] text-positive"
                              : picked
                                ? "border-critical bg-[#FEF2F2] text-critical line-through"
                                : "border-subtle bg-surface text-secondary hover:border-brandborder disabled:opacity-50"
                          }`}
                        >
                          {choice}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
              {lastFeedback && (
                <button onClick={nextTest} className="game-btn w-full bg-brand px-4 py-3 font-booster text-sm text-white">
                  {finished ? t("speed.seeResult") : t("speed.nextQ")}
                </button>
              )}
            </div>
          );
        })()}

        {phase.kind === "done" && (() => {
          const passed = phase.correct >= PASS_LINE;
          return (
            <div className="g-card mx-auto mt-6 max-w-md space-y-4 p-6 text-center">
              <p className="text-4xl text-brand-text inline-flex justify-center">{passed ? <PartyPopperIcon size={38} /> : <MuscleIcon size={38} />}</p>
              <div className="text-2xl tracking-widest">{"⭐".repeat(stars(phase.correct))}</div>
              <h2 className="font-booster text-lg font-extrabold text-primary">
                {passed ? t("speed.passTitle") : t("speed.failTitle")}
              </h2>
              <p className="text-sm text-secondary">
                {t("speed.score").replace("{a}", String(phase.correct)).replace("{b}", String(round.length))}
              </p>
              {passed ? (
                <div className="flex gap-2">
                  <button onClick={() => setPhase({ kind: "idle" })} className="flex-1 rounded-pill border border-subtle bg-canvas px-4 py-3 text-xs font-bold text-secondary">
                    {t("speed.backHome")}
                  </button>
                  <button onClick={startRound} className="game-btn flex-1 bg-brand px-4 py-3 font-booster text-sm text-white">
                    {t("speed.newRound")}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setPhase({ kind: "idle" })} className="flex-1 rounded-pill border border-subtle bg-canvas px-4 py-3 text-xs font-bold text-secondary">
                    {t("speed.backHome")}
                  </button>
                  <button onClick={retryTest} className="game-btn flex-1 bg-action px-4 py-3 font-booster text-sm text-white">
                    {t("speed.retry")}
                  </button>
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </AppShell>
  );
}
