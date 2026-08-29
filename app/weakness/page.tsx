"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { getWeaknesses, deleteWeakness } from "@/lib/api";
import type { Weakness } from "@/lib/types";
import { AlertIcon } from "@/components/SvgIcons";
import { getWordById, getDistractors } from "@/lib/vocab";
import { CheckIcon } from "@/components/icons";
import { askTutor } from "@/lib/deeptutor";
import { Md } from "@/components/Markdown";
import { useI18n } from "@/lib/i18n";

/**
 * /weakness — the weakness book (C4).
 * Shows knowledge points with wrongCount ≥ 2, sorted by most wrong.
 * "Drill 10" starts a targeted practice session (+20 SP per conquered item).
 */
export default function WeaknessPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [list, setList] = useState<{ word_id: string; wrong_count: number; correct_streak: number; last_prompt: string }[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  // AI mastery report (DeepTutor chat): diagnose the weakness book
  const [reportOpen, setReportOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportLoading, setReportLoading] = useState(false);
  const { locale } = useI18n();

  const runReport = async () => {
    if (reportLoading) return;
    setReportOpen(true);
    setReportLoading(true);
    setReportText("");
    const zh = locale === "zh";
    const lines = list.slice(0, 20).map((w) => `- ${w.last_prompt}（错 ${w.wrong_count} 次，连对 ${w.correct_streak}/2）`).join("\n");
    const message = zh
      ? `以下是我的英语学习弱点清单（错 2 次以上未攻克）：\n${lines}\n\n请生成一份掌握度诊断报告：1) 按薄弱程度分组（高危/需巩固/接近攻克）；2) 指出错误集中在哪类知识点（词性/题型）；3) 给出未来 7 天的针对性攻克顺序建议。语言简洁，适合中学生。`
      : `Here is my English-learning weakness list (2+ wrong, unconquered):\n${lines}\n\nProduce a mastery diagnostic report: 1) group items by severity (critical / consolidate / nearly conquered); 2) identify which knowledge areas the errors cluster in; 3) suggest a 7-day conquest order. Keep it concise for a middle-schooler.`;
    const result = await askTutor(message, {
      language: zh ? "zh" : "en",
      onChunk: (chunk) => setReportText((prev) => prev + chunk),
    }).catch(() => null);
    setReportLoading(false);
    if (!result && !reportText) setReportText(t("quiz.aiOffline"));
  };

  useEffect(() => {
    getWeaknesses()
      .then(setList)
      .catch(() => setList([]))
      .finally(() => { setMounted(true); setLoading(false); });
  }, []);

  const total = list.length;

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[768px] px-6 pt-[84px] pb-6">
        <h1 className="pt-1 font-booster text-[26px] font-extrabold leading-[32px] text-primary mb-5">
          {t("weak.title")}
        </h1>

        {total === 0 ? (
          /* Empty state */
          <div className="g-card-hero p-8 text-center shadow-sm">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-positive/10">
              <CheckIcon size={32} className="text-positive" />
            </span>
            <p className="mt-4 font-booster text-lg font-extrabold text-primary">{t("weak.allClear")}</p>
            <p className="mt-1 text-sm text-tertiary">
              {t("weak.emptyHint")}
            </p>
            <button
              onClick={() => router.push("/quiz")}
              className="mt-4 rounded-pill bg-action px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-actionhover"
            >
              {t("weak.startPractice")}
            </button>
          </div>
        ) : (
          <>
            {/* Summary card */}
            <div className="g-card mb-4 flex items-center justify-between p-5 shadow-sm">
              <div>
                <p className="font-booster text-2xl font-extrabold text-primary">{total}</p>
                <p className="text-xs text-tertiary">{t("weak.toConquer")}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-tertiary">{t("weak.conquerRule")}</span>
                <div className="flex gap-2">
                  <button
                    onClick={runReport}
                    className="rounded-pill border border-subtle px-4 py-2.5 text-sm font-bold text-brand-text shadow-sm transition hover:border-brandborder"
                  >
                    {t("weak.aiReport")}
                  </button>
                  <button
                    onClick={() => {
                    // Build quiz questions from weakness list
                    const qs = list.slice(0, 10).map((w, i) => {
                      const word = getWordById(w.word_id);
                      return {
                        id: `weak-${i}`,
                        wordId: w.word_id,
                        type: "word-to-cn" as const,
                        prompt: word ? word.en : w.last_prompt,
                        choices: word ? [word.cn, ...getDistractors(word.cn, 2)] : [t("weak.choiceReview"), t("weak.choiceSkip"), t("weak.choiceHint")],
                        correctIndex: 0,
                        explanation: word ? `${word.en} = ${word.cn}` : w.last_prompt,
                      };
                    });
                    sessionStorage.setItem("lexi-import-quiz", JSON.stringify({ deckTitle: t("weak.drillTitle"), questions: qs }));
                    router.push("/quiz?src=import");
                  }}
                  className="rounded-pill bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
                >
                  {t("weak.drillPrefix")}{Math.min(10, total)}{t("weak.drillSuffix")}
                </button>
                </div>
              </div>
            </div>

            {/* AI mastery report (streamed) */}
            {reportOpen && (
              <div className="g-card mt-4 p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wide text-tertiary">{t("weak.reportTitle")}</p>
                  <button onClick={() => setReportOpen(false)} className="text-xs font-bold text-tertiary transition hover:text-secondary">
                    {t("deck.cancel")}
                  </button>
                </div>
                {reportLoading && !reportText && (
                  <p className="text-xs font-bold text-brand-text">{t("quiz.aiThinking")}</p>
                )}
                {reportText && (
                  <Md className="max-h-[50vh] overflow-y-auto text-sm leading-relaxed text-secondary">{reportText}</Md>
                )}
              </div>
            )}

            {/* List */}
            <div className="flex flex-col gap-2">
              {list.map((w) => (
                <div key={w.word_id} className="g-card flex items-center gap-3 p-4 shadow-sm">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-critical/10">
                    <AlertIcon size={20} className="text-critical" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-primary">{w.last_prompt}</p>
                    <p className="text-xs text-tertiary">
                      {t("weak.wrongPrefix")}{w.wrong_count}{t("weak.wrongStreakMid")}{w.correct_streak}/2
                    </p>
                  </div>
                  {/* Progress to removal */}
                  <div className="flex gap-1">
                    {[0, 1].map((i) => (
                      <span
                        key={i}
                        className={`h-2 w-6 rounded-pill ${w.correct_streak > i ? "bg-positive" : "bg-canvas"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
