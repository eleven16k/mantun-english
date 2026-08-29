"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { AppShell } from "@/components/AppShell";
import { useGameStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";

/**
 * /share — F3: Share poster. Canvas-rendered achievement card.
 */
export default function SharePage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { streak, scorePoints, coins } = useGameStore();
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const W = 750, H = 1000;
    canvasRef.current.width = W;
    canvasRef.current.height = H;

    // BG
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#7c3aed");
    grad.addColorStop(1, "#4c1d95");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Decor
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.beginPath(); ctx.arc(100, 80, 150, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(680, 900, 120, 0, Math.PI * 2); ctx.fill();

    ctx.textAlign = "center";
    // Brand
    ctx.fillStyle = "#fff";
    ctx.font = "bold 42px sans-serif";
    ctx.fillText("Lexi", W / 2, 90);
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fillText(t("share.subtitle"), W / 2, 125);

    // Streak
    ctx.fillStyle = "#fff";
    ctx.font = "bold 120px sans-serif";
    ctx.fillText(String(mounted ? streak : 0), W / 2, 330);
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText(t("share.dayStreak"), W / 2, 380);

    // Stats
    ctx.font = "bold 36px sans-serif";
    ctx.fillStyle = "#facc15";
    ctx.fillText(`${mounted ? scorePoints : 0} ${t("share.spUnit")}`, 200, 500);
    ctx.fillStyle = "#fff";
    ctx.fillText(`${mounted ? coins : 0} ${t("share.coins")}`, 550, 500);

    ctx.font = "16px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillText(t("share.scorePoints"), 200, 535);
    ctx.fillText(t("share.coins"), 550, 535);

    // Message
    ctx.font = "bold 28px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText(t("share.message"), W / 2, 650);
    ctx.font = "22px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText(t("share.joinMe"), W / 2, 690);

    // QR — real code encoding the app's sign-up page, so scanning the
    // poster on a phone opens the join flow directly
    const inviteUrl = `${window.location.origin}/auth`;
    const qr = QRCode.create(inviteUrl, { errorCorrectionLevel: "M" });
    const modules = qr.modules.size;
    const cellData = qr.modules.data;
    const qrSize = 190;
    const cell = qrSize / modules;
    const qx = (W - qrSize) / 2;
    const qy = 735;

    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.roundRect(qx - 16, qy - 16, qrSize + 32, qrSize + 32, 16);
    ctx.fill();

    ctx.fillStyle = "#1e1b4b";
    for (let row = 0; row < modules; row++) {
      for (let col = 0; col < modules; col++) {
        if (cellData[row * modules + col]) {
          ctx.fillRect(qx + col * cell, qy + row * cell, cell + 0.5, cell + 0.5);
        }
      }
    }
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillText(t("share.scan"), W / 2, qy + qrSize + 50);
  }, [mounted, streak, scorePoints, coins, t]);

  const share = async () => {
    // Export the poster as a real PNG: system share sheet on mobile,
    // file download as fallback
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/png"));
      if (!blob) throw new Error("export failed");
      const file = new File([blob], "lexi-poster.png", { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "Lexi" });
        setCopied(true);
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "lexi-poster.png";
        a.click();
        URL.revokeObjectURL(url);
        setCopied(true);
      }
    } catch {
      setCopied(true);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-md px-4 pt-[84px] pb-8 sm:px-6">
        <h1 className="pt-1 font-booster text-[26px] font-extrabold leading-[32px] text-primary mb-5">{t("share.title")}</h1>
        {/* Poster — width-driven, aspect ratio locked (canvas is 750×1000, so
            clamping height instead of width squishes it on wide screens) */}
        <div className="relative mx-auto max-w-[420px] overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
          <canvas ref={canvasRef} className="block aspect-[3/4] w-full" />
          {/* Tap hotspot over the QR card — direct entry to the join page
              (percentages map the QR card region: 264..486 × 719..941 of 750×1000) */}
          <button
            onClick={() => router.push("/auth")}
            aria-label={t("share.tapJoin")}
            className="absolute cursor-pointer rounded-2xl transition active:scale-95"
            style={{ left: "35.2%", top: "71.9%", width: "29.6%", height: "22.2%" }}
          />
        </div>
        <div className="mx-auto mt-5 flex max-w-[420px] flex-col gap-2.5">
          <button
            onClick={share}
            className="rounded-pill bg-brand py-3.5 font-booster text-base font-extrabold text-white shadow-sm transition hover:opacity-90"
          >
            {copied ? `✓ ${t("share.ready")}` : t("share.poster")}
          </button>
          <button onClick={() => router.push("/chat")} className="py-1 text-sm font-bold text-tertiary transition hover:text-secondary">
            {t("share.backHome")}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
