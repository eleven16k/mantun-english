"use client";

/**
 * QuestQuiz — 悦读馆听写小测容器：按题分发四种题型，记录对错与提示消耗，
 * 全部答完回调 onDone(score, hintsUsed)。分数 = 通过题数/总题数 × 100。
 * 提示（消除错误项）消耗 store.hintsOwned 商店道具。
 */

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useGameStore } from "@/lib/store";
import { getStoryProgress, reportStoryAnswer, saveStoryProgress } from "@/lib/reading";
import type { ReadingStory } from "@/content/reading/types";
import { SpeedTabs, useQuestAudio, type QuestSpeed } from "./ParagraphAudio";
import { ImageChoice } from "./ImageChoice";
import { WordBuilder } from "./WordBuilder";
import { SentenceOrder } from "./SentenceOrder";
import { FillBlank } from "./FillBlank";

interface Props {
  story: ReadingStory;
  /** 断点续答：上次中断时的进度（idx>0 且未通关时由课程页传入） */
  initial?: { results: boolean[]; idx: number; hintsUsed: number };
  /** score = 通过率×100；hintsUsed 为提示次数；earned 为逐题经济累计（本地） */
  onDone: (score: number, hintsUsed: number, earned: { coins: number; sp: number }) => void;
}

export function QuestQuiz({ story, initial, onDone }: Props) {
  const { t } = useI18n();
  const { speed, setSpeed } = useQuestAudio();
  const hintsOwned = useGameStore((s) => s.hintsOwned);
  const [idx, setIdx] = useState(initial?.idx ?? 0);
  const [results, setResults] = useState<boolean[]>(initial?.results ?? []);
  const [hintsUsed, setHintsUsed] = useState(initial?.hintsUsed ?? 0);
  const [earned, setEarned] = useState({ coins: 0, sp: 0 });

  const total = story.quiz.length;
  const q = story.quiz[idx];

  const useHint = (): boolean => {
    const s = useGameStore.getState();
    if (s.hintsOwned <= 0) return false;
    useGameStore.setState({ hintsOwned: s.hintsOwned - 1 });
    setHintsUsed((n) => n + 1);
    return true;
  };

  const finishQuestion = (passed: boolean, attempt?: string) => {
    const next = [...results, passed];
    setResults(next);
    // 断点续答落盘（通关时由课程页覆写 clearedAt；保留历史最高分）
    saveStoryProgress(story.id, {
      results: next.map((ok) => ({ status: (ok ? "PASSED" : "FAILED") as "PASSED" | "FAILED" })),
      idx: next.length,
      clearedAt: null,
      bestScore: getStoryProgress(story.id)?.bestScore ?? 0,
    });
    // 逐题经济上报（best-effort）：金币/SP/红心/弱点本全复用现有 economy 循环
    // 判断层证据：chosen/正确原文随报 → 服务端错因诊断 → 雷达阅读理解轴
    if (q) {
      const prompt = q.audioText || (q.type === "image_choice" ? q.question : "");
      const correctText =
        q.type === "sentence_order" ? q.correctOrder.join(" ")
        : q.type === "word_builder" ? q.word
        : q.answer;
      void reportStoryAnswer(story.id, idx, prompt, passed, {
        questionType: q.type, chosen: attempt, correct: correctText,
      }).then((r) => {
        if (r) {
          setEarned((x) => ({ coins: x.coins + r.coins, sp: x.sp + r.sp }));
          const s = useGameStore.getState();
          useGameStore.setState({
            hearts: r.hearts ?? s.hearts,
            coins: s.coins + r.coins,
            scorePoints: s.scorePoints + r.sp,
          });
        }
      });
    }
    if (next.length >= total) {
      const score = Math.round((next.filter(Boolean).length / total) * 100);
      setTimeout(() => onDone(score, hintsUsed, earned), 400);
    } else {
      setIdx(idx + 1);
    }
  };

  const hintAvailable = hintsOwned > 0;
  const quizKey = useMemo(() => `${story.id}-q${idx}`, [story.id, idx]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="ph-pill ph-pill--info">
          {t("reading.quizTitle")} · {idx + 1}/{total}
        </span>
        <SpeedTabs speed={speed} setSpeed={setSpeed} />
      </div>

      <div className="ph-progress mb-5">
        <i style={{ width: `${Math.round((results.length / total) * 100)}%` }} />
      </div>

      {q?.type === "image_choice" && (
        <ImageChoice
          key={quizKey}
          q={q}
          storyId={story.id}
          track={story.track}
          quizIdx={idx}
          speed={speed}
          hintAvailable={hintAvailable}
          onUseHint={useHint}
          onDone={finishQuestion}
        />
      )}
      {q?.type === "word_builder" && (
        <WordBuilder key={quizKey} q={q} storyId={story.id} track={story.track} quizIdx={idx} speed={speed} onDone={finishQuestion} />
      )}
      {q?.type === "sentence_order" && (
        <SentenceOrder key={quizKey} q={q} storyId={story.id} track={story.track} quizIdx={idx} speed={speed} onDone={finishQuestion} />
      )}
      {q?.type === "fill_blank" && (
        <FillBlank
          key={quizKey}
          q={q}
          storyId={story.id}
          track={story.track}
          quizIdx={idx}
          speed={speed}
          hintAvailable={hintAvailable}
          onUseHint={useHint}
          onDone={finishQuestion}
        />
      )}
    </div>
  );
}
