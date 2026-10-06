#!/usr/bin/env node
/**
 * gen-typing-wordbook.mjs — ECDICT(MIT) → 抽卡打字馆词书 JSON。
 * 用法: node scripts/gen-typing-wordbook.mjs <ecdict.csv> <tag> <limit> <out.json>
 *   tag=zk|gk|cet4|cet6|ky|toefl|ielts|gre → 对应标签词书（limit 99999=全量）
 *   tag=freq                               → 全库词频 top <limit>（BNC/FRICO 排序，无视标签）
 * 输出 WordBook JSON（content 元数据 + words），放 public/typing-dicts/ 供运行时按需 fetch。
 *
 * 选取口径：tag 精确命中（如 zk=中考）→ 按 BNC/FRICO 词频排名升序（0 视为最末）
 * → 取前 limit 词。释义取 translation 首行（剥 [网络]/[计] 等领域行），pos 从前缀提取。
 */
import { readFileSync, writeFileSync } from "node:fs";

const [csvPath = "/tmp/ecdict.csv", tag = "zk", limit = "300", outPath = "public/typing-dicts/zk.json"] =
  process.argv.slice(2);

const raw = readFileSync(csvPath, "utf8");

// CSV 解析：字段内含引号包裹的换行/逗号（translation 是多行文本）
function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQ = false;
      } else cur += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ",") {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out;
}

const COLS = ["word", "phonetic", "definition", "translation", "pos", "collins", "oxford", "tag", "bnc", "frq", "exchange", "detail", "audio"];
const lines = raw.split("\n");
const header = parseCsvLine(lines[0].replace(/\r$/, ""));
const idx = Object.fromEntries(COLS.map((c) => [c, header.indexOf(c)]));

// 功能词不打字卡（虚词/代词/系动词/情态动词——无拼写训练价值）
const STOPWORDS = new Set(["a","an","the","and","or","but","of","to","in","on","at","for","with","by","from","as","is","are","was","were","be","been","being","am","do","does","did","it","its","this","that","these","those","he","she","they","we","you","i","his","her","their","our","your","my","not","no","so","if","then","than","there","here","when","what","which","who","how","why","all","any","some","such","own","same","too","very","can","will","just","don","should","now","would","could","might","must","shall","me","us","him"]);
// 领域标签行（[计]/[医]/[化]…）非学习释义
const DOMAIN_RE = /^\[.{1,3}\]/;

// 内容安全黑名单：粗俗/不当词不入词书与词典（少年可达内容，零容忍）
const VULGAR = new Set(["nigger","nigga","fuck","fucking","fuckin","motherfucker","fucker","fucked","shit","shitty","bullshit","dick","dickhead","pussy","cunt","cuntface","twat","wanker","bastard","bitch","whore","slut","rape","rapist","penis","vagina","cock","tits","asshole","arsehole","fag","faggot","kike","spic","chink","gook","retard","spastic","cocksucker","blowjob","handjob","jizz","cum","smegma","dildo","buttplug","scrotum","testicle","labia","clitoris","homo","dyke","tranny","paki","gook","gyp","jap","chinaman","coolie","halfcaste"]);


const entries = [];
for (let li = 1; li < lines.length; li++) {
  const line = lines[li];
  if (!line || line === "\r") continue;
  const cols = parseCsvLine(line.replace(/\r$/, ""));
  const word = cols[idx.word];
  const frq = parseInt(cols[idx.frq], 10) || 0;
  const bnc = parseInt(cols[idx.bnc], 10) || 0;
  const exchange = cols[idx.exchange] || "";
  if (exchange.startsWith("0:")) continue; // 曲折形（-ed/-ing/-s 变体），只收原形
  if (tag === "freq") {
    // 词频书：全库按 BNC/FRICO 排名（有任一即可），不看标签
    if (!frq && !bnc) continue;
    if (!/^[a-z][a-z'-]*[a-z]$|^[a-z]$/.test(word)) continue;
    if (STOPWORDS.has(word)) continue;
  if (VULGAR.has(word)) continue;
    const translationRaw = (cols[idx.translation] || "").split(/\\n/).map((l) => l.trim()).filter((l) => l && !l.includes("[网络]") && !DOMAIN_RE.test(l));
    if (translationRaw.length === 0) continue;
    const first = translationRaw[0].trim();
    const posMatch = first.match(/^((?:(?:n|v|vt|vi|adj|adv|prep|conj|pron|int|art|num|abbr|aux|a)\.)\s*(?:&\s*\w+\.\s*)?)/i);
    const pos = posMatch ? posMatch[1].trim() : "";
    let cn = (pos ? first.slice(pos.length) : first).trim().replace(/[；;]\s*$/, "").replace(/\\r|\\n/g, " ").replace(/\s+/g, " ").trim();
    if (!cn) continue;
    entries.push({ en: word, cn: cn.length > 30 ? cn.slice(0, 28) + "…" : cn, phonetic: cols[idx.phonetic] ? `/${cols[idx.phonetic]}/` : undefined, pos: pos || undefined, frq, bnc });
    continue;
  }
  const tags = (cols[idx.tag] || "").split(/\s+/);
  if (!tags.includes(tag)) continue;
  // 只收纯字母词（过滤短语/专名/词缀）
  if (!/^[a-z][a-z'-]*[a-z]$|^[a-z]$/.test(word)) continue;
  if (STOPWORDS.has(word)) continue;
  if (VULGAR.has(word)) continue;
  // ECDICT 的 translation 多义行用字面 "\n"（两字符）分隔
  const translationRaw = (cols[idx.translation] || "")
    .split(/\\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.includes("[网络]") && !DOMAIN_RE.test(l));
  if (translationRaw.length === 0) continue;
  const first = translationRaw[0].trim();
  const posMatch = first.match(/^((?:(?:n|v|vt|vi|adj|adv|prep|conj|pron|int|art|num|abbr|aux|a)\.)\s*(?:&\s*\w+\.\s*)?)/i);
  const pos = posMatch ? posMatch[1].trim() : "";
  let cn = (pos ? first.slice(pos.length) : first).trim().replace(/[；;]\s*$/, "");
  // 清残留转义与尾部截断省略号
  cn = cn.replace(/\\r|\\n/g, " ").replace(/\s+/g, " ").trim();
  if (!cn) continue;
  entries.push({
    en: word,
    cn: cn.length > 30 ? cn.slice(0, 28) + "…" : cn,
    phonetic: cols[idx.phonetic] ? `/${cols[idx.phonetic]}/` : undefined,
    pos: pos || undefined,
    frq,
    bnc,
  });
}

// 词频排名升序（无数据排最末），取前 limit
entries.sort((a, b) => {
  const ra = a.frq || a.bnc || 1e9;
  const rb = b.frq || b.bnc || 1e9;
  return ra - rb;
});
const picked = entries.slice(0, parseInt(limit, 10));

// difficulty: frq<=3000 → 1，<=8000 → 2，其余 3
const difficulty = (e) => ((e.frq && e.frq <= 3000) || (!e.frq && e.bnc && e.bnc <= 3000) ? 1 : (e.frq && e.frq <= 8000) || (!e.frq && e.bnc && e.bnc <= 8000) ? 2 : 3);

const TAG_NAMES = { zk: "中考核心词", gk: "高考核心词", cet4: "四级核心词", cet6: "六级核心词", ky: "考研核心词", toefl: "托福核心词", ielts: "雅思核心词", gre: "GRE 核心词", freq: "通用高频词" };
const TAG_NAMES_EN = { zk: "Junior High Core", gk: "Senior High Core", cet4: "CET-4 Core", cet6: "CET-6 Core", ky: "KAoyan Core", toefl: "TOEFL Core", ielts: "IELTS Core", gre: "GRE Core", freq: "Frequency Top" };
const bookId = tag === "freq" ? `freq-top${limit}` : tag;

const book = {
  id: bookId,
  name: TAG_NAMES[tag] ?? tag,
  nameEn: TAG_NAMES_EN[tag] ?? tag,
  desc: `ECDICT ${tag} · 词频排序 · ${picked.length} 词`,
  words: picked.map((e) => ({ en: e.en, cn: e.cn, phonetic: e.phonetic ?? "", pos: e.pos ?? "", difficulty: difficulty(e) })),
};

writeFileSync(outPath, JSON.stringify(book));
console.log(`OK: ${picked.length} words (pool=${entries.length}) → ${outPath}`);
