/**
 * API helpers for E2E — seed users and inject state via pure API calls
 * against the isolated :3199 server Playwright spawns.
 */
import type { APIRequestContext, Page } from "@playwright/test";

export async function apiLogin(request: APIRequestContext, phone: string) {
  const send = await request.post("/api/auth", { data: { action: "send", phone } });
  const { devCode } = (await send.json()) as { devCode: string };
  const verify = await request.post("/api/auth", { data: { phone, code: devCode } });
  const data = (await verify.json()) as { token: string; user: { id: number; nickname: string } };
  return { token: data.token, uid: data.user.id, nickname: data.user.nickname };
}

export async function answerViaApi(
  request: APIRequestContext,
  token: string,
  wordId: string,
  isCorrect: boolean,
  prompt = "test",
) {
  return request.post("/api/economy", {
    headers: { Authorization: `Bearer ${token}` },
    data: { wordId, isCorrect, prompt },
  });
}

/**
 * Build localStorage state: auth token + a known economy baseline so specs
 * start deterministic (e.g. 200 coins, 3 hints).
 */
export async function injectState(page: Page, token: string, opts?: { coins?: number; hints?: number }) {
  const coins = opts?.coins ?? 200;
  const hints = opts?.hints ?? 3;
  await page.addInitScript(
    ([tok, c, h]) => {
      localStorage.setItem("lexi-token", tok as string);
      const existing = localStorage.getItem("lexi-game-state");
      const state = existing ? JSON.parse(existing) : { state: {}, version: 0 };
      state.state = {
        ...state.state,
        coins: c,
        hearts: 5,
        hintsOwned: h,
        scorePoints: 300,
        streak: 2,
        dailyDate: new Date().toISOString().slice(0, 10),
        dailyQuestionsAnswered: 0,
      };
      localStorage.setItem("lexi-game-state", JSON.stringify(state));
    },
    [token, coins, hints],
  );
}

/** Unique phone generator — one user per call. */
let counter = 0;
export function uniquePhone(): string {
  counter += 1;
  return `1390000${String(1000 + counter).slice(-4)}`;
}
