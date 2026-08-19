const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";

export type ChatMessage = {
  role: "system" | "user";
  content: string | Array<Record<string, unknown>>;
};

/** Calls the Lovable AI Gateway and returns the raw assistant text. */
export async function chat(messages: ChatMessage[], model = "google/gemini-2.5-pro") {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured for this project yet.");

  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages }),
  });

  if (res.status === 429) throw new Error("Rate limit reached — try again in a moment.");
  if (res.status === 402) throw new Error("AI credits exhausted. Add credits to keep analyzing.");
  if (!res.ok) {
    const body = await res.text();
    console.error(`AI gateway error [${res.status}]: ${body}`);
    throw new Error(`AI request failed (${res.status}).`);
  }

  const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return data.choices?.[0]?.message?.content ?? "";
}

/** Parses a JSON object out of a model response, tolerating code fences. */
export function parseJson<T>(text: string): T {
  const cleaned = text
    .replace(/^```(?:json)?/gm, "")
    .replace(/```$/gm, "")
    .trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("The AI response could not be read. Try again.");
  return JSON.parse(cleaned.slice(start, end + 1)) as T;
}

export function imageParts(images: string[]) {
  return images.slice(0, 6).map((url) => ({ type: "image_url", image_url: { url } }));
}
