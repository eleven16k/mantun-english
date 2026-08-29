/**
 * POST /api/solve — photo solve (看图解题) via the vision+reasoning gateway
 * model. Body: { imageBase64: "<data URL>", note?, locale? }
 * → text/plain stream of the step-by-step solution (Markdown).
 *
 * 503 { error: "no_provider" } when no LLM/Gemini key is configured — the
 * client then falls back to the DeepTutor sidecar path.
 */
import { requireAuth } from "../../../server/auth";
import { llmAvailable, llmChatStream, llmModel, type LLMMessage } from "../../../server/llm";

export const maxDuration = 120;

function systemPrompt(locale: string): string {
  if (locale === "zh") {
    return [
      "你是一位耐心、专业的 K12 家庭教师。学生会上传一张练习题/试卷的照片。",
      "请仔细读图，识别题目内容（含手写体），然后：",
      "1. 先用一句话复述题目要求；",
      "2. 分步骤讲解解题过程（每步给出理由）；",
      "3. 最后用加粗给出最终答案。",
      "使用 Markdown 输出，语言：简体中文。讲解要简洁清晰，适合中小学生阅读。",
      "如果图片中没有题目，请简短说明看不清或不是题目。",
    ].join("\n");
  }
  return [
    "You are a patient, professional K12 tutor. The student uploads a photo of an exercise.",
    "Read the image carefully (including handwriting), then:",
    "1. Restate what the question asks in one sentence;",
    "2. Walk through the solution step by step, justifying each step;",
    "3. Finish with the final answer in bold.",
    "Output Markdown. Be concise and student-friendly.",
    "If the image contains no question, say so briefly.",
  ].join("\n");
}

export async function POST(req: Request) {
  try {
    requireAuth(req);
    const body = await req.json();
    const image: string = String(body.imageBase64 ?? "");
    if (!image.startsWith("data:image/")) {
      return Response.json({ error: "imageBase64 data URL required" }, { status: 400 });
    }
    const note = String(body.note ?? "").slice(0, 500);
    const locale = body.locale === "en" ? "en" : "zh";

    if (!llmAvailable()) {
      return Response.json({ error: "no_provider" }, { status: 503 });
    }

    const userContent: LLMMessage["content"] = [{ type: "image_url", image_url: { url: image } }];
    const userText = note.trim()
      ? locale === "zh"
        ? `请解答这道题。补充说明：${note.trim()}`
        : `Solve this. Extra note: ${note.trim()}`
      : locale === "zh"
        ? "请解答图片中的题目。"
        : "Solve the question in the image.";
    userContent.push({ type: "text", text: userText });

    const messages: LLMMessage[] = [
      { role: "system", content: systemPrompt(locale) },
      { role: "user", content: userContent },
    ];

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          await llmChatStream({
            messages,
            timeoutMs: 110_000,
            onChunk: (chunk) => controller.enqueue(encoder.encode(chunk)),
          });
        } catch (e) {
          const msg = e instanceof Error ? e.message : "solve failed";
          controller.enqueue(encoder.encode(`\n\n_[${llmModel()} error: ${msg}]_`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch (e) {
    if (e instanceof Response) return e;
    return Response.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
