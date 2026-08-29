// ============================================================
// Lexi Game Store — Gizmo 5-Element Economy Engine
// Hearts / Coins / 提分值(Score Points) / Leagues / Streaks
// ============================================================
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Question, CardState, ScreenName, Weakness } from './types';
import { VOCAB, generateQuestions, generateQuestionsByType, getWordById, getDistractors } from './vocab';
import { kv } from './kv';

// ---- Spaced repetition (FSRS-style, ref DeepTutor scheduler) ----
const INTERVALS_DAYS = [0, 1, 3, 7, 14, 30, 60, 90];
const DAY_MS = 86400000;
const HEART_REGEN_MS = 30 * 60 * 1000; // 30 min per heart
const DAILY_FREE_QUESTIONS = 30;

// ---- League tiers ----
export const LEAGUE_TIERS = [
  { name: '青铜', icon: '🥉', color: '#A16207', minSP: 0 },
  { name: '白银', icon: '🥈', color: '#94A3B8', minSP: 500 },
  { name: '黄金', icon: '🥇', color: '#F59E0B', minSP: 1500 },
  { name: '铂金', icon: '💎', color: '#06B6D4', minSP: 3000 },
  { name: '翡翠', icon: '💚', color: '#10B981', minSP: 5000 },
  { name: '钻石', icon: '🔷', color: '#3B82F6', minSP: 8000 },
  { name: '大师', icon: '👑', color: '#8B5CF6', minSP: 12000 },
  { name: '王者', icon: '🏆', color: '#EC4899', minSP: 18000 },
];

export const POWERUPS = [
  { id: 'streak-repair', name: '连胜修复', icon: '🔧', desc: '恢复中断的连胜记录', price: 50, color: '#F59E0B' },
  { id: 'streak-freeze', name: '连胜冻结', icon: '❄️', desc: '冻结今日连胜，明天继续', price: 30, color: '#3B82F6' },
  { id: 'hint', name: '提示道具', icon: '💡', desc: '答题时排除两个错误选项', price: 10, color: '#FCD34D' },
  { id: 'super-heart', name: '蓝心续命', icon: '💙', desc: '红心归零时自动续命一颗', price: 20, color: '#06B6D4' },
  { id: 'score-boost', name: '提分加速', icon: '🚀', desc: '本场练习提分值 x2，持续 10 题', price: 40, color: '#8B5CF6' },
  { id: 'heart-refill', name: '体力回满', icon: '❤️', desc: '立刻恢复所有红心', price: 35, color: '#F43F5E' },
];

// Mock leaderboard data
function generateLeaderboard(mySP: number) {
  const names = ['张小明', '李思琪', '王浩然', '赵雨桐', '刘子轩', '陈欣怡', '杨宇航', '周梦琪', '吴俊杰', '郑爽', '孙佳怡', '马天宇'];
  const avatars = ['🦊', '🐼', '🐯', '🦁', '🐨', '🐸', '🐵', '🐰', '🦉', '🐧', '🦄', '🐲'];
  const players = names.map((name, i) => ({
    id: `p${i}`,
    name,
    avatar: avatars[i],
    scorePoints: Math.max(0, mySP + Math.floor((Math.random() - 0.4) * 600)),
    isMe: false,
    isClassmate: true,
  }));
  players.push({
    id: 'me',
    name: '我',
    avatar: '⭐',
    scorePoints: mySP,
    isMe: true,
    isClassmate: true,
  });
  return players.sort((a, b) => b.scorePoints - a.scorePoints);
}

function getTierIndex(sp: number) {
  let idx = 0;
  for (let i = 0; i < LEAGUE_TIERS.length; i++) {
    if (sp >= LEAGUE_TIERS[i].minSP) idx = i;
  }
  return idx;
}

// ---- User-created deck (manual or AI-imported) ----
export interface UserDeck {
  id: string;
  title: string;
  createdAt: number;
  questions: Question[];
  icon?: string;   // DeckIcon id (components/DeckIcon.tsx)
  color?: string;  // tile background
}

// ---- Store interface ----
interface GameState {
  // Economy
  hearts: number;
  maxHearts: number;
  coins: number;
  scorePoints: number;       // 提分值 (parent-facing) / XP (student-facing)
  streak: number;
  lastStudyDate: string;     // YYYY-MM-DD
  heartsDepletedAt: number | null; // when hearts hit 0, for regen timer

  // Daily limits
  dailyQuestionsAnswered: number;
  dailyDate: string;

  // Inventory
  hintsOwned: number;
  superHeartsOwned: number;
  scoreBoostsOwned: number;
  streakFreezesOwned: number;

  // Quiz session
  questions: Question[];

  // DeepTutor KB the current quiz came from (enables RAG-cited tutor answers)
  quizKbName: string | null;

  // Membership (synced from /api/me — members bypass the daily free limit)
  isMember: boolean;

  currentQIndex: number;
  sessionCorrect: number;
  sessionWrong: number;
  sessionNewWords: number;
  sessionCoinsEarned: number;
  sessionSPEarned: number;
  sessionStartTime: number;
  selectedAnswer: number | null;
  showFeedback: boolean;
  scoreBoostActive: boolean;
  scoreBoostCount: number;

  // Card states (spaced repetition)
  cardStates: Record<string, CardState>;

  // User-created decks (manual + AI-imported)
  userDecks: UserDeck[];

  // Built-in starter decks the user deleted (deck.titleKey values)
  hiddenBuiltinDecks: string[];

  // Weakness book:知识点 → { wrongCount, correctStreak, lastQuestion, lastPrompt }
  weaknesses: Record<string, Weakness>;


  // Navigation
  currentScreen: ScreenName;
  lastResults: {
    correct: number;
    total: number;
    coinsEarned: number;
    spEarned: number;
    newWords: number;
    accuracy: number;
    durationSec: number;
    estimatedScoreDelta: number;
  } | null;

  // Actions
  startQuiz: (count?: number, type?: Question['type']) => void;
  addUserDeck: (title: string, questions: Question[], icon?: string, color?: string) => void;
  removeUserDeck: (id: string) => void;
  removeBuiltinDeck: (key: string) => void;
  addCardToDeck: (deckTitle: string, question: Question) => void;
  loadImportedQuiz: (questions: Question[], kbName?: string) => void;
  answerQuestion: (choiceIndex: number) => void;
  nextQuestion: () => void;
  endQuiz: () => void;
  navigate: (screen: ScreenName) => void;
  buyPowerUp: (id: string) => boolean;
  useHint: () => boolean;
  useScoreBoost: () => void;
  refillHearts: () => void;
  tickRegen: () => void;
  canAnswerMore: () => boolean;
  getWeaknesses: () => Weakness[];
  startWeaknessDrill: () => void;
}

const todayStr = () => new Date().toISOString().slice(0, 10);

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // ---- Initial state ----
      hearts: 5,
      maxHearts: 5,
      coins: 120,
      scorePoints: 0,
      streak: 0,
      lastStudyDate: '',
      heartsDepletedAt: null,
      isMember: false,
  quizKbName: null,

      dailyQuestionsAnswered: 0,
      dailyDate: todayStr(),

      hintsOwned: 1,
      superHeartsOwned: 0,
      scoreBoostsOwned: 0,
      streakFreezesOwned: 0,

      questions: [],
      currentQIndex: 0,
      sessionCorrect: 0,
      sessionWrong: 0,
      sessionNewWords: 0,
      sessionCoinsEarned: 0,
      sessionSPEarned: 0,
      sessionStartTime: 0,
      selectedAnswer: null,
      showFeedback: false,
      scoreBoostActive: false,
      scoreBoostCount: 0,

      cardStates: {},
      userDecks: [],
      hiddenBuiltinDecks: [],

      currentScreen: 'dashboard',
      weaknesses: {},
      lastResults: null,

      // ---- Actions ----
      addUserDeck: (title, questions, icon, color) => {
        const state = get();
        const deck: UserDeck = {
          id: `deck-${Date.now()}`,
          title: title.trim() || '未命名卡组',
          createdAt: Date.now(),
          questions,
          icon,
          color,
        };
        set({ userDecks: [deck, ...state.userDecks] });
      },

      removeUserDeck: (id) => {
        set({ userDecks: get().userDecks.filter((d) => d.id !== id) });
      },

      removeBuiltinDeck: (key) => {
        const hidden = get().hiddenBuiltinDecks;
        if (!hidden.includes(key)) set({ hiddenBuiltinDecks: [...hidden, key] });
      },

      // Append a single card to a titled deck, creating the deck if missing
      addCardToDeck: (deckTitle, question) => {
        const decks = get().userDecks;
        const idx = decks.findIndex((d) => d.title === deckTitle);
        if (idx === -1) {
          get().addUserDeck(deckTitle, [question], 'pencil', '#f59e0b');
          return;
        }
        const next = [...decks];
        next[idx] = { ...next[idx], questions: [...next[idx].questions, question] };
        set({ userDecks: next });
      },

      startQuiz: (count = 10, type) => {
        const { dailyDate, dailyQuestionsAnswered } = get();
        const td = todayStr();
        const dq = dailyDate === td ? dailyQuestionsAnswered : 0;
        if (dq >= DAILY_FREE_QUESTIONS && get().hearts <= 0) {
          // Can still start if they have hearts
        }
        const questions = type ? generateQuestionsByType(count, type) : generateQuestions(count);
        set({
          questions,
          currentQIndex: 0,
          sessionCorrect: 0,
          sessionWrong: 0,
          sessionNewWords: 0,
          sessionCoinsEarned: 0,
          sessionSPEarned: 0,
          sessionStartTime: Date.now(),
          selectedAnswer: null,
          showFeedback: false,
          scoreBoostActive: false,
          scoreBoostCount: 0,
          currentScreen: 'quiz',
          dailyDate: td,
        });
      },

      loadImportedQuiz: (questions: Question[], kbName?: string) => {
        const { dailyDate, dailyQuestionsAnswered } = get();
        const td = todayStr();
        const dq = dailyDate === td ? dailyQuestionsAnswered : 0;
        set({
          questions,
          quizKbName: kbName ?? null,
          currentQIndex: 0,
          sessionCorrect: 0,
          sessionWrong: 0,
          sessionNewWords: 0,
          sessionCoinsEarned: 0,
          sessionSPEarned: 0,
          sessionStartTime: Date.now(),
          selectedAnswer: null,
          showFeedback: false,
          scoreBoostActive: false,
          scoreBoostCount: 0,
          currentScreen: 'quiz',
          dailyDate: td,
        });
      },

      answerQuestion: (choiceIndex: number) => {
        const state = get();
        if (state.showFeedback) return;
        const q = state.questions[state.currentQIndex];
        if (!q) return;
        const isCorrect = choiceIndex === q.correctIndex;
        const word = getWordById(q.wordId);
        const wasNew = word && !state.cardStates[q.wordId];

        let coinsEarned = 0;
        let spEarned = 0;
        let newHearts = state.hearts;

        if (isCorrect) {
          // Coins: only for new words/first mastery
          if (wasNew) {
            coinsEarned = word!.difficulty >= 3 ? 10 : word!.difficulty === 2 ? 8 : 5;
          }
          // 提分值: new mastery = big, review = small
          if (wasNew) {
            spEarned = word!.difficulty >= 3 ? 40 : word!.difficulty === 2 ? 30 : 20;
          } else {
            spEarned = 10;
          }
          // Score boost multiplier
          if (state.scoreBoostActive) {
            spEarned = Math.floor(spEarned * 2);
          }
        } else {
          // Lose a heart (only after daily free questions exhausted)
          const dq = state.dailyDate === todayStr() ? state.dailyQuestionsAnswered : 0;
          if (dq >= DAILY_FREE_QUESTIONS) {
            newHearts = Math.max(0, state.hearts - 1);
            // Check super heart
            if (newHearts === 0 && state.superHeartsOwned > 0) {
              newHearts = 1;
              coinsEarned = 0;
              set({ superHeartsOwned: state.superHeartsOwned - 1 });
            }
          }
          spEarned = 0;
        }

        // Update card state (spaced repetition)
        const cs = { ...(state.cardStates[q.wordId] || createCardState(q.wordId)) };
        if (isCorrect) {
          cs.consecutiveWrong = 0;
          cs.consecutiveCorrect++;
          if (cs.consecutiveCorrect >= 2) {
            cs.intervalIndex = Math.min(cs.intervalIndex + 2, INTERVALS_DAYS.length - 1);
            cs.consecutiveCorrect = 0;
          } else {
            cs.intervalIndex = Math.min(cs.intervalIndex + 1, INTERVALS_DAYS.length - 1);
          }
          if (cs.intervalIndex >= 4) cs.mastered = true;
        } else {
          cs.consecutiveWrong++;
          cs.consecutiveCorrect = 0;
          cs.intervalIndex = Math.max(0, cs.intervalIndex - 1);
          cs.mastered = false;
        }
        cs.nextReviewAt = Date.now() + INTERVALS_DAYS[cs.intervalIndex] * DAY_MS;
        cs.lastReviewedAt = Date.now();

        // Weakness tracking: wrong 2x → add, correct 2x → remove (+20 SP bonus)
        const weaknesses = { ...state.weaknesses };
        let weaknessBonusSP = 0;
        if (!isCorrect) {
          const w = weaknesses[q.wordId] ?? { id: q.wordId, wrongCount: 0, correctStreak: 0, lastPrompt: q.prompt, addedAt: Date.now() };
          w.wrongCount++;
          w.correctStreak = 0;
          w.lastPrompt = q.prompt;
          if (w.wrongCount >= 2) weaknesses[q.wordId] = w; // enters book at 2 wrongs
        } else {
          const w = weaknesses[q.wordId];
          if (w) {
            w.correctStreak++;
            if (w.correctStreak >= 2) {
              delete weaknesses[q.wordId]; // conquered!
              weaknessBonusSP = 20;
            }
          }
        }
        spEarned += weaknessBonusSP;

        const td = todayStr();
        const newDQ = (state.dailyDate === td ? state.dailyQuestionsAnswered : 0) + 1;

        // Streak logic
        let newStreak = state.streak;
        const lastDate = state.lastStudyDate;
        const yesterday = new Date(Date.now() - DAY_MS).toISOString().slice(0, 10);
        if (lastDate !== td) {
          if (lastDate === yesterday || lastDate === '') {
            newStreak = lastDate === '' ? 1 : newStreak + 1;
          } else if (lastDate !== yesterday && state.streakFreezesOwned > 0) {
            // Auto-use streak freeze
            newStreak = newStreak + 1;
            set({ streakFreezesOwned: state.streakFreezesOwned - 1 });
          } else {
            newStreak = 1;
          }
        }

        set({
          selectedAnswer: choiceIndex,
          showFeedback: true,
          hearts: newHearts,
          heartsDepletedAt: newHearts === 0 ? Date.now() : null,
          coins: state.coins + coinsEarned,
          scorePoints: state.scorePoints + spEarned,
          sessionCorrect: state.sessionCorrect + (isCorrect ? 1 : 0),
          sessionWrong: state.sessionWrong + (isCorrect ? 0 : 1),
          sessionNewWords: state.sessionNewWords + (wasNew && isCorrect ? 1 : 0),
          sessionCoinsEarned: state.sessionCoinsEarned + coinsEarned,
          sessionSPEarned: state.sessionSPEarned + spEarned,
          dailyQuestionsAnswered: newDQ,
          dailyDate: td,
          cardStates: { ...state.cardStates, [q.wordId]: cs },
          weaknesses,
          streak: newStreak,
          lastStudyDate: td,
          scoreBoostCount: state.scoreBoostActive ? state.scoreBoostCount + 1 : state.scoreBoostCount,
        });

        // Deactivate boost after 10 questions
        if (state.scoreBoostActive && get().scoreBoostCount >= 10) {
          set({ scoreBoostActive: false, scoreBoostCount: 0 });
        }
      },

      nextQuestion: () => {
        const state = get();
        if (state.currentQIndex + 1 >= state.questions.length) {
          // Quiz complete
          get().endQuiz();
          return;
        }
        set({
          currentQIndex: state.currentQIndex + 1,
          selectedAnswer: null,
          showFeedback: false,
        });
      },

      endQuiz: () => {
        const state = get();
        const total = state.questions.length;
        const correct = state.sessionCorrect;
        const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
        const durationSec = Math.round((Date.now() - state.sessionStartTime) / 1000);
        // Estimated score: roughly 1 SP ≈ 0.025 exam points
        const estimatedScoreDelta = Math.round(state.sessionSPEarned * 0.025 * 10) / 10;

        // Milestone coin bonus
        let bonusCoins = 0;
        const masteredCount = Object.values(state.cardStates).filter(c => c.mastered).length;
        if (masteredCount === 100 || masteredCount === 500 || masteredCount === 1000) {
          bonusCoins += 100;
        }

        set({
          lastResults: {
            correct,
            total,
            coinsEarned: state.sessionCoinsEarned + bonusCoins,
            spEarned: state.sessionSPEarned,
            newWords: state.sessionNewWords,
            accuracy,
            durationSec,
            estimatedScoreDelta,
          },
          coins: state.coins + bonusCoins,
          currentScreen: 'results',
        });
      },

      navigate: (screen: ScreenName) => set({ currentScreen: screen }),

      buyPowerUp: (id: string) => {
        const state = get();
        const item = POWERUPS.find(p => p.id === id);
        if (!item || state.coins < item.price) return false;
        const updates: Partial<GameState> = { coins: state.coins - item.price };
        switch (id) {
          case 'hint': updates.hintsOwned = state.hintsOwned + 1; break;
          case 'super-heart': updates.superHeartsOwned = state.superHeartsOwned + 1; break;
          case 'score-boost': updates.scoreBoostsOwned = state.scoreBoostsOwned + 1; break;
          case 'streak-freeze': updates.streakFreezesOwned = state.streakFreezesOwned + 1; break;
          case 'streak-repair': {
            // Restore streak to what it was + 1
            const yesterday = new Date(Date.now() - DAY_MS).toISOString().slice(0, 10);
            updates.streak = state.lastStudyDate === yesterday ? state.streak + 1 : 2;
            updates.lastStudyDate = todayStr();
            break;
          }
          case 'heart-refill': {
            updates.hearts = state.maxHearts;
            updates.heartsDepletedAt = null;
            break;
          }
        }
        set(updates as any);
        return true;
      },

      useHint: () => {
        const state = get();
        if (state.hintsOwned <= 0 || state.showFeedback) return false;
        set({ hintsOwned: state.hintsOwned - 1 });
        return true;
      },

      useScoreBoost: () => {
        const state = get();
        if (state.scoreBoostsOwned <= 0 || state.scoreBoostActive) return;
        set({ scoreBoostsOwned: state.scoreBoostsOwned - 1, scoreBoostActive: true, scoreBoostCount: 0 });
      },

      refillHearts: () => {
        const state = get();
        if (state.hearts >= state.maxHearts) return;
        // Spend coins or watch ad — for demo, free
        set({ hearts: state.maxHearts, heartsDepletedAt: null });
      },

      tickRegen: () => {
        const state = get();
        if (state.hearts >= state.maxHearts || !state.heartsDepletedAt) return;
        const elapsed = Date.now() - state.heartsDepletedAt;
        const regenerated = Math.floor(elapsed / HEART_REGEN_MS);
        if (regenerated > 0) {
          const newHearts = Math.min(state.maxHearts, state.hearts + regenerated);
          set({
            hearts: newHearts,
            heartsDepletedAt: newHearts >= state.maxHearts ? null : state.heartsDepletedAt + regenerated * HEART_REGEN_MS,
          });
        }
      },

      getWeaknesses: () => {
        return Object.values(get().weaknesses).sort((a, b) => b.wrongCount - a.wrongCount);
      },

      startWeaknessDrill: () => {
        const ws = Object.values(get().weaknesses);
        if (ws.length === 0) return;
        // Build questions from weakness entries
        const qs: Question[] = ws.slice(0, 10).map((w, i) => {
          const word = getWordById(w.id);
          return {
            id: `weak-${i}`,
            wordId: w.id,
            type: 'word-to-cn' as const,
            prompt: word ? word.en : w.lastPrompt,
            promptSub: word ? word.phonetic : 'Weakness drill',
            choices: word
              ? [word.cn, ...getDistractors(word.cn, word.difficulty)]
              : ['Review', 'Skip', 'Hint', 'Ask'],
            correctIndex: 0,
            explanation: word ? `${word.en} = ${word.cn}` : w.lastPrompt,
          };
        });
        get().loadImportedQuiz(qs);
      },

      canAnswerMore: () => {
        const state = get();
        const dq = state.dailyDate === todayStr() ? state.dailyQuestionsAnswered : 0;
        return dq < DAILY_FREE_QUESTIONS || state.hearts > 0;
      },
    }),
    {
      name: 'lexi-game-state',
      storage: createJSONStorage(() => kv),
      partialize: (state) => ({
        hearts: state.hearts,
        maxHearts: state.maxHearts,
        coins: state.coins,
        scorePoints: state.scorePoints,
        streak: state.streak,
        lastStudyDate: state.lastStudyDate,
        dailyQuestionsAnswered: state.dailyQuestionsAnswered,
        dailyDate: state.dailyDate,
        hintsOwned: state.hintsOwned,
        superHeartsOwned: state.superHeartsOwned,
        scoreBoostsOwned: state.scoreBoostsOwned,
        streakFreezesOwned: state.streakFreezesOwned,
        cardStates: state.cardStates,
        userDecks: state.userDecks,
        hiddenBuiltinDecks: state.hiddenBuiltinDecks,
      }),
    }
  )
);

function createCardState(wordId: string): CardState {
  return {
    wordId,
    intervalIndex: 0,
    consecutiveCorrect: 0,
    consecutiveWrong: 0,
    nextReviewAt: 0,
    lastReviewedAt: null,
    mastered: false,
  };
}

export { DAILY_FREE_QUESTIONS, getTierIndex, generateLeaderboard };
