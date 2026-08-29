/**
 * GET /api/me — Current user profile + economy + today's stats.
 * PATCH /api/me — Update profile (track, targetScore, examDate, nickname).
 */
import { NextResponse } from "next/server";
import db from "../../../server/db";
import { requireAuth } from "../../../server/auth";

export async function GET(req: Request) {
  try {
    const user = requireAuth(req);

    const profile = db.prepare(`
      SELECT id, phone, nickname, avatar, track, target_score, exam_date, estimated_score, role
      FROM users WHERE id = ?
    `).get(user.id);

    const economy = db.prepare(`
      SELECT * FROM economy WHERE user_id = ?
    `).get(user.id);

    const weaknessCount = (db.prepare(`
      SELECT COUNT(*) as n FROM weaknesses WHERE user_id = ?
    `).get(user.id) as { n: number }).n;

    const masteredCount = (db.prepare(`
      SELECT COUNT(*) as n FROM card_states WHERE user_id = ? AND mastered = 1
    `).get(user.id) as { n: number }).n;

    const scoreHistory = db.prepare(`
      SELECT score_points, estimated_score, recorded_at
      FROM score_history WHERE user_id = ? ORDER BY recorded_at DESC LIMIT 30
    `).all(user.id);

    const sub = db.prepare("SELECT tier, expires_at FROM subscriptions WHERE user_id = ?").get(user.id) as
      | { tier: string; expires_at: number }
      | undefined;
    const membership =
      sub && sub.expires_at > Math.floor(Date.now() / 1000)
        ? { tier: sub.tier, expiresAt: sub.expires_at }
        : null;

    return NextResponse.json({
      user: profile,
      economy,
      weaknessCount,
      masteredCount,
      membership,
      scoreHistory: scoreHistory.reverse(),
    });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = requireAuth(req);
    const body = await req.json();
    const { nickname, track, targetScore, examDate, estimatedScore } = body;

    const sets: string[] = [];
    const vals: (string | number)[] = [];
    if (nickname !== undefined) { sets.push("nickname = ?"); vals.push(nickname); }
    if (track !== undefined) { sets.push("track = ?"); vals.push(track); }
    if (targetScore !== undefined) { sets.push("target_score = ?"); vals.push(targetScore); }
    if (examDate !== undefined) { sets.push("exam_date = ?"); vals.push(examDate); }
    if (estimatedScore !== undefined) {
      sets.push("estimated_score = ?");
      vals.push(estimatedScore);
      // Log score history
      db.prepare("INSERT INTO score_history (user_id, score_points, estimated_score) VALUES (?, ?, ?)")
        .run(user.id, estimatedScore, estimatedScore);
    }

    if (sets.length === 0) return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    vals.push(user.id);
    db.prepare(`UPDATE users SET ${sets.join(", ")} WHERE id = ?`).run(...vals);

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
