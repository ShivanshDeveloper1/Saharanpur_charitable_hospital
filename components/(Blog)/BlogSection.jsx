'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BLOG_POSTS } from '@/data/BlogData'

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Dynamically extract unique categories from dataset
  const categories = useMemo(() => {
    const dynamicCategories = Array.from(
      new Set(BLOG_POSTS.map((post) => post.category).filter(Boolean))
    )
    return ['All', ...dynamicCategories]
  }, [])

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        post.category === selectedCategory

      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <section
      aria-labelledby="blog-heading"
      className="bg-background py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Search */}
        <div className="mb-5">
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>

          <input
            id="blog-search"
            type="search"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-xl border border-medical-line/20 bg-surface px-4 text-sm text-foreground outline-none transition placeholder:text-text-muted focus:border-accent-red focus:ring-4 focus:ring-accent-red/10 sm:max-w-sm"
          />
        </div>

        {/* Categories (Dynamically Generated) */}
        <div
          className="mb-8 flex gap-2 overflow-x-auto border-b border-medical-line/15 pb-5"
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
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-medical-line text-white'
                    : 'bg-medical-blue/50 text-foreground hover:bg-medical-blue'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post.id} className="group min-w-0">

                {/* Rounded image */}
                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={`Read ${post.title}`}
                  className="relative mb-4 block aspect-[16/10] overflow-hidden rounded-2xl bg-medical-blue"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="rounded-2xl object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </Link>

                {/* Article details */}
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span>{post.date}</span>
                  <span aria-hidden="true">•</span>
                  <span className="font-semibold text-medical-line">
                    {post.category}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-accent-red sm:text-xl">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-medical-line/15 bg-surface px-5 py-12 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              No articles found
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              Try another search or choose a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="mt-4 text-sm font-semibold text-accent-red hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </section>
  )
}