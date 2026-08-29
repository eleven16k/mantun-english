/**
 * GET /api/imports — List import history.
 * POST /api/imports — Save a new import record.
 * DELETE /api/imports?id=xxx — Delete one. DELETE all with ?all=true.
 */
import { NextResponse } from "next/server";
import db from "../../../server/db";
import { requireAuth } from "../../../server/auth";

export async function GET(req: Request) {
  try {
    const user = requireAuth(req);
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    // Get single import with full questions for replay
    if (id) {
      const record = db.prepare(`
        SELECT id, file_name, topic, question_type, question_count, questions_json, created_at
        FROM imports WHERE user_id = ? AND id = ?
      `).get(user.id, id) as Record<string, unknown> | undefined;
      if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({
        ...record,
        questions: JSON.parse(record.questions_json as string),
      });
    }

    const list = db.prepare(`
      SELECT id, file_name, topic, question_type, question_count, kb_name, created_at
      FROM imports WHERE user_id = ? ORDER BY created_at DESC LIMIT 20
    `).all(user.id);
    return NextResponse.json(list);
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = requireAuth(req);
    const body = await req.json();
    const id = `imp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    db.prepare(`
      INSERT INTO imports (id, user_id, file_name, topic, question_type, question_count, questions_json, kb_name, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, user.id, body.fileName ?? "", body.topic ?? "Imported",
      body.questionType ?? "choice", body.questionCount ?? 0,
      JSON.stringify(body.questions ?? []), body.kbName ?? null, Date.now());
    return NextResponse.json({ id });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = requireAuth(req);
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const all = url.searchParams.get("all");
    if (all === "true") {
      db.prepare("DELETE FROM imports WHERE user_id = ?").run(user.id);
    } else if (id) {
      db.prepare("DELETE FROM imports WHERE user_id = ? AND id = ?").run(user.id, id);
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
