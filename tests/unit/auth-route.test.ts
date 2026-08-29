import { describe, it, expect, beforeAll } from "vitest";
import { isolateDataDir, getDb } from "./helpers/db";
import { signToken, verifyToken, getToken } from "../../server/auth";

isolateDataDir();

describe("server/auth helpers", () => {
  let uid: number;

  beforeAll(async () => {
    const db = await getDb();
    // verifyToken joins users — seed a real row first
    db.prepare(
      "INSERT OR IGNORE INTO users (phone, nickname, role) VALUES (?, ?, ?)",
    ).run("13900000042", "Tester42", "student");
    uid = (db.prepare("SELECT id FROM users WHERE phone = ?").get("13900000042") as { id: number }).id;
  });

  it("signs and verifies a token against a seeded user", () => {
    const user = verifyToken(signToken(uid));
    expect(user?.id).toBe(uid);
    expect(user?.phone).toBe("13900000042");
  });

  it("returns null for tokens whose user does not exist", () => {
    expect(verifyToken(signToken(999999))).toBeNull();
  });

  it("rejects garbage tokens", () => {
    expect(verifyToken("garbage.token.here")).toBeNull();
  });

  it("extracts Bearer token from headers", () => {
    const req = new Request("http://x/api/me", { headers: { Authorization: "Bearer tok123" } });
    expect(getToken(req as never)).toBe("tok123");
  });
});

describe("auth API route — OTP lifecycle", () => {
  let authRoute: typeof import("../../app/api/auth/route");
  const phone = "13900001001";

  beforeAll(async () => {
    await getDb();
    authRoute = await import("../../app/api/auth/route");
  });

  const post = (body: unknown) =>
    authRoute.POST(
      new Request("http://x/api/auth", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    );

  it("send returns sent=true with a 6-digit devCode", async () => {
    const res = await post({ action: "send", phone });
    expect(res.status).toBe(200);
    const data = (await res.json()) as { sent: boolean; devCode: string };
    expect(data.sent).toBe(true);
    expect(data.devCode).toMatch(/^\d{6}$/);
  });

  it("verify with wrong code fails", async () => {
    await post({ action: "send", phone });
    const res = await post({ phone, code: "000000" });
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it("verify without send fails", async () => {
    const res = await post({ phone: "13900001099", code: "123456" });
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it("rejects invalid phone numbers", async () => {
    const res = await post({ action: "send", phone: "12345" });
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it("correct devCode logs in, creates user + economy, consumes OTP", async () => {
    const phone2 = "13900001002";
    const sent = (await (await post({ action: "send", phone: phone2 })).json()) as { devCode: string };
    const res = await post({ phone: phone2, code: sent.devCode });
    expect(res.status).toBe(200);
    const data = (await res.json()) as { token: string; user: { id: number; phone: string }; isNew: boolean };
    expect(data.token).toBeTruthy();
    // 手机号唯一即可 —— 同一隔离 DB 内每个 phone 只会 isNew 一次；用 id 判存在
    const db = await getDb();
    expect(db.prepare("SELECT id FROM users WHERE phone = ?").get(phone2)).toBeTruthy();
    expect(data.user.phone).toBe(phone2);
    expect(data.user.phone).toBe(phone2);

    expect(db.prepare("SELECT * FROM economy WHERE user_id = ?").get(data.user.id)).toBeTruthy();
    expect(db.prepare("SELECT * FROM otp_codes WHERE phone = ?").get(phone2)).toBeUndefined();
  });

  it("re-login of the same phone is not new", async () => {
    const phone3 = "13900001003";
    const s1 = (await (await post({ action: "send", phone: phone3 })).json()) as { devCode: string };
    await post({ phone: phone3, code: s1.devCode });
    const s2 = (await (await post({ action: "send", phone: phone3 })).json()) as { devCode: string };
    const res = await post({ phone: phone3, code: s2.devCode });
    const data = (await res.json()) as { isNew: boolean };
    expect(data.isNew).toBe(false);
  });
});
