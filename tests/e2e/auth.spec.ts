import { test, expect } from "@playwright/test";
import { apiLogin } from "./helpers/api";

/**
 * Unified login: the student app no longer has its own /auth page —
 * authentication lives on the marketing site's /login, which hands the
 * token back via ?token= (ingested globally by BridgeParams).
 */

test.describe("unified login flow", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("unauthenticated visit to a protected page keeps working (client guard)", async ({ page }) => {
    // /chat is the home dashboard; without a token it renders and page data
    // requests 401 → the api layer assigns the marketing login URL.
    await page.goto("/chat");
    // The page itself still renders (client guard may redirect async) —
    // assert the app booted (title) rather than a 404/500.
    await expect(page).toHaveTitle(/漫豚英语/);
  });

  test("auth route is gone", async ({ page }) => {
    const res = await page.request.get("/auth");
    expect(res.status()).toBe(404);
  });
});

test.describe("authenticated session sanity", () => {
  test("logged-in storageState skips login", async ({ page }) => {
    await page.goto("/chat");
    // Any storageState-bearing session lands in the app (not bounced out)
    await page.waitForTimeout(1500);
    expect(page.url()).toContain("/chat");
  });

  test("?token= handoff logs straight in", async ({ page }) => {
    // Real token from the shared auth API (same endpoint the marketing
    // site's /login uses), then simulate the ?token= handoff.
    const { token } = await apiLogin(page.request, "13900002001");
    await page.goto(`/chat?token=${token}`);
    await page.waitForTimeout(800);
    expect(page.url()).not.toContain("token=");
    const stored = await page.evaluate(() => localStorage.getItem("lexi-token"));
    expect(stored).toBe(token);
  });
});
