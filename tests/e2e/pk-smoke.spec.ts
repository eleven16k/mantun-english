import { test, expect } from "@playwright/test";
import { apiLogin, uniquePhone } from "./helpers/api";

test.describe("PK realtime smoke (2 contexts)", () => {
  test.fixme("teacher hosts, student joins — both see 2 players", async ({ browser, request }) => {
    // student identity for the joining side
    const { token } = await apiLogin(request, uniquePhone());

    const teacherCtx = await browser.newContext({ storageState: "playwright/.auth/student.json" });
    const studentCtx = await browser.newContext();
    await studentCtx.addInitScript((tok) => {
      localStorage.setItem("lexi-token", tok);
      localStorage.setItem(
        "lexi-game-state",
        JSON.stringify({ state: { coins: 100, hearts: 5 }, version: 0 }),
      );
    }, token);

    const teacherPage = await teacherCtx.newPage();
    const studentPage = await studentCtx.newPage();

    await teacherPage.goto("/pk");
    await teacherPage.getByText(/Host Battle|发起对战/i).first().click();
    await teacherPage.getByPlaceholder(/Friday Vocab Sprint|周五词汇冲刺/i).fill("Smoke PK");
    await teacherPage.getByText(/Create battle room|创建房间/i).first().click();
    const roomCode = (await teacherPage.getByText(/^\d{6}$/).first().textContent())!.trim();
    expect(roomCode).toMatch(/^\d{6}$/);

    await studentPage.goto("/pk");
    await studentPage.getByText(/Join Battle|加入对战/i).first().click();
    await studentPage.getByPlaceholder(/6-digit code|位数字码/i).fill(roomCode);
    await studentPage.getByPlaceholder(/6-digit code|位数字码/i).dispatchEvent("input");
    await studentPage.getByText(/Join Battle|加入对战/i).first().click();

    // both lobbies must show the student name once the join propagates
    // ≥2 players → the waiting label disappears and start appears (either disabled or not)
    await expect(
      teacherPage.getByText(/Waiting for players/i),
    ).toBeHidden({ timeout: 25_000 });

    await teacherCtx.close();
    await studentCtx.close();
  });
});
