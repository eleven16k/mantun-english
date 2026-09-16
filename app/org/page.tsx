"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { AppShell } from "@/components/AppShell";
import { getMyOrgRanking, type OrgRanking } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

/**
 * /org — student view of the org weekly ranking (V5 W3). Privacy is fixed
 * server-side: Top 10 + the caller's own rank bucket, never a full roster.
 * Track tabs + past-week selector (from the settlement archive).
 */
export default function OrgRankingPage() {
  const { t } = useI18n();
  const [data, setData] = useState<OrgRanking | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [track, setTrack] = useState<string | undefined>(undefined);
  const [week, setWeek] = useState<string | undefined>(undefined);
  // V6 fix (codex review P2): a slow earlier track/week request must never
  // overwrite a newer selection's data.
  const loadSeqRef = useRef(0);

  const load = useCallback(async (trackQ?: string, weekQ?: string) => {
    const seq = ++loadSeqRef.current;
    try {
      const d = await getMyOrgRanking(trackQ, weekQ);
      if (loadSeqRef.current !== seq) return;
      setData(d);
      if (!trackQ && d.track) setTrack(d.track);
    } catch {
      if (loadSeqRef.current === seq) setData(null);
    } finally {
      if (loadSeqRef.current === seq) setLoaded(true);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const switchTrack = (next: string) => {
    setTrack(next);
    setWeek(undefined);
    load(next);
  };
  const switchWeek = (next?: string) => {
    setWeek(next);
    load(track, next);
  };

  const isThisWeek = !week;
  const tracks: { id: string; label: string }[] = [
    { id: "xiaoshengchu", label: t("org.trackXsc") },
    { id: "zhongkao", label: t("org.trackZk") },
    { id: "gaokao", label: t("org.trackGk") },
  ];

  return (
    <AppShell>
      <div className="page-shell">
        <PageHeader badge="🏢 ORGANIZATION" title={t("org.leaderboard")} />
        {data?.org && <p className="mb-4 text-sm text-tertiary">{data.org.name}</p>}

        {loaded && !data?.org && (
          <div className="g-card p-6 text-center">
            <p className="text-sm text-secondary">{t("org.none")}</p>
          </div>
        )}

        {data?.org && (
          <>
            {/* track tabs */}
            <div className="mb-4 flex gap-1 rounded-pill border-2 border-[var(--ink)] bg-surface p-1 shadow-[0_3px_0_0_rgba(0,0,0,0.1)]">
              {tracks.map((tr) => (
                <button
                  key={tr.id}
                  onClick={() => switchTrack(tr.id)}
                  className={`flex-1 rounded-pill py-2 text-sm font-bold transition ${
                    track === tr.id ? "bg-gold text-primary shadow-[0_2px_0_0_rgba(0,0,0,0.12)]" : "text-tertiary"
                  }`}
                >
                  {tr.label}
                </button>
              ))}
            </div>

            {/* week selector */}
            {data.pastWeeks.length > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => switchWeek(undefined)}
                  className={`rounded-pill px-3 py-1.5 text-xs font-bold transition ${!week ? "bg-brand text-white" : "border border-subtle text-secondary"}`}
                >
                  {t("org.thisWeek")}
                </button>
                {data.pastWeeks.map((w) => (
                  <button
                    key={w}
                    onClick={() => switchWeek(w)}
                    className={`rounded-pill px-3 py-1.5 text-xs font-bold transition ${week === w ? "bg-brand text-white" : "border border-subtle text-secondary"}`}
                  >
                    {w.slice(5)}
                  </button>
                ))}
              </div>
            )}

            {/* my bucket */}
            <div className="g-card-hero mb-4 p-5 text-center">
              {data.me ? (
                <p className="font-booster text-lg font-extrabold text-primary">
                  {isThisWeek ? t("org.youAre") : t("org.youWere")}
                  {" "}
                  {data.me.rankFrom === data.me.rankTo
                    ? `#${data.me.rankFrom}`
                    : `${data.me.rankFrom} - ${data.me.rankTo}`}
                  <span className="ml-2 text-sm font-bold text-brand-text">{data.me.weekSp} {t("class.sp")}</span>
                </p>
              ) : (
                <p className="text-sm font-bold text-secondary">{t("org.notOnBoard")}</p>
              )}
            </div>

            {/* top10 */}
            <div className="g-card p-5">
              <h2 className="mb-3 text-sm font-bold text-primary">{t("org.top10")}</h2>
              {data.top10.length === 0 ? (
                <p className="py-3 text-center text-xs text-tertiary">{t("org.empty")}</p>
              ) : (
                data.top10.map((r) => (
                  <div key={r.rank} className="flex items-center gap-3 border-b border-subtle py-2.5 last:border-0">
                    <span className={`grid w-7 place-items-center font-booster text-sm ${r.rank <= 3 ? "text-gold" : "text-tertiary"}`}>
                      {r.rank}
                    </span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-xs font-extrabold text-white">
                      {r.nickname.slice(0, 1)}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-bold text-primary">{r.nickname}</span>
                    <span className="shrink-0 text-sm font-booster font-extrabold text-brand-text">{r.weekSp} {t("class.sp")}</span>
                  </div>
                ))
              )}
            </div>
            <p className="mt-3 text-center text-[11px] text-tertiary">{t("org.privacyNote")}</p>
          </>
        )}
      </div>
    </AppShell>
  );
}
