"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/store";
import { BASE_PATH } from "@/lib/config";
import { generateDailyPlan, getExamPhase, getProfile, questionsFromPlan } from "@/lib/plan";
import { TargetIcon, RepeatIcon, SparklesIcon } from "./icons";
import { useI18n } from "@/lib/i18n";

const ASSETS = `${BASE_PATH}/sites/assets`;
const STUDY_OFFSETS = [0, -2, -4, -5, -5, -6];

/** English-practice action buttons (lucide 26px + Inter-Bold 16px) */
const ACTIONS = [
  { label: "dash.upload", href: "/import", d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" },
  { label: "dash.paste", href: "/import?mode=paste", d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 2h6v4H9zM9 12h6M9 16h4" },
  // Video import not supported yet — add back when it ships:
  // { label: "dash.youtube", href: "/import?mode=youtube", d: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.92 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27z" },
  { label: "dash.more", href: "/import", d: "M12 5v14M5 12l7 7 7-7" },
  { label: "dash.pk", href: "/pk", d: "M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l3-3M14.5 6.5 18 3h3v3l-3.5 4M5 14l4 4M7 17l-3 3M3 19l2 2" },
  { label: "dash.reading", href: "/reading", d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" },
  { label: "dash.solve", href: "/solve", d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" },
] as const;

const PHASE_LABEL = {
  foundation: "dash.phaseFoundation",
  specialized: "dash.phaseSpecialized",
  sprint: "dash.phaseSprint",
  final: "dash.phaseFinal",
} as const;

const TYPE_LABEL = {
  weakness: "dash.typeWeakness",
  review: "dash.typeReview",
  new: "dash.typeNew",
} as const;

export function Dashboard() {
  const router = useRouter();
  const { t } = useI18n();
  const streak = useGameStore((s) => s.streak);
  const dailyQuestionsAnswered = useGameStore((s) => s.dailyQuestionsAnswered);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const profile = mounted ? getProfile() : null;
  const exam = mounted && profile?.examDate ? getExamPhase(profile.examDate) : null;
  const plan = useMemo(() => (mounted ? generateDailyPlan() : null), [mounted]);
  const goal = plan?.goal ?? 20;
  const done = Math.min(dailyQuestionsAnswered, goal);

  const startPlan = () => {
    if (!plan || plan.totalQuestions === 0) {
      router.push("/quiz");
      return;
    }
    const qs = questionsFromPlan(plan);
    sessionStorage.setItem("lexi-import-quiz", JSON.stringify({ deckTitle: t("dash.todayPlan"), questions: qs }));
    router.push("/quiz?src=import");
  };

  return (
    <div className="page-shell flex flex-1 flex-col">
      {/* 首页标题已移除——首屏直接进内容（倒计时/今日计划），顶部留白由 pt-[84px] 承担 */}
      {/* D2: Countdown banner */}
      {exam && exam.daysLeft > 0 && (
        <div className={`mt-3 flex items-center justify-between rounded-pill px-4 py-2 ${
          exam.phase === "final" ? "bg-critical/10" : exam.phase === "sprint" ? "bg-warning/10" : "bg-brand-subtle"
        }`}>
          <span className="text-sm font-bold text-primary">
            {exam.daysLeft} {t("dash.daysToExam")}
          </span>
          <span className={`text-xs font-bold ${
            exam.phase === "final" ? "text-critical" : exam.phase === "sprint" ? "text-warning" : "text-brand-text"
          }`}>
            {t(PHASE_LABEL[exam.phase])} · {exam.intensity}× {t("dash.intensity")}
          </span>
        </div>
      )}

      {/* hero: mascot + headline — 紧凑横排，保证首屏内露出今日计划卡 */}
      <div className="flex items-center justify-center gap-4 pt-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSETS}/dolphin.png`} alt={t("dash.mascotAlt")} className="h-[104px] w-[104px] object-contain lg:h-[132px] lg:w-[132px]" />
        <h2 className="flex flex-wrap items-baseline gap-x-1">
          <span className="text-[16px] font-bold leading-[24px] text-secondary">{t("dash.readyTo")}</span>
          <span className="inline-flex font-booster text-[30px] font-extrabold leading-[36px] text-secondary">
            {t("dash.studyBig").split("").map((ch, i) => (
              <span key={i} style={{ transform: `translateY(${STUDY_OFFSETS[i] ?? 0}px)` }}>
                {ch}
              </span>
            ))}
          </span>
        </h2>
      </div>

      {/* D1: Daily plan card — white r30 with paper border */}
      <div className="relative mt-5 rounded-[30px] border-4 bg-surface p-5" style={{ borderColor: "var(--bg-canvas)" }}>
        {/* juyou 贴纸签名：右上角旋转标签（Lexi 业务词） */}
        <span className="game-badge absolute -top-3 right-6 z-10 text-xs text-[#0f172a]">
          🎯 {t("dash.todayPlan")}
        </span>
        <div className="flex items-center gap-3 rounded-pill bg-canvas px-4 py-3">
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-tertiary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 14l-4-4 4-4" />
            <path d="M4 10h11a4 4 0 0 1 4 4v4" />
          </svg>
          <span className="flex-1 text-[16px] text-tertiary">
            {t("dash.today")} {done} / {goal} {t("dash.questions")}
          </span>
          <div className="h-2 w-24 overflow-hidden rounded-pill bg-surface">
            <div className="h-full rounded-pill bg-brand" style={{ width: `${(done / goal) * 100}%` }} />
          </div>
        </div>

        {/* D1: Plan breakdown */}
        {plan && plan.totalQuestions > 0 && (
          <div className="mt-3 flex gap-2 px-2">
            {plan.items.filter(i => i.count > 0).map(item => (
              <span key={item.type} className="flex items-center gap-1 rounded-pill bg-canvas px-3 py-1 text-[11px] font-bold text-secondary">
                {item.type === "weakness" ? (
                  <TargetIcon size={12} className="text-critical" />
                ) : item.type === "review" ? (
                  <RepeatIcon size={12} className="text-brand-text" />
                ) : (
                  <SparklesIcon size={12} className="text-gold" />
                )}
                {item.count} {t(TYPE_LABEL[item.type])}
              </span>
            ))}
          </div>
        )}

        {/* Start plan button */}
        <button
          onClick={startPlan}
          className="game-btn mt-3 w-full bg-brand py-3 font-booster text-base text-white"
        >
          {done >= goal ? t("dash.extraPractice") : t("dash.startPlan")}
        </button>

        {/* ⚡ 闪电快答：节奏玩法入口（每题 10 秒，答得越快倍率越高） */}
        <button
          onClick={() => {
            useGameStore.getState().startQuiz(10, undefined, { lightning: true });
            router.push("/quiz");
          }}
          className="game-btn mt-2 w-full bg-accent py-2.5 text-sm text-[#0f172a]"
        >
          ⚡ {t("dash.lightning")} · ×3
        </button>

        {/* Action buttons — Upload / Paste / PK / More */}
        <div className="mt-4 flex items-center justify-between px-4 pb-1">
          {ACTIONS.map((b) => (
            <button key={b.label} onClick={() => router.push(b.href)} className="flex flex-col items-center gap-1.5 text-primary transition hover:opacity-70">
              <svg viewBox="0 0 24 24" className="h-[26px] w-[26px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={b.d} />
              </svg>
              <span className="text-[16px] font-bold leading-[26px]">{t(b.label)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      {/* bottom pill */}
      <div className="flex justify-center pb-8">
        <button
          onClick={() => router.push("/quiz")}
          className="flex h-[40px] items-center gap-1.5 rounded-pill bg-surface px-5 text-[16px] text-primary transition hover:bg-canvas"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-tertiary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          {t("dash.streak")} {streak} {t("dash.days")} · {t("dash.continue")}
        </button>
      </div>
    </div>
  );
}
