"use client";

/**
 * lib/sentence.ts — 句法馆的客户端内核。
 *
 * - 题型核心（纯函数，可单测）：tokenizeSentence（标点附着 token）、
 *   makeWordChips（单词拼图乱序卡）、typingStates（打字逐词/逐字符校验态）、
 *   diffWords + scoreTranscript（口语跟读 LCS 对齐打分，≥0.6 过）。
 * - 进度：localStorage（`lexi-sentence-v1`），按 课 × 玩法 分桶存
 *   {results, idx, clearedAt}——三种玩法进度互不干扰，任一玩法通关即解锁下一课。
 * - 经济：答题走既有 `POST /api/economy`（submitAnswer），wordId 形如
 *   `sent:starter-l1:3` —— 金币/提分值/红心/弱点本/周榜 SP 全部复用；
 *   prompt 带玩法前缀 + 英文原句，弱点本可直接展示。
 */

import { findLesson } from "@/content/sentence/data";

// ─── 纯核心：分词 ───

/** 按空白切词；标点附着在词 token 上（`day.` / `Let's` / `you?`） */
export function tokenizeSentence(en: string): string[] {
  return en.trim().split(/\s+/).filter(Boolean);
}

/** 去标点小写（口语比对口径；撇号保留以支持 Let's / I'm） */
export function normalizeToken(token: string): string {
  return token
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^\p{L}\p{N}']/gu, "")
    .trim();
}

/** 口语转写归一：小写 + 剥标点 + 压空白，返回 token 数组 */
export function normalizeTranscript(text: string): string[] {
  const cleaned = text
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^\p{L}\p{N}\s']/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned ? cleaned.split(" ") : [];
}

// ─── 纯核心：单词拼图 ───

export interface WordChip {
  id: number;
  word: string;
  used: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 词卡乱序（重复词各自独立成卡；与原序相同则重洗一次，2 词句除外） */
export function makeWordChips(en: string): WordChip[] {
  const tokens = tokenizeSentence(en);
  let out = shuffle(tokens.map((word, id) => ({ id, word, used: false })));
  const identical = out.every((c, i) => c.word === tokens[i]);
  if (identical && tokens.length > 2) out = shuffle(out);
  return out;
}

// ─── 纯核心：键盘打字 ───

export type TypingWordStatus = "ok" | "bad" | "current" | "pending";

export interface TypingWordState {
  target: string;
  status: TypingWordStatus;
  /** 仅 current 词：逐字符比对（undefined 位置 = 尚未输入） */
  chars: { ch: string; ok: boolean | undefined }[] | null;
}

/**
 * 打字校验态：按空格切输入；已提交词整词 ok/bad，最后一词逐字符比对。
 * 目标与输入都按严格原文比对（大小写/标点都算——肌肉记忆就是要点）。
 */
export function typingStates(target: string, input: string): TypingWordState[] {
  const tokens = tokenizeSentence(target);
  const rawParts = input.split(" ");
  const trailingSpace = rawParts[rawParts.length - 1] === "";
  const parts = trailingSpace ? rawParts.slice(0, -1) : rawParts;
  const currentIdx = trailingSpace ? -1 : parts.length - 1;

  return tokens.map((tok, i) => {
    const typed = parts[i];
    if (typed === undefined) return { target: tok, status: "pending" as const, chars: null };
    if (i !== currentIdx) {
      return { target: tok, status: (typed === tok ? "ok" : "bad") as TypingWordStatus, chars: null };
    }
    const chars = tok.split("").map((ch, j) => ({ ch, ok: typed[j] === undefined ? undefined : typed[j] === ch }));
    return { target: tok, status: "current" as const, chars };
  });
}

/** 打字整句判定：忽略首尾空白，其余严格一致 */
export function typingDone(target: string, input: string): boolean {
  return input.trim() === target;
}

// ─── 纯核心：口语打分（LCS 对齐）───

export interface DiffResult {
  /** 与目标 token 一一对应的命中位 */
  hits: boolean[];
  /** 说多了的词（未对齐到任何目标 token） */
  extras: string[];
}

/** 最长公共子序列对齐（句长 ≤ ~30 token，O(n²) 无压力） */
export function diffWords(targetTokens: string[], heardTokens: string[]): DiffResult {
  const n = targetTokens.length;
  const m = heardTokens.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] =
        targetTokens[i - 1] === heardTokens[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const hits = new Array<boolean>(n).fill(false);
  const extras: string[] = [];
  let i = n;
  let j = m;
  while (i > 0 && j > 0) {
    if (targetTokens[i - 1] === heardTokens[j - 1]) {
      hits[i - 1] = true;
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      extras.unshift(heardTokens[j - 1]);
      j--;
    }
  }
  while (j > 0) {
    extras.unshift(heardTokens[j - 1]);
    j--;
  }
  return { hits, extras };
}

export interface SpeakScore {
  /** 与原句 token 一一对应的命中位（渲染逐词配色用） */
  perWord: boolean[];
  /** 0..1 命中率 */
  score: number;
  extras: string[];
}

/** 跟读打分：原句与转写各自归一后做 LCS 对齐；命中率 = hits / 目标词数 */
export function scoreTranscript(en: string, transcript: string): SpeakScore {
  const tokens = tokenizeSentence(en);
  const targetNorm = tokens.map(normalizeToken);
  const heard = normalizeTranscript(transcript);
  const { hits, extras } = diffWords(targetNorm, heard);
  const meaningful = targetNorm.filter(Boolean).length || 1;
  return {
    perWord: hits,
    score: hits.filter(Boolean).length / meaningful,
    extras,
  };
}

/** 口语通过阈值（拼读馆小测同款宽严度：说对六成就放行） */
export const SPEAK_PASS_THRESHOLD = 0.6;

// ─── 进度（localStorage；课 × 玩法分桶）───

export type SentenceMode = "puzzle" | "typing" | "speaking";
export const SENTENCE_MODES: SentenceMode[] = ["puzzle", "typing", "speaking"];

export type SentenceResultStatus = "PASSED" | "FAILED";

export interface ModeProgress {
  results: { en: string; status: SentenceResultStatus }[];
  idx: number;
  clearedAt: number | null; // 首通时间
}

export type LessonProgress = Partial<Record<SentenceMode, ModeProgress>>;

interface SentenceStore {
  v: 1;
  lessons: Record<string, LessonProgress>;
  lastMode: Record<string, SentenceMode>; // 每课记住上次玩的玩法（tab 默认值）
}

const KEY = "lexi-sentence-v1";

function readStore(): SentenceStore {
  if (typeof window === "undefined") return { v: 1, lessons: {}, lastMode: {} };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as SentenceStore;
      if (parsed && parsed.v === 1 && parsed.lessons) return parsed;
    }
  } catch {
    /* corrupted — reset */
  }
  return { v: 1, lessons: {}, lastMode: {} };
}

function writeStore(s: SentenceStore) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* quota — ignore */
  }
}

export function getLessonProgress(lessonId: string): LessonProgress {
  return readStore().lessons[lessonId] ?? {};
}

export function getModeProgress(lessonId: string, mode: SentenceMode): ModeProgress | null {
  return readStore().lessons[lessonId]?.[mode] ?? null;
}

export function saveModeProgress(lessonId: string, mode: SentenceMode, p: ModeProgress) {
  const s = readStore();
  const lp = s.lessons[lessonId] ?? {};
  lp[mode] = p;
  s.lessons[lessonId] = lp;
  writeStore(s);
}

export function getLastMode(lessonId: string): SentenceMode | null {
  return readStore().lastMode[lessonId] ?? null;
}

export function saveLastMode(lessonId: string, mode: SentenceMode) {
  const s = readStore();
  s.lastMode[lessonId] = mode;
  writeStore(s);
}

/** 该课在任一玩法首通过（关卡解锁口径） */
export function lessonCleared(lessonId: string): boolean {
  const lp = readStore().lessons[lessonId];
  if (!lp) return false;
  return SENTENCE_MODES.some((m) => !!lp[m]?.clearedAt);
}

/** 课是否解锁：第 1 课常开，其余要求同包前一课任一玩法通关 */
export function lessonUnlocked(lessonId: string): boolean {
  const found = findLesson(lessonId);
  if (!found) return false;
  const sorted = [...found.pack.lessons].sort((a, b) => a.number - b.number);
  const i = sorted.findIndex((l) => l.id === lessonId);
  if (i <= 0) return true;
  return lessonCleared(sorted[i - 1].id);
}

// ─── 经济上报（best-effort：未登录/离线时静默本地记账）───

export interface SentenceReward {
  coins: number;
  sp: number;
  hearts?: number;
  enteredWeakness?: boolean;
  conqueredWeakness?: boolean;
}

type SubmitFn = (
  wordId: string,
  isCorrect: boolean,
  prompt: string,
  evidence?: { questionType?: string; chosen?: string; correct?: string; timeMs?: number },
) => Promise<SentenceReward | null>;

/** 由页面注入 lib/api 的 submitAnswer，避免循环依赖 */
let submitter: SubmitFn | null = null;
export function registerEconomySubmitter(fn: SubmitFn) {
  submitter = fn;
}

const MODE_LABEL: Record<SentenceMode, string> = {
  puzzle: "拼图",
  typing: "打字",
  speaking: "跟读",
};

export async function reportSentenceAnswer(
  lessonId: string,
  idx: number,
  en: string,
  isCorrect: boolean,
  kind: SentenceMode,
  attempt?: string,
): Promise<SentenceReward | null> {
  if (!submitter) return null;
  try {
    return await submitter(
      `sent:${lessonId}:${idx}`,
      isCorrect,
      `${MODE_LABEL[kind]}:${en}`,
      { questionType: `sentence_${kind}`, correct: en, chosen: attempt },
    );
  } catch {
    return null;
  }
}
