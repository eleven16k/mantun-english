"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { AppShell } from "@/components/AppShell";
import { useGameStore } from "@/lib/store";
import { FlameIcon } from "@/components/SvgIcons";
import { STREAK_LEVELS, getStreakLevel, getExamPhase, getProfile } from "@/lib/plan";
import { useI18n } from "@/lib/i18n";

/**
 * /progress — E1 nine-level streak ladder + D2 countdown + friends leaderboard.
 */

const WEEK = [
  "prog.weekdaySu", "prog.weekdayMo", "prog.weekdayTu",
  "prog.weekdayWe", "prog.weekdayTh", "prog.weekdayFr", "prog.weekdaySa",
] as const;
const LEVEL_KEYS = [
  "prog.level1", "prog.level2", "prog.level3", "prog.level4", "prog.level5",
  "prog.level6", "prog.level7", "prog.level8", "prog.level9",
] as const;
const LEVEL_XP = [0, 50, 150, 350, 700, 1200, 2000, 3500, 6000];

const STREAK_LEVEL_KEYS = [
  "prog.streakLevel1", "prog.streakLevel2", "prog.streakLevel3", "prog.streakLevel4",
  "prog.streakLevel5", "prog.streakLevel6", "prog.streakLevel7", "prog.streakLevel8",
  "prog.streakLevel9",
] as const;

const PHASE_LABEL = {
  foundation: "prog.phaseFoundation",
  specialized: "prog.phaseSpecialized",
  sprint: "prog.phaseSprint",
  final: "prog.phaseFinal",
} as const;

const TAB_LABELS = {
  day: "prog.tabDay",
  week: "prog.tabWeek",
  month: "prog.tabMonth",
  all: "prog.tabAll",
} as const;

export default function ProgressPage() {
  const { streak, scorePoints, dailyQuestionsAnswered, streakFreezesOwned } = useGameStore();
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<"day" | "week" | "month" | "all">("week");
  useEffect(() => setMounted(true), []);

  const safeSP = mounted ? scorePoints : 0;
  const safeStreak = mounted ? streak : 0;
  const today = new Date().getDay();
  const levelIdx = Math.max(0, LEVEL_XP.findIndex((x) => safeSP < x) - 1);
  const nextXP = LEVEL_XP[levelIdx + 1] ?? LEVEL_XP[LEVEL_XP.length - 1];
  const curXP = LEVEL_XP[levelIdx];
  const levelProgress = Math.min(1, (safeSP - curXP) / Math.max(1, nextXP - curXP));

  // E1: streak ladder
  const streakInfo = getStreakLevel(safeStreak);
  const slProgress = streakInfo.next
    ? Math.min(1, (safeStreak - streakInfo.current.minDays) / (streakInfo.next.minDays - streakInfo.current.minDays))
    : 1;

  // D2: countdown
  const profile = mounted ? getProfile() : null;
  const exam = mounted && profile?.examDate ? getExamPhase(profile.examDate) : null;

  return (
    <AppShell>
      <div className="page-shell">
        <PageHeader badge="📈 PROGRESS" title={t("prog.title")} />

        {/* D2: Exam countdown */}
        {exam && exam.daysLeft > 0 && (
          <div className={`mb-5 flex items-center justify-between rounded-pill px-4 py-2 ${
            exam.phase === "final" ? "bg-critical/10" : "bg-brand-subtle"
          }`}>
            <span className="text-sm font-bold text-primary">{exam.daysLeft} {t("prog.daysToExam")}</span>
            <span className="text-xs font-bold text-brand-text">{t(PHASE_LABEL[exam.phase])}</span>
          </div>
        )}

        {/* Hero card — 768×507 r24 */}
        <section className="g-card-hero relative mb-5 p-6">
          <div className="flex flex-col items-center text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-canvas text-streak">
              <FlameIcon size={44} />
            </div>
            <p className="mt-3 font-booster text-6xl font-extrabold leading-none" style={{ color: "var(--text-streak-default)" }}>
              {safeStreak}
            </p>
            <p className="mt-1 text-sm font-bold text-secondary">{t(LEVEL_KEYS[levelIdx])}</p>

            {/* SP progress */}
            <div className="mt-4 flex items-center gap-2 rounded-pill bg-canvas px-4 py-2 w-full max-w-xs">
              <span className="font-booster text-lg font-extrabold text-primary">{safeSP}</span>
              <span className="text-xs text-tertiary">/ {nextXP} {t("prog.sp")}</span>
              <div className="flex-1 h-2 overflow-hidden rounded-pill bg-surface ml-2">
                <div className="h-full rounded-pill bg-brand transition-all" style={{ width: `${levelProgress * 100}%` }} />
              </div>
            </div>

            {/* E1: 9-level streak ladder */}
            <div className="mt-4 w-full">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-secondary">
                  {streakInfo.current.emoji} {t(STREAK_LEVEL_KEYS[streakInfo.current.level - 1])} (Lv{streakInfo.current.level})
                </p>
                {streakInfo.next && (
                  <p className="text-xs text-tertiary">
                    {t("prog.next")} {streakInfo.next.emoji} {t(STREAK_LEVEL_KEYS[streakInfo.next.level - 1])} {t("prog.at")} {streakInfo.next.minDays}{t("prog.daysAbbr")}
                  </p>
                )}
              </div>
              {/* 9-dot ladder */}
              <div className="flex justify-between gap-1">
                {STREAK_LEVELS.map((sl, i) => {
                  const active = i + 1 <= streakInfo.current.level;
                  const isCurrent = sl.level === streakInfo.current.level;
                  return (
                    <div key={sl.level} className="flex flex-1 flex-col items-center gap-1">
                      <div
                        className={`grid h-8 w-8 place-items-center rounded-full text-sm ${
                          isCurrent ? "bg-brand text-white" : active ? "bg-brand-subtle" : "bg-canvas opacity-50"
                        }`}
                        title={t(STREAK_LEVEL_KEYS[i])}
                      >
                        {sl.emoji}
                      </div>
                      <span className={`text-[8px] font-bold ${isCurrent ? "text-brand-text" : "text-tertiary"}`}>
                        {sl.minDays}{t("prog.daysAbbr")}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* Progress to next level */}
              {streakInfo.next && (
                <div className="mt-2 h-1.5 overflow-hidden rounded-pill bg-canvas">
                  <div className="h-full rounded-pill bg-streak transition-all" style={{ width: `${slProgress * 100}%` }} />
                </div>
              )}
              {/* Freeze indicator */}
              {streakFreezesOwned > 0 && (
                <p className="mt-2 text-[11px] text-info">
                  ❄️ {streakFreezesOwned} {streakFreezesOwned > 1 ? t("prog.freezesAvailable") : t("prog.freezeAvailable")}
                </p>
              )}
            </div>

            {/* Week calendar */}
            <div className="mt-5 flex w-full justify-between gap-1.5">
              {WEEK.map((d, i) => {
                const done = i < today && safeStreak > 0;
                const isToday = i === today;
                return (
                  <div key={d} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="text-[10px] font-semibold uppercase text-tertiary">{t(d)}</span>
                    <div
                      className={`grid h-11 w-11 place-items-center rounded-2xl border-2 text-xs font-booster font-extrabold ${
                        done
                          ? "border-transparent text-white"
                          : isToday
                            ? "border-brand text-brand-text"
                            : "border-subtle bg-surface text-tertiary"
                      }`}
                      style={done ? { background: "var(--bg-streak-emphasis-default)" } : undefined}
                    >
                      {done ? "🔥" : isToday ? dailyQuestionsAnswered : ""}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Daily goal */}
            <p className="mt-4 text-sm text-tertiary">
              {dailyQuestionsAnswered >= 20 ? t("prog.goalReached") : <>{20 - dailyQuestionsAnswered} {t("prog.questionsToSecure")}</>}
            </p>
          </div>
        </section>

        {/* Friends leaderboard */}
        <section className="g-card p-5">
          <div className="flex gap-2 mb-4">
            {(["day", "week", "month", "all"] as const).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setTab(tabKey)}
                className={`flex-1 rounded-pill py-2 text-xs font-bold transition ${
                  tab === tabKey ? "bg-action text-white" : "bg-canvas text-tertiary"
                }`}
              >
                {t(TAB_LABELS[tabKey])}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {[
              { name: "DON CHEUNG", sp: safeSP, isMe: true },
              { name: "Alex", sp: safeSP + 120 },
              { name: "Emma", sp: Math.max(0, safeSP - 30) },
            ].sort((a, b) => b.sp - a.sp).map((p, i) => (
              <div key={p.name} className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 ${p.isMe ? "border-brandborder" : "border-subtle"}`}>
                <span className="grid w-6 shrink-0 place-items-center font-booster text-sm font-extrabold text-tertiary">{i + 1}</span>
                <span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-extrabold text-white ${p.isMe ? "bg-brand" : "bg-tertiary"}`}>
                  {p.name[0]}
                </span>
                <span className={`flex-1 text-sm font-bold ${p.isMe ? "text-primary" : "text-secondary"}`}>{p.name}</span>
                <span className="text-sm font-booster font-extrabold text-primary">{p.sp} {t("prog.sp")}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
