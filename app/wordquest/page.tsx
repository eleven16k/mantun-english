"use client";

/**
 * /wordquest — Word Quest vocabulary game (NovaWorld port).
 * AI generates 10 multiple-choice questions per level; 80+ unlocks the next.
 * Falls back to spelling quizzes when the AI service is down.
 */
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SproutIcon, LeafIcon, TreeIcon, BoltIcon, LockIcon, TrophyIcon, VolumeIcon, CheckCircleIcon, XIcon, GamepadIcon } from "@/components/icons";
import { PageHeader } from "@/components/PageHeader";
import { useI18n, type MessageKey } from "@/lib/i18n";
import { savedStage, stageDef } from "@/lib/stage";
import { generateWordQuest, bankScenarioReward, isLoggedIn, reportEvidence, type WordQuestQuestion } from "@/lib/api";
import { useGameStore } from "@/lib/store";
import { kv } from "@/lib/kv";

type GameStatus = "selecting" | "loading" | "playing" | "gameOver" | "congratulations";

const LEVELS = [
  { id: "Primary", labelKey: "scn.levelPrimary", icon: "sprout" },
  { id: "JuniorHigh", labelKey: "scn.levelJuniorHigh", icon: "leaf" },
  { id: "SeniorHigh", labelKey: "scn.levelSeniorHigh", icon: "tree" },
] as const;

type QuestLevel = (typeof LEVELS)[number]["id"];
const UNLOCK_KEY = "lexi-wordquest-unlocked";

export default function WordQuestPage() {
  const { t } = useI18n();
  const [unlocked, setUnlocked] = useState<QuestLevel[]>(() => {
    if (typeof window === "undefined") return ["Primary"];
    try {
      const saved = kv.getItem(UNLOCK_KEY);
      const parsed: unknown = typeof saved === "string" ? JSON.parse(saved) : null;
      return Array.isArray(parsed) && parsed.length ? (parsed as QuestLevel[]) : ["Primary"];
    } catch {
      return ["Primary"];
    }
  });
  const [level, setLevel] = useState<QuestLevel | null>(() => {
    const wq = stageDef(savedStage()).wordquestLevel;
    return (["Primary", "JuniorHigh", "SeniorHigh"].includes(wq) ? wq : "JuniorHigh") as QuestLevel;
  });
  const [questions, setQuestions] = useState<WordQuestQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<GameStatus>("selecting");
  const [selected, setSelected] = useState<string | null>(null);

  const [quotaError, setQuotaError] = useState(false);

  const startLevel = async (lvl: QuestLevel) => {
    setLevel(lvl);
    setQuotaError(false);
    setStatus("loading");
    try {
      const res = await generateWordQuest(lvl);
      setQuestions(res.questions);
      setIndex(0);
      setScore(0);
      setStatus("playing");
    } catch (e) {
      // M1 配额闸门：免费 3 次/天，第 4 次被服务端 429 拒绝 → 明确提示而非静默
      setQuotaError(String((e as Error).message).includes("ai_quota_exceeded"));
      setStatus("selecting");
    }
  };

  const answer = (option: string) => {
    if (selected || !questions[index]) return;
    setSelected(option);
    const q = questions[index];
    const correct = option === q.correct;
    const newScore = score + (correct ? 10 : 0);
    setScore(newScore);
    // 判断层证据（全量接入）：wq: 前缀证据流——诊断归词汇轴、不入 SRS（AI 生词无卡态语义）
    if (isLoggedIn()) {
      reportEvidence(`wq:${q.word}`, correct, q.word, {
        questionType: "word-to-cn", chosen: option, correct: q.correct,
      });
    }

    setTimeout(async () => {
      if (index < questions.length - 1) {
        setIndex((i) => i + 1);
        setSelected(null);
      } else {
        const passed = newScore >= 80;
        setStatus(passed ? "congratulations" : "gameOver");
        if (passed && level) {
          const next = LEVELS[LEVELS.findIndex((l) => l.id === level) + 1];
          if (next && !unlocked.includes(next.id)) {
            const updated = [...unlocked, next.id];
            setUnlocked(updated);
            kv.setItem(UNLOCK_KEY, JSON.stringify(updated));
          }
          // Small coin reward for passing
          try {
            await bankScenarioReward({
              scenarioId: `wordquest-${level}`,
              mode: "chat",
              turns: 10,
              xp: newScore,
              coins: 20,
              masteredWords: [],
              clientToken: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : undefined,
            });
            useGameStore.setState((s) => ({ coins: s.coins + 20, scorePoints: s.scorePoints + newScore }));
          } catch {
            // offline — local only
          }
        }
      }
    }, 900);
  };

  const q = questions[index];
  const options = q ? [...q.distractors, q.correct].sort(() => 0.5 - Math.random()) : [];
  const isSpellingFallback = !!q && q.correct === q.word && !q.example;

  return (
    <AppShell>
      <div className="page-shell">
        {status === "selecting" && (
          <>
            {quotaError && (
              <div className="mb-4 rounded-2xl border-2 border-b-4 border-[#F4C430] bg-[#FEF9C3] p-4 text-center text-sm font-bold text-primary">
                <BoltIcon size={13} className="inline" /> {t("scn.wqQuota")}
              </div>
            )}
            <header className="mb-6">
              <PageHeader badge="WORD QUEST" title={t("nav.wordquest")} sub={t("scn.wqSelectLevel")} />
            </header>
            <div className="grid gap-4 md:grid-cols-3">
              {LEVELS.map((lvl, i) => {
                const isUnlocked = unlocked.includes(lvl.id);
                return (
                  <button
                    key={lvl.id}
                    onClick={() => isUnlocked && startLevel(lvl.id)}
                    disabled={!isUnlocked}
                    className={`relative overflow-hidden rounded-card p-6 text-left transition-all ${
                      isUnlocked
                        ? "g-card"
                        : "g-card pointer-events-none bg-canvas opacity-50"
                    }`}
                  >
                    {!isUnlocked && (
                      <span className="absolute right-4 top-4 text-tertiary" aria-hidden><LockIcon size={18} /></span>
                    )}
                    <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-subtle text-brand-text">
                      {lvl.icon === "sprout" ? <SproutIcon size={26} /> : lvl.icon === "leaf" ? <LeafIcon size={26} /> : <TreeIcon size={26} />}
                    </div>
                    <h3 className="font-booster text-lg font-extrabold">{t(lvl.labelKey as MessageKey)}</h3>
                    <p className="mt-1 text-xs text-tertiary">
                      {isUnlocked ? t("scn.wqStart") : t("scn.wqLocked")}
                    </p>
                    {!isUnlocked && (
                      <p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-gold">
                        {t("scn.wqUnlockHint")}
                      </p>
                    )}
                    {i === 0 && isUnlocked && <span className="sr-only">start</span>}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {status === "loading" && (
          <div className="flex flex-col items-center gap-4 py-32">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-brand border-t-transparent" />
            <p className="text-sm font-medium text-secondary">{t("scn.wqPreparing")}</p>
          </div>
        )}

        {status === "playing" && q && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-subtle text-brand-text"><TrophyIcon size={22} /></span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-tertiary">{t("scn.wqScore")}</p>
                  <p className="font-booster text-xl font-extrabold">{score}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-tertiary">{t("scn.wqProgress")}</p>
                <p className="font-booster text-xl font-extrabold">
                  {index + 1} / {questions.length}
                </p>
              </div>
            </div>

            <div className="g-card space-y-6 p-8 text-center">
              {isSpellingFallback ? (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-tertiary inline-flex items-center gap-1"><VolumeIcon size={12} /> Spell it right</p>
                  <h2 className="font-booster text-4xl font-extrabold">{q.word[0]}␣␣{q.word.slice(-1)}</h2>
                </>
              ) : (
                <>
                  <h2 className="font-booster text-5xl font-extrabold tracking-tight">{q.word}</h2>
                  <p className="text-xs font-bold uppercase tracking-widest text-tertiary">{t("scn.wqSelectMeaning")}</p>
                </>
              )}
              {selected && q.example && (
                <div className="space-y-1 border-t border-subtle pt-5 text-left">
                  <p className="italic text-brand-text">“{q.example}”</p>
                  <p className="text-xs text-tertiary">{q.exampleTranslation}</p>
                </div>
              )}
            </div>

            <div className="grid gap-3">
              {options.map((option) => {
                const isCorrectOption = option === q.correct;
                const isSelected = selected === option;
                let cls = "";
                if (selected) {
                  if (isCorrectOption) cls = "game-chip--right pointer-events-none";
                  else if (isSelected) cls = "game-chip--wrong pointer-events-none";
                }
                return (
                  <button
                    key={option}
                    onClick={() => answer(option)}
                    disabled={!!selected}
                    className={`game-chip flex items-center justify-between p-4 text-left text-base font-semibold ${cls}`}
                  >
                    {option}
                    {selected && isCorrectOption && <span aria-hidden className="text-positive"><CheckCircleIcon size={16} /></span>}
                    {selected && isSelected && !isCorrectOption && <span aria-hidden className="text-critical"><XIcon size={16} /></span>}
                  </button>
                );
              })}
            </div>

            {selected && (
              <div
                className={`fixed bottom-28 left-1/2 -translate-x-1/2 rounded-full border-2 border-[var(--ink)] px-7 py-3 font-booster text-base font-extrabold text-white shadow-[0_4px_0_0_rgba(0,0,0,0.15)] lg:bottom-10 ${
                  selected === q.correct ? "bg-positive" : "bg-critical"
                }`}
              >
                {selected === q.correct ? t("scn.wqCorrect") : t("scn.wqWrong")}
              </div>
            )}
          </div>
        )}

        {(status === "gameOver" || status === "congratulations") && (
          <div className="game-overlay fixed inset-0 z-[150] grid place-items-center p-6">
            <div className="game-modal w-full max-w-sm space-y-6 p-10 text-center">
              <div
                className={`mx-auto grid h-20 w-20 place-items-center rounded-3xl text-4xl ${
                  status === "congratulations" ? "bg-positive/10" : "bg-critical/10"
                }`}
              >
                {status === "congratulations" ? <TrophyIcon size={34} /> : <GamepadIcon size={34} />}
              </div>
              <div>
                <h2 className="font-booster text-3xl font-extrabold">
                  {status === "congratulations" ? t("scn.wqCongrats") : t("scn.wqGameOver")}
                </h2>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-tertiary">
                  {t("scn.wqScore")}: {score}
                </p>
                {status === "congratulations" && (
                  <p className="mt-1 text-xs font-semibold text-positive">
                    {t("scn.wqCoinsEarned").replace("{coins}", "20")}
                  </p>
                )}
                {status === "gameOver" && <p className="mt-1 text-xs text-tertiary">{t("scn.wqNeed80")}</p>}
              </div>
              <div className="space-y-2.5">
                {status === "congratulations" && (
                  <button
                    onClick={() => setStatus("selecting")}
                    className="game-btn w-full bg-brand py-3.5 text-white"
                  >
                    {t("scn.wqNextLevel")}
                  </button>
                )}
                <button
                  onClick={() => setStatus("selecting")}
                  className="game-btn w-full bg-surface py-3.5 text-secondary"
                >
                  {t("scn.wqBackToMap")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
