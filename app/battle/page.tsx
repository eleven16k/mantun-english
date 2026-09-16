"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { usePKBattle, type PKQuestion } from "@/lib/usePKBattle";
import { LOGIN_URL } from "@/lib/api";
import { VOCAB, makeQuestion } from "@/lib/vocab";
import { isLoggedIn, getMe } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import { allWords } from "@/content/phonics/data";
import { makeListenQuestion, shuffle, speakWord, stopSpeech, unlockAudio } from "@/lib/phonics";

/**
 * /battle — H3: 1v1 real-time quiz battle over Socket.IO.
 * Host creates a room (5 random word questions); the battle auto-starts
 * once an opponent joins with the code. Live scores from the room state.
 * 「拼读快答」= 听音辨词题源（拼读馆联动）：题目由房主客户端从拼读内容包
 * 生成，`audioWord` 随 Socket 题目载荷原样转发——协议零改动。
 */
export default function BattlePage() {
  const router = useRouter();
  const pk = usePKBattle();
  const { t } = useI18n();

  const [user, setUser] = useState<{ id: number; nickname: string } | null>(null);
  const [joinCode, setJoinCode] = useState("");
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [questionStart, setQuestionStart] = useState(0);

  const q = pk.questions[qIdx];

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.assign(LOGIN_URL);
      return;
    }
    getMe().then((d) => setUser({ id: d.user.id, nickname: d.user.nickname })).catch(() => {});
  }, []);

  // Reset per-question state when the battle begins
  useEffect(() => {
    if (pk.phase === "playing") {
      setQIdx(0);
      setSelected(null);
      setAnswered(false);
      setQuestionStart(Date.now());
    }
  }, [pk.phase]);

  // 听音辨词题（拼读快答）：题目出现即自动播一次
  useEffect(() => {
    if (pk.phase === "playing" && q?.audioWord) void speakWord(q.audioWord, 0.9);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pk.phase, qIdx]);

  useEffect(() => () => stopSpeech(), []);

  // Host: auto-start as soon as an opponent is in
  useEffect(() => {
    if (pk.phase === "lobby" && pk.roomCode && pk.players.length >= 2) {
      const timer = setTimeout(() => pk.startBattle(pk.roomCode!), 800);
      return () => clearTimeout(timer);
    }
  }, [pk.phase, pk.players.length, pk.roomCode]);

  const hostBattle = () => {
    if (!user) return;
    const qs: PKQuestion[] = [...VOCAB].sort(() => Math.random() - 0.5).slice(0, 5).map((word, i) => {
      const made = makeQuestion(word, i, "word-to-cn");
      return { id: made.id, prompt: made.prompt, choices: made.choices, correctIndex: made.correctIndex };
    });
    pk.createRoom("1v1 Battle", user.id, user.nickname, qs);
  };

  // 拼读快答：从拼读内容包出 5 道听音辨词（干扰项优先同单元近音词）
  const hostPhonicsBattle = () => {
    if (!user) return;
    unlockAudio();
    const pool = allWords();
    const qs: PKQuestion[] = shuffle(pool)
      .slice(0, 5)
      .map((w, i) => {
        const unitWords = pool.filter((x) => x.unitId === w.unitId);
        const q = makeListenQuestion(w, unitWords);
        return {
          id: `ph-${i}`,
          prompt: "🔊",
          choices: q.choices.map((c) => `${c.emoji} ${c.text}`),
          correctIndex: q.choices.findIndex((c) => c.text === w.text),
          audioWord: w.text,
        };
      });
    pk.createRoom("Phonics Duel", user.id, user.nickname, qs);
  };

  const joinBattle = () => {
    if (joinCode.length !== 6 || !user) return;
    pk.joinRoom(joinCode, user.id, user.nickname);
  };

  const answer = (i: number) => {
    if (answered || !q || !pk.roomCode) return;
    setSelected(i);
    setAnswered(true);
    pk.submitAnswer(pk.roomCode, qIdx, i === q.correctIndex, Date.now() - questionStart);
    setTimeout(() => {
      setSelected(null);
      setAnswered(false);
      setQuestionStart(Date.now());
      setQIdx((idx) => Math.min(idx + 1, Math.max(pk.questions.length - 1, 0)));
    }, 1200);
  };

  const restart = () => {
    pk.reset();
    setQIdx(0);
    setJoinCode("");
    setSelected(null);
    setAnswered(false);
  };

  const meWon = pk.results.length > 0 && pk.results[0]?.name === user?.nickname;

  return (
    <AppShell>
      <div className="page-shell">
        <PageHeader badge="⚔️ 1V1 BATTLE" title={t("battle.title")} />
        <p className="mb-5 text-sm text-tertiary">
          {pk.connected ? `🟢 ${t("battle.liveTag")}` : `🔴 ${t("pk.connecting")}`}
        </p>

        {/* IDLE: host or join */}
        {pk.phase === "idle" && (
          <div className="g-card-hero p-8 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-subtle text-brand-text">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l3-3" />
              </svg>
            </span>
            <p className="mt-4 font-booster text-lg font-extrabold text-primary">{t("battle.quick")}</p>
            <p className="mt-1 text-sm text-tertiary">{t("battle.rules")}</p>
            <button
              onClick={hostBattle}
              disabled={!pk.connected || !user}
              className="mt-5 rounded-pill bg-brand px-8 py-3 font-booster text-base font-extrabold text-white transition hover:opacity-90 disabled:opacity-40"
            >
              {t("battle.findOpponent")}
            </button>
            <div className="mt-2">
              <button
                onClick={hostPhonicsBattle}
                disabled={!pk.connected || !user}
                className="rounded-pill border-2 border-subtle bg-surface px-6 py-2 text-sm font-bold text-secondary transition hover:border-brandborder disabled:opacity-40"
              >
                🔤 {t("phonics.battleQuick")}
              </button>
            </div>

            {/* Join with a code */}
            <div className="mt-6 flex gap-2">
              <input
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder={t("battle.joinPh")}
                inputMode="numeric"
                className="flex-1 rounded-pill border border-subtle bg-app px-4 py-2.5 text-center text-base font-bold tracking-widest outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-tertiary focus:border-brandborder"
              />
              <button
                onClick={joinBattle}
                disabled={joinCode.length !== 6 || !pk.connected || !user}
                className="rounded-pill border border-subtle bg-surface px-5 py-2.5 text-sm font-bold text-secondary transition hover:border-brandborder disabled:opacity-40"
              >
                {t("battle.joinBtn")}
              </button>
            </div>
            {pk.error && <p className="mt-3 text-center text-xs font-bold text-critical">{pk.error}</p>}
          </div>
        )}

        {/* LOBBY: waiting for the opponent */}
        {pk.phase === "lobby" && (
          <div className="g-card-hero p-6 text-center">
            <p className="text-xs font-bold uppercase text-tertiary">{t("pk.roomCode")}</p>
            <p className="mt-2 font-booster text-5xl font-extrabold tracking-[0.2em] text-primary">{pk.roomCode}</p>
            <button
              onClick={() => pk.roomCode && navigator.clipboard?.writeText(pk.roomCode)}
              className="mt-3 rounded-pill border border-subtle px-4 py-1.5 text-xs font-bold text-secondary transition hover:border-brandborder"
            >
              {t("group.copyCode")}
            </button>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {pk.players.map((p, i) => (
                <span key={i} className={`rounded-pill px-3 py-1.5 text-xs font-bold ${p.role === "teacher" ? "bg-brand-subtle text-brand-text" : "bg-canvas text-secondary"}`}>
                  {p.role === "teacher" ? "👑 " : ""}{p.name}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-tertiary">{pk.players.length < 2 ? t("battle.waiting") : t("battle.autoStart")}</p>
          </div>
        )}

        {/* COUNTDOWN */}
        {pk.phase === "countdown" && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="font-booster text-8xl font-extrabold text-primary">⚡</p>
            <p className="mt-4 text-sm text-tertiary">{t("battle.getReady")}</p>
          </div>
        )}

        {/* PLAYING */}
        {pk.phase === "playing" && q && (
          <div className="flex flex-col gap-4">
            {/* Live score bar (2 players from the room) */}
            <div className="g-card flex items-center justify-between p-3">
              {pk.players.slice(0, 2).map((p, i) => (
                <div key={i} className={`flex items-center gap-2 ${i === 1 ? "flex-row-reverse text-right" : ""}`}>
                  <span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-extrabold text-white ${i === 0 ? "bg-brand" : "bg-tertiary"}`}>
                    {p.name[0]}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-primary">{p.name}</p>
                    <p className={`text-sm font-booster font-extrabold ${i === 0 ? "text-brand-text" : "text-critical"}`}>{p.score}</p>
                  </div>
                </div>
              ))}
              <span className="text-xs font-bold text-tertiary">Q{Math.min(qIdx + 1, pk.questions.length)}/{pk.questions.length}</span>
            </div>

            {/* Question */}
            <div className="g-card-hero p-6 text-center">
              {q.audioWord ? (
                <>
                  <button
                    onClick={() => void speakWord(q.audioWord!, 0.9)}
                    className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-3xl text-white transition hover:opacity-90"
                    aria-label="play word"
                  >
                    🔊
                  </button>
                  <p className="mt-3 text-xs font-bold uppercase text-tertiary">{t("phonics.listenPick")}</p>
                </>
              ) : (
                <p className="font-booster text-3xl font-extrabold text-primary break-words">{q.prompt}</p>
              )}
            </div>

            {/* Choices */}
            <div className="flex flex-col gap-2">
              {q.choices.map((c, i) => {
                const isSel = selected === i;
                const isCorrect = i === q.correctIndex;
                let cls = "game-chip flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold";
                if (answered && isCorrect) cls = "game-chip game-chip--right pointer-events-none flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold";
                else if (answered && isSel) cls = "game-chip game-chip--wrong pointer-events-none flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold";
                return (
                  <button key={i} disabled={answered} onClick={() => answer(i)} className={cls}>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-canvas text-sm font-extrabold text-tertiary">{"ABCD"[i]}</span>
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ENDED */}
        {pk.phase === "ended" && (
          <div className="g-card-hero p-8 text-center">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-subtle text-4xl">{meWon ? "🏆" : "💪"}</span>
            <h2 className="mt-4 font-booster text-2xl font-extrabold text-primary">{meWon ? t("battle.victory") : t("battle.close")}</h2>
            <div className="mt-4 flex flex-col gap-2">
              {pk.results.map((p, i) => (
                <div key={i} className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${i === 0 ? "border-gold bg-gold/10" : "border-subtle bg-surface"}`}>
                  <div className="flex items-center gap-3">
                    <span className="grid w-8 place-items-center font-booster text-lg font-extrabold text-tertiary">{i === 0 ? "🥇" : "🥈"}</span>
                    <span className={`text-sm font-bold ${i === 0 ? "text-gold" : "text-primary"}`}>{p.name}</span>
                  </div>
                  <span className={`font-booster text-lg font-extrabold ${i === 0 ? "text-gold" : "text-brand-text"}`}>{p.score}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <button onClick={restart} className="rounded-pill bg-brand py-3 font-booster font-extrabold text-white transition hover:opacity-90">
                {t("battle.again")}
              </button>
              <button onClick={() => router.push("/chat")} className="text-sm font-bold text-tertiary transition hover:text-secondary">
                {t("battle.backHome")}
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
