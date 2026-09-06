'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { useI18n } from '@/lib/i18n';
import { CoinIcon, CheckIcon } from './icons';
import { LightbulbIcon, MoonIcon, WrenchIcon, SnowflakeIcon, HeartFilledIcon } from './SvgIcons';

/**
 * Shop — calibrated to real Gizmo /shop layout:
 * "Features" section (Dark Mode) + "Power ups" 2×2 grid of 378×220 r16 cards.
 * Section labels Inter-Bold 16; buy links Inter-Bold 14 #0f172a.
 */

interface ShopItem {
  id: string;
  nameKey: 'shop.item.hint.name' | 'shop.item.superHeart.name' | 'shop.item.streakFreeze.name' | 'shop.item.streakRepair.name' | 'shop.item.darkMode.name';
  descKey: 'shop.item.hint.desc' | 'shop.item.superHeart.desc' | 'shop.item.streakFreeze.desc' | 'shop.item.streakRepair.desc' | 'shop.item.darkMode.desc';
  price: number;
  icon: string;
  color: string;
}

const POWERUPS: ShopItem[] = [
  { id: 'hint', nameKey: 'shop.item.hint.name', descKey: 'shop.item.hint.desc', price: 10, icon: 'lightbulb', color: '#ca8a04' },
  { id: 'super-heart', nameKey: 'shop.item.superHeart.name', descKey: 'shop.item.superHeart.desc', price: 20, icon: 'heart', color: '#2563eb' },
  { id: 'streak-freeze', nameKey: 'shop.item.streakFreeze.name', descKey: 'shop.item.streakFreeze.desc', price: 30, icon: 'snowflake', color: '#6fa8a0' },
  { id: 'streak-repair', nameKey: 'shop.item.streakRepair.name', descKey: 'shop.item.streakRepair.desc', price: 50, icon: 'wrench', color: '#ea580c' },
];

const FEATURES: ShopItem[] = [
  { id: 'dark-mode', nameKey: 'shop.item.darkMode.name', descKey: 'shop.item.darkMode.desc', price: 75, icon: 'moon', color: '#4d96ff' },
];

export default function ShopScreen() {
  const router = useRouter();
  const { coins, hintsOwned, superHeartsOwned, streakFreezesOwned, buyPowerUp } = useGameStore();
  const { t } = useI18n();
  const [purchased, setPurchased] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const ownedMap: Record<string, number> = {
    hint: hintsOwned,
    'super-heart': superHeartsOwned,
    'streak-freeze': streakFreezesOwned,
  };

  const handleBuy = (id: string, price: number) => {
    const ok = buyPowerUp(id);
    if (ok) {
      setPurchased(id);
      setTimeout(() => setPurchased(null), 1500);
    } else {
      setError(t('shop.errorNoCoins'));
      setTimeout(() => setError(null), 2000);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[768px] px-6 pt-[84px] pb-6">
      <h1 className="pt-1 font-booster text-[26px] font-extrabold leading-[32px] text-primary mb-5">{t('shop.title')}</h1>

      {/* coin balance pill */}
      <div className="mb-6 flex items-center justify-center">
        <div className="flex items-center gap-2 rounded-pill bg-surface px-5 py-2.5 shadow-sm">
          <CoinIcon size={22} className="text-gold" />
          <span className="font-booster text-2xl font-extrabold text-gold">{mounted ? coins : '—'}</span>
        </div>
      </div>

      {error && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-critical text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg animate-bounce-in">
          {error}
        </div>
      )}

      {/* Features section */}
      <h3 className="text-[16px] font-bold leading-[24px] text-primary mb-3">{t('shop.features')}</h3>
      <div className="mb-6">
        {FEATURES.map(item => (
          <ShopCard key={item.id} item={item} owned={0} coins={coins} purchased={purchased===item.id} onBuy={handleBuy} />
        ))}
      </div>

      {/* Power ups section — 2×2 grid of 378×220 cards */}
      <h3 className="text-[16px] font-bold leading-[24px] text-primary mb-3">{t('shop.powerUps')}</h3>
      <div className="grid grid-cols-2 gap-4">
        {POWERUPS.map(item => (
          <ShopCard key={item.id} item={item} owned={ownedMap[item.id] || 0} coins={coins} purchased={purchased===item.id} onBuy={handleBuy} />
        ))}
      </div>

      {/* coin tips */}
      <div className="mt-6 g-card p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <LightbulbIcon size={18} className="text-gold" />
          <span className="text-sm font-bold text-primary">{t('shop.tips')}</span>
        </div>
        <ul className="text-xs text-tertiary space-y-1">
          <li>• {t('shop.tip1')}</li>
          <li>• {t('shop.tip2')}</li>
          <li>• {t('shop.tip3')}</li>
        </ul>
      </div>
    </div>
  );
}

function ShopItemIcon({ icon }: { icon: string }) {
  const map: Record<string, React.ReactNode> = {
    lightbulb: <LightbulbIcon size={26} />,
    heart: <HeartFilledIcon size={26} />,
    snowflake: <SnowflakeIcon size={26} />,
    wrench: <WrenchIcon size={26} />,
    moon: <MoonIcon size={26} />,
  };
  return map[icon] ?? <LightbulbIcon size={26} />;
}

/** Single shop card — 378×220 white r16 (measured). */
function ShopCard({ item, owned, coins, purchased, onBuy }: {
  item: ShopItem; owned: number; coins: number; purchased: boolean;
  onBuy: (id: string, price: number) => void;
}) {
  const { t } = useI18n();
  const canAfford = coins >= item.price;
  return (
    <div className="g-card shadow-sm flex flex-col p-5 min-h-[220px]">
      <div className="flex items-start justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: item.color + '22', color: item.color }}>
          <ShopItemIcon icon={item.icon} />
        </span>
        {owned > 0 && (
          <span className="text-2xl font-booster font-extrabold text-primary">{owned}</span>
        )}
      </div>
      <div className="mt-3 flex-1">
        <p className="font-booster text-lg font-extrabold text-primary">{t(item.nameKey)}</p>
        <p className="text-xs text-tertiary leading-snug mt-1">{t(item.descKey)}</p>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-sm font-bold text-tertiary">{canAfford ? `¥ ${item.price}` : t('shop.noCoins')}</span>
        <button
          onClick={() => onBuy(item.id, item.price)}
          disabled={!canAfford || purchased}
          className={`text-[14px] font-bold transition ${
            purchased ? 'text-positive' : canAfford ? 'text-primary hover:text-brand-text' : 'text-tertiary'
          }`}
        >
          {purchased ? <span className="flex items-center gap-1"><CheckIcon size={14} /> {t('shop.bought')}</span> : t('shop.buy')}
        </button>
      </div>
    </div>
  );
}
