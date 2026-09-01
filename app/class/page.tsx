"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import {
  getClasses, joinClass, leaveClass, getClassLeaderboard, isLoggedIn, getMe,
  getAssignments, getAssignment, wordlistQuiz, getMyOrgRanking,
  getNotifications, markNotificationsRead,
} from "@/lib/api";
import type { AssignmentRow, OrgRanking, AppNotification } from "@/lib/api";
import { adaptQuizPairs } from "@/lib/deeptutor";
import { useGameStore } from "@/lib/store";
import type { Question } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

/**
 * /class — V4 S1 thin client: students join a teacher's class by 6-digit
 * code, see their classes and a READ-ONLY leaderboard, and can leave.
 * All creation/management lives in lexi-teacher — no create UI here.
 * V4 S2: the assignments section lists the teacher's assignments; starting
 * one builds an in-memory temp quiz from the word-list snapshot (never
 * written into userDecks) and reports progress after the session.
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
  const { t, locale } = useI18n();
  const router = useRouter();
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [assignments, setAssignments] = useState<AssignmentRow[]>([]);
  const [orgRanking, setOrgRanking] = useState<OrgRanking | null>(null);
  const [reminders, setReminders] = useState<AppNotification[]>([]);
  const [startingId, setStartingId] = useState<number | null>(null);
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
      const [data, asg, org, notifs] = await Promise.all([
        getClasses(), getAssignments(), getMyOrgRanking().catch(() => null), getNotifications().catch(() => null),
      ]);
      setClasses(data.joined ?? []);
      setAssignments(asg.assignments ?? []);
      setOrgRanking(org?.org ? org : null);
      setReminders((notifs?.notifications ?? []).filter((n) => n.type === "assignment_reminder" && !n.readAt).slice(0, 2));
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

  // V4 S2 — start an assignment: temp in-memory quiz from the word-list
  // snapshot. Never saved to userDecks; progress reports after the session.
  const startAssignment = async (id: number) => {
    if (startingId) return;
    setStartingId(id);
    try {
      const detail = await getAssignment(id);
      if (!detail.words?.length) return;
      const { pairs } = await wordlistQuiz(detail.words.map((w) => w.word), detail.words.length);
      const adapted = adaptQuizPairs(pairs);
      if (!adapted.length) return;
      const storeQuestions: Question[] = adapted.map((q, i) => {
        const common = {
          id: q.id || `asg-${id}-${i}`,
          wordId: `asg-${id}-${i}`,
          type: "word-to-cn" as const,
          prompt: q.prompt,
          explanation: q.explanation,
        };
        if (q.type === "typed") {
          return { ...common, promptSub: t("class.typeAnswer"), choices: [q.answer ?? ""], correctIndex: 0, answer: q.answer };
        }
        return { ...common, promptSub: undefined, choices: q.options ?? ["True", "False"], correctIndex: q.answerIndex ?? 0 };
      });
      sessionStorage.setItem("lexi-import-quiz", JSON.stringify({ questions: storeQuestions }));
      useGameStore.setState({ activeAssignmentId: id });
      router.push("/quiz?src=import");
    } catch {
      // generation failed — stay on the list, user can retry
    } finally {
      setStartingId(null);
    }
  };

  // V6 N2 — dismiss a reminder (mark read) and jump into the assignment
  const goReminder = async (n: AppNotification) => {
    setReminders((prev) => prev.filter((r) => r.id !== n.id));
    try {
      await markNotificationsRead([n.id]);
    } catch {
      // V6 fix (codex review P2): restore the banner if the read-mark fails
      setReminders((prev) => [...prev, n]);
      return;
    }
    if (n.payload.assignmentId) await startAssignment(n.payload.assignmentId);
  };

  const statusChip = (a: AssignmentRow) => {
    const overdue = a.dueAt * 1000 < Date.now() && a.status !== "done";
    if (a.status === "done") return <span className="rounded-full bg-[var(--bg-positive-emphasis-default)] px-2 py-0.5 text-[10px] font-bold text-white">✓ {t("class.done")}</span>;
    if (overdue) return <span className="rounded-full bg-canvas px-2 py-0.5 text-[10px] font-bold text-tertiary">{t("class.overdue")}</span>;
    if (a.status === "in_progress") return <span className="rounded-full bg-brand-subtle px-2 py-0.5 text-[10px] font-bold text-brand-text">{t("class.inProgress")}</span>;
    return null;
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

        {/* Reminder banner (V6 N2) — teacher nudges, max 2 shown */}
        {reminders.map((n) => (
          <div key={n.id} className="mt-5 flex items-center gap-3 rounded-2xl border border-brandborder bg-brand-subtle px-4 py-3 shadow-sm">
            <span className="text-lg">🔔</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold text-primary">
                {t("reminder.banner").replace("{{teacher}}", n.payload.teacherName ?? "")}
              </span>
              <span className="block truncate text-xs text-secondary">
                {n.payload.title}{n.payload.dueAt ? ` · ${t("reminder.due")} ${new Date(n.payload.dueAt * 1000).toLocaleDateString()}` : ""}
              </span>
            </span>
            {n.payload.assignmentId && (
              <button
                onClick={() => goReminder(n)}
                className="shrink-0 rounded-pill bg-brand px-4 py-1.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90"
              >
                {t("reminder.go")}
              </button>
            )}
          </div>
        ))}

        {/* Org weekly ranking entry (V5 W3) — only when the class has an org */}
        {orgRanking?.org && (
          <button
            onClick={() => router.push("/org")}
            className="mt-6 flex w-full items-center gap-3 rounded-2xl border border-brandborder bg-brand-subtle p-5 text-left shadow-sm transition hover:opacity-95"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-base">🏆</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-extrabold text-primary">{t("org.leaderboard")} · {orgRanking.org.name}</span>
              <span className="block truncate text-xs text-secondary">
                {orgRanking.me
                  ? orgRanking.me.rankFrom === orgRanking.me.rankTo
                    ? `${t("org.rankExact")} #${orgRanking.me.rankFrom}`
                    : `${t("org.rankBucket")} ${orgRanking.me.rankFrom} - ${orgRanking.me.rankTo}`
                  : t("org.notOnBoard")}
              </span>
            </span>
            <span className="shrink-0 text-xs font-bold text-tertiary">▸</span>
          </button>
        )}

        {/* Assignments (V4 S2) */}
        {assignments.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 px-1 text-sm font-bold text-primary">{t("class.assignments")}</h2>
            <div className="flex flex-col gap-3">
              {assignments.map((a) => (
                <div key={a.id} className="g-card p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-bold text-primary">{a.title}</p>
                      <p className="mt-0.5 text-xs text-tertiary">
                        {a.className} · {a.wordCount} {t("class.wordCount")} · {t("class.due")} {new Date(a.dueAt * 1000).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}
                      </p>
                    </div>
                    {statusChip(a)}
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-pill bg-canvas">
                    <div
                      className={`h-full rounded-pill transition-all ${a.status === "done" ? "bg-[var(--bg-positive-emphasis-default)]" : "bg-brand"}`}
                      style={{ width: `${Math.min(100, Math.round((a.progress / Math.max(1, a.targetWords)) * 100))}%` }}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-tertiary">{a.progress} / {a.targetWords}</span>
                    <button
                      onClick={() => startAssignment(a.id)}
                      disabled={startingId === a.id}
                      className="rounded-pill bg-brand px-4 py-1.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
                    >
                      {startingId === a.id ? "…" : a.status === "done" ? t("class.practiceAgain") : t("class.start")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

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
