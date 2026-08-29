/**
 * Import history — persistent record of AI-generated quizzes (B2).
 * Survives reloads via the kv storage seam. Cap 20, LRU eviction.
 */
"use client";

import { kv } from "./kv";

export interface ImportRecord {
  id: string;
  fileName: string;
  topic: string;
  questionType: string;
  questionCount: number;
  questions: { id: string; wordId: string; type: string; prompt: string; choices: string[]; correctIndex: number; explanation?: string }[];
  createdAt: number;
}

const KEY = "lexi-import-history";
const MAX = 20;

export function getHistory(): ImportRecord[] {
  try {
    return JSON.parse((kv.getItem(KEY) as string | null) ?? "[]");
  } catch { return []; }
}

export function addRecord(r: Omit<ImportRecord, "id" | "createdAt">): ImportRecord {
  const record: ImportRecord = { ...r, id: `imp-${Date.now()}`, createdAt: Date.now() };
  const history = [record, ...getHistory()].slice(0, MAX);
  kv.setItem(KEY, JSON.stringify(history));
  return record;
}

export function removeRecord(id: string) {
  kv.setItem(KEY, JSON.stringify(getHistory().filter(r => r.id !== id)));
}

export function clearHistory() {
  kv.removeItem(KEY);
}

export function timeLabel(at: number): string {
  const d = new Date(at);
  const sameDay = new Date().toDateString() === d.toDateString();
  return sameDay
    ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString([], { month: "short", day: "numeric" });
}
