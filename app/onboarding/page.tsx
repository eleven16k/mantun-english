"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VOCAB } from "@/lib/vocab";
import { updateProfile } from "@/lib/api";
import { setProfile } from "@/lib/plan";
import { useI18n } from "@/lib/i18n";
import type { Question } from "@/lib/types";

/**
 * /onboarding — A2 (track + goal) + A3 (adaptive placement test).
 * Steps: 1. Pick track → 2. Set goal/exam date → 3. 10-question adaptive test → 4. Result → /chat
 * Test doesn't consume hearts/coins. Questions adapt up/down by difficulty.
 */

const STEPS = ["track", "goal", "test", "result"] as const;
type Step = (typeof STEPS)[number];

const TRACKS = [
  { id: "zhongkao", labelKey: "onb.trackZhongkao", descKey: "onb.trackZhongkaoDesc" },
  { id: "xiaoshengchu", labelKey: "onb.trackXiaoshengchu", descKey: "onb.trackXiaoshengchuDesc" },
] as const;

/** Generate an adaptive question at a difficulty level (1-5) from the vocab pool. */
function makeQ(level: number, idx: number): Question {
  const pool = VOCAB.filter(v => v.difficulty === Math.min(5, Math.max(1, level)));
  const fallback = VOCAB.length ? VOCAB : [];
  const word = (pool.length ? pool : fallback)[idx % (pool.length || fallback.length || 1)];
  if (!word) {
    return { id: `t${idx}`, wordId: `t${idx}`, type: "word-to-cn", prompt: "Loading…", choices: ["A","B","C","D"], correctIndex: 0 };
  }
  const others = VOCAB.filter(v => v.id !== word.id && v.cn !== word.cn);
  const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 3).map(v => v.cn);
  const choices = [word.cn, ...shuffled].sort(() => Math.random() - 0.5);
  return {
    id: `t${idx}`,
    wordId: word.id,
    type: "word-to-cn",
    prompt: word.en,
    promptSub: word.phonetic,
    choices,
    correctIndex: choices.indexOf(word.cn),
    explanation: `${word.en} = ${word.cn}`,
  };
}

export default function OnboardingPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [step, setStep] = useState<Step>("track");
  const [track, setTrack] = useState<string>("");
  const [targetScore, setTargetScore] = useState(100);
  const [examDate, setExamDate] = useState("");

  // Adaptive test state
  const [qIdx, setQIdx] = useState(0);
  const [difficulty, setDifficulty] = useState(2);
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [estimatedScore, setEstimatedScore] = useState(0);

  const TOTAL_TEST = 10;

  const startTest = () => {
    setQuestions(Array.from({ length: TOTAL_TEST }, (_, i) => makeQ(2, i)));
    setStep("test");
  };

  const answer = (i: number) => {
    if (answered) return;
    const q = questions[qIdx];
    setSelected(i);
    setAnswered(true);
    const isCorrect = i === q.correctIndex;
    if (isCorrect) {
      setCorrectCount(c => c + 1);
      setDifficulty(d => Math.min(5, d + 1));
    } else {
      setDifficulty(d => Math.max(1, d - 1));
    }
    // Pre-generate next question at new difficulty
    if (qIdx + 1 < TOTAL_TEST) {
      const nextQ = makeQ(difficulty + (isCorrect ? 1 : -1), qIdx + 1);
      setQuestions(prev => {
        const copy = [...prev];
        copy[qIdx + 1] = nextQ;
        return copy;
      });
    }
    setTimeout(() => {
      if (qIdx + 1 >= TOTAL_TEST) {
        // Finish: estimate score (40-120 range based on accuracy)
        const accuracy = (correctCount + (isCorrect ? 1 : 0)) / TOTAL_TEST;
        const est = Math.round(40 + accuracy * 80);
        setEstimatedScore(est);
        // Save profile
        // Save to server (authoritative) + kv storage (for plan engine)
        setProfile({ track, targetScore, examDate, estimatedScore: est });
        updateProfile({ track, targetScore, examDate, estimatedScore: est }).catch(() => {
          // Server unreachable — localStorage is the fallback
        });
        setStep("result");
      } else {
        setQIdx(i2 => i2 + 1);
        setAnswered(false);
        setSelected(null);
      }
    }, 800);
  };

  const progress = ((STEPS.indexOf(step) + 1) / STEPS.length) * 100;
  const q = questions[qIdx];

  return (
    <div className="flex h-dvh flex-col bg-app text-primary">
      {/* Progress bar */}
      <div className="h-1 bg-canvas">
        <div className="h-full rounded-pill bg-brand transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-5 py-6">
        <div className="w-full max-w-md">
          {step === "track" && (
            <div className="flex flex-col gap-5">
              <h1 className="text-center font-booster text-[26px] font-extrabold text-primary">{t('onb.chooseTrack')}</h1>
              {TRACKS.map(tr => (
                <button
                  key={tr.id}
                  onClick={() => { setTrack(tr.id); setStep("goal"); }}
                  className={`g-card flex flex-col gap-1 p-5 text-left shadow-sm transition hover:border-brandborder ${track === tr.id ? "border-brandborder bg-brand-subtle" : ""}`}
                >
                  <p className="font-booster text-lg font-extrabold text-primary">{t(tr.labelKey)}</p>
                  <p className="text-sm text-tertiary">{t(tr.descKey)}</p>
                </button>
              ))}
            </div>
          )}

          {step === "goal" && (
            <div className="flex flex-col gap-5">
              <h1 className="text-center font-booster text-[26px] font-extrabold text-primary">{t('onb.setGoal')}</h1>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-tertiary">{t('onb.targetScore')}: {targetScore}</span>
                <input type="range" min={60} max={120} step={5} value={targetScore}
                  onChange={e => setTargetScore(Number(e.target.value))}
                  className="accent-brand" />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-tertiary">{t('onb.examDate')}</span>
                <input type="date" value={examDate} min={new Date().toISOString().slice(0, 10)}
                  onChange={e => setExamDate(e.target.value)}
                  className="rounded-xl border border-subtle bg-surface px-4 py-3 text-sm outline-none focus:border-brandborder" />
              </label>

              <button
                onClick={startTest}
                disabled={!examDate}
                className="rounded-pill bg-action py-3.5 font-booster text-base font-extrabold text-white shadow-sm transition hover:bg-actionhover disabled:opacity-40"
              >
                {t('onb.startTest')}
              </button>
              {!examDate && <p className="text-center text-xs text-tertiary">{t('onb.pickDate')}</p>}
            </div>
          )}

          {step === "test" && q && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wide text-tertiary">{t('onb.question')} {qIdx + 1} / {TOTAL_TEST}</p>
                <p className="text-xs text-tertiary">{t('onb.level')} {difficulty}</p>
              </div>

              <div className="g-card-hero p-6 text-center shadow-sm">
                <p className="text-xs font-bold uppercase text-tertiary mb-2">{q.promptSub ?? t('onb.vocabulary')}</p>
                <p className="font-booster text-3xl font-extrabold text-primary">{q.prompt}</p>
              </div>

              <div className="flex flex-col gap-2">
                {q.choices.map((c, i) => {
                  const isSel = selected === i;
                  const isCorrect = i === q.correctIndex;
                  let cls = "flex w-full items-center gap-3 rounded-2xl border-2 border-subtle bg-surface px-4 py-3 text-left text-[15px] font-semibold transition";
                  if (answered && isCorrect) cls += " border-[var(--bg-positive-emphasis-default)] bg-[color-mix(in_srgb,var(--bg-positive-emphasis-default)_10%,transparent)]";
                  else if (answered && isSel) cls += " border-[var(--bg-critical-emphasis-default)] bg-[color-mix(in_srgb,var(--bg-critical-emphasis-default)_10%,transparent)]";
                  else cls += " hover:border-brandborder hover:bg-canvas";
                  return (
                    <button key={i} disabled={answered} onClick={() => answer(i)} className={cls}>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-canvas text-sm font-extrabold text-tertiary">
                        {"ABCD"[i]}
                      </span>
                      {c}
                    </button>
                  );
                })}
              </div>
              <p className="text-center text-[11px] text-tertiary">{t('onb.testFree')}</p>
            </div>
          )}

          {step === "result" && (
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-brand-subtle text-4xl">🎯</span>
              <h1 className="font-booster text-3xl font-extrabold text-primary">{t('onb.yourLevel')}: ~{estimatedScore}</h1>
              <p className="text-sm text-secondary">
                {t('onb.target')}: {targetScore} · {t('onb.gap')}: {Math.max(0, targetScore - estimatedScore)} {t('onb.points')}
              </p>
              <div className="g-card w-full p-4 text-left shadow-sm">
                <p className="text-xs font-bold uppercase text-tertiary mb-2">{t('onb.recommendations')}</p>
                <ul className="space-y-1 text-sm text-secondary">
                  <li>{correctCount < 5 ? t('onb.recStartBasic') : t('onb.recStartInt')}</li>
                  <li>{t('onb.recDaily')}</li>
                  <li>{t('onb.recUpload')}</li>
                </ul>
              </div>
              <button
                onClick={() => router.push("/chat")}
                className="w-full rounded-pill bg-brand py-3.5 font-booster text-base font-extrabold text-white shadow-sm transition hover:opacity-90"
              >
                {t('onb.startLearning')}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
