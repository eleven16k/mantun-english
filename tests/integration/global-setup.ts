/**
 * Global setup for integration tests — spawn a Lexi server on :3198 with an
 * isolated DATA_DIR, wait for readiness, yield the base URL, kill on exit.
 */
import { spawn, type ChildProcess } from "child_process";
import { rmSync } from "fs";
import path from "path";

let server: ChildProcess | null = null;
export const INT_PORT = 3198;
export const INT_BASE = `http://localhost:${INT_PORT}`;

export async function startServer(): Promise<string> {
  const root = path.resolve(__dirname, "../../..");
  rmSync(path.join(root, ".tmp/int"), { recursive: true, force: true });
  server = spawn("node", ["server.js"], {
    cwd: root,
    env: { ...process.env, PORT: String(INT_PORT), DATA_DIR: "./.tmp/int/data", JWT_SECRET: "test-secret" },
    stdio: "ignore",
    detached: true,
  });
  const deadline = Date.now() + 120_000;
  let lastErr = "";
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${INT_BASE}/api/auth`, {
        method: "POST",
        body: JSON.stringify({ action: "send", phone: "13900009999" }),
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(5000),
      });
      if (res.status < 500) return INT_BASE;
      lastErr = `status ${res.status}`;
    } catch (e) {
      lastErr = e instanceof Error ? e.message : String(e);
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`integration server failed to start: ${lastErr}`);
}

export function stopServer() {
  if (server?.pid) process.kill(-server.pid);
  server = null;
}

/** Register + login a unique user via the OTP API; returns token + uid. */
export async function apiLogin(baseUrl: string, phone: string): Promise<{ token: string; uid: number }> {
  const send = await fetch(`${baseUrl}/api/auth`, {
    method: "POST",
    body: JSON.stringify({ action: "send", phone }),
    headers: { "Content-Type": "application/json" },
  });
  const { devCode } = (await send.json()) as { devCode: string };
  const verify = await fetch(`${baseUrl}/api/auth`, {
    method: "POST",
    body: JSON.stringify({ phone, code: devCode }),
    headers: { "Content-Type": "application/json" },
  });
  const data = (await verify.json()) as { token: string; user: { id: number } };
  return { token: data.token, uid: data.user.id };
}
