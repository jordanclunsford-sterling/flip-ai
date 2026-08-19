import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type ScoutAnalysis = {
  title: string;
  category: string;
  listing: {
    asking_price: number | null;
    is_free: boolean;
    dimensions: string | null;
    brand: string | null;
    location: string | null;
    seller_notes: string | null;
    source: string | null;
  };
  observations: Array<{ label: string; confidence: "Likely" | "Possible" | "Unable to determine from photo" }>;
  verdict: "GO" | "MAYBE" | "PASS";
  flip_score: number;
  est_acquisition: number;
  est_materials: number;
  est_resale_low: number;
  est_resale_high: number;
  est_hours: number;
  difficulty: "Easy" | "Moderate" | "Advanced";
  risk_level: string;
  reasoning: string;
  do_not_paint: boolean;
  directions: Array<{
    style_name: string;
    rationale: string;
    difficulty: string;
    est_material_cost: number;
    appeal: string;
    recommended: boolean;
  }>;
  steps: Array<{ title: string; instructions: string; est_minutes: number; stage: string }>;
  materials: Array<{ name: string; category: string; est_cost: number }>;
};

const SCOUT_PROMPT = `You are an expert furniture flipper and restorer helping someone decide whether to buy a used piece of furniture and how to flip it.

You will receive one or more images. They may be phone photos of a real piece, or screenshots of a Facebook Marketplace / OfferUp / Craigslist / eBay listing. If a screenshot contains listing text, extract the visible facts (asking price, whether it is free, dimensions, brand, condition claims, location, seller notes). Never invent listing details that are not visible.

Assess construction, style, era, and damage from the images only. Be honest about uncertainty: every observation must be labelled "Likely", "Possible", or "Unable to determine from photo". Never state certainty you do not have. Never claim solid wood, a designer/manufacturer, or vintage provenance unless the images clearly establish it.

Do NOT default to painting. If the piece appears to have attractive solid wood, valuable veneer, vintage character, or restoration value, set do_not_paint to true and recommend cleaning, repair, stripping, refinishing, staining, oiling, or preserving the original finish instead.

Produce a work plan tailored to THIS piece — the number and content of steps must reflect its actual material, finish, damage, and the recommended direction. Do not emit a generic 15-step template. Skip priming when it is not needed, add chemical stripping or structural repair only when warranted, and mention PPE where chemicals or sanding dust are involved.

Cost/price estimates are your own experienced judgement from the images and any visible asking price — they are estimates, not market data. Use US dollars.

Return ONLY a JSON object with exactly this shape:
{
 "title": string, "category": string,
 "listing": {"asking_price": number|null, "is_free": boolean, "dimensions": string|null, "brand": string|null, "location": string|null, "seller_notes": string|null, "source": string|null},
 "observations": [{"label": string, "confidence": "Likely"|"Possible"|"Unable to determine from photo"}],
 "verdict": "GO"|"MAYBE"|"PASS", "flip_score": number,
 "est_acquisition": number, "est_materials": number, "est_resale_low": number, "est_resale_high": number, "est_hours": number,
 "difficulty": "Easy"|"Moderate"|"Advanced", "risk_level": string, "reasoning": string, "do_not_paint": boolean,
 "directions": [{"style_name": string, "rationale": string, "difficulty": string, "est_material_cost": number, "appeal": string, "recommended": boolean}],
 "steps": [{"title": string, "instructions": string, "est_minutes": number, "stage": string}],
 "materials": [{"name": string, "category": string, "est_cost": number}]
}
Give exactly 3 directions, with exactly one marked recommended. Stage must be one of: Picked Up, Cleaning, Repair, Sanding, Priming, Painting / Finishing, Hardware, Photography, Listed. Keep reasoning under 60 words.`;

export const analyzeScout = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { images: string[]; notes?: string }) => {
    if (!Array.isArray(input.images) || input.images.length === 0) throw new Error("Add at least one photo.");
    return { images: input.images.slice(0, 6), notes: (input.notes ?? "").slice(0, 1000) };
  })
  .handler(async ({ data }): Promise<ScoutAnalysis> => {
    const { chat, parseJson, imageParts } = await import("./ai.server");
    const text = await chat([
      { role: "system", content: SCOUT_PROMPT },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: data.notes ? `Notes from the buyer: ${data.notes}` : "Analyze this piece.",
          },
          ...imageParts(data.images),
        ],
      },
    ]);
    return parseJson<ScoutAnalysis>(text);
  });

export type ListingDraft = {
  title: string;
  description: string;
  suggested_price: number;
  expected_low: number;
  expected_high: number;
  dimensions: string;
  condition_note: string;
  keywords: string;
  photo_feedback: string[];
};

export const generateListing = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { context: string; images: string[] }) => ({
    context: String(input.context ?? "").slice(0, 4000),
    images: Array.isArray(input.images) ? input.images.slice(0, 6) : [],
  }))
  .handler(async ({ data }): Promise<ListingDraft> => {
    const { chat, parseJson, imageParts } = await import("./ai.server");
    const text = await chat([
      {
        role: "system",
        content: `You write honest resale listings for flipped furniture and give brief photography feedback.
Never claim solid wood, a designer or manufacturer, or vintage provenance unless it is clearly established in the provided context. Describe condition honestly, including remaining defects.
Return ONLY JSON: {"title":string,"description":string,"suggested_price":number,"expected_low":number,"expected_high":number,"dimensions":string,"condition_note":string,"keywords":string,"photo_feedback":[string]}
photo_feedback: up to 5 short, concrete photography improvements based on the images provided (or an empty array if no images).`,
      },
      { role: "user", content: [{ type: "text", text: data.context }, ...imageParts(data.images)] },
    ]);
    return parseJson<ListingDraft>(text);
  });

export const askAboutStep = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { question: string; context: string; images?: string[] }) => ({
    question: String(input.question ?? "").slice(0, 800),
    context: String(input.context ?? "").slice(0, 4000),
    images: Array.isArray(input.images) ? input.images.slice(0, 3) : [],
  }))
  .handler(async ({ data }): Promise<{ answer: string }> => {
    const { chat, imageParts } = await import("./ai.server");
    const answer = await chat(
      [
        {
          role: "system",
          content: `You are a practical furniture restoration coach. Answer in under 150 words, plain language, concrete next actions.
Prioritise manufacturer instructions, ventilation, dust control and PPE when chemicals, sanding or old paint are involved. Warn about lead paint risk on pre-1978 finishes. Never suggest mixing chemicals. If a photo cannot answer the question, say so and ask for the one thing you need.`,
        },
        {
          role: "user",
          content: [
            { type: "text", text: `Project context:\n${data.context}\n\nQuestion: ${data.question}` },
            ...imageParts(data.images),
          ],
        },
      ],
      "google/gemini-2.5-flash",
    );
    return { answer };
  });
