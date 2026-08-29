'use client';
import { useGameStore } from '@/lib/store';
import type { ScreenName } from '@/lib/types';
import { HomeIcon, TrophyIcon, ShopIcon, UserIcon } from './icons';

/**
 * Mobile bottom nav — Gizmo tab-bar treatment (surface bg, brand active).
 * Hidden on lg+ where the 300px sidebar takes over.
 */
const TABS: { screen: ScreenName; label: string; icon: typeof HomeIcon }[] = [
  { screen: 'dashboard', label: 'Home', icon: HomeIcon },
  { screen: 'leaderboard', label: 'League', icon: TrophyIcon },
  { screen: 'shop', label: 'Shop', icon: ShopIcon },
  { screen: 'profile', label: 'Profile', icon: UserIcon },
];

export default function BottomNav() {
  const { currentScreen, navigate } = useGameStore();
  if (currentScreen === 'quiz' || currentScreen === 'results') return null;

  return (
    <div className="sticky bottom-0 z-30 border-t border-subtle bg-surface/95 backdrop-blur-xl lg:hidden">
      <div className="flex items-center justify-around px-2 py-2 pb-5">
        {TABS.map(({ screen, label, icon: Icon }) => {
          const active = currentScreen === screen;
          return (
            <button key={screen} onClick={() => navigate(screen)}
              className={`flex flex-col items-center gap-1 px-5 py-1.5 rounded-2xl transition-all ${active ? 'text-brand-text' : 'text-tertiary'}`}>
              <Icon size={26} className={active ? 'scale-110 transition-transform' : ''} />
              <span className={`text-xs font-bold ${active ? 'text-brand-text' : 'text-tertiary'}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
