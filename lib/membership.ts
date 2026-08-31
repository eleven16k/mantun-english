import type { MessageKey } from "@/lib/i18n";

/**
 * Single source of truth for the free-vs-member comparison (M4-Δ).
 * The pricing page renders only SHIPPED rows — copy can never run ahead of
 * real features. Message keys live in lib/i18n (pricing.cmp.*).
 *
 * Dropped in the three-end split: `hearts` (unfounded claim) and `ads` (no
 * ads exist); `parent` moved to the lexi-parent app's own paywall — it sells
 * that app's realtime feed, not anything this app delivers.
 */

export interface MembershipFeatureRow {
  key: "daily" | "ai" | "weak";
  featKey: MessageKey;
  freeKey: MessageKey;
  memberKey: MessageKey;
  shipped: boolean;
}

export const MEMBERSHIP_FEATURES: MembershipFeatureRow[] = [
  { key: "daily", featKey: "pricing.cmp.daily", freeKey: "pricing.cmp.daily.free", memberKey: "pricing.cmp.daily.member", shipped: true },
  { key: "ai", featKey: "pricing.cmp.ai", freeKey: "pricing.cmp.ai.free", memberKey: "pricing.cmp.ai.member", shipped: true },
  { key: "weak", featKey: "pricing.cmp.weak", freeKey: "pricing.cmp.weak.free", memberKey: "pricing.cmp.weak.member", shipped: true },
];

/** Rows the pricing page renders — shipped only, config-driven. */
export function shippedMembershipFeatures(): MembershipFeatureRow[] {
  return MEMBERSHIP_FEATURES.filter((r) => r.shipped);
}
