"use client";

/**
 * Gizmo chrome — 300px sidebar + 68px top bar (verbatim from PAGE_TOPOLOGY.md).
 * Lexi uses the same layout on desktop; mobile collapses to the bottom nav.
 * Nav labels/actions are wired to Lexi's store screens.
 */

import { HeartFilledIcon } from '@/components/SvgIcons';
import { useGameStore } from "@/lib/store";
import { BASE_PATH } from "@/lib/config";
import { useI18n } from "@/lib/i18n";
import type { ScreenName } from "@/lib/types";

const ASSETS = `${BASE_PATH}/sites/assets`;

export function GizmoSidebar() {
  const { t } = useI18n();
  const currentScreen = useGameStore((s) => s.currentScreen);
  const navigate = useGameStore((s) => s.navigate);
  const hearts = useGameStore((s) => s.hearts);

  const nav: { label: string; icon: string; screen: ScreenName; round?: boolean }[] = [
    { label: t("chrome.home"), icon: `${ASSETS}/nav-home.png`, screen: "dashboard" },
    { label: t("chrome.progress"), icon: `${ASSETS}/nav-streak.png`, screen: "dashboard" },
    { label: t("chrome.profileDecks"), icon: `${ASSETS}/nav-folder.png`, screen: "dashboard" },
    // Hidden until more decks ship — see AppShell sidebar note.
    // { label: t("chrome.publicDecks"), icon: `${ASSETS}/nav-globe.png`, screen: "leaderboard" },
    { label: t("chrome.profile"), icon: `${ASSETS}/avatar-13.png`, screen: "profile", round: true },
  ];

  return (
    <aside className="hidden w-[300px] shrink-0 flex-col bg-surface lg:flex">
      {/* wordmark */}
      <div className="flex h-[72px] items-center px-6">
        <span className="font-booster text-2xl font-extrabold tracking-tight text-primary">Lexi</span>
      </div>

      {/* nav — measured: 56px pitch, PNG icons 36px, Inter-Bold 16 tertiary */}
      <nav className="flex flex-col px-2">
        {nav.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.screen)}
            className={`flex h-[56px] items-center gap-4 rounded-xl px-4 text-left transition-colors hover:bg-canvas ${
              currentScreen === item.screen ? "text-primary" : "text-tertiary"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.icon} alt="" className={`h-9 w-9 shrink-0 ${item.round ? "rounded-full" : ""}`} />
            <span className="text-[16px] font-bold leading-[24px]">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Study pill — measured: #0f172a, r-full, 267×40 */}
      <div className="mt-6 flex flex-col gap-3 px-4">
        <button
          onClick={() => useGameStore.getState().startQuiz(10)}
          className="flex h-[40px] items-center justify-center gap-2 rounded-pill bg-action px-5 text-[14px] font-bold text-white transition hover:bg-actionhover"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="url(#lexi-study-g)" strokeWidth="2.5" strokeLinecap="round">
            <defs>
              <linearGradient id="lexi-study-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#c4b5fd" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path d="M12 5v14M5 12h14" />
          </svg>
          {t("chrome.startStudying")}
        </button>
        <button
          onClick={() => navigate("dashboard")}
          className="flex h-[40px] items-center justify-center gap-2 text-[14px] font-bold text-primary transition hover:opacity-70"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          {t("chrome.add")}
        </button>
      </div>

      {/* deck section — measured: label Inter-Bold 16 secondary; rows r12 h40 */}
      <div className="mt-7 flex-1 overflow-y-auto px-5">
        <p className="text-[16px] font-bold leading-[24px] text-secondary">{t("chrome.profileDecks")}</p>
        <button
          onClick={() => useGameStore.getState().startQuiz(10)}
          className="mt-2 flex h-[40px] w-full items-center gap-3 rounded-xl px-2 text-left transition-colors hover:bg-canvas"
        >
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-brand" />
          <span className="text-[16px] leading-[24px] text-primary">{t("chrome.vocabulary")}</span>
          <span className="ml-auto text-xs text-tertiary">{hearts} <HeartFilledIcon size={12} className="inline text-hearts" /></span>
        </button>
      </div>

      {/* bottom avatar — measured 36px */}
      <div className="p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSETS}/avatar-13.png`} alt="" className="h-9 w-9 rounded-full" />
      </div>
    </aside>
  );
}

/** 68px top bar: gradient fade + right cluster (Gizmo Live→对战 / Coins→Shop / 铃铛 / 头像) */
export function GizmoTopBar() {
  const { t } = useI18n();
  const coins = useGameStore((s) => s.coins);
  const streak = useGameStore((s) => s.streak);
  const navigate = useGameStore((s) => s.navigate);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[68px] items-center justify-end px-6">
      {/* gradient veil (#f8fafc 88% → transparent, measured) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, rgba(248,250,252,0.88) 0%, rgba(248,250,252,0) 100%)" }}
        aria-hidden
      />
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={() => navigate("leaderboard")}
          className="flex h-9 items-center gap-2 rounded-pill bg-surface px-3 text-sm font-semibold text-primary transition hover:bg-canvas"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ASSETS}/nav-joystick.png`} alt="" className="h-5 w-5" />
          {t("chrome.streak")} {streak}
        </button>
        <button
          onClick={() => navigate("shop")}
          className="flex h-9 items-center gap-1.5 rounded-pill bg-surface px-3 text-sm font-bold text-primary transition hover:bg-canvas"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ASSETS}/coin.png`} alt="" className="h-5 w-5" />
          {coins}
        </button>
        <button className="grid h-9 w-9 place-items-center rounded-pill bg-surface text-primary transition hover:bg-canvas">
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <button onClick={() => navigate("profile")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ASSETS}/avatar-13.png`} alt="" className="h-9 w-9 rounded-full" />
        </button>
      </div>
    </header>
  );
}
