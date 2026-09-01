"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

/**
 * /auth — A1: Phone + SMS code login (mock for MVP).
 * On success → /onboarding (new) or /chat (returning).
 * V7 F2: /auth?inv=CODE stashes the teacher referral code — every login
 * carries it and the server consumes it only for new student registrations.
 */

export default function AuthPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [devCode, setDevCode] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const inv = new URLSearchParams(window.location.search).get("inv");
    if (inv && /^\d{6}$/.test(inv)) {
      localStorage.setItem("lexi-invite", inv);
    }
  }, []);

  const validPhone = /^1[3-9]\d{9}$/.test(phone);
  const validCode = /^\d{6}$/.test(code);

  const sendCode = async () => {
    if (!validPhone || cooldown > 0) return;
    setError("");
    try {
      // Server generates + stores a real OTP (5-min expiry).
      // No SMS provider wired yet → dev shows the code directly.
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "send failed");
      setSent(true);
      setDevCode(data.devCode ?? "");
      setCooldown(60);
      const timer = setInterval(() => {
        setCooldown((c) => {
          if (c <= 1) { clearInterval(timer); return 0; }
          return c - 1;
        });
      }, 1000);
    } catch (e) {
      setError(e instanceof Error ? t("auth.sendFailed") : t("auth.sendFailed"));
    }
  };

  const handleLogin = async () => {
    if (!validPhone || !validCode) return;
    setLoading(true);
    setError("");
    try {
      const result = await login(phone, code);
      localStorage.removeItem("lexi-invite"); // consumed (server ignores it for existing users)
      router.push(result.isNew ? "/onboarding" : "/chat");
    } catch (e) {
      setError(e instanceof Error ? e.message : t("auth.loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-dvh flex-col bg-app text-primary">
      {/* Back */}
      <div className="flex items-center px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <button onClick={() => router.push("/chat")} className="flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-medium text-tertiary transition hover:text-secondary">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {t("auth.back")}
        </button>
      </div>

      <main className="flex flex-1 flex-col items-center justify-center px-5">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-3xl bg-brand text-white shadow-lg">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15l-4.9 2.6.9-5.5-4-3.9 5.5-.8z" />
              </svg>
            </span>
            <h1 className="font-booster text-2xl font-extrabold tracking-tight">Lexi</h1>
            <p className="text-sm text-tertiary">{t("auth.tagline")}</p>
          </div>

          {/* Phone input */}
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex items-center gap-2 rounded-2xl border border-subtle bg-surface px-4 py-3 focus-within:border-brandborder">
              <span className="text-sm font-bold text-tertiary">+86</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                placeholder={t("auth.phonePlaceholder")}
                inputMode="numeric"
                className="flex-1 bg-transparent text-[16px] outline-none placeholder:text-tertiary"
              />
            </div>

            {sent && (
              <>
              {devCode && (
                <p className="rounded-xl bg-brand-subtle px-3 py-2 text-center text-xs font-bold text-brand-text">
                  {t("auth.devCodePrefix")} {devCode}
                </p>
              )}
              <div className="flex items-center gap-2 rounded-2xl border border-subtle bg-surface px-4 py-3 focus-within:border-brandborder">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder={t("auth.codePlaceholder")}
                  inputMode="numeric"
                  className="flex-1 bg-transparent text-[16px] tracking-widest outline-none placeholder:text-tertiary"
                />
                <button
                  onClick={sendCode}
                  disabled={cooldown > 0}
                  className="text-xs font-bold text-brand-text disabled:text-tertiary"
                >
                  {cooldown > 0 ? `${cooldown}s` : t("auth.resend")}
                </button>
              </div>
              </>
            )}

            {error && <p className="text-center text-xs font-bold text-critical">{error}</p>}

            {!sent ? (
              <button
                onClick={sendCode}
                disabled={!validPhone}
                className="rounded-pill bg-action py-3 text-sm font-bold text-white shadow-sm transition hover:bg-actionhover disabled:opacity-40"
              >
                {t("auth.sendCode")}
              </button>
            ) : (
              <button
                onClick={handleLogin}
                disabled={!validCode || loading}
                className="rounded-pill bg-action py-3 text-sm font-bold text-white shadow-sm transition hover:bg-actionhover disabled:opacity-40"
              >
                {loading ? t("auth.signingIn") : t("auth.signIn")}
              </button>
            )}


          </div>
        </div>
      </main>
    </div>
  );
}
