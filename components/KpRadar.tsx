"use client";

import { useEffect, useState } from "react";
import { getKpProfile, type KpProfile, type KpRadarAxis } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

/**
 * 五维能力雷达（阶段2，判断层 kp_profile 的展示端）。
 * 未覆盖维度（value=null）不画分、轴标签置灰——「没测过」不等于「零分」。
 * 无痕 SVG 五边形，不引图表库。
 */
const SIZE = 260;
const C = SIZE / 2;
const R = 92;

function axisPoint(i: number, ratio: number): [number, number] {
  const angle = (-90 + (360 / 5) * i) * (Math.PI / 180);
  return [C + R * ratio * Math.cos(angle), C + R * ratio * Math.sin(angle)];
}

export function KpRadarCard() {
  const { locale } = useI18n();
  const [profile, setProfile] = useState<KpProfile | null>(null);
  const [loaded, setLoaded] = useState(false);
  const zh = locale === "zh";

  useEffect(() => {
    getKpProfile()
      .then(setProfile)
      .catch(() => setProfile(null))
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || !profile || profile.evidenceTotal === 0) return null; // 无画像数据时整卡隐藏（攒证据中）

  const radar = profile.radar;
  const poly = radar.map((a: KpRadarAxis, i: number) => axisPoint(i, a.value ?? 0).join(",")).join(" ");
  const rings = [0.33, 0.66, 1];

  return (
    <section className="g-card mb-5 p-5">
      <div className="mb-2 flex items-baseline justify-between">
        <p className="text-xs font-bold uppercase tracking-wide text-tertiary">{zh ? "能力画像" : "Ability Radar"}</p>
        <p className="text-[10px] text-tertiary">{zh ? "基于错因诊断 · 持续更新" : "from error diagnosis · updates as you learn"}</p>
      </div>
      <div className="flex items-center justify-center">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-64 w-64" role="img" aria-label={zh ? "五维能力雷达" : "ability radar"}>
          {rings.map((r) => (
            <polygon
              key={r}
              points={radar.map((_: KpRadarAxis, i: number) => axisPoint(i, r).join(",")).join(" ")}
              className="fill-none stroke-subtle"
              strokeWidth={1}
            />
          ))}
          {radar.map((_: KpRadarAxis, i: number) => {
            const [x, y] = axisPoint(i, 1);
            return <line key={i} x1={C} y1={C} x2={x} y2={y} className="stroke-subtle" strokeWidth={1} />;
          })}
          <polygon points={poly} className="fill-brand/20 stroke-brand" strokeWidth={2} strokeLinejoin="round" />
          {radar.map((a: KpRadarAxis, i: number) => {
            const [x, y] = axisPoint(i, a.value ?? 0);
            return <circle key={a.key} cx={x} cy={y} r={3} className={a.value == null ? "fill-tertiary" : "fill-brand"} />;
          })}
          {radar.map((a: KpRadarAxis, i: number) => {
            const [x, y] = axisPoint(i, 1.24);
            const has = a.value != null;
            return (
              <text
                key={a.key}
                x={x}
                y={y}
                textAnchor={Math.abs(x - C) < 12 ? "middle" : x > C ? "start" : "end"}
                dominantBaseline="middle"
                className={has ? "fill-secondary" : "fill-tertiary"}
                fontSize={11}
                fontWeight={700}
              >
                {(zh ? a.labelZh : a.labelEn) + (has ? "" : " ··")}
              </text>
            );
          })}
        </svg>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
        {radar.filter((a) => a.value != null).map((a) => (
          <span key={a.key} className="text-[11px] font-bold text-secondary">
            {zh ? a.labelZh : a.labelEn} <span className="text-brand-text">{Math.round((a.value ?? 0) * 100)}</span>
            <span className="font-normal text-tertiary">/{a.kpCount}kp</span>
          </span>
        ))}
      </div>
    </section>
  );
}
