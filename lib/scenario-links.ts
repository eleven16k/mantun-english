/**
 * S2 关卡尾部场景入口（V8 用户故事集 S2）——把刚练的内容接一段口语实战。
 *
 * 匹配规则（宁缺毋滥）：把本次题目的 wordId/prompt 拼成文本，与各场景的
 * targetVocab + 主题关键词做命中计分；命中 ≥2 才返回场景，否则 null
 * （结算页不显示入口，不做兜底跳转——GWT-3）。
 */
import { SCENARIOS, scenarioById } from "./scenarios";

export { scenarioById };

// 每个场景的关键词 = targetVocab + 主题补充词（小写）。补充词人工维护，
// 新增场景时按《docs/场景内容审核清单.md》补一行。
const SCENARIO_KEYWORDS: Record<string, string[]> = Object.fromEntries(
  SCENARIOS.map((s) => [
    s.id,
    [
      ...s.targetVocab.map((w) => w.toLowerCase()),
      ...s.theme.split(/[,\s]+/).filter((w) => w.length > 3),
    ],
  ])
);

const EXTRA_KEYWORDS: Record<string, string[]> = {
  cafe: ["coffee", "latte", "order", "drink", "menu"],
  restaurant: ["food", "dinner", "waiter", "dish"],
  supermarket: ["shop", "buy", "grocery", "price"],
  airport: ["flight", "passport", "travel", "plane"],
  school: ["class", "student", "teacher", "homework"],
  sports: ["football", "ball", "team", "game"],
  cinema: ["movie", "film", "ticket"],
  library: ["book", "read", "borrow"],
  museum: ["art", "painting", "history"],
  tech_store: ["computer", "phone", "laptop", "app"],
  travel_agency: ["trip", "hotel", "vacation", "europe"],
  hospital: ["doctor", "sick", "health", "medicine"],
  job_interview: ["job", "work", "resume", "skill"],
};

/** 命中分最高的场景；≥2 分才值得推荐。 */
export function matchScenario(quizText: string): string | null {
  const text = quizText.toLowerCase();
  let best: { id: string; score: number } | null = null;
  for (const s of SCENARIOS) {
    const keywords = [...(SCENARIO_KEYWORDS[s.id] ?? []), ...(EXTRA_KEYWORDS[s.id] ?? [])];
    let score = 0;
    for (const kw of keywords) {
      if (kw && text.includes(kw)) score += 1;
    }
    if (!best || score > best.score) best = { id: s.id, score };
  }
  return best && best.score >= 2 ? best.id : null;
}

/** 从本次作答的题目构造匹配文本（wordId + 题干）。 */
export function scenarioLinkForQuestions(questions: Array<{ wordId?: string; prompt?: string }>): string | null {
  const text = questions.map((q) => `${q.wordId ?? ""} ${q.prompt ?? ""}`).join(" ");
  const id = matchScenario(text);
  return id && scenarioById(id) ? id : null;
}

// ─── P3 兴趣排序：兴趣组 → 主题关键词 → 场景 theme 命中分 ───
const INTEREST_THEME_KEYWORDS: Record<string, string[]> = {
  animals: ["animal", "wildlife", "zoo", "pet"],
  space: ["space", "science", "planet", "star"],
  food: ["food", "restaurant", "cafe", "supermarket", "cooking", "dining", "drink"],
  sports: ["sport", "football", "physical", "team", "coaching"],
  story: ["history", "art", "culture", "museum", "cinema", "story", "book", "literature"],
  games: ["tech", "game", "technology", "gadget", "electronics"],
};

/** 按学生兴趣给场景列表稳定排序（命中多的在前，无命中的保持原序）。 */
export function orderScenariosByInterests<T extends { id: string; theme: string }>(list: T[], interests: string[]): T[] {
  if (interests.length === 0) return list;
  const keywords = interests.flatMap((g) => INTEREST_THEME_KEYWORDS[g] ?? []);
  if (keywords.length === 0) return list;
  const score = (s: T) => {
    const theme = s.theme.toLowerCase();
    return keywords.reduce((acc, kw) => acc + (theme.includes(kw) ? 1 : 0), 0);
  };
  return list
    .map((s, i) => ({ s, i, v: score(s) }))
    .sort((a, b) => b.v - a.v || a.i - b.i)
    .map(({ s }) => s);
}
