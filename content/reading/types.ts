/**
 * 悦读馆（Reading Quest）内容类型。数据由 scripts/reading/generate-content.mjs
 * 生成到 data-xsc/data-zk/data-gk.ts，本文件只放类型与跨学段共享配置。
 */

export type ReadingTrack = "xiaoshengchu" | "zhongkao" | "gaokao";

export interface ReadingRegion {
  id: string;
  name: string;
  cnName: string;
  icon: string;
  storyCount: number;
}

export interface ReadingRegionSet {
  track: ReadingTrack;
  theme: "magic" | "space" | "racing";
  cnLabel: string;
  regions: ReadingRegion[];
}

export interface ReadingParagraph {
  text: string;
  translation: string;
}

export interface ReadingQuizImageChoice {
  type: "image_choice";
  question: string;
  audioText: string;
  options: { emoji: string; value: string; text: string }[];
  answer: string;
}

export interface ReadingQuizWordBuilder {
  type: "word_builder";
  word: string;
  audioText: string;
}

export interface ReadingQuizSentenceOrder {
  type: "sentence_order";
  correctOrder: string[];
  audioText: string;
}

export interface ReadingQuizFillBlank {
  type: "fill_blank";
  sentenceWithBlank: string;
  choices: string[];
  answer: string;
  audioText: string;
}

export type ReadingQuizItem =
  | ReadingQuizImageChoice
  | ReadingQuizWordBuilder
  | ReadingQuizSentenceOrder
  | ReadingQuizFillBlank;

export interface ReadingStory {
  id: string;
  track: ReadingTrack;
  regionId: string;
  order: number;
  title: string;
  titleCn: string;
  coverEmoji: string;
  paragraphs: ReadingParagraph[];
  quiz: ReadingQuizItem[];
}

/** Buddy 进化四阶段（每学段一套形象；魔力阈值 100/500/1500 服务端判定） */
export const BUDDY_STAGES: Record<ReadingTrack, { emoji: string; en: string; cn: string }[]> = {
  xiaoshengchu: [
    { emoji: "🥚", en: "Mystery Egg", cn: "魔法蛋" },
    { emoji: "🐣", en: "Hatchling", cn: "小雏龙" },
    { emoji: "🐥", en: "Fledgling", cn: "小飞龙" },
    { emoji: "🐉", en: "Guardian", cn: "守护巨龙" },
  ],
  zhongkao: [
    { emoji: "🔒", en: "Capsule", cn: "休眠舱" },
    { emoji: "🛰️", en: "Probe", cn: "探测号" },
    { emoji: "🚀", en: "Starship", cn: "星际舰" },
    { emoji: "🛸", en: "Flagship", cn: "旗舰" },
  ],
  gaokao: [
    { emoji: "🟢", en: "Rookie", cn: "新秀" },
    { emoji: "🔵", en: "Contender", cn: "竞速者" },
    { emoji: "🟣", en: "Challenger", cn: "挑战者" },
    { emoji: "🔴", en: "Champion", cn: "冠军" },
  ],
};

export const READING_PASS_SCORE = 60;
