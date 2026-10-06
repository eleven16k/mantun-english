/**
 * S1 四段式课程内容（V8 用户故事集 S1/S3）——按场景 id 索引的示范段与跟读段。
 *
 * 只存在于学生端：api 仓的 Scenario 副本不需要同步（四段是纯前端体验，
 * custom 场景没有 lesson 字段 → 直达实战，向后兼容）。内容为本项目自产，
 * 每个场景 = 2-3 轮示范对话（NPC 先开口，学生一句可模仿的回应）+
 * 3 句跟读句（从目标词表取材、短句优先，8-12 词）。
 *
 * S3 内容治理字段：
 * - `objectives`：本课知识点 tag（对齐关卡/雷达的维度词，人工维护）
 * - `opening`：审核过的实战开场白种子（注入 buildCallInstructions 固定槽位，
 *   ≤20 词）。修改 opening 必须过《场景内容审核清单.md》五行检查。
 */
export interface LessonTurn {
  who: "npc" | "user";
  en: string;
  zh: string;
}

export interface ScenarioLesson {
  objectives: string[];
  opening: string;
  demo: LessonTurn[];
  drills: Array<{ en: string; zh: string }>;
}

export const SCENARIO_LESSONS: Record<string, ScenarioLesson> = {
  school: {
    objectives: ["校园词汇", "方位问答 where is", "礼貌求助"],
    opening: "G'day mate! Welcome to your new school — let me show you around, it's going to be fun!",
    demo: [
      { who: "npc", en: "G'day, mate! I'm Leo. Is it your first day here?", zh: "你好呀朋友！我是 Leo。今天是你第一天来吗？" },
      { who: "user", en: "Yes! Can you show me my locker?", zh: "是啊！你能带我看一下我的储物柜吗？" },
      { who: "npc", en: "Sure! It's next to the canteen. Here's your timetable too.", zh: "当然！它就在食堂旁边。这是你的课程表。" },
    ],
    drills: [
      { en: "Where is my locker?", zh: "我的储物柜在哪里？" },
      { en: "The canteen is next to the library.", zh: "食堂在图书馆旁边。" },
      { en: "I have a new timetable today.", zh: "我今天有一张新课程表。" },
    ],
  },
  cafe: {
    objectives: ["点单句型 I'd like", "餐饮词汇", "礼貌用语 please"],
    opening: "Good morning! Welcome to The Morning Brew — what can I get started for you today?",
    demo: [
      { who: "npc", en: "Good morning! What can I get for you today?", zh: "早上好！今天想喝点什么？" },
      { who: "user", en: "I'd like a latte and a pastry, please.", zh: "我要一杯拿铁和一个糕点，谢谢。" },
      { who: "npc", en: "Great choice! For here or to go?", zh: "好选择！在这里喝还是带走？" },
    ],
    drills: [
      { en: "I'd like a latte, please.", zh: "我要一杯拿铁，谢谢。" },
      { en: "Can I have the receipt?", zh: "可以给我小票吗？" },
      { en: "Is the espresso strong here?", zh: "这里的浓缩咖啡浓吗？" },
    ],
  },
  sports: {
    objectives: ["运动词汇", "提问 When/What", "表达意愿 I want to join"],
    opening: "Hey there, champ! Ready to train with the team and get your gear sorted?",
    demo: [
      { who: "npc", en: "Hi there! Want to join our football club?", zh: "嗨！想加入我们的足球俱乐部吗？" },
      { who: "user", en: "Yes, coach! What do I need for practice?", zh: "想，教练！练习需要带什么？" },
      { who: "npc", en: "Just your jersey and water. See you at the stadium!", zh: "带上你的球衣和水就行。体育场见！" },
    ],
    drills: [
      { en: "When is the next practice?", zh: "下一次练习是什么时候？" },
      { en: "This is my favourite jersey.", zh: "这是我最喜欢的球衣。" },
      { en: "The tournament starts on Saturday.", zh: "锦标赛周六开始。" },
    ],
  },
  supermarket: {
    objectives: ["购物词汇", "问路 Which aisle", "询价与折扣"],
    opening: "Hi there! Welcome — are you shopping for the weekend BBQ? I can help you find everything.",
    demo: [
      { who: "npc", en: "Hello! Are you finding everything okay?", zh: "你好！东西都找得到吗？" },
      { who: "user", en: "Which aisle has the BBQ food, please?", zh: "请问烧烤食材在哪个通道？" },
      { who: "npc", en: "Aisle three — and the sausages are on discount today!", zh: "三号通道——今天香肠还有折扣！" },
    ],
    drills: [
      { en: "Where is the checkout?", zh: "收银台在哪里？" },
      { en: "Is there a discount today?", zh: "今天有折扣吗？" },
      { en: "I need fresh produce for a salad.", zh: "我需要新鲜农产品做沙拉。" },
    ],
  },
  cinema: {
    objectives: ["娱乐词汇", "购票句型", "数量表达"],
    opening: "Welcome to the premiere! Tonight's blockbuster is a great pick — shall I get you a ticket?",
    demo: [
      { who: "npc", en: "Welcome! What would you like to watch tonight?", zh: "欢迎！今晚想看什么？" },
      { who: "user", en: "One ticket for the blockbuster, please.", zh: "请给我一张这部大片的票。" },
      { who: "npc", en: "The seven o'clock screening? With popcorn?", zh: "七点那场吗？要爆米花吗？" },
    ],
    drills: [
      { en: "Two tickets for the evening screening, please.", zh: "请给我两张晚场票。" },
      { en: "Does this movie have subtitles?", zh: "这部电影有字幕吗？" },
      { en: "I'd like a large popcorn.", zh: "我要一大份爆米花。" },
    ],
  },
  airport: {
    objectives: ["机场流程词汇", "证件沟通", "指路理解"],
    opening: "Good afternoon, welcome to JFK. May I see your passport and ticket for check-in?",
    demo: [
      { who: "npc", en: "Good afternoon. May I see your passport, please?", zh: "下午好。请出示您的护照。" },
      { who: "user", en: "Here you are. Where is gate twelve?", zh: "给您。请问 12 号登机口在哪里？" },
      { who: "npc", en: "Down the hall, after security check. Here's your boarding pass.", zh: "过了安检一直走。这是您的登机牌。" },
    ],
    drills: [
      { en: "Here is my boarding pass.", zh: "这是我的登机牌。" },
      { en: "How long does the security check take?", zh: "安检要多长时间？" },
      { en: "I have two pieces of luggage.", zh: "我有两件行李。" },
    ],
  },
  library: {
    objectives: ["图书馆词汇", "借阅请求", "规则提醒理解"],
    opening: "Hello, welcome to the library. What book can I help you find today?",
    demo: [
      { who: "npc", en: "Hello. Can I help you find something?", zh: "你好。需要帮你找什么吗？" },
      { who: "user", en: "I'd like to borrow a book about space.", zh: "我想借一本关于太空的书。" },
      { who: "npc", en: "Check the catalog first — and keep your voice down, please.", zh: "先查一下目录——请小声一点。" },
    ],
    drills: [
      { en: "How do I get a library card?", zh: "我怎么办借书证？" },
      { en: "This book is overdue, I'm sorry.", zh: "对不起，这本书过期了。" },
      { en: "Where are the periodicals?", zh: "期刊在哪里？" },
    ],
  },
  museum: {
    objectives: ["艺术词汇", "推荐应答", "表达喜好 favourite"],
    opening: "Bonjour! Welcome to the Louvre — shall we begin the tour with the Renaissance gallery?",
    demo: [
      { who: "npc", en: "Bonjour! Welcome to the Louvre. Ready for the tour?", zh: "你好！欢迎来到卢浮宫。准备好看展览了吗？" },
      { who: "user", en: "Yes! Which exhibit should I see first?", zh: "准备好了！我应该先看哪个展品？" },
      { who: "npc", en: "The Renaissance gallery — it holds a true masterpiece.", zh: "文艺复兴展厅——那里有一件真正的杰作。" },
    ],
    drills: [
      { en: "This sculpture is my favourite.", zh: "这座雕塑是我的最爱。" },
      { en: "How old is this masterpiece?", zh: "这件杰作有多少年了？" },
      { en: "The gallery closes at six.", zh: "展厅六点关闭。" },
    ],
  },
  tech_store: {
    objectives: ["科技词汇", "产品咨询", "保修提问"],
    opening: "Welcome! Looking for a new gadget today? I can show you our best laptops.",
    demo: [
      { who: "npc", en: "Hi! Looking for a new gadget today?", zh: "嗨！今天想看看新的电子产品吗？" },
      { who: "user", en: "Yes. Which laptop has the best processor?", zh: "是啊。哪台笔记本的处理器最好？" },
      { who: "npc", en: "This one — and it comes with a two-year warranty.", zh: "这台——还带两年保修。" },
    ],
    drills: [
      { en: "Does the warranty cover the screen?", zh: "保修包括屏幕吗？" },
      { en: "The resolution on this screen is amazing.", zh: "这块屏幕的分辨率太棒了。" },
      { en: "Is the software easy to use?", zh: "这个软件好用吗？" },
    ],
  },
  travel_agency: {
    objectives: ["旅行规划词汇", "预算表达", "咨询句型 Can you"],
    opening: "Hello, dreamer! Ready to plan your European adventure? Tell me your budget.",
    demo: [
      { who: "npc", en: "Hello! Dreaming of a European trip?", zh: "你好！在梦想欧洲之旅吗？" },
      { who: "user", en: "Yes! Can you help me plan my itinerary?", zh: "是啊！你能帮我做行程规划吗？" },
      { who: "npc", en: "Of course. What's your budget for accommodation?", zh: "当然。住宿的预算是多少？" },
    ],
    drills: [
      { en: "Here is my travel budget.", zh: "这是我的旅行预算。" },
      { en: "Is sightseeing included in the itinerary?", zh: "行程里包含观光吗？" },
      { en: "What transportation do you recommend?", zh: "你推荐什么交通方式？" },
    ],
  },
  hospital: {
    objectives: ["症状描述", "医患问答", "数字与时间表达"],
    opening: "Hello, I'm Dr. Miller. Come in — what seems to be the problem today?",
    demo: [
      { who: "npc", en: "Hello, I'm Dr. Miller. What brings you in today?", zh: "你好，我是米勒医生。今天哪里不舒服？" },
      { who: "user", en: "I have a sore throat and a headache.", zh: "我嗓子疼，还有点头痛。" },
      { who: "npc", en: "I see. That symptom is common — let's take a look.", zh: "明白了。这个症状很常见——我们来看看。" },
    ],
    drills: [
      { en: "I have an appointment at three.", zh: "我约了三点看诊。" },
      { en: "Could you explain the diagnosis again?", zh: "您能再解释一下诊断结果吗？" },
      { en: "Do I need a prescription?", zh: "我需要处方吗？" },
    ],
  },
  restaurant: {
    objectives: ["餐桌词汇", "预订表达", "侍者建议理解"],
    opening: "Good evening, and welcome! May I start you off with today's appetizers?",
    demo: [
      { who: "npc", en: "Good evening. Do you have a reservation?", zh: "晚上好。您有预订吗？" },
      { who: "user", en: "Yes, under the name Chen, for two.", zh: "有，用陈的名字订的两位。" },
      { who: "npc", en: "Perfect. May I start you with an appetizer?", zh: "好的。要先来一份开胃菜吗？" },
    ],
    drills: [
      { en: "I have a reservation for two.", zh: "我订了两个人的位子。" },
      { en: "What's today's special cuisine?", zh: "今天的特色菜是什么？" },
      { en: "Is the water complimentary?", zh: "水是免费提供的吗？" },
    ],
  },
  job_interview: {
    objectives: ["自我介绍", "求职问答 Why", "经历描述"],
    opening: "Thanks for coming in today. I've read your application — tell me a bit about yourself.",
    demo: [
      { who: "npc", en: "Thanks for coming. Tell me about yourself.", zh: "感谢你来面试。先介绍一下你自己吧。" },
      { who: "user", en: "I'm a student who loves coding and teamwork.", zh: "我是一名喜欢编程和团队合作的学生。" },
      { who: "npc", en: "Nice. Why do you want this internship?", zh: "不错。你为什么想要这份实习？" },
    ],
    drills: [
      { en: "I want to gain real work experience.", zh: "我想获得真实的工作经验。" },
      { en: "My qualifications match this internship.", zh: "我的条件和这份实习很匹配。" },
      { en: "I took the initiative to learn Python.", zh: "我主动自学了 Python。" },
    ],
  },
};

export function lessonFor(scenarioId: string): ScenarioLesson | undefined {
  return SCENARIO_LESSONS[scenarioId];
}

// ─── V8-P2 NPC 人格卡片 ───
// persona 挂在 NPC（不是课程）上：性格标签 2-3 个 + 口吻示例 1 句 +
// 纠错三档（encouraging/standard/strict —— Praktika Soft/Balanced/Strict
// 的儿童版）。与 P1 recast 段合并注入 buildCallInstructions。
export type CorrectionTier = "encouraging" | "standard" | "strict";

export interface NpcPersona {
  traits: string[];
  /** 口吻示例（EN，1 句）——注入 prompt 作语域锚点 */
  style: string;
  correction: CorrectionTier;
}

export const NPC_PERSONAS: Record<string, NpcPersona> = {
  school: { traits: ["friendly Aussie classmate", "matey", "welcoming"], style: "G'day mate! Let me show you around.", correction: "encouraging" },
  cafe: { traits: ["warm busy barista", "cheerful"], style: "What can I get started for you?", correction: "standard" },
  sports: { traits: ["energetic football coach", "bold", "motivating"], style: "Let's go, champ — one more drill!", correction: "strict" },
  supermarket: { traits: ["helpful store assistant", "patient"], style: "Need a hand finding anything?", correction: "encouraging" },
  cinema: { traits: ["fun ticket agent", "chatty", "chill"], style: "Ready for tonight's blockbuster?", correction: "standard" },
  airport: { traits: ["professional ground staff", "precise", "calm"], style: "May I see your documents, please?", correction: "strict" },
  library: { traits: ["strict librarian", "knowledgeable", "quiet"], style: "Shh — welcome to the library.", correction: "strict" },
  museum: { traits: ["enthusiastic museum guide", "artistic", "warm"], style: "Shall we begin the tour, mon ami?", correction: "encouraging" },
  tech_store: { traits: ["precise tech specialist", "curious", "helpful"], style: "Looking for something new today?", correction: "standard" },
  travel_agency: { traits: ["warm travel agent", "dreamy", "organized"], style: "Where shall we send you next?", correction: "standard" },
  hospital: { traits: ["calm physician", "professional", "reassuring"], style: "Tell me what brings you in.", correction: "standard" },
  restaurant: { traits: ["charming head waiter", "proud", "attentive"], style: "Benvenuti! A table for you tonight?", correction: "standard" },
  job_interview: { traits: ["professional hiring manager", "sharp", "fair"], style: "Tell me a bit about yourself.", correction: "strict" },
};

export function personaFor(scenarioId: string): NpcPersona | undefined {
  return NPC_PERSONAS[scenarioId];
}
