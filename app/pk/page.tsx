"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { usePKBattle } from "@/lib/usePKBattle";
import { speakWord, stopSpeech, unlockAudio } from "@/lib/phonics";
import { LOGIN_URL } from "@/lib/api";
import { isLoggedIn, getMe } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

/**
 * /pk — class PK, STUDENT side (V7 B3). Joining by room code is the only
 * lifecycle action here — hosting lives in lexi-teacher (B2) and the
 * socket layer rejects non-teachers (B1). Battle UI unchanged.
 */
export default function PKPage() {
  const router = useRouter();
  const pk = usePKBattle();
  const { t } = useI18n();

  const [joinCode, setJoinCode] = useState("");
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
    const timer = setInterval(() => {
      const left = Math.max(0, Math.ceil((pk.endsAt! - Date.now()) / 1000));
      setTimeLeft(left);
      if (left <= 0) clearInterval(timer);
    }, 500);
    return () => clearInterval(timer);
  }, [pk.phase, pk.endsAt]);

  // 拼读题源（听音辨词）：题目出现即自动播词
  useEffect(() => {
    if (pk.phase === "playing" && q?.audioWord) void speakWord(q.audioWord, 0.9);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pk.phase, qIdx]);
  useEffect(() => () => stopSpeech(), []);

  // Student joins
  const handleJoin = () => {
    if (joinCode.length !== 6 || !user) return;
    unlockAudio();
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
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(timer); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [pk.phase]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.assign(LOGIN_URL);
    }
  }, [router]);

  return (
    <AppShell>
      <div className="page-shell">
        <PageHeader badge="🏫 CLASS PK" title={t("pk.title")} />
        <p className="mb-5 text-sm text-tertiary">
          {pk.connected ? `🟢 ${t("pk.connected")}` : `🔴 ${t("pk.connecting")}`} · {t("pk.realtime")}
        </p>

        {/* IDLE: join by room code — hosting is the teacher app's job */}
        {pk.phase === "idle" && (
          <div className="g-card p-5">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-tertiary">{t("pk.roomCode")}</span>
              <input
                value={joinCode}
                onChange={e => setJoinCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder={t("pk.codePh")}
                inputMode="numeric"
                className="rounded-xl border-2 border-b-4 border-[#cbd5e1] bg-surface px-3 py-2.5 text-center text-lg font-bold tracking-widest outline-none transition focus:border-brand"
              />
            </label>
            <button
              onClick={handleJoin}
              disabled={joinCode.length !== 6 || !pk.connected || !user}
              className="mt-4 w-full rounded-pill bg-brand py-3 font-booster font-extrabold text-white transition hover:opacity-90 disabled:opacity-40"
            >
              {t("pk.joinBattle")}
            </button>
            {pk.error && <p className="mt-3 text-center text-xs font-bold text-critical">{pk.error}</p>}
            <p className="mt-3 text-center text-xs text-tertiary">{t("pk.rules")}</p>
          </div>
        )}

        {/* LOBBY: waiting for the teacher to start */}
        {pk.phase === "lobby" && (
          <div className="g-card-hero p-6 text-center">
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

            <p className="mt-6 text-sm text-tertiary">⏳ {t("pk.waitingTeacher")}</p>
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
            <div className="g-card flex items-center justify-between p-3">
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
            <div className="g-card-hero p-6 text-center">
              <p className="text-xs font-bold uppercase text-tertiary mb-2">Q{qIdx + 1}/{pk.questions.length}</p>
              {q.audioWord ? (
                <button
                  onClick={() => void speakWord(q.audioWord!, 0.9)}
                  className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-3xl text-white transition hover:opacity-90"
                  aria-label="play word"
                >
                  🔊
                </button>
              ) : (
                <p className="font-booster text-3xl font-extrabold text-primary">{q.prompt}</p>
              )}
            </div>

            {/* Choices */}
            <div className="flex flex-col gap-2">
              {q.choices.map((c, i) => {
                const isSel = selected === i;
                const isCor = i === q.correctIndex;
                let cls = "game-chip flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold";
                if (answered && isCor) cls = "game-chip game-chip--right pointer-events-none flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold";
                else if (answered && isSel) cls = "game-chip game-chip--wrong pointer-events-none flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] font-semibold";
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
                className="mt-2 rounded-pill bg-action py-3 font-booster font-extrabold text-white transition hover:bg-actionhover"
              >
                {t("pk.nextQ")}
              </button>
            )}
          </div>
        )}

        {/* ENDED: results */}
        {pk.phase === "ended" && (
          <div className="g-card-hero p-8 text-center">
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
                onClick={() => { pk.reset(); setJoinCode(""); }}
                className="rounded-pill bg-brand py-3 font-booster font-extrabold text-white transition hover:opacity-90"
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
