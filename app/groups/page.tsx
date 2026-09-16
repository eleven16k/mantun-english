"use client";

import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import {
  getMyGroups,
  getGroupLeaderboard,
  createGroup,
  joinGroup,
  leaveGroup,
  type GroupInfo,
} from "@/lib/api";
import { useI18n } from "@/lib/i18n";

/**
 * /groups — Study groups: student-initiated squads (3-6 people).
 * Server-backed: create → 6-digit invite code, join by code, real member
 * leaderboards from the users/economy tables. Group PK reuses /pk.
 */
interface Member {
  id: number;
  nickname: string;
  score_points: number | null;
  streak: number | null;
}

export default function GroupsPage() {
  const router = useRouter();
  const { t } = useI18n();

  const [groups, setGroups] = useState<GroupInfo[] | null>(null);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [joinError, setJoinError] = useState("");

  const refresh = useCallback(async () => {
    try {
      const data = await getMyGroups();
      setGroups(data.groups);
      setError("");
    } catch {
      setError(t("group.loadFail"));
    }
  }, [t]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = async () => {
    if (!name.trim()) return;
    try {
      await createGroup(name);
      setShowCreate(false);
      setName("");
      await refresh();
    } catch {
      setError(t("group.loadFail"));
    }
  };

  const join = async () => {
    if (joinCode.length !== 6) return;
    setJoinError("");
    try {
      await joinGroup(joinCode);
      setJoinCode("");
      await refresh();
    } catch {
      setJoinError(t("group.invalidCode"));
    }
  };

  const leave = async (code: string) => {
    try {
      await leaveGroup(code);
      await refresh();
    } catch {
      setError(t("group.loadFail"));
    }
  };

  return (
    <AppShell>
      <div className="page-shell">
        <PageHeader badge="👥 GROUPS" title={t("group.title")} />
        <p className="mb-5 text-sm text-tertiary">{t("group.intro")}</p>

        {error && <p className="mb-4 text-center text-xs font-bold text-critical">{error}</p>}

        {/* My groups */}
        {groups === null ? (
          <div className="g-card p-8 text-center">
            <svg viewBox="0 0 24 24" className="mx-auto h-6 w-6 animate-spin text-brand-text" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        ) : groups.length === 0 ? (
          <div className="g-card p-8 text-center">
            <p className="text-sm text-tertiary">{t("group.empty")}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {groups.map((g) => (
              <GroupCard key={g.code} group={g} onLeave={() => leave(g.code)} onPk={() => router.push("/pk")} />
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-2.5">
          <button
            onClick={() => setShowCreate(true)}
            className="rounded-pill bg-brand py-3.5 font-booster text-base font-extrabold text-white transition hover:opacity-90 active:scale-[0.98]"
          >
            {t("group.createBtn")}
          </button>
          <div className="flex gap-2">
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder={t("group.codePh")}
              inputMode="numeric"
              className="flex-1 rounded-pill border border-subtle bg-app px-4 py-2.5 text-center text-base font-bold tracking-widest outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-tertiary focus:border-brandborder"
            />
            <button
              onClick={join}
              disabled={joinCode.length !== 6}
              className="rounded-pill border border-subtle bg-surface px-5 py-2.5 text-sm font-bold text-secondary transition hover:border-brandborder disabled:opacity-40"
            >
              {t("group.joinBtn")}
            </button>
          </div>
          {joinError && <p className="text-center text-xs font-bold text-critical">{joinError}</p>}
        </div>
      </div>

      {/* Create dialog */}
      {showCreate && (
        <div className="game-overlay fixed inset-0 z-50 flex items-center justify-center p-6" onClick={() => setShowCreate(false)}>
          <div className="game-modal w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-booster text-lg font-extrabold text-primary">{t("group.createTitle")}</h2>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && create()}
              placeholder={t("group.namePh")}
              className="mt-3 w-full rounded-xl border border-subtle bg-app px-3 py-2.5 text-sm text-primary outline-none placeholder:text-tertiary focus:border-brandborder"
            />
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowCreate(false)}
                className="flex-1 rounded-pill border border-subtle py-2.5 text-sm font-bold text-secondary transition hover:bg-canvas"
              >
                {t("group.cancel")}
              </button>
              <button
                onClick={create}
                disabled={!name.trim()}
                className="flex-1 rounded-pill bg-brand py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-40"
              >
                {t("group.createConfirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function GroupCard({
  group,
  onLeave,
  onPk,
}: {
  group: GroupInfo;
  onLeave: () => void;
  onPk: () => void;
}) {
  const { t } = useI18n();
  const [members, setMembers] = useState<Member[] | null>(null);

  useEffect(() => {
    let alive = true;
    getGroupLeaderboard(group.code)
      .then((d) => { if (alive) setMembers(d.members); })
      .catch(() => { if (alive) setMembers([]); });
    return () => { alive = false; };
  }, [group.code]);

  return (
    <div className="g-card p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-subtle text-brand-text">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-booster text-base font-extrabold text-primary">{group.name}</p>
          <p className="text-xs text-tertiary">{t("group.codeLabel")}: {group.code}</p>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => navigator.clipboard?.writeText(group.code)}
            className="rounded-pill border border-subtle px-3 py-1.5 text-xs font-bold text-secondary transition hover:border-brandborder"
          >
            {t("group.copyCode")}
          </button>
          <button
            onClick={onLeave}
            aria-label={t("group.leave")}
            className="grid h-8 w-8 place-items-center rounded-full text-tertiary transition hover:bg-canvas hover:text-critical"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Real member leaderboard from the server */}
      {members === null ? (
        <p className="mt-4 text-center text-xs text-tertiary">{t("group.loadingMembers")}</p>
      ) : members.length === 0 ? (
        <p className="mt-4 text-center text-xs text-tertiary">{t("group.noMembers")}</p>
      ) : (
        <div className="mt-4 divide-y divide-[var(--border-subtle)]">
          {members.map((m, i) => (
            <div key={m.id} className="flex items-center gap-3 py-2.5">
              <span className="grid w-5 place-items-center font-booster text-xs text-tertiary">{i + 1}</span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-canvas text-[11px] font-extrabold text-secondary">
                {m.nickname[0]}
              </span>
              <span className="flex-1 truncate text-sm font-bold text-primary">{m.nickname}</span>
              <span className="text-xs text-tertiary">🔥 {m.streak ?? 0}{t("group.day")}</span>
              <span className="font-booster text-sm font-extrabold text-brand-text">{m.score_points ?? 0} {t("group.sp")}</span>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onPk}
        className="mt-3 w-full rounded-pill bg-action py-2.5 text-sm font-bold text-white transition hover:bg-actionhover active:scale-[0.98]"
      >
        {t("group.startPk")}
      </button>
    </div>
  );
}
