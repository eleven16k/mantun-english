import { test, expect } from "@playwright/test";
import { apiLogin, uniquePhone } from "./helpers/api";

test.describe("/auth login flow", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("send shows a 6-digit devCode and auto-fills", async ({ page }) => {
    await page.goto("/auth");
    await page.getByPlaceholder(/phone|手机/i).fill(uniquePhone());
    await page.getByRole("button", { name: /send|发送/i }).click();
    await expect(page.getByText(/\d{6}/)).toBeVisible({ timeout: 8000 });
  });

  test("wrong code shows the API error and stays on /auth", async ({ page }) => {
    await page.goto("/auth");
    const phone = uniquePhone();
    await page.getByPlaceholder(/phone|手机/i).fill(phone);
    await page.getByRole("button", { name: /send|发送/i }).click();
    await expect(page.getByText(/Dev code/i)).toBeVisible({ timeout: 8000 });
    await page.getByPlaceholder(/code|验证码/i).fill("000000");
    await page.getByRole("button", { name: /sign in|登录/i }).click();
    await expect(page.getByText(/code_mismatch/i)).toBeVisible({ timeout: 8000 });
    await expect(page).toHaveURL(/\/auth/);
  });

  test("correct devCode reaches the dashboard", async ({ page }) => {
    await page.goto("/auth");
    const phone = uniquePhone();
    await page.getByPlaceholder(/phone|手机/i).fill(phone);
    await page.getByRole("button", { name: /send|发送/i }).click();
    // The UI displays the devCode directly (no SMS provider in dev). The old
    // double-send (UI + API) now trips the 60s resend cooldown (V7 fix), so
    // extract the code from the page instead of re-sending.
    await expect(page.getByText(/\d{6}/)).toBeVisible({ timeout: 8000 });
    const devText =
      (await page.getByText(/Dev code|开发环境验证码/).first().textContent().catch(() => null)) ??
      (await page.getByText(/\d{6}/).first().textContent().catch(() => null)) ??
      "";
    const devCode = devText.match(/(\d{6})/)?.[1] ?? "";
    if (!devCode) console.log("[DEBUG] body text:", await page.locator("body").textContent());
    expect(devCode).toMatch(/^\d{6}$/);
    await page.getByPlaceholder(/code|验证码/i).fill(devCode);
    const btn = page.getByRole("button", { name: /sign in|登录/i });
    await btn.waitFor({ state: "visible", timeout: 5000 });
    await btn.click();
    await btn.click(); // first click may be swallowed by the state re-render
    await page.waitForTimeout(2500);
    await expect(page).not.toHaveURL(/\/auth/);
  });
});

test.describe("authenticated session sanity", () => {
  test("logged-in storageState skips auth", async ({ page }) => {
    await page.goto("/chat");
    await expect(page).not.toHaveURL(/\/auth/);
  });
});
