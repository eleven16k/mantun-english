"use client";

import { useState, useEffect } from "react";
import { TargetIcon, PigIcon, FoodIcon, BallIcon, CastleIcon, GamepadIcon, CheckCircleIcon, HourglassIcon, SparklesIcon, MessageIcon, BooksIcon, BookIcon, KeyboardIcon, GraduationCapIcon, CardsIcon } from "@/components/icons";
import { STAGES, saveStage, isStage, stageDef, type Stage } from "@/lib/stage";
import { hydrateVocabFromLexicon } from "@/lib/vocab";
import type { MessageKey } from "@/lib/i18n";
import { RocketIcon } from "@/components/SvgIcons";

/** 学段角色 → SVG 图标（对齐原型） */
const STAGE_ICONS: Record<Stage, React.ReactNode> = {
  primary: <PigIcon size={30} />,
  junior: <KeyboardIcon size={30} />,
  senior: <BooksIcon size={30} />,
  college: <GraduationCapIcon size={30} />,
  postgrad: <SparklesIcon size={30} />,
  abroad: <PlaneGlyph />,
  adult: <BriefGlyph />,
};
function PlaneGlyph() {
  return <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>;
}
function BriefGlyph() {
  return <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>;
}

/** 迷你定级 5 题（每档一题；M3 起换词库分档抽词防背题） */
const MINI_QUIZ = [
  { lvKey: "onb.stagePrimaryCount", word: "apple", opts: ["苹果", "桌子", "小狗", "跑"], ans: 0, role: "primary" },
  { lvKey: "onb.stageJuniorCount", word: "communicate", opts: ["交流", "取消", "数数", "搬运"], ans: 0, role: "junior" },
  { lvKey: "onb.stageSeniorCount", word: "consequence", opts: ["后果", "自信", "典礼", "仪表"], ans: 0, role: "senior" },
  { lvKey: "onb.stageCollegeCount", word: "elaborate", opts: ["详细阐述", "蒸发", "选举", "放松"], ans: 0, role: "college" },
  { lvKey: "onb.stagePostgradCount", word: "paradigm", opts: ["范式", "公园", "悖论", "药剂量"], ans: 0, role: "postgrad" },
] as const;

const TRACK_LABEL_ZH: Record<string, string> = { xiaoshengchu: "小学故事", zhongkao: "中考故事", gaokao: "高考故事" };
const WQ_LABEL_ZH: Record<string, string> = { Primary: "入门级", JuniorHigh: "初中级", SeniorHigh: "高中级" };

/** 角色默认目标分（goal 步骤预设；用户可调） */
const STAGE_TARGET: Record<Stage, number> = { primary: 85, junior: 100, senior: 105, college: 105, postgrad: 110, abroad: 100, adult: 90 };

/** 兴趣 id → SVG 图标（替代 emoji） */
const INTEREST_ICONS: Record<string, React.ReactNode> = {
  animals: <PigIcon size={26} />,
  space: <RocketIcon size={26} />,
  food: <FoodIcon size={26} />,
  sports: <BallIcon size={26} />,
  story: <CastleIcon size={26} />,
  games: <GamepadIcon size={26} />,
};
import { useRouter } from "next/navigation";
import { VOCAB } from "@/lib/vocab";
import { updateProfile, isLoggedIn, submitAnswer } from "@/lib/api";
import { setProfile } from "@/lib/plan";
import { useI18n } from "@/lib/i18n";
import type { Question } from "@/lib/types";

/**
 * /onboarding — A2 (track + goal) + A3 (adaptive placement test).
 * Steps: 1. Pick track → 2. Set goal/exam date → 3. 10-question adaptive test → 4. Result → /chat
 * Test doesn't consume hearts/coins. Questions adapt up/down by difficulty.
 */

const BASE_STEPS = ["track", "goal", "test", "result"] as const;

// V8-P3：新生完整流在 result 后追加 兴趣→每日目标→定制仪式 三步；
// 深链复访（?step=goal|test 换学段）不加——只有新生走全量。
const EXTRA_STEPS = ["interests", "daily", "theater"] as const;
type Step = (typeof BASE_STEPS[number]) | (typeof EXTRA_STEPS[number]);

const TRACKS = [
  { id: "zhongkao", labelKey: "onb.trackZhongkao", descKey: "onb.trackZhongkaoDesc" },
  { id: "xiaoshengchu", labelKey: "onb.trackXiaoshengchu", descKey: "onb.trackXiaoshengchuDesc" },
  { id: "gaokao", labelKey: "onb.trackGaokao", descKey: "onb.trackGaokaoDesc" },
] as const;

const VALID_TRACKS = ["zhongkao", "xiaoshengchu", "gaokao"];

// V8-P3 兴趣六组（豚豚宇宙话题库的推荐权重 + Jev 雷达 state 先验）
const INTEREST_GROUPS = [
  { id: "animals", icon: "animals", labelKey: "onb.intAnimals" },
  { id: "space", icon: "space", labelKey: "onb.intSpace" },
  { id: "food", icon: "food", labelKey: "onb.intFood" },
  { id: "sports", icon: "sports", labelKey: "onb.intSports" },
  { id: "story", icon: "story", labelKey: "onb.intStory" },
  { id: "games", icon: "games", labelKey: "onb.intGames" },
] as const;

const DAILY_OPTIONS = [
  { min: 5, labelKey: "onb.daily5" },
  { min: 10, labelKey: "onb.daily10" },
  { min: 15, labelKey: "onb.daily15" },
] as const;

/** Generate an adaptive question at a difficulty level (1-5) from the vocab pool. */
function makeQ(level: number, idx: number): Question {
  const pool = VOCAB.filter(v => v.difficulty === Math.min(5, Math.max(1, level)));
  const fallback = VOCAB.length ? VOCAB : [];
  const word = (pool.length ? pool : fallback)[idx % (pool.length || fallback.length || 1)];
  if (!word) {
    return { id: `t${idx}`, wordId: `t${idx}`, type: "word-to-cn", prompt: "Loading…", choices: ["A","B","C","D"], correctIndex: 0 };
  }
  const others = VOCAB.filter(v => v.id !== word.id && v.cn !== word.cn);
  const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 3).map(v => v.cn);
  const choices = [word.cn, ...shuffled].sort(() => Math.random() - 0.5);
  return {
    id: `t${idx}`,
    wordId: word.id,
    type: "word-to-cn",
    prompt: word.en,
    promptSub: word.phonetic,
    choices,
    correctIndex: choices.indexOf(word.cn),
    explanation: `${word.en} = ${word.cn}`,
  };
}

export default function OnboardingPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [step, setStep] = useState<Step>("track");
  const [track, setTrack] = useState<string>("");
  // ── 角色选择（升级原选轨步骤）：pick 选卡 / test 迷你定级 / suggest 建议确认 / assign 分配预览 ──
  const [stagePhase, setStagePhase] = useState<"pick" | "test" | "suggest" | "assign">("pick");
  const [stage, setStage] = useState<Stage | null>(null);
  const [tIdx, setTIdx] = useState(0);
  const [tCorrect, setTCorrect] = useState(0);
  const [tAnswered, setTAnswered] = useState<number | null>(null);
  const [targetScore, setTargetScore] = useState(100);
  const [examDate, setExamDate] = useState("");
  // 深链入口（升学/设置页换学段）：/onboarding?step=goal|test&track=X&next=/reading
  // 支持跳过选轨直接定级；next 决定定级完成后的落地页。
  const [nextPath, setNextPath] = useState("/chat");
  // 确认角色：本地持久化 + 服务端落库（游客静默）+ 联动 track/目标分 + 重挂题库
  const confirmStage = (id: Stage) => {
    setStage(id);
    saveStage(id);
    const def = stageDef(id);
    setTrack(def.track);
    setTargetScore(STAGE_TARGET[id]);
    void hydrateVocabFromLexicon({ tags: def.quizTags, difficulties: def.quizDifficulties });
    // 游客不调 PATCH（fetchApi 401 会全局跳登录）——本地已持久化，登录后下次 onboarding 再落库
    if (isLoggedIn()) updateProfile({ stage: id }).catch(() => {});
  };

  const startMini = () => { setTIdx(0); setTCorrect(0); setTAnswered(null); setStagePhase("test"); };

  const answerMini = (i: number) => {
    if (tAnswered !== null) return;
    setTAnswered(i);
    if (i === MINI_QUIZ[tIdx].ans) setTCorrect((c) => c + 1);
    setTimeout(() => {
      if (tIdx + 1 < MINI_QUIZ.length) {
        setTIdx(tIdx + 1);
        setTAnswered(null);
      } else {
        setStagePhase("suggest");
      }
    }, 950);
  };

  // V8-P3：无 step 深链 = 新生 → 走 兴趣/目标/仪式 三步
  const [isFullFlow] = useState(() => {
    if (typeof window === "undefined") return true;
    return !new URLSearchParams(window.location.search).get("step");
  });
  const STEPS = isFullFlow ? [...BASE_STEPS, ...EXTRA_STEPS] : [...BASE_STEPS];

  // P3 兴趣 + 每日目标 + 仪式动画
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [dailyGoal, setDailyGoal] = useState<number>(10);
  const [theaterTick, setTheaterTick] = useState(0);

  useEffect(() => {
    if (step !== "theater") return;
    // 3 步打勾的仪式编排（纯前端 setTimeout，不假装有后台计算）
    const timers = [1200, 2400, 3600].map((ms, i) =>
      setTimeout(() => setTheaterTick(i + 1), ms)
    );
    return () => timers.forEach(clearTimeout);
  }, [step]);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const qTrack = sp.get("track");
    const qStep = sp.get("step");
    const qNext = sp.get("next");
    if (qTrack && VALID_TRACKS.includes(qTrack)) {
      setTrack(qTrack);
      // 角色联动：轨反推默认角色（深链兼容旧设置入口）
      const linked = STAGES.find((sd) => sd.track === qTrack);
      if (linked) setStage(linked.id);
      if (qStep === "goal" || qStep === "test") setStep(qStep);
    }
    if (qNext && qNext.startsWith("/")) setNextPath(qNext);
  }, []);

  // Adaptive test state
  const [qIdx, setQIdx] = useState(0);
  const [difficulty, setDifficulty] = useState(2);
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [estimatedScore, setEstimatedScore] = useState(0);

  const TOTAL_TEST = 10;

  const startTest = () => {
    setQuestions(Array.from({ length: TOTAL_TEST }, (_, i) => makeQ(2, i)));
    setStep("test");
  };

  const answer = (i: number) => {
    if (answered) return;
    const q = questions[qIdx];
    setSelected(i);
    setAnswered(true);
    const isCorrect = i === q.correctIndex;
    // 判断层证据（全量接入）：摸底是画像冷启动的最佳数据源——走完整 economy
    //（真实词卡首次 SRS 曝光），登录态才报（游客摸底不上报）
    if (isLoggedIn()) {
      void submitAnswer(q.wordId, isCorrect, q.prompt, {
        questionType: "placement", chosen: q.choices[i], correct: q.choices[q.correctIndex],
      }).catch(() => {});
    }
    if (isCorrect) {
      setCorrectCount(c => c + 1);
      setDifficulty(d => Math.min(5, d + 1));
    } else {
      setDifficulty(d => Math.max(1, d - 1));
    }
    // Pre-generate next question at new difficulty
    if (qIdx + 1 < TOTAL_TEST) {
      const nextQ = makeQ(difficulty + (isCorrect ? 1 : -1), qIdx + 1);
      setQuestions(prev => {
        const copy = [...prev];
        copy[qIdx + 1] = nextQ;
        return copy;
      });
    }
    setTimeout(() => {
      if (qIdx + 1 >= TOTAL_TEST) {
        // Finish: estimate score (40-120 range based on accuracy)
        const accuracy = (correctCount + (isCorrect ? 1 : 0)) / TOTAL_TEST;
        const est = Math.round(40 + accuracy * 80);
        setEstimatedScore(est);
        // Save profile
        // Save to server (authoritative) + kv storage (for plan engine)
        setProfile({ track, targetScore, examDate, estimatedScore: est });
        updateProfile({ track, targetScore, examDate, estimatedScore: est }).catch(() => {
          // Server unreachable — localStorage is the fallback
        });
        setStep("result");
      } else {
        setQIdx(i2 => i2 + 1);
        setAnswered(false);
        setSelected(null);
      }
    }, 800);
  };

  const progress = ((STEPS.indexOf(step) + 1) / STEPS.length) * 100;
  const q = questions[qIdx];

  return (
    <div className="flex h-dvh flex-col bg-app text-primary">
      {/* Progress bar */}
      <div className="h-1 bg-canvas">
        <div className="h-full rounded-pill bg-brand transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-5 py-6">
        <div className="w-full max-w-md">
          {step === "track" && (() => {
            const sugRole: Stage = tCorrect === 0 ? "primary" : (MINI_QUIZ[tCorrect - 1].role as Stage);
            const sugDef = stageDef(sugRole);
            const stageDefOf = stage ? stageDef(stage) : null;
            return (
            <div className="flex flex-col gap-4">
              {stagePhase === "pick" && (
                <>
                  <h1 className="text-center font-booster text-[26px] font-extrabold text-primary">{t('onb.stageTitle')}</h1>
                  <p className="-mt-3 text-center text-sm text-secondary">{t('onb.stageSub')}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {STAGES.map(sd => (
                      <button
                        key={sd.id}
                        onClick={() => { setStage(sd.id); setTIdx(0); setTCorrect(0); setTAnswered(null); setStagePhase("assign"); confirmStage(sd.id); }}
                        className={`g-card relative flex flex-col items-center gap-1 p-4 text-center ${stage === sd.id ? "!border-brandborder bg-brand-subtle" : ""}`}
                      >
                        <span className="text-brand">{STAGE_ICONS[sd.id]}</span>
                        <span className="font-booster text-[15px] font-extrabold text-primary">{t(sd.nameKey as MessageKey)}</span>
                        <span className="text-[10.5px] leading-snug text-tertiary">{t(sd.descKey as MessageKey)}</span>
                        <span className="mt-1 rounded-pill bg-brand-subtle px-2 py-0.5 text-[10px] font-extrabold text-brand-text">{t(sd.countKey as MessageKey)}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-[11px] text-tertiary">
                    {t('onb.stageTestEntry')} <span className="cursor-pointer font-bold text-brand-text underline underline-offset-2" onClick={startMini}>{t('onb.miniTitle')} →</span>
                  </p>
                  <button
                    onClick={() => { if (stage) { confirmStage(stage); setStagePhase("assign"); } }}
                    disabled={!stage}
                    className="rounded-pill bg-brand py-3.5 font-booster text-base font-extrabold text-white transition hover:opacity-90 disabled:opacity-40"
                  >
                    {t('onb.assignContinue')}
                  </button>
                </>
              )}

              {stagePhase === "test" && (() => {
                const q = MINI_QUIZ[tIdx];
                return (
                  <>
                    <h1 className="text-center font-booster text-[22px] font-extrabold text-primary">{t('onb.miniTitle')}</h1>
                    <p className="-mt-3 text-center text-sm text-secondary">{t('onb.miniSub')}</p>
                    <div className="h-2 overflow-hidden rounded-pill bg-canvas">
                      <div className="h-full rounded-pill bg-brand transition-all duration-300" style={{ width: `${(tIdx / MINI_QUIZ.length) * 100}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-tertiary">
                      <span>{t(q.lvKey as MessageKey)}</span>
                      <span>{tIdx + 1} / {MINI_QUIZ.length}</span>
                    </div>
                    <div className="g-card flex flex-col gap-3 p-5">
                      <p className="text-center text-[11px] font-bold uppercase tracking-wide text-tertiary">{t('onb.miniPick')}</p>
                      <p className="text-center font-booster text-3xl font-extrabold text-primary">{q.word}</p>
                      <div className="flex flex-col gap-2.5">
                        {q.opts.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => answerMini(i)}
                            disabled={tAnswered !== null}
                            className={`rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                              tAnswered === null ? "border-subtle bg-surface hover:border-brandborder"
                              : i === q.ans ? "border-positive bg-[#F0FDF4]"
                              : tAnswered === i ? "border-critical bg-[#FEF2F2]"
                              : "border-subtle opacity-45"
                            }`}
                          >
                            {String.fromCharCode(65 + i)} &nbsp;{opt}
                          </button>
                        ))}
                      </div>
                      {tAnswered !== null && (
                        <p className={`text-center text-sm font-extrabold ${tAnswered === q.ans ? "text-positive" : "text-critical"}`}>
                          {tAnswered === q.ans ? t('onb.miniRight') : `${t('onb.miniWrong')}${q.opts[q.ans]}`}
                        </p>
                      )}
                    </div>
                  </>
                );
              })()}

              {stagePhase === "suggest" && (() => {
                const sugDef = stageDef(sugRole);
                return (
                  <>
                    <h1 className="text-center font-booster text-[24px] font-extrabold text-primary">
                      {t('onb.suggestCorrect')} {tCorrect} / {MINI_QUIZ.length} · {t('onb.suggestTitle')}
                    </h1>
                    <p className="-mt-2 text-center text-sm text-secondary">{t('onb.suggestSub')}</p>
                    <div className="g-card relative flex items-center gap-4 p-5 !border-brandborder bg-brand-subtle">
                      <span className="text-brand">{STAGE_ICONS[sugDef.id]}</span>
                      <span className="flex-1">
                        <span className="flex items-center gap-2">
                          <span className="font-booster text-lg font-extrabold text-primary">{t(sugDef.nameKey as MessageKey)}</span>
                          <span className="rounded-pill bg-brand px-2 py-0.5 text-[10px] font-extrabold text-white">{t('onb.suggestBadge')}</span>
                        </span>
                        <span className="block text-xs text-tertiary">
                          {t(sugDef.descKey as MessageKey)} · {t('onb.assignBookLabel').split(' · ')[0]}「{t(sugDef.countKey as MessageKey)}」
                        </span>
                      </span>
                    </div>
                    <p className="text-center text-[11px] text-tertiary">
                      {t('onb.suggestManual')} <span className="cursor-pointer font-bold text-brand-text underline underline-offset-2" onClick={() => setStagePhase("pick")}>{t('onb.suggestManualLink')}</span>
                    </p>
                    <button
                      onClick={() => { setStage(sugDef.id); confirmStage(sugDef.id); setStagePhase("assign"); }}
                      className="rounded-pill bg-brand py-3.5 font-booster text-base font-extrabold text-white transition hover:opacity-90"
                    >
                      {t('onb.suggestUse')}
                    </button>
                  </>
                );
              })()}

              {stagePhase === "assign" && stageDefOf && (
                <>
                  <h1 className="text-center font-booster text-[24px] font-extrabold text-primary">
                    {t(stageDefOf.nameKey as MessageKey)} · {t('onb.assignTitle')}
                  </h1>
                  <div className="g-card p-5">
                    {[
                      { ico: <BookIcon size={18} />, label: t('onb.assignQuizLabel'), val: `${t(stageDefOf.countKey as MessageKey)} ${t('onb.assignQuizNote')}` },
                      { ico: <CardsIcon size={18} />, label: t('onb.assignBookLabel'), val: `${t(stageDefOf.countKey as MessageKey)} ${t('onb.assignBookNote')}` },
                      { ico: <BooksIcon size={18} />, label: t('onb.assignTrackLabel'), val: TRACK_LABEL_ZH[stageDefOf.track] ?? stageDefOf.track },
                      { ico: <GraduationCapIcon size={18} />, label: t('onb.assignWqLabel'), val: WQ_LABEL_ZH[stageDefOf.wordquestLevel] ?? stageDefOf.wordquestLevel },
                    ].map((row, i) => (
                      <div key={i} className={`flex items-center gap-3 py-3 ${i < 3 ? "border-b border-subtle" : ""}`}>
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-subtle text-brand">{row.ico}</span>
                        <span>
                          <span className="block text-[11px] font-bold text-tertiary">{row.label}</span>
                          <span className="block text-sm font-extrabold text-primary">{row.val}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-[11px] text-tertiary">{t('onb.stageSub')}</p>
                  <button
                    onClick={() => setStep("goal")}
                    className="rounded-pill bg-brand py-3.5 font-booster text-base font-extrabold text-white transition hover:opacity-90"
                  >
                    {t('onb.assignContinue')}
                  </button>
                </>
              )}
            </div>
            );
          })()}

          {step === "goal" && (
            <div className="flex flex-col gap-5">
              <h1 className="text-center font-booster text-[26px] font-extrabold text-primary">{t('onb.setGoal')}</h1>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-tertiary">{t('onb.targetScore')}: {targetScore}</span>
                <input type="range" min={60} max={120} step={5} value={targetScore}
                  onChange={e => setTargetScore(Number(e.target.value))}
                  className="accent-brand" />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-tertiary">{t('onb.examDate')}</span>
                <input type="date" value={examDate} min={new Date().toISOString().slice(0, 10)}
                  onChange={e => setExamDate(e.target.value)}
                  className="rounded-xl border border-subtle bg-surface px-4 py-3 text-sm outline-none focus:border-brandborder" />
              </label>

              <button
                onClick={startTest}
                disabled={!examDate}
                className="rounded-pill bg-action py-3.5 font-booster text-base font-extrabold text-white transition hover:bg-actionhover disabled:opacity-40"
              >
                {t('onb.startTest')}
              </button>
              {!examDate && <p className="text-center text-xs text-tertiary">{t('onb.pickDate')}</p>}
            </div>
          )}

          {step === "test" && q && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wide text-tertiary">{t('onb.question')} {qIdx + 1} / {TOTAL_TEST}</p>
                <p className="text-xs text-tertiary">{t('onb.level')} {difficulty}</p>
              </div>

              <div className="g-card-hero p-6 text-center">
                <p className="text-xs font-bold uppercase text-tertiary mb-2">{q.promptSub ?? t('onb.vocabulary')}</p>
                <p className="font-booster text-3xl font-extrabold text-primary">{q.prompt}</p>
              </div>

              <div className="flex flex-col gap-2">
                {q.choices.map((c, i) => {
                  const isSel = selected === i;
                  const isCorrect = i === q.correctIndex;
                  let cls = "game-chip flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold";
                  if (answered && isCorrect) cls = "game-chip game-chip--right pointer-events-none flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold";
                  else if (answered && isSel) cls = "game-chip game-chip--wrong pointer-events-none flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold";
                  return (
                    <button key={i} disabled={answered} onClick={() => answer(i)} className={cls}>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-canvas text-sm font-extrabold text-tertiary">
                        {"ABCD"[i]}
                      </span>
                      {c}
                    </button>
                  );
                })}
              </div>
              <p className="text-center text-[11px] text-tertiary">{t('onb.testFree')}</p>
            </div>
          )}

          {step === "result" && (
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-brand-subtle text-brand-text"><TargetIcon size={34} /></span>
              <h1 className="font-booster text-3xl font-extrabold text-primary">{t('onb.yourLevel')}: ~{estimatedScore}</h1>
              <p className="text-sm text-secondary">
                {t('onb.target')}: {targetScore} · {t('onb.gap')}: {Math.max(0, targetScore - estimatedScore)} {t('onb.points')}
              </p>
              <div className="g-card w-full p-4 text-left">
                <p className="text-xs font-bold uppercase text-tertiary mb-2">{t('onb.recommendations')}</p>
                <ul className="space-y-1 text-sm text-secondary">
                  <li>{correctCount < 5 ? t('onb.recStartBasic') : t('onb.recStartInt')}</li>
                  <li>{t('onb.recDaily')}</li>
                  <li>{t('onb.recUpload')}</li>
                </ul>
              </div>
              <button
                onClick={() => (isFullFlow ? setStep("interests") : router.push(nextPath))}
                className="w-full rounded-pill bg-brand py-3.5 font-booster text-base font-extrabold text-white transition hover:opacity-90"
              >
                {isFullFlow ? t("onb.nextInterests") : t("onb.startLearning")}
              </button>
            </div>
          )}

          {step === "interests" && (
            <div className="flex flex-col gap-5">
              <h1 className="text-center font-booster text-[26px] font-extrabold text-primary">{t("onb.pickInterests")}</h1>
              <p className="text-center text-sm text-tertiary">{t("onb.pickInterestsHint")}</p>
              <div className="grid grid-cols-2 gap-3">
                {INTEREST_GROUPS.map(g => {
                  const on = interests.has(g.id);
                  return (
                    <button
                      key={g.id}
                      onClick={() => setInterests(prev => {
                        const next = new Set(prev);
                        if (next.has(g.id)) next.delete(g.id);
                        else next.add(g.id);
                        return next;
                      })}
                      className={`g-card flex flex-col items-center gap-1.5 p-4 ${on ? "!border-[var(--ink)] bg-brand-subtle" : ""}`}
                    >
                      <span className="text-2xl">{INTEREST_ICONS[g.icon] ?? null}</span>
                      <span className="text-xs font-bold text-primary">{t(g.labelKey)}</span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setStep("daily")}
                disabled={interests.size === 0}
                className="rounded-pill bg-brand py-3.5 font-booster text-base font-extrabold text-white transition hover:opacity-90 disabled:opacity-40"
              >
                {t("onb.nextDaily")}
              </button>
            </div>
          )}

          {step === "daily" && (
            <div className="flex flex-col gap-5">
              <h1 className="text-center font-booster text-[26px] font-extrabold text-primary">{t("onb.pickDaily")}</h1>
              <p className="text-center text-sm text-tertiary">{t("onb.pickDailyHint")}</p>
              {DAILY_OPTIONS.map(o => (
                <button
                  key={o.min}
                  onClick={() => setDailyGoal(o.min)}
                  className={`g-card flex items-center gap-3 p-4 text-left ${dailyGoal === o.min ? "!border-[var(--ink)] bg-brand-subtle" : ""}`}
                >
                  <span className="text-xl">{dailyGoal === o.min ? <CheckCircleIcon size={20} /> : <HourglassIcon size={20} />}</span>
                  <span className="text-sm font-bold text-primary">{t(o.labelKey)}</span>
                </button>
              ))}
              <button
                onClick={() => {
                  // 兴趣 + 日目标落库（服务端权威；失败不阻断仪式——本地 kv 兜底）
                  updateProfile({ interests: [...interests], dailyGoal }).catch(() => {});
                  setStep("theater");
                }}
                className="rounded-pill bg-brand py-3.5 font-booster text-base font-extrabold text-white transition hover:opacity-90"
              >
                {t("onb.buildMyPlan")}
              </button>
            </div>
          )}

          {step === "theater" && (
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-brand-subtle text-brand-text"><PigIcon size={34} /></span>
              <p className="font-booster text-xl font-extrabold text-primary">{t("onb.theaterTitle")}</p>
              <div className="mt-2 flex w-full flex-col gap-2 text-left">
                {[
                  { icon: <SparklesIcon size={18} />, label: t("onb.theaterTopics"), at: 1 },
                  { icon: <MessageIcon size={18} />, label: t("onb.theaterConvos"), at: 2 },
                  { icon: <BooksIcon size={18} />, label: t("onb.theaterPlan"), at: 3 },
                ].map(row => {
                  const done = theaterTick >= row.at;
                  const active = theaterTick === row.at - 1 && theaterTick < 3;
                  return (
                    <div key={row.at} className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${done ? "border-positive bg-[#F0FDF4] text-secondary" : active ? "border-brandborder bg-canvas text-primary" : "border-subtle text-tertiary opacity-60"}`}>
                      <span>{done ? <CheckCircleIcon size={18} /> : row.icon}</span>
                      {row.label}
                    </div>
                  );
                })}
              </div>
              <div className="mt-1 rounded-xl bg-brand-subtle px-3 py-2 text-xs text-brand-text">
                {theaterTick >= 3 ? t("onb.theaterQuote").replace("{min}", String(dailyGoal)) : t("onb.theaterBuilding")}
              </div>
              <button
                onClick={() => router.push(nextPath)}
                disabled={theaterTick < 3}
                className="mt-2 w-full rounded-pill bg-brand py-3.5 font-booster text-base font-extrabold text-white transition hover:opacity-90 disabled:opacity-40"
              >
                {t("onb.startAdventure")}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
