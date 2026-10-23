import { GoogleGenAI, Type } from "@google/genai";
import { HOSPITAL_BLOG_SKILL } from "./hospital-blog-skill";
import { cleanGeneratedBlog } from "./clean-blog";
import type { GeneratedBlog } from "./blog-schema";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const geminiResponseSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    slug: { type: Type.STRING },
    excerpt: { type: Type.STRING },
    content: { type: Type.STRING },
    category: { type: Type.STRING },
    tags: { type: Type.ARRAY, items: { type: Type.STRING } },
    seoTitle: { type: Type.STRING },
    metaDescription: { type: Type.STRING },
    primaryKeyword: { type: Type.STRING },
    secondaryKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
    heroImageAlt: { type: Type.STRING },
    internalLinks: { type: Type.ARRAY, items: { type: Type.STRING } },
    faqs: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          answer: { type: Type.STRING },
        },
        required: ["question", "answer"],
      },
    },
    sourceReferences: { type: Type.ARRAY, items: { type: Type.STRING } },
    medicalReviewRequired: { type: Type.BOOLEAN },
  },
  required: [
    "title", "slug", "excerpt", "content", "category", "tags",
    "seoTitle", "metaDescription", "primaryKeyword", "secondaryKeywords",
    "heroImageAlt", "internalLinks", "faqs", "sourceReferences", "medicalReviewRequired"
  ],
};

export async function generateAndRefineBlog(
  topic: string,
  articleType: string
): Promise<GeneratedBlog> {
  const prompt = `${HOSPITAL_BLOG_SKILL}

Create a ${articleType} medical/hospital article.
Topic: ${topic.trim()}
Location context: Saharanpur, Uttar Pradesh, India.`;

  const result = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: geminiResponseSchema,
      temperature: 0.2, // Low temperature increases generation speed and structural accuracy
    },
  });

  if (!result.text) {
    throw new Error("AI returned an empty response.");
  }

  const parsed = JSON.parse(result.text);
  return cleanGeneratedBlog(parsed);
}