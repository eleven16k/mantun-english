/**
 * GET  /api/scenarios/custom          — list the user's generated scenarios
 * GET  /api/scenarios/custom?id=...   — one scenario (detail page fallback)
 * DELETE /api/scenarios/custom?id=... — remove one
 */
import { NextResponse } from "next/server";
import { requireAuth } from "../../../../server/auth";
import db from "../../../../server/db";
import type { Scenario } from "../../../../lib/scenarios";

export async function GET(req: Request) {
  try {
    const user = requireAuth(req);
    const id = new URL(req.url).searchParams.get("id");
    if (id) {
      const row = db
        .prepare("SELECT scenario_json FROM custom_scenarios WHERE id = ? AND user_id = ?")
        .get(id, user.id) as { scenario_json: string } | undefined;
      if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ scenario: JSON.parse(row.scenario_json) });
    }
    const rows = db
      .prepare("SELECT scenario_json FROM custom_scenarios WHERE user_id = ? ORDER BY created_at DESC")
      .all(user.id) as { scenario_json: string }[];
    return NextResponse.json({ scenarios: rows.map((r) => JSON.parse(r.scenario_json) as Scenario) });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = requireAuth(req);
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    db.prepare("DELETE FROM custom_scenarios WHERE id = ? AND user_id = ?").run(id, user.id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
