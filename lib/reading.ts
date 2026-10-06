"use client";

/**
 * lib/reading.ts — 悦读馆客户端内核（结构对齐 lib/sentence.ts）。
 *
 * - 进度：localStorage（`lexi-reading-v1`）按课分桶存 {results, idx,
 *   clearedAt, bestScore}——刷新/中断后恢复到原题；≥60 分首通解锁下一课。
 * - 经济：逐题走既有 POST /api/economy（wordId = story:{storyId}:{idx}，
 *   金币/提分值/红心/弱点本/周榜 SP 全复用）；首通结算走
 *   POST /api/reading/complete（服务端权威，防重放）。
 * - Buddy：GET /api/reading/profile + POST /api/reading/evolve（手动进化）。
 */

import type { ReadingTrack } from "@/content/reading/types";

// ─── 进度（localStorage）───

export interface StoryProgress {
  results: { status: "PASSED" | "FAILED" }[];
  idx: number;
  clearedAt: number | null;
  bestScore: number;
}

interface ReadingStore {
  v: 1;
  stories: Record<string, StoryProgress>;
}

const KEY = "lexi-reading-v1";

function readStore(): ReadingStore {
  if (typeof window === "undefined") return { v: 1, stories: {} };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ReadingStore;
      if (parsed && parsed.v === 1 && parsed.stories) return parsed;
    }
  } catch {
    /* corrupted — reset */
  }
  return { v: 1, stories: {} };
}

function writeStore(s: ReadingStore) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* quota — ignore */
  }
}

export function getStoryProgress(storyId: string): StoryProgress | null {
  return readStore().stories[storyId] ?? null;
}

export function saveStoryProgress(storyId: string, p: StoryProgress) {
  const s = readStore();
  s.stories[storyId] = p;
  writeStore(s);
}

export function storyCleared(storyId: string): boolean {
  return !!readStore().stories[storyId]?.clearedAt;
}

// ─── 经济上报（best-effort；与 lib/sentence.ts 同款注入模式）───

export interface ReadingReward {
  coins: number;
  sp: number;
  hearts?: number;
}

type SubmitFn = (
  wordId: string,
  isCorrect: boolean,
  prompt: string,
  evidence?: { questionType?: string; chosen?: string; correct?: string; timeMs?: number },
) => Promise<ReadingReward | null>;

let submitter: SubmitFn | null = null;
export function registerReadingSubmitter(fn: SubmitFn) {
  submitter = fn;
}

export async function reportStoryAnswer(
  storyId: string,
  idx: number,
  prompt: string,
  isCorrect: boolean,
  evidence?: { questionType?: string; chosen?: string; correct?: string; timeMs?: number },
): Promise<ReadingReward | null> {
  if (!submitter) return null;
  try {
    return await submitter(`story:${storyId}:${idx}`, isCorrect, `悦读:${prompt}`, evidence);
  } catch {
    return null;
  }
}

// ─── 服务端 API ───

import { fetchApi, getMe, isLoggedIn } from "@/lib/api";
import { getProfile } from "@/lib/plan";

export interface ReadingProfileState {
  magicPower: number;
  buddyStage: number;
  pendingStage: number;
  nextThreshold?: number | null;
}

export interface CompleteResult {
  bestScore: number;
  passed: boolean;
  firstPass: boolean;
  rewards: { coins: number; sp: number } | null;
  profile: { magicPower: number; buddyStage: number; pendingStage: number };
}

export async function completeReading(storyId: string, score: number, hintsUsed: number): Promise<CompleteResult | null> {
  try {
    return await fetchApi<CompleteResult>("/api/reading/complete", {
      method: "POST",
      body: JSON.stringify({ storyId, score, hintsUsed }),
    });
  } catch {
    return null;
  }
}

export async function getReadingProfile(): Promise<ReadingProfileState | null> {
  try {
    return await fetchApi<ReadingProfileState>("/api/reading/profile", { method: "GET" });
  } catch {
    return null;
  }
}

export async function evolveBuddy(): Promise<ReadingProfileState | null> {
  try {
    const r = await fetchApi<{ profile: ReadingProfileState }>("/api/reading/evolve", { method: "POST" });
    return r.profile;
  } catch {
    return null;
  }
}

// ─── 学段 ───

export const READING_TRACKS: ReadingTrack[] = ["xiaoshengchu", "zhongkao", "gaokao"];

/** 用户 track → 悦读馆学段（track 字段可能为空/其他值，兜底小升初） */
export function trackOfUser(userTrack: string | undefined | null): ReadingTrack {
  if (userTrack === "zhongkao" || userTrack === "gaokao") return userTrack;
  return "xiaoshengchu";
}

/**
 * 解析当前学段：本地 onboarding 档案优先；缺失时登录态问服务端 /api/me
 * （服务端 track 是注册/设置后的权威值），游客兜底小升初。
 */
export async function resolveTrack(): Promise<ReadingTrack> {
  const local = getProfile()?.track;
  if (local === "zhongkao" || local === "gaokao" || local === "xiaoshengchu") return local;
  if (isLoggedIn()) {
    try {
      const me = await getMe();
      return trackOfUser(me.user?.track);
    } catch {
      /* 服务端不可达 → 兜底 */
    }
  }
  return "xiaoshengchu";
}
