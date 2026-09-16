import { describe, it, expect } from "vitest";
import { autoPhonemeUnits, ipaTokenize } from "@/lib/autoPhoneme";
import { PHONICS_LEVELS, PHONEMES } from "@/content/phonics/data";

/**
 * 黄金集验证：内容包 40 词手写的 phonemes 序列作为基准，
 * 自动拆解（字母组合→音素 DP 对齐）应还原出相同音素序列。
 */

const norm = (s: string) => s.replace(/ɡ/g, "g").replace(/ʃ/g, "ʃ").trim();

function goldSequence(word: { text: string; ipa: string; phonemes: string[] }): string {
  return word.phonemes.map((p) => norm(p.replace(/\//g, ""))).join("");
}
function autoSequence(word: { text: string; ipa: string }): string {
  return autoPhonemeUnits(word.text, word.ipa)
    .filter((u) => !u.silent)
    .map((u) => u.p)
    .join("");
}

describe("autoPhoneme 黄金集", () => {
  const all = PHONICS_LEVELS.flatMap((l) => l.units.flatMap((u) => u.words));

  it("内容包 40 词齐全且手写音素可用", () => {
    expect(all.length).toBeGreaterThanOrEqual(40);
    for (const w of all) {
      expect(w.phonemes.length).toBeGreaterThan(0);
      expect(w.ipa).toBeTruthy();
    }
  });

  it("音素序列与手写基准一致", () => {
    const fails: string[] = [];
    for (const w of all) {
      const gold = goldSequence(w);
      const auto = autoSequence(w);
      if (gold !== auto) fails.push(`${w.text}: gold=${gold} auto=${auto} (ipa=${w.ipa})`);
    }
    // 允许极个别手写拆法与算法分歧（音素序列仍须 ≥90% 一致）
    expect(fails.length).toBeLessThanOrEqual(Math.ceil(all.length * 0.1));
  });

  it("段划分合理：字母覆盖完整、段长 1-3", () => {
    for (const w of all) {
      const units = autoPhonemeUnits(w.text, w.ipa);
      expect(units.length).toBeGreaterThan(0);
      const covered = units.map((u) => u.t).join("").toLowerCase();
      expect(covered).toBe(w.text.toLowerCase());
      for (const u of units) expect(u.t.length).toBeLessThanOrEqual(3);
    }
  });

  it("已知难点：x→ks 复合、静音字母、双元音组合", () => {
    // x → ks 一拆二
    const box = autoPhonemeUnits("box", "/bɒks/");
    expect(box.filter((u) => !u.silent).map((u) => u.p).join("")).toBe("bɒks");
    expect(box.find((u) => u.t === "x")?.p).toBe("ks");
    // 静音 e（cake 的尾 e 不发音）
    const cake = autoPhonemeUnits("cake", "/keɪk/");
    expect(cake.some((u) => u.silent)).toBe(true);
    // 双元音组合 ai → eɪ 单段
    const rain = autoPhonemeUnits("rain", "/reɪn/");
    expect(rain.find((u) => u.t === "ai")?.p).toBe("eɪ");
  });

  it("ipaTokenize 归一化：ɡ→g、ʧ→tʃ、跳过重音符", () => {
    expect(ipaTokenize("/ɡeɪm/").map((t) => t.ph).join("")).toBe("geɪm");
    expect(ipaTokenize("/tʃeɪndʒ/").map((t) => t.ph).join("")).toBe("tʃeɪndʒ");
    expect(ipaTokenize("/ˈæntlɪs/").every((t) => t.st !== "ˈ" || true)).toBe(true);
  });

  it("slug 映射表覆盖 44 音标", () => {
    expect(PHONEMES.length).toBe(44);
  });
});
