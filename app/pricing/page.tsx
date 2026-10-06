"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CrownIcon } from "@/components/icons";

import { PageHeader } from "@/components/PageHeader";
import { AppShell } from "@/components/AppShell";
import { submitMemberRequest, getMemberRequest, type MemberRequest } from "@/lib/api";
import { shippedMembershipFeatures } from "@/lib/membership";
import { useGameStore } from "@/lib/store";
import { useI18n, type MessageKey } from "@/lib/i18n";

/**
 * /pricing — Three-tier subscription page.
 * Payment is not self-serve: users leave an email and submit an activation
 * request; the admin console (mt-teach-api /admin) approves it.
 */

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "";

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PricingPage() {
  const [email, setEmail] = useState("");
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState<MemberRequest | null>(null);
  const [error, setError] = useState("");
  const { t } = useI18n();
  const { isMember, membershipExpiresAt } = useGameStore();

  // 已有 pending 申请则直接进入已提交态
  useEffect(() => {
    getMemberRequest()
      .then(({ request }) => {
        if (request?.status === "pending") setApplied(request);
      })
      .catch(() => {});
  }, []);

  const apply = async () => {
    if (applying) return;
    const normalized = email.trim().toLowerCase();
    if (!EMAIL_RE.test(normalized)) {
      setError(t("pricing.applyInvalid"));
      return;
    }
    setApplying(true);
    setError("");
    try {
      const { request } = await submitMemberRequest(normalized);
      setApplied(request);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      setError(
        msg === "request_pending" ? t("pricing.applyPending")
        : msg === "email_taken" ? t("pricing.applyTaken")
        : t("pricing.applyFail"),
      );
    } finally {
      setApplying(false);
    }
  };

  const daysLeft = isMember && membershipExpiresAt
    ? Math.max(0, Math.ceil((membershipExpiresAt * 1000 - Date.now()) / 86400000))
    : null;

  return (
    <AppShell>
      <div className="page-shell">
        <PageHeader badge="MEMBERSHIP" title={t("pricing.title")} sub={t("pricing.subtitle")} />

        {/* Membership active */}
        {isMember && (
          <div className="mb-5 rounded-2xl border-2 border-b-4 border-[#22C55E] bg-[#F0FDF4] p-4 text-center">
            <p className="font-booster text-base font-extrabold text-positive inline-flex items-center gap-1"><CheckIcon size={15} /> {t("pricing.subOk")}</p>
            {membershipExpiresAt && (
              <p className="mt-1 text-xs text-secondary">
                {t("pricing.subUntil")} {new Date(membershipExpiresAt * 1000).toLocaleDateString()}
              </p>
            )}
            {daysLeft !== null && daysLeft <= 7 && (
              <p className="mt-1 text-xs font-bold text-streak">
                {daysLeft} {t("pricing.daysLeft")}
              </p>
            )}
          </div>
        )}

        {/* Request submitted */}
        {applied && !isMember && (
          <div className="mb-5 rounded-2xl border-2 border-b-4 border-brandborder bg-brand-subtle p-4 text-center">
            <p className="font-booster text-base font-extrabold text-brand-text inline-flex items-center gap-1"><CheckIcon size={15} /> {t("pricing.applyOk")}</p>
            <p className="mt-1 text-xs text-secondary">{applied.email}</p>
          </div>
        )}
        {error && <p className="mb-4 text-center text-xs font-bold text-critical">{error}</p>}

        {/* Free vs member comparison */}
        <div className="mb-6 g-card overflow-hidden">
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
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border-2 p-5 text-left ${
                plan.highlight ? "border-brandborder bg-brand-subtle" : "border-subtle bg-surface"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-0.5 text-[10px] font-bold uppercase text-white">
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
            </div>
          ))}
        </div>

        {/* Activation request — the only CTA until online payment ships */}
        {!isMember && !applied && (
          <div className="mt-6 rounded-3xl border-2 border-subtle bg-surface p-5">
            <h3 className="font-booster text-base font-extrabold text-primary">{t("pricing.applyTitle")}</h3>
            <p className="mt-1 text-xs leading-relaxed text-secondary">{t("pricing.applyDesc")}</p>
            <label className="mt-4 block text-xs font-bold uppercase tracking-wide text-tertiary">
              {t("pricing.applyEmailLabel")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("pricing.applyEmailPlaceholder")}
              maxLength={254}
              className="mt-1.5 w-full rounded-xl border border-subtle bg-app px-3 py-3 text-sm text-primary outline-none focus:border-brandborder"
            />
            <button
              onClick={apply}
              disabled={applying}
              className="mt-3 w-full rounded-pill bg-action py-3.5 font-booster text-base font-extrabold text-white transition hover:bg-actionhover active:scale-[0.98] disabled:opacity-50"
            >
              {applying ? t("pricing.applySubmitting") : t("pricing.applyBtn")}
            </button>
          </div>
        )}

        {/* Contact note */}
        <p className="mt-6 text-center text-[11px] text-tertiary">
          {t("pricing.contactAdmin")}
          {SUPPORT_EMAIL && (
            <>
              <br />
              <a href={`mailto:${SUPPORT_EMAIL}`} className="font-bold text-brand-text">{SUPPORT_EMAIL}</a>
            </>
          )}
        </p>
      </div>
    </AppShell>
  );
}
