// app/api/admin/blogs/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import BlogPost from "@/models/BlogPost";

// "text [link](/slug) more" -> segments
function toSegments(text: string) {
  const out: { text: string; slug: string; isLink: boolean }[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ text: text.slice(last, m.index), slug: "", isLink: false });
    out.push({ text: m[1], slug: m[2].replace(/^\/?(blog\/)?/, ""), isLink: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last), slug: "", isLink: false });
  return out;
}

// Markdown -> [{type, segments | items}]
function markdownToBlocks(md: string) {
  const blocks: any[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) blocks.push({ type: "list", items: list });
    list = [];
  };

  for (const raw of md.split("\n")) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (/^#{1,6}\s/.test(line)) {
      flush();
      blocks.push({
        type: "heading",
        segments: [{ text: line.replace(/^#+\s*/, ""), slug: "", isLink: false }],
      });
    } else if (/^[-*]\s/.test(line)) {
      list.push(line.replace(/^[-*]\s+/, ""));
    } else {
      flush();
      blocks.push({ type: "paragraph", segments: toSegments(line) });
    }
  }
  flush();
  return blocks;
}

// Auto related: same pillar first, then same category/tags
async function findRelated(slug: string, pillarSlug: string, category: string, tags: string[]) {
  const or: any[] = [{ category }];
  if (pillarSlug) or.unshift({ pillarSlug }, { slug: pillarSlug });
  if (tags.length) or.push({ tags: { $in: tags } });

  const docs = await BlogPost.find({ isPublished: true, slug: { $ne: slug }, $or: or })
    .sort({ date: -1 })
    .limit(4)
    .select("slug")
    .lean();
  return docs.map((d: any) => d.slug);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const b = await req.json();

    // Validate pillar rules
    if (b.pageType === "cluster") {
      const pillar = await BlogPost.findOne({ slug: b.pillarSlug, pageType: "pillar" }).select("_id");
      if (!pillar) return NextResponse.json({ error: "Selected pillar does not exist." }, { status: 400 });
    }

    const tags = (b.tags || []).map((t: string) => t.trim().toLowerCase());
    const relatedSlugs = await findRelated(b.slug, b.pillarSlug || "", b.category, tags);

    const post = await BlogPost.create({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      image: b.image,
      category: b.category,
      tags,
      content: markdownToBlocks(b.content),
      pageType: b.pageType || "article",
      pillarSlug: b.pageType === "cluster" ? b.pillarSlug : "",
      relatedSlugs,
      isPublished: !!b.isPublished,
      publishedAt: b.isPublished ? new Date() : null,
    });

    return NextResponse.json({ blogId: post._id });
  } catch (err: any) {
    if (err?.code === 11000)
      return NextResponse.json({ error: "This slug already exists." }, { status: 409 });
    return NextResponse.json({ error: "Could not save the blog." }, { status: 500 });
  }
}