/**
 * Cross-platform key-value storage seam.
 * Web: transparently delegates to localStorage (behavior unchanged).
 * React Native host: injects an adapter via setKv() at boot, before any
 * consumer (zustand persist / api token / i18n locale) reads.
 *
 * IMPORTANT: adapters must return synchronously after boot — preload
 * AsyncStorage into an in-memory map first, then setKv. Consumers like
 * api.ts getToken() and i18n read kv.getItem() synchronously.
 */

export interface Kv {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
}

let injected: Kv | null = null;

export function setKv(impl: Kv) {
  injected = impl;
}

const memory = new Map<string, string>();

function webStorage(): Kv | null {
  try {
    if (typeof localStorage !== "undefined") return localStorage;
  } catch {
    // blocked or unavailable
  }
  return null;
}

export const kv: Kv = {
  getItem(key) {
    if (injected) return injected.getItem(key);
    const ls = webStorage();
    if (ls) return ls.getItem(key);
    return memory.get(key) ?? null;
  },
  setItem(key, value) {
    if (injected) return injected.setItem(key, value);
    const ls = webStorage();
    if (ls) return ls.setItem(key, value);
    memory.set(key, value);
  },
  removeItem(key) {
    if (injected) return injected.removeItem(key);
    const ls = webStorage();
    if (ls) return ls.removeItem(key);
    memory.delete(key);
  },
};
