"use client";

/**
 * lib/stage.ts — 学段角色中枢（角色选择 → 词汇分配）。
 * 一次选择驱动四处默认值：quiz 题库标签 / 打字馆默认词书 / 悦读馆轨道 /
 * wordquest 级别。角色只定默认值，所有词书与内容不锁定，设置页可随时换。
 *
 * 兼容：stage 为空（老用户）= junior——与既有 zk 题库口径一致，零感知。
 */

export type Stage = "primary" | "junior" | "senior" | "college" | "postgrad" | "abroad" | "adult";
export const DEFAULT_STAGE: Stage = "junior";
export const STAGE_KEY = "lexi-stage";

export interface StageDef {
  id: Stage;
  /** i18n 键前缀（onb.stage<Id> / onb.stage<Id>Desc） */
  nameKey: string;
  descKey: string;
  countKey: string;
  /** quiz 题库：lexicon 标签过滤（adult=空 → 全部核心词） */
  quizTags: string[];
  /** quiz 题库难度过滤（primary 只出入门词） */
  quizDifficulties?: (1 | 2 | 3)[];
  /** 打字馆默认词书 id（content/typing/wordbooks BOOK_METAS） */
  bookId: string;
  /** 悦读馆轨道 */
  track: "xiaoshengchu" | "zhongkao" | "gaokao";
  /** wordquest 级别 */
  wordquestLevel: "Primary" | "JuniorHigh" | "SeniorHigh";
}

export const STAGES: StageDef[] = [
  { id: "primary",  nameKey: "onb.stagePrimary",  descKey: "onb.stagePrimaryDesc",  countKey: "onb.stagePrimaryCount",  quizTags: ["zk"],               quizDifficulties: [1], bookId: "zk-starter",  track: "xiaoshengchu", wordquestLevel: "Primary" },
  { id: "junior",   nameKey: "onb.stageJunior",   descKey: "onb.stageJuniorDesc",   countKey: "onb.stageJuniorCount",   quizTags: ["zk"],               bookId: "zk",          track: "zhongkao",     wordquestLevel: "JuniorHigh" },
  { id: "senior",   nameKey: "onb.stageSenior",   descKey: "onb.stageSeniorDesc",   countKey: "onb.stageSeniorCount",   quizTags: ["gk"],               bookId: "gk",          track: "gaokao",       wordquestLevel: "SeniorHigh" },
  { id: "college",  nameKey: "onb.stageCollege",  descKey: "onb.stageCollegeDesc",  countKey: "onb.stageCollegeCount",  quizTags: ["cet4", "cet6"],     bookId: "cet4",        track: "gaokao",       wordquestLevel: "SeniorHigh" },
  { id: "postgrad", nameKey: "onb.stagePostgrad", descKey: "onb.stagePostgradDesc", countKey: "onb.stagePostgradCount", quizTags: ["ky"],               bookId: "ky",          track: "zhongkao",     wordquestLevel: "SeniorHigh" },
  { id: "abroad",   nameKey: "onb.stageAbroad",   descKey: "onb.stageAbroadDesc",   countKey: "onb.stageAbroadCount",   quizTags: ["toefl", "ielts"],   bookId: "toefl",       track: "gaokao",       wordquestLevel: "SeniorHigh" },
  { id: "adult",    nameKey: "onb.stageAdult",    descKey: "onb.stageAdultDesc",    countKey: "onb.stageAdultCount",    quizTags: [],                   bookId: "freq-top3000", track: "zhongkao",    wordquestLevel: "SeniorHigh" },
];

export function stageDef(stage: string | null | undefined): StageDef {
  return STAGES.find((s) => s.id === stage) ?? STAGES.find((s) => s.id === DEFAULT_STAGE)!;
}

export function isStage(v: string | null | undefined): v is Stage {
  return !!v && STAGES.some((s) => s.id === v);
}

/** 本地持久化（游客/未拉到 me 前的回退源） */
export function savedStage(): Stage {
  if (typeof window === "undefined") return DEFAULT_STAGE;
  const v = window.localStorage.getItem(STAGE_KEY);
  return isStage(v) ? v : DEFAULT_STAGE;
}

export function saveStage(stage: Stage) {
  try {
    window.localStorage.setItem(STAGE_KEY, stage);
  } catch {
    /* quota — ignore */
  }
}
