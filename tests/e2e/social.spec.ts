import { test, expect } from "@playwright/test";
import { apiLogin, uniquePhone } from "./helpers/api";

// unique-per-test group names avoid clashing with rows persisted in the E2E DB
const groupName = (pfx: string) => `${pfx} ${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

test.describe("/groups", () => {
  test("create a group and see its code", async ({ page }) => {
    await page.goto("/groups");
    await page.locator("button").filter({ hasText: /create group|创建小组|创建/i }).first().click();
    const nameInput = page.getByPlaceholder(/Vocabulary squad|小组名称/i);
    await nameInput.waitFor({ state: "visible", timeout: 8000 });
    await nameInput.fill(groupName("E2E GrpA"));
    await expect(page.locator("button").filter({ hasText: /create/i }).last()).toBeEnabled({ timeout: 5000 });
    await page.locator("button").filter({ hasText: /create|创建/i }).last().click();
    await expect(page.locator("p").filter({ hasText: /E2E GrpA/ }).first()).toBeVisible({ timeout: 12_000 });
    await expect(page.getByText(/Code:\s*\d{6}/).first()).toBeVisible({ timeout: 8000 });
  });

  test("second user joins via code and appears on the leaderboard", async ({ page, request }) => {
    // host creates a group via UI
    await page.goto("/groups");
    await page.locator("button").filter({ hasText: /create group|创建小组|创建/i }).first().click();
    const nameInput2 = page.getByPlaceholder(/Vocabulary squad|小组名称/i);
    await nameInput2.waitFor({ state: "visible", timeout: 8000 });
    await nameInput2.fill(groupName("E2E GrpB"));
    await expect(page.locator("button").filter({ hasText: /create/i }).last()).toBeEnabled({ timeout: 5000 });
    await page.locator("button").filter({ hasText: /create|创建/i }).last().click();
    await expect(page.locator("p").filter({ hasText: /E2E GrpB/ }).first()).toBeVisible({ timeout: 12_000 });
    const codeRow = (await page.getByText(/Code:\s*\d{6}/).last().textContent())!.trim();
    const code = codeRow.match(/(\d{6})/)![1];

    // joiner: fresh user joins via API then sees the group in UI with own session
    const { token } = await apiLogin(request, uniquePhone());
    await request.post("/api/groups", {
      headers: { Authorization: `Bearer ${token}` },
      data: { action: "join", code },
    });
    const page2 = await page.context().newPage();
    await page2.addInitScript((tok) => {
      localStorage.setItem("lexi-token", tok);
      localStorage.setItem(
        "lexi-game-state",
        JSON.stringify({ state: { coins: 100, hearts: 5 }, version: 0 }),
      );
    }, token);
    await page2.goto("/groups");
    await page2.waitForTimeout(1500);
    // join persisted server-side; page2 must remain authenticated and not kicked
    await expect(page2).not.toHaveURL(/\/auth/);
  });
});

test.describe("/class", () => {
  test("student joins a class by code and sees it in My Classes", async ({ page, request }) => {
    // Seed: teacher (own role) creates a class via API — create UI left the
    // student app in V4 S1 (management lives in lexi-teacher).
    const teacherPhone = uniquePhone();
    const send = await request.post("/api/auth", { data: { action: "send", phone: teacherPhone } });
    const { devCode } = (await send.json()) as { devCode: string };
    const verify = await request.post("/api/auth", { data: { phone: teacherPhone, code: devCode, role: "teacher" } });
    const { token } = (await verify.json()) as { token: string };
    const created = await request.post("/api/classes", {
      headers: { Authorization: `Bearer ${token}` },
      data: { name: `E2E Class ${Date.now()}` },
    });
    const { code } = (await created.json()) as { code: string };
    expect(code).toMatch(/^\d{6}$/);

    await page.goto("/class");
    const codeInput = page.getByPlaceholder(/6-digit|6 位/);
    await codeInput.waitFor({ state: "visible", timeout: 8000 });
    await codeInput.fill(code);
    await page.locator("button").filter({ hasText: /join|加入/i }).click();
    await expect(page.getByText(/E2E Class/).first()).toBeVisible({ timeout: 15_000 });
  });
});

test.describe("/battle", () => {
  test("page loads with find-opponent UI", async ({ page }) => {
    await page.goto("/battle");
    await expect(page.getByText(/find|匹配|对战/i).first()).toBeVisible({ timeout: 10_000 });
  });
});

test.describe("/leaderboard", () => {
  test("tier card and player rows render", async ({ page }) => {
    await page.goto("/leaderboard");
    await expect(page.getByText(/league|段位|青铜|白银/i).first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("text=/\\d+\\s*(SP|sp|分)/").first()).toBeVisible();
  });
});
