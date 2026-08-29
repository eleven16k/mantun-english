import { describe, it, expect } from "vitest";
import {
  getExamPhase,
  getDailyGoal,
  generateDailyPlan,
  questionsFromPlan,
  getStreakLevel,
  getProfile,
  setProfile,
  clearProfile,
} from "@/lib/plan";

describe("getExamPhase", () => {
  it("classifies by days-to-exam", () => {
    const far = new Date(Date.now() + 200 * 864e5).toISOString().slice(0, 10);
    const mid = new Date(Date.now() + 100 * 864e5).toISOString().slice(0, 10);
    const near = new Date(Date.now() + 20 * 864e5).toISOString().slice(0, 10);
    expect(getExamPhase(far).phase).toBe("foundation");
    expect(getExamPhase(mid).phase).toBe("specialized");
    expect(getExamPhase(near).phase).toBe("final");
  });
});

describe("getDailyGoal", () => {
  it("scales with remaining days, bounded", () => {
    const far = new Date(Date.now() + 300 * 864e5).toISOString().slice(0, 10);
    const near = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);
    const gFar = getDailyGoal(far);
    const gNear = getDailyGoal(near);
    expect(gFar).toBeGreaterThanOrEqual(10);
    expect(gNear).toBeGreaterThanOrEqual(gFar);
    expect(gNear).toBeLessThanOrEqual(60);
  });
});

describe("generateDailyPlan / questionsFromPlan", () => {
  it("builds a plan whose items sum to totalQuestions", () => {
    const plan = generateDailyPlan();
    expect(plan.goal).toBeGreaterThan(0);
    const sum = plan.items.reduce((a, i) => a + i.count, 0);
    expect(sum).toBe(plan.totalQuestions);
    for (const item of plan.items) {
      expect(["weakness", "review", "new"]).toContain(item.type);
      expect(item.wordIds.length).toBe(item.count);
    }
  });

  it("questionsFromPlan materializes Question objects", () => {
    const plan = generateDailyPlan();
    const qs = questionsFromPlan(plan);
    expect(qs.length).toBe(plan.totalQuestions);
    for (const q of qs) {
      expect(q.choices.length).toBeGreaterThan(0);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("getStreakLevel", () => {
  it("ladders from first to top tier", () => {
    const first = getStreakLevel(0);
    const mid = getStreakLevel(7);
    const top = getStreakLevel(365);
    expect(first.current.name).toBeTruthy();
    expect(mid.current.name).not.toBe(first.current.name);
    expect(top.current.name).toBeTruthy();
    expect(top.next).toBeNull();
  });
});

describe("profile kv helpers", () => {
  it("set/get/clear round-trips through injected kv", async () => {
    const { setKv } = await import("@/lib/kv");
    const mem = new Map<string, string>();
    setKv({
      getItem: (k) => mem.get(k) ?? null,
      setItem: (k, v) => void mem.set(k, v),
      removeItem: (k) => void mem.delete(k),
    });
    clearProfile();
    expect(getProfile()).toBeNull();
    setProfile({ track: "中考", targetScore: 100, examDate: "2027-06-20", estimatedScore: 80 });
    expect(getProfile()?.track).toBe("中考");
    clearProfile();
    expect(getProfile()).toBeNull();
  });
});
