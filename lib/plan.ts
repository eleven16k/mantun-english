"use client";

/**
 * Study plan engine (D1) + Countdown engine (D2).
 * Pure functions — no React. Used by Dashboard and /progress.
 */
import { useGameStore } from "./store";
import type { Question } from "./types";
import { VOCAB, getDistractors } from "./vocab";
import { getWordById } from "./vocab";
import { kv } from "./kv";

// ─── D2: Countdown engine ───

export interface ExamPhase {
  daysLeft: number;
  phase: "foundation" | "specialized" | "sprint" | "final";
  phaseLabel: string;
  intensity: number; // multiplier for daily question count
}

export function getExamPhase(examDate: string): ExamPhase {
  const now = new Date();
  const exam = new Date(examDate + "T00:00:00");
  const daysLeft = Math.max(0, Math.ceil((exam.getTime() - now.getTime()) / 86400000));

  if (daysLeft > 180) return { daysLeft, phase: "foundation", phaseLabel: "Foundation", intensity: 0.8 };
  if (daysLeft > 90) return { daysLeft, phase: "specialized", phaseLabel: "Specialized", intensity: 1.0 };
  if (daysLeft > 30) return { daysLeft, phase: "sprint", phaseLabel: "Sprint", intensity: 1.3 };
  return { daysLeft, phase: "final", phaseLabel: "Final Push", intensity: 1.5 };
}

export function getDailyGoal(examDate: string, baseMinutes = 30): number {
  const { intensity } = getExamPhase(examDate);
  return Math.round((baseMinutes / 1.5) * 2 * intensity); // ~2 questions per 1.5 min
}

// ─── D1: Daily plan generation ───

export interface PlanItem {
  type: "weakness" | "review" | "new";
  count: number;
  wordIds: string[];
}

export interface DailyPlan {
  date: string;
  goal: number;
  items: PlanItem[];
  totalQuestions: number;
}

export function generateDailyPlan(): DailyPlan {
  const state = useGameStore.getState();
  const profile = getProfile();
  const goal = profile?.examDate ? getDailyGoal(profile.examDate) : 20;

  // 阶段3（自适应缺口 9 后半）：弱点分量按错误次数降序、只计词库内词条——
  // 服务端错词本经 useAppSync 水合后，重载不再丢分量，且最弱的词先进计划
  const weaknesses = Object.entries(state.weaknesses)
    .filter(([id]) => !!getWordById(id))
    .sort(([, a], [, b]) => b.wrongCount - a.wrongCount)
    .map(([id]) => id);
  const dueReviews = Object.entries(state.cardStates)
    .filter(([_, cs]) => cs.nextReviewAt < Date.now() && !cs.mastered)
    .map(([id]) => id)
    .slice(0, Math.ceil(goal * 0.3));
  const learned = Object.keys(state.cardStates);
  const newWords = VOCAB.filter(v => !learned.includes(v.id)).map(v => v.id);

  // Distribution: 40% weakness, 30% review, 30% new
  const wCount = Math.min(Math.ceil(goal * 0.4), weaknesses.length);
  const rCount = Math.min(Math.ceil(goal * 0.3), dueReviews.length);
  const nCount = Math.max(0, goal - wCount - rCount);

  return {
    date: new Date().toISOString().slice(0, 10),
    goal,
    items: [
      { type: "weakness", count: wCount, wordIds: weaknesses.slice(0, wCount) },
      { type: "review", count: rCount, wordIds: dueReviews.slice(0, rCount) },
      { type: "new", count: nCount, wordIds: newWords.slice(0, nCount) },
    ],
    totalQuestions: wCount + rCount + nCount,
  };
}

/** Build quiz questions from a DailyPlan, mixed in order. */
export function questionsFromPlan(plan: DailyPlan): Question[] {
  const qs: Question[] = [];
  for (const item of plan.items) {
    for (const wordId of item.wordIds) {
      const word = getWordById(wordId);
      if (!word) continue;
      const others = VOCAB.filter(v => v.id !== word.id).sort(() => Math.random() - 0.5).slice(0, 3);
      const choices = [word.cn, ...others.map(v => v.cn)].sort(() => Math.random() - 0.5);
      qs.push({
        id: `plan-${wordId}-${qs.length}`,
        wordId,
        type: "word-to-cn",
        prompt: word.en,
        promptSub: word.phonetic,
        choices,
        correctIndex: choices.indexOf(word.cn),
        explanation: `${word.en} = ${word.cn}\n${word.example}`,
      });
    }
  }
  // Shuffle to mix types
  return qs.sort(() => Math.random() - 0.5);
}

// ─── V8-P4: 服务端权威计划（断层 #9 修复）───

interface ServerPlanResponse {
  date: string;
  goal: number;
  items: { type: "weakness" | "review"; count: number; wordIds: string[] }[];
  newCount: number;
  weakKps: string[];
  tilted: boolean;
}

const SERVER_PLAN_CACHE_KEY = "lexi-plan-daily";

/**
 * 服务端权威计划；newCount 的新词槽由本地词库（VOCAB 未学）补齐。
 * 拉不到（离线/游客）→ null，调用方回落本地 generateDailyPlan。
 */
export async function fetchServerPlan(): Promise<DailyPlan | null> {
  try {
    const { fetchApi } = await import("./api");
    const res = await fetchApi<ServerPlanResponse>("/api/plan/daily");
    const state = useGameStore.getState();
    const learned = new Set(Object.keys(state.cardStates));
    const newIds = VOCAB.filter(v => !learned.has(v.id)).map(v => v.id).slice(0, res.newCount);
    const items: PlanItem[] = [
      ...res.items.filter(i => i.count > 0).map(i => ({ type: i.type, count: i.wordIds.length, wordIds: i.wordIds })),
      ...(newIds.length > 0 ? [{ type: "new" as const, count: newIds.length, wordIds: newIds }] : []),
    ];
    return {
      date: res.date,
      goal: res.goal,
      items,
      totalQuestions: items.reduce((acc, i) => acc + i.count, 0),
    };
  } catch {
    return null;
  }
}

export function cacheServerPlan(plan: DailyPlan) {
  kv.setItem(SERVER_PLAN_CACHE_KEY, JSON.stringify(plan));
}

export function getCachedServerPlan(): DailyPlan | null {
  try {
    const raw = kv.getItem(SERVER_PLAN_CACHE_KEY) as string | null;
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

/** 组成是否变化（比较各分量词集，不比顺序）——变了提示「豚豚更新了计划」。 */
export function planDiffers(a: DailyPlan, b: DailyPlan): boolean {
  if (a.goal !== b.goal || a.totalQuestions !== b.totalQuestions) return true;
  const key = (p: DailyPlan) =>
    p.items.map(i => `${i.type}:${[...i.wordIds].sort().join(",")}`).sort().join("|");
  return key(a) !== key(b);
}

// ─── E1: 9-level streak ladder ───

export const STREAK_LEVELS = [
  { level: 1, name: "Spark", emoji: "amber", minDays: 0 },
  { level: 2, name: "Ember", emoji: "orange", minDays: 2 },
  { level: 3, name: "Flame", emoji: "deeporange", minDays: 4 },
  { level: 4, name: "Blaze", emoji: "rose", minDays: 7 },
  { level: 5, name: "Bonfire", emoji: "brown", minDays: 10 },
  { level: 6, name: "Inferno", emoji: "red", minDays: 15 },
  { level: 7, name: "Wildfire", emoji: "violet", minDays: 25 },
  { level: 8, name: "Supernova", emoji: "sky", minDays: 50 },
  { level: 9, name: "Phoenix", emoji: "gold", minDays: 100 },
];

export function getStreakLevel(days: number) {
  let current = STREAK_LEVELS[0];
  for (const sl of STREAK_LEVELS) {
    if (days >= sl.minDays) current = sl;
  }
  const nextIdx = STREAK_LEVELS.indexOf(current) + 1;
  const next = nextIdx < STREAK_LEVELS.length ? STREAK_LEVELS[nextIdx] : null;
  return { current, next };
}

// ─── Profile helpers ───

export interface StudyProfile {
  track: string;
  targetScore: number;
  examDate: string;
  estimatedScore?: number;
}

export function getProfile(): StudyProfile | null {
  try {
    const raw = kv.getItem("lexi-profile") as string | null;
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function setProfile(p: StudyProfile) {
  kv.setItem("lexi-profile", JSON.stringify(p));
}

export function clearProfile() {
  kv.removeItem("lexi-profile");
}
