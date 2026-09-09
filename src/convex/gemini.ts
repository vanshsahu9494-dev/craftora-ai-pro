"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

const GEMINI_MODEL = "gemini-2.0-flash";

const ANALYSIS_PROMPT = `You are an expert product analyst for an Indian artisan marketplace called Craftora AI.
Analyze this product image and any text description provided.

Return a JSON object with EXACTLY this structure (no markdown, no code blocks, just raw JSON):
{
  "name": "A catchy, marketable product name (max 60 chars)",
  "category": "One of: Home Decor, Handicrafts, Fashion & Textiles, Jewellery, Woodwork, Pottery & Ceramics, Paintings & Art, Others",
  "description": "A compelling 2-3 sentence product description suitable for an online marketplace listing. Highlight craftsmanship, cultural significance, and use cases.",
  "materials": ["material1", "material2", "material3"],
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "price": 1200,
  "ecoFriendly": true,
  "handmade": true
}

Guidelines:
- Price should be in Indian Rupees (₹), reasonable for handmade artisan goods (200-15000 range)
- Materials should be specific (e.g., "Terracotta Clay" not just "Clay")
- Tags should include: product type, style, use case, and eco/artisan tags
- Description should be in English, professional yet warm
- If the image is unclear, use the text description to make best guesses
- Always return valid JSON, nothing else`;

export const analyzeProduct = action({
  args: {
    imageDataUrl: v.optional(v.string()),
    userDescription: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is not configured. Please add your Gemini API key in the project's Keys/API keys tab."
      );
    }

    // Build the text prompt
    let promptText = ANALYSIS_PROMPT;
    if (args.userDescription) {
      promptText += `\n\nUser's description of the product: "${args.userDescription}"`;
    } else {
      promptText += `\n\nNo additional description provided. Analyze based on the image alone.`;
    }

    // Build parts array for the request
    const parts: Array<Record<string, unknown>> = [{ text: promptText }];

    // Add image if provided
    if (args.imageDataUrl) {
      const match = args.imageDataUrl.match(
        /^data:(image\/[\w+]+);base64,(.+)$/
      );
      if (match) {
        parts.push({
          inline_data: {
            mime_type: match[1],
            data: match[2],
          },
        });
      }
    }

    // Call Gemini API via REST (avoids SDK typing issues, runs server-side)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    const apiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({}));
      const errorMsg =
        errorData?.error?.message || `HTTP ${apiResponse.status}`;
      throw new Error(`Gemini API error: ${errorMsg}`);
    }

    const data = await apiResponse.json();
    const responseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!responseText) {
      throw new Error("Gemini returned an empty response");
    }

    return parseAnalysisResponse(responseText);
  },
});

function parseAnalysisResponse(responseText: string) {
  // Strip markdown code fences if present
  let jsonStr = responseText.trim();
  const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  const result = JSON.parse(jsonStr);

  return {
    name: String(result.name || "Handcrafted Artisan Product"),
    category: String(result.category || "Handicrafts"),
    description: String(
      result.description || "A beautiful handcrafted product."
    ),
    materials: Array.isArray(result.materials)
      ? result.materials.map(String)
      : ["Natural Materials"],
    tags: Array.isArray(result.tags)
      ? result.tags.map(String)
      : ["Handmade", "Artisan"],
    price: typeof result.price === "number" ? result.price : 1200,
    ecoFriendly: Boolean(result.ecoFriendly),
    handmade: Boolean(result.handmade),
  };
}
