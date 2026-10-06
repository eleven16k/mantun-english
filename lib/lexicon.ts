"use client";

/**
 * lib/lexicon.ts — 全站统一词汇检索服务。
 * 数据底座：public/typing-dicts/lexicon.json（ECDICT(MIT) 管线产物，3.6 万核心词条），
 * 首次访问 fetch + 内存缓存（懒加载，未用到词汇的页面零开销）。
 *
 * 消费入口：
 * - lookupLexicon(word)   点词查义
 * - loadLexicon()         需要整本索引的场景（自建选题逻辑）
 * - pickLexiconWords(opts) 按级别/难度/数量抽词（题生成用）
 * 条目口径与词书管线一致（scripts/gen-lexicon.mjs）：原形、无停用词、领域释义已剥。
 */

import type { WordEntry } from "@/lib/typing";
import { BASE_PATH } from "@/lib/config";

export interface LexiconEntry {
  cn: string;
  phonetic: string;
  pos: string;
  difficulty: 1 | 2 | 3;
  /** 考试级别标签，逗号分隔（zk/gk/cet4/cet6/ky/toefl/ielts/gre） */
  tags: string;
}

type LexiconIndex = Record<string, LexiconEntry>;

let indexPromise: Promise<LexiconIndex> | null = null;

export function loadLexicon(): Promise<LexiconIndex> {
  if (!indexPromise) {
    indexPromise = fetch(`${BASE_PATH}/typing-dicts/lexicon.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`lexicon http_${res.status}`);
        return res.json() as Promise<LexiconIndex>;
      })
      .catch((e) => {
        indexPromise = null; // 失败可重试
        throw e;
      });
  }
  return indexPromise;
}

/** 点词查义（词条不存在返回 null） */
export async function lookupLexicon(word: string): Promise<LexiconEntry | null> {
  const idx = await loadLexicon();
  return idx[word.toLowerCase().trim()] ?? null;
}

export interface PickOptions {
  /** 数量 */
  count: number;
  /** 考试级别过滤（如 ["zk"] 只取中考词；空=全部核心词） */
  tags?: string[];
  /** 难度过滤（默认不限） */
  difficulties?: (1 | 2 | 3)[];
  /** 排除这些词（如已收集/本题已用） */
  exclude?: Set<string>;
  /** 最短词长（打字体验：默认 2） */
  minLen?: number;
}

/** 按条件抽词：级别过滤 → 洗牌 → 取前 count。无例句字段，题型需自建例句或避开例句题型。 */
export async function pickLexiconWords(opts: PickOptions): Promise<WordEntry[]> {
  const idx = await loadLexicon();
  const tagSet = opts.tags && opts.tags.length > 0 ? new Set(opts.tags) : null;
  const diffSet = opts.difficulties && opts.difficulties.length > 0 ? new Set(opts.difficulties) : null;
  const minLen = opts.minLen ?? 2;
  const pool: WordEntry[] = [];
  for (const [en, e] of Object.entries(idx)) {
    if (en.length < minLen) continue;
    if (opts.exclude?.has(en)) continue;
    if (tagSet && !e.tags.split(",").some((t) => tagSet.has(t))) continue;
    if (diffSet && !diffSet.has(e.difficulty)) continue;
    pool.push({ en, cn: e.cn, phonetic: e.phonetic, pos: e.pos, difficulty: e.difficulty });
  }
  // 洗牌取前 N
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, opts.count);
}
