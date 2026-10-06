#!/usr/bin/env node
/**
 * gen-examples.mjs — 词库例句批量生成管线（AI）。
 * 用法: node scripts/gen-examples.mjs [tag=zk]
 * 产物: public/typing-dicts/examples-<tag>.json  →  { en: { example, exampleCn } }
 *
 * 数据源：lexicon.json 的 <tag> 标签词；LLM 配置读 mt-teach-api/.env.local
 * （DEEPSEEK_* 优先，回落 LLM_*）。断点续跑：产物中已有的词自动跳过。
 * 例句必须包含目标词（挖空可行性校验），不合规自动丢弃。
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const TAG = process.argv[2] ?? "zk";
const OUT = `public/typing-dicts/examples-${TAG}.json`;
const API_ROOT = new URL("../../mt-teach-api/", import.meta.url).pathname;

// ── LLM 配置（读 api 的 .env.local；DEEPSEEK 文本模型优先——便宜） ──
function loadEnv() {
  const path = `${API_ROOT}.env.local`;
  if (!existsSync(path)) throw new Error(`missing ${path}`);
  const env = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  const baseUrl = env.DEEPSEEK_BASE_URL || env.LLM_BASE_URL;
  const apiKey = env.DEEPSEEK_API_KEY || env.LLM_API_KEY;
  const model = env.DEEPSEEK_MODEL || env.LLM_MODEL || "deepseek-chat";
  if (!apiKey) throw new Error("no LLM api key in mt-teach-api/.env.local");
  return { baseUrl: baseUrl.replace(/\/+$/, ""), apiKey, model };
}

const lexicon = JSON.parse(readFileSync("public/typing-dicts/lexicon.json", "utf8"));
const words = Object.entries(lexicon)
  .filter(([, e]) => e.tags.split(",").includes(TAG))
  .map(([en]) => en);
const done = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
const todo = words.filter((w) => !done[w]);
console.log(`[examples:${TAG}] total=${words.length} done=${Object.keys(done).length} todo=${todo.length}`);

if (todo.length === 0) {
  console.log("nothing to do");
  process.exit(0);
}

const { baseUrl, apiKey, model } = loadEnv();
console.log(`model=${model} @ ${baseUrl}`);

const BATCH = 12;
let ok = 0, bad = 0;

async function genBatch(batch) {
  const wordList = batch.join(", ");
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      stream: false,
      response_format: { type: "json_object" },
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            'You write example sentences for Chinese middle-school students learning English. For EVERY word given, write ONE simple English sentence (8-14 words, level-appropriate) that CONTAINS the exact word, plus its Chinese translation. Reply ONLY JSON: { "items": [{ "word": string, "example": string, "exampleCn": string }] }. One item per input word, no omissions.',
        },
        { role: "user", content: `Words: ${wordList}` },
      ],
    }),
    signal: AbortSignal.timeout(90_000),
  });
  if (!res.ok) throw new Error(`llm ${res.status}: ${(await res.text()).slice(0, 120)}`);
  const data = await res.json();
  const text = (data.choices?.[0]?.message?.content ?? "").replace(/^\s*<think>[\s\S]*?<\/think>\s*/i, "");
  const parsed = JSON.parse(text);
  return parsed.items ?? [];
}

for (let i = 0; i < todo.length; i += BATCH) {
  const batch = todo.slice(i, i + BATCH);
  try {
    const items = await genBatch(batch);
    for (const it of items) {
      const w = (it.word ?? "").toLowerCase().trim();
      const ex = (it.example ?? "").trim();
      const cn = (it.exampleCn ?? "").trim();
      // 挖空可行性：例句必须含目标词
      if (!w || !ex || !cn || !new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(ex)) {
        bad++;
        continue;
      }
      done[w] = { example: ex, exampleCn: cn };
      ok++;
    }
  } catch (e) {
    console.error(`batch@${i} failed: ${e.message}`);
  }
  // 每 5 批落盘一次（断点续跑）
  if ((i / BATCH) % 5 === 4 || i + BATCH >= todo.length) {
    writeFileSync(OUT, JSON.stringify(done));
    console.log(`  progress: ${ok} ok / ${bad} bad / ${todo.length} todo (${Math.min(i + BATCH, todo.length)}/${todo.length})`);
  }
  await new Promise((r) => setTimeout(r, 300)); // 限速
}

writeFileSync(OUT, JSON.stringify(done));
console.log(`DONE: ${ok} examples written, ${bad} rejected → ${OUT}`);
