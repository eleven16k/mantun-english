/**
 * Auth helpers — JWT generation, verification, and middleware.
 */
import jwt from "jsonwebtoken";
import db from "./db";

const SECRET = process.env.JWT_SECRET ?? "lexi-dev-secret-change-in-prod";
const EXPIRY = 30 * 24 * 3600; // 30 days in seconds

export interface AuthUser {
  id: number;
  phone: string;
  nickname: string;
  role: string;
}

export function signToken(userId: number): string {
  return jwt.sign({ uid: userId }, SECRET, { expiresIn: EXPIRY });
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const { uid } = jwt.verify(token, SECRET) as { uid: number };
    const row = db.prepare("SELECT id, phone, nickname, role FROM users WHERE id = ?").get(uid) as AuthUser | undefined;
    return row ?? null;
  } catch {
    return null;
  }
}

/** Extract token from Authorization header or cookie. */
export function getToken(req: Request): string | null {
  const auth = req.headers.get("Authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  const cookie = req.headers.get("Cookie");
  if (cookie) {
    const m = cookie.match(/lexi_token=([^;]+)/);
    if (m) return m[1];
  }
  return null;
}

/** Get authenticated user from request, or null. */
export function getUser(req: Request): AuthUser | null {
  const token = getToken(req);
  if (!token) return null;
  return verifyToken(token);
}

/** Require auth — throws 401 Response if not authenticated. */
export function requireAuth(req: Request): AuthUser {
  const user = getUser(req);
  if (!user) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return user;
}
