import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import type { AIAnalysisResult } from "@/types/craftora";

// Lazy-initialized Convex client
let convexClient: ConvexHttpClient | null = null;

function getConvexClient(): ConvexHttpClient {
  if (!convexClient) {
    const convexUrl = import.meta.env.VITE_CONVEX_URL;
    if (!convexUrl) {
      throw new Error("VITE_CONVEX_URL is not configured");
    }
    convexClient = new ConvexHttpClient(convexUrl);
  }
  return convexClient;
}

/**
 * Analyze product using Gemini AI via Convex action
 * Falls back to mock analysis if Gemini is unavailable
 */
export async function analyzeProduct(
  imageDataUrl?: string,
  userDescription?: string
): Promise<AIAnalysisResult> {
  try {
    const client = getConvexClient();

    // Call the Convex action which uses Gemini API
    const analysisResult = await client.action(api.gemini.analyzeProduct, {
      imageDataUrl,
      userDescription,
    });

    return analysisResult as AIAnalysisResult;
  } catch (error) {
    console.warn("Gemini analysis failed, using mock analysis:", error);
    // Fall back to mock analysis
    return getMockAnalysis(imageDataUrl, userDescription);
  }
}

/**
 * Check if Gemini API is configured
 */
export async function isGeminiConfigured(): Promise<boolean> {
  try {
    const client = getConvexClient();
    // Try a simple text-only call to check if the API key is set
    await client.action(api.gemini.analyzeProduct, {
      imageDataUrl: undefined,
      userDescription: "test product",
    });
    return true;
  } catch {
    return false;
  }
}

// Mock analysis as fallback
const productTemplates: Record<string, AIAnalysisResult> = {
  pottery: {
    name: "Handcrafted Terracotta Pot",
    category: "Pottery & Ceramics",
    description:
      "A beautifully handcrafted terracotta pot made using traditional pottery techniques. This piece showcases the rich cultural heritage of Indian pottery with intricate patterns and natural finishes. Perfect for both decorative and functional use in your home.",
    materials: ["Terracotta Clay", "Natural Pigments", "Glaze Finish"],
    tags: ["Handmade", "Traditional", "Pottery", "Decorative", "Eco-Friendly"],
    price: 950,
    ecoFriendly: true,
    handmade: true,
  },
  textile: {
    name: "Handwoven Cotton Scarf",
    category: "Fashion & Textiles",
    description:
      "Exquisite handwoven cotton scarf crafted by skilled artisans using traditional weaving techniques. Features vibrant patterns inspired by regional Indian textile traditions. Lightweight, comfortable, and perfect for any occasion.",
    materials: ["Organic Cotton", "Natural Dyes"],
    tags: ["Handwoven", "Fashion", "Sustainable", "Traditional", "Handmade"],
    price: 1200,
    ecoFriendly: true,
    handmade: true,
  },
  woodwork: {
    name: "Carved Wooden Box",
    category: "Woodwork",
    description:
      "Intricately carved wooden box made from sustainable Sheesham wood. This handcrafted piece features detailed floral motifs and is perfect for storing jewellery, keepsakes, or as a decorative accent. Each box is unique, reflecting the artisan's skill.",
    materials: ["Sheesham Wood", "Natural Polish", "Brass Inlay"],
    tags: ["Handmade", "Woodwork", "Decorative", "Storage", "Sustainable"],
    price: 1800,
    ecoFriendly: true,
    handmade: true,
  },
  jewelry: {
    name: "Sterling Silver Pendant",
    category: "Jewellery",
    description:
      "Beautiful sterling silver pendant featuring traditional Indian motifs. Handcrafted by tribal artisans using age-old jewellery-making techniques. A stunning piece that blends heritage with contemporary style.",
    materials: ["Sterling Silver", "Oxidized Finish"],
    tags: ["Handmade", "Jewellery", "Tribal", "Fashion", "Gift"],
    price: 1500,
    ecoFriendly: false,
    handmade: true,
  },
  painting: {
    name: "Folk Art Canvas Painting",
    category: "Paintings & Art",
    description:
      "Vibrant folk art painting created using natural pigments on handmade canvas. Depicts a traditional scene with rich colors and intricate detailing. A stunning piece of authentic Indian folk art for your walls.",
    materials: ["Canvas", "Natural Pigments", "Plant-based Colors"],
    tags: ["Folk Art", "Painting", "Wall Decor", "Traditional", "Authentic"],
    price: 2200,
    ecoFriendly: true,
    handmade: true,
  },
  basket: {
    name: "Handwoven Bamboo Basket",
    category: "Handicrafts",
    description:
      "Beautiful handcrafted bamboo basket made by skilled rural artisans. Features intricate weaving patterns and a sturdy design. Perfect for home decor, storage, or as a decorative accent piece.",
    materials: ["Bamboo", "Natural Fiber", "Cotton Thread"],
    tags: ["Eco-Friendly", "Handmade", "Storage", "Decorative", "Bamboo"],
    price: 800,
    ecoFriendly: true,
    handmade: true,
  },
  general: {
    name: "Handcrafted Artisan Product",
    category: "Handicrafts",
    description:
      "A unique handcrafted product made by skilled artisans using traditional techniques. This piece showcases excellent craftsmanship and attention to detail, making it a perfect addition to any collection or a thoughtful gift.",
    materials: ["Natural Materials", "Hand-finished"],
    tags: ["Handmade", "Artisan", "Unique", "Traditional"],
    price: 1200,
    ecoFriendly: true,
    handmade: true,
  },
};

function getMockAnalysis(
  imageDataUrl?: string,
  userDescription?: string
): AIAnalysisResult {
  const keywords = [
    "pottery", "terracotta", "clay", "vase", "pot", "ceramic",
    "textile", "fabric", "weave", "cloth", "cotton", "silk", "scarf", "saree",
    "wood", "carved", "figurine", "wooden", "box",
    "silver", "gold", "jewelry", "necklace", "earring", "pendant",
    "painting", "art", "canvas", "drawing", "madhubani",
    "basket", "bamboo", "woven", "craft", "handmade",
  ];

  let detectedCategory = "general";
  const searchText = `${imageDataUrl || ""} ${userDescription || ""}`.toLowerCase();

  for (const kw of keywords) {
    if (searchText.includes(kw)) {
      if (["pottery", "terracotta", "clay", "vase", "pot", "ceramic"].includes(kw)) {
        detectedCategory = "pottery";
      } else if (["textile", "fabric", "weave", "cloth", "cotton", "silk", "scarf", "saree"].includes(kw)) {
        detectedCategory = "textile";
      } else if (["wood", "carved", "figurine", "wooden", "box"].includes(kw)) {
        detectedCategory = "woodwork";
      } else if (["silver", "gold", "jewelry", "necklace", "earring", "pendant"].includes(kw)) {
        detectedCategory = "jewelry";
      } else if (["painting", "art", "canvas", "drawing", "madhubani"].includes(kw)) {
        detectedCategory = "painting";
      } else if (["basket", "bamboo", "woven"].includes(kw)) {
        detectedCategory = "basket";
      }
      break;
    }
  }

  if (detectedCategory === "general") {
    const categories = Object.keys(productTemplates).filter((k) => k !== "general");
    detectedCategory = categories[Math.floor(Math.random() * categories.length)];
  }

  const template = productTemplates[detectedCategory];
  const priceVariation = Math.round((Math.random() - 0.5) * 200);

  return {
    ...template,
    price: Math.max(200, template.price + priceVariation),
  };
}
