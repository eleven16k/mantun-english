/**
 * Client-side API layer — talks to /api/* routes.
 * All calls include JWT token from the kv storage seam
 * (localStorage on web, AsyncStorage on React Native).
 * Base URL comes from lib/config (relative on web, absolute on RN).
 */
import type { Scenario } from "./scenarios";
import { kv } from "./kv";
import { apiBase, unauthorizedHandler } from "./config";

const TOKEN_KEY = "lexi-token";

/** 统一登录入口：营销站的 /login（可用 NEXT_PUBLIC_LOGIN_URL 覆盖）。
 *  营销站 = juyou-clone（:3000），其 /login 登录成功后携 token 跳回本端 /chat。 */
export const LOGIN_URL =
  process.env.NEXT_PUBLIC_LOGIN_URL || "http://localhost:3000/login";

function getToken(): string | null {
  return kv.getItem(TOKEN_KEY) as string | null;
}

function setToken(token: string) {
  kv.setItem(TOKEN_KEY, token);
}

function clearToken() {
  kv.removeItem(TOKEN_KEY);
}

function headers(): HeadersInit {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  const t = getToken();
  if (t) h["Authorization"] = `Bearer ${t}`;
  return h;
}

export async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${apiBase()}${url}`, { ...options, headers: headers() });
  if (res.status === 401) {
    clearToken();
    const handler = unauthorizedHandler();
    if (handler) {
      handler();
    } else if (typeof window !== "undefined") {
      location.assign(LOGIN_URL);
    }
    throw new Error("Unauthorized");
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Request failed");
  return data as T;
}

// ─── Auth ───
export async function login(phone: string, code: string, inviteCode?: string) {
  // V7 F2: the referral code rides every login — the server consumes it
  // only for NEW student registrations (F1), so storing it client-side and
  // sending it blindly is safe.
  const stored = inviteCode ?? (kv.getItem("lexi-invite") as string | null) ?? undefined;
  const data = await fetchApi<{ token: string; user: { id: number; nickname: string }; isNew: boolean }>("/api/auth", {
    method: "POST",
    body: JSON.stringify(stored ? { phone, code, inviteCode: stored } : { phone, code }),
  });
  setToken(data.token);
  // 意图已消费：无条件清掉暂存码，避免同浏览器之后的新注册误挂到旧推荐人
  // （即使本次用的是显式 inviteCode 参数，kv 里的旧码也不该留到下次注册）
  kv.removeItem("lexi-invite");
  return data;
}

export function logout() {
  clearToken();
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

// ─── User Profile ───
export interface UserProfile {
  user: {
    id: number; phone: string; email: string | null; nickname: string; track: string;
    target_score: number; exam_date: string | null; estimated_score: number;
    interests?: string[]; dailyGoal?: number | null; stage?: string | null;
  };
  economy: Record<string, number | string | null>;
  weaknessCount: number;
  masteredCount: number;
  membership: { tier: string; expiresAt: number } | null;
  pendingMemberRequest: { id: number; email: string; status: string; created_at: number } | null;
  scoreHistory: { score_points: number; estimated_score: number; recorded_at: number }[];
}

export async function getMe(): Promise<UserProfile> {
  return fetchApi("/api/me");
}

export async function updateProfile(patch: {
  nickname?: string; track?: string; targetScore?: number;
  examDate?: string; estimatedScore?: number; email?: string;
  interests?: string[]; dailyGoal?: number; stage?: string;
}) {
  return fetchApi("/api/me", { method: "PATCH", body: JSON.stringify(patch) });
}

// ─── Economy (answering questions) ───
export interface AnswerResult {
  hearts: number;
  coinsEarned: number;
  spEarned: number;
  streak: number;
  weekSP: number;
  league: string;
  enteredWeakness: boolean;
  conqueredWeakness: boolean;
  isNewWord: boolean;
}

/**
 * 判断层证据（阶段1，Jev 集成方案）：做题明细的补充字段。
 * chosen（学生所选的错误选项）是混淆方向的核心信号；全部可选、
 * 服务端独立落 answer_events，不影响任何经济/学习逻辑。
 */
export interface AnswerEvidence {
  questionType?: string;
  chosen?: string;
  correct?: string;
  timeMs?: number;
  module?: string;
}

export async function getEconomy(): Promise<Record<string, number | string | null>> {
  return fetchApi("/api/economy");
}

// ─── Typing hall (card gacha) — word card sync ───

export interface TypingCardDto {
  bookId: string;
  en: string;
  stage: number;
  wrongCount: number;
  nextReviewAt?: number;
}

export async function fetchTypingCards(bookId?: string): Promise<TypingCardDto[]> {
  const r = await fetchApi<{ cards: TypingCardDto[] }>(`/api/typing/cards${bookId ? `?book=${encodeURIComponent(bookId)}` : ""}`);
  return r.cards;
}

export async function pushTypingCard(bookId: string, en: string, step: string, wrongDelta = 0) {
  return fetchApi<{ ok: boolean; stage: number; nextReviewAt: number }>("/api/typing/cards", {
    method: "POST",
    body: JSON.stringify({ bookId, en, step, wrongDelta }),
  });
}

export async function shopPurchase(itemId: string) {
  return fetchApi<{ ok: boolean; itemId: string; price: number; economy: Record<string, number | string | null> }>(
    "/api/shop/purchase",
    { method: "POST", body: JSON.stringify({ itemId }) },
  );
}

export async function submitAnswer(
  wordId: string,
  isCorrect: boolean,
  prompt: string,
  evidence: AnswerEvidence = {},
): Promise<AnswerResult> {
  return fetchApi("/api/economy", {
    method: "POST",
    body: JSON.stringify({ wordId, isCorrect, prompt, ...evidence }),
  });
}

/**
 * 仅证据上报（不进经济结算）：给 import-N / plan- 等绕过学习闭环的题用。
 * fire-and-forget：失败静默吞掉（证据不丢就算成功，丢了也不影响游戏）。
 */
export async function reportEvidence(
  wordId: string,
  isCorrect: boolean,
  prompt: string,
  evidence: AnswerEvidence = {},
): Promise<void> {
  try {
    await fetchApi("/api/evidence", {
      method: "POST",
      body: JSON.stringify({ wordId, isCorrect, prompt, ...evidence }),
    });
  } catch {
    // 证据上报失败不影响游戏
  }
}

// ─── V8 E1 跟读评分 ───
/** 跟读录音转写（国内 ASR 降级通道）：MediaRecorder webm → 服务端 whisper → text */
export async function transcribeAudio(blob: Blob): Promise<string> {
  const form = new FormData();
  form.append("audio_file", blob, "rec.webm");
  const res = await fetchApi<{ text: string }>("/api/pronunciation/transcribe", {
    method: "POST",
    body: form,
  });
  return res.text;
}
export interface AlignedWord {
  word: string;
  verdict: "good" | "fuzzy" | "miss";
  heard?: string;
}

export interface PronunciationResult {
  words: AlignedWord[];
  /** null = 没听清（不计入画像，不惩罚） */
  stars: number | null;
}

/** ASR 在浏览器端完成；服务端只做词级对齐 + 落库。 */
export async function submitPronunciationAttempt(
  targetText: string,
  heardText: string | null,
  scenarioId?: string
): Promise<PronunciationResult> {
  return fetchApi<PronunciationResult>("/api/pronunciation/attempt", {
    method: "POST",
    body: JSON.stringify({ targetText, heardText, scenarioId }),
  });
}

// ─── V8 E2 发音画像 ───
export interface PhonemeProfile {
  ready: boolean;
  totalAttempts: number;
  tags: { tag: string; score: number; count: number }[];
  /** score 最低、最多 2 个（服务端截断） */
  weak: { tag: string; score: number; count: number }[];
}

export async function getPhonemeProfile(): Promise<PhonemeProfile> {
  return fetchApi<PhonemeProfile>("/api/pronunciation/profile");
}

// ─── V8 D1 错题讲解员 ───
export interface WeaknessExplain {
  better: string;
  why: string;
  tip: string;
  cached?: boolean;
}

export async function fetchWeaknessExplain(wordId: string): Promise<WeaknessExplain> {
  return fetchApi<WeaknessExplain>(`/api/weaknesses/${encodeURIComponent(wordId)}/explain`, { method: "POST" });
}

// ─── Weaknesses ───
export interface WeaknessItem {  word_id: string;
  wrong_count: number;
  correct_streak: number;
  last_prompt: string;
  added_at: number;
  /** 判断层诊断（阶段2）：错因存储值（如 "phoneme_pair:i_ee"）与双语标签 */
  misconception?: string | null;
  diagnosed_at?: number | null;
  misconception_label_zh?: string | null;
  misconception_label_en?: string | null;
}

export async function getWeaknesses(): Promise<WeaknessItem[]> {
  return fetchApi("/api/weaknesses");
}

// ─── 知识点画像（阶段2：进度页能力雷达） ───
export interface KpRadarAxis {
  key: string;
  labelZh: string;
  labelEn: string;
  value: number | null;
  kpCount: number;
  confidence: number;
}
export interface KpProfile {
  radar: KpRadarAxis[];
  kps: { kp_type: string; kp_id: string; mastery: number; confidence: number; evidence_count: number }[];
  evidenceTotal: number;
}

export async function getKpProfile(): Promise<KpProfile> {
  return fetchApi("/api/kp-profile");
}

export async function deleteWeakness(wordId?: string) {
  const url = wordId ? `/api/weaknesses?wordId=${wordId}` : "/api/weaknesses";
  return fetchApi(url, { method: "DELETE" });
}

/** 个性化干扰项池（阶段3）：该生对指定词「历史上选错过的释义」。 */
export async function getDistractorPools(words: string[]): Promise<Record<string, string[]>> {
  const r = await fetchApi<{ pools?: Record<string, string[]> }>("/api/quiz/distractors", {
    method: "POST",
    body: JSON.stringify({ words }),
  });
  return r?.pools ?? {};
}

// ─── Import History ───
export interface ImportItem {
  id: string;
  file_name: string;
  topic: string;
  question_type: string;
  question_count: number;
  kb_name?: string | null;
  created_at: number;
}

export async function getImports(): Promise<ImportItem[]> {
  return fetchApi("/api/imports");
}

export async function saveImport(data: {
  fileName: string; topic: string; questionType: string;
  questionCount: number; questions: unknown[]; kbName?: string;
}) {
  return fetchApi<{ id: string }>("/api/imports", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteImport(id?: string) {
  const url = id ? `/api/imports?id=${id}` : "/api/imports?all=true";
  return fetchApi(url, { method: "DELETE" });
}

// ─── Classes (thin client, V4 S1: join / my classes / read-only leaderboard) ───
export interface ClassInfo {
  code: string;
  name: string;
  id: number;
  track?: string | null;
  member_count?: number;
  teacher_name?: string;
}

export async function getClasses() {
  return fetchApi<{ teaching: ClassInfo[]; joined: ClassInfo[] }>("/api/classes");
}

export async function joinClass(code: string) {
  return fetchApi<{ ok: boolean; track?: string | null }>("/api/classes", {
    method: "POST",
    body: JSON.stringify({ action: "join", code }),
  });
}

export async function leaveClass(code: string) {
  return fetchApi("/api/classes", {
    method: "POST",
    body: JSON.stringify({ action: "leave", code }),
  });
}

export async function getClassLeaderboard(code: string) {
  return fetchApi<{ code: string; members: { id: number; nickname: string; score_points: number; streak: number }[] }>(
    `/api/classes?code=${code}`
  );
}

// ─── Assignments (V4 S2 — student thin client, read + progress only) ───
export interface AssignmentRow {
  id: number;
  title: string;
  className: string;
  targetWords: number;
  wordCount: number;
  sourceType?: string;
  phonicsUnitId?: string | null;
  dueAt: number;
  progress: number;
  status: string;
}

export interface AssignmentDetail extends Omit<AssignmentRow, "wordCount"> {
  completedAt: number | null;
  words: { word: string; meaning: string }[];
}

export async function getAssignments() {
  return fetchApi<{ assignments: AssignmentRow[] }>("/api/assignments");
}

export async function getAssignment(id: number) {
  return fetchApi<AssignmentDetail>(`/api/assignments/${id}`);
}

export async function reportAssignmentProgress(id: number, progress: number) {
  return fetchApi<{ progress: number; status: string }>(`/api/assignments/${id}/progress`, {
    method: "POST",
    body: JSON.stringify({ progress }),
  });
}

// ─── Family bindings (V4 S3 — student side: confirm / reject / unbind) ───
export interface ParentLink {
  peerId: number;
  status: "pending" | "active" | "rejected" | "removed";
  updatedAt: number | null;
  nickname: string;
  avatar: string;
  maskedPhone: string;
}

export async function getParentLinks() {
  return fetchApi<{ links: ParentLink[] }>("/api/parent-links");
}

export async function actOnParentLink(peerId: number, action: "accept" | "reject" | "remove") {
  return fetchApi<{ ok: boolean; status: string }>("/api/parent-links", {
    method: "POST",
    body: JSON.stringify({ peerId, action }),
  });
}

// ─── Org weekly ranking (V4 W3 — student view: Top10 + own rank bucket) ───
export interface OrgRanking {
  org: { name: string } | null;
  track: string;
  weekStart: string;
  top10: { rank: number; nickname: string; weekSp: number }[];
  me: { rankFrom: number; rankTo: number; weekSp: number } | null;
  pastWeeks: string[];
}

export async function getMyOrgRanking(track?: string, week?: string) {
  const params = new URLSearchParams();
  if (track) params.set("track", track);
  if (week) params.set("week", week);
  const qs = params.toString();
  return fetchApi<OrgRanking>(`/api/orgs/my/ranking${qs ? `?${qs}` : ""}`);
}

// ─── Notifications (V6 N2 — student inbox: assignment reminders) ───
export interface AppNotification {
  id: number;
  type: string;
  payload: { assignmentId?: number; title?: string; dueAt?: number; teacherName?: string };
  createdAt: number;
  readAt: number | null;
}

export async function getNotifications() {
  return fetchApi<{ notifications: AppNotification[]; unread: number }>("/api/notifications");
}

export async function markNotificationsRead(ids?: number[]) {
  return fetchApi<{ ok: boolean }>("/api/notifications", {
    method: "POST",
    body: JSON.stringify(ids ? { ids } : {}),
  });
}

// ─── Session reporting (V7 fix — sessions_log previously had no writer, so
// teacher analytics accuracy / parent summary accuracy / weekly report
// daysStudied all read zero in production) ───
export async function saveSession(results: {
  correct: number;
  total: number;
  coinsEarned: number;
  spEarned: number;
  newWords: number;
  durationSec: number;
}) {
  return fetchApi<{ ok: boolean }>("/api/sessions", {
    method: "POST",
    body: JSON.stringify(results),
  });
}

// ─── Study groups ───

export interface GroupInfo {
  id?: number;
  code: string;
  name: string;
  member_count?: number;
}

export async function getMyGroups() {
  return fetchApi<{ groups: GroupInfo[] }>("/api/groups");
}

export async function createGroup(name: string) {
  return fetchApi<GroupInfo>("/api/groups", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export async function joinGroup(code: string) {
  return fetchApi<GroupInfo>("/api/groups", {
    method: "POST",
    body: JSON.stringify({ action: "join", code }),
  });
}

export async function leaveGroup(code: string) {
  return fetchApi<{ ok: boolean }>("/api/groups", {
    method: "POST",
    body: JSON.stringify({ action: "leave", code }),
  });
}

export async function getGroupLeaderboard(code: string) {
  return fetchApi<{ code: string; members: { id: number; nickname: string; score_points: number; streak: number }[] }>(
    `/api/groups?code=${code}`
  );
}

// ─── Friends ───

export interface Friend {
  id: number;
  nickname: string;
  score_points: number | null;
  streak: number | null;
}

export async function getFriends() {
  return fetchApi<{ friends: Friend[] }>("/api/friends");
}

export async function addFriendByPhone(phone: string) {
  return fetchApi<{ ok: boolean }>("/api/friends", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
}

// ─── Scenarios (NovaWorld integration) ───

export interface NpcReply {
  npcResponse: string;
  userSuggestion: string;
}

export async function chatWithNpc(payload: {
  scenarioId: string;
  history: { role: "user" | "model"; text: string }[];
  message: string;
  level: string;
  customVocab: string[];
  locale: string;
}): Promise<NpcReply> {
  return fetchApi("/api/scenarios/chat", { method: "POST", body: JSON.stringify(payload) });
}

export async function generateScenarioVocab(scenarioId: string, level: string): Promise<{ vocab: string[]; generated: boolean }> {
  return fetchApi("/api/scenarios/vocab", {
    method: "POST",
    body: JSON.stringify({ scenarioId, level }),
  });
}

export async function scenarioTTS(text: string): Promise<{ audio: string; sampleRate: number }> {
  return fetchApi("/api/scenarios/tts", { method: "POST", body: JSON.stringify({ text }) });
}

export async function translateScenarioText(text: string): Promise<{ translation: string }> {
  return fetchApi("/api/scenarios/translate", { method: "POST", body: JSON.stringify({ text }) });
}

export async function bankScenarioReward(payload: {
  scenarioId: string;
  mode: "chat" | "call";
  turns: number;
  xp: number;
  coins: number;
  masteredWords: string[];
  transcript?: unknown[];
  /** 结算幂等键：同一局重试必须复用同一 token，服务端按它去重 */
  clientToken?: string;
}): Promise<{ coins: number; scorePoints: number; newWords: number }> {
  return fetchApi("/api/scenarios/reward", { method: "POST", body: JSON.stringify(payload) });
}

export interface WordQuestQuestion {
  word: string;
  correct: string;
  distractors: string[];
  example: string;
  exampleTranslation: string;
}

export async function generateWordQuest(level: string): Promise<{ questions: WordQuestQuestion[]; generated: boolean }> {
  return fetchApi("/api/wordquest", { method: "POST", body: JSON.stringify({ level }) });
}

// ─── Sentence Hall (AI bonus round) ───
export interface GeneratedSentence {
  en: string;
  cn: string;
}

/** AI 加练出句；AI 不可用时返回 generated:false（客户端回退内置句库） */
export async function generateSentences(
  level: "starter" | "school" | "business",
  count = 8,
): Promise<{ sentences: GeneratedSentence[]; generated: boolean }> {
  return fetchApi("/api/sentences", { method: "POST", body: JSON.stringify({ level, count }) });
}

// ─── SMS OTP ───

export async function sendSmsCode(phone: string) {
  return fetchApi<{ sent: boolean; devCode: string }>("/api/auth", {
    method: "POST",
    body: JSON.stringify({ action: "send", phone }),
  });
}

// ─── Membership（申请-审批流：提交后由管理员在 /admin 后台开通） ───

export interface MemberRequest {
  id: number;
  email: string;
  status: "pending" | "granted" | "rejected";
  created_at?: number;
  handled_at?: number | null;
}

export async function submitMemberRequest(email?: string) {
  return fetchApi<{ ok: boolean; request: MemberRequest }>("/api/member-requests", {
    method: "POST",
    body: JSON.stringify(email ? { email } : {}),
  });
}

export async function getMemberRequest(): Promise<{ request: MemberRequest | null }> {
  return fetchApi("/api/member-requests");
}

export interface ShopCatalogItem {
  id: string;
  basePrice: number;
  memberPrice: number;
  /** 当前用户（会员与否）的实际结算价 */
  price: number;
}

export async function getShopCatalog() {
  return fetchApi<{ items: ShopCatalogItem[]; member: boolean; redeem?: { coins: number; days: number } }>("/api/shop/catalog");
}

/** 金币兑换会员：扣 REDEEM_COINS 币顺延 REDEEM_DAYS 天；400 = 金币不足 */
export async function redeemMembership(): Promise<{
  ok: boolean;
  membership: { tier: string; expiresAt: number };
  coins: number;
  redeemed: { coins: number; days: number };
}> {
  return fetchApi("/api/membership/redeem", { method: "POST", body: JSON.stringify({}) });
}

export function timeLabel(at: number): string {
  const d = new Date(at);
  const sameDay = new Date().toDateString() === d.toDateString();
  return sameDay
    ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString([], { month: "short", day: "numeric" });
}

// ─── Courseware-generated scenarios ────────────────────────────────────────

export async function generateScenario(text: string, level: string): Promise<{ scenario: Scenario }> {
  return fetchApi("/api/scenarios/generate", {
    method: "POST",
    body: JSON.stringify({ text, level }),
  });
}

export async function fetchCustomScenarios(): Promise<Scenario[]> {
  const d = await fetchApi<{ scenarios: Scenario[] }>("/api/scenarios/custom", {});
  return d.scenarios ?? [];
}

export async function deleteCustomScenario(id: string): Promise<void> {
  await fetchApi(`/api/scenarios/custom?id=${encodeURIComponent(id)}`, { method: "DELETE" });
}

/** Upload a courseware file (PDF/DOCX/PPTX/TXT/MD) and get its plain text. */
export async function extractCoursewareText(file: File): Promise<{ text: string; name: string }> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${apiBase()}/api/scenarios/extract`, {
    method: "POST",
    headers: { Authorization: `Bearer ${kv.getItem("lexi-token") ?? ""}` },
    body: form,
  });
  if (!res.ok) {
    const d = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(d.error ?? `Extract failed (${res.status})`);
  }
  return res.json();
}

/** Vocabulary quiz straight from a word list (word-list images / pastes). */
export async function wordlistQuiz(
  words: string[],
  count?: number
): Promise<{ pairs: { question_id: string; question: string; question_type: string; correct_answer: string; explanation: string; options: Record<string, string> }[] }> {
  return fetchApi("/api/quiz/wordlist", {
    method: "POST",
    body: JSON.stringify({ words, count }),
  });
}
