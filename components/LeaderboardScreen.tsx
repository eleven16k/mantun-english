'use client';
import { useEffect, useState } from 'react';
import { PageHeader } from "@/components/PageHeader";
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { isLoggedIn, getMe, getClasses, getMyGroups, getClassLeaderboard, getGroupLeaderboard, getFriends } from '@/lib/api';
import { TrophyIcon, RocketIcon, AlertIcon, MedalIcon } from './SvgIcons';

/**
 * Leaderboard — calibrated to Gizmo /progress league card:
 * tier badge card (768px r16) with tier name Booster, rank line,
 * promo/demotion hint. Tab: Friends / School.
 */

// `name` holds an i18n key (lb.*) resolved via t() at render time
// P1-2：阈值与服务端 ×2 校准保持同步（0/400/1000/1800/2800/4000/5600/8000）
const LEAGUE_TIERS = [
  { name: 'lb.tier1', min: 0 },
  { name: 'lb.tier2', min: 400 },
  { name: 'lb.tier3', min: 1000 },
  { name: 'lb.tier4', min: 1800 },
  { name: 'lb.tier5', min: 2800 },
  { name: 'lb.tier6', min: 4000 },
  { name: 'lb.tier7', min: 5600 },
  { name: 'lb.tier8', min: 8000 },
] as const;

function getTierIndex(sp: number): number {
  let idx = 0;
  LEAGUE_TIERS.forEach((t, i) => { if (sp >= t.min) idx = i; });
  return idx;
}

export default function LeaderboardScreen() {
  const router = useRouter();
  const { scorePoints, startQuiz } = useGameStore();
  const { t } = useI18n();
  const [tab, setTab] = useState<'friends' | 'school'>('friends');

  // Real classmates/groupmates (school tab) + real friends (friends tab)
  const [schoolPlayers, setSchoolPlayers] = useState<{ name: string; sp: number; isMe: boolean }[] | null>(null);
  const [friendPlayers, setFriendPlayers] = useState<{ name: string; sp: number; isMe: boolean }[] | null>(null);

  useEffect(() => {
    let alive = true;
    if (!isLoggedIn()) return;
    (async () => {
      try {
        const me = await getMe();
        const myNickname = me.user.nickname;
        const myId = me.user.id;
        const people = new Map<string, number>();
        const [classes, groups] = await Promise.all([
          getClasses().then((c) => [...c.teaching, ...c.joined]).catch(() => []),
          getMyGroups().then((g) => g.groups).catch(() => []),
        ]);
        await Promise.all([
          ...classes.map((c) =>
            getClassLeaderboard(c.code)
              .then((lb) => lb.members.forEach((m) => people.set(m.nickname, m.score_points ?? 0)))
              .catch(() => {})
          ),
          ...groups.map((g) =>
            getGroupLeaderboard(g.code)
              .then((lb) => lb.members.forEach((m) => people.set(m.nickname, m.score_points ?? 0)))
              .catch(() => {})
          ),
        ]);
        if (!alive) return;
        const list = [...people.entries()].map(([name, sp]) => ({
          name,
          sp: name === myNickname ? scorePoints : sp,
          isMe: name === myNickname,
        }));
        // Always include me, even before joining any class/group
        if (!list.some((p) => p.isMe)) list.push({ name: myNickname, sp: scorePoints, isMe: true });
        setSchoolPlayers(list.sort((a, b) => b.sp - a.sp));

        // Real friends list
        const friends = (await getFriends().catch(() => ({ friends: [] }))).friends ?? [];
        const flist = friends.map((f) => ({
          name: f.nickname,
          sp: f.score_points ?? 0,
          isMe: f.id === myId,
        }));
        setFriendPlayers([
          { name: myNickname, sp: scorePoints, isMe: true },
          ...flist.filter((f) => !f.isMe),
        ].sort((a, b) => b.sp - a.sp));
      } catch {
        if (alive) setSchoolPlayers(null);
      }
    })();
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scorePoints]);

  // Real friends (friends tab); null while loading / offline
  const activePlayers =
    tab === 'school'
      ? (schoolPlayers ?? [{ name: 'Me', sp: scorePoints, isMe: true }])
      : (friendPlayers ?? [{ name: 'Me', sp: scorePoints, isMe: true }]);
  const myRank = activePlayers.findIndex(p => p.isMe) + 1;

  // 段位 = 服务端 league 语义（本周提分值驱动，周重置）——P0 口径统一
  const weekSP = useGameStore((s) => s.weekSP);
  const tierIdx = getTierIndex(weekSP);
  const tier = LEAGUE_TIERS[tierIdx];
  const nextTier = LEAGUE_TIERS[Math.min(tierIdx + 1, LEAGUE_TIERS.length - 1)];
  const isMax = tierIdx >= LEAGUE_TIERS.length - 1;
  const tierProgress = isMax ? 1 : Math.min(1, (weekSP - tier.min) / (nextTier.min - tier.min));


  return (
    <div className="page-shell">
      <PageHeader badge="🏆 LEAGUE" title={t("lb.title")} />

      {/* Reset banner */}
      <div className="mb-4 flex items-center justify-center gap-1.5 rounded-pill border border-subtle bg-surface px-3 py-1.5 text-[11px] font-semibold text-tertiary">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        {t('lb.resetBanner')}
      </div>

      {/* Tier card — 768px r16 white */}
      <section className="relative overflow-hidden g-card p-6 mb-5">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[rgba(77,150,255,0.10)]"
          style={{ background: 'var(--bg-brand-emphasis-default)' }}
          aria-hidden
        />
        <div className="relative flex flex-col items-center text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-brand-subtle text-brand-text"><TrophyIcon size={36} /></div>
          <h2 className="mt-3 font-booster text-2xl font-extrabold text-primary">{t(tier.name)}</h2>
          <p className="mt-1 text-sm text-tertiary">{t('lb.rankPrefix')}{myRank} · {activePlayers.length} {t('lb.weekPlayers')}</p>

          {/* tier progress */}
          <div className="mt-4 flex items-center gap-2 rounded-pill bg-canvas px-4 py-2 w-full max-w-xs">
            <span className="font-booster text-lg font-extrabold text-primary">{scorePoints}</span>
            <span className="text-xs text-tertiary">/ {isMax ? '∞' : nextTier.min} {t('lb.spUnit')}</span>
            <div className="flex-1 h-2 overflow-hidden rounded-pill bg-surface ml-2">
              <div className="h-full rounded-pill bg-brand transition-all" style={{ width: `${tierProgress * 100}%` }} />
            </div>
          </div>

          {/* promo/demotion hint */}
          <p className={`mt-3 text-xs font-semibold ${myRank <= 2 ? 'text-positive' : myRank >= activePlayers.length - 1 ? 'text-critical' : 'text-tertiary'}`}>
            {myRank <= 2 ? <><RocketIcon size={14} className="inline" /> {t('lb.promoZone')}</> : myRank >= activePlayers.length - 1 ? <><AlertIcon size={14} className="inline" /> {t('lb.demoZone')}</> : t('lb.zoneHint')}
          </p>

          {/* tier ladder */}
          <div className="mt-4 flex w-full justify-between gap-1">
            {LEAGUE_TIERS.map((tierItem, i) => (
              <div
                key={tierItem.name}
                className={`flex min-w-[48px] flex-1 flex-col items-center gap-1 rounded-2xl border px-1 py-2 ${
                  i === tierIdx ? 'border-brandborder bg-brand-subtle' : i < tierIdx ? 'border-subtle bg-surface' : 'border-subtle bg-surface opacity-60'
                }`}
              >
                <span className={`text-[10px] font-bold ${i === tierIdx ? 'text-brand-text' : 'text-tertiary'}`}>{t(tierItem.name)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Friends / School tabs */}
      <div className="g-card mb-3">
        <div className="flex rounded-t-card overflow-hidden">
          {(['friends', 'school'] as const).map(tb => (
            <button
              key={tb}
              onClick={() => setTab(tb)}
              className={`flex-1 py-3 text-sm font-bold transition ${tab === tb ? 'bg-surface text-primary' : 'bg-canvas text-tertiary'}`}
            >
              {tb === 'friends' ? t('lb.friends') : t('lb.school')}
            </button>
          ))}
        </div>
        <ul className="p-3 flex flex-col gap-1.5">
          {tab === 'school' && schoolPlayers === null && (
            <li className="py-3 text-center text-xs text-tertiary">{t('lb.loadingSchool')}</li>
          )}
          {tab === 'friends' && friendPlayers !== null && friendPlayers.length <= 1 && (
            <li className="py-3 text-center text-xs text-tertiary">{t('lb.noFriends')}</li>
          )}
          {activePlayers.map((p, i) => (
            <li
              key={p.name + i}
              className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 ${p.isMe ? 'border-brandborder' : 'border-subtle'} bg-surface`}
            >
              <span className="grid w-8 shrink-0 place-items-center font-booster text-sm font-extrabold text-tertiary">
                {i < 3 ? <MedalIcon size={22} color={['#facc15','#cbd5e1','#d97706'][i]} /> : i + 1}
              </span>
              <span className={`grid h-9 w-9 place-items-center rounded-full text-sm font-extrabold text-white ${p.isMe ? 'bg-brand' : 'bg-tertiary'}`}>
                {p.name[0]}
              </span>
              <span className={`flex-1 text-sm font-bold ${p.isMe ? 'text-primary' : 'text-secondary'}`}>{p.name}</span>
              <span className="text-sm font-booster font-extrabold text-primary">{p.sp} {t('lb.spUnit')}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => router.push('/quiz')}
        className="w-full rounded-pill bg-action py-3.5 font-booster text-base font-extrabold text-white transition-all hover:bg-actionhover active:scale-[0.98]"
      >
        {t('lb.playAgain')}
      </button>
    </div>
  );
}
