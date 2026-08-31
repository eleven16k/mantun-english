"use client";

/**
 * AppShell — shared chrome for every route.
 * Desktop sidebar follows the cloned Gizmo conversation-sidebar pattern:
 * brand tile → primary CTA card → search → grouped nav list → user footer.
 * Mobile keeps the bottom tab bar (AppShell bottom) + glass tabbar.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useGameStore } from "@/lib/store";
import { useAppSync } from "@/lib/useAppSync";
import { useI18n, type MessageKey } from "@/lib/i18n";

const ASSETS = "/sites/assets";

/* Inline stroke icons (18px) — cloned-site icon language */
const I = {
  home: "M3 11l9-8 9 8v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  progress: "M22 12h-4l-3 9L9 3l-3 9H2",
  solve: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z",
  deck: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
  globe: "M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  swords: "M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l3-3",
  bolt: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M18 2H6v7a6 6 0 0 0 12 0V2z",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  classroom: "M22 10 12 5 2 10l10 5 10-5zM6 12v5c3 3 9 3 12 0v-5",
  history: "M12 8v4l3 3M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9z",
  alert: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  parent: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM2 3h6M2 7h4",
  crown: "M2 18h20l-2-9-5 4-3-7-3 7-5-4z",
  share: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  gamepad: "M6 12h4m-2-2v4M15 11h.01M18 13h.01M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
};

interface NavItem { href: string; labelKey: MessageKey; icon: string }
interface NavSection { titleKey: MessageKey; items: NavItem[] }

const NAV_SECTIONS: NavSection[] = [
  {
    titleKey: "nav.sectionLearn",
    items: [
      { href: "/chat", labelKey: "nav.home", icon: I.home },
      { href: "/scenarios", labelKey: "nav.scenarios", icon: I.phone },
      { href: "/progress", labelKey: "nav.progress", icon: I.progress },
      { href: "/solve", labelKey: "nav.solve", icon: I.solve },
    ],
  },
  {
    titleKey: "nav.sectionDecks",
    items: [
      { href: "/decks", labelKey: "nav.myDecks", icon: I.deck },
      // Hidden until more decks ship (English is the only deck for now) —
      // route/page still exist at /decks/public.
      // { href: "/decks/public", labelKey: "nav.publicDecks", icon: I.globe },
      { href: "/vocab", labelKey: "nav.vocab", icon: I.deck },
      { href: "/add", labelKey: "nav.addCard", icon: I.bolt },
    ],
  },
  {
    titleKey: "nav.sectionPlay",
    items: [
      { href: "/pk", labelKey: "nav.pk", icon: I.swords },
      { href: "/battle", labelKey: "nav.battle", icon: I.bolt },
      { href: "/wordquest", labelKey: "nav.wordquest", icon: I.gamepad },
      { href: "/leaderboard", labelKey: "nav.league", icon: I.trophy },
      { href: "/groups", labelKey: "nav.groups", icon: I.users },
      { href: "/class", labelKey: "nav.class", icon: I.classroom },
    ],
  },
  {
    titleKey: "nav.sectionMore",
    items: [
      { href: "/weakness", labelKey: "nav.weakness", icon: I.alert },
      { href: "/history", labelKey: "nav.aiHistory", icon: I.history },
      { href: "/share", labelKey: "nav.share", icon: I.share },
      { href: "/parent", labelKey: "nav.parent", icon: I.parent },
      { href: "/pricing", labelKey: "nav.pricing", icon: I.crown },
    ],
  },
];

const MOBILE_TABS: { href: string; labelKey: MessageKey }[] = [
  { href: "/chat", labelKey: "nav.home" },
  { href: "/decks", labelKey: "nav.decks" },
  { href: "/leaderboard", labelKey: "nav.league" },
  { href: "/shop", labelKey: "nav.shop" },
  { href: "/profile", labelKey: "nav.profile" },
];

export function AppShell({ children, hideChrome = false }: { children: React.ReactNode; hideChrome?: boolean }) {
  const pathname = usePathname();
  useAppSync();
  const { t } = useI18n();

  // Heart regen: catch up once on mount, then check every minute
  // (tickRegen computes elapsed time since depletion, works across sessions)
  useEffect(() => {
    const regen = () => useGameStore.getState().tickRegen();
    regen();
    const timer = setInterval(regen, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const coins = useGameStore((s) => s.coins);
  const streak = useGameStore((s) => s.streak);
  const hearts = useGameStore((s) => s.hearts);
  const [navQuery, setNavQuery] = useState("");

  const sections = useMemo(() => {
    const q = navQuery.trim().toLowerCase();
    if (!q) return NAV_SECTIONS;
    return NAV_SECTIONS.map((s) => ({
      ...s,
      items: s.items.filter((it) => t(it.labelKey).toLowerCase().includes(q)),
    })).filter((s) => s.items.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navQuery, t]);

  if (hideChrome) return <>{children}</>;

  const isActive = (href: string) =>
    pathname === href || (href === "/chat" && pathname === "/");

  return (
    <div className="flex h-dvh overflow-hidden bg-app text-primary">
      {/* Sidebar - cloned-site pattern: brand / CTA / search / grouped list / footer */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-subtle bg-surface lg:flex">
        {/* brand */}
        <div className="flex items-center gap-2 px-4 py-3.5">
          <Link href="/chat" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white shadow-sm">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15l-4.9 2.6.9-5.5-4-3.9 5.5-.8z" />
              </svg>
            </span>
            <span className="font-booster text-lg font-extrabold">Lexi</span>
          </Link>
        </div>

        {/* primary CTA - start studying + import */}
        <div className="px-3 pb-1">
          <Link
            href="/quiz"
            className="flex w-full items-center gap-2 rounded-xl border border-subtle bg-surface px-3.5 py-2.5 text-sm font-semibold text-secondary shadow-sm transition hover:border-brandborder hover:bg-canvas hover:text-primary"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-text" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {t("nav.study")}
            <span className="ml-auto text-xs text-tertiary">{hearts} &#9829;</span>
          </Link>
          <Link
            href="/import"
            className="mt-1.5 flex w-full items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold text-tertiary transition hover:bg-canvas hover:text-secondary"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            {t("nav.import")}
          </Link>
        </div>

        {/* nav search */}
        <div className="px-3 py-2.5">
          <div className="flex items-center gap-2 rounded-full bg-canvas px-3.5 py-2">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-tertiary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              value={navQuery}
              onChange={(e) => setNavQuery(e.target.value)}
              placeholder={t("nav.searchPh")}
              className="w-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-tertiary"
            />
          </div>
        </div>

        {/* grouped nav list */}
        <nav className="flex-1 overflow-y-auto px-2 pb-3">
          {sections.map((section) => (
            <div key={section.titleKey} className="mb-1">
              <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-tertiary">
                {t(section.titleKey)}
              </p>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors ${
                    isActive(item.href)
                      ? "bg-canvas text-primary"
                      : "text-secondary hover:bg-canvas hover:text-primary"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className={`h-[18px] w-[18px] shrink-0 ${isActive(item.href) ? "text-brand-text" : "text-tertiary"}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                  <span className="truncate text-sm font-medium">{t(item.labelKey)}</span>
                </Link>
              ))}
            </div>
          ))}
          {sections.length === 0 && (
            <p className="px-3 py-4 text-center text-sm text-tertiary">{t("nav.noResults")}</p>
          )}
        </nav>

        {/* footer - profile + settings */}
        <div className="border-t border-subtle p-2">
          <Link
            href="/profile"
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors ${
              isActive("/profile") ? "bg-canvas" : "hover:bg-canvas"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ASSETS}/avatar-13.png`} alt="" className="h-7 w-7 rounded-full" />
            <span className="flex-1 truncate text-sm font-semibold text-primary">{t("nav.profile")}</span>
          </Link>
          <Link
            href="/settings"
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors ${
              isActive("/settings") ? "bg-canvas" : "hover:bg-canvas"
            }`}
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-tertiary">
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={I.gear} />
              </svg>
            </span>
            <span className="flex-1 truncate text-sm font-semibold text-secondary">{t("nav.settings")}</span>
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="relative flex min-w-0 flex-1 flex-col">
        {/* Topbar 68px */}
        {!hideChrome && (
          <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[68px] items-center justify-end px-6">
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{ background: "linear-gradient(180deg, rgba(248,250,252,0.88) 0%, rgba(248,250,252,0) 100%)" }}
              aria-hidden
            />
            <div className="pointer-results-auto flex items-center gap-2">
              <Link
                href="/progress"
                className="flex h-9 items-center gap-2 rounded-pill bg-surface px-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-canvas"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${ASSETS}/nav-joystick.png`} alt="" className="h-5 w-5" />
                {t("nav.streak")} {streak}
              </Link>
              <Link
                href="/shop"
                className="flex h-9 items-center gap-1.5 rounded-pill bg-surface px-3 text-sm font-bold text-primary shadow-sm transition hover:bg-canvas"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${ASSETS}/coin.png`} alt="" className="h-5 w-5" />
                {coins}
              </Link>
              <button className="grid h-9 w-9 place-items-center rounded-pill bg-surface text-primary shadow-sm transition hover:bg-canvas">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </button>
              <Link href="/profile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${ASSETS}/avatar-13.png`} alt="" className="h-9 w-9 rounded-full" />
              </Link>
            </div>
          </header>
        )}

        <div className="flex-1 overflow-y-auto">{children}</div>

        {/* Mobile bottom nav — iOS Liquid Glass floating tab bar */}
        <div className="sticky bottom-0 z-30 px-4 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-2 lg:hidden">
          <nav className="relative mx-auto flex max-w-md items-stretch justify-around rounded-[26px] border border-white/55 bg-surface/55 py-1.5 shadow-[0_10px_36px_-6px_rgba(15,23,42,0.22)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-surface/60 dark:shadow-[0_10px_36px_-6px_rgba(0,0,0,0.6)]">
            {/* specular glass highlight */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-b from-white/50 via-white/10 to-transparent dark:from-white/[0.08] dark:via-transparent"
            />
            {MOBILE_TABS.map((tab) => {
              const active = isActive(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`relative flex flex-1 flex-col items-center gap-0.5 rounded-3xl px-1 py-2 transition-all duration-200 active:scale-90 ${
                    active ? "text-brand-text" : "text-tertiary/80 hover:text-secondary"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-6 w-6 transition-transform duration-200 ${active ? "scale-110" : ""}`}
                    fill={active ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth={active ? 1.8 : 2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {tab.href === "/chat" && <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />}
                    {tab.href === "/decks" && <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />}
                    {tab.href === "/leaderboard" && <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0z" />}
                    {tab.href === "/shop" && <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />}
                    {tab.href === "/profile" && <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />}
                  </svg>
                  <span className="text-[10px] font-semibold">{t(tab.labelKey)}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
