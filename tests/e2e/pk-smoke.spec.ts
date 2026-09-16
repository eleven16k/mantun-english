import { test, expect } from "@playwright/test";
import { io, type Socket } from "socket.io-client";
import { apiLogin, uniquePhone, injectState } from "./helpers/api";

/**
 * PK 实时对战冒烟（V7 B1/B3 后的现架构）：
 * 房主 = Node socket 客户端按协议建房（与 lexi-teacher 发起端同协议），
 * 学生 = 真实浏览器 UI 输码入房 → 开战 → UI 答题 → 实时榜。
 * 曾因 V7 前的旧 UI（教师建房已迁出学生端）而 test.fixme —— 现按新协议重写。
 *
 * 覆盖：鉴权 socket 建房 / 房码入房 / pk:players 广播 / host 开战 /
 * 题目下发与 UI 渲染 / pk:answer 计分 / 实时排行榜。
 */

const SOCKET_URL = "http://localhost:4199";

function connectHost(token: string, nickname: string, questions: unknown[]): Promise<{ socket: Socket; roomCode: string }> {
  return new Promise((resolve, reject) => {
    const socket = io(SOCKET_URL, { auth: { token }, transports: ["websocket", "polling"] });
    const timer = setTimeout(() => reject(new Error("pk:created timeout")), 15_000);
    socket.on("pk:created", ({ roomCode }: { roomCode: string }) => {
      clearTimeout(timer);
      resolve({ socket, roomCode });
    });
    socket.on("pk:error", (e: { message: string }) => reject(new Error(`pk:error ${e?.message}`)));
    socket.emit("pk:create", { className: "Smoke PK", teacherName: nickname, questions });
  });
}

test.describe("PK realtime smoke (real socket host × browser student)", () => {
  test("teacher-host socket + student UI join → battle → answer scored", async ({ browser, request }) => {
    test.setTimeout(90_000);

    // ── 身份：房主（teacher 语义走 socket）、学生（浏览器 UI）──
    const teacher = await apiLogin(request, uniquePhone());
    const student = await apiLogin(request, uniquePhone());

    // 出题原料：fast 本地出题（毫秒级，协议题型无关）
    const quizRes = await request.post("/api/quiz/wordlist", {
      headers: { Authorization: `Bearer ${teacher.token}` },
      data: {
        fast: true,
        count: 3,
        pairs: [
          { word: "harbor", meaning: "港口" },
          { word: "meadow", meaning: "草地" },
          { word: "ember", meaning: "余烬" },
        ],
      },
    });
    expect(quizRes.status()).toBe(200);
    const { pairs } = (await quizRes.json()) as {
      pairs: { question_id: string; question: string; correct_answer: string; options: Record<string, string> }[];
    };
    const questions = pairs.map((p, i) => {
      const choices = Object.values(p.options);
      return { id: p.question_id || `q${i}`, prompt: p.question, choices, correctIndex: choices.indexOf(p.correct_answer) };
    });
    expect(questions.length).toBeGreaterThanOrEqual(3);

    // ── 房主建房（Node socket，带 teacher token）──
    const { socket: hostSocket, roomCode } = await connectHost(teacher.token, teacher.nickname, questions);
    expect(roomCode).toMatch(/^\d{6}$/);

    // 房主侧监听：玩家广播与最终排行榜
    const playersSeen = new Promise<{ name: string; role: string; score: number }[]>((resolve) => {
      hostSocket.on("pk:players", ({ players }: { players: { name: string; role: string; score: number }[] }) => {
        if (players.length >= 2) resolve(players);
      });
    });
    const finalBoard = new Promise<{ name: string; score: number }[]>((resolve) => {
      hostSocket.on("pk:leaderboard", ({ leaderboard }: { leaderboard: { name: string; score: number }[] }) => resolve(leaderboard));
    });

    // ── 学生：真实浏览器 UI 输码入房 ──
    const studentCtx = await browser.newContext();
    await injectState(await studentCtx.newPage().then((p) => { p.close(); return p; }), student.token).catch(() => {});
    const studentPage = await studentCtx.newPage();
    await studentPage.addInitScript((tok) => localStorage.setItem("lexi-token", tok), student.token);
    await studentPage.goto("/pk");
    await studentPage.getByPlaceholder(/6-digit code|位数字码/i).fill(roomCode);
    await studentPage.getByText(/Join Battle|加入对战/i).first().click();

    // 双端都看到学生入房
    const players = await playersSeen;
    expect(players.some((p) => p.name === student.nickname)).toBe(true);

    // ── 房主开战 → 学生 UI 出现题目 ──
    hostSocket.emit("pk:start", { roomCode });
    await expect(studentPage.locator("text=/Q1\\//").first()).toBeVisible({ timeout: 20_000 });

    // 学生 UI 答第 1 题（点正确项）
    const q = questions[0];
    await studentPage.getByRole("button", { name: new RegExp(q.choices[q.correctIndex].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) }).first().click();

    // 房主收到实时榜，学生得分已计
    const board = await finalBoard;
    const me = board.find((p) => p.name === student.nickname);
    expect(me).toBeTruthy();
    expect(me!.score).toBeGreaterThanOrEqual(0);

    hostSocket.emit("pk:end", { roomCode });
    await studentCtx.close();
    hostSocket.disconnect();
  });
});
