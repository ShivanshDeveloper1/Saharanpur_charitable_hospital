import { generateAndRefineBlog } from "@/lib/(blogs)/ai/ai-blog-service";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "AI API key is missing." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const topic = String(body.topic ?? "").trim();
    const articleType = String(body.articleType ?? "Educational");

    if (!topic || topic.length > 500) {
      return NextResponse.json(
        { error: "Enter a topic under 500 characters." },
        { status: 400 }
      );
    }

    const blog = await generateAndRefineBlog(topic, articleType);
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("Blog generation failed:", error);
    return NextResponse.json(
      { error: "Unable to generate the blog. Please try again." },
      { status: 500 }
    );
  }
}