"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, XIcon } from "@/components/icons";

import { PageHeader } from "@/components/PageHeader";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { AppShell } from "@/components/AppShell";
import { useGameStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { LOGIN_URL } from "@/lib/api";

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
  const [linkState, setLinkState] = useState<null | "shared" | "copied" | "failed">(null);
  const linkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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
    grad.addColorStop(0, "#4d96ff");
    grad.addColorStop(1, "#1e3a8a");
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
    ctx.fillText("漫豚英语", W / 2, 90);
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

    // QR — encodes the unified marketing login page, so scanning the
    // poster on a phone opens the join flow directly
    const inviteUrl = LOGIN_URL;
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

    ctx.fillStyle = "#0f172a";
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
        await navigator.share({ files: [file], title: "漫豚英语" });
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

  const shareLink = async () => {
    // 网页登录流程下直接分享登录链接；无系统分享面板时降级为复制
    const flash = (s: "shared" | "copied" | "failed") => {
      if (linkTimer.current) clearTimeout(linkTimer.current);
      setLinkState(s);
      linkTimer.current = setTimeout(() => setLinkState(null), 2000);
    };
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: "漫豚英语", url: LOGIN_URL });
        flash("shared");
      } else {
        await navigator.clipboard.writeText(LOGIN_URL);
        flash("copied");
      }
    } catch (e) {
      // 用户关掉分享面板不算失败；剪贴板写失败要提示
      if (!(e instanceof DOMException && e.name === "AbortError")) flash("failed");
    }
  };

  return (
    <AppShell>
      <div className="page-shell">
        <PageHeader badge="INVITE" title={t("share.title")} />
        {/* Poster — width-driven, aspect ratio locked (canvas is 750×1000, so
            clamping height instead of width squishes it on wide screens) */}
        <div className="g-card-hero relative mx-auto max-w-[420px] overflow-hidden rounded-3xl">
          <canvas ref={canvasRef} className="block aspect-[3/4] w-full" />
          {/* Tap hotspot over the QR card — direct entry to the join page
              (percentages map the QR card region: 264..486 × 719..941 of 750×1000) */}
          <button
            onClick={() => window.location.assign(LOGIN_URL)}
            aria-label={t("share.tapJoin")}
            className="absolute cursor-pointer rounded-2xl transition active:scale-95"
            style={{ left: "35.2%", top: "71.9%", width: "29.6%", height: "22.2%" }}
          />
        </div>
        <div className="mx-auto mt-5 flex max-w-[420px] flex-col gap-2.5">
          <button
            onClick={share}
            className="game-btn w-full rounded-pill bg-brand py-3.5 font-booster text-base text-white"
          >
            {copied ? <span className="inline-flex items-center gap-1"><CheckIcon size={13} /> {t("share.ready")}</span> : t("share.poster")}
          </button>
          <button
            onClick={shareLink}
            className="game-btn w-full rounded-pill border border-subtle bg-surface py-3 font-booster text-base text-secondary"
          >
            {linkState === "shared"
              ? <span className="inline-flex items-center gap-1"><CheckIcon size={13} /> {t("share.ready")}</span>
              : linkState === "copied"
                ? <span className="inline-flex items-center gap-1"><CheckIcon size={13} /> {t("share.linkCopied")}</span>
                : linkState === "failed"
                  ? <span className="inline-flex items-center gap-1"><XIcon size={13} /> {t("share.linkFailed")}</span>
                  : t("share.link")}
          </button>
          <button onClick={() => router.push("/chat")} className="py-1 text-sm font-bold text-tertiary transition hover:text-secondary">
            {t("share.backHome")}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
