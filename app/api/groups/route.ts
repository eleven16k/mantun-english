/**
 * GET  /api/groups           — list my groups (created + joined)
 * GET  /api/groups?code=xxx  — group leaderboard (real member data)
 * POST /api/groups           — create group (any student can)
 * POST {action:"join",  code} — join by invite code
 * POST {action:"leave", code} — leave a group
 */
import { NextResponse } from "next/server";
import db from "../../../server/db";
import { requireAuth } from "../../../server/auth";

export async function GET(req: Request) {
  try {
    const user = requireAuth(req);
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (code) {
      const grp = db.prepare("SELECT * FROM groups WHERE code = ?").get(code) as { id: number } | undefined;
      if (!grp) return NextResponse.json({ error: "Group not found" }, { status: 404 });

      const members = db.prepare(`
        SELECT u.id, u.nickname, e.score_points, e.streak
        FROM group_members gm
        JOIN users u ON gm.user_id = u.id
        LEFT JOIN economy e ON e.user_id = u.id
        WHERE gm.group_id = ?
        ORDER BY COALESCE(e.score_points, 0) DESC
      `).all(grp.id);
      return NextResponse.json({ code, members });
    }

    const groups = db.prepare(`
      SELECT g.id, g.code, g.name,
        (SELECT COUNT(*) FROM group_members WHERE group_id = g.id) as member_count
      FROM groups g
      JOIN group_members gm ON gm.group_id = g.id
      WHERE gm.user_id = ?
      ORDER BY g.created_at DESC
    `).all(user.id);
    return NextResponse.json({ groups });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = requireAuth(req);
    const body = await req.json();

    if (body.action === "join") {
      const grp = db.prepare("SELECT id, code, name FROM groups WHERE code = ?").get(body.code) as
        | { id: number; code: string; name: string }
        | undefined;
      if (!grp) return NextResponse.json({ error: "Invalid group code" }, { status: 404 });
      db.prepare("INSERT OR IGNORE INTO group_members (group_id, user_id) VALUES (?, ?)").run(grp.id, user.id);
      return NextResponse.json({ code: grp.code, name: grp.name });
    }

    if (body.action === "leave") {
      const grp = db.prepare("SELECT id FROM groups WHERE code = ?").get(body.code) as { id: number } | undefined;
      if (!grp) return NextResponse.json({ error: "Group not found" }, { status: 404 });
      db.prepare("DELETE FROM group_members WHERE group_id = ? AND user_id = ?").run(grp.id, user.id);
      return NextResponse.json({ ok: true });
    }

    const name = body.name?.trim();
    if (!name) return NextResponse.json({ error: "Group name required" }, { status: 400 });
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const result = db.prepare("INSERT INTO groups (code, name, creator_id) VALUES (?, ?, ?)").run(code, name, user.id);
    const groupId = Number(result.lastInsertRowid);
    db.prepare("INSERT OR IGNORE INTO group_members (group_id, user_id) VALUES (?, ?)").run(groupId, user.id);
    return NextResponse.json({ code, id: groupId, name });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
