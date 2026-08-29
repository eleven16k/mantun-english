#!/usr/bin/env node
/**
 * Lexi API smoke test — exercises every AI/scenario endpoint against a
 * running dev server (default http://localhost:3123).
 *
 *   node tests/smoke-api.mjs [baseUrl] [--solve <imagePath>]
 *
 * Requires the server to have LLM_API_KEY configured (.env.local) for the
 * AI paths; degraded paths are reported as such, not failures.
 */
const BASE = (() => {
  const args = process.argv.slice(2);
  const solveIdx = args.indexOf("--solve");
  if (solveIdx >= 0) args.splice(solveIdx, 2);
  return args[0] ?? "http://localhost:3123";
})();
const SOLVE_IMG = process.argv[process.argv.indexOf("--solve") + 1];

const ok = (name, cond, detail = "") =>
  console.log(`${cond ? "✅" : "❌"} ${name}${detail ? ` — ${detail}` : ""}`);

async function main() {
  // 1. Auth (demo OTP flow)
  const sendRes = await fetch(`${BASE}/api/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "send", phone: "13800000001" }),
  });
  const { devCode } = await sendRes.json();
  const authRes = await fetch(`${BASE}/api/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: "13800000001", code: devCode }),
  });
  const { token } = await authRes.json();
  ok("auth (OTP login)", !!token);
  const H = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  const post = (url, body) => fetch(`${BASE}${url}`, { method: "POST", headers: H, body: JSON.stringify(body) });

  // 2. Scenario NPC chat (gateway AI)
  let aiUp = false;
  try {
    const chat = await (
      await post("/api/scenarios/chat", {
        scenarioId: "cafe",
        history: [],
        message: "I'd like to order a pastry.",
        level: "JuniorHigh",
        customVocab: ["pastry"],
        locale: "zh",
      })
    ).json();
    aiUp = !!chat.npcResponse && chat.npcResponse.includes("---");
    ok("scenario NPC chat", aiUp, aiUp ? chat.npcResponse.split("---")[0].slice(0, 80) : JSON.stringify(chat).slice(0, 120));
  } catch (e) {
    ok("scenario NPC chat", false, String(e));
  }

  // 3. Briefing vocab
  const vocab = await (await post("/api/scenarios/vocab", { scenarioId: "cafe", level: "JuniorHigh" })).json();
  ok("briefing vocab", Array.isArray(vocab.vocab) && vocab.vocab.length >= 5, `${vocab.vocab?.length} words, generated=${vocab.generated}`);

  // 4. WordQuest quiz
  const wq = await (await post("/api/wordquest", { level: "Primary" })).json();
  ok("wordquest quiz", wq.questions?.length === 10, `10 questions, generated=${wq.generated}`);

  // 5. Reward banking (economy integration)
  const reward = await (
    await post("/api/scenarios/reward", {
      scenarioId: "cafe",
      mode: "chat",
      turns: 2,
      xp: 20,
      coins: 4,
      masteredWords: ["pastry"],
    })
  ).json();
  ok("reward banking", Number.isFinite(reward.coins) && reward.newWords >= 0, `coins=${reward.coins} sp=${reward.scorePoints} newWords=${reward.newWords}`);

  // 6. Photo solve (vision) — optional image
  if (SOLVE_IMG) {
    const { readFile } = await import("node:fs/promises");
    const b64 = (await readFile(SOLVE_IMG)).toString("base64");
    const res = await post("/api/solve", { imageBase64: `data:image/png;base64,${b64}`, locale: "zh" });
    if (res.ok) {
      const text = await res.text();
      ok("photo solve (vision)", text.length > 100, `${text.length} chars: ${text.slice(0, 80)}…`);
    } else {
      ok("photo solve (vision)", false, `HTTP ${res.status} ${await res.text()}`);
    }
  } else {
    const res = await post("/api/solve", { imageBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", locale: "zh" });
    const probe = await fetch(`${BASE}/api/solve`, { method: "POST", headers: H, body: JSON.stringify({ imageBase64: "x" }) });
    ok("solve route reachable", probe.status === 400, "400 on bad payload = route wired (pass --solve <img> to test vision)");
    void res;
  }

  // 7. Economy state
  const eco = await (await fetch(`${BASE}/api/economy`, { headers: H })).json();
  ok("economy state", Number.isFinite(eco.coins), `coins=${eco.coins} sp=${eco.score_points}`);

  console.log(`\nAI provider: ${aiUp ? "gateway live ✅" : "degraded (check LLM_API_KEY in .env.local) ⚠️"}`);
}

main().catch((e) => {
  console.error("smoke test crashed:", e);
  process.exit(1);
});
