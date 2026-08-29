/**
 * POST /api/auth — Phone + SMS login/register.
 *
 *   { action: "send", phone }      → generate + store a 6-digit OTP (5-min
 *                                    expiry, 5 attempts). Returns devCode in
 *                                    the response — in production this is
 *                                    where the SMS provider call goes.
 *   { phone, code }                → verify OTP, find-or-create user, JWT.
 */
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "../../../server/db";
import { signToken } from "../../../server/auth";

const OTP_TTL_SEC = 5 * 60;
const MAX_ATTEMPTS = 5;

function issueOtp(phone: string): string {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  db.prepare(`
    INSERT INTO otp_codes (phone, code, expires_at, attempts) VALUES (?, ?, ?, 0)
    ON CONFLICT(phone) DO UPDATE SET code = excluded.code, expires_at = excluded.expires_at, attempts = 0
  `).run(phone, code, Math.floor(Date.now() / 1000) + OTP_TTL_SEC);
  return code;
}

export async function POST(req: Request) {
  try {
    const { phone, code, action } = await req.json();

    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    // ── Send code ──
    if (action === "send") {
      const devCode = issueOtp(phone);
      // Production: send `devCode` via SMS provider here (Aliyun/Twilio).
      return NextResponse.json({ sent: true, devCode });
    }

    // ── Verify + login ──
    if (!code || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    const otp = db.prepare("SELECT code, expires_at, attempts FROM otp_codes WHERE phone = ?").get(phone) as
      | { code: string; expires_at: number; attempts: number }
      | undefined;

    if (!otp) {
      return NextResponse.json({ error: "code_not_sent" }, { status: 400 });
    }
    if (otp.expires_at < Math.floor(Date.now() / 1000)) {
      db.prepare("DELETE FROM otp_codes WHERE phone = ?").run(phone);
      return NextResponse.json({ error: "code_expired" }, { status: 400 });
    }
    if (otp.attempts >= MAX_ATTEMPTS) {
      db.prepare("DELETE FROM otp_codes WHERE phone = ?").run(phone);
      return NextResponse.json({ error: "too_many_attempts" }, { status: 429 });
    }
    if (otp.code !== code) {
      db.prepare("UPDATE otp_codes SET attempts = attempts + 1 WHERE phone = ?").run(phone);
      return NextResponse.json({ error: "code_mismatch" }, { status: 400 });
    }
    db.prepare("DELETE FROM otp_codes WHERE phone = ?").run(phone);

    // Find or create user
    let user = db.prepare("SELECT id, phone, nickname FROM users WHERE phone = ?").get(phone) as { id: number; phone: string; nickname: string } | undefined;
    let isNew = false;

    if (!user) {
      isNew = true;
      const hash = bcrypt.hashSync("placeholder", 10);
      const result = db.prepare("INSERT INTO users (phone, password_hash, nickname) VALUES (?, ?, ?)").run(phone, hash, "Student");
      const uid = Number(result.lastInsertRowid);
      db.prepare("INSERT OR IGNORE INTO economy (user_id) VALUES (?)").run(uid);
      user = db.prepare("SELECT id, phone, nickname FROM users WHERE id = ?").get(uid) as typeof user;
    }

    const token = signToken(user!.id);
    return NextResponse.json({ token, user, isNew });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Auth failed" }, { status: 500 });
  }
}
