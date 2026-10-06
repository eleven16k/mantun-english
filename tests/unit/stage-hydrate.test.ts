import { describe, it, expect, vi, beforeEach } from "vitest";

/**
 * 角色选择 → 学段词汇分配（hydrateVocabFromLexicon 按 stage 标签注入）：
 * - college 角色注入 cet4/cet6 词、排除 zk 词
 * - 换角色（junior）重挂：cet4 词移除、zk 词注入（lex: 词整体替换）
 * - primary 只出 difficulty 1
 */

const LEXICON = {
  apple:     { cn: "苹果", phonetic: "/ˈæpl/", pos: "n.", difficulty: 1, tags: "zk,gk" },
  elaborate: { cn: "详细阐述", phonetic: "/ɪˈlæbərət/", pos: "v.", difficulty: 2, tags: "cet4,cet6,ky" },
  paradigm:  { cn: "范式", phonetic: "/ˈpærədaɪm/", pos: "n.", difficulty: 3, tags: "cet6,gre" },
  retreat:   { cn: "撤退", phonetic: "/rɪˈtriːt/", pos: "v.", difficulty: 2, tags: "zk,gk,cet4" },
};
const NO_EXAMPLES = {};

vi.stubGlobal("fetch", vi.fn(async (url: string) => {
  if (String(url).includes("lexicon")) return { ok: true, json: async () => LEXICON };
  if (String(url).includes("examples")) return { ok: true, json: async () => NO_EXAMPLES };
  return { ok: false, json: async () => ({}) };
}));

const { hydrateVocabFromLexicon, VOCAB } = await import("@/lib/vocab");
const { stageDef } = await import("@/lib/stage");

const ens = () => VOCAB.filter((w) => w.id.startsWith("lex:")).map((w) => w.en);

describe("学段词汇分配（stage → hydrate 标签）", () => {
  beforeEach(() => {
    // 清空模块级注入状态（重挂模拟换角色）
    for (let i = VOCAB.length - 1; i >= 0; i--) {
      if (VOCAB[i].id.startsWith("lex:")) VOCAB.splice(i, 1);
    }
  });

  it("college（cet4+cet6）：注入四六级词、排除中考词", async () => {
    const def = stageDef("college");
    await hydrateVocabFromLexicon({ tags: def.quizTags, difficulties: def.quizDifficulties });
    const words = ens();
    expect(words).toContain("elaborate");
    expect(words).toContain("paradigm");
    expect(words).toContain("retreat"); // retreat 有 cet4 标签
    expect(words).not.toContain("apple"); // 纯 zk/gk，排除
  });

  it("junior（zk）：换角色重挂后 cet4 词移除、zk 词注入", async () => {
    const jr = stageDef("junior");
    await hydrateVocabFromLexicon({ tags: jr.quizTags, difficulties: jr.quizDifficulties });
    const words = ens();
    expect(words).toContain("apple");
    expect(words).toContain("retreat"); // zk 标签
    expect(words).not.toContain("elaborate"); // 纯 cet4/cet6，排除
  });

  it("primary：zk 词再过滤 difficulty 1", async () => {
    const pr = stageDef("primary");
    await hydrateVocabFromLexicon({ tags: pr.quizTags, difficulties: pr.quizDifficulties });
    const words = ens();
    expect(words).toEqual(["apple"]); // retreat difficulty 2 被过滤
  });

  it("adult：空标签 = 全部核心词", async () => {
    const ad = stageDef("adult");
    await hydrateVocabFromLexicon({ tags: ad.quizTags, difficulties: ad.quizDifficulties });
    expect(ens().length).toBe(4);
  });
});
