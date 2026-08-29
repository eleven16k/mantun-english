"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { useGameStore } from "@/lib/store";
import { getExamPhase, getProfile } from "@/lib/plan";
import { isLoggedIn, getMe } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

/**
 * /parent — F2 (web version): parent dashboard showing estimated score vs target,
 * streak, weekly summary, and daily goal settings.
 * Stats come from the server (economy + score_history) when logged in,
 * falling back to the local store offline.
 */

/** Daily estimated-score gains over the last 7 days from score history. */
function weeklyGains(history: { estimated_score: number; recorded_at: number }[]): number[] {
  const days = new Array(7).fill(0);
  const byDay = new Map<string, number>();
  for (const h of history) {
    const key = new Date(h.recorded_at * 1000).toISOString().slice(0, 10);
    byDay.set(key, Math.max(byDay.get(key) ?? 0, h.estimated_score));
  }
  const ordered = [...byDay.entries()].sort((a, b) => a[0].localeCompare(b[0])).slice(-7);
  ordered.forEach(([day, est], i) => {
    const idx = 7 - ordered.length + i;
    const prev = i > 0 ? ordered[i - 1][1] : est;
    days[idx] = Math.max(0, est - prev);
  });
  return days;
}

export default function ParentPage() {
  const router = useRouter();
  const store = useGameStore();
  const { streak, scorePoints, dailyQuestionsAnswered, sessionCorrect, sessionWrong } = store;
  const { locale, t } = useI18n();

  const [server, setServer] = useState<{ streak: number; sp: number; weekly: number[] } | null>(null);
  useEffect(() => {
    if (!isLoggedIn()) return;
    getMe()
      .then((d) => {
        const eco = d.economy ?? {};
        setServer({
          streak: Number(eco.streak ?? streak),
          sp: Number(eco.score_points ?? scorePoints),
          weekly: weeklyGains(d.scoreHistory ?? []),
        });
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const profile = typeof window !== "undefined" ? getProfile() : null;
  const exam = profile?.examDate ? getExamPhase(profile.examDate) : null;
  const targetScore = profile?.targetScore ?? 100;
  const estimatedScore = profile?.estimatedScore ?? 0;
  const gap = Math.max(0, targetScore - estimatedScore);
  const totalAnswered = sessionCorrect + sessionWrong;
  const accuracy = totalAnswered > 0 ? Math.round((sessionCorrect / totalAnswered) * 100) : 0;
  const dayLabels = locale === "zh"
    ? ["一", "二", "三", "四", "五", "六", "日"]
    : ["M", "T", "W", "T", "F", "S", "S"];
  const weekly = server?.weekly ?? [0, 0, 0, 0, 0, 0, 0];
  const weeklyMax = Math.max(1, ...weekly);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[768px] px-6 pt-[84px] pb-6">
        <h1 className="pt-1 font-booster text-[26px] font-extrabold leading-[32px] text-primary mb-5">{t("parent.title")}</h1>

        {/* Score gap hero */}
        <section className="g-card-hero p-6 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-tertiary">{t("parent.estimatedScore")}</p>
          <div className="mt-2 flex items-baseline justify-center gap-3">
            <span className="font-booster text-6xl font-extrabold text-primary">{estimatedScore}</span>
            <span className="text-sm text-tertiary">/ {targetScore} {t("parent.target")}</span>
          </div>
          {/* Progress bar */}
          <div className="mx-auto mt-4 h-3 max-w-xs overflow-hidden rounded-pill bg-canvas">
            <div
              className={`h-full rounded-pill transition-all ${gap <= 0 ? "bg-positive" : "bg-brand"}`}
              style={{ width: `${Math.min(100, (estimatedScore / targetScore) * 100)}%` }}
            />
          </div>
          <p className={`mt-2 text-sm font-bold ${gap <= 0 ? "text-positive" : "text-secondary"}`}>
            {gap <= 0 ? t("parent.achieved") : <>{gap} {t("parent.pointsToGo")}</>}
          </p>
          {exam && (
            <p className="mt-2 text-xs text-tertiary">
              {exam.daysLeft} {t("parent.daysToExam")} · {exam.phaseLabel}
            </p>
          )}
        </section>

        {/* Stats grid */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="g-card p-4 text-center shadow-sm">
            <p className="font-booster text-2xl font-extrabold" style={{ color: "var(--text-streak-default)" }}>{server?.streak ?? streak}</p>
            <p className="text-[11px] text-tertiary">{t("parent.dayStreak")}</p>
          </div>
          <div className="g-card p-4 text-center shadow-sm">
            <p className="font-booster text-2xl font-extrabold text-brand-text">{server?.sp ?? scorePoints}</p>
            <p className="text-[11px] text-tertiary">{t("parent.scorePoints")}</p>
          </div>
          <div className="g-card p-4 text-center shadow-sm">
            <p className="font-booster text-2xl font-extrabold text-positive">{accuracy}%</p>
            <p className="text-[11px] text-tertiary">{t("parent.accuracy")}</p>
          </div>
        </div>

        {/* Today's activity */}
        <section className="mt-5 g-card p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-bold text-primary">{t("parent.today")}</h2>
          <div className="flex items-center justify-between rounded-pill bg-canvas px-4 py-3">
            <span className="text-sm text-secondary">{dailyQuestionsAnswered} / 20 {t("parent.questions")}</span>
            <span className={`text-xs font-bold ${dailyQuestionsAnswered >= 20 ? "text-positive" : "text-tertiary"}`}>
              {dailyQuestionsAnswered >= 20 ? t("parent.complete") : t("parent.inProgress")}
            </span>
          </div>
        </section>

        {/* Weekly summary */}
        <section className="mt-5 g-card p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-bold text-primary">{t("parent.thisWeek")}</h2>
          <div className="flex items-end gap-2 h-24">
            {weekly.map((n, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-full rounded-t-lg bg-brand transition-all"
                  style={{ height: `${Math.max(4, (n / weeklyMax) * 80)}px`, opacity: i === 6 ? 1 : 0.6 }}
                  title={String(n)}
                />
                <span className="text-[10px] text-tertiary">{dayLabels[i]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Study time limit */}
        <section className="mt-5 g-card p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-bold text-primary">{t("parent.timeLimit")}</h2>
          <p className="text-sm text-secondary">{t("parent.dailyLimit")}: <span className="font-bold">{t("parent.twoHours")}</span> ({t("parent.default")})</p>
          <p className="mt-1 text-xs text-tertiary">{t("parent.limitNote")}</p>
        </section>

        {/* Upgrade prompt */}
        <div className="mt-5 rounded-2xl border border-brandborder bg-brand-subtle p-5 text-center">
          <p className="font-booster text-base font-extrabold text-primary">{t("parent.realtimeTitle")}</p>
          <p className="mt-1 text-xs text-secondary">{t("parent.realtimeNote")}</p>
          <button
            onClick={() => router.push("/pricing")}
            className="mt-3 rounded-pill bg-brand px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
          >
            {t("parent.seePlans")}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
