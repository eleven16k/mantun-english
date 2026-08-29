"use client";

/**
 * useAppSync — hydrates the zustand store from the server API on mount.
 * Called once in AppShell. If server is unreachable or user not logged in,
 * falls back to localStorage state (offline mode).
 */
import { useEffect } from "react";
import { useGameStore } from "./store";
import { getMe, isLoggedIn } from "./api";

export function useAppSync() {
  useEffect(() => {
    if (!isLoggedIn()) return;

    getMe()
      .then(data => {
        const eco = data.economy;
        if (!eco) return;

        // Lazy heart regen (same logic as server)
        let hearts = eco.hearts as number;
        const depleted = eco.hearts_depleted_at as number | null;
        if (hearts < 5 && depleted) {
          const regenCount = Math.floor((Date.now() - depleted) / (30 * 60000));
          hearts = Math.min(5, hearts + regenCount);
        }

        useGameStore.setState({
          hearts,
          maxHearts: 5,
          coins: eco.coins as number,
          scorePoints: eco.score_points as number,
          streak: eco.streak as number,
          hintsOwned: eco.hints_owned as number,
          superHeartsOwned: eco.super_hearts_owned as number,
          scoreBoostsOwned: eco.score_boosts_owned as number,
          streakFreezesOwned: eco.streak_freezes_owned as number,
          dailyQuestionsAnswered: eco.daily_questions_answered as number,
          dailyDate: eco.daily_date as string,
          heartsDepletedAt: hearts < 5 ? depleted : null,
          lastStudyDate: eco.last_study_date as string,
          isMember: !!data.membership,
        });
      })
      .catch(err => {
        // 401 = not logged in, other = server down — both fall back to local
        if (err.message !== "Unauthorized") {
          console.warn("Server sync unavailable, using local state");
        }
      });
  }, []);
}
