/**
 * POST /api/scenarios/extract — extract plain text from an uploaded
 * courseware file (PDF / DOCX / PPTX / TXT / MD, images via vision OCR) so
 * the scenario generator and import flow can consume it. Parsing happens
 * server-side. Body: multipart form with a `file` field → { text, name }.
 */
import { NextResponse } from "next/server";
import { requireAuth } from "../../../../server/auth";
import type { LLMMessage } from "../../../../server/llm";

export const maxDuration = 120;

const MAX_BYTES = 25 * 1024 * 1024;
const MAX_TEXT = 30_000;

async function extractPdf(buf: Buffer): Promise<string> {
  // unpdf bundles a server-safe pdf.js build — raw pdfjs chokes in the
  // Next.js server bundle ("Object.defineProperty called on non-object").
  const { extractText, getDocumentProxy } = await import("unpdf");
  const pdf = await getDocumentProxy(new Uint8Array(buf));
  const { text } = await extractText(pdf, { mergePages: true });
  return text ?? "";
}

async function extractDocx(buf: Buffer): Promise<string> {
  const mammoth = await import("mammoth");
  const { value } = await mammoth.extractRawText({ buffer: buf });
  return value ?? "";
}

async function extractPptx(buf: Buffer): Promise<string> {
  const JSZip = (await import("jszip")).default;
  const zip = await JSZip.loadAsync(buf);
  // Slide text lives in ppt/slides/slideN.xml as <a:t> runs; keep slide order.
  const names = Object.keys(zip.files)
    .filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n))
    .sort((a, b) => Number(a.match(/(\d+)/)![1]) - Number(b.match(/(\d+)/)![1]));
  const parts: string[] = [];
  for (const name of names) {
    const xml = await zip.files[name].async("string");
    const runs = [...xml.matchAll(/<a:t>([^<]*)<\/a:t>/g)].map((m) => m[1]);
    const text = runs.join("\n").trim();
    if (text) parts.push(text);
  }
  return parts.join("\n\n");
}

/**
 * Vision OCR via the gateway model (glm-5.3-flash reads images). Transcribes
 * worksheet/textbook photos verbatim so downstream quiz/scenario generation
 * sees plain text. 1M-context model handles full-page scans.
 */
async function ocrImage(mime: string, buf: Buffer): Promise<string> {
  const { llmAvailable, llmChat } = await import("../../../../server/llm");
  if (!llmAvailable()) {
    throw new Error("Image OCR needs the LLM_API_KEY (vision model) configured");
  }
  const dataUrl = `data:${mime};base64,${buf.toString("base64")}`;
  const messages: LLMMessage[] = [
    {
      role: "system",
      content:
        "You transcribe images of exercises, worksheets and textbook pages. Output ONLY the text content verbatim: every question number, stem, option (A/B/C/D), formula written inline in plain text, table row as a line. Preserve reading order. No commentary, no markdown headers, no translations.",
    },
    {
      role: "user",
      content: [
        { type: "image_url", image_url: { url: dataUrl } },
        { type: "text", text: "Transcribe all text in this image." },
      ],
    },
  ];
  return llmChat({ messages, timeoutMs: 120_000 });
}

export async function POST(req: Request) {
  try {
    requireAuth(req);
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file field required" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large (max 25 MB)" }, { status: 413 });
    }

    const name = file.name.toLowerCase();
    const buf = Buffer.from(await file.arrayBuffer());
    let text: string;
    if (name.endsWith(".pdf")) {
      text = await extractPdf(buf);
    } else if (name.endsWith(".docx")) {
      text = await extractDocx(buf);
    } else if (name.endsWith(".pptx")) {
      text = await extractPptx(buf);
    } else if (name.endsWith(".txt") || name.endsWith(".md") || name.endsWith(".csv")) {
      text = buf.toString("utf8");
    } else if (file.type.startsWith("image/") || /\.(png|jpe?g|webp|gif|bmp)$/.test(name)) {
      text = await ocrImage(file.type || "image/png", buf);
    } else {
      return NextResponse.json(
        { error: "Unsupported type — use PDF, DOCX, PPTX, TXT or MD" },
        { status: 415 }
      );
    }

    text = text.replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").trim().slice(0, MAX_TEXT);
    if (text.length < 50) {
      return NextResponse.json({ error: "Could not extract enough text (min 50 chars)" }, { status: 422 });
    }
    return NextResponse.json({ text, name: file.name });
  } catch (e) {
    if (e instanceof Response) return e;
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
