// app/api/admin/blogs/pillars/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";        // use your own db connect
import BlogPost from "@/models/Blog";

export async function GET() {
  await connectDB();
  const pillars = await BlogPost.find({ pageType: "pillar" })
    .select("slug title -_id")
    .sort({ title: 1 })
    .lean();
  return NextResponse.json({ pillars });
}