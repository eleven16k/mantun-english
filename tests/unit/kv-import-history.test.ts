import { describe, it, expect, beforeEach } from "vitest";
import { setKv, kv } from "@/lib/kv";
import {
  getHistory,
  addRecord,
  removeRecord,
  clearHistory,
  timeLabel,
  type ImportRecord,
} from "@/lib/import-history";

const mem = new Map<string, string>();

beforeEach(() => {
  mem.clear();
  setKv({
    getItem: (k) => mem.get(k) ?? null,
    setItem: (k, v) => void mem.set(k, v),
    removeItem: (k) => void mem.delete(k),
  });
  clearHistory();
});

describe("kv seam", () => {
  it("delegates to the injected impl", () => {
    kv.setItem("k1", "v1");
    expect(mem.get("k1")).toBe("v1");
    expect(kv.getItem("k1")).toBe("v1");
    kv.removeItem("k1");
    expect(kv.getItem("k1")).toBeNull();
  });
});

describe("import history", () => {
  const rec = (name: string): Omit<ImportRecord, "id" | "createdAt"> => ({
    fileName: `${name}.txt`,
    topic: name,
    questionType: "choice",
    questionCount: 5,
    questions: [],
  });

  it("starts empty", () => {
    expect(getHistory()).toEqual([]);
  });

  it("adds records with generated id/createdAt, newest first", () => {
    addRecord(rec("a"));
    addRecord(rec("b"));
    const h = getHistory();
    expect(h.length).toBe(2);
    expect(h[0].topic).toBe("b");
    expect(h[0].id).toMatch(/^imp-/);
    expect(h[0].createdAt).toBeGreaterThan(0);
  });

  it("removes a single record by id", async () => {
    const r = addRecord(rec("keep"));
    await new Promise((res) => setTimeout(res, 2)); // distinct millisecond id
    addRecord(rec("drop"));
    removeRecord(r.id);
    const h = getHistory();
    expect(h.length).toBe(1);
    expect(h[0].topic).toBe("drop");
  });

  it("caps at 20 with LRU eviction", () => {
    for (let i = 0; i < 25; i++) addRecord(rec(`n${i}`));
    const h = getHistory();
    expect(h.length).toBe(20);
    expect(h[0].topic).toBe("n24");
    expect(h.some((r) => r.topic === "n0")).toBe(false);
  });

  it("clearHistory empties everything", () => {
    addRecord(rec("x"));
    clearHistory();
    expect(getHistory()).toEqual([]);
  });
});

describe("timeLabel", () => {
  it("formats same-day as time and older as date", () => {
    const now = Date.now();
    expect(timeLabel(now)).toMatch(/:\d\d/);
    const old = now - 3 * 864e5;
    expect(timeLabel(old).length).toBeGreaterThan(0);
  });
});
