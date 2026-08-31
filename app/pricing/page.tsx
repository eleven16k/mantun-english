"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { subscribe } from "@/lib/api";
import { shippedMembershipFeatures } from "@/lib/membership";
import { useGameStore } from "@/lib/store";
import { useI18n, type MessageKey } from "@/lib/i18n";

/**
 * /pricing — G1: Three-tier subscription page.
 * Monthly / Semester / Annual with feature comparison.
 */

const PLANS: {
  id: string;
  nameKey: MessageKey;
  periodKey: MessageKey;
  descKey: MessageKey;
  price: string;
  highlight?: boolean;
  featureKeys: MessageKey[];
}[] = [
  {
    id: "monthly",
    nameKey: "pricing.monthly.name",
    periodKey: "pricing.monthly.period",
    descKey: "pricing.monthly.desc",
    price: "¥30",
    featureKeys: [
      "pricing.monthly.f1",
      "pricing.monthly.f2",
      "pricing.monthly.f3",
      "pricing.monthly.f4",
    ],
  },
  {
    id: "semester",
    nameKey: "pricing.semester.name",
    periodKey: "pricing.semester.period",
    descKey: "pricing.semester.desc",
    price: "¥128",
    highlight: true,
    featureKeys: [
      "pricing.semester.f1",
      "pricing.semester.f2",
      "pricing.semester.f3",
      "pricing.semester.f4",
    ],
  },
  {
    id: "annual",
    nameKey: "pricing.annual.name",
    periodKey: "pricing.annual.period",
    descKey: "pricing.annual.desc",
    price: "¥198",
    featureKeys: [
      "pricing.annual.f1",
      "pricing.annual.f2",
      "pricing.annual.f3",
      "pricing.annual.f4",
    ],
  },
];

// Comparison table — config-driven from lib/membership (M4-Δ): only shipped
// rows render, so copy never promises an unshipped feature.
const COMPARISON = shippedMembershipFeatures();

export default function PricingPage() {
  const [selected, setSelected] = useState("semester");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState<{ tier: string; expiresAt: number } | null>(null);
  const [error, setError] = useState("");
  const { t } = useI18n();

  // Activates the membership server-side. Payment provider not wired yet —
  // the subscription record is real, the charge channel is the stub.
  const confirm = async () => {
    if (subscribing) return;
    setSubscribing(true);
    setError("");
    try {
      const result = await subscribe(selected as "monthly" | "semester" | "annual");
      setSubscribed(result);
      useGameStore.setState({ isMember: true });
    } catch {
      setError(t("pricing.subFail"));
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[768px] px-6 pt-[84px] pb-6">
        <h1 className="pt-1 font-booster text-[26px] font-extrabold leading-[32px] text-primary mb-2">{t("pricing.title")}</h1>
        <p className="mb-5 text-sm text-secondary">{t("pricing.subtitle")}</p>

        {/* Subscription success */}
        {subscribed && (
          <div className="mb-5 rounded-2xl border border-[var(--bg-positive-emphasis-default)] bg-[color-mix(in_srgb,var(--bg-positive-emphasis-default)_10%,transparent)] p-4 text-center">
            <p className="font-booster text-base font-extrabold text-positive">✓ {t("pricing.subOk")}</p>
            <p className="mt-1 text-xs text-secondary">
              {t("pricing.subUntil")} {new Date(subscribed.expiresAt * 1000).toLocaleDateString()}
            </p>
          </div>
        )}
        {error && <p className="mb-4 text-center text-xs font-bold text-critical">{error}</p>}

        {/* Free vs member comparison */}
        <div className="mb-6 g-card overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-subtle bg-canvas">
                <th className="px-4 py-3 text-left text-xs font-bold text-tertiary">{t("pricing.feature")}</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-tertiary">{t("pricing.free")}</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-brand-text">{t("pricing.member")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {COMPARISON.map(row => (
                <tr key={row.featKey}>
                  <td className="px-4 py-3 text-left font-medium text-primary">{t(row.featKey)}</td>
                  <td className="px-4 py-3 text-center text-tertiary">{t(row.freeKey)}</td>
                  <td className="px-4 py-3 text-center font-bold text-brand-text">{t(row.memberKey)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Plan cards */}
        <div className="grid gap-3 sm:grid-cols-3">
          {PLANS.map(plan => (
            <button
              key={plan.id}
              onClick={() => setSelected(plan.id)}
              className={`relative flex flex-col rounded-3xl border-2 p-5 text-left transition ${
                selected === plan.id
                  ? "border-brandborder bg-brand-subtle shadow-lg"
                  : "border-subtle bg-surface shadow-sm hover:border-brandborder"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-0.5 text-[10px] font-bold uppercase text-white shadow-sm">
                  {t("pricing.bestValue")}
                </span>
              )}
              <h3 className="font-booster text-lg font-extrabold text-primary">{t(plan.nameKey)}</h3>
              <p className="text-xs text-tertiary">{t(plan.descKey)}</p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-booster text-3xl font-extrabold text-primary">{plan.price}</span>
                <span className="text-xs text-tertiary">{t(plan.periodKey)}</span>
              </div>
              <ul className="mt-4 flex flex-1 flex-col gap-1.5">
                {plan.featureKeys.map(featureKey => (
                  <li key={featureKey} className="flex items-start gap-2 text-xs text-secondary">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-positive" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                    {t(featureKey)}
                  </li>
                ))}
              </ul>
              <span className={`mt-4 rounded-pill py-2.5 text-center text-sm font-bold transition ${
                selected === plan.id ? "bg-brand text-white" : "border border-subtle text-secondary"
              }`}>
                {selected === plan.id ? t("pricing.selected") : t("pricing.choose")}
              </span>
            </button>
          ))}
        </div>

        {/* Subscribe CTA */}
        <button
          onClick={confirm}
          disabled={subscribing || !!subscribed}
          className="mt-6 w-full rounded-pill bg-action py-4 font-booster text-base font-extrabold text-white shadow-sm transition hover:bg-actionhover active:scale-[0.98] disabled:opacity-50"
        >
          {subscribed ? t("pricing.subOk") : subscribing ? t("pricing.subscribing") : t("pricing.subscribe")}
        </button>

        {/* Payment note */}
        <p className="mt-6 text-center text-[11px] text-tertiary">
          {t("pricing.note1")}<br />
          {t("pricing.note2")}
        </p>
      </div>
    </AppShell>
  );
}
