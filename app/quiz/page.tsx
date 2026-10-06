"use client";

import { useEffect, useState } from "react";
import QuizScreen from "@/components/QuizScreen";
import { useGameStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { generateDailyPlan, questionsFromPlan, fetchServerPlan, cacheServerPlan } from "@/lib/plan";
import { clampQuestionText, QUESTION_LENGTH_LIMITS } from "@/lib/deeptutor";
import type { Question } from "@/lib/types";

/**
 * Quiz page — SSR-safe loading gate.
 * Server and client both render the spinner initially (no hydration mismatch),
 * then on mount we check for ?src=import and load AI questions.
 *
 * 直进自愈（Gizmo 式「永远可用的起点」）：/quiz 自身不产题，题目由今日计划/
 * 卡组/导入注入。V8-P4：计划改服务端权威——先拉 /api/plan/daily（弱项倾斜
 * 在服务端算好），失败回落本地 generateDailyPlan（离线兜底）。
 */
export default function QuizPage() {
  const { t } = useI18n();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      // On mount: load imported quiz if ?src=import
      const params = new URLSearchParams(window.location.search);
      if (params.get("src") === "import") {
        try {
          const raw = sessionStorage.getItem("lexi-import-quiz");
          if (raw) {
            const parsed = JSON.parse(raw);
            const qs = parsed.questions ?? [];
            // Normalize: ensure every question has choices[] and correctIndex,
            // and clamp text lengths so long AI questions fit a phone screen
            const safe: Question[] = qs.map((q: Record<string, unknown>, i: number) => {
              const answer = (q.answer as string) ?? undefined;
              const rawChoices = ((q.choices as string[]) ?? []).map((c: string) => clampQuestionText(c, QUESTION_LENGTH_LIMITS.option));
              const typed = !!answer && rawChoices.length === 0;
              return {
                id: (q.id as string) ?? `import-${i}`,
                wordId: (q.wordId as string) ?? (q.id as string) ?? `import-${i}`,
                type: "word-to-cn" as const,
                prompt: clampQuestionText((q.prompt as string) ?? (q.question as string) ?? "", QUESTION_LENGTH_LIMITS.prompt),
                promptSub: clampQuestionText((q.promptSub as string) ?? "", QUESTION_LENGTH_LIMITS.sub) || undefined,
                choices: typed ? [answer] : (rawChoices.length ? rawChoices : ["True", "False"]),
                correctIndex: (q.correctIndex as number) ?? (q.answerIndex as number) ?? 0,
                explanation: (q.explanation as string) ?? undefined,
                answer: typed ? answer : undefined,
              };
            });
            if (safe.length && useGameStore.getState().questions.length === 0) {
              const boss = (parsed.boss ?? null) as { wordId: string; word: string; hp: number; maxHp: number } | null;
              useGameStore.getState().loadImportedQuiz(safe, typeof parsed.kbName === "string" ? parsed.kbName : undefined, boss);
            }
          }
        } catch { /* fall through */ }
      }
      // 直进无题 → 服务端权威计划优先，失败回落本地（直进自愈不变）
      if (useGameStore.getState().questions.length === 0) {
        const server = await fetchServerPlan();
        if (server && server.totalQuestions > 0) {
          cacheServerPlan(server);
          const qs = questionsFromPlan(server);
          if (qs.length) useGameStore.getState().loadImportedQuiz(qs, t("dash.todayPlan"));
        } else {
          try {
            const plan = generateDailyPlan();
            const qs = plan.totalQuestions > 0 ? questionsFromPlan(plan) : [];
            if (qs.length) useGameStore.getState().loadImportedQuiz(qs, t("dash.todayPlan"));
          } catch { /* 暂无题目兜底 */ }
        }
      }
      setReady(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) {
    return (
      <div className="flex h-dvh items-center justify-center bg-app">
        <svg viewBox="0 0 24 24" className="h-8 w-8 animate-spin text-brand-text" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return <QuizScreen />;
}
