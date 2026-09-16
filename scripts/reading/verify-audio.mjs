#!/usr/bin/env node
/**
 * verify-audio.mjs — 悦读馆音频覆盖审计：story json 里的每个段落/题目音频片段
 * 在 public/audio/reading/ 下都有正常速与慢速两份 mp3 且 >1KB。
 * 用法：node scripts/reading/verify-audio.mjs [--track=xiaoshengchu]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const STORIES = path.join(ROOT, "content", "reading", "stories");
const AUDIO = path.join(ROOT, "public", "audio", "reading");
const TRACK_FILTER = (process.argv.find((a) => a.startsWith("--track=")) ?? "").split("=")[1] || null;

let missing = 0, ok = 0, stories = 0;

for (const track of fs.existsSync(STORIES) ? fs.readdirSync(STORIES) : []) {
  if (TRACK_FILTER && track !== TRACK_FILTER) continue;
  for (const f of fs.readdirSync(path.join(STORIES, track)).filter((f) => f.endsWith(".json"))) {
    const story = JSON.parse(fs.readFileSync(path.join(STORIES, track, f), "utf8"));
    stories++;
    const clips = [
      ...story.paragraphs.map((_, i) => `${story.id}-p${String(i).padStart(2, "0")}`),
      ...story.quiz.map((_, i) => `quiz${i}`),
    ];
    const dir = path.join(AUDIO, track, story.id);
    for (const slug of clips) {
      for (const suffix of ["", "-slow"]) {
        const file = path.join(dir, `${slug}${suffix}.mp3`);
        if (fs.existsSync(file) && fs.statSync(file).size > 1000) ok++;
        else {
          missing++;
          if (process.argv.includes("-v")) console.log(`缺: ${path.relative(ROOT, file)}`);
        }
      }
    }
  }
}

console.log(`\n${stories} 篇故事 · ${ok} 个音频齐全 · ${missing} 个缺失`);
process.exit(missing > 0 ? 1 : 0);
