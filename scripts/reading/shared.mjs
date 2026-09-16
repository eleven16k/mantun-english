/**
 * shared.mjs — 悦读馆内容管线共享工具：蓝图加载、env 加载、故事文件校验。
 * 被 generate-content.mjs（生成时逐篇校验）和 validate-content.mjs（全量审计）复用。
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const BP_DIR = path.join(ROOT, "content", "reading", "blueprints");
export const STORIES_DIR = path.join(ROOT, "content", "reading", "stories");
export const TRACKS = ["xiaoshengchu", "zhongkao", "gaokao"];

/** 校验用词表：track → lib/vocab-lists.ts 数组键（低档词表并入高档） */
export const VOCAB_TIERS = {
  xiaoshengchu: ["Primary", "JuniorHigh"],
  zhongkao: ["JuniorHigh"],
  gaokao: ["SeniorHigh", "JuniorHigh"],
};

export function loadBlueprints() {
  return TRACKS.map((t) =>
    JSON.parse(fs.readFileSync(path.join(BP_DIR, `${t}.json`), "utf8"))
  );
}

export function loadApiEnv() {
  const env = { ...process.env };
  const candidates = [
    path.join(ROOT, "..", "mt-teach-api", ".env.local"),
    path.join(ROOT, ".env.local"),
  ];
  for (const p of candidates) {
    try {
      const text = fs.readFileSync(p, "utf8");
      for (const line of text.split("\n")) {
        const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
        if (m && !(m[1] in env)) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
      break;
    } catch {
      /* 尝试下一个 */
    }
  }
  return env;
}

const FUNCTION_WORDS = new Set(
  `a an the this that these those i you he she it we they me him her us them my your his its our their mine yours hers ours
   is am are was were be been being do does did have has had will would can could shall should may might must
   not no nor and or but if so because although though while when where why how what which who whom whose
   there here now then once today tomorrow yesterday very just also too quite rather almost always usually often sometimes never
   yes ok oh hey hi please thanks thank welcome sorry excuse
   mr mrs ms dr one two three four five six seven eight nine ten first second third last next
   in on at to for with by from of about into onto over under above below up down out off again further
   all any both each few more most other some such only own same than
   hello goodbye bye morning afternoon evening night monday tuesday wednesday thursday friday saturday sunday
   january february march april may june july august september october november december
   something anything nothing everything someone anyone everyone somebody anybody nobody`
    .split(/\s+/)
    .filter(Boolean)
);

/** 儿童读物常见人名（分级读物主角名不算超纲词） */
const GIVEN_NAMES = new Set(
  `lily ben mia leo tom anna sam emma lucy jack max amy kim tim sara kate joe ada mei amy hui lin
   mary sue anna jo peter paul nancy david alice grace henry oliver sophia liam noah ella ruby ivy
   may june abby billy kitty bobby wendy victor tony rita nina evan ella yuan lan bao`
    .split(/\s+/)
    .filter(Boolean)
);

/** 儿童分级读物高频「课外词」：动物/童话/太空等题材词（课标表外但属常识词） */
const CHILDREN_WORDS = new Set(
  `dinosaur dinosaurs dino valley footprint footprints submarine dolphin dolphins turtle octopus shark whale penguin
   kangaroo lion tiger zebra giraffe gorilla seal walrus crab jellyfish seahorse coral reef cave waterfall meadow
   fairy fairies castle princess knight dragon dragons unicorn wizard witch wand spell potion treasure map pirate
   rocket spaceship planet planets moon mars jupiter saturn galaxy comet meteor astronaut gravity orbit
   cart kite sandbox seesaw slide swing picnic lemonade marshmallow sprinkle cupcake muffin pancakes
   penguin flamingo peacock owl deer rabbit hamster puppy kitten bunny forest jungle island desert
   superhero superheroess mermaid mermaids yeti troll goblin elf elves giant giants phoenix
   podcast video computer laptop tablet headphones robot aliens spaceship`
    .split(/\s+/)
    .filter(Boolean)
);

/** 常见不规则动词过去式 → 原形（词表收原形，覆盖统计需还原） */
const IRREGULAR_PAST = new Map(
  `went go saw see said say took take got get came come found find gave give grew grow made make ran run
   ate eat sat sit stood stand sang sing flew fly swam swim told tell bought buy brought bring thought think
   caught catch taught teach met meet kept keep slept sleep felt feel fell fall rose rise drove drive
   wrote write rode ride won win lost lose sent send spent spend built build heard hear held hold left leave
   meant mean paid pay sold sell became become began begin broke break chose choose drew draw drank drink
   forgot forget hid hide knew know laid lay led lead lit light rang ring shook shake spoke speak
   stole steal struck strike swung swing tore tear threw throw understood understand wore wear wound wind
   dived dive dove dive heard hear crept creep clung cling swung swing flung fling spun spin
   fed feed bled bleed sped speed led lead fled flee`
    .trim()
    .split(/\s+/)
    .reduce((pairs, w, i, arr) => {
      if (i % 2 === 0) pairs.push([w, arr[i + 1]]);
      return pairs;
    }, [])
);

export function tokens(text) {
  return (text.toLowerCase().match(/[a-z']+/g) ?? [])
    .map((w) => w.replace(/^'+|'+$/g, ""))
    .filter(Boolean);
}

/** 词形还原（粗规则 + 不规则动词表，供词表覆盖统计降噪） */
function lemmas(w) {
  const out = new Set([w]);
  const irregular = IRREGULAR_PAST.get(w);
  if (irregular) out.add(irregular);
  if (w.endsWith("ies")) out.add(w.slice(0, -3) + "y");
  if (w.endsWith("es")) out.add(w.slice(0, -2));
  if (w.endsWith("s") && !w.endsWith("ss")) out.add(w.slice(0, -1));
  if (w.endsWith("ed")) {
    out.add(w.slice(0, -1));
    out.add(w.slice(0, -2));
    if (w.endsWith("ied")) out.add(w.slice(0, -3) + "y");
    if (w.endsWith("pped") || w.endsWith("nned") || w.endsWith("gged")) out.add(w.slice(0, -3));
  }
  if (w.endsWith("ing")) {
    out.add(w.slice(0, -3));
    out.add(w.slice(0, -3) + "e");
    if (w.endsWith("pping") || w.endsWith("nning") || w.endsWith("gging")) out.add(w.slice(0, -4));
  }
  if (w.endsWith("er")) out.add(w.slice(0, -2));
  if (w.endsWith("est")) out.add(w.slice(0, -3));
  if (w.endsWith("ly")) out.add(w.slice(0, -2));
  return out;
}

export function loadVocab(track) {
  const src = fs.readFileSync(path.join(ROOT, "lib", "vocab-lists.ts"), "utf8");
  const set = new Set([...FUNCTION_WORDS, ...GIVEN_NAMES, ...CHILDREN_WORDS]);
  for (const key of VOCAB_TIERS[track] ?? []) {
    const re = new RegExp(`${key}:\\s*\\[([^\\]]+)\\]`, "s");
    const m = src.match(re);
    if (!m) throw new Error(`vocab-lists.ts 中找不到词表 ${key}`);
    for (const raw of m[1].matchAll(/"([a-zA-Z' -]+)"/g)) {
      set.add(raw[1].toLowerCase());
      for (const w of raw[1].toLowerCase().split(/[\s-]+/)) if (w) set.add(w);
    }
  }
  return set;
}

/** 单篇故事结构 + 蓝图符合性校验；返回 { ok, errors[], warnings[] } */
export function validateStory(story, bp, region, vocab, opts = {}) {
  const errors = [];
  const warnings = [];
  const t = (s) => typeof s === "string" && s.trim().length > 0;

  if (!t(story.id) || !t(story.track) || !t(story.regionId)) errors.push("缺少 id/track/regionId");
  if (story.track !== bp.track) errors.push(`track 不符: ${story.track}`);
  if (story.regionId !== region.id) errors.push(`regionId 不符: ${story.regionId}`);
  if (!t(story.title) || !t(story.titleCn)) errors.push("缺少 title/titleCn");
  if (!t(story.coverEmoji)) warnings.push("缺少 coverEmoji");

  const [minP, maxP] = region.paraCount;
  if (!Array.isArray(story.paragraphs) || story.paragraphs.length < minP || story.paragraphs.length > maxP + 1)
    errors.push(`段落数 ${story.paragraphs?.length} 超出 ${minP}-${maxP}`);

  for (const [i, p] of (story.paragraphs ?? []).entries()) {
    if (!t(p.text)) errors.push(`段落 ${i} 缺 text`);
    if (!t(p.translation)) errors.push(`段落 ${i} 缺 translation`);
    const n = tokens(p.text ?? "").length;
    if (n < region.sentenceLen[0] * 0.6) warnings.push(`段落 ${i} 句均长过短 (${n})`);
  }

  const quiz = story.quiz ?? [];
  const per = bp.quizPerStory;
  if (quiz.length !== per) errors.push(`题目数 ${quiz.length} ≠ ${per}`);
  const counts = { image_choice: 0, word_builder: 0, sentence_order: 0, fill_blank: 0 };
  for (const [i, q] of quiz.entries()) {
    counts[q.type] = (counts[q.type] ?? 0) + 1;
    if (!t(q.audioText)) errors.push(`题 ${i} 缺 audioText`);
    if (q.type === "image_choice") {
      if (!Array.isArray(q.options) || q.options.length < 3 || q.options.length > 4)
        errors.push(`题 ${i} image_choice 选项数异常`);
      else if (!q.options.some((o) => o.value === q.answer)) errors.push(`题 ${i} 答案不在选项中`);
    } else if (q.type === "word_builder") {
      const w = (q.word ?? "").toLowerCase();
      if (!/^[a-z]{3,12}$/.test(w)) errors.push(`题 ${i} word_builder 词不规范: ${q.word}`);
      if (!tokens(story.paragraphs?.map((p) => p.text).join(" ") ?? "").includes(w))
        warnings.push(`题 ${i} 拼装词不在课文中: ${w}`);
    } else if (q.type === "sentence_order") {
      if (!Array.isArray(q.correctOrder) || q.correctOrder.length < 3 || q.correctOrder.length > 8)
        errors.push(`题 ${i} sentence_order 词数异常`);
      const sent = q.correctOrder?.join(" ").toLowerCase().replace(/[.,!?;:'"]/g, "") ?? "";
      const body = story.paragraphs?.map((p) => p.text).join(" ").toLowerCase().replace(/[.,!?;:'"]/g, "") ?? "";
      if (!body.includes(sent)) warnings.push(`题 ${i} 排序句与课文不完全一致`);
    } else if (q.type === "fill_blank") {
      if (!/\_{2,}/.test(q.sentenceWithBlank ?? "")) errors.push(`题 ${i} fill_blank 缺空格 ___`);
      if (!Array.isArray(q.choices) || q.choices.length !== 3) errors.push(`题 ${i} fill_blank 选项应为 3 个`);
      else if (!q.choices.includes(q.answer)) errors.push(`题 ${i} fill_blank 答案不在选项中`);
    } else {
      errors.push(`题 ${i} 未知题型 ${q.type}`);
    }
  }
  // 题型配比：与蓝图偏差 ≤1 题/类型
  for (const [type, ratio] of Object.entries(region.quizMix)) {
    const target = ratio * per;
    if (Math.abs((counts[type] ?? 0) - target) > 1.01)
      warnings.push(`题型 ${type} 数量 ${counts[type] ?? 0} 偏离配比 ${target.toFixed(1)}`);
  }

  // 词表覆盖
  if (vocab && opts.vocabCheck !== false) {
    const known = vocab;
    const text = story.paragraphs?.map((p) => p.text).join(" ") ?? "";
    const uniq = [...new Set(tokens(text))].filter((w) => !FUNCTION_WORDS.has(w));
    const unknown = uniq.filter((w) => ![...lemmas(w)].some((l) => known.has(l)));
    const coverage = uniq.length ? (uniq.length - unknown.length) / uniq.length : 1;
    if (coverage < 0.85) errors.push(`词表覆盖率 ${(coverage * 100).toFixed(0)}% < 85%（超纲: ${unknown.slice(0, 8).join(", ")}…）`);
    else if (unknown.length > 6) warnings.push(`超纲词 ${unknown.length} 个: ${unknown.slice(0, 10).join(", ")}`);
    story._unknownWords = unknown;
  }

  return { ok: errors.length === 0, errors, warnings };
}

export function storyPath(track, storyId) {
  return path.join(STORIES_DIR, track, `${storyId}.json`);
}

export function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}
