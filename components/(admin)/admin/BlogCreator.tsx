"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import RichTextEditor from '@/components/(admin)/admin/RichTextEditor'
import FeaturedImageUpload from '@/components/(admin)/admin/FeaturedImageUpload'
import JsonBlogUploader from '@/app/(admin)/admin/json-upload/JsonBlogUploader'
import { CheckCircle2, AlertCircle, ExternalLink, ArrowRight, PenSquare, FileJson } from 'lucide-react'

type Pillar = { slug: string; title: string }

type Draft = {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  pageType: 'pillar' | 'cluster' | 'article' | 'standalone'
  pillarSlug: string
  image: string
  featuredImage?: string
  imageAlt: string
  canonicalUrl: string
  seoTitle: string
  metaDescription: string
  primaryKeyword: string
  secondaryKeywords: string[]
  tags: string[]
  author: string
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const initialDraft: Draft = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: '',
  pageType: 'article',
  pillarSlug: '',
  image: '',
  imageAlt: '',
  canonicalUrl: '',
  seoTitle: '',
  metaDescription: '',
  primaryKeyword: '',
  secondaryKeywords: [],
  tags: [],
  author: 'Clinical Team',
}

export default function BlogCreator() {
  const [creationMode, setCreationMode] = useState<'editor' | 'json'>('editor')
  const [draft, setDraft] = useState<Draft>(initialDraft)
  const [pillars, setPillars] = useState<Pillar[]>([])
  const [slugEdited, setSlugEdited] = useState(false)
  const [saving, setSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error'
    text: string
    slug?: string
  } | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/admin/blogs/pillars')
      .then((response) => response.json())
      .then((data) => setPillars(data.pillars || []))
      .catch((err) => console.error('[BlogCreator] Failed to fetch pillars:', err))
  }, [])

  const updateField = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((previous) => ({ ...previous, [key]: value }))
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const onTitleChange = (title: string) => {
    const newSlug = slugEdited ? draft.slug : slugify(title)
    setDraft((previous) => ({
      ...previous,
      title,
      slug: newSlug,
      seoTitle: previous.seoTitle || title,
    }))
    if (fieldErrors.title) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next.title
        return next
      })
    }
  }

  function validateForm(): boolean {
    const errors: Record<string, string> = {}

    if (!draft.title.trim()) {
      errors.title = 'Title is required.'
    }

    const cleanSlug = slugify(draft.slug)
    if (!cleanSlug) {
      errors.slug = 'A valid URL slug is required.'
    } else if (!/^[a-z0-9-]+$/.test(cleanSlug)) {
      errors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens.'
    }

    if (!draft.excerpt.trim()) {
      errors.excerpt = 'Excerpt / summary description is required for SEO and listings.'
    }

    if (!draft.content || (typeof draft.content === 'string' && !draft.content.trim())) {
      errors.content = 'Article content is required.'
    }

    if (!draft.category.trim()) {
      errors.category = 'Please assign a category for this article.'
    }

    if (draft.pageType === 'cluster' && !draft.pillarSlug) {
      errors.pillarSlug = 'Cluster pages must be linked to a parent pillar page.'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function save(isPublished: boolean) {
    if (!validateForm()) {
      setStatusMessage({
        type: 'error',
        text: 'Please resolve the highlighted validation errors before submitting.',
      })
      window.scrollTo({ top: 150, behavior: 'smooth' })
      return
    }

    setSaving(true)
    setStatusMessage(null)

    try {
      console.log('[BlogCreator] Submitting blog to /api/admin/blogs, isPublished:', isPublished)
      const payload = {
        ...draft,
        slug: slugify(draft.slug),
        image: draft.image || draft.featuredImage || '',
        isPublished,
        pageType: draft.pageType || 'article',
        pillarSlug: draft.pageType === 'cluster' ? draft.pillarSlug : '',
      }

      const response = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save blog.')
      }

      const finalSlug = data.slug || payload.slug
      setStatusMessage({
        type: 'success',
        text: isPublished
          ? 'Blog post successfully published to the public website!'
          : 'Blog draft saved successfully to database.',
        slug: finalSlug,
      })
    } catch (error: any) {
      console.error('[BlogCreator] Save failed:', error)
      setStatusMessage({
        type: 'error',
        text: error.message || 'Could not save the blog. Please check all fields.',
      })
    } finally {
      setSaving(false)
    }
  }

  const inputClass = (hasError?: boolean) =>
    `mt-2 w-full rounded-lg border ${
      hasError ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 bg-white focus:border-sky-500 focus:ring-sky-100'
    } px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:ring-2`
  const labelClass = 'block text-sm font-semibold text-slate-800'
  const card = 'space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs'

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <nav className="text-xs font-medium text-slate-400">
            <Link href="/admin" className="hover:text-slate-600">Admin</Link> / <Link href="/admin/posts" className="hover:text-slate-600">Blogs</Link> / New
          </nav>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Create New Article</h1>
          <p className="text-sm text-slate-500">Publish clinical articles using the visual editor or upload raw JSON.</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Editor Mode Toggle */}
          <div className="flex rounded-xl border border-slate-200 bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setCreationMode('editor')}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                creationMode === 'editor'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PenSquare className="h-3.5 w-3.5 text-sky-600" />
              <span>Standard Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setCreationMode('json')}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                creationMode === 'json'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileJson className="h-3.5 w-3.5 text-blue-600" />
              <span>Upload JSON</span>
            </button>
          </div>

          <Link
            href="/admin/posts"
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs"
          >
            All Posts
          </Link>
        </div>
      </div>

      {/* RENDER JSON UPLOADER IF MODE IS 'json' */}
      {creationMode === 'json' ? (
        <JsonBlogUploader />
      ) : (
        /* RENDER STANDARD BLOG EDITOR IF MODE IS 'editor' */
        <>
          {/* Status Alert Banner */}
          {statusMessage && (
            <div
              role="alert"
              className={`rounded-xl border p-4 text-sm ${
                statusMessage.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                  : 'border-red-200 bg-red-50 text-red-900'
              }`}
            >
              <div className="flex items-start gap-3">
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{statusMessage.text}</p>
                  {statusMessage.slug && (
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/blog/${statusMessage.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800"
                      >
                        <span>View Public Article</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href="/admin/posts"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:underline"
                      >
                        <span>Return to Posts Dashboard</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Section 1: Structure & Pillar Strategy */}
          <section className={card}>
            <h2 className="font-bold text-slate-900 border-b border-slate-100 pb-3">
              1. Structure & Pillar Architecture
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="pageType">Content Archetype</label>
                <select
                  id="pageType"
                  value={draft.pageType}
                  className={inputClass(false)}
                  onChange={(event) => {
                    const value = event.target.value as Draft['pageType']
                    setDraft((previous) => ({
                      ...previous,
                      pageType: value,
                      pillarSlug: value === 'cluster' ? previous.pillarSlug : '',
                    }))
                  }}
                >
                  <option value="article">Standard Article</option>
                  <option value="pillar">Core Pillar Page (Cornerstone Guide)</option>
                  <option value="cluster">Cluster Topic Page (Sub-topic linking to Pillar)</option>
                  <option value="standalone">Standalone Blog Post</option>
                </select>
                <p className="mt-1 text-xs text-slate-400">
                  Pillars anchor broad topics; cluster pages link into their parent pillar.
                </p>
              </div>

              {draft.pageType === 'cluster' ? (
                <div>
                  <label className={labelClass} htmlFor="pillarSlug">
                    Parent Pillar <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="pillarSlug"
                    value={draft.pillarSlug}
                    className={inputClass(Boolean(fieldErrors.pillarSlug))}
                    onChange={(event) => updateField('pillarSlug', event.target.value)}
                  >
                    <option value="">-- Select Parent Pillar --</option>
                    {pillars.map((pillar) => (
                      <option key={pillar.slug} value={pillar.slug}>
                        {pillar.title}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.pillarSlug && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.pillarSlug}</p>
                  )}
                </div>
              ) : (
                <div>
                  <label className={labelClass} htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="category"
                    value={draft.category}
                    onChange={(event) => updateField('category', event.target.value)}
                    className={inputClass(Boolean(fieldErrors.category))}
                    placeholder="e.g. Orthopedics, Cardiology, Pediatrics"
                  />
                  {fieldErrors.category && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.category}</p>
                  )}
                </div>
              )}

              {draft.pageType === 'cluster' && (
                <div>
                  <label className={labelClass} htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="category"
                    value={draft.category}
                    onChange={(event) => updateField('category', event.target.value)}
                    className={inputClass(Boolean(fieldErrors.category))}
                    placeholder="e.g. Orthopedics"
                  />
                  {fieldErrors.category && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.category}</p>
                  )}
                </div>
              )}

              <div>
                <label className={labelClass} htmlFor="tags">Tags (comma-separated)</label>
                <input
                  id="tags"
                  value={draft.tags.join(', ')}
                  onChange={(event) =>
                    updateField(
                      'tags',
                      event.target.value
                        .split(',')
                        .map((tag) => tag.trim())
                        .filter(Boolean)
                    )
                  }
                  className={inputClass(false)}
                  placeholder="knee surgery, recovery, pain management"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Article Details & Featured Image */}
          <section className={card}>
            <h2 className="font-bold text-slate-900 border-b border-slate-100 pb-3">
              2. Article Details
            </h2>

            {/* Title */}
            <div>
              <label className={labelClass} htmlFor="title">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                value={draft.title}
                onChange={(event) => onTitleChange(event.target.value)}
                className={inputClass(Boolean(fieldErrors.title))}
                placeholder="e.g. 5 Warning Signs You Should See an Orthopedic Doctor"
              />
              {fieldErrors.title && (
                <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.title}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className={labelClass} htmlFor="slug">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-2 flex items-center">
                <span className="inline-flex h-10 items-center rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 px-3 text-xs text-slate-500 font-mono">
                  /blog/
                </span>
                <input
                  id="slug"
                  value={draft.slug}
                  className={`h-10 w-full rounded-r-lg border ${
                    fieldErrors.slug ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
                  } px-3 text-sm font-mono text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100`}
                  onChange={(event) => {
                    setSlugEdited(true)
                    updateField('slug', slugify(event.target.value))
                  }}
                  placeholder="warning-signs-orthopedic-doctor"
                />
              </div>
              {fieldErrors.slug && (
                <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.slug}</p>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className={labelClass} htmlFor="excerpt">
                Excerpt / Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                id="excerpt"
                value={draft.excerpt}
                rows={3}
                maxLength={500}
                onChange={(event) => updateField('excerpt', event.target.value)}
                className={inputClass(Boolean(fieldErrors.excerpt))}
                placeholder="A compelling 2-sentence summary shown on cards and search results (max 500 characters)."
              />
              <div className="flex justify-between items-center mt-1 text-xs">
                {fieldErrors.excerpt ? (
                  <span className="text-red-600 font-medium">{fieldErrors.excerpt}</span>
                ) : (
                  <span className="text-slate-400">Used for search engine snippets & previews.</span>
                )}
                <span className="text-slate-400">{draft.excerpt.length}/500</span>
              </div>
            </div>

            {/* Featured Image with Cloudinary Upload */}
            <FeaturedImageUpload
              value={draft.image || draft.featuredImage || ''}
              altText={draft.imageAlt}
              onChange={(url) => {
                updateField('image', url)
                updateField('featuredImage', url)
              }}
              onAltChange={(alt) => updateField('imageAlt', alt)}
            />

            {/* SEO Meta Title & Focus Keyword */}
            <div className="grid gap-5 sm:grid-cols-2 pt-2">
              <div>
                <label className={labelClass} htmlFor="seoTitle">Meta SEO Title</label>
                <input
                  id="seoTitle"
                  value={draft.seoTitle || draft.title}
                  onChange={(event) => updateField('seoTitle', event.target.value)}
                  className={inputClass(false)}
                  placeholder="Article Title | Saharanpur Hospital"
                />
                <p className="mt-1 text-xs text-slate-400">Optimal length: 50-60 characters.</p>
              </div>

              <div>
                <label className={labelClass} htmlFor="primaryKeyword">Primary Keyword</label>
                <input
                  id="primaryKeyword"
                  value={draft.primaryKeyword}
                  onChange={(event) => updateField('primaryKeyword', event.target.value)}
                  className={inputClass(false)}
                  placeholder="e.g. orthopedic doctor in saharanpur"
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="metaDescription">Meta Description</label>
              <textarea
                id="metaDescription"
                value={draft.metaDescription || draft.excerpt}
                rows={2}
                onChange={(event) => updateField('metaDescription', event.target.value)}
                className={inputClass(false)}
                placeholder="Search snippet description for Google..."
              />
            </div>
          </section>

          {/* Section 3: Rich-Text Article Content */}
          <section className={card}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-bold text-slate-900">
                3. Article Content <span className="text-red-500">*</span>
              </h2>
              <span className="text-xs text-slate-400">Supports headings, lists, tables & images</span>
            </div>

            {fieldErrors.content && (
              <p className="text-xs text-red-600 font-medium">{fieldErrors.content}</p>
            )}

            <RichTextEditor
              value={draft.content}
              onChange={(value) => updateField('content', value)}
            />
          </section>

          {/* Section 4: Publication Actions */}
          <section className={card}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => save(false)}
                disabled={saving}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-50 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Draft'}
              </button>

              <button
                type="button"
                onClick={() => save(true)}
                disabled={saving}
                className="rounded-xl bg-slate-900 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50"
              >
                {saving ? 'Publishing...' : 'Publish to Website'}
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
