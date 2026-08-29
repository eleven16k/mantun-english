import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

/**
 * Self-hosted Gizmo fonts (downloaded from cdn.gizmo.ai, see UI_SPEC §3).
 * InterVariable = body/UI; Booster-XBold = titles & big numbers.
 */
const inter = localFont({
  src: "../public/fonts/InterVariable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

const booster = localFont({
  src: "../public/fonts/booster-xbold-ss02.woff2",
  variable: "--font-booster",
  weight: "800",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lexi — English Practice",
  description: "Gamified English practice — every question counts",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f8fafc",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${booster.variable} h-full antialiased`}>
      <body className="min-h-full bg-app text-primary">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
