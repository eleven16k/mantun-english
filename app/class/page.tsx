"use client";

import { useCallback, useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { getClasses, joinClass, leaveClass, getClassLeaderboard, isLoggedIn, getMe } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

/**
 * /class — V4 S1 thin client: students join a teacher's class by 6-digit
 * code, see their classes and a READ-ONLY leaderboard, and can leave.
 * All creation/management lives in lexi-teacher — no create UI here.
 */

interface ClassRow {
  code: string;
  name: string;
  member_count?: number;
  teacher_name?: string;
}

interface LeaderMember {
  id: number;
  nickname: string;
  score_points: number;
  streak: number;
}

export default function ClassPage() {
  const { t } = useI18n();
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [myId, setMyId] = useState<number | null>(null);
  const [joinCode, setJoinCode] = useState("");
  const [joinError, setJoinError] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Expanded class + its leaderboard (fetched lazily, read-only)
  const [openCode, setOpenCode] = useState<string | null>(null);
  const [leaders, setLeaders] = useState<LeaderMember[]>([]);
  const [lbLoading, setLbLoading] = useState(false);

  // Two-step leave confirm per class code
  const [confirmCode, setConfirmCode] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!isLoggedIn()) {
      setLoaded(true);
      return;
    }
    try {
      const data = await getClasses();
      setClasses(data.joined ?? []);
    } catch {
      // offline / not logged in — thin client degrades to empty state
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    refresh();
    getMe()
      .then((d) => setMyId(d.user.id))
      .catch(() => {});
  }, [refresh]);

  const handleJoin = async () => {
    if (joinCode.length !== 6) return;
    setJoinError("");
    try {
      await joinClass(joinCode);
      setJoinCode("");
      await refresh();
    } catch (e) {
      setJoinError(e instanceof Error && e.message.includes("class_not_found") ? t("class.invalidCode") : t("class.invalidCode"));
    }
  };

  const toggleOpen = async (code: string) => {
    if (openCode === code) {
      setOpenCode(null);
      return;
    }
    setOpenCode(code);
    setLbLoading(true);
    setLeaders([]);
    try {
      const lb = await getClassLeaderboard(code);
      setLeaders(lb.members ?? []);
    } catch {
      setLeaders([]);
    } finally {
      setLbLoading(false);
    }
  };

  const handleLeave = async (code: string) => {
    setConfirmCode(null);
    try {
      await leaveClass(code);
      if (openCode === code) setOpenCode(null);
      await refresh();
    } catch {
      // leave failed — list refresh shows the truth
    }
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[768px] px-6 pt-[84px] pb-6">
        <h1 className="pt-1 font-booster text-[26px] font-extrabold leading-[32px] text-primary mb-5">{t("class.title")}</h1>

        {/* Join card */}
        <div className="g-card p-5 shadow-sm">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-tertiary">{t("class.codeLabel")}</span>
            <input
              value={joinCode}
              onChange={e => { setJoinCode(e.target.value.replace(/\D/g, "").slice(0, 6)); setJoinError(""); }}
              placeholder={t("class.codePh")}
              inputMode="numeric"
              className="rounded-xl border border-subtle bg-app px-3 py-2.5 text-center text-lg font-bold tracking-widest outline-none focus:border-brandborder"
            />
          </label>
          {joinError && <p className="mt-2 text-center text-xs font-bold text-critical">{joinError}</p>}
          <button
            disabled={joinCode.length !== 6}
            onClick={handleJoin}
            className="mt-4 w-full rounded-pill bg-brand py-3 font-booster font-extrabold text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
          >
            {t("class.join")}
          </button>
          <p className="mt-3 text-center text-xs text-tertiary">{t("class.joinHint")}</p>
        </div>

        {/* My classes */}
        <h2 className="mb-3 mt-6 px-1 text-sm font-bold text-primary">{t("class.myClasses")}</h2>
        {loaded && classes.length === 0 && (
          <div className="g-card p-6 text-center shadow-sm">
            <p className="text-sm text-secondary">{t("class.empty")}</p>
          </div>
        )}
        <div className="flex flex-col gap-3">
          {classes.map((c) => (
            <div key={c.code} className="g-card overflow-hidden shadow-sm">
              <button
                onClick={() => toggleOpen(c.code)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-canvas"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-sm font-extrabold text-white">
                  {c.name.slice(0, 1)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-bold text-primary">{c.name}</span>
                  <span className="block truncate text-xs text-tertiary">
                    {c.teacher_name ? `${t("class.teacher")} · ${c.teacher_name}` : ""}
                    {typeof c.member_count === "number" ? ` · ${c.member_count} ${t("class.members")}` : ""}
                  </span>
                </span>
                <span className="shrink-0 text-xs font-bold text-tertiary">{openCode === c.code ? "▾" : "▸"}</span>
              </button>

              {openCode === c.code && (
                <div className="border-t border-subtle px-5 pb-4 pt-2">
                  {lbLoading ? (
                    <p className="py-3 text-center text-xs text-tertiary">…</p>
                  ) : leaders.length === 0 ? (
                    <p className="py-3 text-center text-xs text-tertiary">{t("class.empty")}</p>
                  ) : (
                    [...leaders].map((m, i) => (
                      <div
                        key={m.id}
                        className={`flex items-center gap-3 border-b border-subtle py-2.5 last:border-0 ${m.id === myId ? "rounded-lg bg-brand-subtle px-2" : ""}`}
                      >
                        <span className="grid w-6 place-items-center font-booster text-sm text-tertiary">{i + 1}</span>
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-xs font-extrabold text-white">{m.nickname[0]}</span>
                        <span className="min-w-0 flex-1 truncate text-sm font-bold text-primary">{m.nickname}</span>
                        <span className="shrink-0 text-xs text-tertiary">🔥 {m.streak}{t("class.day")}</span>
                        <span className="shrink-0 text-sm font-booster font-extrabold text-brand-text">{m.score_points} {t("class.sp")}</span>
                      </div>
                    ))
                  )}

                  {/* Leave — two-step inline confirm */}
                  {confirmCode === c.code ? (
                    <div className="mt-3 flex items-center justify-end gap-2">
                      <span className="mr-auto text-xs font-bold text-critical">{t("class.leaveConfirmTitle")}</span>
                      <button
                        onClick={() => setConfirmCode(null)}
                        className="rounded-pill border border-subtle px-3 py-1.5 text-xs font-bold text-secondary"
                      >
                        {t("class.cancel")}
                      </button>
                      <button
                        onClick={() => handleLeave(c.code)}
                        className="rounded-pill bg-[var(--bg-critical-emphasis-default)] px-3 py-1.5 text-xs font-bold text-white"
                      >
                        {t("class.confirmLeave")}
                      </button>
                    </div>
                  ) : (
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => setConfirmCode(c.code)}
                        className="rounded-pill border border-subtle px-4 py-1.5 text-xs font-bold text-critical transition hover:border-[var(--border-critical-emphasis-default)]"
                      >
                        {t("class.leave")}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
