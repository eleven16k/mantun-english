// ============================================================
// Lexi Type Definitions
// ============================================================

export interface VocabWord {
  id: string;
  en: string;
  cn: string;
  phonetic: string;
  type: string;
  example: string;
  exampleCn: string;
  difficulty: 1 | 2 | 3; // 1=基础, 2=中考核心, 3=拓展
}

export interface Question {
  id: string;
  wordId: string;
  type: 'word-to-cn' | 'cn-to-word' | 'fill-blank' | 'listening';
  prompt: string;
  promptSub?: string; // phonetic or hint
  choices: string[];
  correctIndex: number;
  explanation?: string;
  /** Typed answer (short-answer / fill-in questions). Present → text input UI. */
  answer?: string;
}

export interface Weakness {
  id: string;
  wrongCount: number;
  correctStreak: number;
  lastPrompt: string;
  addedAt: number;
}

export interface CardState {
  wordId: string;
  intervalIndex: number;     // 0..6
  consecutiveCorrect: number;
  consecutiveWrong: number;
  nextReviewAt: number;      // timestamp
  lastReviewedAt: number | null;
  mastered: boolean;
}

export interface PowerUp {
  id: string;
  name: string;
  icon: string;
  desc: string;
  price: number; // coins
  color: string;
}

export interface LeaguePlayer {
  id: string;
  name: string;
  avatar: string;
  scorePoints: number; // 提分值
  isMe: boolean;
  isClassmate: boolean;
}

export type ScreenName = 'dashboard' | 'quiz' | 'results' | 'shop' | 'leaderboard' | 'profile';
