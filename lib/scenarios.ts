/**
 * NovaWorld scenario system — ported from the NovaWorld AI K12 English
 * Mastery prototype into Lexi.
 *
 * A scenario is an immersive role-play: the student talks (text or live
 * voice) with an NPC to complete a mission, weaving in target vocabulary.
 * Scenario copy is bilingual ({en, zh}) and resolved with the app locale.
 */
import { VOCAB_LISTS } from "./vocab-lists";

export type VocabLevel = "Primary" | "JuniorHigh" | "SeniorHigh" | "Custom";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Bilingual {
  en: string;
  zh: string;
}

export interface Scenario {
  id: string;
  title: Bilingual;
  location: Bilingual;
  description: Bilingual;
  difficulty: Difficulty;
  image: string;
  emoji: string;
  npc: string;
  npcRole: Bilingual;
  prompt: string;
  targetVocab: string[];
  theme: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: "school",
    title: { en: "First Day at School", zh: "入学第一天" },
    location: { en: "Sydney, Australia", zh: "悉尼, 澳大利亚" },
    description: { en: "Meet your new classmates and find your locker.", zh: "结识新同学并找到你的储物柜。" },
    difficulty: "Beginner",
    image: "https://picsum.photos/seed/australia-school/800/1000",
    emoji: "🎒",
    npc: "Leo",
    npcRole: { en: "Classmate", zh: "同学" },
    prompt:
      "You are Leo, a friendly Australian student. It's the first day of school and you're welcoming a new international student. Use some Aussie slang like 'G'day' or 'mate'. Help them feel at home.",
    targetVocab: ["locker", "timetable", "canteen", "principal", "assignment"],
    theme: "school life, education, campus, making friends",
  },
  {
    id: "cafe",
    title: { en: "The Morning Brew", zh: "晨间咖啡" },
    location: { en: "London, UK", zh: "伦敦, 英国" },
    description: { en: "Order a coffee and a pastry at a busy local cafe.", zh: "在繁忙的当地咖啡馆点一杯咖啡和一份糕点。" },
    difficulty: "Beginner",
    image: "https://picsum.photos/seed/london-cafe/800/1000",
    emoji: "☕",
    npc: "Oliver",
    npcRole: { en: "Barista", zh: "咖啡师" },
    prompt:
      "You are Oliver, a friendly but busy barista in a London cafe. Your goal is to help the student order food and drink. Keep responses concise and encouraging for a K12 student.",
    targetVocab: ["barista", "pastry", "espresso", "receipt", "decaf"],
    theme: "ordering food, drinks, social interaction, payment",
  },
  {
    id: "sports",
    title: { en: "Game Day Prep", zh: "比赛日准备" },
    location: { en: "London, UK", zh: "伦敦, 英国" },
    description: { en: "Join a local football club and get your gear.", zh: "加入当地足球俱乐部并领取装备。" },
    difficulty: "Beginner",
    image: "https://picsum.photos/seed/london-sports/800/1000",
    emoji: "⚽",
    npc: "Coach Harry",
    npcRole: { en: "Coach", zh: "教练" },
    prompt:
      "You are Coach Harry, an energetic football coach in London. A new student wants to join the club. Welcome them, ask about their experience, and tell them what gear they need for the first practice.",
    targetVocab: ["practice", "jersey", "referee", "tournament", "stadium"],
    theme: "sports, physical activity, teamwork, coaching",
  },
  {
    id: "supermarket",
    title: { en: "Supermarket", zh: "超市购物" },
    location: { en: "Sydney, Australia", zh: "悉尼, 澳大利亚" },
    description: { en: "Buy groceries for a weekend BBQ.", zh: "为周末烧烤购买杂货。" },
    difficulty: "Beginner",
    image: "https://picsum.photos/seed/supermarket/800/1000",
    emoji: "🛒",
    npc: "Amy",
    npcRole: { en: "Store Assistant", zh: "店员" },
    prompt:
      "You are Amy, a friendly store assistant in a Sydney supermarket. Help the student find items for a BBQ and explain any discounts.",
    targetVocab: ["grocery", "aisle", "discount", "checkout", "produce"],
    theme: "shopping, food, daily life, prices",
  },
  {
    id: "cinema",
    title: { en: "At the Cinema", zh: "在电影院" },
    location: { en: "Los Angeles, USA", zh: "洛杉矶, 美国" },
    description: { en: "Watch a blockbuster in Hollywood.", zh: "在好莱坞看大片。" },
    difficulty: "Beginner",
    image: "https://picsum.photos/seed/cinema/800/1000",
    emoji: "🎬",
    npc: "Jake",
    npcRole: { en: "Ticket Agent", zh: "售票员" },
    prompt:
      "You are Jake, a ticket agent at a famous Hollywood cinema. Help the student choose a movie, pick seats, and buy snacks.",
    targetVocab: ["blockbuster", "premiere", "popcorn", "subtitle", "screening"],
    theme: "entertainment, movies, social, leisure",
  },
  {
    id: "airport",
    title: { en: "Terminal Check-in", zh: "航站楼值机" },
    location: { en: "New York, USA", zh: "纽约, 美国" },
    description: { en: "Navigate the check-in process and security at JFK Airport.", zh: "在肯尼迪机场办理登机手续并通过安检。" },
    difficulty: "Intermediate",
    image: "https://picsum.photos/seed/jfk-airport/800/1000",
    emoji: "✈️",
    npc: "Sarah",
    npcRole: { en: "Ground Staff", zh: "地勤人员" },
    prompt:
      "You are Sarah, a professional ground staff member at JFK Airport. You are helping a student check in for their flight. Ask for their passport and ticket, and explain the security rules. Be polite but firm.",
    targetVocab: ["boarding pass", "terminal", "security check", "gate", "luggage"],
    theme: "travel, airport procedures, security, documentation",
  },
  {
    id: "library",
    title: { en: "The Quiet Corner", zh: "安静的角落" },
    location: { en: "New York, USA", zh: "纽约, 美国" },
    description: { en: "Find a specific book and sign up for a library card.", zh: "寻找一本特定的书并办理借书证。" },
    difficulty: "Intermediate",
    image: "https://picsum.photos/seed/ny-library/800/1000",
    emoji: "📚",
    npc: "Ms. Thompson",
    npcRole: { en: "Librarian", zh: "图书管理员" },
    prompt:
      "You are Ms. Thompson, a helpful but strict librarian at the New York Public Library. Help the student find a book and explain how to sign up for a library card. Remind them to keep their voice down.",
    targetVocab: ["catalog", "reference", "borrow", "overdue", "periodical"],
    theme: "library, research, books, rules, registration",
  },
  {
    id: "museum",
    title: { en: "Museum Tour", zh: "博物馆导览" },
    location: { en: "Paris, France", zh: "巴黎, 法国" },
    description: { en: "Explore the Louvre with a knowledgeable guide.", zh: "与知识渊博的导游一起探索卢浮宫。" },
    difficulty: "Intermediate",
    image: "https://picsum.photos/seed/louvre/800/1000",
    emoji: "🖼️",
    npc: "Claire",
    npcRole: { en: "Museum Guide", zh: "博物馆导游" },
    prompt:
      "You are Claire, an enthusiastic museum guide at the Louvre. You are showing a student around the art gallery. Talk about famous paintings and history.",
    targetVocab: ["exhibit", "masterpiece", "sculpture", "renaissance", "gallery"],
    theme: "art, history, museum, culture",
  },
  {
    id: "tech_store",
    title: { en: "Tech Store", zh: "科技商店" },
    location: { en: "Tokyo, Japan", zh: "东京, 日本" },
    description: { en: "Buy the latest gadgets in Akihabara.", zh: "在秋叶原购买最新的电子产品。" },
    difficulty: "Intermediate",
    image: "https://picsum.photos/seed/akihabara/800/1000",
    emoji: "💻",
    npc: "Kenji",
    npcRole: { en: "Tech Specialist", zh: "科技专家" },
    prompt:
      "You are Kenji, a tech specialist in a busy Tokyo electronics store. Help the student choose a new laptop or smartphone. Explain the features and specs.",
    targetVocab: ["processor", "resolution", "warranty", "gadget", "software"],
    theme: "technology, shopping, electronics, features",
  },
  {
    id: "travel_agency",
    title: { en: "Travel Agency", zh: "旅行社" },
    location: { en: "London, UK", zh: "伦敦, 英国" },
    description: { en: "Plan your dream vacation around Europe.", zh: "规划你的欧洲梦幻之旅。" },
    difficulty: "Intermediate",
    image: "https://picsum.photos/seed/travel/800/1000",
    emoji: "🗺️",
    npc: "Sophie",
    npcRole: { en: "Travel Agent", zh: "旅行顾问" },
    prompt:
      "You are Sophie, a travel agent in London. Help the student plan a trip across Europe. Discuss transport, accommodation, and sightseeing.",
    targetVocab: ["itinerary", "accommodation", "transportation", "sightseeing", "budget"],
    theme: "travel, planning, geography, logistics",
  },
  {
    id: "hospital",
    title: { en: "Medical Check-up", zh: "医疗检查" },
    location: { en: "Toronto, Canada", zh: "多伦多, 加拿大" },
    description: { en: "Explain your symptoms and get a prescription.", zh: "解释你的症状并获取处方。" },
    difficulty: "Advanced",
    image: "https://picsum.photos/seed/toronto-hospital/800/1000",
    emoji: "🏥",
    npc: "Dr. Miller",
    npcRole: { en: "Physician", zh: "内科医生" },
    prompt:
      "You are Dr. Miller, a professional physician in Toronto. A student has come in for a check-up. Ask about their symptoms and explain the treatment plan. Use some medical terminology but keep it accessible for a student.",
    targetVocab: ["symptom", "prescription", "diagnosis", "inflammation", "appointment"],
    theme: "health, medical check-up, symptoms, treatment",
  },
  {
    id: "restaurant",
    title: { en: "Fine Dining", zh: "高级餐厅" },
    location: { en: "Rome, Italy", zh: "罗马, 意大利" },
    description: { en: "Enjoy a traditional Italian dinner.", zh: "享受传统的意大利晚餐。" },
    difficulty: "Advanced",
    image: "https://picsum.photos/seed/rome-restaurant/800/1000",
    emoji: "🍝",
    npc: "Marco",
    npcRole: { en: "Head Waiter", zh: "领班" },
    prompt:
      "You are Marco, the head waiter at a high-end restaurant in Rome. Help the student navigate the menu and recommend some local specialties.",
    targetVocab: ["cuisine", "reservation", "beverage", "appetizer", "complimentary"],
    theme: "dining, food, service, etiquette",
  },
  {
    id: "job_interview",
    title: { en: "Job Interview", zh: "求职面试" },
    location: { en: "San Francisco, USA", zh: "旧金山, 美国" },
    description: { en: "Interview for a summer internship at a tech company.", zh: "面试一家科技公司的暑期实习职位。" },
    difficulty: "Advanced",
    image: "https://picsum.photos/seed/office/800/1000",
    emoji: "💼",
    npc: "Mr. Henderson",
    npcRole: { en: "Hiring Manager", zh: "招聘经理" },
    prompt:
      "You are Mr. Henderson, a professional hiring manager at a Silicon Valley tech company. Interview the student for a summer internship. Ask about their skills and experience.",
    targetVocab: ["internship", "qualification", "experience", "initiative", "collaboration"],
    theme: "career, interview, professional, skills",
  },
];

/** Progressive difficulty filter — Primary sees Beginner only, etc. */
export function getScenarios(level: VocabLevel): Scenario[] {
  if (level === "Primary") return SCENARIOS.filter((s) => s.difficulty === "Beginner");
  if (level === "JuniorHigh")
    return SCENARIOS.filter((s) => s.difficulty === "Beginner" || s.difficulty === "Intermediate");
  return SCENARIOS;
}

export function scenarioById(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}

/** Short sample of the level word list, used to ground AI generation. */
export function levelVocabSample(level: VocabLevel, count = 150): string[] {
  const list = VOCAB_LISTS[level === "Custom" ? "SeniorHigh" : level] ?? [];
  return [...list].sort(() => 0.5 - Math.random()).slice(0, count);
}

/**
 * System instruction for the live voice call (speech-to-speech realtime
 * engine). Voice replies must stay short and speakable — no formatting,
 * no translations read aloud.
 */
export function buildCallInstructions(scenario: Scenario, level: VocabLevel, customVocab: string[]): string {
  const vocab = [...scenario.targetVocab, ...customVocab].filter(Boolean);
  const vocabLine = vocab.length
    ? `Work these words naturally into the conversation when relevant: ${vocab.join(", ")}.`
    : "";
  const levelLine =
    level === "Primary"
      ? "Speak for a primary-school learner: very simple words, short sentences."
      : level === "JuniorHigh"
        ? "Speak for a junior-high learner: common everyday vocabulary."
        : "Speak for a senior-high learner: natural conversational English.";
  return [
    scenario.prompt,
    "You are role-playing a live phone call with a Chinese K12 student practicing English.",
    levelLine,
    vocabLine,
    // Latency: the gateway model thinks before answering — keep the task small
    // so reasoning, generation, and TTS synthesis all stay short.
    "Respond immediately and spontaneously, like a real phone call. Keep every reply to 1-2 very short sentences (under 25 words). Never mention thinking or reasoning. Ask a follow-up question when the student seems stuck. Speak only English.",
  ]
    .filter(Boolean)
    .join(" ");
}

/** System instruction for the text chat NPC (bilingual structured reply). */
export function buildChatSystemInstruction(
  scenario: Scenario,
  level: VocabLevel,
  customVocab: string[],
  locale: "en" | "zh",
  message: string
): string {
  const levelLine =
    level === "Primary"
      ? `Use vocabulary suitable for K6 (Primary school) students. Example words: ${(VOCAB_LISTS.Primary ?? []).slice(0, 30).join(", ")}.`
      : level === "JuniorHigh"
        ? `Use vocabulary suitable for K9 (Junior High) students. Example words: ${(VOCAB_LISTS.JuniorHigh ?? []).slice(0, 30).join(", ")}.`
        : `Use vocabulary suitable for K12 (Senior High) students. Example words: ${(VOCAB_LISTS.SeniorHigh ?? []).slice(0, 30).join(", ")}.`;
  const customLine = customVocab.length
    ? ` MANDATORY: You MUST try to naturally incorporate as many of the following words as possible into your response: ${customVocab.join(", ")}. If a word is used, ensure it is used correctly in context.`
    : "";
  return [
    scenario.prompt,
    levelLine,
    customLine,
    `Your task is to respond as the NPC AND provide a helpful suggestion for the user's last message.`,
    `NPC Response Rules: Always provide your response ONLY in English. Do not use any other language in the NPC dialogue.`,
    `Follow the response with a separator '---', then a complete Chinese translation, followed by another '---', and finally a brief 'Learning Tip' in brackets like [Tip: ...].`,
    `Example: 'Hello! How are you? \\n--- \\n 你好！你好吗？ \\n--- \\n [Tip: Use "How are you?" to greet people.]'`,
    `User Suggestion Rules: Analyze the user's last message: "${message}". Provide a brief suggestion on how to improve it (e.g., better grammar, more natural phrasing, or a more polite alternative). Provide this in Chinese (简体中文).`,
    locale === "zh"
      ? `Return the result as a JSON object with two fields: 'npcResponse' and 'userSuggestion'.`
      : `Return the result as a JSON object with two fields: 'npcResponse' and 'userSuggestion'.`,
  ].join("\n");
}
