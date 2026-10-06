"use client";

import { useEffect, useState } from "react";
import { CheckIcon } from "@/components/icons";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { useGameStore } from "@/lib/store";
import { useI18n, LOCALES } from "@/lib/i18n";
import { getMe, getClasses, updateProfile, logout, isLoggedIn, getParentLinks, LOGIN_URL } from "@/lib/api";
import { getProfile, setProfile } from "@/lib/plan";
import { maskPhone } from "@/lib/maskPhone";
import { STAGES, savedStage, saveStage, stageDef, isStage } from "@/lib/stage";
import { hydrateVocabFromLexicon } from "@/lib/vocab";

/** 学段角色（7 选，label 复用 onboarding 卡文案键；改角色=重挂题库+换轨） */
const STAGE_OPTIONS = STAGES;

function trackLabel(t: (k: "onb.trackXiaoshengchu" | "onb.trackZhongkao" | "onb.trackGaokao") => string, id: string | null | undefined) {
  if (id === "gaokao") return t("onb.trackGaokao");
  if (id === "xiaoshengchu") return t("onb.trackXiaoshengchu");
  if (id === "zhongkao") return t("onb.trackZhongkao");
  return null;
}

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
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_0_0_rgba(0,0,0,0.12)] transition-all duration-200 ${
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
      {/* g-card 容器（4px 纸边 + 2rem 圆角，静默不加 hover）；行分隔保留弱分割线 */}
      <div className="g-card g-card--static mt-1.5 divide-y divide-[var(--border-subtle)] overflow-hidden p-0">
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
              locale === l.value ? "bg-gold text-primary shadow-[0_2px_0_0_rgba(0,0,0,0.12)]" : "text-tertiary hover:text-secondary"
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
  const { coins, scorePoints, streak, isMember, membershipExpiresAt } = useGameStore();
  const { t } = useI18n();

  // Preferences persist in localStorage and survive reloads.
  // Dark mode was retired (product decision: fixed cream light theme) —
  // a leftover `darkMode` key in saved lexi-settings is simply ignored.
  const [focusMode, setFocusMode] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [hapticOn, setHapticOn] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifStreak, setNotifStreak] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Account (C2-Δ): real phone (masked) + editable nickname. No fake
  // email/password rows; no role row (roles live in the other two apps).
  const [accountPhone, setAccountPhone] = useState<string | null>(null);
  const [accountNickname, setAccountNickname] = useState<string>("");
  const [editingNickname, setEditingNickname] = useState(false);
  const [nicknameDraft, setNicknameDraft] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [pendingBindings, setPendingBindings] = useState(0);

  // 联系邮箱（会员开通申请走这个邮箱，管理员按它对账）
  const [accountEmail, setAccountEmail] = useState<string>("");
  const [editingEmail, setEditingEmail] = useState(false);
  const [emailDraft, setEmailDraft] = useState("");
  const [emailStatus, setEmailStatus] = useState<"saved" | "error" | "taken" | null>(null);

  // 学段（升学机制）：显示当前 track；入班且班级声明学段时只读（班级 = 权威源）
  const [userTrack, setUserTrack] = useState<string | null>(null);
  const [classTrack, setClassTrack] = useState<string | null>(null);
  const [trackModal, setTrackModal] = useState(false);

  const prefs = { focusMode, soundOn, hapticOn, notifPush, notifStreak };

  useEffect(() => {
    setMounted(true);
    if (isLoggedIn()) {
      getMe()
        .then((d) => {
          setAccountPhone(d.user.phone ?? null);
          setAccountNickname(d.user.nickname ?? "");
          setUserTrack(d.user.track ?? null);
          setAccountEmail(d.user.email ?? "");
          // Family red-dot (V4 S3): pending parent-binding requests count
          getParentLinks()
            .then((links) => setPendingBindings((links.links ?? []).filter((l) => l.status === "pending").length))
            .catch(() => {});
        })
        .catch(() => {});
      // 已加入的班级里若有声明学段的，该学段锁定本行（机构场景班级为权威源）
      getClasses()
        .then((d) => {
          const locked = (d.joined ?? []).find((c) => c.track);
          if (locked?.track) setClassTrack(locked.track);
        })
        .catch(() => {});
    }
    try {
      const saved = JSON.parse(localStorage.getItem("lexi-settings") || "{}");
      if (typeof saved.focusMode === "boolean") setFocusMode(saved.focusMode);
      if (typeof saved.soundOn === "boolean") setSoundOn(saved.soundOn);
      if (typeof saved.hapticOn === "boolean") setHapticOn(saved.hapticOn);
      if (typeof saved.notifPush === "boolean") setNotifPush(saved.notifPush);
      if (typeof saved.notifStreak === "boolean") setNotifStreak(saved.notifStreak);
    } catch { /* fresh start */ }
  }, []);

  // Save on every change
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("lexi-settings", JSON.stringify(prefs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusMode, soundOn, hapticOn, notifPush, notifStreak, mounted]);

  // Nickname edit — client validation mirrors the server rule (1..16 chars)
  const saveNickname = async () => {
    const next = nicknameDraft.trim();
    if (next.length < 1 || next.length > 16) {
      setNicknameError(t("settings.nickname"));
      return;
    }
    try {
      await updateProfile({ nickname: next });
      setAccountNickname(next);
      setEditingNickname(false);
      setNicknameError("");
    } catch {
      setNicknameError(t("settings.nicknameSave"));
    }
  };

  // Real sign-out (C2-Δ): clear token + in-progress answer state, land /auth
  const signOut = () => {
    logout();
    useGameStore.setState({ questions: [], currentQIndex: 0, selectedAnswer: null, showFeedback: false });
    window.location.assign(LOGIN_URL);
  };

  // 邮箱绑定——客户端与服务端同一格式规则；409 = 已被其他账号占用
  const saveEmail = async () => {
    const next = emailDraft.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next)) {
      setEmailStatus("error");
      return;
    }
    try {
      await updateProfile({ email: next });
      setAccountEmail(next);
      setEditingEmail(false);
      setEmailStatus("saved");
    } catch (e) {
      setEmailStatus(e instanceof Error && e.message === "email_taken" ? "taken" : "error");
    }
  };

  return (
    <AppShell>
      <div className="page-shell">
        <h1 className="px-2 pt-1 font-booster text-[26px] font-extrabold leading-[32px] text-primary mb-5">{t("settings.title")}</h1>

        {(
          <div className="flex flex-col gap-5">
            {/* Account — real phone (masked) + editable nickname; no fake email/password, no role row */}
            <SettingGroup title={t("settings.account")}>
              <LinkRow label={t("settings.phone")} value={accountPhone ? maskPhone(accountPhone) : t("settings.notLoggedIn")} />
              {editingNickname ? (
                <div className="px-4 py-3.5">
                  <p className="text-[15px] font-medium text-primary">{t("settings.nickname")}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      value={nicknameDraft}
                      onChange={(e) => setNicknameDraft(e.target.value)}
                      maxLength={16}
                      autoFocus
                      className="min-w-0 flex-1 rounded-xl border border-subtle bg-app px-3 py-2 text-sm outline-none focus:border-brandborder"
                    />
                    <button
                      onClick={saveNickname}
                      disabled={nicknameDraft.trim().length < 1 || nicknameDraft.trim().length > 16}
                      className="rounded-pill bg-brand px-4 py-2 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-40"
                    >
                      {t("settings.nicknameSave")}
                    </button>
                    <button
                      onClick={() => { setEditingNickname(false); setNicknameError(""); }}
                      className="rounded-pill border border-subtle px-4 py-2 text-xs font-bold text-secondary"
                    >
                      {t("settings.nicknameCancel")}
                    </button>
                  </div>
                </div>
              ) : (
                <LinkRow
                  label={t("settings.nickname")}
                  value={accountNickname || t("settings.notLoggedIn")}
                  onClick={() => { setNicknameDraft(accountNickname); setEditingNickname(true); }}
                />
              )}
            </SettingGroup>

            {/* Family (V4 S3) — pending parent-binding requests surface here */}
            <SettingGroup title={t("settings.family")}>
              <LinkRow
                label={t("family.title")}
                value={pendingBindings > 0 ? `${pendingBindings} ${t("family.pendingSuffix")}` : undefined}
                onClick={() => router.push("/family")}
              />
            </SettingGroup>

            {/* Appearance */}
            <SettingGroup title={t("settings.appearance")}>
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
                value={
                  isMember
                    ? membershipExpiresAt && (membershipExpiresAt * 1000 - Date.now()) / 86400000 <= 7
                      ? `${t("settings.memberActive")} · ${Math.max(0, Math.ceil((membershipExpiresAt * 1000 - Date.now()) / 86400000))}d`
                      : t("settings.memberActive")
                    : t("settings.upgrade")
                }
                onClick={() => router.push("/pricing")}
              />
              {editingEmail ? (
                <div className="px-4 py-3.5">
                  <p className="text-[15px] font-medium text-primary">{t("settings.email")}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="email"
                      value={emailDraft}
                      onChange={(e) => { setEmailDraft(e.target.value); setEmailStatus(null); }}
                      maxLength={254}
                      autoFocus
                      className="min-w-0 flex-1 rounded-xl border border-subtle bg-app px-3 py-2 text-sm outline-none focus:border-brandborder"
                    />
                    <button
                      onClick={saveEmail}
                      disabled={!emailDraft.trim()}
                      className="rounded-pill bg-brand px-4 py-2 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-40"
                    >
                      {t("settings.emailSave")}
                    </button>
                    <button
                      onClick={() => { setEditingEmail(false); setEmailStatus(null); }}
                      className="rounded-pill border border-subtle px-4 py-2 text-xs font-bold text-secondary"
                    >
                      {t("settings.nicknameCancel")}
                    </button>
                  </div>
                  {emailStatus && (
                    <p className={`mt-2 text-xs font-bold ${emailStatus === "saved" ? "text-positive" : "text-critical"}`}>
                      {t(emailStatus === "saved" ? "settings.emailSaved" : emailStatus === "taken" ? "settings.emailTaken" : "settings.emailFail")}
                    </p>
                  )}
                </div>
              ) : (
                <LinkRow
                  label={t("settings.email")}
                  value={accountEmail || "—"}
                  onClick={isLoggedIn() ? () => { setEmailDraft(accountEmail); setEditingEmail(true); } : undefined}
                />
              )}
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
              <LinkRow
                label={t("settings.track")}
                value={classTrack
                  ? `${trackLabel(t, classTrack) ?? classTrack} · ${t("settings.trackLocked")}`
                  : (isStage(savedStage()) ? t(stageDef(savedStage()).nameKey as "onb.stageJunior") : null)
                    ?? trackLabel(t, userTrack) ?? trackLabel(t, getProfile()?.track) ?? "—"}
                onClick={() => { if (!classTrack) setTrackModal(true); }}
              />
              <LinkRow label={t("settings.dailyGoal")} value={t("settings.dailyGoalValue")} />
              <LinkRow label={t("settings.difficulty")} value={t("settings.difficultyValue")} />
            </SettingGroup>

            {/* Sign out — real logout: clears token + answer state, lands /auth */}
            <SettingGroup title="">
              <LinkRow
                label={t("settings.signOut")}
                destructive
                onClick={signOut}
              />
            </SettingGroup>

            {/* About */}
            <p className="px-4 text-center text-[11px] text-tertiary">
              {t("settings.footer")}
            </p>
          </div>
        )}

        {/* 学段切换：确认 → 服务端 PATCH + 本地档案同步 → 定级测试（完成后落悦读馆新轨） */}
        {trackModal && (
          <div className="game-overlay fixed inset-0 z-50 flex items-center justify-center p-6" onClick={() => setTrackModal(false)}>
            <div className="game-modal w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-booster text-lg font-extrabold text-primary">{t("settings.track")}</h3>
              <p className="mt-1 text-xs text-tertiary">{t("settings.trackNote")}</p>
              <div className="mt-4 flex flex-col gap-2">
                {STAGE_OPTIONS.map((opt) => {
                  const current = savedStage() === opt.id && !classTrack;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={async () => {
                        setTrackModal(false);
                        if (current) return;
                        // 角色保存：本地 stage + 词库重挂 + track 联动；服务端 best-effort
                        saveStage(opt.id);
                        void hydrateVocabFromLexicon({ tags: opt.quizTags, difficulties: opt.quizDifficulties });
                        const p = getProfile();
                        setProfile({
                          track: opt.track,
                          targetScore: p?.targetScore ?? 0,
                          examDate: p?.examDate ?? "",
                          estimatedScore: p?.estimatedScore,
                        });
                        updateProfile({ stage: opt.id }).catch(() => {});
                        router.push(`/onboarding?step=goal&track=${opt.track}&next=/reading`);
                      }}
                      className={`g-card flex items-center justify-between p-4 text-left ${current ? "!border-[var(--ink)] bg-brand-subtle" : ""}`}
                    >
                      <span>
                        <span className="block font-booster text-base font-extrabold text-primary">
                          {t(opt.nameKey as "onb.stageJunior")}
                        </span>
                        <span className="block text-xs text-tertiary">
                          {t(opt.countKey as "onb.stageJuniorCount")}
                        </span>
                      </span>
                      {current && <span className="text-xs font-bold text-brand-text"><CheckIcon size={13} /></span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
