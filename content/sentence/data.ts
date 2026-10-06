/**
 * Sentence content pack — 句法馆内容（自产，题型对齐句游英语三种玩法：
 * 单词拼图 / 键盘打字 / 语音口语；课程线按其官网三档：零基础入门 /
 * 升学考试 / 商务职场）。句子全部自产：简单地道、附带中文释义，
 * 打分/拼图/打字都基于 en 原句 token 化（见 lib/sentence.ts）。
 */

export interface Sentence {
  en: string;
  cn: string;
}

export interface SentenceLesson {
  id: string; // starter-l1 — URL 与进度存储键
  number: number;
  title: string; // Greetings
  cnTitle: string; // 打招呼
  sentences: Sentence[];
}

export interface SentencePack {
  id: "starter" | "school" | "business";
  name: string;
  cnName: string;
  desc: string;
  icon: string;
  status: "live" | "soon";
  lessons: SentenceLesson[];
}

export const SENTENCE_PACKS: SentencePack[] = [
  {
    id: "starter",
    name: "Starter",
    cnName: "零基础入门",
    desc: "打招呼与日常生活短句，建立开口自信",
    icon: "sprout",
    status: "live",
    lessons: [
      {
        id: "starter-l1",
        number: 1,
        title: "Greetings",
        cnTitle: "打招呼",
        sentences: [
          { en: "I am a student.", cn: "我是学生。" },
          { en: "My name is Lily.", cn: "我叫莉莉。" },
          { en: "Nice to meet you.", cn: "很高兴见到你。" },
          { en: "This is my friend.", cn: "这是我的朋友。" },
          { en: "How are you today?", cn: "你今天好吗？" },
          { en: "I am fine, thank you.", cn: "我很好，谢谢。" },
          { en: "See you tomorrow.", cn: "明天见。" },
          { en: "Have a good day.", cn: "祝你今天愉快。" },
        ],
      },
      {
        id: "starter-l2",
        number: 2,
        title: "Daily Life",
        cnTitle: "日常生活",
        sentences: [
          { en: "I get up at seven.", cn: "我七点起床。" },
          { en: "She likes green apples.", cn: "她喜欢青苹果。" },
          { en: "We go to school by bus.", cn: "我们坐公交车上学。" },
          { en: "My father cooks dinner.", cn: "我爸爸做晚饭。" },
          { en: "The cat sleeps all day.", cn: "猫睡了一整天。" },
          { en: "I drink tea every morning.", cn: "我每天早上喝茶。" },
          { en: "They play football after class.", cn: "他们放学后踢足球。" },
          { en: "It is cold in winter.", cn: "冬天很冷。" },
        ],
      },
    ],
  },
  {
    id: "school",
    name: "School",
    cnName: "升学考试",
    desc: "校园学习与议论文高频句型，直指考点",
    icon: "grad",
    status: "live",
    lessons: [
      {
        id: "school-l1",
        number: 1,
        title: "School & Study",
        cnTitle: "校园与学习",
        sentences: [
          { en: "I have finished my homework.", cn: "我已经完成了作业。" },
          { en: "The teacher asked us a question.", cn: "老师问了我们一个问题。" },
          { en: "Reading makes a full man.", cn: "阅读使人充实。" },
          { en: "Practice makes perfect.", cn: "熟能生巧。" },
          { en: "We will take the exam next week.", cn: "我们下周参加考试。" },
          { en: "He is good at mathematics.", cn: "他擅长数学。" },
          { en: "Please hand in your paper on time.", cn: "请按时交卷。" },
          { en: "I spent two hours reviewing the notes.", cn: "我花了两个小时复习笔记。" },
        ],
      },
      {
        id: "school-l2",
        number: 2,
        title: "Opinions & Essays",
        cnTitle: "观点与议论",
        sentences: [
          { en: "In my opinion, it is worth trying.", cn: "在我看来，这值得尝试。" },
          { en: "More and more people care about the environment.", cn: "越来越多的人关心环境。" },
          { en: "Where there is a will, there is a way.", cn: "有志者事竟成。" },
          { en: "Failure is the mother of success.", cn: "失败是成功之母。" },
          { en: "We should make full use of our time.", cn: "我们应该充分利用时间。" },
          { en: "Technology has changed the way we learn.", cn: "科技改变了我们学习的方式。" },
          { en: "Hard work leads to success.", cn: "努力通向成功。" },
          { en: "Every coin has two sides.", cn: "凡事都有两面。" },
        ],
      },
    ],
  },
  {
    id: "business",
    name: "Business",
    cnName: "商务职场",
    desc: "会议邮件与谈判客户场景，开口即专业",
    icon: "work",
    status: "live",
    lessons: [
      {
        id: "business-l1",
        number: 1,
        title: "Meetings & Email",
        cnTitle: "会议与邮件",
        sentences: [
          { en: "The meeting starts at nine.", cn: "会议九点开始。" },
          { en: "I will send you the report today.", cn: "我今天把报告发给你。" },
          { en: "Please confirm the schedule by email.", cn: "请通过邮件确认日程。" },
          { en: "Could you repeat that, please?", cn: "请您再说一遍好吗？" },
          { en: "Let's discuss the plan in detail.", cn: "我们来详细讨论一下这个方案。" },
          { en: "Thank you for your prompt reply.", cn: "感谢您的及时回复。" },
          { en: "I look forward to your feedback.", cn: "我期待您的反馈。" },
          { en: "We need to finish the project by Friday.", cn: "我们需要在周五前完成这个项目。" },
        ],
      },
      {
        id: "business-l2",
        number: 2,
        title: "Negotiation & Clients",
        cnTitle: "谈判与客户",
        sentences: [
          { en: "Our price is very competitive.", cn: "我们的价格很有竞争力。" },
          { en: "We can offer a ten percent discount.", cn: "我们可以提供九折优惠。" },
          { en: "The client asked for a sample first.", cn: "客户要求先看样品。" },
          { en: "Delivery takes about two weeks.", cn: "交货大约需要两周。" },
          { en: "Quality is our top priority.", cn: "质量是我们的首要任务。" },
          { en: "Let's keep in touch about this order.", cn: "这个订单我们保持联系。" },
          { en: "We appreciate your long-term support.", cn: "我们感谢您的长期支持。" },
          { en: "I am afraid we cannot accept these terms.", cn: "恐怕我们不能接受这些条款。" },
        ],
      },
    ],
  },
];

// ─── 查找 ───

/** 按 lessonId 找到所属包与课（含 AI 伪课之外的常规课） */
export function findLesson(lessonId: string): { pack: SentencePack; lesson: SentenceLesson } | null {
  for (const pack of SENTENCE_PACKS) {
    const lesson = pack.lessons.find((l) => l.id === lessonId);
    if (lesson) return { pack, lesson };
  }
  return null;
}

/** 同包下一课（没有则 null） */
export function nextLessonOf(lessonId: string): SentenceLesson | null {
  const found = findLesson(lessonId);
  if (!found) return null;
  const sorted = [...found.pack.lessons].sort((a, b) => a.number - b.number);
  const i = sorted.findIndex((l) => l.id === lessonId);
  return sorted[i + 1] ?? null;
}
