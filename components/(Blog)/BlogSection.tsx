'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getSafeImageUrl } from '@/lib/image-utils'
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react'

export interface BlogPostCardItem {
  id?: string | number
  _id?: string
  title: string
  slug: string
  category: string
  date?: string | Date
  publishedAt?: string | Date
  image?: string
  excerpt?: string
  description?: string
  author?: string
  readTime?: string
  pageType?: string
}

interface BlogSectionProps {
  initialPosts: BlogPostCardItem[]
}

export default function BlogSection({ initialPosts = [] }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Dynamically extract unique categories from actual database posts
  const categories = useMemo(() => {
    const dynamicCategories = Array.from(
      new Set(initialPosts.map((post) => post.category).filter(Boolean))
    )
    return ['All', ...dynamicCategories]
  }, [initialPosts])

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory

      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        (post.category && post.category.toLowerCase().includes(query)) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [initialPosts, selectedCategory, searchQuery])

  const formatCardDate = (dateVal?: string | Date) => {
    if (!dateVal) return 'Recent'
    try {
      const d = typeof dateVal === 'string' ? new Date(dateVal) : dateVal
      if (isNaN(d.getTime())) return String(dateVal)
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return String(dateVal)
    }
  }

  return (
    <section
      aria-labelledby="blog-heading"
      className="bg-background py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Search & Filter Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          {/* Search Input */}
          <div className="w-full sm:max-w-md">
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <input
              id="blog-search"
              type="search"
              placeholder="Search health topics, treatments, symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-xl border border-medical-line/20 bg-surface px-4 text-sm text-foreground outline-none transition placeholder:text-text-muted focus:border-accent-red focus:ring-4 focus:ring-accent-red/10"
            />
          </div>

          <div className="text-xs text-text-muted font-medium">
            Showing {filteredPosts.length} of {initialPosts.length} articles
          </div>
        </div>

        {/* Categories Bar */}
        <div
          className="mb-10 flex gap-2 overflow-x-auto border-b border-medical-line/15 pb-4 scrollbar-none"
          aria-label="Filter articles by category"
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-colors ${
                  isActive
                    ? 'bg-accent-red text-white shadow-xs'
                    : 'bg-medical-blue/30 text-foreground hover:bg-medical-blue/60'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => {
              const postKey = String(post._id || post.id || post.slug)
              const postExcerpt = post.excerpt || post.description || ''
              const safeImage = getSafeImageUrl(post.image)

              return (
                <article
                  key={postKey}
                  className="group flex flex-col rounded-2xl border border-medical-line/15 bg-surface overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                >
                  {/* Article Thumbnail */}
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read article: ${post.title}`}
                    className="relative block aspect-[16/10] w-full overflow-hidden bg-medical-blue/20"
                  >
                    <img
                      src={safeImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Category pill on image */}
                    {post.category && (
                      <span className="absolute left-3 top-3 rounded-md bg-accent-red px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs">
                        {post.category}
                      </span>
                    )}
                  </Link>

                  {/* Article details */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-medical-line" />
                        {formatCardDate(post.publishedAt || post.date)}
                      </span>
                      {post.readTime && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-medical-line" />
                            {post.readTime}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-accent-red font-serif">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    {postExcerpt && (
                      <p className="mt-3 line-clamp-3 text-sm text-text-muted leading-relaxed">
                        {postExcerpt}
                      </p>
                    )}

                    {/* Footer link */}
                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-medical-line/10">
                      <span className="text-xs font-semibold text-text-muted">
                        By {post.author || 'Clinical Team'}
                      </span>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent-red hover:underline"
                      >
                        <span>Read More</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-medical-line/15 bg-surface px-5 py-16 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              No matching articles found
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              Try adjusting your search query or selecting a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="mt-5 inline-flex items-center rounded-xl bg-accent-red px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:opacity-90"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
