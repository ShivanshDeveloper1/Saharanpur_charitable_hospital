import Image from 'next/image'
import React from 'react'
import type { Metadata } from 'next'
import BlogSection, { BlogPostCardItem } from '@/components/(Blog)/BlogSection'
import { connectDB } from '@/lib/db'
import BlogPost from '@/models/Blog'
import { BLOG_POSTS } from '@/data/BlogData'
import { SITE } from '@/lib/site'
import { getSafeImageUrl } from '@/lib/image-utils'

export const revalidate = 60 // Revalidate cache every 60 seconds

export const metadata: Metadata = {
  title: 'Health & Medical Insights | Clinical Guides & Tips',
  description:
    'Explore expert clinical insights and practical medical guidance on symptoms, treatments, surgery advancements, and preventive health.',
  alternates: {
    canonical: `${SITE.url}/blog`,
  },
  openGraph: {
    title: 'Healthcare Insights & Medical Blog | Saharanpur Hospital',
    description:
      'Explore expert clinical insights, doctor-reviewed healthcare articles, and treatment options.',
    url: `${SITE.url}/blog`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthcare Insights & Medical Blog',
    description:
      'Explore expert clinical insights and practical guidance on healthcare, treatments, and medical advancements.',
  },
}

async function getPublishedBlogs(): Promise<BlogPostCardItem[]> {
  try {
    console.log('[Blog Listing] Fetching published blogs from MongoDB...')
    await connectDB()
    const dbPosts = await BlogPost.find({ isPublished: true })
      .sort({ date: -1, createdAt: -1 })
      .lean()

    if (dbPosts && dbPosts.length > 0) {
      console.log(`[Blog Listing] Loaded ${dbPosts.length} published blogs from MongoDB.`)
      return dbPosts.map((doc: any) => ({
        _id: String(doc._id),
        title: doc.title,
        slug: doc.slug,
        category: doc.category || 'General',
        excerpt: doc.excerpt || doc.description || '',
        image: getSafeImageUrl(doc.image),
        author: doc.author || 'Clinical Team',
        readTime: doc.readTime || '5 min read',
        date: doc.date ? new Date(doc.date).toISOString() : new Date().toISOString(),
        publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toISOString() : undefined,
        pageType: doc.pageType || 'article',
      }))
    }
  } catch (error) {
    console.error('[Blog Listing] MongoDB fetch failed, falling back to static dataset:', error)
  }

  // Fallback if database is initially empty
  return BLOG_POSTS.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    excerpt: p.excerpt,
    image: getSafeImageUrl(p.image),
    author: p.author,
    readTime: p.readTime,
    date: p.date,
    publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : undefined,
    pageType: 'article',
  }))
}

export default async function BlogPage() {
  const posts = await getPublishedBlogs()

  return (
    <main className="bg-background text-foreground">
      {/* Hero Banner */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden sm:min-h-[55vh]">
        <div className="absolute inset-0">
          <Image
            src="/blog/Hero.avif"
            alt="Healthcare insights and medical information"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Brand-colored Overlay */}
        <div className="absolute inset-0 bg-primary-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-medical-line/40" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
              Clinical Insights & Health Guides
            </span>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl font-serif">
              Expert Health <span className="text-accent-red">Knowledge</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              Explore evidence-based insights, treatment guides, and preventive healthcare advice reviewed by our medical specialists.
            </p>

            <div className="mt-6 h-1 w-20 rounded-full bg-accent-red" />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Blog Listing Grid */}
      <BlogSection initialPosts={posts} />
    </main>
  )
}
