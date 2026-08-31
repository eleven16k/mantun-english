"use client";

import { useCallback, useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { getParentLinks, actOnParentLink, isLoggedIn, type ParentLink } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

/**
 * /family — V4 S3: the student side of parent binding. Accept or reject
 * pending requests, unbind active ones. All backend rules (cooldown, limits)
 * live in the B1 contract — this page is a pure consumer.
 */
export default function FamilyPage() {
  const { t } = useI18n();
  const [links, setLinks] = useState<ParentLink[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [confirmPeer, setConfirmPeer] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    if (!isLoggedIn()) {
      setLoaded(true);
      return;
    }
    try {
      const data = await getParentLinks();
      setLinks(data.links ?? []);
    } catch {
      // degrade to empty state
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const act = async (peerId: number, action: "accept" | "reject" | "remove") => {
    setConfirmPeer(null);
    try {
      await actOnParentLink(peerId, action);
      await refresh();
    } catch {
      // refresh shows the truth
    }
  };

  const pending = links.filter((l) => l.status === "pending");
  const active = links.filter((l) => l.status === "active");

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[768px] px-6 pt-[84px] pb-6">
        <h1 className="pt-1 font-booster text-[26px] font-extrabold leading-[32px] text-primary mb-5">{t("family.title")}</h1>

        {loaded && pending.length === 0 && active.length === 0 && (
          <div className="g-card p-6 text-center shadow-sm">
            <p className="text-sm text-secondary">{t("family.empty")}</p>
          </div>
        )}

        {pending.length > 0 && (
          <>
            <h2 className="mb-3 px-1 text-sm font-bold text-primary">{t("family.requests")}</h2>
            <div className="mb-6 flex flex-col gap-3">
              {pending.map((l) => (
                <div key={l.peerId} className="g-card flex items-center gap-3 p-4 shadow-sm">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-sm font-extrabold text-white">
                    {l.nickname.slice(0, 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-bold text-primary">{l.nickname}</p>
                    <p className="text-xs text-tertiary">{l.maskedPhone}</p>
                  </div>
                  <button
                    onClick={() => act(l.peerId, "reject")}
                    className="rounded-pill border border-subtle px-3 py-1.5 text-xs font-bold text-secondary transition hover:border-brandborder"
                  >
                    {t("family.reject")}
                  </button>
                  <button
                    onClick={() => act(l.peerId, "accept")}
                    className="rounded-pill bg-brand px-4 py-1.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90"
                  >
                    {t("family.accept")}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {active.length > 0 && (
          <>
            <h2 className="mb-3 px-1 text-sm font-bold text-primary">{t("family.bound")}</h2>
            <div className="flex flex-col gap-3">
              {active.map((l) => (
                <div key={l.peerId} className="g-card p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-sm font-extrabold text-white">
                      {l.nickname.slice(0, 1)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-bold text-primary">{l.nickname}</p>
                      <p className="text-xs text-tertiary">{l.maskedPhone}</p>
                    </div>
                    {confirmPeer === l.peerId ? (
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          onClick={() => setConfirmPeer(null)}
                          className="rounded-pill border border-subtle px-3 py-1.5 text-xs font-bold text-secondary"
                        >
                          {t("class.cancel")}
                        </button>
                        <button
                          onClick={() => act(l.peerId, "remove")}
                          className="rounded-pill bg-[var(--bg-critical-emphasis-default)] px-3 py-1.5 text-xs font-bold text-white"
                        >
                          {t("family.confirmRemove")}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmPeer(l.peerId)}
                        className="shrink-0 rounded-pill border border-subtle px-4 py-1.5 text-xs font-bold text-critical transition hover:border-[var(--border-critical-emphasis-default)]"
                      >
                        {t("family.remove")}
                      </button>
                    )}
                  </div>
                  {confirmPeer === l.peerId && (
                    <p className="mt-2 text-right text-xs text-critical">{t("family.removeConfirmTitle")}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
