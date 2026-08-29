/**
 * GET   /api/friends            — list friends with economy stats
 * POST  /api/friends {phone}    — add a friend by phone number (mutual)
 * POST  /api/friends {action:"remove", friendId} — unfriend (mutual)
 */
import { NextResponse } from "next/server";
import db from "../../../server/db";
import { requireAuth } from "../../../server/auth";

export async function GET(req: Request) {
  try {
    const user = requireAuth(req);
    const friends = db.prepare(`
      SELECT u.id, u.nickname, e.score_points, e.streak
      FROM friends f
      JOIN users u ON f.friend_id = u.id
      LEFT JOIN economy e ON e.user_id = u.id
      WHERE f.user_id = ?
      ORDER BY COALESCE(e.score_points, 0) DESC
    `).all(user.id);
    return NextResponse.json({ friends });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = requireAuth(req);
    const body = await req.json();

    if (body.action === "remove") {
      const fid = Number(body.friendId);
      db.prepare("DELETE FROM friends WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)").run(user.id, fid, fid, user.id);
      return NextResponse.json({ ok: true });
    }

    const phone = String(body.phone ?? "").trim();
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }
    const target = db.prepare("SELECT id FROM users WHERE phone = ?").get(phone) as { id: number } | undefined;
    if (!target) {
      return NextResponse.json({ error: "user_not_found" }, { status: 404 });
    }
    if (target.id === user.id) {
      return NextResponse.json({ error: "cannot_add_self" }, { status: 400 });
    }

    db.prepare("INSERT OR IGNORE INTO friends (user_id, friend_id) VALUES (?, ?)").run(user.id, target.id);
    db.prepare("INSERT OR IGNORE INTO friends (user_id, friend_id) VALUES (?, ?)").run(target.id, user.id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
