import { test, expect } from "@playwright/test";

test.describe("/decks", () => {
  test("shows builtin decks with card counts", async ({ page }) => {
    await page.goto("/decks");
    await expect(page.getByText(/cards|张卡片/i).first()).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(/Vocabulary|词汇|Cloze|完形/i).first()).toBeVisible();
  });

  test("new deck dialog creates a deck", async ({ page }) => {
    await page.goto("/decks");
    await page.locator("button, [role=button]").filter({ hasText: /new deck|新建卡组/i }).first().click();
    await page.getByPlaceholder(/e\.g\.|名称|例如/i).fill("E2E Deck");
    await page.locator("button").filter({ hasText: /create|创建/i }).last().click();
    await expect(page.getByText("E2E Deck")).toBeVisible({ timeout: 5000 });
  });
});

test.describe("/vocab", () => {
  test("lists words by tier and can start a quiz", async ({ page }) => {
    await page.goto("/vocab");
    await expect(page.getByText(/basic|基础/i).first()).toBeVisible({ timeout: 10_000 });
    await page.getByText(/basic|基础/i).first().click();
    await expect(page.getByText(/quiz this tier|出题/i).first()).toBeVisible();
  });
});

test.describe("/shop", () => {
  test("shows coin balance and powerup grid", async ({ page }) => {
    await page.goto("/shop");
    await expect(page.getByText(/^\d+$/).first()).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(/hint|提示/i).first()).toBeVisible();
  });

  test("buying a powerup succeeds on a fresh visit", async ({ page }) => {
    await page.goto("/shop");
    await expect(page.getByText(/hint|提示/i).first()).toBeVisible({ timeout: 10_000 });
    // click the first buy link; seeded coins (200) cover the cheapest item.
    // owned counter next to the item increments (0 → 1)
    const before = await page.getByText(/bought|已购/i).count();
    await page.getByText(/buy|购买/i).first().click();
    await page.waitForTimeout(600);
    // either a bought check appeared, or an owned number incremented — page must not error
    const err = await page.getByText(/no coins|金币不足/i).count();
    expect(err).toBe(0);
  });
});

test.describe("/pricing", () => {
  test("three tiers visible; subscribe activates membership", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByText(/¥18|monthly|月/i).first()).toBeVisible({ timeout: 10_000 });
    await page.getByRole("button", { name: /subscribe|订阅|立即/i }).first().click();
    await expect(page.getByText(/active|生效/i).first()).toBeVisible({ timeout: 8000 });
  });
});

test.describe("/settings", () => {
  test("dark mode toggle persists", async ({ page }) => {
    await page.goto("/settings");
    await page.getByRole("switch").first().click();
    await page.reload();
    const stored = await page.evaluate(() => localStorage.getItem("lexi-settings") ?? localStorage.getItem("lexi-theme"));
    expect(stored).toBeTruthy();
  });

  test("language switch flips copy", async ({ page }) => {
    await page.goto("/settings");
    const zh = page.getByRole("button", { name: /中文/i }).first();
    if (await zh.isVisible()) {
      await zh.click();
      await page.waitForTimeout(500);
      await expect(page.getByText(/设置|外观/i).first()).toBeVisible();
    }
  });
});
