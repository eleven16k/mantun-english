'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore, DAILY_FREE_QUESTIONS } from '@/lib/store';
import { getWordById } from '@/lib/vocab';
import { HeartIcon, CoinIcon, BoltIcon, CheckIcon, XIcon, FlameIcon, CrownIcon, MonsterIcon } from './icons';
import { GiftIcon, PartyPopperIcon } from './SvgIcons';
import { submitAnswer, reportEvidence, type AnswerEvidence } from '@/lib/api';
import { judgeAnswer, askTutor, synthesizeSpeech, transcribeSpeech } from '@/lib/deeptutor';
import { Md } from '@/components/Markdown';
import { ExplainSheet } from '@/components/ExplainSheet';
import { useI18n } from '@/lib/i18n';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizScreen() {
  const router = useRouter();
  const { t } = useI18n();

  // Quiz entered from My decks returns there instead of home (?from=decks)
  const [backHref] = useState(() =>
    typeof window !== "undefined" && new URLSearchParams(window.location.search).get("from") === "decks"
      ? "/decks"
      : "/chat"
  );

  // Import questions are loaded by app/quiz/page.tsx BEFORE this renders
  const {
    questions, currentQIndex, selectedAnswer, showFeedback,
    hearts, scoreBoostActive,
    isMember, membershipExpiresAt,
    hintsOwned, scoreBoostsOwned,
    answerQuestion, nextQuestion, useHint, useScoreBoost, navigate,
    dailyQuestionsAnswered, dailyDate,
    coins, scorePoints, streak,
    bossBattle, lastDrop,
  } = useGameStore();

  const [eliminated, setEliminated] = useState<number[]>([]);
  const [typedInput, setTypedInput] = useState('');

  // AI judging (typed questions) + AI tutor panel
  const [judging, setJudging] = useState(false);
  const [judgeFeedback, setJudgeFeedback] = useState<string | null>(null);
  const [tutorOpen, setTutorOpen] = useState(false);
  const [tutorText, setTutorText] = useState('');
  const [tutorSession, setTutorSession] = useState<string | null>(null);
  const [tutorInput, setTutorInput] = useState('');
  const [tutorLoading, setTutorLoading] = useState(false);
  const [tutorSources, setTutorSources] = useState<{ rag: unknown[]; web: unknown[] } | null>(null);
  const [micRecording, setMicRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const micStopRef = useRef<(() => void) | null>(null);
  const quizKbName = useGameStore((s) => s.quizKbName);
  const { locale } = useI18n();
  const [floatReward, setFloatReward] = useState<{ text: string; color: string; key: number; icon?: 'gift' | 'flame' | 'party' } | null>(null);
  const [heartLoss, setHeartLoss] = useState(false);
  const rewardKey = useRef(0);

  // ⚡ 闪电快答 + 🔥 连击 Fever
  const sessionLightning = useGameStore((s) => s.sessionLightning);
  const comboCorrect = useGameStore((s) => s.comboCorrect);
  const feverUntil = useGameStore((s) => s.feverUntil);
  const [lightningLeft, setLightningLeft] = useState(10); // 剩余秒数（浮点）
  const [feverActive, setFeverActive] = useState(false);
  const feverRef = useRef(false); // 该题作答时 Fever 是否生效（服务端同步倍率）
  const speedMultRef = useRef(1); // 该题作答时的速度倍率（服务端同步倍率）
  const qStartRef = useRef(Date.now()); // 本题开始时间（判断层证据：答题用时）
  const [serverResult, setServerResult] = useState<{
    coinsEarned: number; spEarned: number; hearts: number;
    enteredWeakness: boolean; conqueredWeakness: boolean;
  } | null>(null);

  const q = questions[currentQIndex];
  const word = q ? getWordById(q.wordId) : null;
  const wasNew = q ? !useGameStore.getState().cardStates[q.wordId]?.lastReviewedAt : false;

  // Listening questions: speak the word via browser TTS (free, offline)
  const speakWord = useCallback(() => {
    if (!word?.en || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word.en);
    u.lang = 'en-US';
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }, [word?.en]);

  // Auto-play once when a listening question appears
  useEffect(() => {
    if (q?.type === 'listening') speakWord();
  }, [currentQIndex, q?.id, speakWord]);

  const today = new Date().toISOString().slice(0, 10);
  const dq = dailyDate === today ? dailyQuestionsAnswered : 0;
  const freeRemaining = Math.max(0, DAILY_FREE_QUESTIONS - dq);

  // Reset eliminated choices / typed input on new question
  useEffect(() => {
    setEliminated([]);
    setTypedInput('');
    setJudgeFeedback(null);
    setTutorOpen(false);
    setTutorText('');
    setTutorSession(null);
    setTutorInput('');
    setTutorLoading(false);
    setTutorSources(null);
    qStartRef.current = Date.now(); // 判断层证据：换题重起计时
  }, [currentQIndex]);

  // Feedback effects: floating reward on correct, heart shake on wrong
  useEffect(() => {
    if (!showFeedback || selectedAnswer === null || !q) return;
    const correct = selectedAnswer === q.correctIndex;
    if (correct) {
      rewardKey.current++;
      const sp = useGameStore.getState().sessionSPEarned;
      setFloatReward({ text: sp > 0 ? `+${sp} ${t('quiz.scoreLabel')}` : '\u2713', color: '#10B981', key: rewardKey.current });
      setTimeout(() => setFloatReward(null), 1200);
    } else {
      setHeartLoss(true);
      setTimeout(() => setHeartLoss(false), 600);
    }
  }, [showFeedback, selectedAnswer, q, t]);

  // ⚡ 闪电快答：每题 10 秒倒计时，超时按答错处理
  useEffect(() => {
    if (!sessionLightning || showFeedback) return;
    const started = Date.now();
    setLightningLeft(10);
    const iv = setInterval(() => {
      const left = Math.max(0, 10 - (Date.now() - started) / 1000);
      setLightningLeft(left);
      if (left <= 0) {
        clearInterval(iv);
        handleAnswer(-1);
      }
    }, 100);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQIndex, showFeedback, sessionLightning]);

  // 🔥 Fever 到期落牌
  useEffect(() => {
    setFeverActive(!!feverUntil && feverUntil > Date.now());
    if (!feverUntil) return;
    const iv = setInterval(() => setFeverActive(feverUntil > Date.now()), 500);
    return () => clearInterval(iv);
  }, [feverUntil]);

  // 🎁 答题掉落：金币雨 + 飘字
  const [dropShower, setDropShower] = useState<{ coins: number; key: number } | null>(null);
  const dropKey = useRef(0);
  const lastDropSeen = useRef(0);
  useEffect(() => {
    if (!lastDrop || lastDrop === lastDropSeen.current) return;
    lastDropSeen.current = lastDrop;
    dropKey.current++;
    setDropShower({ coins: lastDrop, key: dropKey.current });
    rewardKey.current++;
    setFloatReward({ text: `+${lastDrop} 金币`, color: '#F59E0B', key: rewardKey.current, icon: 'gift' });
    const t1 = setTimeout(() => setDropShower(null), 1400);
    const t2 = setTimeout(() => setFloatReward(null), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [lastDrop]);

  // ---- Handlers ----
  // 判断层证据：typed 题（AI 简答/填空）由 submitTyped 传入文本证据
  const handleAnswer = (i: number, typed?: { chosen: string; correct: string }) => {
    if (showFeedback || !q) return;
    const isCorrect = i === q.correctIndex;
    // 判断层证据（阶段1）：所选/正确选项与答题用时，随结算请求上报
    const evidence: AnswerEvidence = typed
      ? { questionType: 'typed', chosen: typed.chosen, correct: typed.correct }
      : {
          questionType: q.type,
          chosen: q.choices?.[i],
          correct: q.choices?.[q.correctIndex],
        };
    evidence.timeMs = Date.now() - qStartRef.current;

    // ⚡ 闪电模式：记录本题剩余秒数与倍率；🔥 Fever 生效则记录 ×2
    const st = useGameStore.getState();
    const feverOn = !!st.feverUntil && st.feverUntil > Date.now();
    feverRef.current = feverOn;
    speedMultRef.current =
      st.sessionLightning && lightningLeft != null
        ? (lightningLeft >= 7.5 ? 3 : lightningLeft >= 5 ? 2 : 1) * (feverOn ? 2 : 1)
        : feverOn
          ? 2
          : 1;

    // Optimistic local update for instant UI（闪电剩余秒数参与提分值倍率）
    const before = useGameStore.getState(); // 对账基线（P0：session 计数以服务端权威值为准）
    answerQuestion(i, { lightningLeftSec: st.sessionLightning ? lightningLeft : undefined });

    // 🔥 连击触发 Fever 的即时反馈
    const after = useGameStore.getState();
    if (after.feverUntil && after.feverUntil > Date.now() && !feverOn) {
      rewardKey.current++;
      setFloatReward({ text: 'FEVER ×2', color: '#F59E0B', key: rewardKey.current, icon: 'flame' });
      setTimeout(() => setFloatReward(null), 1400);
    }
    // 👹 Boss 被击败的即时反馈
    if (after.bossBattle?.defeated) {
      rewardKey.current++;
      setFloatReward({ text: 'Boss 击败！+50金币 +50SP', color: '#16A34A', key: rewardKey.current, icon: 'party' });
      setTimeout(() => setFloatReward(null), 1600);
    }

    // Fire server call (authoritative — updates hearts/coins/SP/streak/weakness/SM-2)
    if (q.wordId && !q.wordId.startsWith("import-") && !q.wordId.startsWith("plan-") && !q.wordId.startsWith("weak-") && !q.wordId.startsWith("battle-") && !q.wordId.startsWith("vocab-") && !q.wordId.startsWith("t")) {
      // Real vocab word → full server processing
      submitAnswer(q.wordId, isCorrect, q.prompt, evidence)
        .then(result => {
          setServerResult(result);
          // Sync authoritative values back to store
          // （闪电/Fever 的本地倍率同样作用在服务端回报的提分值上）
          useGameStore.setState({
            hearts: result.hearts,
            coins: result.coinsEarned > 0 ? coins + result.coinsEarned : coins,
            scorePoints: result.spEarned > 0 ? scorePoints + Math.floor(result.spEarned * speedMultRef.current) : scorePoints,
            weekSP: result.weekSP,
            streak: result.streak,
            heartsDepletedAt: result.hearts === 0 ? Date.now() : null,
          });
          // P0 对账：session 计数器（结算页奖励展示）改用服务端权威增量，
          // 消除本地算式（20/30/40·5/8/10）与服务端口径（30/8·衰减）的偏差
          const localSpDelta = after.sessionSPEarned - before.sessionSPEarned;
          const serverSp = Math.floor(result.spEarned * speedMultRef.current);
          const spDiff = serverSp - localSpDelta;
          const localCoinDelta = after.sessionCoinsEarned - before.sessionCoinsEarned;
          const coinDiff = result.coinsEarned - localCoinDelta;
          if (spDiff !== 0 || coinDiff !== 0) {
            useGameStore.setState({
              sessionSPEarned: after.sessionSPEarned + spDiff,
              sessionCoinsEarned: after.sessionCoinsEarned + coinDiff,
            });
          }
        })
        .catch(err => {
          // Server unreachable → stay on local state (offline mode)
          console.warn("Server sync failed, using local state:", err.message);
        });
    } else if (q.wordId) {
      // 判断层证据（阶段1）：不进经济结算的题（import-N/plan-/weak- 等）也留痕，
      // 供错因诊断管线使用——补齐 AI 导入题/计划题绕过学习闭环的盲区
      reportEvidence(q.wordId, isCorrect, q.prompt, evidence);
    }
  };

  const handleHint = () => {
    if (hintsOwned <= 0 || eliminated.length > 0 || showFeedback || !q || isTyped) return;
    const success = useHint();
    if (success) {
      const wrongIndices = q.choices
        .map((_, i) => i)
        .filter(i => i !== q.correctIndex)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      setEliminated(wrongIndices);
    }
  };

  const handleBoost = () => {
    if (scoreBoostsOwned <= 0 || scoreBoostActive) return;
    useScoreBoost();
  };

  // ---- Early returns ----
  // Only require the question itself; word is optional (imported AI questions
  // may not have a matching vocab entry)
  if (!q) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-tertiary mb-4">{t('quiz.noQuestions')}</p>
          <button onClick={() => router.push(backHref)} className="btn-pill btn-primary">{t('quiz.backToHome')}</button>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === q.correctIndex;
  const total = questions.length;
  const progress = ((currentQIndex + (showFeedback ? 1 : 0)) / total) * 100;
  const outOfHearts = hearts === 0 && freeRemaining === 0 && !isMember;
  // 👑 会员到期前 7 天：答题界面常驻续费提醒（设置页/定价页同款逻辑）
  const memberDaysLeft = isMember && membershipExpiresAt
    ? Math.ceil((membershipExpiresAt * 1000 - Date.now()) / 86400000)
    : null;

  // Prompt font size adapts to length so sentences (fill-blank / AI questions)
  // stay readable on phone screens instead of exploding at display size
  const promptLen = q.prompt.length;
  const promptSize =
    promptLen <= 16 ? 'text-5xl sm:text-6xl' :
    promptLen <= 48 ? 'text-2xl sm:text-3xl' :
    'text-lg sm:text-xl';

  // Typed questions (AI short-answer / fill-in): AI semantic grading via
  // DeepTutor with string-normalization fallback when the sidecar is down
  const isTyped = typeof q.answer === 'string' && (q.choices?.length ?? 0) <= 1;
  const submitTyped = async () => {
    if (!typedInput.trim() || showFeedback || judging) return;
    const norm = (s: string) => s.trim().toLowerCase().replace(/[.,!?;:'"。，！？；：]/g, '');
    let correct = norm(typedInput) === norm(q.answer ?? '');
    let aiFeedback: string | null = null;

    setJudging(true);
    const judged = await judgeAnswer({
      question: q.prompt,
      questionType: 'short_answer',
      correctAnswer: q.answer ?? '',
      explanation: q.explanation,
      userAnswer: typedInput,
      language: locale === 'zh' ? 'zh' : 'en',
    }).catch(() => null);
    setJudging(false);
    if (judged) {
      correct = judged.verdict === 'correct' || judged.verdict === 'partial';
      aiFeedback = judged.feedback;
    }
    setJudgeFeedback(aiFeedback);
    handleAnswer(correct ? 0 : 1, { chosen: typedInput.trim(), correct: q.answer ?? '' });
  };

  // Ask the AI tutor about the current question (explanation / follow-ups)
  const askAboutQuestion = async (extra?: string) => {
    if (!q || tutorLoading) return;
    setTutorOpen(true);
    setTutorLoading(true);
    const correctText = isTyped ? (q.answer ?? '') : (q.choices?.[q.correctIndex] ?? '');
    const myText = isTyped ? typedInput : (q.choices?.[selectedAnswer ?? 0] ?? t('quiz.skipped'));
    const message = extra ?? (
      `题目：${q.prompt}\n我的答案：${myText}\n正确答案：${correctText}\n` +
      `请用${locale === 'zh' ? '中文' : 'English'}简短讲解这道题：为什么正确答案是它？我错在哪里？如有易混淆点请给出记忆技巧。`
    );
    setTutorText('');
    setTutorSources(null);
    const result = await askTutor(message, {
      sessionId: tutorSession,
      kbName: quizKbName ?? undefined,
      language: locale === 'zh' ? 'zh' : 'en',
      onChunk: (chunk) => setTutorText((prev) => prev + chunk),
    }).catch(() => null);
    setTutorLoading(false);
    if (result) {
      setTutorSession(result.sessionId);
      setTutorSources(result.sources ?? null);
    }
    else if (!tutorText) setTutorText(t('quiz.aiOffline'));
  };

  // Voice input: record → sidecar STT → fill the follow-up box
  const toggleMic = async () => {
    if (micRecording) { micStopRef.current?.(); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      setMicRecording(true);
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        setMicRecording(false);
        const text = await transcribeSpeech(new Blob(chunks, { type: chunks[0]?.type ?? 'audio/webm' }), locale === 'zh' ? 'zh' : 'en').catch(() => null);
        if (text) setTutorInput((prev) => (prev ? prev + ' ' + text : text));
      };
      const recorderRef = recorder;
      recorder.start();
      // Auto-stop after 15s to bound recording length
      setTimeout(() => { if (recorderRef.state === 'recording') recorderRef.stop(); }, 15000);
      // Tap the mic again to stop early
      micStopRef.current = () => { if (recorderRef.state === 'recording') recorderRef.stop(); };
    } catch {
      setMicRecording(false);
    }
  };

  // Voice output: sidecar TTS → audio playback; browser speechSynthesis fallback
  const speakReply = async () => {
    if (!tutorText || speaking) return;
    setSpeaking(true);
    const done = () => setSpeaking(false);
    const blob = await synthesizeSpeech(tutorText).catch(() => null);
    if (blob) {
      try {
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.onended = done;
        audio.onerror = done;
        await audio.play();
        return;
      } catch { /* fall through to browser TTS */ }
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(tutorText);
      u.lang = locale === 'zh' ? 'zh-CN' : 'en-US';
      u.onend = done;
      u.onerror = done;
      window.speechSynthesis.speak(u);
    } else {
      done();
    }
  };

  if (outOfHearts && !showFeedback) return <OutOfHeartsScreen backHref={backHref} />;

  // ---- Main render ----
  return (
    <div className="flex flex-col h-screen bg-app">
      {/* Top bar: progress + exit + hearts */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={() => router.push(backHref)} className="text-tertiary hover:text-secondary p-1 -ml-1">
          <XIcon size={22} />
        </button>
        <div className="flex-1 progress-track h-2.5">
          <div className="progress-fill" style={{ width: `${progress}%`, background: 'var(--bg-brand-emphasis-default)' }} />
        </div>
        <div className={`flex items-center gap-0.5 ${heartLoss ? 'animate-pop' : ''}`}>
          <HeartIcon size={20} className={hearts > 0 ? 'text-hearts' : 'text-tertiary'} />
          <span className={`font-heading font-extrabold text-sm ${hearts > 0 ? 'text-hearts' : 'text-tertiary'}`}>{hearts}</span>
        </div>
        {feverActive && <span className="fever-badge inline-flex items-center gap-1"><FlameIcon size={12} /> FEVER ×2</span>}
      </div>
      {sessionLightning && !showFeedback && (
        <div className="px-4 pb-1 -mt-1">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-black tabular-nums ${lightningLeft <= 3 ? 'text-critical' : 'text-gold'}`}>
              <BoltIcon size={12} className="inline" /> {lightningLeft.toFixed(1)}s
            </span>
            <div className="flex-1 progress-track h-1.5">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${lightningLeft * 10}%`,
                  background: lightningLeft <= 3 ? 'var(--bg-critical-emphasis-default)' : 'var(--bg-gold-emphasis-default)',
                }}
              />
            </div>
          </div>
        </div>
      )}
      {isMember && memberDaysLeft !== null && memberDaysLeft <= 7 && !showFeedback && (
        <button
          onClick={() => router.push('/pricing')}
          className="mx-4 mb-1 rounded-xl bg-brand-subtle px-3 py-1.5 text-left text-[11px] font-bold text-brand-text transition hover:opacity-80"
        >
          <CrownIcon size={13} className="inline" /> {Math.max(0, memberDaysLeft)} {t('pricing.daysLeft')}
        </button>
      )}
      {/* 👹 Boss 战：血条 + 击杀提示 */}
      {bossBattle && (
        <div className="mx-4 mb-1 rounded-2xl border-2 border-[var(--ink)] bg-surface px-4 py-2 shadow-[0_3px_0_0_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between text-xs font-black text-primary">
            <span className="inline-flex items-center gap-1"><MonsterIcon size={14} /> BOSS · {bossBattle.word}</span>
            <span className={bossBattle.defeated ? 'text-positive' : 'text-critical'}>
              {bossBattle.defeated ? '击败！+50金币 +50SP' : `HP ${bossBattle.hp}/${bossBattle.maxHp}`}
            </span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-pill bg-canvas">
            <div
              className="h-full rounded-pill transition-all duration-500"
              style={{ width: `${(bossBattle.hp / bossBattle.maxHp) * 100}%`, background: 'var(--bg-critical-emphasis-default)' }}
            />
          </div>
          {showFeedback && selectedAnswer !== q.correctIndex && !bossBattle.defeated && (
            <p className="mt-1 text-center text-[11px] font-bold text-critical inline-flex items-center gap-1"><MonsterIcon size={12} /> 答错了，Boss 回血 +1！</p>
          )}
        </div>
      )}

      {/* Session mini bar */}
      <div className="flex items-center justify-center gap-3 pb-2">
        <span className="text-xs font-bold text-brand-text">{currentQIndex + 1} / {total}</span>
        {scoreBoostActive && (
          <span className="flex items-center gap-1 text-xs font-bold text-white bg-brand px-2.5 py-0.5 rounded-full animate-pop">
            <BoltIcon size={11} /> {t('quiz.x2Boost')}
          </span>
        )}
      </div>

      {/* Question card */}
      <div className="flex-1 px-4 flex flex-col overflow-hidden">
        <div className="g-card-hero flex-1 flex flex-col items-center justify-between text-center relative mx-4 my-2 py-6 overflow-y-auto">
          {/* Floating reward animation */}
          {floatReward && (
          <div key={floatReward.key} className="float-reward top-1/3 left-1/2 -translate-x-1/2 flex items-center gap-1.5" style={{ color: floatReward.color }}>
            {floatReward.icon === 'gift' && <GiftIcon size={18} />}
            {floatReward.icon === 'flame' && <FlameIcon size={18} />}
            {floatReward.icon === 'party' && <PartyPopperIcon size={18} />}
            {floatReward.text}
            </div>
          )}
          {dropShower && (
            <div key={dropShower.key} className="coin-shower" aria-hidden>
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} style={{ left: `${15 + i * 14}%`, animationDelay: `${i * 0.12}s` }}><CoinIcon size={18} /></span>
              ))}
            </div>
          )}

          {/* New word badge */}
          {wasNew && !showFeedback && (
            <div className="absolute top-4 right-4 game-badge px-2.5 py-1 text-[10px] text-primary">
              {t('quiz.newBadge')}
            </div>
          )}

          {/* Word display — listening questions render a tap-to-replay speaker */}
          <div className="w-full px-6 pt-4">
            <div className="text-xs font-bold text-tertiary uppercase tracking-wider mb-2">{word?.type ?? t('quiz.quizFallback')}</div>
            {q.type === 'listening' ? (
              <button
                onClick={speakWord}
                aria-label={t('quiz.tapReplay')}
                className="mx-auto mb-2 grid h-24 w-24 place-items-center rounded-full bg-brand-subtle text-brand-text transition hover:scale-105 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5 6 9H2v6h4l5 4V5z" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              </button>
            ) : (
              <div className={`font-heading font-extrabold text-primary mb-2 leading-tight break-words ${promptSize}`}>
                {q.prompt}
              </div>
            )}
            <div className="text-sm sm:text-base text-brand-text font-medium break-words">{q.promptSub}</div>
            {q.type === 'listening' && (
              <p className="mt-1 text-[11px] text-tertiary">{t('quiz.tapReplay')}</p>
            )}
          </div>

          {/* Typed answer (short-answer / fill-in) OR answer choices */}
          <div className="w-full space-y-2.5 px-4 pt-2">
            {isTyped ? (
            <div className="flex flex-col gap-2.5">
              <input
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && typedInput.trim() && !showFeedback) submitTyped(); }}
                disabled={showFeedback}
                autoFocus
                placeholder={t('quiz.typedPh')}
                className={`w-full rounded-2xl border-2 bg-surface px-4 py-3.5 text-center text-lg font-bold text-primary outline-none placeholder:text-tertiary placeholder:font-normal placeholder:text-sm ${
                  showFeedback
                    ? isCorrect ? 'border-[var(--bg-positive-emphasis-default)]' : 'border-[var(--bg-critical-emphasis-default)]'
                    : 'border-subtle focus:border-brandborder'
                }`}
              />
              {!showFeedback && (
                <button
                  onClick={submitTyped}
                  disabled={!typedInput.trim() || judging}
                  className="game-btn w-full bg-action py-3 font-booster text-white disabled:opacity-40"
                >
                  {judging ? t('quiz.aiJudging') : t('quiz.submit')}
                </button>
              )}
            </div>
            ) : (q.choices ?? []).map((choice, i) => {
              const isEliminated = eliminated.includes(i);
              const isSelected = selectedAnswer === i;
              const isCorrectAns = i === q.correctIndex;

              let btnClass = 'game-chip flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-[15px]';
              let badgeClass = 'bg-canvas text-tertiary';
              let iconEl: React.ReactNode = null;

              if (isEliminated) {
                btnClass = 'game-chip pointer-events-none flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-[15px] font-bold text-primary opacity-30 line-through';
                badgeClass = 'bg-canvas text-tertiary';
              } else if (showFeedback) {
                if (isCorrectAns) {
                  btnClass = 'game-chip game-chip--right pointer-events-none flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-[15px] font-bold cursor-default';
                  badgeClass = 'bg-positive text-white';
                  iconEl = <CheckIcon size={16} />;
                } else if (isSelected) {
                  btnClass = 'game-chip game-chip--wrong pointer-events-none flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-[15px] font-bold cursor-default';
                  badgeClass = 'bg-critical text-white';
                  iconEl = <XIcon size={16} />;
                } else {
                  btnClass = 'game-chip pointer-events-none flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-[15px] font-bold text-primary opacity-40 cursor-default';
                  badgeClass = 'bg-canvas text-tertiary';
                }
              }

              return (
                <button
                  key={i}
                  disabled={showFeedback || isEliminated}
                  onClick={() => handleAnswer(i)}
                  className={btnClass}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-heading font-extrabold text-xs shrink-0 ${badgeClass}`}>
                    {LETTERS[i]}
                  </span>
                  <span className="flex-1 text-left">{choice}</span>
                  {iconEl}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action bar (pre-answer) / feedback bar (post-answer) */}
      {showFeedback ? (
        <div className="px-4 pb-6 pt-3 screen-enter">
          <div className={`rounded-2xl p-4 mb-3 ${isCorrect ? 'bg-[#F0FDF4] border-2 border-[#22C55E]' : 'bg-[#FEF2F2] border-2 border-[#EF4444]'}`}>
            <div className={`font-heading font-extrabold text-sm mb-1 ${isCorrect ? 'text-positive' : 'text-critical'}`}>
              {isCorrect ? '\u2713 ' + t('quiz.correct') : '\u2717 ' + t('quiz.answer') + ' ' + (isTyped ? (q.answer ?? '') : (q.choices?.[q.correctIndex] ?? q.correctIndex))}
            </div>
            {judgeFeedback ? (
              <Md className="text-xs leading-relaxed text-secondary">{judgeFeedback}</Md>
            ) : (
              <div className="text-xs text-tertiary leading-relaxed whitespace-pre-line">{q.explanation}</div>
            )}

            {/* D1 错题讲解员：答错时豚豚 ≤3 句讲明白（幂等缓存，全题型通用） */}
            {!isCorrect && q.wordId && <ExplainSheet wordId={q.wordId} />}

            {/* AI tutor panel \u2014 streamed explanation + follow-ups + voice + sources */}
            {tutorOpen && (
              <div className="mt-3 rounded-xl bg-surface p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-tertiary">{t('quiz.aiTutorTitle')}</p>
                  {tutorText && !tutorLoading && (
                    <button
                      onClick={speakReply}
                      disabled={speaking}
                      aria-label={t('quiz.speakReply')}
                      className="grid h-7 w-7 place-items-center rounded-full text-brand-text transition hover:bg-canvas disabled:opacity-50"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5 6 9H2v6h4l5 4V5z" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    </button>
                  )}
                </div>
                {tutorLoading && !tutorText && <p className="text-xs font-bold text-brand-text">{t('quiz.aiThinking')}</p>}
                {tutorText && (
                  <Md className="max-h-44 overflow-y-auto text-xs leading-relaxed text-secondary">{tutorText}</Md>
                )}

                {/* RAG / web citations */}
                {tutorSources && (tutorSources.rag.length > 0 || tutorSources.web.length > 0) && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {tutorSources.rag.map((s: Record<string, unknown>, i: number) => (
                      <span key={'r' + i} className="rounded-pill bg-brand-subtle px-2 py-0.5 text-[10px] font-bold text-brand-text">
                        \ud83d\udcda {String((s as { kb_name?: string }).kb_name ?? t('quiz.sourceKb'))}
                      </span>
                    ))}
                    {tutorSources.web.map((_: unknown, i: number) => (
                      <span key={'w' + i} className="rounded-pill bg-canvas px-2 py-0.5 text-[10px] font-bold text-secondary">
                        \ud83c\udf10 {t('quiz.sourceWebPrefix')}{i + 1}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-2 flex gap-1.5">
                  <button
                    onClick={toggleMic}
                    aria-label={t('quiz.micInput')}
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${micRecording ? 'bg-critical text-white animate-pulse' : 'text-brand-text hover:bg-canvas'}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                    </svg>
                  </button>
                  <input
                    value={tutorInput}
                    onChange={(e) => setTutorInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && tutorInput.trim()) { const v = tutorInput; setTutorInput(''); askAboutQuestion(v); } }}
                    placeholder={micRecording ? t('quiz.listening') : t('quiz.tutorPh')}
                    className="flex-1 rounded-pill border border-subtle bg-app px-3 py-1.5 text-xs outline-none placeholder:text-tertiary focus:border-brandborder"
                  />
                  <button
                    onClick={() => { if (tutorInput.trim()) { const v = tutorInput; setTutorInput(''); askAboutQuestion(v); } }}
                    disabled={!tutorInput.trim() || tutorLoading}
                    className="rounded-pill bg-brand px-3 py-1.5 text-xs font-bold text-white disabled:opacity-40"
                  >
                    {t('quiz.tutorSend')}
                  </button>
                </div>
              </div>
            )}
            {!tutorOpen && (
              <button onClick={() => askAboutQuestion()} className="mt-2 flex items-center gap-1 text-xs font-bold text-brand-text transition hover:opacity-80">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {t('quiz.askAi')}
              </button>
            )}
          </div>
          <button
            onClick={() => {
              if (currentQIndex + 1 >= total) {
                // Last question: end quiz then navigate to results page
                nextQuestion(); // internally calls endQuiz() which sets lastResults
                router.push(backHref === "/decks" ? "/results?from=decks" : "/results");
              } else {
                nextQuestion();
              }
            }}
            className="game-btn w-full bg-action px-10 py-3.5 font-booster text-base text-white"
          >
            {currentQIndex + 1 >= total ? t('quiz.seeResults') : t('quiz.continue')}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3 px-4 pb-5 pt-3">
          <button
            onClick={handleHint}
            disabled={hintsOwned === 0 || eliminated.length > 0 || isTyped}
            className="flex items-center gap-1.5 rounded-pill border border-subtle bg-surface px-4 py-2.5 font-bold text-sm text-secondary transition hover:border-brandborder disabled:opacity-40 active:scale-95"
          >
            <span className="text-base">{'\uD83D\uDCA1'}</span> {t('quiz.hint')}
            {hintsOwned > 0 && <span className="text-gold">({hintsOwned})</span>}
          </button>
          <button
            onClick={handleBoost}
            disabled={scoreBoostsOwned === 0 || scoreBoostActive}
            className="flex items-center gap-1.5 rounded-pill border border-subtle bg-surface px-4 py-2.5 font-bold text-sm text-secondary transition hover:border-brandborder disabled:opacity-40 active:scale-95"
          >
            <BoltIcon size={15} className="text-brand-text" /> {t('quiz.x2Score')}
            {scoreBoostsOwned > 0 && <span className="text-brand-text">({scoreBoostsOwned})</span>}
          </button>
        </div>
      )}
    </div>
  );
}

function OutOfHeartsScreen({ backHref }: { backHref: string }) {
  const router = useRouter();
  const { refillHearts, navigate } = useGameStore();
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 text-center screen-enter">
      <div className="text-7xl mb-4 animate-bounce-in">{'\uD83D\uDC94'}</div>
      <h2 className="font-heading text-2xl font-extrabold text-primary mb-2">{t('quiz.outOfHearts')}</h2>
      <p className="text-tertiary mb-8 leading-relaxed">{t('quiz.heartsRefill')}<br />{t('quiz.orContinueWith')}</p>
      <div className="w-full space-y-3">
        <button onClick={() => router.push('/shop')} className="flex w-full items-center justify-center gap-2 rounded-pill bg-action py-4 font-booster text-base font-extrabold text-white transition hover:bg-actionhover">
          <CoinIcon size={20} /> {t('quiz.goToShop')}
        </button>
        <button onClick={refillHearts} className="w-full rounded-pill border-2 border-subtle py-3 text-sm font-bold text-secondary transition hover:border-brandborder hover:text-primary">
          {t('quiz.watchAd')}
        </button>
        <button onClick={() => router.push('/pricing')} className="w-full rounded-pill bg-brand py-3 text-sm font-bold text-white transition hover:opacity-90">
          {t('quiz.upgradeMember')}
        </button>
        <button onClick={() => router.push(backHref)} className="text-tertiary text-sm font-bold mt-2">{t('quiz.later')}</button>
      </div>
    </div>
  );
}
