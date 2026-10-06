"use client";

/**
 * /reading/[storyId] — 悦读馆课程页（intro → read → quiz → done 状态机，
 * 结构对齐句法馆会话页）：
 *   read：段落逐段听读（点喇叭重听 / 语速三档 / 中文翻译开关）
 *   quiz：听写小测（QuestQuiz 四题型；中断后「继续」恢复到原题）
 *   done：≥60 通关 → 本地记 clearedAt + POST /api/reading/complete
 *   （服务端权威发首通奖：金币/SP/魔力，防重放）；逐题经济答题时已入账。
 */

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PartyPopperIcon as PartyPopperIconR } from "@/components/SvgIcons";
import { BookOpenIcon, TrophyIcon, GraduationCapIcon, RepeatIcon as RepeatIconR } from "@/components/icons";
import { AppShell } from "@/components/AppShell";
import { QuestQuiz } from "@/components/reading/QuestQuiz";
import { TapWordText } from "@/components/reading/TapWordText";
import { QuestPlayButton, SpeedTabs, useQuestAudio, type QuestSpeed } from "@/components/reading/ParagraphAudio";
import { useI18n } from "@/lib/i18n";
import { isLoggedIn, submitAnswer, updateProfile } from "@/lib/api";
import { getProfile, setProfile } from "@/lib/plan";
import { useGameStore } from "@/lib/store";
import {
  completeReading,
  getStoryProgress,
  registerReadingSubmitter,
  resolveTrack,
  saveStoryProgress,
  type CompleteResult,
  type StoryProgress,
} from "@/lib/reading";
import { playMp3, speakText, stopSpeech, unlockAudio } from "@/lib/phonics";
import {
  findStory,
  loadTrackData,
  nextStoryOf,
  paraAudioUrl,
  storiesInOrder,
  type ReadingStory,
  type ReadingTrack,
} from "@/content/reading";
import "../../phonics/phonics.css";
import "../reading.css";

type Phase = "intro" | "read" | "quiz" | "done";

/** 学段晋升线：xiaoshengchu → zhongkao → gaokao（gaokao 为顶） */
const NEXT_TRACK: Partial<Record<ReadingTrack, ReadingTrack>> = {
  xiaoshengchu: "zhongkao",
  zhongkao: "gaokao",
};

function PlayForwardGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg>
  );
}
function PartyGlyphR() {
  return <PartyPopperIconR size={13} />;
}
function RepeatGlyphR() {
  return <RepeatIconR size={14} />;
}
export default function ReadingStoryPage() {
  const { t } = useI18n();
  const router = useRouter();
  const params = useParams<{ storyId: string }>();
  const storyId = params.storyId ?? "";

  const [track, setTrack] = useState<ReadingTrack>("xiaoshengchu");
  const [story, setStory] = useState<ReadingStory | null>(null);
  const [next, setNext] = useState<ReadingStory | null>(null);
  const [ready, setReady] = useState(false);

  const [phase, setPhase] = useState<Phase>("intro");
  const { speed, setSpeed } = useQuestAudio();
  const [showCn, setShowCn] = useState(true);
  const [playingIdx, setPlayingIdx] = useState(-1);
  const [quizInitial, setQuizInitial] = useState<StoryProgress | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const autoRunRef = useRef(0); // 连续读序列令牌：++ 即作废在跑的循环
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const [result, setResult] = useState<{ score: number; server: CompleteResult | null; earned: { coins: number; sp: number } } | null>(null);
  const [gradDismissed, setGradDismissed] = useState(false);

  // 经济上报器注册（module 级单次；游客不注册防 401 踢登录）
  useEffect(() => {
    if (!isLoggedIn()) return;
    registerReadingSubmitter(async (wordId, isCorrect, prompt, evidence) => {
      if (!isLoggedIn()) return null;
      const r = await submitAnswer(wordId, isCorrect, prompt, evidence ?? {});
      return { coins: r.coinsEarned, sp: r.spEarned, hearts: r.hearts };
    });
    return () => stopSpeech();
  }, []);

  // 卸载时作废连续读循环
  useEffect(() => () => {
    autoRunRef.current++;
  }, []);

  // 挂载后：解析学段 → 内容包 → 本课与断点信息（水合安全：首帧固定 loading 壳）
  useEffect(() => {
    let alive = true;
    void resolveTrack().then((userTrack) => {
      if (!alive) return;
      setTrack(userTrack);
      void loadTrackData(userTrack).then((data) => {
        if (!alive) return;
        const s = findStory(data, storyId);
        if (s) {
          setStory(s);
          setNext(nextStoryOf(data, storyId));
          const saved = getStoryProgress(storyId);
          if (saved && saved.idx > 0 && saved.idx < s.quiz.length && !saved.clearedAt) {
            setQuizInitial(saved);
          }
        }
        setReady(true);
      });
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId]);

  if (!ready) {
    return (
      <AppShell>
        <div className="ph-page rq-page rq-theme-magic">
          <div className="ph-wrap" />
        </div>
      </AppShell>
    );
  }

  if (!story) {
    return (
      <AppShell>
        <div className="ph-page rq-page rq-theme-magic">
          <div className="ph-wrap text-center">
            <p className="ph-h1">404</p>
            <Link href="/reading" className="ph-btn mt-6 inline-flex">
              {t("reading.backToHall")}
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  const storyTitle = story.titleCn ? `${story.titleCn} · ${story.title}` : story.title;
  const themeClass = track === "zhongkao" ? "rq-theme-space" : track === "gaokao" ? "rq-theme-racing" : "rq-theme-magic";

  /** quiz 结束：落盘 cleared + 服务端结算（首通发奖由服务端判重） */
  const finishQuiz = (score: number, hintsUsed: number, earned: { coins: number; sp: number }) => {
    const cleared = score >= 60;
    const saved = getStoryProgress(storyId);
    saveStoryProgress(storyId, {
      results: [],
      idx: 0,
      clearedAt: cleared ? (saved?.clearedAt ?? Date.now()) : null,
      bestScore: Math.max(saved?.bestScore ?? 0, score),
    });
    setQuizInitial(null);
    if (isLoggedIn()) {
      void completeReading(storyId, score, hintsUsed).then((server) => {
        if (server?.rewards) {
          const s = useGameStore.getState();
          useGameStore.setState({
            coins: s.coins + server.rewards.coins,
            scorePoints: s.scorePoints + server.rewards.sp,
          });
        }
        setResult({ score, server, earned });
        setPhase("done");
      });
    } else {
      setResult({ score, server: null, earned });
      setPhase("done");
    }
  };

  /** 连续读：从 from 段起逐段播放（mp3 优先 / TTS 兜底），段间留 350ms 气口 */
  const playAll = async (from: number) => {
    stopSpeech();
    const seq = ++autoRunRef.current;
    setAutoPlay(true);
    unlockAudio();
    for (let i = from; i < story.paragraphs.length; i++) {
      if (seq !== autoRunRef.current) return;
      setPlayingIdx(i);
      const sp = speedRef.current;
      try {
        const ok = await playMp3(paraAudioUrl(track, story.id, i, sp === 0.8), sp === 1.2 ? 1.15 : 1);
        if (seq !== autoRunRef.current) return;
        if (!ok) await speakText(story.paragraphs[i].text, sp === 0.8 ? 0.7 : sp === 1.2 ? 1.15 : 0.9);
      } catch {
        // 单段失败（网络/编码）不中断连续读，继续下一段
      }
      if (seq !== autoRunRef.current) return;
      await new Promise((r) => setTimeout(r, 350));
    }
    if (seq === autoRunRef.current) {
      setAutoPlay(false);
      setPlayingIdx(-1);
    }
  };

  const stopAuto = () => {
    autoRunRef.current++;
    stopSpeech();
    setAutoPlay(false);
    setPlayingIdx(-1);
  };

  const startQuiz = (fromSaved = false) => {
    stopAuto();
    if (!fromSaved) {
      saveStoryProgress(storyId, {
        results: [],
        idx: 0,
        clearedAt: null,
        bestScore: getStoryProgress(storyId)?.bestScore ?? 0,
      });
      setQuizInitial(null);
    }
    setPhase("quiz");
  };

  const restartQuiz = () => {
    stopSpeech();
    setResult(null);
    setGradDismissed(false);
    startQuiz(false);
  };

  // 毕业仪式：通关本轨最后一课（≥60）。升轨 = 写服务端/本地档案 → 定级测试深链
  const nextTrack = track ? NEXT_TRACK[track] : undefined;
  const isFinalClear = phase === "done" && !!result && result.score >= 60 && !next;
  const advanceTrack = () => {
    if (!nextTrack) return;
    const p = getProfile();
    setProfile({
      track: nextTrack,
      targetScore: p?.targetScore ?? 0,
      examDate: p?.examDate ?? "",
      estimatedScore: p?.estimatedScore,
    });
    if (isLoggedIn()) {
      updateProfile({ track: nextTrack }).catch(() => {});
    }
    router.push(`/onboarding?step=goal&track=${nextTrack}&next=/reading`);
  };

  return (
    <AppShell>
      <div className={`ph-page rq-page ${themeClass}`} style={{ paddingTop: "2.5rem" }}>
        <div className="ph-wrap">
          <Link href="/reading" className="ph-back">
            ← {t("reading.backToHall")}
          </Link>

          {/* ── 开场 ── */}
          {phase === "intro" && (
            <div className="ph-card--ink ph-stage" style={{ padding: "2.5rem 1.5rem" }}>
              <span className="ph-sticker">{story.coverEmoji} STORY</span>
              <h1 className="ph-h1" style={{ fontSize: "1.7rem" }}>{storyTitle}</h1>
              <p className="ph-sub mx-auto" style={{ maxWidth: "26rem" }}>{t("reading.introTip")}</p>
              <p className="mt-2 text-xs font-semibold" style={{ color: "var(--ph-ink-3)" }}>
                {t("reading.passLine")}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  className="ph-btn"
                  onClick={() => {
                    unlockAudio();
                    setPhase("read");
                  }}
                >
                  <BookOpenIcon size={15} className="inline" /> {t("reading.introRead")}
                </button>
                {quizInitial && (
                  <button
                    type="button"
                    className="ph-btn ph-btn--sm"
                    onClick={() => {
                      unlockAudio();
                      startQuiz(true);
                    }}
                  >
                    <PlayForwardGlyph /> {t("reading.continue")}
                  </button>
                )}
              </div>
              <p className="mt-4 text-xs font-semibold" style={{ color: "var(--ph-ink-3)" }}>
                {story.paragraphs.length} {t("reading.words")} · {story.quiz.length} {t("reading.quiz")}
              </p>
            </div>
          )}

          {/* ── 阅读器 ── */}
          {phase === "read" && (
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h1 className="ph-h1" style={{ fontSize: "1.3rem" }}>{storyTitle}</h1>
                <div className="flex items-center gap-2">
                  <button type="button" className="ph-btn ph-btn--ghost ph-btn--sm" onClick={() => setShowCn(!showCn)}>
                    {showCn ? t("reading.hideCn") : t("reading.showCn")}
                  </button>
                  <button
                    type="button"
                    className={`ph-btn ph-btn--sm ${autoPlay ? "" : "ph-btn--ghost"}`}
                    onClick={() => (autoPlay ? stopAuto() : void playAll(0))}
                  >
                    {autoPlay ? t("reading.autoStop") : t("reading.autoPlay")}
                  </button>
                  <SpeedTabs speed={speed} setSpeed={setSpeed} />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                {story.paragraphs.map((p, i) => (
                  <div key={i} className={`rq-para ${playingIdx === i ? "rq-para--playing" : ""}`}>
                    <span className="rq-para-num">{i + 1}</span>
                    <span style={{ flex: 1 }}>
                      <TapWordText text={p.text} />
                      {showCn && <span className="rq-para-cn" style={{ display: "block" }}>{p.translation}</span>}
                    </span>
                    <QuestPlayButton
                      src={paraAudioUrl(track, story.id, i)}
                      slowSrc={paraAudioUrl(track, story.id, i, true)}
                      fallbackText={p.text}
                      speed={speed}
                      onPlayingChange={(on) => setPlayingIdx(on ? i : -1)}
                      onManualStart={stopAuto}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="ph-btn"
                  onClick={() => {
                    unlockAudio();
                    startQuiz(false);
                  }}
                >
                  {t("reading.toQuiz")}
                </button>
              </div>
            </div>
          )}

          {/* ── 听写小测 ── */}
          {phase === "quiz" && (
            <div className="ph-card--ink ph-stage" style={{ padding: "2rem 1.25rem", position: "relative" }}>
              <QuestQuiz
                key={quizInitial ? `${story.id}-resume` : `${story.id}-fresh`}
                story={story}
                initial={quizInitial ? { results: quizInitial.results.map((r) => r.status === "PASSED"), idx: quizInitial.idx, hintsUsed: 0 } : undefined}
                onDone={finishQuiz}
              />
            </div>
          )}

          {/* ── 结算 ── */}
          {phase === "done" && result && (
            <div className="ph-card--ink ph-stage" style={{ padding: "2.5rem 1.5rem" }}>
              <p className="text-6xl text-brand-text inline-flex justify-center">{result.score >= 60 ? <TrophyIcon size={60} /> : <BookOpenIcon size={60} />}</p>
              <h1 className="ph-h1" style={{ fontSize: "1.7rem" }}>
                {result.score >= 60 ? t("reading.done") : t("reading.tryMore")}
              </h1>
              <div className="mx-auto mt-5 grid max-w-sm grid-cols-3 gap-2.5">
                <div className="ph-stat">
                  <b style={{ color: "var(--ph-blue-deep)" }}>{result.score}</b>
                  <span>{t("reading.score")}</span>
                </div>
                <div className="ph-stat">
                  <b style={{ color: "var(--ph-orange)" }}>
                    +{result.earned.coins + (result.server?.rewards?.coins ?? 0)}
                  </b>
                  <span>{t("reading.coinsEarned")}</span>
                </div>
                <div className="ph-stat">
                  <b style={{ color: "var(--ph-green)" }}>
                    +{result.earned.sp + (result.server?.rewards?.sp ?? 0)}
                  </b>
                  <span>{t("reading.spEarned")}</span>
                </div>
              </div>
              {result.server?.firstPass && (
                <p className="mt-4">
                  <span className="ph-pill ph-pill--good inline-flex items-center gap-1"><PartyGlyphR /> {t("reading.firstPass")}</span>
                </p>
              )}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {result.score < 60 && (
                  <button type="button" className="ph-btn" onClick={restartQuiz}>
                    <RepeatGlyphR /> {t("reading.retryStory")}
                  </button>
                )}
                {next && result.score >= 60 && (
                  <Link href={`/reading/${next.id}`} className="ph-btn ph-btn--sm">
                    {t("reading.nextStory")}
                  </Link>
                )}
                <Link href="/reading" className="ph-btn ph-btn--ghost">
                  {t("reading.backToHall")}
                </Link>
              </div>
            </div>
          )}

          {/* ── 毕业仪式：通关本轨最后一课 ── */}
          {isFinalClear && !gradDismissed && (
            <div className="game-overlay fixed inset-0 z-50 flex items-center justify-center p-6" onClick={() => setGradDismissed(true)}>
              <div className="game-modal w-full max-w-sm p-6 text-center" onClick={(e) => e.stopPropagation()}>
                <p className="text-6xl text-brand-text inline-flex justify-center"><GraduationCapIcon size={60} /></p>
                <h1 className="mt-3 font-booster text-2xl font-extrabold text-primary">{t("reading.gradTitle")}</h1>
                <p className="mt-2 text-sm text-secondary">{t("reading.gradDesc")}</p>
                <div className="mt-5 flex flex-col gap-2.5">
                  {nextTrack ? (
                    <>
                      <button type="button" className="game-btn w-full bg-action text-white" onClick={advanceTrack}>
                        {t("reading.gradAdvance")}
                      </button>
                      <button type="button" className="w-full rounded-pill border border-subtle py-3 text-sm font-bold text-secondary" onClick={() => setGradDismissed(true)}>
                        {t("reading.gradStay")}
                      </button>
                    </>
                  ) : (
                    <p className="text-sm font-bold text-secondary">{t("reading.gradTop")}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
