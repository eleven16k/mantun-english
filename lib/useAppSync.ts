"use client";

/**
 * useAppSync — hydrates the zustand store from the server API on mount.
 * Called once in AppShell. If server is unreachable or user not logged in,
 * falls back to localStorage state (offline mode).
 */
import { useEffect } from "react";
import { useGameStore } from "./store";
import { getMe, isLoggedIn, getWeaknesses } from "./api";
import { mergeServerWeaknesses } from "./weakness-sync";
import { hydrateVocabFromLexicon } from "./vocab";
import { savedStage, saveStage, stageDef } from "./stage";

// 模块级时间戳：AppShell 随页面重挂载，用它在重挂载间做 30s 节流
let lastSyncAt = 0;
// persist 回水只需在本页面生命周期做一次（store 是模块级单例，跨重挂载存活）
let rehydrated = false;

export function useAppSync() {
  useEffect(() => {
    // 挂载后手动回水持久化状态（store 配了 skipHydration，避免 hydration 不匹配）
    if (!rehydrated) {
      rehydrated = true;
      void useGameStore.persist.rehydrate();
    }
    // 词库扩容：按学段角色注入题库（幂等、离线安全；游客用本地角色，登录后随 me 更新）
    {
      const def = stageDef(savedStage());
      void hydrateVocabFromLexicon({ tags: def.quizTags, difficulties: def.quizDifficulties });
    }

    // AppShell 随页面重挂载会重复触发本 effect——30 秒内不重复拉 /api/me，
    // 避免每次跳转都打一次接口（顶部数值本就一致，纯属浪费）
    if (Date.now() - lastSyncAt < 30_000) return;
    if (!isLoggedIn()) return;

    lastSyncAt = Date.now();
    // 阶段3（缺口 9）：错词本水合——服务端权威弱点并进本地 store，
    // 每日计划的 40% 弱点分量在重载后不再蒸发。失败静默（离线模式照旧）。
    getWeaknesses()
      .then(rows => {
        useGameStore.setState(st => ({ weaknesses: mergeServerWeaknesses(st.weaknesses, rows) }));
      })
      .catch(() => {});

    getMe()
      .then(data => {
        // 服务端 stage 与本地不同（他端改过）→ 按服务端角色重挂题库
        const serverStage = (data.user as { stage?: string }).stage;
        if (serverStage && serverStage !== savedStage()) {
          saveStage(serverStage as ReturnType<typeof savedStage>);
          const def = stageDef(serverStage);
          void hydrateVocabFromLexicon({ tags: def.quizTags, difficulties: def.quizDifficulties });
        }
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
          weekSP: Number(eco.week_sp ?? 0),
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
          membershipExpiresAt: data.membership?.expiresAt ?? null,
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
