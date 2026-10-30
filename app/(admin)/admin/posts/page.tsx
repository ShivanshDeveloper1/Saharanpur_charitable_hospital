"use client"

import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  FileText,
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react'

interface PostItem {
  _id: string
  title: string
  slug: string
  category: string
  pageType: 'pillar' | 'cluster' | 'article' | 'standalone'
  pillarSlug?: string
  image?: string
  isPublished: boolean
  createdAt?: string
  updatedAt?: string
  date?: string
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters & search
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  // Modals & action states
  const [deleteTarget, setDeleteTarget] = useState<PostItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [actionMessage, setActionMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log('[AdminPosts] Fetching all posts from MongoDB...')
      const res = await fetch('/api/admin/blogs')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch posts.')
      setPosts(data.blogs || [])
    } catch (err: any) {
      console.error('[AdminPosts] Fetch error:', err)
      setError(err?.message || 'Failed to load blog posts from MongoDB.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // Quick toggle publish/unpublish
  const handleTogglePublish = async (post: PostItem) => {
    try {
      const nextStatus = !post.isPublished
      const res = await fetch('/api/admin/blogs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: post._id, isPublished: nextStatus }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update status.')

      setPosts((prev) =>
        prev.map((p) => (p._id === post._id ? { ...p, isPublished: nextStatus } : p))
      )
      setActionMessage({
        text: `"${post.title}" is now ${nextStatus ? 'Published' : 'a Draft'}.`,
        type: 'success',
      })
      setTimeout(() => setActionMessage(null), 4000)
    } catch (err: any) {
      setActionMessage({ text: err?.message || 'Failed to update status.', type: 'error' })
    }
  }

  // Confirm delete
  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      console.log('[AdminPosts] Deleting post:', deleteTarget._id)
      const res = await fetch(`/api/admin/blogs?id=${deleteTarget._id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to delete post.')

      setPosts((prev) => prev.filter((p) => p._id !== deleteTarget._id))
      setActionMessage({ text: 'Blog post deleted successfully.', type: 'success' })
      setDeleteTarget(null)
      setTimeout(() => setActionMessage(null), 4000)
    } catch (err: any) {
      setActionMessage({ text: err?.message || 'Failed to delete post.', type: 'error' })
    } finally {
      setIsDeleting(false)
    }
  }

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q))

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'published'
          ? p.isPublished
          : !p.isPublished

      const matchesType =
        typeFilter === 'all' || p.pageType === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })
  }, [posts, searchQuery, statusFilter, typeFilter])

  // Stats
  const totalCount = posts.length
  const publishedCount = posts.filter((p) => p.isPublished).length
  const draftCount = posts.filter((p) => !p.isPublished).length
  const pillarCount = posts.filter((p) => p.pageType === 'pillar').length
  const clusterCount = posts.filter((p) => p.pageType === 'cluster').length

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—'
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return '—'
    }
  }

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-10 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <nav className="text-xs font-medium text-slate-400">
            <Link href="/admin" className="hover:text-slate-600">Admin</Link> / All Posts
          </nav>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Blog Posts Management
          </h1>
          <p className="text-sm text-slate-500">
            Manage, edit, publish, and structure all clinical articles stored in MongoDB.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchPosts}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Article</span>
          </Link>
        </div>
      </div>

      {/* Action notification banner */}
      {actionMessage && (
        <div
          className={`rounded-xl border p-3.5 text-xs font-medium ${
            actionMessage.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : 'border-red-200 bg-red-50 text-red-900'
          }`}
        >
          {actionMessage.text}
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">Total Posts</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{totalCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">Published</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{publishedCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">Drafts</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{draftCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">Pillar Pages</p>
          <p className="mt-1 text-2xl font-bold text-indigo-600">{pillarCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">Cluster Pages</p>
          <p className="mt-1 text-2xl font-bold text-sky-600">{clusterCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, slug, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter */}
          <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`rounded-md px-3 py-1 font-medium transition ${
                statusFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('published')}
              className={`rounded-md px-3 py-1 font-medium transition ${
                statusFilter === 'published'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Published
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('draft')}
              className={`rounded-md px-3 py-1 font-medium transition ${
                statusFilter === 'draft'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Drafts
            </button>
          </div>

          {/* Archetype filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition focus:border-blue-500"
          >
            <option value="all">All Archetypes</option>
            <option value="pillar">Pillar Pages</option>
            <option value="cluster">Cluster Pages</option>
            <option value="article">Articles</option>
            <option value="standalone">Standalone Blogs</option>
          </select>
        </div>
      </div>

      {/* Main Table / State Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        {loading ? (
          <div className="p-16 text-center">
            <RefreshCw className="mx-auto h-8 w-8 animate-spin text-blue-600" />
            <p className="mt-3 text-sm font-medium text-slate-600">Loading blog posts from MongoDB...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-red-500" />
            <h3 className="mt-2 text-sm font-semibold text-slate-900">Database Connection Error</h3>
            <p className="mt-1 text-xs text-slate-500">{error}</p>
            <button
              type="button"
              onClick={fetchPosts}
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
            >
              Try Again
            </button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-900">No blog posts found</h3>
            <p className="mt-1 text-xs text-slate-500">
              {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your search filters.'
                : 'Get started by creating your first healthcare article.'}
            </p>
            <Link
              href="/admin/blogs/new"
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>Create Article</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">Article</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Archetype</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Created</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPosts.map((post) => {
                  const hasValidImage =
                    post.image &&
                    (post.image.startsWith('http') || post.image.startsWith('/'))

                  return (
                    <tr key={post._id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Image & Title */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
                            {hasValidImage ? (
                              <img
                                src={post.image!}
                                alt={post.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-slate-400">
                                <FileText className="h-5 w-5" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 max-w-md">
                            <h3 className="truncate font-semibold text-slate-900 hover:text-blue-600">
                              <Link href={`/admin/blogs/${post._id}/edit`}>
                                {post.title}
                              </Link>
                            </h3>
                            <p className="truncate text-xs font-mono text-slate-400">
                              /blog/{post.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-4">
                        <span className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          {post.category || 'General'}
                        </span>
                      </td>

                      {/* Archetype */}
                      <td className="px-4 py-4">
                        {post.pageType === 'pillar' ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 border border-purple-200">
                            <Layers className="h-3 w-3" />
                            Pillar
                          </span>
                        ) : post.pageType === 'cluster' ? (
                          <div className="space-y-0.5">
                            <span className="inline-block rounded-md bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-700 border border-sky-200">
                              Cluster
                            </span>
                            {post.pillarSlug && (
                              <p className="text-[10px] text-slate-400 truncate max-w-[120px]">
                                → {post.pillarSlug}
                              </p>
                            )}
                          </div>
                        ) : post.pageType === 'standalone' ? (
                          <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                            Standalone
                          </span>
                        ) : (
                          <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                            Article
                          </span>
                        )}
                      </td>

                      {/* Status Toggle */}
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(post)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                            post.isPublished
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                          }`}
                          title="Click to toggle publish status"
                        >
                          {post.isPublished ? (
                            <>
                              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 text-amber-600" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Created / Date */}
                      <td className="px-4 py-4 text-xs text-slate-500 whitespace-nowrap">
                        {formatDate(post.createdAt || post.date)}
                      </td>

                      {/* Action buttons */}
                      <td className="px-4 py-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {/* Live preview */}
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                            title="View public page"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>

                          {/* Edit */}
                          <Link
                            href={`/admin/blogs/${post._id}/edit`}
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600"
                            title="Edit article"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Link>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(post)}
                            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                            title="Delete article"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3 text-red-600">
              <div className="rounded-full bg-red-100 p-2.5">
                <Trash2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Delete Blog Post?</h3>
            </div>

            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Are you sure you want to delete{' '}
              <strong className="text-slate-900 font-semibold">"{deleteTarget.title}"</strong>?
              This will permanently remove the article from MongoDB and can break active links.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

