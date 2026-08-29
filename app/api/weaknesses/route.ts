/**
 * GET /api/weaknesses — List all weaknesses sorted by wrongCount desc.
 * DELETE /api/weaknesses — Clear all.
 * DELETE /api/weaknesses?wordId=xxx — Delete one.
 */
import { NextResponse } from "next/server";
import db from "../../../server/db";
import { requireAuth } from "../../../server/auth";

export async function GET(req: Request) {
  try {
    const user = requireAuth(req);
    const list = db.prepare(`
      SELECT word_id, wrong_count, correct_streak, last_prompt, added_at
      FROM weaknesses WHERE user_id = ?
      ORDER BY wrong_count DESC
    `).all(user.id);
    return NextResponse.json(list);
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = requireAuth(req);
    const url = new URL(req.url);
    const wordId = url.searchParams.get("wordId");
    if (wordId) {
      db.prepare("DELETE FROM weaknesses WHERE user_id = ? AND word_id = ?").run(user.id, wordId);
    } else {
      db.prepare("DELETE FROM weaknesses WHERE user_id = ?").run(user.id);
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
