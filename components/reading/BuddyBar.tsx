"use client";

/**
 * BuddyBar — 悦读馆地图页的 Buddy 状态条：当前形态/魔力进度/进化入口。
 * 数据来自 GET /api/reading/profile（登录态）；魔力达到阈值后高亮「进化」，
 * 点击调 POST /api/reading/evolve 并触发进化仪式弹窗。
 */

import { useEffect, useState } from "react";
import { SparklesIcon } from "@/components/icons";

import { useI18n } from "@/lib/i18n";
import { isLoggedIn } from "@/lib/api";
import { evolveBuddy, getReadingProfile, type ReadingProfileState } from "@/lib/reading";
import { BUDDY_STAGES, type ReadingTrack } from "@/content/reading/types";

const NEXT_THRESHOLD: Record<number, number | null> = { 1: 100, 2: 500, 3: 1500, 4: null };

export function BuddyBar({ track, onEvolved }: { track: ReadingTrack; onEvolved?: (from: number, to: number) => void }) {
  const { t, locale } = useI18n();
  const [profile, setProfile] = useState<ReadingProfileState | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) return;
    void getReadingProfile().then(setProfile);
  }, []);

  const stages = BUDDY_STAGES[track];
  const stage = profile?.buddyStage ?? 1;
  const pending = (profile?.pendingStage ?? 0) > stage;
  const magic = profile?.magicPower ?? 0;
  const next = NEXT_THRESHOLD[stage];
  const pct = next ? Math.min(100, Math.round((magic / next) * 100)) : 100;
  const face = stages[stage - 1]?.emoji ?? "🥚";
  const name = locale === "zh" ? stages[stage - 1]?.cn : stages[stage - 1]?.en;

  const evolve = async () => {
    if (busy) return;
    setBusy(true);
    const from = stage;
    const nextProfile = await evolveBuddy();
    if (nextProfile) {
      setProfile(nextProfile);
      onEvolved?.(from, nextProfile.buddyStage);
    }
    setBusy(false);
  };

  return (
    <>
      <button type="button" className={`rq-buddy ${pending ? "rq-buddy--ready" : ""}`} onClick={() => pending && void evolve()} disabled={busy}>
        <span className="rq-buddy-face">{face}</span>
        <span style={{ flex: 1 }}>
          <span className="rq-buddy-name">
            {t("reading.buddy")} · {name}
            {pending && <span className="ph-pill ph-pill--gold inline-flex items-center gap-1" style={{ marginLeft: "0.5rem" }}><SparklesIcon size={12} /> {t("reading.buddyReady")}</span>}
          </span>
          <span className="rq-buddy-meta" style={{ display: "block", marginTop: "0.2rem" }}>
            {!profile
              ? isLoggedIn()
                ? "…"
                : t("reading.buddyOffline")
              : next
                ? `${t("reading.buddyMagic")} ${magic}/${next}`
                : `${t("reading.buddyMagic")} ${magic} · ${t("reading.buddyMax")}`}
          </span>
          <span className="rq-buddy-bar" style={{ display: "block", marginTop: "0.35rem" }}>
            <i style={{ width: `${pct}%` }} />
          </span>
        </span>
      </button>

      {pending && (
        <p className="mt-2 text-center text-xs font-bold" style={{ color: "var(--ph-ink-3)" }}>
          {t("reading.evolveDone")}
        </p>
      )}
    </>
  );
}
