"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { useGameStore } from "@/lib/store";
import { VOCAB } from "@/lib/vocab";
import { CoinIcon, CheckIcon, GraduationCapIcon } from "@/components/icons";
import { HeartFilledIcon, FlameIcon } from "@/components/SvgIcons";
import { useI18n } from "@/lib/i18n";

/**
 * /tutorial — A4: 3-minute interactive mechanism tutorial.
 * 3 levels, each teaching one game mechanic by doing it:
 *   1. Hearts: answer wrong → see heart break
 *   2. Coins & SP: answer correct (new word) → earn coins
 *   3. Streak: complete 3 questions → light up streak day 1
 * All state is restored after completion (tutorial costs nothing).
 */

type Level = 1 | 2 | 3 | "done";

function makeTutorQ(idx: number): { prompt: string; choices: string[]; correct: number } {
  const words = ["achieve", "benefit", "practice", "knowledge"];
  const word = VOCAB.find(v => v.en === words[idx % words.length]) ?? VOCAB[0];
  const correctCn = word?.cn ?? "实现";
  const others = VOCAB.filter(v => v.cn !== correctCn).slice(0, 3).map(v => v.cn);
  const choices = [correctCn, ...others].sort(() => Math.random() - 0.5);
  return { prompt: word?.en ?? "test", choices, correct: choices.indexOf(correctCn) };
}

export default function TutorialPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [level, setLevel] = useState<Level>(1);
  const [qIdx, setQIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [q, setQ] = useState(makeTutorQ(0));
  const [streakDots, setStreakDots] = useState(0);

  const answer = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const isCorrect = i === q.correct;

    setTimeout(() => {
      if (level === 1) {
        // After showing heart break → next level
        setLevel(2);
        setQIdx(0);
        setQ(makeTutorQ(1));
      } else if (level === 2) {
        // After showing coins → next level
        setLevel(3);
        setQIdx(0);
        setQ(makeTutorQ(2));
      } else if (level === 3) {
        setStreakDots(d => d + 1);
        if (qIdx + 1 >= 3) {
          setLevel("done");
        } else {
          setQIdx(i2 => i2 + 1);
          setQ(makeTutorQ(qIdx + 1));
        }
      }
      setAnswered(false);
      setSelected(null);
    }, 2000);
  };

  const isCorrect = selected !== null && selected === q.correct;

  return (
    <AppShell>
      <div className="page-shell">
        <PageHeader badge="TUTORIAL" title={t("tut.title")} />

        {level === "done" ? (
          /* Completion screen */
          <div className="g-card-hero p-8 text-center">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-positive/10">
              <CheckIcon size={36} className="text-positive" />
            </span>
            <h2 className="mt-4 font-booster text-2xl font-extrabold text-primary">{t('tut.ready')}</h2>
            <p className="mt-2 text-sm text-secondary">{t('tut.readyDesc')}</p>
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => router.push("/onboarding")}
                className="rounded-pill bg-brand py-3 font-booster font-extrabold text-white transition hover:opacity-90"
              >
                {t('tut.takeTest')}
              </button>
              <button onClick={() => router.push("/chat")} className="text-sm font-bold text-tertiary transition hover:text-secondary">
                {t('tut.skipHome')}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Level indicator */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map(l => (
                <span key={l} className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold ${
                  level === l ? "bg-brand text-white" : level > l ? "bg-positive text-white" : "bg-canvas text-tertiary"
                }`}>
                  {typeof level === "number" && level > l ? <CheckIcon size={14} /> : l}
                </span>
              ))}
              <span className="ml-2 text-xs font-bold text-tertiary">
                {level === 1 ? t('tut.hearts') : level === 2 ? t('tut.coinsScore') : t('tut.streaks')}
              </span>
            </div>

            {/* Level 1: Hearts tutorial */}
            {level === 1 && (
              <div className="g-card p-4">
                <div className="flex items-center gap-2 rounded-pill bg-canvas px-4 py-2">
                  <HeartFilledIcon size={16} className="text-hearts" />
                  <span className="text-sm font-bold text-primary">{t('tut.hearts')}: 5</span>
                  {answered && !isCorrect && (
                    <span className="ml-auto flex items-center gap-1 text-sm font-bold text-critical">
                      <HeartFilledIcon size={16} className="text-critical animate-heartbeat" />
                      −1 {t('tut.wrongAnswer')}
                    </span>
                  )}
                  {answered && isCorrect && (
                    <span className="ml-auto text-sm font-bold text-positive inline-flex items-center gap-1"><CheckIcon size={13} /> {t('tut.noHeartLost')}</span>
                  )}
                </div>
                <p className="mt-3 text-sm text-secondary">
                  {t('tut.heartsDesc')}
                </p>
              </div>
            )}

            {/* Level 2: Coins & SP tutorial */}
            {level === 2 && (
              <div className="g-card p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 rounded-pill bg-canvas px-3 py-1.5">
                    <CoinIcon size={16} className="text-gold" />
                    <span className="text-sm font-bold text-gold">+8 {t('tut.coins')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-pill bg-canvas px-3 py-1.5">
                    <span className="text-sm font-bold text-brand-text">+30 {t('tut.sp')}</span>
                  </div>
                  {answered && isCorrect && (
                    <span className="ml-auto flex items-center gap-1 text-sm font-bold text-positive">
                      <CheckIcon size={14} /> {t('tut.firstCorrect')}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-secondary">
                  {t('tut.coinsDesc')}
                </p>
              </div>
            )}

            {/* Level 3: Streak tutorial */}
            {level === 3 && (
              <div className="g-card p-4">
                <div className="flex items-center gap-2">
                  <FlameIcon size={20} className="text-streak" />
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <span key={i} className={`h-3 w-8 rounded-pill ${streakDots > i ? "bg-streak" : "bg-canvas"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-tertiary">{streakDots}/3</span>
                </div>
                <p className="mt-3 text-sm text-secondary">
                  {t('tut.streakDesc')}
                </p>
              </div>
            )}

            {/* Question card */}
            <div className="g-card-hero p-6 text-center">
              <p className="text-xs font-bold uppercase text-tertiary mb-2">
                {level === 1 ? t('tut.tryWrong') : level === 2 ? t('tut.answerCorrect') : t('tut.complete3')}
              </p>
              <p className="font-booster text-3xl font-extrabold text-primary">{q.prompt}</p>
            </div>

            {/* Choices */}
            <div className="flex flex-col gap-2">
              {q.choices.map((c, i) => {
                const isSel = selected === i;
                const isCor = i === q.correct;
                let cls = "game-chip flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold";
                if (answered && isCor) cls = "game-chip game-chip--right pointer-events-none flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold";
                else if (answered && isSel) cls = "game-chip game-chip--wrong pointer-events-none flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold";
                return (
                  <button key={i} disabled={answered} onClick={() => answer(i)} className={cls}>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-canvas text-sm font-extrabold text-tertiary">{"ABCD"[i]}</span>
                    {c}
                  </button>
                );
              })}
            </div>

            <p className="text-center text-[11px] text-tertiary">{t('tut.freeNote')}</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
