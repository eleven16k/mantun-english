"use client";

/**
 * Lightweight i18n — locale context + dictionaries + localStorage persistence.
 * Default is English to match the initial server render (avoids hydration
 * mismatch); the saved / browser locale is applied after mount.
 */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { chatDict } from "./i18n/dicts/chat";
import { studyDict } from "./i18n/dicts/study";
import { socialDict } from "./i18n/dicts/social";
import { shopDict } from "./i18n/dicts/shop";
import { quizDict } from "./i18n/dicts/quiz";
import { scenariosDict } from "./i18n/dicts/scenarios";
import { phonicsDict } from "./i18n/dicts/phonics";
import { sentenceDict } from "./i18n/dicts/sentence";
import { readingDict } from "./i18n/dicts/reading";
import { lessonDict } from "./i18n/dicts/lesson";
import { typingDict } from "./i18n/dicts/typing";
import { kv } from "./kv";

export type Locale = "en" | "zh";

const STORAGE_KEY = "lexi-locale";

const coreEn = {
  // — Settings page —
  "settings.title": "Settings",
  "settings.account": "Account",
  "settings.phone": "Phone",
  "settings.nickname": "Nickname",
  "settings.editNickname": "Edit nickname",
  "settings.nicknameSave": "Save",
  "settings.nicknameCancel": "Cancel",
  "settings.notLoggedIn": "Not logged in",
  "settings.family": "Family",
  "settings.appearance": "Appearance",
  "settings.darkMode": "Dark mode",
  "settings.darkModeHint": "Easy on the eyes for late-night study",
  "settings.focusMode": "Focus mode",
  "settings.focusModeHint": "Hide social features while studying",
  "settings.language": "Language",
  "settings.membership": "Membership",
  "settings.subscription": "Subscription",
  "settings.memberActive": "Active",
  "settings.upgrade": "Upgrade",
  "settings.email": "Email",
  "settings.emailSave": "Save",
  "settings.emailSaved": "Saved",
  "settings.emailFail": "Could not save — check the address and try again",
  "settings.emailTaken": "This email is bound to another account",
  "settings.soundHaptics": "Sound & Haptics",
  "settings.sound": "Sound effects",
  "settings.soundHint": "Correct/wrong answer sounds",
  "settings.haptic": "Haptic feedback",
  "settings.hapticHint": "Vibrate on answer (mobile)",
  "settings.notifications": "Notifications",
  "settings.push": "Push notifications",
  "settings.streakReminders": "Streak reminders",
  "settings.streakRemindersHint": "Daily nudges to keep your streak",
  "settings.stats": "Your Stats",
  "settings.statStreak": "Streak",
  "settings.statScore": "Score",
  "settings.statCoins": "Coins",
  "settings.study": "Study",
  "settings.track": "Learning stage",
  "settings.trackLocked": "Set by your class",
  "settings.trackNote": "Progress is kept per stage; your buddy comes along",
  "settings.dailyGoal": "Daily goal",
  "settings.dailyGoalValue": "20 questions",
  "settings.difficulty": "Difficulty",
  "settings.difficultyValue": "Adaptive",
  "settings.signOut": "Sign out",
  "settings.signedOut": "Signed out",
  "settings.signedOutHint": "You've been signed out of Lexi.",
  "settings.signIn": "Sign in",
  "settings.footer": "Lexi v1.0 · English practice for Chinese students",

  // — App shell —
  "nav.home": "Home",
  "nav.progress": "Progress",
  "nav.myDecks": "My decks",
  "nav.publicDecks": "Public decks",
  "nav.vocab": "Vocabulary",
  "nav.aiHistory": "AI History",
  "nav.pk": "Class PK",
  "nav.battle": "1v1 Battle",
  "nav.class": "Class",
  "nav.groups": "Groups",
  "nav.pricing": "Membership",
  "nav.solve": "Photo Solve",
  "nav.sectionLearn": "Learn",
  "nav.sectionDecks": "Decks",
  "nav.sectionPlay": "Play",
  "nav.sectionMore": "More",
  "nav.weakness": "Weakness book",
  "nav.settings": "Settings",
  "nav.searchPh": "Search features…",
  "nav.noResults": "No matching features",
  "nav.share": "Share",
  "nav.profile": "Profile",
  "nav.study": "Study",
  "nav.import": "Upload courseware",
  "nav.streak": "Streak",
  "nav.decks": "Decks",
  "nav.league": "League",
  "nav.shop": "Shop",
} as const;

const coreZh: Record<keyof typeof coreEn, string> = {
  // — 设置页 —
  "settings.title": "设置",
  "settings.account": "账号",
  "settings.phone": "手机号",
  "settings.nickname": "昵称",
  "settings.editNickname": "修改昵称",
  "settings.nicknameSave": "保存",
  "settings.nicknameCancel": "取消",
  "settings.notLoggedIn": "未登录",
  "settings.family": "家人",
  "settings.appearance": "外观",
  "settings.darkMode": "深色模式",
  "settings.darkModeHint": "夜间学习更护眼",
  "settings.focusMode": "专注模式",
  "settings.focusModeHint": "学习时隐藏社交功能",
  "settings.language": "语言",
  "settings.membership": "会员",
  "settings.subscription": "订阅会员",
  "settings.memberActive": "生效中",
  "settings.upgrade": "立即升级",
  "settings.email": "联系邮箱",
  "settings.emailSave": "保存",
  "settings.emailSaved": "已保存",
  "settings.emailFail": "保存失败，请检查邮箱格式后重试",
  "settings.emailTaken": "该邮箱已被其他账号绑定",
  "settings.soundHaptics": "声音与震动",
  "settings.sound": "音效",
  "settings.soundHint": "答对/答错提示音",
  "settings.haptic": "震动反馈",
  "settings.hapticHint": "答题时震动（手机）",
  "settings.notifications": "通知",
  "settings.push": "推送通知",
  "settings.streakReminders": "连胜提醒",
  "settings.streakRemindersHint": "每日提醒，保持连胜不间断",
  "settings.stats": "我的数据",
  "settings.statStreak": "连胜",
  "settings.statScore": "提分",
  "settings.statCoins": "金币",
  "settings.study": "学习",
  "settings.track": "学段",
  "settings.trackLocked": "由班级设定",
  "settings.trackNote": "各学段进度独立保留，小伙伴一直跟着你",
  "settings.dailyGoal": "每日目标",
  "settings.dailyGoalValue": "20 题",
  "settings.difficulty": "难度",
  "settings.difficultyValue": "自适应",
  "settings.signOut": "退出登录",
  "settings.signedOut": "已退出登录",
  "settings.signedOutHint": "你已退出 Lexi。",
  "settings.signIn": "登录",
  "settings.footer": "Lexi v1.0 · 中国学生的英语练习",

  // — 应用外壳 —
  "nav.home": "首页",
  "nav.progress": "进度",
  "nav.myDecks": "我的卡组",
  "nav.publicDecks": "公共卡组",
  "nav.vocab": "词汇",
  "nav.aiHistory": "AI 记录",
  "nav.pk": "班级 PK",
  "nav.battle": "1v1 对战",
  "nav.class": "班级",
  "nav.groups": "小组",
  "nav.pricing": "会员",
  "nav.solve": "拍照解题",
  "nav.sectionLearn": "学习",
  "nav.sectionDecks": "卡组",
  "nav.sectionPlay": "竞技",
  "nav.sectionMore": "更多",
  "nav.weakness": "薄弱点",
  "nav.settings": "设置",
  "nav.searchPh": "搜索功能…",
  "nav.noResults": "没有匹配的功能",
  "nav.share": "分享",
  "nav.profile": "我的",
  "nav.study": "学习",
  "nav.import": "上传课件",
  "nav.streak": "连胜",
  "nav.decks": "卡组",
  "nav.league": "排行",
  "nav.shop": "商店",
};

// Page dictionaries (authored per feature group) merged with the core set
const en = {
  ...coreEn,
  ...chatDict.en,
  ...studyDict.en,
  ...socialDict.en,
  ...shopDict.en,
  ...quizDict.en,
  ...scenariosDict.en,
  ...phonicsDict.en,
  ...sentenceDict.en,
  ...readingDict.en,
  ...lessonDict.en,
  ...typingDict.en,
};

export type MessageKey = keyof typeof en;

const zh: Record<MessageKey, string> = {
  ...coreZh,
  ...chatDict.zh,
  ...studyDict.zh,
  ...socialDict.zh,
  ...shopDict.zh,
  ...quizDict.zh,
  ...scenariosDict.zh,
  ...phonicsDict.zh,
  ...sentenceDict.zh,
  ...readingDict.zh,
  ...lessonDict.zh,
  ...typingDict.zh,
};

const DICTS: Record<Locale, Record<MessageKey, string>> = { en, zh };

export const LOCALES: { value: Locale; label: string }[] = [
  { value: "zh", label: "简体中文" },
  { value: "en", label: "English" },
];

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (key) => en[key],
});

function applyDocumentLang(locale: Locale) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = kv.getItem(STORAGE_KEY) as Locale | null;
    if (saved && DICTS[saved]) {
      setLocaleState(saved);
      applyDocumentLang(saved);
    } else {
      // navigator exists on RN too but language may be undefined there
      const navLang =
        typeof navigator !== "undefined" && typeof navigator.language === "string"
          ? navigator.language
          : "";
      if (navLang.toLowerCase().startsWith("zh")) {
        setLocaleState("zh");
        applyDocumentLang("zh");
      }
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    kv.setItem(STORAGE_KEY, next);
    applyDocumentLang(next);
  }, []);

  const t = useCallback((key: MessageKey) => DICTS[locale][key] ?? en[key], [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
