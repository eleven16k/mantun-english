/**
 * Runtime base-URL configuration seam.
 * Web: empty api base → relative URLs against the Next.js origin; the
 * DeepTutor sidecar host is auto-detected from window.location (phone LAN).
 * React Native host: injects the Mac's LAN address at boot / from the
 * connect screen (setApiBase + setDtBase); socket.io rides on the api base.
 */

function detectWebDeepTutorBase(): string {
  if (process.env.NEXT_PUBLIC_DEEPTUTOR_URL) return process.env.NEXT_PUBLIC_DEEPTUTOR_URL;
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host !== "localhost" && host !== "127.0.0.1") {
      return `http://${host}:18081`;
    }
  }
  return "http://localhost:18081";
}

let api = "";
let dt = detectWebDeepTutorBase();
let onUnauthorized: (() => void) | null = null;

function trimSlash(base: string) {
  return base.replace(/\/+$/, "");
}

export function apiBase(): string {
  return api;
}

export function setApiBase(base: string) {
  api = trimSlash(base);
}

export function dtBase(): string {
  return dt;
}

export function setDtBase(base: string) {
  dt = trimSlash(base);
}

export function socketBase(): string {
  return api;
}

export function setUnauthorizedHandler(fn: (() => void) | null) {
  onUnauthorized = fn;
}

export function unauthorizedHandler(): (() => void) | null {
  return onUnauthorized;
}
