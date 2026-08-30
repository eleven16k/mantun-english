/**
 * POST /api/scenarios/extract — extract plain text from an uploaded
 * courseware file (PDF / DOCX / PPTX / TXT / MD) so the scenario generator
 * can consume it. Mirrors the import module's file support; parsing happens
 * server-side. Body: multipart form with a `file` field → { text, name }.
 */
import { NextResponse } from "next/server";
import { requireAuth } from "../../../../server/auth";

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
