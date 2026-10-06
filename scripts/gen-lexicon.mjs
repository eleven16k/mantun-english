#!/usr/bin/env node
/**
 * gen-lexicon.mjs — ECDICT(MIT) → 全站统一词典索引 lexicon.json。
 * 用法: node scripts/gen-lexicon.mjs /tmp/ecdict.csv public/typing-dicts/lexicon.json
 *
 * 结构：{ "word": { cn, phonetic, pos, difficulty, tags: "zk,gk,…" } , ... }（核心口径 ~4 万条）
 * 口径与 gen-typing-wordbook 一致：只收原形纯字母词、剥领域释义行、停用词剔除。
 * tags ∈ zk/gk/cet4/cet6/ky/toefl/ielts/gre；difficulty 按词频 1/2/3 档。
 */
import { readFileSync, writeFileSync } from "node:fs";

const [csvPath = "/tmp/ecdict.csv", outPath = "public/typing-dicts/lexicon.json"] = process.argv.slice(2);
const raw = readFileSync(csvPath, "utf8");

function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQ) {
      if (ch === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++; } else inQ = false;
      } else cur += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ",") { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}

const COLS = ["word", "phonetic", "definition", "translation", "pos", "collins", "oxford", "tag", "bnc", "frq", "exchange", "detail", "audio"];
const lines = raw.split("\n");
const header = parseCsvLine(lines[0].replace(/\r$/, ""));
const idx = Object.fromEntries(COLS.map((c) => [c, header.indexOf(c)]));

const STOPWORDS = new Set(["a","an","the","and","or","but","of","to","in","on","at","for","with","by","from","as","is","are","was","were","be","been","being","am","do","does","did","it","its","this","that","these","those","he","she","they","we","you","i","his","her","their","our","your","my","not","no","so","if","then","than","there","here","when","what","which","who","how","why","all","any","some","such","own","same","too","very","can","will","just","don","should","now","would","could","might","must","shall","me","us","him"]);
const DOMAIN_RE = /^\[.{1,3}\]/;

const lexicon = {};
for (let li = 1; li < lines.length; li++) {
  const line = lines[li];
  if (!line || line === "\r") continue;
  const cols = parseCsvLine(line.replace(/\r$/, ""));
  const word = cols[idx.word];
  if (!/^[a-z][a-z'-]*[a-z]$|^[a-z]$/.test(word)) continue;
  if (STOPWORDS.has(word)) continue;
  if ((cols[idx.exchange] || "").startsWith("0:")) continue; // 曲折形
  const tags = (cols[idx.tag] || "").split(/\s+/).filter((t) => ["zk","gk","cet4","cet6","ky","toefl","ielts","gre"].includes(t));
  const frq = parseInt(cols[idx.frq], 10) || 0;
  const bnc = parseInt(cols[idx.bnc], 10) || 0;
  if (tags.length === 0 && !frq) continue; // 核心口径：考试标签或有 FRICO 词频
  const translationRaw = (cols[idx.translation] || "").split(/\\n/).map((l) => l.trim()).filter((l) => l && !l.includes("[网络]") && !DOMAIN_RE.test(l));
  if (translationRaw.length === 0) continue;
  const first = translationRaw[0].trim();
  const posMatch = first.match(/^((?:(?:n|v|vt|vi|adj|adv|prep|conj|pron|int|art|num|abbr|aux|a)\.)\s*(?:&\s*\w+\.\s*)?)/i);
  const pos = posMatch ? posMatch[1].trim() : "";
  let cn = (pos ? first.slice(pos.length) : first).trim().replace(/[；;]\s*$/, "").replace(/\\r|\\n/g, " ").replace(/\s+/g, " ").trim();
  if (!cn) continue;
  const difficulty = (frq && frq <= 3000) || (!frq && bnc && bnc <= 3000) ? 1 : (frq && frq <= 8000) || (!frq && bnc && bnc <= 8000) ? 2 : 3;
  // 同词重复行：已有条目且新行无词频 → 保留旧条
  if (lexicon[word] && frq === 0) continue;
  lexicon[word] = { cn: cn.length > 40 ? cn.slice(0, 38) + "…" : cn, phonetic: cols[idx.phonetic] ? `/${cols[idx.phonetic]}/` : "", pos, difficulty, tags: tags.join(",") };
}

writeFileSync(outPath, JSON.stringify(lexicon));
// 同步输出服务端副本（mt-teach-api 词库直查：wordquest 释义/干扰项免 LLM）
writeFileSync("../mt-teach-api/lib/lexicon.json", JSON.stringify(lexicon));
console.log(`OK: ${Object.keys(lexicon).length} entries → ${outPath} + ../mt-teach-api/lib/lexicon.json`);
