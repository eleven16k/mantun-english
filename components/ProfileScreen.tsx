'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { BASE_PATH } from '@/lib/config';
import { getMe, addFriendByPhone } from '@/lib/api';
import { useI18n } from '@/lib/i18n';
import { FlameIcon } from './SvgIcons';

/**
 * Profile — calibrated to real Gizmo /profile:
 * Booster 26px name, "N followers · N following", tabs Feed/Stats/Decks/School
 * (active #0f172a / inactive #64748b, Inter-Bold 16px), 768px r16 cards.
 */

const TABS = [
  { id: 'feed', labelKey: 'profile.tab.feed' },
  { id: 'stats', labelKey: 'profile.tab.stats' },
  { id: 'decks', labelKey: 'profile.tab.decks' },
  { id: 'school', labelKey: 'profile.tab.school' },
] as const;
type Tab = (typeof TABS)[number]['id'];

/** SVG trend chart for estimated score history. */
function ScoreTrendChart({ data }: { data: { estimated_score: number; recorded_at: number }[] }) {
  const { t } = useI18n();
  if (data.length < 2) {
    return <p className="py-8 text-center text-sm text-tertiary">{t('profile.trendEmpty')}</p>;
  }
  const W = 320, H = 120, PAD = 10;
  const scores = data.map(d => d.estimated_score);
  const min = Math.min(...scores), max = Math.max(...scores);
  const range = max - min || 1;
  const points = data.map((d, i) => {
    const x = PAD + (i / (data.length - 1)) * (W - PAD * 2);
    const y = H - PAD - ((d.estimated_score - min) / range) * (H - PAD * 2);
    return `${x},${y}`;
  });
  const polyline = points.join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 140 }}>
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--bg-brand-emphasis-default)" stopOpacity="0.2" />
          <stop offset="1" stopColor="var(--bg-brand-emphasis-default)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`${PAD},${H - PAD} ${polyline} ${W - PAD},${H - PAD}`} fill="url(#trendFill)" />
      <polyline points={polyline} fill="none" stroke="var(--bg-brand-emphasis-default)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => {
        const [x, y] = points[i].split(",").map(Number);
        return <circle key={i} cx={x} cy={y} r="3" fill="var(--bg-brand-emphasis-default)" />;
      })}
      <text x={PAD} y={H - 2} fontSize="9" fill="var(--text-tertiary)">{min}</text>
      <text x={W - PAD} y={H - 2} fontSize="9" fill="var(--text-tertiary)" textAnchor="end">{max}</text>
    </svg>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { scorePoints, streak, hearts, coins } = useGameStore();
  const { locale, t } = useI18n();
  const [tab, setTab] = useState<Tab>('feed');
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendPhone, setFriendPhone] = useState('');
  const [friendMsg, setFriendMsg] = useState('');

  const addFriend = async () => {
    if (!/^1[3-9]\d{9}$/.test(friendPhone)) return;
    setFriendMsg('');
    try {
      await addFriendByPhone(friendPhone);
      setFriendMsg(t('profile.friendAdded'));
      setFriendPhone('');
      setTimeout(() => setShowAddFriend(false), 900);
    } catch (e) {
      setFriendMsg(e instanceof Error && e.message === 'user_not_found' ? t('profile.friendNotFound') : t('profile.friendAddFail'));
    }
  };
  const [scoreHistory, setScoreHistory] = useState<{ estimated_score: number; recorded_at: number }[]>([]);
  const [weaknessCount, setWeaknessCount] = useState(0);
  const [masteredCount, setMasteredCount] = useState(0);

  useEffect(() => {
    getMe()
      .then(data => {
        setScoreHistory(data.scoreHistory ?? []);
        setWeaknessCount(data.weaknessCount ?? 0);
        setMasteredCount(data.masteredCount ?? 0);
      })
      .catch(() => { });
  }, []);

  const dayLabels = locale === 'zh'
    ? ['一', '二', '三', '四', '五', '六', '日']
    : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const stats = [
    { labelKey: 'profile.stat.score', value: scorePoints, color: 'var(--text-brand-default)' },
    { labelKey: 'profile.stat.streak', value: streak, color: 'var(--text-streak-default)' },
    { labelKey: 'profile.stat.coins', value: coins, color: 'var(--text-gold-default)' },
    { labelKey: 'profile.stat.hearts', value: hearts, color: 'var(--text-hearts-default)' },
  ] as const;

  return (
    <div className="page-shell">
      {/* Name — Booster 26px (measured at (486,76)) */}
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE_PATH}/sites/assets/dolphin.png`}
          alt=""
          className="game-chunky h-16 w-16 rounded-2xl object-cover"
        />
        <div>
          <h1 className="font-booster text-[26px] font-extrabold leading-[32px] text-primary">Me</h1>
          <p className="text-sm text-tertiary">0 {t('profile.followers')} · 0 {t('profile.following')}</p>
        </div>
        <Link
          href="/settings"
          className="ml-auto grid h-9 w-9 place-items-center rounded-full text-tertiary transition hover:bg-canvas hover:text-secondary"
          aria-label={t('profile.settingsAria')}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </Link>
      </div>

      <button
        onClick={() => router.push('/quiz')}
        className="mt-4 rounded-pill bg-action px-5 py-2.5 text-sm font-bold text-white transition hover:bg-actionhover"
      >
        {t('profile.startStudying')}
      </button>

      {/* Tabs — Inter-Bold 16px, active #0f172a inactive #64748b (measured) */}
      <div className="mt-6 flex gap-6 border-b border-subtle pb-3">
        {TABS.map(tabItem => (
          <button
            key={tabItem.id}
            onClick={() => setTab(tabItem.id)}
            className={`text-[16px] font-bold transition-colors ${tab === tabItem.id ? 'text-primary' : 'text-tertiary hover:text-secondary'}`}
          >
            {t(tabItem.labelKey)}
          </button>
        ))}
      </div>

      {/* Weakness book entry */}
      <Link
        href="/weakness"
        className="mt-5 g-card flex items-center justify-between p-4 transition hover:border-brandborder"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-critical/10">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-critical" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-bold text-primary">{t('profile.weaknessBook')}</p>
            <p className="text-xs text-tertiary">{t('profile.weaknessHint')}</p>
          </div>
        </div>
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-tertiary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </Link>

      {/* Stats grid (768px r16 cards) */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(s => (
          <div key={s.labelKey} className="g-card p-4">
            <p className="font-booster text-3xl font-extrabold" style={{ color: s.color }}>
              {s.value}
            </p>
            <p className="text-xs text-tertiary mt-1">{t(s.labelKey)}</p>
          </div>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'feed' && (
        <div className="mt-5 flex flex-col gap-3">
          <div className="g-card p-5 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-subtle text-brand-text text-lg"><FlameIcon size={20} className="text-streak" /></span>
            <div>
              <p className="text-sm font-bold text-primary">{t('profile.feedStreak')}</p>
              <p className="text-xs text-tertiary">{t('profile.daysAgo')}</p>
            </div>
          </div>
          <div className="g-card p-5">
            <p className="font-booster text-base font-extrabold text-primary mb-2">{t('profile.profileFriends')}</p>
            <p className="text-sm text-tertiary">
              {t('profile.noFriends')}
              <button onClick={() => setShowAddFriend(true)} className="text-brand-text font-bold">{t('profile.findFriends')}</button>
            </p>
          </div>
          <div className="g-card p-5">
            <p className="font-booster text-base font-extrabold text-primary mb-1">{t('profile.studyGroups')}</p>
            <p className="text-sm text-tertiary mb-3">{t('profile.learn')}</p>
            <button
              onClick={() => router.push("/groups")}
              className="rounded-pill border border-subtle px-4 py-2 text-sm font-bold text-secondary transition hover:border-brandborder"
            >
              {t('profile.createGroup')}
            </button>
          </div>
        </div>
      )}

      {tab === 'stats' && (
        <div className="mt-5 flex flex-col gap-3">
          {/* Estimated score trend */}
          <div className="g-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-booster text-sm font-extrabold text-primary">{t('profile.scoreTrend')}</p>
              <div className="flex gap-2 text-xs">
                <span className="rounded-pill bg-critical/10 px-2 py-0.5 font-bold text-critical">{t('profile.weakLabel')}: {weaknessCount}</span>
                <span className="rounded-pill bg-positive/10 px-2 py-0.5 font-bold text-positive">{t('profile.masteredLabel')}: {masteredCount}</span>
              </div>
            </div>
            <ScoreTrendChart data={scoreHistory} />
          </div>
          {/* Weekly activity */}
          <div className="g-card p-5">
            <p className="font-booster text-sm font-extrabold text-primary mb-3">{t('profile.thisWeek')}</p>
            <div className="flex items-end gap-2 h-24">
              {[12, 8, 15, 0, 20, 6, 9].map((n, i) => (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className="w-full rounded-t-lg bg-brand transition-all"
                    style={{ height: `${(n / 20) * 80}px`, opacity: i === 6 ? 1 : 0.6 }}
                  />
                  <span className="text-[10px] text-tertiary">{dayLabels[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'decks' && (
        <div className="mt-5 g-card p-5">
          <p className="text-sm text-tertiary">
            {t('profile.noDecks')}<button onClick={() => router.push('/chat')} className="text-brand-text font-bold">{t('profile.createOne')}</button>
          </p>
        </div>
      )}

      {tab === 'school' && (
        <div className="mt-5 g-card p-5">
          <p className="text-sm text-tertiary">{t('profile.joinSchool')}</p>
        </div>
      )}

      {/* Add friend dialog — by phone number */}
      {showAddFriend && (
        <div className="game-overlay fixed inset-0 z-50 flex items-center justify-center p-6" onClick={() => setShowAddFriend(false)}>
          <div className="game-modal w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-booster text-lg font-extrabold text-primary">{t('profile.addFriendTitle')}</h2>
            <input
              autoFocus
              value={friendPhone}
              onChange={(e) => setFriendPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
              onKeyDown={(e) => e.key === "Enter" && addFriend()}
              placeholder={t('profile.friendPhonePh')}
              inputMode="numeric"
              className="mt-3 w-full rounded-xl border border-subtle bg-app px-3 py-2.5 text-sm text-primary outline-none placeholder:text-tertiary focus:border-brandborder"
            />
            {friendMsg && <p className="mt-2 text-xs font-bold text-positive">{friendMsg}</p>}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowAddFriend(false)}
                className="flex-1 rounded-pill border border-subtle py-2.5 text-sm font-bold text-secondary transition hover:bg-canvas"
              >
                {t('deck.cancel')}
              </button>
              <button
                onClick={addFriend}
                disabled={!/^1[3-9]\d{9}$/.test(friendPhone)}
                className="flex-1 rounded-pill bg-brand py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-40"
              >
                {t('profile.addFriendBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
