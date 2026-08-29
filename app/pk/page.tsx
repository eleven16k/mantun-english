"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { usePKBattle, type PKQuestion } from "@/lib/usePKBattle";
import { VOCAB, makeQuestion } from "@/lib/vocab";
import { isLoggedIn, getMe } from "@/lib/api";
import { useGameStore } from "@/lib/store";
import { DeckIcon } from "@/components/DeckIcon";
import { useI18n } from "@/lib/i18n";

/**
 * /pk — H2: Class PK competition.
 * Teacher creates a timed battle → students join with code → real-time leaderboard.
 * Uses Socket.IO via custom server (server.js).
 */

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 animate-spin text-brand-text" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function PKPage() {
  const router = useRouter();
  const pk = usePKBattle();
  const { t } = useI18n();

  const [mode, setMode] = useState<"teacher" | "student">("teacher");
  const [className, setClassName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  // Deck selected as the question source ("" = built-in random vocab)
  const [deckId, setDeckId] = useState("");
  const userDecks = useGameStore((s) => s.userDecks);
  const [user, setUser] = useState<{ id: number; nickname: string } | null>(null);

  // Quiz state during battle
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [questionStart, setQuestionStart] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const q = pk.questions[qIdx];

  // Get user info
  useEffect(() => {
    if (isLoggedIn()) {
      getMe().then(d => setUser({ id: d.user.id, nickname: d.user.nickname })).catch(() => {});
    }
  }, []);

  // Countdown timer during battle
  useEffect(() => {
    if (pk.phase !== "playing" || !pk.endsAt) return;
    const t = setInterval(() => {
      const left = Math.max(0, Math.ceil((pk.endsAt! - Date.now()) / 1000));
      setTimeLeft(left);
      if (left <= 0) clearInterval(t);
    }, 500);
    return () => clearInterval(t);
  }, [pk.phase, pk.endsAt]);

  // Teacher creates room
  const handleCreate = () => {
    if (!className.trim() || !user) return;
    let qs: PKQuestion[];
    const deck = userDecks.find((d) => d.id === deckId);
    if (deck && deck.questions.length > 0) {
      // Teacher's uploaded deck becomes the battle question set
      qs = deck.questions.map((q) => ({
        id: q.id,
        prompt: q.prompt,
        choices: q.choices,
        correctIndex: q.correctIndex,
      }));
    } else {
      // Fallback: 10 random questions from the built-in vocab bank
      qs = [...VOCAB].sort(() => Math.random() - 0.5).slice(0, 10).map((word, i) => {
        const q = makeQuestion(word, i, "word-to-cn");
        return { id: q.id, prompt: q.prompt, choices: q.choices, correctIndex: q.correctIndex };
      });
    }
    pk.createRoom(className.trim(), user.id, user.nickname, qs);
  };

  // Student joins
  const handleJoin = () => {
    if (joinCode.length !== 6 || !user) return;
    pk.joinRoom(joinCode, user.id, user.nickname);
  };

  // Answer a question
  const answer = (i: number) => {
    if (answered || !q || !pk.roomCode) return;
    setSelected(i);
    setAnswered(true);
    const isCorrect = i === q.correctIndex;
    const timeMs = Date.now() - questionStart;
    pk.submitAnswer(pk.roomCode, qIdx, isCorrect, timeMs);
  };

  // Next question
  const nextQ = () => {
    if (qIdx + 1 >= pk.questions.length) return;
    setQIdx(i => i + 1);
    setSelected(null);
    setAnswered(false);
    setQuestionStart(Date.now());
  };

  // Countdown display (3-2-1)
  const [countdown, setCountdown] = useState(3);
  useEffect(() => {
    if (pk.phase !== "countdown") return;
    setCountdown(3);
    const t = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(t); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [pk.phase]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/auth");
    }
  }, []);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[768px] px-6 pt-[84px] pb-6">
        <h1 className="pt-1 font-booster text-[26px] font-extrabold leading-[32px] text-primary mb-2">{t("pk.title")}</h1>
        <p className="mb-5 text-sm text-tertiary">
          {pk.connected ? `🟢 ${t("pk.connected")}` : `🔴 ${t("pk.connecting")}`} · {t("pk.realtime")}
        </p>

        {/* IDLE: choose mode */}
        {pk.phase === "idle" && (
          <>
            <div className="mb-5 flex rounded-pill border border-subtle bg-surface p-1">
              {(["teacher", "student"] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 rounded-pill py-2 text-sm font-bold transition ${mode === m ? "bg-action text-white" : "text-tertiary"}`}
                >
                  {m === "teacher" ? t("pk.hostBattle") : t("pk.joinBattle")}
                </button>
              ))}
            </div>

            {mode === "teacher" ? (
              <div className="g-card p-5 shadow-sm">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wide text-tertiary">{t("pk.battleName")}</span>
                  <input
                    value={className}
                    onChange={e => setClassName(e.target.value)}
                    placeholder={t("pk.battleNamePh")}
                    className="rounded-xl border border-subtle bg-app px-3 py-2.5 text-sm outline-none focus:border-brandborder"
                  />
                </label>

                {/* Question source: one of the teacher's decks, or built-in random */}
                <span className="mt-4 text-xs font-bold uppercase tracking-wide text-tertiary">{t("pk.deckSource")}</span>
                <div className="mt-1.5 flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => setDeckId("")}
                    className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition ${
                      deckId === "" ? "border-brandborder bg-brand-subtle" : "border-subtle bg-app hover:bg-canvas"
                    }`}
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-canvas text-tertiary">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-primary">{t("pk.randomVocab")}</span>
                    </span>
                  </button>
                  {userDecks.map((deck) => (
                    <button
                      key={deck.id}
                      type="button"
                      disabled={deck.questions.length === 0}
                      onClick={() => setDeckId(deck.id)}
                      className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition disabled:opacity-40 ${
                        deckId === deck.id ? "border-brandborder bg-brand-subtle" : "border-subtle bg-app hover:bg-canvas"
                      }`}
                    >
                      <DeckIcon icon={deck.icon} color={deck.color} size={28} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-primary">{deck.title}</span>
                        <span className="block text-xs text-tertiary">
                          {deck.questions.length > 0
                            ? <>{deck.questions.length} {t("pk.deckQuestions")}</>
                            : t("deck.empty")}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                <p className="mt-3 text-xs text-tertiary">{t("pk.rules")}</p>
                <button
                  onClick={handleCreate}
                  disabled={!className.trim() || !pk.connected}
                  className="mt-4 w-full rounded-pill bg-brand py-3 font-booster font-extrabold text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
                >
                  {t("pk.createRoom")}
                </button>
              </div>
            ) : (
              <div className="g-card p-5 shadow-sm">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wide text-tertiary">{t("pk.roomCode")}</span>
                  <input
                    value={joinCode}
                    onChange={e => setJoinCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder={t("pk.codePh")}
                    inputMode="numeric"
                    className="rounded-xl border border-subtle bg-app px-3 py-2.5 text-center text-lg font-bold tracking-widest outline-none focus:border-brandborder"
                  />
                </label>
                <button
                  onClick={handleJoin}
                  disabled={joinCode.length !== 6 || !pk.connected}
                  className="mt-4 w-full rounded-pill bg-brand py-3 font-booster font-extrabold text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
                >
                  {t("pk.joinBattle")}
                </button>
                {pk.error && <p className="mt-3 text-center text-xs font-bold text-critical">{pk.error}</p>}
              </div>
            )}
          </>
        )}

        {/* LOBBY: waiting for players */}
        {pk.phase === "lobby" && (
          <div className="g-card-hero p-6 text-center shadow-sm">
            <p className="text-xs font-bold uppercase text-tertiary">{t("pk.roomCode")}</p>
            <p className="mt-2 font-booster text-5xl font-extrabold tracking-[0.2em] text-primary">{pk.roomCode}</p>
            <p className="mt-2 text-sm text-tertiary">{pk.className}</p>

            {/* Players */}
            <div className="mt-5">
              <p className="mb-2 text-xs font-bold text-secondary">{pk.players.length} {t("pk.players")}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {pk.players.map((p, i) => (
                  <span key={i} className={`rounded-pill px-3 py-1.5 text-xs font-bold ${p.role === "teacher" ? "bg-brand-subtle text-brand-text" : "bg-canvas text-secondary"}`}>
                    {p.role === "teacher" ? "👑 " : ""}{p.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Teacher controls */}
            {mode === "teacher" && (
              <button
                onClick={() => pk.roomCode && pk.startBattle(pk.roomCode)}
                disabled={pk.players.length < 2}
                className="mt-6 w-full rounded-pill bg-brand py-3.5 font-booster text-base font-extrabold text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
              >
                {pk.players.length < 2 ? t("pk.waitingPlayers") : t("pk.startBattle")}
              </button>
            )}
            {mode === "student" && (
              <p className="mt-6 text-sm text-tertiary">⏳ {t("pk.waitingTeacher")}</p>
            )}
          </div>
        )}

        {/* COUNTDOWN */}
        {pk.phase === "countdown" && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="font-booster text-8xl font-extrabold text-primary">{countdown}</p>
            <p className="mt-4 text-sm text-tertiary">{t("pk.getReady")}</p>
          </div>
        )}

        {/* PLAYING */}
        {pk.phase === "playing" && q && (
          <div className="flex flex-col gap-3">
            {/* Timer + live leaderboard */}
            <div className="g-card flex items-center justify-between p-3 shadow-sm">
              <div className="flex items-center gap-2">
                <span className={`font-booster text-xl font-extrabold ${timeLeft <= 10 ? "text-critical" : "text-primary"}`}>
                  ⏱ {timeLeft}{t("pk.sec")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {pk.leaderboard.slice(0, 3).map((p, i) => (
                  <span key={i} className={`text-xs font-bold ${i === 0 ? "text-gold" : "text-tertiary"}`}>
                    {i + 1}. {p.name} ({p.score})
                  </span>
                ))}
              </div>
            </div>

            {/* Question */}
            <div className="g-card-hero p-6 text-center shadow-sm">
              <p className="text-xs font-bold uppercase text-tertiary mb-2">Q{qIdx + 1}/{pk.questions.length}</p>
              <p className="font-booster text-3xl font-extrabold text-primary">{q.prompt}</p>
            </div>

            {/* Choices */}
            <div className="flex flex-col gap-2">
              {q.choices.map((c, i) => {
                const isSel = selected === i;
                const isCor = i === q.correctIndex;
                let cls = "flex w-full items-center gap-3 rounded-2xl border-2 border-subtle bg-surface px-4 py-3 text-left text-[15px] font-semibold transition";
                if (answered && isCor) cls += " border-[var(--bg-positive-emphasis-default)]";
                else if (answered && isSel) cls += " border-[var(--bg-critical-emphasis-default)]";
                else cls += " hover:border-brandborder hover:bg-canvas";
                return (
                  <button key={i} disabled={answered} onClick={() => answer(i)} className={cls}>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-canvas text-sm font-extrabold text-tertiary">{"ABCD"[i]}</span>
                    {c}
                  </button>
                );
              })}
            </div>

            {answered && qIdx < pk.questions.length - 1 && (
              <button
                onClick={nextQ}
                className="mt-2 rounded-pill bg-action py-3 font-booster font-extrabold text-white shadow-sm transition hover:bg-actionhover"
              >
                {t("pk.nextQ")}
              </button>
            )}
          </div>
        )}

        {/* ENDED: results */}
        {pk.phase === "ended" && (
          <div className="g-card-hero p-8 text-center shadow-sm">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-subtle text-4xl">🏁</span>
            <h2 className="mt-4 font-booster text-2xl font-extrabold text-primary">{t("pk.battleOver")}</h2>
            <div className="mt-4 flex flex-col gap-2">
              {pk.results.map((p, i) => (
                <div key={i} className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${i === 0 ? "border-gold bg-gold/10" : "border-subtle bg-surface"}`}>
                  <div className="flex items-center gap-3">
                    <span className="grid w-8 place-items-center font-booster text-lg font-extrabold text-tertiary">
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                    </span>
                    <span className={`text-sm font-bold ${i === 0 ? "text-gold" : "text-primary"}`}>{p.name}</span>
                  </div>
                  <span className={`font-booster text-lg font-extrabold ${i === 0 ? "text-gold" : "text-brand-text"}`}>{p.score}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <button
                onClick={() => { pk.reset(); setClassName(""); setJoinCode(""); }}
                className="rounded-pill bg-brand py-3 font-booster font-extrabold text-white shadow-sm transition hover:opacity-90"
              >
                {t("pk.newBattle")}
              </button>
              <button onClick={() => router.push("/chat")} className="text-sm font-bold text-tertiary transition hover:text-secondary">
                {t("pk.backHome")}
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
