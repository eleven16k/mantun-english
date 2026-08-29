/**
 * GET /api/economy — Get full economy state.
 * POST /api/economy — Answer a question (updates hearts/coins/SP/streak/weakness/cardState).
 *   Body: { wordId, isCorrect, prompt } → updated economy + rewards
 */
import { NextResponse } from "next/server";
import db from "../../../server/db";
import { requireAuth } from "../../../server/auth";

const DAILY_FREE = 30;
const DAY_MS = 86400000;
const INTERVALS_DAYS = [0, 1, 2, 4, 7, 15, 30];

// 8-tier league thresholds
const LEAGUE_TIERS = [
  { name: "Starter", min: 0 },
  { name: "Riser", min: 200 },
  { name: "Striver", min: 500 },
  { name: "Breaker", min: 900 },
  { name: "Elite", min: 1400 },
  { name: "Master", min: 2000 },
  { name: "Grandmaster", min: 2800 },
  { name: "Apex", min: 4000 },
];

function todayStr() { return new Date().toISOString().slice(0, 10); }

/** Get the Monday of the current week as YYYY-MM-DD. */
function getWeekStart(): string {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon
  const diff = day === 0 ? -6 : 1 - day; // days back to Monday
  const monday = new Date(now.getTime() + diff * DAY_MS);
  return monday.toISOString().slice(0, 10);
}

function getTierForWeekSP(weekSP: number): string {
  let tier = LEAGUE_TIERS[0].name;
  for (const t of LEAGUE_TIERS) {
    if (weekSP >= t.min) tier = t.name;
  }
  return tier;
}

/** Check if a new week has started; if so, reset weekSP and update league. */
function checkWeeklyReset(userId: number, eco: Record<string, number | string | null>) {
  const currentWeekStart = getWeekStart();
  const storedWeekStart = eco.week_start as string | null;

  if (storedWeekStart !== currentWeekStart) {
    // New week — capture last week's tier for promotion/demotion display, then reset
    const lastWeekSP = eco.week_sp as number;
    const lastTier = getTierForWeekSP(lastWeekSP);
    db.prepare(`
      UPDATE economy SET week_sp = 0, week_start = ?, league = ? WHERE user_id = ?
    `).run(currentWeekStart, lastTier, userId);
    // Return reset info so client can show promotion/demotion animation
    return { reset: true, lastWeekSP, lastTier };
  }
  return { reset: false };
}

function getOrCreateEconomy(userId: number) {
  db.prepare("INSERT OR IGNORE INTO economy (user_id) VALUES (?)").run(userId);
  return db.prepare("SELECT * FROM economy WHERE user_id = ?").get(userId) as Record<string, number | string | null>;
}

// Lazy heart regen
function regenHearts(eco: Record<string, number | string | null>): number {
  let hearts = eco.hearts as number;
  const depleted = eco.hearts_depleted_at as number | null;
  if (hearts < 5 && depleted) {
    const elapsed = Date.now() - depleted;
    const regenCount = Math.floor(elapsed / (30 * 60000));
    hearts = Math.min(5, hearts + regenCount);
  }
  return hearts;
}

export async function GET(req: Request) {
  try {
    const user = requireAuth(req);
    let eco = getOrCreateEconomy(user.id);
    // Check for weekly reset before returning
    const resetInfo = checkWeeklyReset(user.id, eco);
    if (resetInfo.reset) {
      eco = getOrCreateEconomy(user.id); // re-read after reset
    }
    eco.hearts = regenHearts(eco);
    return NextResponse.json({ ...eco, weeklyReset: resetInfo });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = requireAuth(req);
    const { wordId, isCorrect, prompt } = await req.json();

    let eco = getOrCreateEconomy(user.id);
    // Weekly reset check (sets week_sp=0 if new Monday)
    checkWeeklyReset(user.id, eco);
    eco = getOrCreateEconomy(user.id); // re-read after potential reset

    const hearts = regenHearts(eco);
    const td = todayStr();
    const dq = eco.daily_date === td ? (eco.daily_questions_answered as number) : 0;
    const currentWeekSP = eco.week_sp as number;

    let coinsEarned = 0;
    let spEarned = 0;
    let newHearts = hearts;
    let enteredWeakness = false;
    let conqueredWeakness = false;

    // Card state (spaced repetition)
    const cs = db.prepare(`
      SELECT * FROM card_states WHERE user_id = ? AND word_id = ?
    `).get(user.id, wordId) as Record<string, number> | undefined;
    const wasNew = !cs;
    const difficulty = 2; // default

    if (isCorrect) {
      if (wasNew) {
        coinsEarned = difficulty >= 3 ? 10 : 8;
        spEarned = difficulty >= 3 ? 40 : 30;
      } else {
        spEarned = 10;
      }
    } else {
      // Heart loss after free quota
      if (dq >= DAILY_FREE) {
        newHearts = Math.max(0, hearts - 1);
        // Super heart auto-use
        if (newHearts === 0 && (eco.super_hearts_owned as number) > 0) {
          newHearts = 1;
          db.prepare("UPDATE economy SET super_hearts_owned = super_hearts_owned - 1 WHERE user_id = ?").run(user.id);
        }
      }
    }

    // Update card state
    const intervalIndex = cs?.interval_index ?? 0;
    const consecutiveCorrect = cs?.consecutive_correct ?? 0;
    const consecutiveWrong = cs?.consecutive_wrong ?? 0;

    let newIntervalIdx: number, newConsecCorrect: number, newConsecWrong: number, mastered: number;
    if (isCorrect) {
      newConsecCorrect = consecutiveCorrect + 1;
      newConsecWrong = 0;
      newIntervalIdx = newConsecCorrect >= 2 ? Math.min(intervalIndex + 2, INTERVALS_DAYS.length - 1) : Math.min(intervalIndex + 1, INTERVALS_DAYS.length - 1);
      mastered = newIntervalIdx >= 4 ? 1 : 0;
    } else {
      newConsecCorrect = 0;
      newConsecWrong = consecutiveWrong + 1;
      newIntervalIdx = Math.max(0, intervalIndex - 1);
      mastered = 0;
    }

    db.prepare(`
      INSERT OR REPLACE INTO card_states (user_id, word_id, interval_index, consecutive_correct, consecutive_wrong, mastered, next_review_at, last_reviewed_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(user.id, wordId, newIntervalIdx, newConsecCorrect, newConsecWrong, mastered,
      Date.now() + INTERVALS_DAYS[newIntervalIdx] * DAY_MS, Date.now());

    // Weakness tracking
    const w = db.prepare("SELECT * FROM weaknesses WHERE user_id = ? AND word_id = ?").get(user.id, wordId) as Record<string, number | string> | undefined;
    if (!isCorrect) {
      if (w) {
        db.prepare("UPDATE weaknesses SET wrong_count = wrong_count + 1, correct_streak = 0, last_prompt = ? WHERE user_id = ? AND word_id = ?")
          .run(prompt ?? "", user.id, wordId);
      } else if (newConsecWrong >= 2) {
        db.prepare("INSERT INTO weaknesses (user_id, word_id, wrong_count, correct_streak, last_prompt, added_at) VALUES (?, ?, 1, 0, ?, ?)")
          .run(user.id, wordId, prompt ?? "", Date.now());
        enteredWeakness = true;
      }
    } else if (w) {
      const newStreak = (w.correct_streak as number) + 1;
      if (newStreak >= 2) {
        db.prepare("DELETE FROM weaknesses WHERE user_id = ? AND word_id = ?").run(user.id, wordId);
        spEarned += 20;
        conqueredWeakness = true;
      } else {
        db.prepare("UPDATE weaknesses SET correct_streak = ? WHERE user_id = ? AND word_id = ?").run(newStreak, user.id, wordId);
      }
    }

    // Streak logic
    const lastStudy = eco.last_study_date as string | null;
    let newStreak = eco.streak as number;
    if (lastStudy !== td) {
      const yesterday = new Date(Date.now() - DAY_MS).toISOString().slice(0, 10);
      if (lastStudy === yesterday || lastStudy === null || lastStudy === "") {
        newStreak = lastStudy === null || lastStudy === "" ? 1 : newStreak + 1;
      } else if ((eco.streak_freezes_owned as number) > 0) {
        newStreak = newStreak + 1;
        db.prepare("UPDATE economy SET streak_freezes_owned = streak_freezes_owned - 1 WHERE user_id = ?").run(user.id);
      } else {
        newStreak = 1;
      }
    }

    // Update economy (including week_sp for league)
    const newWeekSP = currentWeekSP + spEarned;
    const newTier = getTierForWeekSP(newWeekSP);
    db.prepare(`
      UPDATE economy SET
        hearts = ?, hearts_depleted_at = ?, coins = coins + ?, score_points = score_points + ?,
        streak = ?, last_study_date = ?, daily_questions_answered = ?, daily_date = ?,
        week_sp = ?, week_start = ?, league = ?
      WHERE user_id = ?
    `).run(newHearts, newHearts === 0 ? Date.now() : null, coinsEarned, spEarned,
      newStreak, td, dq + 1, td,
      newWeekSP, getWeekStart(), newTier, user.id);

    return NextResponse.json({
      hearts: newHearts,
      coinsEarned,
      spEarned,
      streak: newStreak,
      weekSP: newWeekSP,
      league: newTier,
      enteredWeakness,
      conqueredWeakness,
      isNewWord: wasNew,
    });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
