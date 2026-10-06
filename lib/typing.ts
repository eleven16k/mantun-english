"use client";

/**
 * lib/typing.ts — 抽卡打字馆的客户端内核（机制启发 TypeWords，零代码复用）。
 *
 * - 数据：WordBook（词书，单文件自包含，content/typing/ 下随仓分发）。
 * - 卡牌：单词卡即收集物；四步法（跟打→辨认→听写→默写）通关逐步升星
 *   N→R→SR→SSR（SSR = 已掌握）。升星即重排复习到期（FSRS-lite 档：
 *   +1/+3/+7/+30 天），到期词走「复习卡池」优先抽取。
 * - 服务端同步：登录态经 mergeServerCards 拉取合并（stage 取 max），
 *   通关事件 fire-and-forget 上报 /api/typing/cards。
 * - 进度：localStorage `lexi-typing-v1`（卡牌/抽卡历史），仿句法馆分桶模式，
 *   不进 useGameStore——渲染层首帧固定默认值、挂载后读取（hydration 安全）。
 * - 经济：通关走 registerEconomySubmitter 上报 /api/economy（wordId 形如
 *   `typing:<bookId>:<en>`），金币/提分值/弱点本全部复用既有口径。
 */

// ─── 词书 ───

export interface WordEntry {
  en: string;
  cn: string;
  phonetic?: string;
  pos?: string;
  difficulty: 1 | 2 | 3;
  /** AI 例句（gen-examples.mjs 产物，词书加载时按词合并；可能缺省） */
  example?: string;
  exampleCn?: string;
}

export interface WordBook {
  id: string;
  name: string;
  nameEn: string;
  desc: string;
  words: WordEntry[];
}

// ─── 卡牌 ───

export const RARITIES = ["N", "R", "SR", "SSR"] as const;
export type Rarity = (typeof RARITIES)[number];

/** 稀有度 = 掌握阶段：0 跟打(N) / 1 辨认(R) / 2 听写(SR) / 3 默写(SSR) */
export const STEP_RARITY: Record<TypingStepId, number> = {
  follow: 0,
  identify: 1,
  listen: 2,
  dictation: 3,
};

export const RARITY_META: Record<Rarity, { color: string; bg: string; label: string }> = {
  N: { color: "#94A3B8", bg: "#F1F5F9", label: "N" },
  R: { color: "#2563EB", bg: "#DBEAFE", label: "R" },
  SR: { color: "#7C3AED", bg: "#EDE9FE", label: "SR" },
  SSR: { color: "#B45309", bg: "#FEF3C7", label: "SSR" },
};

export interface WordCard {
  /** `${bookId}:${en}` */
  key: string;
  bookId: string;
  /** 已通关的最高步骤（0=跟打过，3=默写过=SSR） */
  stage: number;
  /** 本卡累计打错次数（受损卡依据） */
  wrongCount: number;
  drawnAt: number;
  /** 下次复习到期时间（FSRS-lite：升星时按 stage 定间隔；缺省=立即到期） */
  nextReviewAt?: number;
}

/** 升星后的复习间隔（天）——FSRS-lite 简化档：N+1 / R+3 / SR+7 / SSR+30 */
const REVIEW_INTERVAL_DAYS = [1, 3, 7, 30];
const DAY_MS = 86400000;

export function scheduleReview(stage: number, from = Date.now()): number {
  const days = REVIEW_INTERVAL_DAYS[Math.min(Math.max(stage, 0), 3)];
  return from + days * DAY_MS;
}

export function cardRarity(card: WordCard): Rarity {
  // stage<0 防御（历史脏数据/异常卡）：钳到 N，避免 RARITIES[-1] 越界白屏
  return RARITIES[Math.min(Math.max(card.stage, 0), 3)];
}

// ─── 练习流程（M1：follow + dictation；identify/listen M2 接入）───

export type TypingStepId = "follow" | "identify" | "listen" | "dictation";

export const TYPING_STEPS: TypingStepId[] = ["follow", "identify", "listen", "dictation"];

export interface TypingStep {
  id: TypingStepId;
  /** 本步词表（dictation 步乱序） */
  words: WordEntry[];
}

export interface TypingCursor {
  stepIndex: number;
  wordIndex: number;
}

/** 当前卡牌需要练的步骤集合：从已通关的下一步开始到 dictation（已 SSR 的词无步可练） */
export function stepsForWord(card: WordCard | undefined): TypingStepId[] {
  const start = card ? card.stage + 1 : 0;
  return start > 3 ? [] : TYPING_STEPS.slice(start, 4);
}

export function cursorDone(steps: TypingStep[], cursor: TypingCursor): boolean {
  return cursor.stepIndex >= steps.length;
}

// ─── 判定（纯函数，可单测）───

/** 打字判定：去首尾空白 + 不区分大小写（儿童宽容口径；TypeWords 严格原文，我们对齐 app 现有 fill-blank 的宽松度） */
export function typingMatch(target: string, input: string): boolean {
  return input.trim().toLowerCase() === target.trim().toLowerCase();
}

// ─── 抽卡 ───

export const DRAW_SIZE = 10;

/**
 * 一次抽卡：未收集词优先（随机），不足 DRAW_SIZE 用未满 SSR 的词补位
 * （自然形成「复练到满星」）。词数不足时全量返回。
 * opts.dueFirst=true 时到期复习词（nextReviewAt 已过 / 缺省）排最前——「复习卡池」。
 */
export function drawWords(
  book: WordBook,
  cards: Record<string, WordCard>,
  n = DRAW_SIZE,
  opts?: { dueFirst?: boolean; now?: number },
): WordEntry[] {
  const now = opts?.now ?? Date.now();
  const isNew = (w: WordEntry) => !cards[cardKey(book.id, w.en)];
  const notMaxed = (w: WordEntry) => {
    const c = cards[cardKey(book.id, w.en)];
    return c && c.stage < 3;
  };
  const isDue = (w: WordEntry) => {
    const c = cards[cardKey(book.id, w.en)];
    return !!c && (c.nextReviewAt === undefined || c.nextReviewAt <= now);
  };
  const fresh = book.words.filter(isNew).sort(() => Math.random() - 0.5);
  const refill = book.words.filter(notMaxed).sort(() => Math.random() - 0.5);
  const pool = [...fresh, ...refill];
  if (opts?.dueFirst) {
    const due = pool.filter(isDue);
    const rest = pool.filter((w) => !isDue(w));
    return [...due, ...rest].slice(0, n);
  }
  return pool.slice(0, n);
}

/** 到期复习词数（主页「到期卡池」角标；含未抽过的新词不算，只算已收集卡） */
export function dueCount(book: WordBook, cards: Record<string, WordCard>, now = Date.now()): number {
  let n = 0;
  for (const w of book.words) {
    const c = cards[cardKey(book.id, w.en)];
    if (c && c.stage < 3 && (c.nextReviewAt === undefined || c.nextReviewAt <= now)) n++;
  }
  return n;
}

/** 辨认步 4 选 1：干扰项取同词书其他词释义（cn 去重），不足任意补齐 */
export function makeIdentifyChoices(book: WordBook, word: WordEntry): string[] {
  const seen = new Set([word.cn]);
  const distract: string[] = [];
  for (const w of [...book.words].sort(() => Math.random() - 0.5)) {
    if (distract.length >= 3) break;
    if (!seen.has(w.cn)) {
      seen.add(w.cn);
      distract.push(w.cn);
    }
  }
  return [word.cn, ...distract].sort(() => Math.random() - 0.5);
}

export function cardKey(bookId: string, en: string): string {
  return `${bookId}:${en.toLowerCase()}`;
}

// ─── 进度持久化（localStorage，lexi-typing-v1）───

export interface TypingProgress {
  v: 1;
  cards: Record<string, WordCard>;
  /** 累计抽卡次数（展示用） */
  draws: number;
  /** 最近一次抽卡的词（gacha 视图动画用，不持久化也行，方便断点） */
  lastDraw: { bookId: string; keys: string[]; at: number } | null;
}

const KEY = "lexi-typing-v1";

function emptyProgress(): TypingProgress {
  return { v: 1, cards: {}, draws: 0, lastDraw: null };
}

export function readProgress(): TypingProgress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TypingProgress;
      if (parsed && parsed.v === 1 && parsed.cards) return parsed;
    }
  } catch {
    /* corrupted — reset */
  }
  return emptyProgress();
}

export function writeProgress(p: TypingProgress) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* quota — ignore */
  }
}

/** 记录一次通关：升星（只升不降）+ 累计错误 + 重排复习到期。返回更新后的卡。 */
export function passStep(p: TypingProgress, bookId: string, en: string, stepId: TypingStepId): WordCard {
  const key = cardKey(bookId, en);
  const existing = p.cards[key];
  const stage = Math.max(existing?.stage ?? -1, STEP_RARITY[stepId]);
  const card: WordCard = {
    key,
    bookId,
    stage,
    wrongCount: existing?.wrongCount ?? 0,
    drawnAt: existing?.drawnAt ?? Date.now(),
    nextReviewAt: scheduleReview(stage),
  };
  p.cards[key] = card;
  return card;
}

/** 服务端卡牌合并（登录拉取）：stage/wrongCount 取双方最大值，lastWriteWins 于其余字段 */
export function mergeServerCards(
  p: TypingProgress,
  serverCards: { bookId: string; en: string; stage: number; wrongCount: number; nextReviewAt?: number }[],
): TypingProgress {
  const next = { ...p, cards: { ...p.cards } };
  for (const sc of serverCards) {
    const key = cardKey(sc.bookId, sc.en);
    const local = next.cards[key];
    if (!local || sc.stage > local.stage) {
      next.cards[key] = {
        key,
        bookId: sc.bookId,
        stage: sc.stage,
        wrongCount: Math.max(local?.wrongCount ?? 0, sc.wrongCount),
        drawnAt: local?.drawnAt ?? Date.now(),
        nextReviewAt: sc.nextReviewAt,
      };
    } else if (sc.wrongCount > local.wrongCount) {
      next.cards[key] = { ...local, wrongCount: sc.wrongCount };
    }
  }
  return next;
}

// ─── 统计（图鉴/主页展示）───

export function bookStats(book: WordBook, p: TypingProgress) {
  const byRarity = { N: 0, R: 0, SR: 0, SSR: 0 } as Record<Rarity, number>;
  let collected = 0;
  for (const w of book.words) {
    const c = p.cards[cardKey(book.id, w.en)];
    if (c) {
      collected++;
      byRarity[cardRarity(c)]++;
    }
  }
  return { total: book.words.length, collected, byRarity, rate: book.words.length ? collected / book.words.length : 0 };
}
