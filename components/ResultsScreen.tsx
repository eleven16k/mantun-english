'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGameStore, LEAGUE_TIERS, getTierIndex } from '@/lib/store';
import { reportAssignmentProgress, saveSession } from '@/lib/api';
import { PartyPopperIcon, MuscleIcon, GiftIcon } from './SvgIcons';
import { BoltIcon, CoinIcon } from './icons';
import { useI18n } from '@/lib/i18n';

export default function ResultsScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const { lastResults, scorePoints, navigate, startQuiz } = useGameStore();
  const [showConfetti, setShowConfetti] = useState(false);

  // Quiz entered from My decks returns there instead of home (?from=decks)
  const [backHref] = useState(() =>
    typeof window !== "undefined" && new URLSearchParams(window.location.search).get("from") === "decks"
      ? "/decks"
      : "/chat"
  );

  useEffect(() => {
    if (lastResults && lastResults.accuracy >= 80) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  // V7 fix — report the finished session server-side (sessions_log had no
  // writer, so analytics accuracy and weekly daysStudied read zero), and if
  // the session came from a teacher assignment also report progress (server
  // clamps and keeps the historical max), then clear the marker.
  useEffect(() => {
    const store = useGameStore.getState();
    if (lastResults) {
      saveSession({
        correct: lastResults.correct,
        total: lastResults.total,
        coinsEarned: lastResults.coinsEarned,
        spEarned: lastResults.spEarned,
        newWords: lastResults.newWords,
        durationSec: lastResults.durationSec,
      }).catch(() => { /* best-effort */ });
    }
    const asgId = store.activeAssignmentId;
    if (asgId && lastResults) {
      useGameStore.setState({ activeAssignmentId: null });
      reportAssignmentProgress(asgId, lastResults.correct).catch(() => { /* best-effort */ });
    }
  }, []);

  if (!lastResults) {
    return (
      <div className="flex items-center justify-center h-screen">
        <button onClick={() => router.push(backHref)} className="rounded-pill bg-action px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-actionhover active:scale-[0.98]">{t('res.backToHome')}</button>
      </div>
    );
  }

  const { correct, total, coinsEarned, spEarned, newWords, accuracy, durationSec, estimatedScoreDelta } = lastResults;
  const tierIdx = getTierIndex(scorePoints);
  const tier = LEAGUE_TIERS[tierIdx];

  const grade = accuracy >= 90 ? t('res.gradeExcellent') : accuracy >= 70 ? t('res.gradeWell') : accuracy >= 50 ? t('res.gradeKeep') : t('res.gradeDont');
  const gradeColor = accuracy >= 90 ? '#10B981' : accuracy >= 70 ? '#7C3AED' : accuracy >= 50 ? '#F59E0B' : '#F43F5E';
  const mins = Math.floor(durationSec / 60);
  const secs = durationSec % 60;

  return (
    <div className="flex flex-col min-h-screen px-4 pt-10 pb-6 screen-enter">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="absolute w-2 h-3 rounded-sm animate-float-up"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 30}%`,
                background: ['#7C3AED', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'][i % 5],
                animationDelay: `${Math.random() * 0.5}s`, transform: `rotate(${Math.random() * 360}deg)` }} />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6 animate-bounce-in">
        <p className="text-3xl mb-1">{accuracy >= 80 ? <PartyPopperIcon size={36} className="text-brand-text" /> : <MuscleIcon size={36} className="text-streak" />}</p>
        <h2 className="font-heading text-2xl font-extrabold" style={{ color: gradeColor }}>{grade}</h2>
        <p className="text-tertiary text-sm mt-1">{t('res.sessionComplete')}</p>
      </div>

      {/* Score circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <circle cx="50" cy="50" r="42" fill="none" stroke={gradeColor} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(accuracy / 100) * 264} 264`}
              className="transition-all duration-1000" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-5xl font-extrabold" style={{ color: gradeColor }}>{accuracy}<span className="text-2xl">%</span></span>
            <span className="text-xs font-bold text-tertiary">{t('res.accuracy')}</span>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="g-card p-5 shadow-sm !p-3 text-center">
          <p className="font-heading text-2xl font-extrabold text-positive">{correct}/{total}</p>
          <p className="text-xs text-tertiary font-bold">{t('res.correct')}</p>
        </div>
        <div className="g-card p-5 shadow-sm !p-3 text-center">
          <p className="font-heading text-2xl font-extrabold text-secondary">{mins}:{secs.toString().padStart(2, '0')}</p>
          <p className="text-xs text-tertiary font-bold">{t('res.time')}</p>
        </div>
        <div className="g-card p-5 shadow-sm !p-3 text-center">
          <p className="font-heading text-2xl font-extrabold text-amber-500">+{newWords}</p>
          <p className="text-xs text-tertiary font-bold">{t('res.newWords')}</p>
        </div>
      </div>

      {/* Rewards earned */}
      <div className="g-card p-5 shadow-sm mb-4">
        <h3 className="font-heading font-extrabold text-secondary mb-3 flex items-center gap-2">
          <GiftIcon size={18} className="text-brand-text" /> {t('res.sessionRewards')}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-brand/15 flex items-center justify-center">
                <BoltIcon size={18} className="text-brand-text" />
              </div>
              <div>
                <p className="font-bold text-primary text-sm">{t('res.score')}</p>
                <p className="text-xs text-tertiary">{t('res.estScore')} +{estimatedScoreDelta}</p>
              </div>
            </div>
            <span className="font-heading text-xl font-extrabold text-brand-text">+{spEarned}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gold/15 flex items-center justify-center">
                <CoinIcon size={18} />
              </div>
              <div>
                <p className="font-bold text-primary text-sm">{t('res.coins')}</p>
                <p className="text-xs text-tertiary">{t('res.powerUps')}</p>
              </div>
            </div>
            <span className="font-heading text-xl font-extrabold text-gold">+{coinsEarned}</span>
          </div>
        </div>
      </div>

      {/* League progress */}
      <div className="g-card p-5 shadow-sm mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{tier.icon}</span>
            <span className="font-bold text-secondary text-sm">{tier.name} {t('res.tier')}</span>
          </div>
          <span className="text-xs font-bold text-brand-text">{scorePoints.toLocaleString()} {t('res.sp')}</span>
        </div>
        <p className="text-xs text-tertiary mt-1">{t('res.rankingWeek')}</p>
      </div>

      {/* Actions */}
      <div className="space-y-3 mt-auto">
        <button onClick={() => { startQuiz(10); router.push('/quiz'); }} className="rounded-pill bg-action px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-actionhover active:scale-[0.98] w-full !py-4">
          {t('res.playAgain')}
        </button>
        <button onClick={() => router.push('/leaderboard')} className="rounded-pill border-2 border-subtle px-5 py-2.5 text-sm font-bold text-secondary transition hover:border-brandborder hover:text-primary w-full !py-3 !text-sm">
          {t('res.viewLeaderboard')}
        </button>
        <button onClick={() => router.push(backHref)} className="text-tertiary text-sm font-bold w-full text-center py-2">
          {t('res.backToHome')}
        </button>
      </div>
            <Link
          href="/share"
          className="mt-3 flex items-center justify-center gap-2 rounded-pill border-2 border-brandborder py-2.5 text-sm font-bold text-brand-text transition hover:bg-brand-subtle"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
          </svg>
          {t('res.shareResult')}
        </Link>
</div>
  );
}
