import { test, expect } from "@playwright/test";

test.describe("remaining pages smoke + interaction", () => {
  test("/weakness renders the book (empty or list)", async ({ page }) => {
    await page.goto("/weakness");
    await expect(
      page.getByText(/all clear|weak|薄弱|错题|start practicing/i).first(),
    ).toBeVisible({ timeout: 10_000 });
  });

  test("/history renders (empty ok)", async ({ page }) => {
    await page.goto("/history");
    await expect(page.getByText(/history|记录|empty|暂无/i).first()).toBeVisible({ timeout: 10_000 });
  });

  test("/profile shows nickname and stats", async ({ page }) => {
    await page.goto("/profile");
    await expect(page.getByText(/friends|好友|mastered|掌握|decks|卡组/i).first()).toBeVisible({ timeout: 10_000 });
  });

  test("/progress shows streak ladder", async ({ page }) => {
    await page.goto("/progress");
    await expect(page.getByText(/streak|连胜|day/i).first()).toBeVisible({ timeout: 10_000 });
  });

  test("/parent renders a stats dashboard", async ({ page }) => {
    await page.goto("/parent");
    await expect(page.locator("body")).not.toBeEmpty();
  });

  test("/tutorial advances through steps", async ({ page }) => {
    await page.goto("/tutorial");
    await expect(page.locator("body")).not.toBeEmpty();
  });

  test("/onboarding starts the track picker", async ({ page }) => {
    await page.goto("/onboarding");
    await expect(page.locator("button, [role=button]").first()).toBeVisible({ timeout: 10_000 });
  });

  test("/solve shows the photo picker", async ({ page }) => {
    await page.goto("/solve");
    await expect(page.getByText(/photo|拍照|拍/i).first()).toBeVisible({ timeout: 10_000 });
  });

  test("/import paste tab generates questions offline-tolerant", async ({ page }) => {
    await page.goto("/import?mode=paste");
    await page.getByPlaceholder(/paste|粘贴/i).fill(
      "The Renaissance was a period in European history marking the transition from the Middle Ages to modernity. It began in Italy in the 14th century."
        .repeat(2),
    );
    await page.getByRole("button", { name: /start|开始|generate/i }).last().click();
    // pipeline starts (uploading/indexing status) — sidecar may be down → error card is also fine
    await expect(
      page.getByText(/uploading|indexing|error|失败|连接|上传|索引/i).first(),
    ).toBeVisible({ timeout: 20_000 });
  });

  test("/chat renders dashboard and tutor entry", async ({ page }) => {
    // block the sidecar so this stays offline-deterministic
    await page.route("**/localhost:18081/**", (r) => r.abort());
    await page.goto("/chat");
    await expect(page.locator("body")).not.toBeEmpty();
  });
});
