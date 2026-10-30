"use client"

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import {
  UploadCloud,
  FileCode,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
  Eye,
  ArrowRight,
  HelpCircle,
} from 'lucide-react'
import { validateBlogJson, ValidatedBlogPayload } from './json-validator'

const SAMPLE_BLOG_JSON = {
  title: "Comprehensive Joint Health and Arthritis Management Guide",
  slug: "comprehensive-joint-health-arthritis-guide",
  excerpt: "A practical clinical overview on identifying early arthritis warning signs, daily joint-friendly habits, and specialist treatments in Western UP.",
  category: "Orthopedics",
  pageType: "article",
  author: "Dr. Orthopedic Clinical Team",
  readTime: "6 min read",
  image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
  imageAlt: "Orthopedic specialist evaluating knee joint scan",
  tags: ["orthopedics", "joint pain", "arthritis", "saharanpur"],
  seoTitle: "Joint Health & Arthritis Care Guide | Saharanpur Hospital",
  metaDescription: "Learn key symptoms of arthritis, joint preservation exercises, and medical treatments available at Saharanpur Hospital.",
  primaryKeyword: "joint health arthritis saharanpur",
  secondaryKeywords: ["knee pain doctor", "joint stiffness treatment"],
  canonicalUrl: "",
  isPublished: true,
  content: `<h2>Understanding Joint Degradation & Early Indicators</h2>
<p>Musculoskeletal stiffness is among the most frequent clinical presentations in active adults. Early intervention preserves cartilage integrity and prevents long-term mobility loss.</p>

<h3>Stages of Cartilage Wear</h3>
<table>
  <thead>
    <tr>
      <th>Stage</th>
      <th>Key Symptoms</th>
      <th>Recommended Medical Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Stage 1 (Early)</td>
      <td>Occasional joint discomfort after long standing</td>
      <td>Physical therapy, low-impact exercise</td>
    </tr>
    <tr>
      <td>Stage 2 (Moderate)</td>
      <td>Morning stiffness exceeding 20 minutes</td>
      <td>Anti-inflammatory care, specialist consultation</td>
    </tr>
    <tr>
      <td>Stage 3 (Advanced)</td>
      <td>Persistent pain, bone spurs, severe restriction</td>
      <td>Joint preservation therapy or arthroplasty</td>
    </tr>
  </tbody>
</table>

<h3>Daily Habits to Protect Your Joints</h3>
<ul>
  <li>Maintain a low-impact exercise regimen such as brisk walking or swimming.</li>
  <li>Strengthen quadriceps and hamstring groups to alleviate knee compression.</li>
  <li>Maintain optimal hydration and anti-inflammatory nutrition.</li>
</ul>

<blockquote>Timely orthopedic evaluation prevents irreversible joint surface damage and ensures sustained active living.</blockquote>

<p>For persistent swelling or pain lasting over two weeks, visit our clinical center in Saharanpur for a digital radiological assessment.</p>`
}

export default function JsonBlogUploader() {
  const [mode, setMode] = useState<'paste' | 'file'>('paste')
  const [jsonText, setJsonText] = useState('')
  const [selectedFileName, setSelectedFileName] = useState('')
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean
    errors: string[]
    warnings: string[]
    data?: ValidatedBlogPayload
  } | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionProgress, setSubmissionProgress] = useState<string>('')
  const [copiedSample, setCopiedSample] = useState(false)
  const [successResponse, setSuccessResponse] = useState<{
    blogId: string
    slug: string
    title: string
    message: string
  } | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Handle file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFileName(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      setJsonText(text)
      runValidation(text)
    }
    reader.readAsText(file)
  }

  // Live validator
  const runValidation = (rawJson: string) => {
    setErrorMessage(null)
    setSuccessResponse(null)

    if (!rawJson.trim()) {
      setValidationResult(null)
      return
    }

    try {
      const parsed = JSON.parse(rawJson)
      const res = validateBlogJson(parsed)
      setValidationResult(res)
    } catch (err: any) {
      setValidationResult({
        isValid: false,
        errors: [`JSON Syntax Error: ${err.message}`],
        warnings: [],
      })
    }
  }

  // Prettify / Format JSON
  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonText)
      setJsonText(JSON.stringify(parsed, null, 2))
      runValidation(JSON.stringify(parsed, null, 2))
    } catch (err: any) {
      setErrorMessage(`Cannot format invalid JSON: ${err.message}`)
    }
  }

  // Copy sample
  const handleLoadSample = () => {
    const formatted = JSON.stringify(SAMPLE_BLOG_JSON, null, 2)
    setJsonText(formatted)
    runValidation(formatted)
    setCopiedSample(true)
    setTimeout(() => setCopiedSample(false), 2000)
  }

  // Submit to API
  const handleSubmit = async () => {
    if (!validationResult || !validationResult.isValid || !validationResult.data) {
      setErrorMessage('Please fix all validation errors before uploading.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)
    setSuccessResponse(null)
    setSubmissionProgress('Validating payload & uploading images to Cloudinary...')

    try {
      console.log('[JsonBlogUploader] Submitting blog to /api/admin/blogs/json-upload...')
      const response = await fetch('/api/admin/blogs/json-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validationResult.data),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || (data.details ? data.details.join(' ') : 'Upload failed.'))
      }

      console.log('[JsonBlogUploader] Upload successful:', data)
      setSuccessResponse({
        blogId: data.blogId,
        slug: data.slug,
        title: data.title,
        message: data.message,
      })
    } catch (err: any) {
      console.error('[JsonBlogUploader] Error:', err)
      setErrorMessage(err.message || 'Failed to upload blog JSON.')
    } finally {
      setIsSubmitting(false)
      setSubmissionProgress('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Success Banner */}
      {successResponse && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950 shadow-xs">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600 mt-0.5" />
            <div className="flex-1 space-y-2">
              <h3 className="text-base font-bold text-emerald-900">
                {successResponse.message}
              </h3>
              <p className="text-xs text-emerald-800">
                Article <strong className="font-semibold">"{successResponse.title}"</strong> has been saved directly to MongoDB. All images are processed and optimized.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/blog/${successResponse.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Public Article</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>

                <Link
                  href={`/admin/blogs/${successResponse.blogId}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-white px-4 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100/50"
                >
                  <span>Edit in Dashboard</span>
                </Link>

                <Link
                  href="/admin/posts"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-900 underline underline-offset-4 hover:opacity-80"
                >
                  <span>Go to All Posts</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-900">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">Upload Error</p>
            <p className="mt-0.5 leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Main Upload Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <FileCode className="h-5 w-5 text-sky-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">Direct JSON Blog Importer</h2>
              <p className="text-xs text-slate-500">
                Upload or paste structured JSON matching your MongoDB blog model.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
              title="Fill editor with a complete, valid sample blog"
            >
              {copiedSample ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedSample ? 'Sample Loaded!' : 'Load Sample JSON'}</span>
            </button>

            {mode === 'paste' && jsonText && (
              <button
                type="button"
                onClick={handleFormat}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Prettify JSON
              </button>
            )}
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setMode('paste')}
            className={`rounded-lg px-4 py-2 font-semibold transition ${
              mode === 'paste'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Paste JSON Text
          </button>
          <button
            type="button"
            onClick={() => setMode('file')}
            className={`rounded-lg px-4 py-2 font-semibold transition ${
              mode === 'file'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Upload .json File
          </button>
        </div>

        {/* Input Area */}
        {mode === 'paste' ? (
          <div>
            <textarea
              value={jsonText}
              onChange={(e) => {
                setJsonText(e.target.value)
                runValidation(e.target.value)
              }}
              rows={16}
              placeholder={`{\n  "title": "Article Title",\n  "slug": "article-slug",\n  "excerpt": "Short summary...",\n  "category": "Orthopedics",\n  "pageType": "article",\n  "content": "<h2>Overview</h2><p>Article body...</p>"\n}`}
              className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-sky-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              spellCheck={false}
            />
          </div>
        ) : (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-12 text-center transition hover:border-sky-500 hover:bg-sky-50/20"
            >
              <UploadCloud className="h-10 w-10 text-sky-600 mb-2" />
              <p className="text-sm font-semibold text-slate-800">
                {selectedFileName ? selectedFileName : 'Click to select a .json blog file'}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Select your structured JSON file from disk.
              </p>
            </div>
          </div>
        )}

        {/* Validation Status & Preview */}
        {validationResult && (
          <div className="space-y-4 pt-2">
            {validationResult.isValid ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>JSON Structure is Valid & Ready for MongoDB!</span>
                </div>

                {validationResult.warnings.length > 0 && (
                  <div className="mt-2 space-y-1 text-[11px] text-amber-700">
                    {validationResult.warnings.map((w, idx) => (
                      <p key={idx}>• {w}</p>
                    ))}
                  </div>
                )}

                {/* Quick Data Summary Card */}
                {validationResult.data && (
                  <div className="mt-3 rounded-lg border border-emerald-100 bg-white p-3 text-xs text-slate-700 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 truncate max-w-md">
                        {validationResult.data.title}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                        {validationResult.data.pageType}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-[11px] text-slate-500 font-mono">
                      <span>slug: /blog/{validationResult.data.slug}</span>
                      <span>category: {validationResult.data.category}</span>
                      <span>readTime: {validationResult.data.readTime}</span>
                    </div>
                    {validationResult.data.image && (
                      <div className="text-[11px] text-slate-500 truncate">
                        Featured Image: {validationResult.data.image}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-red-200 bg-red-50/60 p-4">
                <div className="flex items-center gap-2 text-red-800 font-bold text-xs mb-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span>Validation Errors Detected ({validationResult.errors.length}):</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-red-700">
                  {validationResult.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Submit Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-5">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
            <span>Base64 images inside JSON are automatically uploaded to Cloudinary on submission.</span>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !validationResult?.isValid}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-40"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>{submissionProgress || 'Processing...'}</span>
              </>
            ) : (
              <>
                <UploadCloud className="h-4 w-4" />
                <span>Upload & Publish to MongoDB</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

