'use client';
import { useState, useEffect } from 'react';

import { PageHeader } from "@/components/PageHeader";
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/lib/store';
import { isLoggedIn, shopPurchase, getShopCatalog, redeemMembership, type ShopCatalogItem } from '@/lib/api';
import { useI18n } from '@/lib/i18n';
import { CoinIcon, CheckIcon, CrownIcon } from './icons';
import { LightbulbIcon, MoonIcon, WrenchIcon, SnowflakeIcon, HeartFilledIcon, RocketIcon } from './SvgIcons';

/**
 * Shop — calibrated to real Gizmo /shop layout:
 * "Features" section (Dark Mode) + "Power ups" 2×N grid of 378×220 r16 cards.
 * Section labels Inter-Bold 16; buy links Inter-Bold 14 #0f172a.
 *
 * 价格来源：登录后拉 GET /api/shop/catalog（服务端唯一目录，会员自动 85 折），
 * 失败/游客回退本地兜底表——结算价永远以服务端为准。
 */

interface ShopItem {
  id: string;
  nameKey: 'shop.item.hint.name' | 'shop.item.superHeart.name' | 'shop.item.streakFreeze.name' | 'shop.item.streakRepair.name' | 'shop.item.scoreBoost.name' | 'shop.item.heartRefill.name';
  descKey: 'shop.item.hint.desc' | 'shop.item.superHeart.desc' | 'shop.item.streakFreeze.desc' | 'shop.item.streakRepair.desc' | 'shop.item.scoreBoost.desc' | 'shop.item.heartRefill.desc';
  price: number;
  /** 原价（服务端目录下发）；会员显示删除线用 */
  basePrice?: number;
  memberPrice?: number;
  icon: string;
  color: string;
}

const POWERUPS: ShopItem[] = [
  { id: 'hint', nameKey: 'shop.item.hint.name', descKey: 'shop.item.hint.desc', price: 10, icon: 'lightbulb', color: '#ca8a04' },
  { id: 'super-heart', nameKey: 'shop.item.superHeart.name', descKey: 'shop.item.superHeart.desc', price: 20, icon: 'heart', color: '#2563eb' },
  { id: 'score-boost', nameKey: 'shop.item.scoreBoost.name', descKey: 'shop.item.scoreBoost.desc', price: 40, icon: 'rocket', color: '#7c3aed' },
  { id: 'streak-freeze', nameKey: 'shop.item.streakFreeze.name', descKey: 'shop.item.streakFreeze.desc', price: 30, icon: 'snowflake', color: '#6fa8a0' },
  { id: 'streak-repair', nameKey: 'shop.item.streakRepair.name', descKey: 'shop.item.streakRepair.desc', price: 50, icon: 'wrench', color: '#ea580c' },
  { id: 'heart-refill', nameKey: 'shop.item.heartRefill.name', descKey: 'shop.item.heartRefill.desc', price: 35, icon: 'heartfill', color: '#ef4444' },
];

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "";

// 道具扣币购买开关：弹窗里显示"确认购买"扣币入口（金币结算，不涉真钱）。
// 兑换会员（redeemMembership）不受此开关影响。
const PURCHASE_ENABLED = true;
const REDEEM_FALLBACK = { coins: 700, days: 7 };

export default function ShopScreen() {
  const router = useRouter();
  const { coins, hintsOwned, superHeartsOwned, scoreBoostsOwned, streakFreezesOwned, buyPowerUp } = useGameStore();
  const { t } = useI18n();
  const [items, setItems] = useState<ShopItem[]>(POWERUPS);
  const [isMember, setIsMember] = useState(false);
  const [redeemCfg, setRedeemCfg] = useState(REDEEM_FALLBACK);
  const [redeemOpen, setRedeemOpen] = useState(false);
  const [redeemMsg, setRedeemMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [purchased, setPurchased] = useState<string | null>(null);
  const [confirmItem, setConfirmItem] = useState<ShopItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 登录用户以服务端目录为准（价格 + 完整 6 项 + 会员折后价 + 兑换比例）
  useEffect(() => {
    if (!isLoggedIn()) return;
    getShopCatalog()
      .then(({ member, items: catalog, redeem }) => {
        setIsMember(member);
        setItems(POWERUPS.map((local) => {
          const remote: ShopCatalogItem | undefined = catalog.find((c) => c.id === local.id);
          return remote ? { ...local, price: remote.price, basePrice: remote.basePrice, memberPrice: remote.memberPrice } : local;
        }));
        if (redeem) setRedeemCfg(redeem);
      })
      .catch(() => {}); // 服务端不可用 → 本地表兜底
  }, []);

  const doRedeem = () => {
    if (redeemMsg?.ok) return;
    redeemMembership()
      .then((r) => {
        useGameStore.setState({ coins: r.coins, isMember: true, membershipExpiresAt: r.membership.expiresAt });
        setIsMember(true);
        setRedeemMsg({ ok: true, text: t('shop.redeem.ok') });
      })
      .catch(() => {
        setRedeemMsg({ ok: false, text: t('shop.redeem.fail') });
      });
  };

  const ownedMap: Record<string, number> = {
    hint: hintsOwned,
    'super-heart': superHeartsOwned,
    'score-boost': scoreBoostsOwned,
    'streak-freeze': streakFreezesOwned,
  };

  const handleBuy = (id: string, price: number) => {
    // P0-1：登录态走服务端原子购买（金币/道具单一事实源）；游客保持本地单机经济
    if (isLoggedIn()) {
      shopPurchase(id)
        .then((res) => {
          const eco = res.economy;
          useGameStore.setState({
            coins: Number(eco.coins),
            hintsOwned: Number(eco.hints_owned),
            superHeartsOwned: Number(eco.super_hearts_owned),
            scoreBoostsOwned: Number(eco.score_boosts_owned),
            streakFreezesOwned: Number(eco.streak_freezes_owned),
            streak: Number(eco.streak),
            hearts: Number(eco.hearts),
          });
          setPurchased(id);
          setTimeout(() => setPurchased(null), 1500);
        })
        .catch(() => {
          setError(t('shop.errorNoCoins'));
          setTimeout(() => setError(null), 2000);
        });
      return;
    }
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
    <div className="page-shell">
      <PageHeader badge="SHOP" title={t("shop.title")} />

      {/* coin balance pill */}
      <div className="mb-6 flex items-center justify-center">
        <div className="flex items-center gap-2 rounded-pill bg-surface px-5 py-2.5">
          <CoinIcon size={22} className="text-gold" />
          <span className="font-booster text-2xl font-extrabold text-gold">{mounted ? coins : '—'}</span>
        </div>
      </div>

      {error && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-critical text-white px-5 py-2.5 rounded-full text-sm font-bold animate-bounce-in">
          {error}
        </div>
      )}

      {/* Features section retired with dark mode — re-add when a new feature item ships */}

      {/* 金币兑换会员（登录用户专属）：金币经济的主要消耗口，学习赚币→兑换会员 */}
      {mounted && isLoggedIn() && (
        <div className="g-card mb-4 flex items-center gap-4 p-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#ffd93d22] text-[#B45309]"><CrownIcon size={28} /></span>
          <div className="min-w-0 flex-1">
            <p className="font-booster text-base font-extrabold text-primary">{t('shop.redeem.name')}</p>
            <p className="text-xs text-tertiary leading-snug mt-0.5">{t('shop.redeem.desc')}</p>
            <p className="mt-1 flex items-center gap-1 text-sm font-bold text-gold">
              <CoinIcon size={15} /> {redeemCfg.coins} = {redeemCfg.days}{t('shop.redeem.daysUnit')}
            </p>
          </div>
          <button
            onClick={() => { setRedeemMsg(null); setRedeemOpen(true); }}
            className="shrink-0 game-btn bg-brand px-4 py-2 text-[13px] text-white"
          >
            {t('shop.redeem.cta')}
          </button>
        </div>
      )}

      {/* Power ups section — 2×N grid of 378×220 cards */}
      <h3 className="text-[16px] font-bold leading-[24px] text-primary mb-3">{t('shop.powerUps')}</h3>
      <div className="grid grid-cols-2 gap-4">
        {items.map(item => (
          <ShopCard key={item.id} item={item} owned={ownedMap[item.id] || 0} coins={coins} isMember={isMember} purchased={purchased===item.id} onBuy={setConfirmItem} />
        ))}
      </div>

      {/* coin tips */}
      <div className="mt-6 g-card p-4">
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

      {/* Purchase confirm — 先确认再扣币；弹窗里给出管理员联系邮箱 */}
      {confirmItem && (
        <div className="game-overlay fixed inset-0 z-50 flex items-center justify-center p-6" onClick={() => setConfirmItem(null)}>
          <div className="game-modal w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: confirmItem.color + '22', color: confirmItem.color }}>
                <ShopItemIcon icon={confirmItem.icon} />
              </span>
              <div>
                <h2 className="font-booster text-lg font-extrabold text-primary">{t('shop.purchaseTitle')}</h2>
                <p className="text-xs text-tertiary">{t(confirmItem.nameKey)}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-canvas px-4 py-3">
              <span className="flex items-center gap-1.5 text-sm font-bold text-primary">
                <CoinIcon size={18} className="text-gold" />
                {isMember && confirmItem.basePrice !== undefined && confirmItem.basePrice > confirmItem.price && (
                  <span className="line-through opacity-60">{confirmItem.basePrice}</span>
                )}
                {confirmItem.price}
              </span>
              {PURCHASE_ENABLED && <span className="text-xs text-tertiary">{t('shop.coins')}</span>}
            </div>
            {PURCHASE_ENABLED && <p className="mt-2 text-[11px] text-tertiary">{t('shop.confirmDesc')}</p>}
            <p className="mt-2 text-[11px] text-tertiary">
              {t('shop.contactAdmin')}
              {SUPPORT_EMAIL && (
                <>
                  {' '}
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="font-bold text-brand-text">{SUPPORT_EMAIL}</a>
                </>
              )}
            </p>
            <div className="mt-4 flex gap-2">
              {PURCHASE_ENABLED ? (
                <>
                  <button
                    onClick={() => setConfirmItem(null)}
                    className="flex-1 rounded-pill border border-subtle py-2.5 text-sm font-bold text-secondary transition hover:bg-canvas"
                  >
                    {t('deck.cancel')}
                  </button>
                  <button
                    onClick={() => { const item = confirmItem; setConfirmItem(null); handleBuy(item.id, item.price); }}
                    disabled={coins < confirmItem.price}
                    className={`flex-1 rounded-pill py-2.5 text-sm font-bold text-white transition ${
                      coins >= confirmItem.price ? 'bg-brand hover:opacity-90 active:scale-95' : 'pointer-events-none bg-canvas text-tertiary'
                    }`}
                  >
                    {coins >= confirmItem.price ? t('shop.confirmOk') : t('shop.noCoins')}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setConfirmItem(null)}
                  className="w-full rounded-pill bg-action py-2.5 text-sm font-bold text-white transition hover:bg-actionhover active:scale-95"
                >
                  {t('shop.gotIt')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 金币兑换会员确认弹窗 */}
      {redeemOpen && (
        <div className="game-overlay fixed inset-0 z-50 flex items-center justify-center p-6" onClick={() => setRedeemOpen(false)}>
          <div className="game-modal w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#ffd93d22] text-[#B45309]"><CrownIcon size={24} /></span>
              <div>
                <h2 className="font-booster text-lg font-extrabold text-primary">{t('shop.redeem.confirmTitle')}</h2>
                <p className="text-xs text-tertiary">{t('shop.redeem.name')}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-canvas px-4 py-3">
              <span className="flex items-center gap-1.5 text-sm font-bold text-primary">
                <CoinIcon size={18} className="text-gold" /> {redeemCfg.coins}
              </span>
              <span className="text-sm font-bold text-brand-text">→ {redeemCfg.days}{t('shop.redeem.daysUnit')}</span>
            </div>
            <p className="mt-2 text-[11px] text-tertiary">{t('shop.redeem.confirmDesc')}</p>
            {redeemMsg && (
              <p className={`mt-2 text-xs font-bold ${redeemMsg.ok ? 'text-positive' : 'text-critical'}`}>{redeemMsg.text}</p>
            )}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setRedeemOpen(false)}
                className="flex-1 rounded-pill border border-subtle py-2.5 text-sm font-bold text-secondary transition hover:bg-canvas"
              >
                {redeemMsg?.ok ? t('shop.gotIt') : t('deck.cancel')}
              </button>
              {!redeemMsg?.ok && (
                <button
                  onClick={doRedeem}
                  disabled={coins < redeemCfg.coins}
                  className={`flex-1 rounded-pill py-2.5 text-sm font-bold text-white transition ${
                    coins >= redeemCfg.coins ? 'bg-brand hover:opacity-90 active:scale-95' : 'pointer-events-none bg-canvas text-tertiary'
                  }`}
                >
                  {coins >= redeemCfg.coins ? t('shop.redeem.cta') : t('shop.noCoins')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
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
    rocket: <RocketIcon size={26} />,
    heartfill: <HeartFilledIcon size={26} />,
  };
  return map[icon] ?? <LightbulbIcon size={26} />;
}

/** Single shop card — 378×220 white r16 (measured). */
function ShopCard({ item, owned, coins, isMember, purchased, onBuy }: {
  item: ShopItem; owned: number; coins: number; isMember: boolean; purchased: boolean;
  onBuy: (item: ShopItem) => void;
}) {
  const { t } = useI18n();
  const canAfford = coins >= item.price;
  // 购买暂关（PURCHASE_ENABLED=false）时按钮永远可点——弹窗里的联系管理员
  // 邮箱是唯一入口，不能再按余额置灰拦截。
  const buyable = PURCHASE_ENABLED ? canAfford : true;
  return (
    <div className="g-card flex flex-col p-5 min-h-[220px]">
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
        <span className="text-sm font-bold text-tertiary">
          {buyable ? (
            <>
              {isMember && item.basePrice !== undefined && item.basePrice > item.price && (
                <span className="mr-1 line-through opacity-60">{item.basePrice}</span>
              )}
              ¥ {item.price}
            </>
          ) : t('shop.noCoins')}
        </span>
        <button
          onClick={() => onBuy(item)}
          disabled={!buyable || purchased}
          className={`game-btn px-3.5 py-1.5 text-[13px] ${
            purchased ? 'bg-positive text-white' : buyable ? 'bg-brand text-white' : 'pointer-events-none bg-canvas text-tertiary'
          }`}
        >
          {purchased ? <span className="flex items-center gap-1"><CheckIcon size={14} /> {t('shop.bought')}</span> : t('shop.buy')}
        </button>
      </div>
    </div>
  );
}
