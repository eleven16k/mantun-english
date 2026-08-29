/**
 * GET /api/classes — List classes (teacher: own classes; student: joined classes).
 * POST /api/classes — Create class (teacher only) → generates 6-digit code.
 * POST /api/classes/join — Join class by code (student).
 * GET /api/classes/:code — Get class leaderboard.
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
      // Get class leaderboard
      const cls = db.prepare("SELECT * FROM classes WHERE code = ?").get(code) as { id: number } | undefined;
      if (!cls) return NextResponse.json({ error: "Class not found" }, { status: 404 });

      const members = db.prepare(`
        SELECT u.id, u.nickname, e.score_points, e.streak
        FROM class_members cm
        JOIN users u ON cm.user_id = u.id
        JOIN economy e ON e.user_id = u.id
        WHERE cm.class_id = ?
        ORDER BY e.score_points DESC
      `).all(cls.id);
      return NextResponse.json({ code, members });
    }

    // List: teacher's classes or student's joined classes
    const teaching = db.prepare(`
      SELECT c.id, c.code, c.name, c.created_at,
        (SELECT COUNT(*) FROM class_members WHERE class_id = c.id) as member_count
      FROM classes c WHERE c.teacher_id = ?
    `).all(user.id);

    const joined = db.prepare(`
      SELECT c.id, c.code, c.name, c.created_at
      FROM class_members cm JOIN classes c ON cm.class_id = c.id
      WHERE cm.user_id = ?
    `).all(user.id);

    return NextResponse.json({ teaching, joined });
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
      const cls = db.prepare("SELECT id FROM classes WHERE code = ?").get(body.code);
      if (!cls) return NextResponse.json({ error: "Invalid class code" }, { status: 404 });
      db.prepare("INSERT OR IGNORE INTO class_members (class_id, user_id) VALUES (?, ?)").run((cls as { id: number }).id, user.id);
      return NextResponse.json({ ok: true });
    }

    // Create class
    const name = body.name?.trim();
    if (!name) return NextResponse.json({ error: "Class name required" }, { status: 400 });
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const result = db.prepare("INSERT INTO classes (code, name, teacher_id) VALUES (?, ?, ?)").run(code, name, user.id);
    const classId = Number(result.lastInsertRowid);
    db.prepare("INSERT OR IGNORE INTO class_members (class_id, user_id) VALUES (?, ?)").run(classId, user.id);
    return NextResponse.json({ code, id: classId, name });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
