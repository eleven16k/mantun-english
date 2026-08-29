"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { useGameStore } from "@/lib/store";
import { useI18n, LOCALES } from "@/lib/i18n";

/* — toggle switch — */
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${
        checked ? "bg-brand" : "bg-canvas"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

/* — settings section — */
function SettingGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="px-2 text-xs font-extrabold uppercase tracking-wide text-tertiary">{title}</h2>
      <div className="mt-1.5 divide-y divide-[var(--border-subtle)] overflow-hidden rounded-2xl border border-subtle bg-surface">
        {children}
      </div>
    </section>
  );
}

/* — toggle row — */
function ToggleRow({ label, checked, onChange, hint }: {
  label: string; checked: boolean; onChange: (v: boolean) => void; hint?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3.5">
      <div className="min-w-0">
        <p className="text-[15px] font-medium text-primary">{label}</p>
        {hint && <p className="mt-0.5 text-xs text-tertiary">{hint}</p>}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

/* — language row — */
function LanguageRow() {
  const { locale, setLocale, t } = useI18n();
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3.5">
      <p className="text-[15px] font-medium text-primary">{t("settings.language")}</p>
      <div className="flex gap-1 rounded-full bg-canvas p-1" role="group" aria-label="Language">
        {LOCALES.map((l) => (
          <button
            key={l.value}
            type="button"
            aria-pressed={locale === l.value}
            onClick={() => setLocale(l.value)}
            className={`rounded-full px-3 py-1.5 text-sm font-bold transition ${
              locale === l.value ? "bg-brand text-white shadow-sm" : "text-tertiary hover:text-secondary"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* — link row — */
function LinkRow({ label, value, onClick, destructive }: {
  label: string; value?: string; onClick?: () => void; destructive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-canvas"
    >
      <span className={`text-[15px] font-medium ${destructive ? "text-critical" : "text-primary"}`}>
        {label}
      </span>
      {value && <span className="text-sm text-tertiary">{value}</span>}
    </button>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { coins, scorePoints, streak, isMember } = useGameStore();
  const { t } = useI18n();

  // Preferences persist in localStorage and survive reloads.
  // Dark mode applies via the .dark class on <html> (CSS vars auto-flip).
  const [darkMode, setDarkMode] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [hapticOn, setHapticOn] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifStreak, setNotifStreak] = useState(true);
  const [signedOut, setSignedOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  const prefs = { darkMode, focusMode, soundOn, hapticOn, notifPush, notifStreak };

  useEffect(() => {
    setMounted(true);
    try {
      const saved = JSON.parse(localStorage.getItem("lexi-settings") || "{}");
      if (typeof saved.darkMode === "boolean") setDarkMode(saved.darkMode);
      if (typeof saved.focusMode === "boolean") setFocusMode(saved.focusMode);
      if (typeof saved.soundOn === "boolean") setSoundOn(saved.soundOn);
      if (typeof saved.hapticOn === "boolean") setHapticOn(saved.hapticOn);
      if (typeof saved.notifPush === "boolean") setNotifPush(saved.notifPush);
      if (typeof saved.notifStreak === "boolean") setNotifStreak(saved.notifStreak);
      if (saved.darkMode) document.documentElement.classList.add("dark");
    } catch { /* fresh start */ }
  }, []);

  // Save on every change
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("lexi-settings", JSON.stringify(prefs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode, focusMode, soundOn, hapticOn, notifPush, notifStreak, mounted]);

  const toggleDark = (v: boolean) => {
    setDarkMode(v);
    document.documentElement.classList.toggle("dark", v);
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-md px-3 pb-6 pt-[84px] sm:px-4">
        <h1 className="px-2 pt-1 font-booster text-[26px] font-extrabold leading-[32px] text-primary mb-5">{t("settings.title")}</h1>

        {signedOut ? (
          <div className="g-card p-8 text-center shadow-sm">
            <p className="font-booster text-lg font-extrabold text-primary">{t("settings.signedOut")}</p>
            <p className="mt-1 text-sm text-tertiary">{t("settings.signedOutHint")}</p>
            <button
              onClick={() => setSignedOut(false)}
              className="mt-4 rounded-pill bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
            >
              {t("settings.signIn")}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Account */}
            <SettingGroup title={t("settings.account")}>
              <LinkRow label={t("settings.email")} value="you@lexi.app" />
              <LinkRow label={t("settings.password")} value="••••••••" />
            </SettingGroup>

            {/* Appearance */}
            <SettingGroup title={t("settings.appearance")}>
              <ToggleRow
                label={t("settings.darkMode")}
                checked={mounted && darkMode}
                onChange={toggleDark}
                hint={t("settings.darkModeHint")}
              />
              <ToggleRow
                label={t("settings.focusMode")}
                checked={focusMode}
                onChange={setFocusMode}
                hint={t("settings.focusModeHint")}
              />
            </SettingGroup>

            {/* Language */}
            <SettingGroup title={t("settings.language")}>
              <LanguageRow />
            </SettingGroup>

            {/* Membership */}
            <SettingGroup title={t("settings.membership")}>
              <LinkRow
                label={t("settings.subscription")}
                value={isMember ? t("settings.memberActive") : t("settings.upgrade")}
                onClick={() => router.push("/pricing")}
              />
            </SettingGroup>

            {/* Sound & Haptics */}
            <SettingGroup title={t("settings.soundHaptics")}>
              <ToggleRow
                label={t("settings.sound")}
                checked={soundOn}
                onChange={setSoundOn}
                hint={t("settings.soundHint")}
              />
              <ToggleRow
                label={t("settings.haptic")}
                checked={hapticOn}
                onChange={setHapticOn}
                hint={t("settings.hapticHint")}
              />
            </SettingGroup>

            {/* Notifications */}
            <SettingGroup title={t("settings.notifications")}>
              <ToggleRow
                label={t("settings.push")}
                checked={notifPush}
                onChange={setNotifPush}
              />
              <ToggleRow
                label={t("settings.streakReminders")}
                checked={notifStreak}
                onChange={setNotifStreak}
                hint={t("settings.streakRemindersHint")}
              />
            </SettingGroup>

            {/* Stats summary */}
            <SettingGroup title={t("settings.stats")}>
              <div className="grid grid-cols-3 divide-x divide-[var(--border-subtle)]">
                <div className="p-4 text-center">
                  <p className="font-booster text-xl font-extrabold text-primary">{mounted ? streak : '—'}</p>
                  <p className="text-[11px] text-tertiary">{t("settings.statStreak")}</p>
                </div>
                <div className="p-4 text-center">
                  <p className="font-booster text-xl font-extrabold text-primary">{mounted ? scorePoints : '—'}</p>
                  <p className="text-[11px] text-tertiary">{t("settings.statScore")}</p>
                </div>
                <div className="p-4 text-center">
                  <p className="font-booster text-xl font-extrabold text-gold">{mounted ? coins : '—'}</p>
                  <p className="text-[11px] text-tertiary">{t("settings.statCoins")}</p>
                </div>
              </div>
            </SettingGroup>

            {/* Study preferences */}
            <SettingGroup title={t("settings.study")}>
              <LinkRow label={t("settings.dailyGoal")} value={t("settings.dailyGoalValue")} />
              <LinkRow label={t("settings.difficulty")} value={t("settings.difficultyValue")} />
            </SettingGroup>

            {/* Sign out */}
            <SettingGroup title="">
              <LinkRow
                label={t("settings.signOut")}
                destructive
                onClick={() => setSignedOut(true)}
              />
            </SettingGroup>

            {/* About */}
            <p className="px-4 text-center text-[11px] text-tertiary">
              {t("settings.footer")}
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
