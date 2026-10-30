"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import RichTextEditor from '@/components/(admin)/admin/RichTextEditor'
import FeaturedImageUpload from '@/components/(admin)/admin/FeaturedImageUpload'
import { CheckCircle2, AlertCircle, ExternalLink, ArrowLeft, Eye } from 'lucide-react'

type Pillar = { slug: string; title: string }

interface BlogEditorProps {
  blogId: string
}

function blocksToHtml(content: any): string {
  if (!content) return '<p></p>'

  if (typeof content === 'string') {
    return content
  }

  if (Array.isArray(content)) {
    return content
      .map((block: any) => {
        if (block.type === 'paragraph' && block.segments) {
          const inner = block.segments
            .map((seg: any) =>
              seg.isLink && seg.slug
                ? `<a href="/blog/${seg.slug}">${seg.text}</a>`
                : seg.text
            )
            .join('')
          return `<p>${inner}</p>`
        }
        if (block.type === 'heading') {
          const text = block.segments?.[0]?.text || ''
          return `<h2>${text}</h2>`
        }
        if (block.type === 'list' && block.items) {
          const items = block.items.map((it: string) => `<li>${it}</li>`).join('')
          return `<ul>${items}</ul>`
        }
        return ''
      })
      .join('\n')
  }

  return '<p></p>'
}

export default function BlogEditor({ blogId }: BlogEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [pillars, setPillars] = useState<Pillar[]>([])
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error'
    text: string
    slug?: string
  } | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    imageAlt: '',
    category: '',
    tags: [] as string[],
    pageType: 'article' as 'pillar' | 'cluster' | 'article' | 'standalone',
    pillarSlug: '',
    seoTitle: '',
    metaDescription: '',
    primaryKeyword: '',
    secondaryKeywords: [] as string[],
    canonicalUrl: '',
    isPublished: false,
    author: 'Clinical Team',
  })

  // 1. Fetch pillars
  useEffect(() => {
    fetch('/api/admin/blogs/pillars')
      .then((res) => res.json())
      .then((data) => setPillars(data.pillars || []))
      .catch((err) => console.error('[BlogEditor] Failed to fetch pillars:', err))
  }, [])

  // 2. Fetch the blog by ID
  useEffect(() => {
    async function fetchBlog() {
      setLoading(true)
      try {
        console.log('[BlogEditor] Fetching blog by ID:', blogId)
        const res = await fetch(`/api/admin/blogs?id=${blogId}`)
        const data = await res.json()

        if (!res.ok || !data.blog) {
          throw new Error(data.error || 'Failed to load blog.')
        }

        const b = data.blog
        const contentStr =
          typeof b.content === 'string'
            ? b.content
            : b.contentHtml || blocksToHtml(b.content)

        setFormData({
          title: b.title || '',
          slug: b.slug || '',
          excerpt: b.excerpt || b.description || '',
          content: contentStr,
          image: b.image || '',
          imageAlt: b.imageAlt || '',
          category: b.category || '',
          tags: Array.isArray(b.tags) ? b.tags : [],
          pageType: b.pageType || 'article',
          pillarSlug: b.pillarSlug || '',
          seoTitle: b.seoTitle || '',
          metaDescription: b.metaDescription || '',
          primaryKeyword: b.primaryKeyword || '',
          secondaryKeywords: Array.isArray(b.secondaryKeywords) ? b.secondaryKeywords : [],
          canonicalUrl: b.canonicalUrl || '',
          isPublished: Boolean(b.isPublished),
          author: b.author || 'Clinical Team',
        })
      } catch (err: any) {
        console.error('[BlogEditor] Fetch error:', err)
        setStatusMessage({
          type: 'error',
          text: err.message || 'Could not load article for editing.',
        })
      } finally {
        setLoading(false)
      }
    }

    if (blogId) {
      fetchBlog()
    }
  }, [blogId])

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  function validate(): boolean {
    const errors: Record<string, string> = {}
    if (!formData.title.trim()) errors.title = 'Title is required.'
    if (!formData.slug.trim()) errors.slug = 'Slug is required.'
    if (!formData.excerpt.trim()) errors.excerpt = 'Excerpt / summary is required.'
    if (!formData.content.trim()) errors.content = 'Content cannot be empty.'
    if (!formData.category.trim()) errors.category = 'Category is required.'
    if (formData.pageType === 'cluster' && !formData.pillarSlug) {
      errors.pillarSlug = 'Select a parent pillar for cluster articles.'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSave(publishState?: boolean) {
    if (!validate()) {
      setStatusMessage({
        type: 'error',
        text: 'Please resolve the highlighted validation errors before saving.',
      })
      window.scrollTo({ top: 100, behavior: 'smooth' })
      return
    }

    setSaving(true)
    setStatusMessage(null)

    const shouldPublish =
      publishState !== undefined ? publishState : formData.isPublished

    try {
      console.log('[BlogEditor] Saving blog update:', blogId)
      const payload = {
        id: blogId,
        ...formData,
        isPublished: shouldPublish,
        pillarSlug: formData.pageType === 'cluster' ? formData.pillarSlug : '',
      }

      const response = await fetch('/api/admin/blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update article.')
      }

      setFormData((prev) => ({ ...prev, isPublished: shouldPublish }))
      setStatusMessage({
        type: 'success',
        text: shouldPublish
          ? 'Article updated and published live!'
          : 'Changes saved successfully (Draft).',
        slug: formData.slug,
      })
    } catch (err: any) {
      console.error('[BlogEditor] Update error:', err)
      setStatusMessage({
        type: 'error',
        text: err.message || 'Could not save changes.',
      })
    } finally {
      setSaving(false)
    }
  }

  const inputClass = (hasError?: boolean) =>
    `mt-2 w-full rounded-lg border ${
      hasError
        ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-100'
        : 'border-slate-200 bg-white focus:border-sky-500 focus:ring-sky-100'
    } px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:ring-2`
  const labelClass = 'block text-sm font-semibold text-slate-800'
  const card = 'space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs'

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-sky-600 border-t-transparent" />
        <p className="mt-3 text-sm font-medium text-slate-600">Loading article editor...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <nav className="text-xs font-medium text-slate-400">
            <Link href="/admin" className="hover:text-slate-600">Admin</Link> /{' '}
            <Link href="/admin/posts" className="hover:text-slate-600">Blogs</Link> / Edit
          </nav>
          <div className="mt-1 flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Edit Article
            </h1>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                formData.isPublished
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {formData.isPublished ? 'Published' : 'Draft'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {formData.slug && (
            <Link
              href={`/blog/${formData.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Preview Live</span>
            </Link>
          )}
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Posts</span>
          </Link>
        </div>
      </div>

      {/* Status banner */}
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
                <div className="mt-2">
                  <Link
                    href={`/blog/${statusMessage.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 underline underline-offset-2 hover:opacity-80"
                  >
                    <span>View updated article page</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Structure & Archetype */}
      <section className={card}>
        <h2 className="font-bold text-slate-900 border-b border-slate-100 pb-3">
          1. Structure & Pillar Architecture
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="pageType">Archetype</label>
            <select
              id="pageType"
              value={formData.pageType}
              className={inputClass(false)}
              onChange={(e) => updateField('pageType', e.target.value)}
            >
              <option value="article">Standard Article</option>
              <option value="pillar">Core Pillar Page</option>
              <option value="cluster">Cluster Topic Page</option>
              <option value="standalone">Standalone Blog Post</option>
            </select>
          </div>

          {formData.pageType === 'cluster' ? (
            <div>
              <label className={labelClass} htmlFor="pillarSlug">
                Parent Pillar <span className="text-red-500">*</span>
              </label>
              <select
                id="pillarSlug"
                value={formData.pillarSlug}
                className={inputClass(Boolean(fieldErrors.pillarSlug))}
                onChange={(e) => updateField('pillarSlug', e.target.value)}
              >
                <option value="">-- Select Parent Pillar --</option>
                {pillars.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.title}
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
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
                className={inputClass(Boolean(fieldErrors.category))}
              />
              {fieldErrors.category && (
                <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.category}</p>
              )}
            </div>
          )}

          {formData.pageType === 'cluster' && (
            <div>
              <label className={labelClass} htmlFor="category">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                id="category"
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
                className={inputClass(Boolean(fieldErrors.category))}
              />
            </div>
          )}

          <div>
            <label className={labelClass} htmlFor="tags">Tags</label>
            <input
              id="tags"
              value={formData.tags.join(', ')}
              onChange={(e) =>
                updateField(
                  'tags',
                  e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                )
              }
              className={inputClass(false)}
            />
          </div>
        </div>
      </section>

      {/* Article Details & Featured Image */}
      <section className={card}>
        <h2 className="font-bold text-slate-900 border-b border-slate-100 pb-3">
          2. Content & Media
        </h2>

        {/* Title */}
        <div>
          <label className={labelClass} htmlFor="title">
            Article Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            className={inputClass(Boolean(fieldErrors.title))}
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
              value={formData.slug}
              className={`h-10 w-full rounded-r-lg border ${
                fieldErrors.slug ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
              } px-3 text-sm font-mono text-slate-800 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100`}
              onChange={(e) => updateField('slug', e.target.value)}
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
            value={formData.excerpt}
            rows={3}
            maxLength={500}
            onChange={(e) => updateField('excerpt', e.target.value)}
            className={inputClass(Boolean(fieldErrors.excerpt))}
          />
          {fieldErrors.excerpt && (
            <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.excerpt}</p>
          )}
        </div>

        {/* Cloudinary Featured Image */}
        <FeaturedImageUpload
          value={formData.image}
          altText={formData.imageAlt}
          onChange={(url) => updateField('image', url)}
          onAltChange={(alt) => updateField('imageAlt', alt)}
        />

        {/* SEO Fields */}
        <div className="grid gap-5 sm:grid-cols-2 pt-2">
          <div>
            <label className={labelClass} htmlFor="seoTitle">Meta SEO Title</label>
            <input
              id="seoTitle"
              value={formData.seoTitle}
              onChange={(e) => updateField('seoTitle', e.target.value)}
              className={inputClass(false)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="primaryKeyword">Primary Focus Keyword</label>
            <input
              id="primaryKeyword"
              value={formData.primaryKeyword}
              onChange={(e) => updateField('primaryKeyword', e.target.value)}
              className={inputClass(false)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="metaDescription">Meta Description</label>
          <textarea
            id="metaDescription"
            value={formData.metaDescription}
            rows={2}
            onChange={(e) => updateField('metaDescription', e.target.value)}
            className={inputClass(false)}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="canonicalUrl">Canonical URL</label>
          <input
            id="canonicalUrl"
            value={formData.canonicalUrl}
            onChange={(e) => updateField('canonicalUrl', e.target.value)}
            className={inputClass(false)}
            placeholder="https://..."
          />
        </div>
      </section>

      {/* Rich-Text Content Section */}
      <section className={card}>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="font-bold text-slate-900">
            3. Article Content <span className="text-red-500">*</span>
          </h2>
          <span className="text-xs text-slate-400">Tiptap Rich-Text Editor</span>
        </div>

        {fieldErrors.content && (
          <p className="text-xs text-red-600 font-medium">{fieldErrors.content}</p>
        )}

        <RichTextEditor
          value={formData.content}
          onChange={(val) => updateField('content', val)}
        />
      </section>

      {/* Action Footer */}
      <section className={card}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              Current state: <strong>{formData.isPublished ? 'Published' : 'Draft'}</strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={saving}
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save as Draft'}
            </button>

            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={saving}
              className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-slate-800 disabled:opacity-50"
            >
              {saving ? 'Saving...' : formData.isPublished ? 'Update Published Post' : 'Save & Publish Live'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

