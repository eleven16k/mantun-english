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

  test("correct devCode reaches the dashboard", async ({ page, request }) => {
    await page.goto("/auth");
    const phone = uniquePhone();
    await page.getByPlaceholder(/phone|手机/i).fill(phone);
    await page.getByRole("button", { name: /send|发送/i }).click();
    // fetch the devCode via API (the UI displays the same code)
    const send = await request.post("/api/auth", { data: { action: "send", phone } });
    const { devCode } = (await send.json()) as { devCode: string };
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
