/**
 * POST /api/scenarios/reward — bank scenario progress into the economy.
 * Body: { scenarioId, mode: 'chat'|'call', turns, xp, coins, masteredWords, transcript? }
 * → { coins, scorePoints, newWords }
 *
 * XP maps to score_points (SP, feeds leagues); coins to wallet. Mastered
 * words land in scenario_mastery (a word only counts once per scenario).
 */
import { NextResponse } from "next/server";
import db from "../../../../server/db";
import { requireAuth } from "../../../../server/auth";

const MAX_XP_PER_TURN = 20;
const MAX_COINS_PER_CALL = 50;

export async function POST(req: Request) {
  try {
    const user = requireAuth(req);
    const body = await req.json();
    const scenarioId = String(body.scenarioId ?? "");
    if (!scenarioId) {
      return NextResponse.json({ error: "scenarioId required" }, { status: 400 });
    }
    const mode = body.mode === "call" ? "call" : "chat";
    const turns = Math.max(0, Math.min(500, Number(body.turns ?? 0)));
    const xp = Math.max(0, Math.min(MAX_XP_PER_TURN * Math.max(1, turns), Number(body.xp ?? 0)));
    const coins = Math.max(0, Math.min(MAX_COINS_PER_CALL, Number(body.coins ?? 0)));
    const masteredWords: string[] = Array.isArray(body.masteredWords)
      ? body.masteredWords.map(String).slice(0, 100)
      : [];

    db.prepare("INSERT OR IGNORE INTO economy (user_id) VALUES (?)").run(user.id);
    db.prepare("UPDATE economy SET coins = coins + ?, score_points = score_points + ?, week_sp = week_sp + ? WHERE user_id = ?")
      .run(coins, xp, xp, user.id);

    let newWords = 0;
    const insertWord = db.prepare(
      "INSERT OR IGNORE INTO scenario_mastery (user_id, scenario_id, word) VALUES (?, ?, ?)"
    );
    for (const word of masteredWords) {
      const res = insertWord.run(user.id, scenarioId, word.toLowerCase());
      newWords += res.changes;
    }

    db.prepare(
      "INSERT INTO scenario_sessions (user_id, scenario_id, mode, turns, xp_earned, coins_earned, transcript_json) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).run(
      user.id,
      scenarioId,
      mode,
      turns,
      xp,
      coins,
      body.transcript ? JSON.stringify(body.transcript).slice(0, 100_000) : null
    );

    const eco = db.prepare("SELECT coins, score_points FROM economy WHERE user_id = ?").get(user.id) as
      | { coins: number; score_points: number }
      | undefined;

    return NextResponse.json({
      coins: eco?.coins ?? 0,
      scorePoints: eco?.score_points ?? 0,
      newWords,
    });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
