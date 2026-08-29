/**
 * POST /api/subscribe {tier} — activate a membership.
 *
 * Payment channel is NOT wired yet (no merchant credentials in dev): the
 * subscription activates immediately and is fully real server-side state —
 * /api/me exposes it and member gating (unlimited daily questions) applies.
 * Wire the payment provider's webhook here before charging real money.
 */
import { NextResponse } from "next/server";
import db from "../../../server/db";
import { requireAuth } from "../../../server/auth";

const TIER_DAYS: Record<string, number> = {
  monthly: 30,
  semester: 180,
  annual: 365,
};

export async function POST(req: Request) {
  try {
    const user = requireAuth(req);
    const { tier } = await req.json();
    const days = TIER_DAYS[tier];
    if (!days) return NextResponse.json({ error: "Invalid tier" }, { status: 400 });

    const now = Math.floor(Date.now() / 1000);
    const existing = db.prepare("SELECT expires_at FROM subscriptions WHERE user_id = ?").get(user.id) as
      | { expires_at: number }
      | undefined;
    // Extending from the current expiry if still active
    const base = existing && existing.expires_at > now ? existing.expires_at : now;

    db.prepare(`
      INSERT INTO subscriptions (user_id, tier, starts_at, expires_at) VALUES (?, ?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET tier = excluded.tier, starts_at = excluded.starts_at, expires_at = excluded.expires_at
    `).run(user.id, tier, now, base + days * 86400);

    return NextResponse.json({ tier, expiresAt: base + days * 86400 });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
