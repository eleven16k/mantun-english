#!/usr/bin/env node
/**
 * generate-content.mjs — 悦读馆课文/听写题生成器（内容全部自产，CC 红线：不复制
 * magic-english-buddy 任何课文）。按 content/reading/blueprints/*.json 蓝图逐篇生成，
 * 可断点续跑（已存在且 >1KB 的故事文件自动跳过）。
 *
 * 用法：
 *   node scripts/reading/generate-content.mjs                          # 全部缺口
 *   node scripts/reading/generate-content.mjs --track=xiaoshengchu    # 单学段
 *   node scripts/reading/generate-content.mjs --region=zk-r3 --limit=4
 *   node scripts/reading/generate-content.mjs --assemble              # 生成后合成 data-*.ts
 * 环境变量：DEEPSEEK_API_KEY（或 LLM_API_KEY 网关），未配置时自动读 mt-teach-api/.env.local。
 */

import fs from "node:fs";
import path from "node:path";
import {
  ROOT, BP_DIR, STORIES_DIR, TRACKS, loadBlueprints, loadApiEnv,
  validateStory, loadVocab, storyPath, readJson,
} from "./shared.mjs";

const args = process.argv.slice(2);
const arg = (name, dflt) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : dflt;
};
const hasFlag = (name) => args.includes(`--${name}`);

const CONCURRENCY = Number(arg("concurrency", 4));
const RETRIES = 3;
const assembleOnly = hasFlag("assemble");

// ─── LLM 调用（DeepSeek 优先，旧网关回退）───

function llmEndpoints(env) {
  const list = [];
  if (env.DEEPSEEK_API_KEY)
    list.push({
      name: "deepseek",
      baseUrl: (env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com").replace(/\/+$/, ""),
      key: env.DEEPSEEK_API_KEY,
      model: env.DEEPSEEK_MODEL ?? "deepseek-chat",
    });
  if (env.LLM_API_KEY)
    list.push({
      name: "gateway",
      baseUrl: (env.LLM_BASE_URL ?? "").replace(/\/+$/, ""),
      key: env.LLM_API_KEY,
      model: env.LLM_MODEL ?? "gpt-4o-mini",
    });
  return list;
}

async function llmJson(endpoints, system, user) {
  let lastErr = new Error("no provider");
  for (const ep of endpoints) {
    for (let attempt = 0; attempt < RETRIES; attempt++) {
      try {
        const res = await fetch(`${ep.baseUrl}/chat/completions`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${ep.key}` },
          body: JSON.stringify({
            model: ep.model,
            stream: false,
            temperature: 0.8,
            max_tokens: 8000,
            response_format: { type: "json_object" },
            messages: [
              { role: "system", content: system },
              { role: "user", content: user },
            ],
          }),
          signal: AbortSignal.timeout(300_000),
        });
        if (!res.ok) throw new Error(`${ep.name} HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
        const data = await res.json();
        const msg = data.choices?.[0]?.message ?? {};
        // 推理模型：内容可能落在 reasoning_content 或内联 <think> 块（与 server/llm.ts 同规则）
        const content = String(msg.content ?? msg.reasoning_content ?? "")
          .replace(/^\s*<think>[\s\S]*?<\/think>\s*/i, "")
          .trim();
        if (!content) throw new Error(`${ep.name} 空响应`);
        try {
          return JSON.parse(content);
        } catch {
          // 截断/包裹容错：抓第一个 {...} 块再试
          const m = content.match(/\{[\s\S]*\}/);
          if (!m) throw new Error(`${ep.name} 无 JSON: ${content.slice(0, 120)}`);
          return JSON.parse(m[0]);
        }
      } catch (e) {
        lastErr = e;
        console.warn(`  [${ep.name}] 第 ${attempt + 1} 次失败: ${String(e.message ?? e).slice(0, 160)}`);
        await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
      }
    }
  }
  throw lastErr;
}

// ─── 提示词 ───

const SYSTEM = `你是一位资深中国 K12 英语分级读物作者兼命题人。你写的课文语言地道、难度精准、内容原创且对青少年读者安全健康（无暴力、恐怖、恋爱、宗教、政治敏感内容）。你必须只输出一个 JSON 对象，不要输出任何其他文字。`;

function quizSchema(per) {
  return `quiz: 恰好 ${per} 题，题型与配比按下方要求。每种题型规则：
- image_choice: {"type":"image_choice","question":"英文问题","audioText":"要朗读的问题文本","options":[{"emoji":"🔴","value":"red","text":"Red"},…],"answer":"正确选项 value"}；3 个选项，emoji 贴合语义
- word_builder: {"type":"word_builder","word":"课文中3-10个字母的关键词(小写)","audioText":"该单词"}；全局小写、不含空格
- sentence_order: {"type":"sentence_order","correctOrder":["逐词数组",…],"audioText":"整句原文(含标点)"}；必须是课文原句 3-8 词
- fill_blank: {"type":"fill_blank","sentenceWithBlank":"含 ___ 的句子(空格处挖空一个词)","choices":["3个选项",…],"answer":"正确选项","audioText":"完整正确句子"}
audioText 一律纯文本（读给学生听的），不含 emoji。`;
}

function buildUserPrompt(bp, region, storyNo, storyTotal, prevTitles) {
  const [lo, hi] = region.sentenceLen;
  const [pLo, pHi] = region.paraCount;
  const mixLines = Object.entries(region.quizMix)
    .map(([t, r]) => `  ${t}: 约 ${Math.round(r * 100)}%`)
    .join("\n");
  return `请为一节英语分级阅读课创作内容。

【学段】${bp.label}（${bp.vocabTier}）
【主题区】${region.name}（${region.cnName}）${region.icon}，全区共 ${storyTotal} 课，本篇是第 ${storyNo} 课${region.stories > 8 && storyNo <= Math.ceil(storyTotal / 2) ? "（区内前半，难度取下限）" : region.stories > 8 ? "（区内后半，难度取上限）" : ""}
【题材】${region.genre}
【语法重点】${region.grammar}
【句均词数】${lo}-${hi} 词
【段落数】${pLo}-${pHi} 段
【题型配比】\n${mixLines}
${prevTitles.length ? `【本区已有课标题，务必换新题材】${prevTitles.join(" / ")}` : ""}

输出 JSON 结构：
{
 "id": "${region.id}-s${String(storyNo).padStart(2, "0")}",
 "track": "${bp.track}",
 "regionId": "${region.id}",
 "order": ${storyNo},
 "title": "英文标题（简洁，首字母大写）",
 "titleCn": "中文标题",
 "coverEmoji": "单个 emoji 封面",
 "paragraphs": [{"text":"英文段落","translation":"对应中文翻译（自然通顺，意译不硬译）"}…],
 ${quizSchema(bp.quizPerStory).replace(/\n/g, "")}
}

硬性要求：
1. 全部 ${bp.quizPerStory} 题的答案必须能从课文中直接推出或读出，不依赖课外知识。
2. ${quizSchema(bp.quizPerStory).includes("sentence_order") ? "sentence_order 的句子逐词取自课文原句（保留原词序）。" : ""}
3. 词汇严格控制在${bp.vocabTier}；超纲派生词尽量少。
4. 课文内容完整有趣，段落之间有自然衔接；title 不与已有课重复。`;
}

// ─── 生成主流程 ───

function existingTitles(trackDir, regionId) {
  if (!fs.existsSync(trackDir)) return [];
  return fs
    .readdirSync(trackDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => { try { return readJson(path.join(trackDir, f)); } catch { return null; } })
    .filter((s) => s?.regionId === regionId)
    .map((s) => s.title);
}

async function pool(items, worker) {
  const queue = [...items];
  const runners = Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length) {
      const item = queue.shift();
      await worker(item);
    }
  });
  await Promise.all(runners);
}

async function main() {
  const env = loadApiEnv();
  const endpoints = llmEndpoints(env);
  if (!assembleOnly && endpoints.length === 0) {
    console.error("未找到 DEEPSEEK_API_KEY / LLM_API_KEY（process.env 或 mt-teach-api/.env.local）");
    process.exit(1);
  }

  const bps = loadBlueprints().filter((bp) => !arg("track") || bp.track === arg("track"));
  let generated = 0, skipped = 0, failed = 0;

  for (const bp of bps) {
    const trackDir = path.join(STORIES_DIR, bp.track);
    fs.mkdirSync(trackDir, { recursive: true });
    const vocab = loadVocab(bp.track);
    const jobs = [];
    for (const region of bp.regions) {
      if (arg("region") && region.id !== arg("region")) continue;
      for (let n = 1; n <= region.stories; n++) {
        const storyId = `${region.id}-s${String(n).padStart(2, "0")}`;
        const file = storyPath(bp.track, storyId);
        if (!hasFlag("force") && fs.existsSync(file) && fs.statSync(file).size > 1000) { skipped++; continue; }
        jobs.push({ bp, region, n, storyId, file });
      }
    }
    if (arg("limit")) jobs.length = Math.min(jobs.length, Number(arg("limit")));
    console.log(`[${bp.track}] 待生成 ${jobs.length} 篇（跳过已有 ${skipped}）`);

    let done = 0;
    await pool(jobs, async (job) => {
      const titles = existingTitles(trackDir, job.region.id);
      const user = buildUserPrompt(job.bp, job.region, job.n, job.region.stories, titles.slice(-20));
      for (let try_ = 0; try_ < RETRIES + 1; try_++) {
        try {
          const story = await llmJson(endpoints, SYSTEM, user);
          const v = validateStory(story, job.bp, job.region, vocab);
          if (!v.ok) throw new Error(`校验失败: ${v.errors.join("; ")}`);
          fs.writeFileSync(job.file, JSON.stringify(story, null, 2) + "\n");
          generated++; done++;
          const warn = v.warnings.length ? ` ⚠ ${v.warnings[0].slice(0, 80)}` : "";
          console.log(`  ✓ ${job.storyId} ${story.title} (${done}/${jobs.length})${warn}`);
          return;
        } catch (e) {
          if (try_ === RETRIES) {
            failed++; done++;
            console.error(`  ✗ ${job.storyId} 放弃: ${String(e.message ?? e).slice(0, 140)} (${done}/${jobs.length})`);
          }
        }
      }
    });
  }
  console.log(`\n完成：生成 ${generated}，跳过 ${skipped}，失败 ${failed}`);
  if (failed > 0 || hasFlag("assemble")) assemble();
}

// ─── 合成 content/reading/data-{track}.ts + index.ts ───

function assemble() {
  const bps = loadBlueprints();
  const FILE_BY_TRACK = { xiaoshengchu: "data-xsc.ts", zhongkao: "data-zk.ts", gaokao: "data-gk.ts" };
  for (const bp of bps) {
    const trackDir = path.join(STORIES_DIR, bp.track);
    const files = fs.existsSync(trackDir) ? fs.readdirSync(trackDir).filter((f) => f.endsWith(".json")) : [];
    const stories = files
      .map((f) => readJson(path.join(trackDir, f)))
      .map((s) => ({
        // 白名单清洗：LLM 偶尔会带出多余顶层字段（如 "type": "json_object"）
        id: s.id,
        track: s.track,
        regionId: s.regionId,
        order: s.order,
        title: s.title,
        titleCn: s.titleCn,
        coverEmoji: s.coverEmoji ?? "",
        paragraphs: (s.paragraphs ?? []).map((p) => ({ text: p.text, translation: p.translation })),
        quiz: (s.quiz ?? []).map(({ type, question, audioText, options, answer, word, correctOrder, sentenceWithBlank, choices }) =>
          type === "image_choice" ? { type, question, audioText, options, answer }
          : type === "word_builder" ? { type, word, audioText }
          : type === "sentence_order" ? { type, correctOrder, audioText }
          : { type, sentenceWithBlank, choices, answer, audioText }),
      }))
      .sort((a, b) => (a.regionId === b.regionId ? a.order - b.order : a.regionId.localeCompare(b.regionId)));
    const regions = bp.regions.map(({ quizMix, sentenceLen, paraCount, grammar, genre, stories: n, ...meta }) => ({
      ...meta,
      storyCount: n,
    }));
    const ts = `/**
 * 悦读馆内容包（${bp.label}）——由 scripts/reading/generate-content.mjs 按蓝图生成，
 * 内容全部自产，请勿手工编辑本文件；改蓝图后重新生成。
 */

import type { ReadingRegion, ReadingRegionSet, ReadingStory } from "./types";

export const REGION_SET: ReadingRegionSet = {
  track: "${bp.track}",
  theme: "${bp.theme}",
  cnLabel: "${bp.cnName}",
  regions: ${JSON.stringify(regions, null, 2)},
};

export const STORIES: ReadingStory[] = ${JSON.stringify(stories, null, 2)};
`;
    const out = path.join(ROOT, "content", "reading", FILE_BY_TRACK[bp.track]);
    fs.writeFileSync(out, ts);
    console.log(`合成 ${path.relative(ROOT, out)}：${stories.length} 篇 / ${regions.length} 区`);
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === import.meta.url.replace("file://", "");
if (isMain && !assembleOnly) main().catch((e) => { console.error(e); process.exit(1); });
else if (assembleOnly) assemble();
