"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { createClass, joinClass, getClassLeaderboard } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

/**
 * /class — H1: Teacher creates class with 6-digit code; students join.
 * MVP: local-only class management.
 */

interface ClassMember {
  name: string;
  sp: number;
  streak: number;
}

interface ClassInfo {
  code: string;
  name: string;
  members: ClassMember[];
}

export default function ClassPage() {
  const { t } = useI18n();
  const [mode, setMode] = useState<"teacher" | "student">("teacher");
  const [className, setClassName] = useState("");
  const [created, setCreated] = useState<ClassInfo | null>(null);
  const [joinCode, setJoinCode] = useState("");

  const handleCreateClass = async () => {
    if (!className.trim()) return;
    try {
      const result = await createClass(className.trim());
      setCreated({ code: result.code, name: result.name, members: [] });
      // Load leaderboard
      const lb = await getClassLeaderboard(result.code);
      setCreated(prev => prev ? { ...prev, members: lb.members.map((m: { nickname: string; score_points: number; streak: number }) => ({ name: m.nickname, sp: m.score_points, streak: m.streak })) } : prev);
    } catch (e) {
      console.error("Failed to create class:", e);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[768px] px-6 pt-[84px] pb-6">
        <h1 className="pt-1 font-booster text-[26px] font-extrabold leading-[32px] text-primary mb-5">{t("class.title")}</h1>

        {/* Mode switch */}
        <div className="mb-5 flex rounded-pill border border-subtle bg-surface p-1">
          {(["teacher", "student"] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-pill py-2 text-sm font-bold capitalize transition ${
                mode === m ? "bg-action text-white" : "text-tertiary"
              }`}
            >
              {m === "teacher" ? t("class.create") : t("class.join")}
            </button>
          ))}
        </div>

        {mode === "teacher" && !created && (
          <div className="g-card p-5 shadow-sm">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-tertiary">{t("class.nameLabel")}</span>
              <input
                value={className}
                onChange={e => setClassName(e.target.value)}
                placeholder={t("class.namePh")}
                className="rounded-xl border border-subtle bg-app px-3 py-2.5 text-sm outline-none focus:border-brandborder"
              />
            </label>
            <button
              onClick={handleCreateClass}
              disabled={!className.trim()}
              className="mt-4 w-full rounded-pill bg-brand py-3 font-booster font-extrabold text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
            >
              {t("class.createGetCode")}
            </button>
          </div>
        )}

        {mode === "teacher" && created && (
          <>
            <div className="g-card-hero p-6 text-center shadow-sm">
              <p className="text-xs font-bold uppercase text-tertiary">{t("class.codeLabel")}</p>
              <p className="mt-2 font-booster text-5xl font-extrabold tracking-[0.2em] text-primary">{created.code}</p>
              <p className="mt-2 text-sm text-tertiary">{t("class.shareHint")}</p>
              <button
                onClick={() => navigator.clipboard?.writeText(created.code)}
                className="mt-3 rounded-pill border border-subtle px-4 py-1.5 text-xs font-bold text-secondary transition hover:border-brandborder"
              >
                {t("class.copyCode")}
              </button>
            </div>
            <div className="mt-5 g-card p-5 shadow-sm">
              <h2 className="mb-3 text-sm font-bold text-primary">{t("class.members")} ({created.members.length})</h2>
              {[...created.members].map((m, i) => (
                <div key={m.name} className="flex items-center gap-3 border-b border-subtle py-3 last:border-0">
                  <span className="grid w-6 place-items-center font-booster text-sm text-tertiary">{i + 1}</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-xs font-extrabold text-white">{m.name[0]}</span>
                  <span className="flex-1 text-sm font-bold text-primary">{m.name}</span>
                  <span className="text-xs text-tertiary">🔥 {m.streak}{t("class.day")}</span>
                  <span className="text-sm font-booster font-extrabold text-brand-text">{m.sp} {t("class.sp")}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {mode === "student" && (
          <div className="g-card p-5 shadow-sm">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-tertiary">{t("class.codeLabel")}</span>
              <input
                value={joinCode}
                onChange={e => setJoinCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder={t("class.codePh")}
                inputMode="numeric"
                className="rounded-xl border border-subtle bg-app px-3 py-2.5 text-center text-lg font-bold tracking-widest outline-none focus:border-brandborder"
              />
            </label>
            <button
              disabled={joinCode.length !== 6}
              onClick={async () => {
                try {
                  await joinClass(joinCode);
                  // Show success then redirect
                } catch (e) {
                  console.error("Join failed:", e);
                }
              }}
              className="mt-4 w-full rounded-pill bg-brand py-3 font-booster font-extrabold text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
            >
              {t("class.join")}
            </button>
            <p className="mt-3 text-center text-xs text-tertiary">{t("class.joinHint")}</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
