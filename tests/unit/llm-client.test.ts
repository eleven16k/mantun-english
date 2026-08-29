import { describe, it, expect, vi, afterEach } from "vitest";
import { stripThinking, llmChat, llmAvailable, llmBaseUrl, llmModel } from "@/server/llm";
import { AIUnavailableError, aiText } from "@/server/ai";

describe("llm client config", () => {
  afterEach(() => {
    delete process.env.LLM_API_KEY;
    delete process.env.LLM_BASE_URL;
    delete process.env.LLM_MODEL;
    delete process.env.GEMINI_API_KEY;
    vi.unstubAllGlobals();
  });

  it("defaults to the zm gateway and glm-5.3-flash", () => {
    expect(llmBaseUrl()).toBe("https://zm.oxsm.gz.cn/api/v1");
    expect(llmModel()).toBe("z-ai/glm-5.3-flash");
    expect(llmAvailable()).toBe(false);
  });

  it("strips a leading <think> block from reasoning models", () => {
    expect(stripThinking("<think>hmm let me think</think>\n\nAnswer: 42")).toBe("Answer: 42");
    expect(stripThinking("plain answer")).toBe("plain answer");
  });

  it("aiText throws AIUnavailableError with no keys", async () => {
    await expect(aiText({ contents: [{ role: "user", text: "hi" }] })).rejects.toBeInstanceOf(
      AIUnavailableError
    );
  });

  it("aiText routes to the gateway with system + history when LLM_API_KEY set", async () => {
    process.env.LLM_API_KEY = "test-key";
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ choices: [{ message: { content: "<think>x</think>{\"ok\":true}" } }] }),
        { status: 200 }
      )
    );
    vi.stubGlobal("fetch", fetchMock);

    const out = await aiText({
      contents: [
        { role: "user", text: "hello" },
        { role: "model", text: "hi there" },
        { role: "user", text: "bye" },
      ],
      systemInstruction: "be brief",
      json: true,
    });

    expect(out).toBe('{"ok":true}');
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(String(init.body)) as {
      model: string;
      messages: { role: string; content: string }[];
      response_format?: unknown;
    };
    expect(body.model).toBe("z-ai/glm-5.3-flash");
    expect(body.messages).toHaveLength(4);
    expect(body.messages[0].role).toBe("system");
    expect(body.messages[2].role).toBe("assistant");
    expect(body.response_format).toEqual({ type: "json_object" });
  });

  it("llmChat surfaces gateway errors", async () => {
    process.env.LLM_API_KEY = "test-key";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("denied", { status: 403 })));
    await expect(llmChat({ messages: [{ role: "user", content: "hi" }] })).rejects.toThrow(/403/);
  });
});
