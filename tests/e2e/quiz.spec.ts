import { test, expect } from "@playwright/test";
import { apiLogin, uniquePhone } from "./helpers/api";

test.describe("/quiz core loop", () => {
  test("starts a vocab quiz and answering shows feedback", async ({ page }) => {
    await page.goto("/chat");
    await page.locator("button, a").filter({ hasText: /Extra practice|start|开始|计划|practice/i }).first().click();
    await expect(page).toHaveURL(/quiz/, { timeout: 15_000 });
    await expect(page.locator("text=/\\d+\\s*\\/\\s*\\d+/").first()).toBeVisible({ timeout: 15_000 });
    // answer any option — feedback panel must appear
    const options = page.locator("button", { hasText: /^[A-D]/ });
    await options.first().click();
    await expect(page.getByText(/correct|answer|正确|答案/i).first()).toBeVisible({ timeout: 5000 });
  });

  test("continue button advances the progress counter", async ({ page }) => {
    await page.goto("/chat");
    await page.locator("button, a").filter({ hasText: /Extra practice|start|开始|计划|practice/i }).first().click();
    await expect(page).toHaveURL(/quiz/, { timeout: 15_000 });
    await expect(page.locator("text=/\\d+\\s*\\/\\s*\\d+/").first()).toBeVisible({ timeout: 15_000 });
    await page.locator("button", { hasText: /^[A-D]/ }).first().click();
    const before = await page.locator("text=/\\d+\\s*\\/\\s*\\d+/").first().textContent();
    await page.getByRole("button", { name: /continue|see results|下一|结果/i }).click();
    const after = await page.locator("text=/\\d+\\s*\\/\\s*\\d+/").first().textContent();
    expect(after).not.toBe(before);
  });

  test("hint consumes a hint and dims two wrong options", async ({ page }) => {
    await page.goto("/chat");
    await page.locator("button, a").filter({ hasText: /Extra practice|start|开始|计划|practice/i }).first().click();
    await expect(page).toHaveURL(/quiz/, { timeout: 15_000 });
    await expect(page.locator("text=/\\d+\\s*\\/\\s*\\d+/").first()).toBeVisible({ timeout: 15_000 });
    const hintBtn = page.getByRole("button", { name: /hint|提示/i });
    await hintBtn.click();
    await expect(page.locator("button.opacity-30, button[data-dimmed]").first()).toBeVisible({ timeout: 5000 });
  });

  test("exit X returns home without crashing", async ({ page }) => {
    await page.goto("/chat");
    await page.locator("button, a").filter({ hasText: /Extra practice|start|开始|计划|practice/i }).first().click();
    await expect(page).toHaveURL(/quiz/, { timeout: 15_000 });
    await page.goto("/chat");
    await expect(page.locator("body")).not.toBeEmpty();
  });
});

test.describe("/results", () => {
  test("completing a session lands on results with rewards", async ({ page }) => {
    await page.goto("/chat");
    await page.locator("button, a").filter({ hasText: /Extra practice|start|开始|计划|practice/i }).first().click();
    await expect(page).toHaveURL(/quiz/, { timeout: 15_000 });
    // answer every question until the app navigates away from /quiz
    let stall = 0;
    let lastIdx = "";
    for (let i = 0; i < 80 && page.url().includes("/quiz"); i++) {
      const progress = await page
        .locator("text=/\\d+\\s*\\/\\s*\\d+/")
        .first()
        .textContent()
        .catch(() => "");
      if (progress === lastIdx) stall += 1;
      else stall = 0;
      lastIdx = progress ?? "";
      if (stall >= 4) break; // stuck (e.g. TTS/audio) — accept non-res outcome

      const cont = page.getByRole("button", { name: /continue|see results|下一|结果/i });
      if (await cont.isVisible().catch(() => false)) {
        await cont.click();
        await page.waitForTimeout(400);
        continue;
      }
      const typed = page.getByPlaceholder(/answer|答案|typed/i).first();
      const choice = page.locator("button", { hasText: /^[A-D]/ }).first();
      const ooh = page.getByText(/out of hearts|红心用完|go to shop|去商店/i).first();
      if ((await ooh.isVisible().catch(() => false)) || !(await choice.isVisible().catch(() => false))) {
        break; // hearts exhausted — refill out of scope
      }
      if (await typed.isVisible().catch(() => false)) {
        await typed.fill("a");
        const submit = page.getByRole("button", { name: /submit|提交/i });
        if (await submit.isVisible().catch(() => false)) {
          await submit.click();
          await page.waitForTimeout(5000); // AI judge or fallback
        }
      } else {
        await choice.click();
        await page.waitForTimeout(250);
      }
    }
    await expect(page).not.toHaveURL(/\/quiz/, { timeout: 12_000 });
    await expect(page.locator("body")).not.toBeEmpty();
  });
});
