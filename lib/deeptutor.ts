/**
 * DeepTutor sidecar client + question adapter.
 *
 * Flow (all against the local Docker sidecar, default http://localhost:18081):
 *   1. createKnowledgeBase(name)                  → kb registered
 *   2. uploadFiles(kb, files)                     → multipart upload, bg indexing
 *   3. pollProgress(kb)                           → until ready
 *   4. generateQuestions(kb, opts, onEvent)       → WebSocket stream → QuizPair[]
 *   5. adaptQuizPairs(pairs) → QuizQuestion[]     → feed /game
 *
 * Question type mapping (DeepTutor → gizmo-clone):
 *   choice       → choice  (options {A..D} → array, correct_answer letter → index)
 *   concept      → choice  (true/false rendered as 2 options)
 *   fill_in_blank→ typed   (correct_answer string; prompt keeps ____ token)
 *   short_answer → typed
 *   written/coding → typed (freeform; graded by match like short_answer)
 */
import { dtBase } from "./config";

const apiUrl = () => `${dtBase()}/api/v1`;

/**
 * Sidecar base URL resolves at call time via lib/config (dtBase) so the
 * React Native host can point it at the Mac's LAN IP at boot; on web the
 * default auto-detects the serving host for phone access.
 */

// QuizQuestion type adapted for lexi-app
export interface DTQuizQuestion {
  id: string;
  type: "choice" | "typed";
  prompt: string;
  options?: string[];
  answerIndex?: number;
  answer?: string;
  explanation?: string;
}
type QuizQuestion = DTQuizQuestion;

/* — knowledge bases — */

/**
 * Create a KB and upload the initial files in one multipart call
 * (the /knowledge/create endpoint requires files — it IS the upload entry).
 */
export async function createKnowledgeBase(
  name: string,
  files: File[],
): Promise<{ task_id: string }> {
  const form = new FormData();
  form.append("name", name);
  form.append("rag_provider", "llamaindex");
  for (const f of files) form.append("files", f, f.name);
  const res = await fetch(`${apiUrl()}/knowledge/create`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) {
    // creating twice → 400/409 is fine to swallow
    if (res.status !== 400 && res.status !== 409) {
      throw new Error(`create KB failed: ${res.status}`);
    }
    return { task_id: "existing" };
  }
  return res.json();
}

export async function uploadFiles(kb: string, files: File[]): Promise<{ task_id: string }> {
  const form = new FormData();
  for (const f of files) form.append("files", f, f.name);
  const res = await fetch(`${apiUrl()}/knowledge/${encodeURIComponent(kb)}/upload`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(`upload failed: ${res.status}`);
  return res.json();
}

/** Back-compat alias: create + upload in one step. */
export async function createAndUpload(kb: string, files: File[]): Promise<void> {
  await createKnowledgeBase(kb, files);
}

export interface KbProgress {
  status?: string;
  stage?: string;
  total?: number;
  processed?: number;
  current?: number;
  progress_percent?: number;
  message?: string;
}

export async function getProgress(kb: string): Promise<KbProgress> {
  const res = await fetch(`${apiUrl()}/knowledge/${encodeURIComponent(kb)}/progress`);
  if (!res.ok) throw new Error(`progress failed: ${res.status}`);
  return res.json();
}

/** Poll until the KB reports a ready state or timeout (ms). */
export async function waitUntilReady(
  kb: string,
  onTick?: (p: KbProgress) => void,
  timeoutMs = 10 * 60 * 1000,
): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    const p = await getProgress(kb);
    onTick?.(p);
    // real shape: { stage: "completed", progress_percent: 100 }
    const state = String(p.stage ?? p.status ?? "");
    if (/complet|ready|done/i.test(state)) return;
    if (Date.now() > deadline) throw new Error("indexing timed out");
    await new Promise((r) => setTimeout(r, 3000));
  }
}

/**
 * Parse the markdown question batch streamed by the quizzing stage into
 * QuizPair objects. Handles the observed DeepSeek output shape:
 *
 *   ### Question 1
 *   <prompt>
 *   - A. opt
 *   - B. opt
 *   **Answer:** B
 *   **Explanation:** ...
 *
 * Also tolerates True/False and fill-in/short-answer shapes (answer line
 * without options). Returns [] when nothing parses.
 */
export function parseQuizMarkdown(md: string): QuizPair[] {
  const pairs: QuizPair[] = [];
  // split on question headers — anchorless so mid-line headers also match
  // (streamed chunks concatenate without a newline: "...proteins.### Question 2")
  const blocks = md.split(/#{2,4}\s*Question\s*\d+\s*/).slice(1);
  for (const block of blocks) {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);

    // options: lines like "- A. text" / "A) text" / "A. text"
    const options: Record<string, string> = {};
    const optRe = /^(?:[-*]\s*)?([A-D])[.):]\s*(.+)$/;
    let promptLines: string[] = [];
    let answer = "";
    let explanationLines: string[] = [];
    let inExplanation = false;

    for (const line of lines) {
      const ansM = line.match(/^\*\*Answer:?\*\*\s*(.+)$/i) || line.match(/^Answer:\s*(.+)$/i);
      const expM = line.match(/^\*\*Explanation:?\*\*\s*(.*)$/i) || line.match(/^Explanation:\s*(.*)$/i);
      if (ansM && !answer) { answer = ansM[1].trim(); continue; }
      if (expM) { inExplanation = true; if (expM[1]) explanationLines.push(expM[1]); continue; }
      const optM = line.match(optRe);
      if (optM && !inExplanation) { options[optM[1]] = optM[2].trim(); continue; }
      if (inExplanation) explanationLines.push(line);
      else promptLines.push(line);
    }

    const prompt = promptLines.join(" ").replace(/\s+/g, " ").trim();
    if (!prompt) continue;

    const question_type = Object.keys(options).length >= 2 ? "choice" : "typed";
    pairs.push({
      question_id: `gen-${pairs.length + 1}`,
      question: prompt,
      question_type,
      correct_answer: answer,
      explanation: explanationLines.join(" ").replace(/\s+/g, " ").trim(),
      options: question_type === "choice" ? options : null,
    });
  }
  return pairs;
}

/* — question generation (WebSocket) — */

export interface GenerateOptions {
  kbName: string;
  topic: string;
  count: number;
  difficulty?: "easy" | "medium" | "hard";
  questionType?: "choice" | "concept" | "fill_in_blank" | "short_answer";
}

/** DeepTutor's final QuizPair shape (see agents/question/pipeline.py). */
export interface QuizPair {
  question_id: string;
  question: string;
  question_type: string;
  correct_answer: string;
  explanation: string;
  options?: Record<string, string> | null;
  topic?: string;
  difficulty?: string;
  metadata?: Record<string, unknown>;
}

export type GenEvent =
  | { type: "status"; text: string }
  | { type: "log"; text: string }
  | { type: "done"; pairs: QuizPair[] }
  | { type: "error"; message: string };

/**
 * Stream question generation over the WS endpoint. Resolves with the final
 * batch. `requirement.knowledge_point` is the topic; count per the spec.
 */
export function generateQuestions(
  opts: GenerateOptions,
  onEvent?: (e: GenEvent) => void,
): Promise<QuizPair[]> {
  return new Promise((resolve, reject) => {
    const wsUrl = dtBase().replace(/^http/, "ws") + "/api/v1/question/generate";
    const ws = new WebSocket(wsUrl);

    let quizMd = "";
    let settled = false;
    const finish = (fn: () => void) => {
      if (!settled) {
        settled = true;
        try { ws.close(); } catch { /* noop */ }
        fn();
      }
    };

    ws.onopen = () => {
      onEvent?.({ type: "status", text: "connected" });
      ws.send(
        JSON.stringify({
          requirement: {
            knowledge_point: opts.topic,
            preference: opts.difficulty ?? "medium",
            question_type: opts.questionType ?? "choice",
          },
          kb_name: opts.kbName,
          count: opts.count,
        }),
      );
    };


    ws.onmessage = (ev) => {
      let data: Record<string, unknown>;
      try { data = JSON.parse(ev.data as string); } catch { return; }
      const type = data.type as string;

      if (type === "task_id") {
        onEvent?.({ type: "status", text: `task ${data.task_id}` });
      } else if (type === "process_log" || type === "log") {
        onEvent?.({ type: "log", text: String(data.content ?? data.message ?? "") });
      } else if (type === "content" && data.stage === "quizzing") {
        // questions stream as markdown during the quizzing stage
        quizMd += String(data.content ?? "");
      } else if (type === "result" || (type === "stage_end" && data.stage === "quizzing")) {
        // final event — parse accumulated markdown into pairs.
        // (guard: only after quizzing actually streamed something, else keep
        // waiting for the result event)
        if (quizMd.trim()) {
          const parsed = parseQuizMarkdown(quizMd);
          if (parsed.length > 0) {
            onEvent?.({ type: "done", pairs: parsed });
            finish(() => resolve(parsed));
          }
        } else if (type === "result") {
          finish(() => reject(new Error("generation finished without questions")));
        }
      } else if (type === "error") {
        onEvent?.({ type: "error", message: String(data.content ?? data.message ?? "generation failed") });
        finish(() => reject(new Error(String(data.content ?? "generation failed"))));
      }
    };

    ws.onerror = () => {
      onEvent?.({ type: "error", message: "WebSocket error — is the DeepTutor sidecar running?" });
      finish(() => reject(new Error("websocket error")));
    };
    ws.onclose = () => {
      // server closed after done → already resolved; else parse what we have
      finish(() => {
        const parsed = parseQuizMarkdown(quizMd);
        if (parsed.length > 0) resolve(parsed);
        else reject(new Error("connection closed before questions arrived"));
      });
    };
  });
}

/* — adapter: QuizPair[] → gizmo-clone QuizQuestion[] — */

const LETTERS = ["A", "B", "C", "D"] as const;

/** Mobile-friendly length caps (chars) for quiz text. */
export const QUESTION_LENGTH_LIMITS = { prompt: 110, option: 50, sub: 60 } as const;

/**
 * Truncate question text at a sentence boundary when it exceeds the cap.
 * AI-generated questions can arrive arbitrarily long, which breaks the
 * phone quiz layout — this keeps them playable.
 */
export function clampQuestionText(text: string, max: number): string {
  const t = (text ?? "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastStop = Math.max(
    cut.lastIndexOf("."), cut.lastIndexOf("。"),
    cut.lastIndexOf("?"), cut.lastIndexOf("？"),
    cut.lastIndexOf("!"), cut.lastIndexOf("！"),
    cut.lastIndexOf(";"), cut.lastIndexOf("；"),
  );
  const head = lastStop > max * 0.5 ? cut.slice(0, lastStop + 1) : cut;
  return head.trimEnd() + " …";
}

export function adaptQuizPairs(pairs: QuizPair[]): QuizQuestion[] {
  return pairs.map((p, i): QuizQuestion => {
    const prompt = clampQuestionText(p.question, QUESTION_LENGTH_LIMITS.prompt);
    const explanation = p.explanation;
    const type = p.question_type;

    if (type === "choice" && p.options) {
      const keys = Object.keys(p.options).filter((k) => LETTERS.includes(k as (typeof LETTERS)[number]));
      const options = keys.map((k) => clampQuestionText(p.options![k], QUESTION_LENGTH_LIMITS.option));
      const answerIdx = keys.indexOf(p.correct_answer?.trim());
      return {
        id: p.question_id || `dt-${i}`,
        type: "choice",
        prompt,
        options,
        answerIndex: answerIdx >= 0 ? answerIdx : 0,
        explanation,
      };
    }

    if (type === "concept") {
      // true/false concept check → 2-option choice
      const ans = (p.correct_answer || "").toLowerCase().includes("t");
      return {
        id: p.question_id || `dt-${i}`,
        type: "choice",
        prompt,
        options: ["True", "False"],
        answerIndex: ans ? 0 : 1,
        explanation,
      };
    }

    // fill_in_blank / short_answer / written / coding → typed
    return {
      id: p.question_id || `dt-${i}`,
      type: "typed",
      prompt,
      answer: (p.correct_answer || "").trim(),
      explanation,
    };
  });
}

/** fetch with a timeout guard. NOTE: no abort signal is attached — any
 *  signal (AbortSignal.timeout / AbortController) empirically stalls fetches
 *  against this sidecar's Docker port mapping; the orphaned request is
 *  harmless for our small health/list payloads. */
async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), timeoutMs)
  );
  return Promise.race([fetch(url, init), timeout]);
}

/** Health probe — returns true when the sidecar is up. The sidecar stalls
 *  briefly while streaming LLM responses, so retry a couple of times. */
export async function pingDeepTutor(): Promise<boolean> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetchWithTimeout(`${apiUrl()}/knowledge/health`, {}, 4000);
      if (res.ok) return true;
    } catch { /* retry */ }
    await new Promise((r) => setTimeout(r, 600));
  }
  return false;
}

/* ─── AI answer judging (WS /question/judge) ─── */

export interface JudgeInput {
  question: string;
  questionType: string;
  correctAnswer: string;
  explanation?: string;
  userAnswer: string;
  language?: string;
}

export interface JudgeResult {
  verdict: "correct" | "partial" | "incorrect";
  feedback: string;
}

/**
 * AI semantic grading for typed (short-answer / fill-in) questions via the
 * DeepTutor judge WebSocket. Streams the critique; the first line carries the
 * verdict marker (✅ / ⚠️ / ❌). Resolves null when the sidecar is unreachable
 * so callers can fall back to string comparison.
 */
export function judgeAnswer(input: JudgeInput, timeoutMs = 20000): Promise<JudgeResult | null> {
  return new Promise((resolve) => {
    let settled = false;
    let text = "";
    const thinkFilter = createThinkFilter();
    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      try { ws.close(); } catch { /* noop */ }
      fn();
    };

    const wsUrl = dtBase().replace(/^http/, "ws") + "/api/v1/question/judge";
    const ws = new WebSocket(wsUrl);
    const timer = setTimeout(() => finish(() => resolve(null)), timeoutMs);

    ws.onopen = () => {
      ws.send(JSON.stringify({
        question: input.question,
        question_type: input.questionType,
        options: null,
        correct_answer: input.correctAnswer,
        explanation: input.explanation ?? "",
        user_answer: input.userAnswer,
        user_answer_images: null,
        language: input.language ?? "zh",
      }));
    };
    ws.onmessage = (ev) => {
      let data: Record<string, unknown>;
      try { data = JSON.parse(ev.data as string); } catch { return; }
      const type = data.type as string;
      if (type === "text") text += thinkFilter(String(data.content ?? ""));
      else if (type === "done") {
        clearTimeout(timer);
        finish(() => {
          // The judge's first line carries the verdict — trust the WORDS over
          // the emoji marker (models occasionally emit ✅ followed by 不正确).
          const first = text.split("\n")[0] ?? "";
          const verdict: JudgeResult["verdict"] =
            /不正确|incorrect/i.test(first) ? "incorrect" :
            /部分正确|partial/i.test(first) ? "partial" :
            (/正确|correct/i.test(first) || first.includes("✅")) ? "correct" :
            "incorrect";
          resolve({ verdict, feedback: text.trim() });
        });
      } else if (type === "error") {
        clearTimeout(timer);
        finish(() => resolve(null));
      }
    };
    ws.onerror = () => { clearTimeout(timer); finish(() => resolve(null)); };
    ws.onclose = () => {
      clearTimeout(timer);
      // Server closed after done → already resolved; else treat as failure
      finish(() => resolve(text ? { verdict: "incorrect", feedback: text.trim() } : null));
    };
  });
}

/* ─── AI tutor chat (WS /chat) ─── */

export interface TutorMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Ask the DeepTutor chat agent a question (e.g. "explain why my answer was
 * wrong"). Streams chunks via onChunk; resolves with the full reply, the
 * session id for follow-up turns, and any RAG/web sources cited.
 * Resolves null when unreachable.
 */
export function askTutor(
  message: string,
  opts?: { sessionId?: string | null; kbName?: string; language?: string; onChunk?: (chunk: string) => void },
): Promise<{ text: string; sessionId: string | null; sources?: { rag: unknown[]; web: unknown[] } } | null> {
  return new Promise((resolve) => {
    let settled = false;
    let full = "";
    let sessionId: string | null = opts?.sessionId ?? null;
    let sources: { rag: unknown[]; web: unknown[] } | undefined;
    const thinkFilter = createThinkFilter();
    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      try { ws.close(); } catch { /* noop */ }
      fn();
    };

    const wsUrl = dtBase().replace(/^http/, "ws") + "/api/v1/chat";
    const ws = new WebSocket(wsUrl);
    const timer = setTimeout(() => finish(() => resolve(full ? { text: full, sessionId, sources } : null)), 60000);

    ws.onopen = () => {
      ws.send(JSON.stringify({
        message,
        session_id: opts?.sessionId ?? undefined,
        kb_name: opts?.kbName ?? "",
        enable_rag: !!opts?.kbName,
        language: opts?.language ?? "zh",
      }));
    };
    ws.onmessage = (ev) => {
      let data: Record<string, unknown>;
      try { data = JSON.parse(ev.data as string); } catch { return; }
      const type = data.type as string;
      if (type === "session") sessionId = String(data.session_id ?? "") || sessionId;
      else if (type === "stream") {
        const chunk = thinkFilter(String(data.content ?? ""));
        if (!chunk) return;
        full += chunk;
        opts?.onChunk?.(chunk);
      } else if (type === "sources") {
        sources = {
          rag: Array.isArray(data.rag) ? data.rag : [],
          web: Array.isArray(data.web) ? data.web : [],
        };
      } else if (type === "result") {
        clearTimeout(timer);
        const finalText = String(data.content ?? full);
        finish(() => resolve({ text: finalText, sessionId, sources }));
      } else if (type === "error") {
        clearTimeout(timer);
        finish(() => resolve(full ? { text: full, sessionId, sources } : null));
      }
    };
    ws.onerror = () => { clearTimeout(timer); finish(() => resolve(full ? { text: full, sessionId, sources } : null)); };
    ws.onclose = () => {
      clearTimeout(timer);
      finish(() => resolve(full ? { text: full, sessionId, sources } : null));
    };
  });
}

/* ─── Streaming <think> filter — reasoning models (MiMo/Qwen/DeepSeek-R) ─── */

/**
 * Stateful filter that drops <think>…</think> reasoning from a token stream.
 * Handles markers split across chunks by holding back text that could be a
 * partial marker prefix.
 */
export function createThinkFilter() {
  const OPEN = "<think>";
  const CLOSE = "</think>";
  let inThink = false;
  let pending = "";

  const hasPartialMarker = (s: string): boolean => {
    for (let len = Math.min(8, s.length); len > 0; len--) {
      const tail = s.slice(s.length - len);
      if (OPEN.startsWith(tail) || CLOSE.startsWith(tail)) return true;
    }
    return false;
  };

  return (chunk: string): string => {
    pending += chunk;
    let out = "";
    for (;;) {
      if (!inThink) {
        const idx = pending.indexOf(OPEN);
        if (idx === -1) {
          if (hasPartialMarker(pending) && pending.length < 64) break;
          out += pending;
          pending = "";
          break;
        }
        out += pending.slice(0, idx);
        pending = pending.slice(idx + OPEN.length);
        inThink = true;
      } else {
        const idx = pending.indexOf(CLOSE);
        if (idx === -1) {
          pending = "";
          break;
        }
        pending = pending.slice(idx + CLOSE.length);
        inThink = false;
      }
    }
    return out;
  };
}

/* ─── Photo solve (WS /solve — step-by-step tutoring from a photo) ─── */

/**
 * Send a photographed exercise to the AI tutor and stream a walkthrough.
 * Returns the full solution text, or null when unreachable/failed.
 */
export function solvePhoto(
  input: { imageBase64: string; question?: string; language?: string; onChunk?: (chunk: string) => void },
  timeoutMs = 90000,
): Promise<string | null> {
  return new Promise((resolve) => {
    let settled = false;
    let full = "";
    const thinkFilter = createThinkFilter();
    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      try { ws.close(); } catch { /* noop */ }
      fn();
    };

    const wsUrl = dtBase().replace(/^http/, "ws") + "/api/v1/solve";
    const ws = new WebSocket(wsUrl);
    const timer = setTimeout(() => finish(() => resolve(full || null)), timeoutMs);

    ws.onopen = () => {
      ws.send(JSON.stringify({
        image_base64: input.imageBase64,
        question: input.question ?? "",
        language: input.language ?? "zh",
      }));
    };
    ws.onmessage = (ev) => {
      let data: Record<string, unknown>;
      try { data = JSON.parse(ev.data as string); } catch { return; }
      const type = data.type as string;
      if (type === "text") {
        const visible = thinkFilter(String(data.content ?? ""));
        if (!visible) return;
        full += visible;
        input.onChunk?.(visible);
      } else if (type === "done") {
        clearTimeout(timer);
        finish(() => resolve(full || null));
      } else if (type === "error") {
        clearTimeout(timer);
        finish(() => resolve(null));
      }
    };
    ws.onerror = () => { clearTimeout(timer); finish(() => resolve(full || null)); };
    ws.onclose = () => { clearTimeout(timer); finish(() => resolve(full || null)); };
  });
}

/* ─── Voice (sidecar TTS/STT — falls back to browser APIs when unset) ─── */

/** Synthesize speech via the sidecar TTS provider. Returns null if unset/failed. */
export async function synthesizeSpeech(text: string): Promise<Blob | null> {
  try {
    const res = await fetch(`${dtBase()}/api/v1/voice/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, format: "wav" }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) return null;
    return await res.blob();
  } catch {
    return null;
  }
}

/** Transcribe a recorded clip via the sidecar STT provider. Returns null if unset/failed. */
export async function transcribeSpeech(blob: Blob, language?: string): Promise<string | null> {
  try {
    const form = new FormData();
    form.append("file", blob, "clip.webm");
    if (language) form.append("language", language);
    const res = await fetch(`${dtBase()}/api/v1/voice/stt`, {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { text?: string };
    return data.text ?? null;
  } catch {
    return null;
  }
}

/* ─── Knowledge base reuse ─── */

export interface KBInfo {
  name: string;
  status?: string;
  statistics?: Record<string, unknown>;
}

/** List existing knowledge bases so past uploads can be reused (skip indexing).
 *  The sidecar computes per-KB statistics, so allow generous time. */
export async function listKnowledgeBases(): Promise<KBInfo[]> {
  try {
    const res = await fetchWithTimeout(`${apiUrl()}/knowledge/list`, {}, 15000);
    if (!res.ok) return [];
    const list = (await res.json()) as KBInfo[];
    return list.filter((k) => k.status !== "building");
  } catch {
    return [];
  }
}
