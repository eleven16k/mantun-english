#!/usr/bin/env node
/**
 * validate-content.mjs — 悦读馆内容全量审计：schema/蓝图符合性/词表覆盖/题型配比/
 * 合成数据一致性。对标 magic-english-buddy 的 audit-content 思路（独立实现）。
 * 用法：node scripts/reading/validate-content.mjs [--strict]  （--strict 时 warning 也算失败）
 */

import fs from "node:fs";
import path from "node:path";
import {
  ROOT, STORIES_DIR, TRACKS, loadBlueprints, validateStory, loadVocab, readJson,
} from "./shared.mjs";

const strict = process.argv.includes("--strict");
let totalErrors = 0, totalWarnings = 0;

for (const bp of loadBlueprints()) {
  const trackDir = path.join(STORIES_DIR, bp.track);
  const vocab = loadVocab(bp.track);
  let trackStories = 0;
  console.log(`\n=== ${bp.label}（${bp.track}）===`);

  for (const region of bp.regions) {
    const counts = { image_choice: 0, word_builder: 0, sentence_order: 0, fill_blank: 0 };
    let n = 0;
    for (let i = 1; i <= region.stories; i++) {
      const storyId = `${region.id}-s${String(i).padStart(2, "0")}`;
      const file = path.join(trackDir, `${storyId}.json`);
      if (!fs.existsSync(file)) {
        console.error(`  ✗ ${storyId} 文件缺失`);
        totalErrors++;
        continue;
      }
      let story;
      try {
        story = readJson(file);
      } catch (e) {
        console.error(`  ✗ ${storyId} JSON 解析失败: ${e.message}`);
        totalErrors++;
        continue;
      }
      const v = validateStory(story, bp, region, vocab);
      n++;
      trackStories++;
      for (const q of story.quiz ?? []) counts[q.type] = (counts[q.type] ?? 0) + 1;
      if (v.errors.length) {
        totalErrors += v.errors.length;
        console.error(`  ✗ ${storyId}: ${v.errors.join("; ")}`);
      }
      if (v.warnings.length) {
        totalWarnings += v.warnings.length;
        if (strict) console.error(`  ✗ ${storyId} (strict): ${v.warnings.join("; ")}`);
        else console.warn(`  ⚠ ${storyId}: ${v.warnings.join("; ")}`);
      }
    }
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    const actualMix = Object.fromEntries(
      Object.entries(counts).map(([t, c]) => [t, `${((c / total) * 100).toFixed(0)}%`])
    );
    console.log(
      `  ${region.id} ${region.cnName}: ${n}/${region.stories} 篇 · 题型 ${JSON.stringify(actualMix)}`
    );
  }
  console.log(`  小计：${trackStories}/${bp.regions.reduce((a, r) => a + r.stories, 0)} 篇`);
}

// 合成数据一致性
const ASSEMBLED = { xiaoshengchu: "data-xsc.ts", zhongkao: "data-zk.ts", gaokao: "data-gk.ts" };
for (const track of TRACKS) {
  const file = path.join(ROOT, "content", "reading", ASSEMBLED[track]);
  const jsonCount = (() => {
    const dir = path.join(STORIES_DIR, track);
    return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".json")).length : 0;
  })();
  if (jsonCount === 0) continue;
  if (!fs.existsSync(file)) {
    console.error(`\n✗ content/reading/${ASSEMBLED[track]} 缺失（json 已有 ${jsonCount} 篇，先跑 --assemble）`);
    totalErrors++;
  } else {
    const ids = [...fs.readFileSync(file, "utf8").matchAll(/"id": "([^"]+)-s\d+"/g)].length;
    if (ids !== jsonCount) {
      console.error(`\n✗ ${ASSEMBLED[track]} 含 ${ids} 篇 ≠ json ${jsonCount} 篇，需重新 --assemble`);
      totalErrors++;
    }
  }
}

console.log(`\n审计结果：${totalErrors} 错误 / ${totalWarnings} 警告`);
process.exit(totalErrors > 0 ? 1 : 0);
