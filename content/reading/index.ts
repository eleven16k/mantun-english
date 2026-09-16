/**
 * 悦读馆内容入口。三学段数据按需动态加载（每学段一个 chunk，只在进入
 * 对应学段时下载）；音频为预生成 mp3（scripts/reading/gen_story_audio.py），
 * 文件缺失时播放层回退浏览器 TTS。
 */

import { BASE_PATH } from "@/lib/config";
import type { ReadingParagraph, ReadingQuizItem, ReadingRegionSet, ReadingStory, ReadingTrack } from "./types";

export * from "./types";

interface TrackData {
  REGION_SET: ReadingRegionSet;
  STORIES: ReadingStory[];
}

export async function loadTrackData(track: ReadingTrack): Promise<TrackData> {
  switch (track) {
    case "zhongkao":
      return import("./data-zk");
    case "gaokao":
      return import("./data-gk");
    default:
      return import("./data-xsc");
  }
}

// ─── 音频 URL（预生成文件约定路径；缺失由播放层兜底）───
// 注意必须带 BASE_PATH：生产学生端挂在 /app 下（basePath 资产坑，见
// lib/phonics.ts wordAudioUrl 同款处理）。

export function paraAudioUrl(track: ReadingTrack, storyId: string, paraIdx: number, slow = false): string {
  return `${BASE_PATH}/audio/reading/${track}/${storyId}/${storyId}-p${String(paraIdx).padStart(2, "0")}${slow ? "-slow" : ""}.mp3`;
}

export function quizAudioUrl(track: ReadingTrack, storyId: string, quizIdx: number, slow = false): string {
  return `${BASE_PATH}/audio/reading/${track}/${storyId}/quiz${quizIdx}${slow ? "-slow" : ""}.mp3`;
}

// ─── 查找与排序 ───

export function storiesInOrder(data: TrackData): ReadingStory[] {
  return [...data.STORIES].sort((a, b) => {
    const ra = data.REGION_SET.regions.findIndex((r) => r.id === a.regionId);
    const rb = data.REGION_SET.regions.findIndex((r) => r.id === b.regionId);
    return ra === rb ? a.order - b.order : ra - rb;
  });
}

export function findStory(data: TrackData, storyId: string): ReadingStory | null {
  return data.STORIES.find((s) => s.id === storyId) ?? null;
}

export function regionOf(data: TrackData, regionId: string) {
  return data.REGION_SET.regions.find((r) => r.id === regionId) ?? null;
}

/** 同学段下一课（跨区顺延；没有则 null） */
export function nextStoryOf(data: TrackData, storyId: string): ReadingStory | null {
  const ordered = storiesInOrder(data);
  const i = ordered.findIndex((s) => s.id === storyId);
  return ordered[i + 1] ?? null;
}

export function storiesOfRegion(data: TrackData, regionId: string): ReadingStory[] {
  return storiesInOrder(data).filter((s) => s.regionId === regionId);
}

/** 题目朗读文本兜底（image_choice 用问题本身） */
export function quizPromptOf(q: ReadingQuizItem, paragraphs?: ReadingParagraph[]): string {
  return q.audioText || (q.type === "image_choice" ? q.question : "");
}
