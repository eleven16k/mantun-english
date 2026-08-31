/**
 * Runtime base-URL configuration seam.
 * Web: empty api base → relative URLs against the Next.js origin; the
 * DeepTutor sidecar host is auto-detected from window.location (phone LAN).
 * React Native host: injects the Mac's LAN address at boot / from the
 * connect screen (setApiBase + setDtBase); socket.io rides on the api base.
 *
 * Scenario voice calls ride an OpenAI Realtime-compatible WebSocket served by
 * the local speech-to-speech engine (`speech-to-speech serve` → default
 * ws://localhost:8765/v1/realtime). For phone access point it at the Mac's
 * LAN address (setS2sBase at boot, like the DeepTutor base).
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

function detectWebS2sBase(): string {
  if (process.env.NEXT_PUBLIC_S2S_URL) return process.env.NEXT_PUBLIC_S2S_URL;
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host !== "localhost" && host !== "127.0.0.1") {
      return `ws://${host}:8765/v1/realtime`;
    }
  }
  return "ws://localhost:8765/v1/realtime";
}

let api = "";
let dt = detectWebDeepTutorBase();
let s2s = detectWebS2sBase();
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

/** speech-to-speech realtime endpoint (OpenAI Realtime-compatible WS). */
export function s2sBase(): string {
  return s2s.replace(/\/+$/, "");
}

export function setS2sBase(base: string) {
  s2s = trimSlash(base);
}

/**
 * PCM sample rate the realtime server emits downstream. The local
 * `speech-to-speech serve` pipeline runs natively at 16 kHz; override via
 * NEXT_PUBLIC_S2S_OUTPUT_RATE if your server runs 24 kHz output.
 */
export function s2sOutputRate(): number {
  const n = Number(process.env.NEXT_PUBLIC_S2S_OUTPUT_RATE);
  return n === 16000 || n === 24000 ? n : 16000;
}

export function socketBase(): string {
  // Socket.IO lives on the lexi-api service (X1 三端分家). Web dev/prod point
  // NEXT_PUBLIC_SOCKET_URL at it; when unset, fall back to same-origin
  // (deployments where an ingress routes both /api and /socket.io to lexi-api).
  if (process.env.NEXT_PUBLIC_SOCKET_URL) return process.env.NEXT_PUBLIC_SOCKET_URL;
  return api;
}

export function setUnauthorizedHandler(fn: (() => void) | null) {
  onUnauthorized = fn;
}

export function unauthorizedHandler(): (() => void) | null {
  return onUnauthorized;
}
