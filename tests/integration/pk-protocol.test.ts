import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { io, type Socket } from "socket.io-client";
import { startServer, stopServer, INT_BASE, apiLogin } from "./global-setup";

let clients: Socket[] = [];

function connect(): Promise<Socket> {
  const socket = io(INT_BASE, { transports: ["websocket", "polling"] });
  clients.push(socket);
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("connect timeout")), 10_000);
    socket.on("connect", () => {
      clearTimeout(t);
      resolve(socket);
    });
    socket.on("connect_error", (e) => {
      clearTimeout(t);
      reject(e);
    });
  });
}

function once<T>(socket: Socket, event: string, timeoutMs = 8000): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`timeout waiting ${event}`)), timeoutMs);
    socket.once(event, (data: T) => {
      clearTimeout(t);
      resolve(data);
    });
  });
}

beforeAll(async () => {
  await startServer();
}, 120_000);

afterAll(() => {
  for (const c of clients) c.disconnect();
  clients = [];
  stopServer();
});

describe("PK battle protocol", () => {
  // server spawn + readiness can take ~60s on first dev compile
  beforeAll(async () => {}, 120_000);
  it("teacher creates a room with a 6-digit code", async () => {
    const teacher = await connect();
    const created = once<{ roomCode: string; className: string }>(teacher, "pk:created");
    teacher.emit("pk:create", {
      className: "Test Class",
      teacherId: 1,
      teacherName: "Teacher",
      questions: [
        { id: "q1", prompt: "apple", choices: ["苹果", "香蕉", "橘子", "梨"], correctIndex: 0 },
      ],
    });
    const { roomCode } = await created;
    expect(roomCode).toMatch(/^\d{6}$/);
    teacher.disconnect();
    clients = clients.filter((c) => c !== teacher);
  });

  it("students join and everyone sees the player list", async () => {
    const teacher = await connect();
    const created = once<{ roomCode: string }>(teacher, "pk:created");
    teacher.emit("pk:create", {
      className: "Join Test",
      teacherId: 1,
      teacherName: "T",
      questions: [{ id: "q1", prompt: "dog", choices: ["狗", "猫"], correctIndex: 0 }],
    });
    const { roomCode } = await created;

    const s1 = await connect();
    const s1Players = once<{ players: unknown[] }>(s1, "pk:players");
    s1.emit("pk:join", { roomCode, userId: 2, name: "Stu1" });
    await s1Players;

    const s2 = await connect();
    const everyone = Promise.all([once<{ players: unknown[] }>(teacher, "pk:players"), once<{ players: unknown[] }>(s1, "pk:players"), once<{ players: unknown[] }>(s2, "pk:players")]);
    s2.emit("pk:join", { roomCode, userId: 3, name: "Stu2" });
    const results = await everyone;
    for (const r of results) expect(r.players.length).toBe(3);

    for (const c of [teacher, s1, s2]) c.disconnect();
    clients = clients.filter((c) => ![teacher, s1, s2].includes(c));
  });

  it("full battle lifecycle: start → answer → leaderboard → ended", async () => {
    const teacher = await connect();
    const created = once<{ roomCode: string }>(teacher, "pk:created");
    teacher.emit("pk:create", {
      className: "Lifecycle",
      teacherId: 1,
      teacherName: "T",
      questions: [
        { id: "q1", prompt: "apple", choices: ["苹果", "香蕉"], correctIndex: 0 },
        { id: "q2", prompt: "dog", choices: ["狗", "猫"], correctIndex: 0 },
      ],
    });
    const { roomCode } = await created;

    const student = await connect();
    const joined = once<{ players: unknown[] }>(student, "pk:players");
    student.emit("pk:join", { roomCode, userId: 2, name: "Player" });
    await joined;

    const started = Promise.all([
      once<{ questions: unknown[]; endsAt: number }>(teacher, "pk:started"),
      once<{ questions: unknown[] }>(student, "pk:started"),
    ]);
    teacher.emit("pk:start", { roomCode });
    const [tStart] = await started;
    expect((tStart.questions as unknown[]).length).toBe(2);
    expect(tStart.endsAt).toBeGreaterThan(Date.now());

    // fast correct answer scores high (max(10, 100 - timeMs/100)); slow scores the 10 floor
    const lbPromise = once<{ leaderboard: { name: string; score: number }[] }>(teacher, "pk:leaderboard");
    student.emit("pk:answer", { roomCode, questionIndex: 0, isCorrect: true, timeMs: 500 });
    const fast = await lbPromise;
    const fastScore = fast.leaderboard[0].score;
    expect(fastScore).toBeGreaterThan(90);
    expect(fastScore).toBeLessThanOrEqual(100);

    student.emit("pk:answer", { roomCode, questionIndex: 1, isCorrect: true, timeMs: 30_000 });
    const slow = await once<{ leaderboard: { name: string; score: number }[] }>(teacher, "pk:leaderboard");
    const slowDelta = slow.leaderboard[0].score - fastScore;
    expect(slowDelta).toBeGreaterThanOrEqual(10);
    expect(slowDelta).toBeLessThan(20);

    const ended = Promise.all([
      once<{ results: unknown[] }>(teacher, "pk:ended"),
      once<{ results: unknown[] }>(student, "pk:ended"),
    ]);
    teacher.emit("pk:end", { roomCode });
    const ends = await ended;
    expect((ends[0].results as unknown[]).length).toBeGreaterThan(0);
  });

  it("rejects joining a started room with pk:error", async () => {
    const teacher = await connect();
    const created = once<{ roomCode: string }>(teacher, "pk:created");
    teacher.emit("pk:create", {
      className: "Reject",
      teacherId: 1,
      teacherName: "T",
      questions: [{ id: "q1", prompt: "x", choices: ["a", "b"], correctIndex: 0 }],
    });
    const { roomCode } = await created;
    const s1 = await connect();
    const j1 = once<{ players: unknown[] }>(s1, "pk:players");
    s1.emit("pk:join", { roomCode, userId: 2, name: "In" });
    await j1;
    teacher.emit("pk:start", { roomCode });
    await once<"started">(s1, "pk:started");

    const late = await connect();
    const err = once<{ message: string }>(late, "pk:error");
    late.emit("pk:join", { roomCode, userId: 9, name: "Late" });
    await expect(err).resolves.toBeTruthy();

    for (const c of [teacher, s1, late]) c.disconnect();
    clients = clients.filter((c) => ![teacher, s1, late].includes(c));
  });
});
