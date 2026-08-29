'use client';
import { useGameStore, DAILY_FREE_QUESTIONS } from '@/lib/store';
import { HeartIcon, CoinIcon, FlameIcon } from './icons';
import { useI18n } from '@/lib/i18n';

export default function TopBar() {
  const { t } = useI18n();
  const { hearts, maxHearts, coins, streak, dailyQuestionsAnswered, dailyDate, navigate } = useGameStore();

  const today = new Date().toISOString().slice(0, 10);
  const dq = dailyDate === today ? dailyQuestionsAnswered : 0;
  const freeRemaining = Math.max(0, DAILY_FREE_QUESTIONS - dq);

  return (
    <div className="sticky top-0 z-30 bg-surface/95 backdrop-blur-xl border-b border-subtle">
      <div className="flex items-center justify-between px-5 py-3">
        {/* Left: Hearts + daily free */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('shop')} className="flex items-center gap-1.5 group">
            <span className={`relative ${hearts === 0 ? 'animate-heartbeat' : ''}`}>
              <HeartIcon size={26} className={hearts > 0 ? 'text-rose-500' : 'text-secondary'} />
            </span>
            <span className="font-heading font-extrabold text-lg text-white">{hearts}</span>
          </button>
          <div className="flex items-center gap-1 bg-violet-500/10 rounded-pill px-2.5 py-1">
            <span className="text-[10px] font-extrabold text-violet-400 leading-none">{t('chrome.free')}</span>
            <span className="font-heading text-sm font-extrabold text-violet-300 leading-none">{freeRemaining}</span>
          </div>
        </div>

        {/* Center: Streak */}
        <button onClick={() => navigate('leaderboard')} className="flex items-center gap-1">
          <FlameIcon size={22} className={streak > 0 ? 'text-orange-500' : 'text-secondary'} />
          <span className="font-heading font-extrabold text-base text-tertiary">{streak}</span>
        </button>

        {/* Right: Coins */}
        <button onClick={() => navigate('shop')} className="flex items-center gap-1.5">
          <CoinIcon size={26} />
          <span className="font-heading font-extrabold text-lg text-amber-400">{coins}</span>
        </button>
      </div>
    </div>
  );
}
