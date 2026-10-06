"use client";

/**
 * 服务端权威弱点 → 本地错词本水合（阶段3，修自适应缺口 9 的前半）：
 * 本地 weaknesses 不持久化，重载即空——每日计划的 40% 弱点分量随之蒸发。
 * useAppSync 周期性拉 GET /api/weaknesses 经此合并进 store。
 */
import type { WeaknessItem } from "./api";
import type { Weakness } from "./types";

/** 只收词库内 w## 词条：计划引擎（plan.ts）以 30 词 bank 为域，混入
 *  phonics:/story:/import- 等跨模块 id 会虚占弱点配额（题造不出来）。 */
export function mergeServerWeaknesses(
  current: Record<string, Weakness>,
  rows: WeaknessItem[],
): Record<string, Weakness> {
  const next: Record<string, Weakness> = {};
  for (const r of rows) {
    if (!/^w\d+$/.test(r.word_id)) continue;
    next[r.word_id] = {
      id: r.word_id,
      wrongCount: r.wrong_count,
      correctStreak: r.correct_streak,
      lastPrompt: r.last_prompt,
      addedAt: (r.added_at ?? 0) * 1000, // 服务端 unix 秒 → 本地毫秒口径
    };
  }
  // 本地会话内的新数据优先（服务端在下一次答题上报后即追平）
  return { ...next, ...current };
}
