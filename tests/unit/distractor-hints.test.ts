import { describe, it, expect } from "vitest";

/**
 * 阶段3 客户端定向干扰项 + 弱点水合（纯函数）：
 * - getDistractors：hints（历史错选）优先占位、difficulty 参与同层偏好、
 *   正确项/重复项排除、恒返回 3 个（词库足够时）
 * - mergeServerWeaknesses：只收 w## 词条、字段映射（秒→毫秒）、本地优先合并
 */
import { getDistractors, VOCAB } from "../../lib/vocab";
import { mergeServerWeaknesses } from "../../lib/weakness-sync";
import type { WeaknessItem } from "../../lib/api";
import type { Weakness } from "../../lib/types";

describe("getDistractors（阶段3 定向）", () => {
  it("hints 优先占满前 3 位（学生历史错选最锋利）", () => {
    const out = getDistractors("实现，达到", 2, ["成功", "利益", "熟悉的", "多余项"]);
    expect(out.slice(0, 3)).toEqual(["成功", "利益", "熟悉的"]);
    expect(out).toHaveLength(3);
  });

  it("hints 与正确项相同/为空时被剔除，不足 3 个用词库补齐", () => {
    const out = getDistractors("实现，达到", 2, ["实现，达到", "", "成功"]);
    expect(out[0]).toBe("成功");
    expect(out).toHaveLength(3);
    expect(out).not.toContain("实现，达到");
    expect(new Set(out).size).toBe(3);
  });

  it("difficulty 同层偏好：tier=1 时干扰项全部来自难度 1 的词", () => {
    const tier1Cns = VOCAB.filter((v) => v.difficulty === 1).map((v) => v.cn);
    // 跑多次排除随机巧合
    for (let i = 0; i < 5; i++) {
      const out = getDistractors("想象", 1); // imagine 是难度 1
      expect(out.every((cn) => tier1Cns.includes(cn) && cn !== "想象")).toBe(true);
    }
  });

  it("无 hints 行为兼容旧调用（3 个不重复、不含正确项）", () => {
    const out = getDistractors("环境", 2);
    expect(out).toHaveLength(3);
    expect(out).not.toContain("环境");
    expect(new Set(out).size).toBe(3);
  });
});

describe("mergeServerWeaknesses（缺口 9 水合）", () => {
  const row = (word_id: string, wrong_count = 3): WeaknessItem => ({
    word_id, wrong_count, correct_streak: 0, last_prompt: "p", added_at: 1700000000,
    misconception: null, diagnosed_at: null, misconception_label_zh: null, misconception_label_en: null,
  });
  const local = (id: string, wrongCount: number): Weakness => ({ id, wrongCount, correctStreak: 0, lastPrompt: "p", addedAt: 1 });

  it("只收 w## 词条：跨模块 id（phonics:/story:/import-）不虚占计划配额", () => {
    const merged = mergeServerWeaknesses({}, [row("w01"), row("phonics:l1-u1:cat"), row("story:zk-01:3"), row("import-2")]);
    expect(Object.keys(merged)).toEqual(["w01"]);
  });

  it("字段映射（秒→毫秒）且本地会话内数据优先", () => {
    const merged = mergeServerWeaknesses({ w01: local("w01", 7) }, [row("w01", 3), row("w02", 2)]);
    expect(merged.w01.wrongCount).toBe(7); // 本地覆盖
    expect(merged.w02).toMatchObject({ id: "w02", wrongCount: 2, addedAt: 1700000000000 });
  });

  it("服务端行不覆盖本地仅存的词条（合并而非替换）", () => {
    const merged = mergeServerWeaknesses({ w09: local("w09", 2) }, [row("w01")]);
    expect(Object.keys(merged).sort()).toEqual(["w01", "w09"]);
  });
});
