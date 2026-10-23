"use client";

import { emptyBlog, GeneratedBlog } from "@/lib/(blogs)/ai/blog-schema";
import { useEffect, useState } from "react";

type Pillar = { slug: string; title: string };

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default function BlogCreator() {
  const [topic, setTopic] = useState("");
  const [articleType, setArticleType] = useState("Educational");
  const [blog, setBlog] = useState<GeneratedBlog>(emptyBlog);
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [slugEdited, setSlugEdited] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Load existing pillar pages for the dropdown
  useEffect(() => {
    fetch("/api/admin/blogs/pillars")
      .then((r) => r.json())
      .then((d) => setPillars(d.pillars || []))
      .catch(() => {});
  }, []);

  function update<K extends keyof GeneratedBlog>(key: K, value: GeneratedBlog[K]) {
    setBlog((prev) => ({ ...prev, [key]: value }));
  }

  function onTitleChange(title: string) {
    setBlog((prev) => ({
      ...prev,
      title,
      slug: slugEdited ? prev.slug : slugify(title),
    }));
  }

  async function generateBlog() {
    if (!topic.trim()) return setMessage("Please enter a topic first.");
    setGenerating(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/blogs/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, articleType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Blog generation failed.");
      setBlog({ ...emptyBlog, ...data.blog });
      setSlugEdited(false);
      setMessage("Generated! Review and edit below.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Generation failed.");
    } finally {
      setGenerating(false);
    }
  }

  async function save(isPublished: boolean) {
    if (!blog.title.trim() || !blog.slug.trim() || !blog.excerpt.trim() || !blog.content.trim())
      return setMessage("Title, slug, description and content are required.");
    if (!blog.image.trim() || !blog.category.trim())
      return setMessage("Image and category are required.");
    if (blog.pageType === "cluster" && !blog.pillarSlug)
      return setMessage("Select a pillar page for this cluster article.");

    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...blog, isPublished }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save.");
      setMessage(isPublished ? `Published! ID: ${data.blogId}` : `Draft saved! ID: ${data.blogId}`);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  const labelClass = "block text-sm font-medium text-gray-800";
  const card = "space-y-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7";

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-10">
      <div>
        <p className="text-sm text-gray-500">Admin / Blogs / New</p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">Create Blog</h1>
      </div>

      {message && (
        <div role="status" className="rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-700">
          {message}
        </div>
      )}

      {/* 1. AI generator */}
      <section className={card}>
        <h2 className="font-semibold text-gray-900">1. AI Blog Generator</h2>
        <div>
          <label className={labelClass} htmlFor="topic">Topic or Idea</label>
          <textarea
            id="topic" value={topic} onChange={(e) => setTopic(e.target.value)}
            maxLength={500} rows={3} className={inputClass}
            placeholder="Example: Knee pain in older adults, treatment options..."
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="articleType">Article Type</label>
          <select id="articleType" value={articleType} onChange={(e) => setArticleType(e.target.value)} className={inputClass}>
            <option value="Educational">Patient education</option>
            <option value="Treatment">Treatment guide</option>
            <option value="Symptoms">Symptoms and warning signs</option>
            <option value="Comparison">Treatment comparison</option>
          </select>
        </div>
        <button
          type="button" onClick={generateBlog} disabled={generating}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {generating ? "Generating..." : "✦ Generate with AI"}
        </button>
      </section>

      {/* 2. SEO structure */}
      <section className={card}>
        <h2 className="font-semibold text-gray-900">2. Page Structure (SEO)</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="pageType">Page Type</label>
            <select
              id="pageType" value={blog.pageType} className={inputClass}
              onChange={(e) => {
                const v = e.target.value as GeneratedBlog["pageType"];
                setBlog((p) => ({ ...p, pageType: v, pillarSlug: v === "cluster" ? p.pillarSlug : "" }));
              }}
            >
              <option value="article">Article (standalone)</option>
              <option value="pillar">Pillar (main guide)</option>
              <option value="cluster">Cluster (belongs to a pillar)</option>
            </select>
          </div>

          {blog.pageType === "cluster" && (
            <div>
              <label className={labelClass} htmlFor="pillarSlug">Parent Pillar</label>
              <select
                id="pillarSlug" value={blog.pillarSlug} className={inputClass}
                onChange={(e) => update("pillarSlug", e.target.value)}
              >
                <option value="">Select pillar...</option>
                {pillars.map((p) => (
                  <option key={p.slug} value={p.slug}>{p.title}</option>
                ))}
              </select>
              {pillars.length === 0 && (
                <p className="mt-1 text-xs text-amber-600">No pillars yet. Create a pillar page first.</p>
              )}
            </div>
          )}

          <div>
            <label className={labelClass} htmlFor="category">Category</label>
            <input id="category" value={blog.category} onChange={(e) => update("category", e.target.value)} className={inputClass} placeholder="e.g. Knee Care" />
          </div>

          <div>
            <label className={labelClass} htmlFor="tags">Tags (comma separated)</label>
            <input
              id="tags" className={inputClass} placeholder="knee pain, arthritis"
              value={blog.tags.join(", ")}
              onChange={(e) => update("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
            />
          </div>
        </div>
        <p className="text-xs text-gray-500">Related articles are picked automatically when you save.</p>
      </section>

      {/* 3. Content */}
      <section className={card}>
        <h2 className="font-semibold text-gray-900">3. Review & Edit Content</h2>

        <div>
          <label className={labelClass} htmlFor="editTitle">Article Title</label>
          <input id="editTitle" value={blog.title} onChange={(e) => onTitleChange(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="slug">URL Slug</label>
          <input
            id="slug" value={blog.slug} className={inputClass}
            onChange={(e) => { setSlugEdited(true); update("slug", slugify(e.target.value)); }}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="image">Image URL</label>
          <input id="image" value={blog.image} onChange={(e) => update("image", e.target.value)} className={inputClass} placeholder="https://..." />
        </div>

        <div>
          <label className={labelClass} htmlFor="excerpt">
            Short Description <span className="font-normal text-gray-400">({blog.excerpt.length}/300)</span>
          </label>
          <textarea
            id="excerpt" value={blog.excerpt} maxLength={300} rows={3}
            onChange={(e) => update("excerpt", e.target.value)} className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="content">Article Content (Markdown)</label>
          <textarea
            id="content" value={blog.content} rows={18}
            onChange={(e) => update("content", e.target.value)}
            className={`${inputClass} font-mono leading-6`}
          />
          <p className="mt-1 text-xs text-gray-500">
            Use ## for headings, - for lists, and [text](/other-slug) for internal links.
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row">
          <button
            type="button" onClick={() => save(false)} disabled={saving || generating}
            className="flex-1 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-900 hover:bg-gray-50 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button" onClick={() => save(true)} disabled={saving || generating}
            className="flex-1 rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </section>
    </div>
  );
}