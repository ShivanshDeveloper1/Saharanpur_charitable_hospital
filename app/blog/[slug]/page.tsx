import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/db'
import BlogPost, { IBlogPost } from '@/models/Blog'
import { BLOG_POSTS } from '@/data/BlogData'
import { SITE } from '@/lib/site'
import BlogContentRenderer from '@/components/(Blog)/BlogContentRenderer'
import RelatedStories from '@/components/(Blog)/RelatedStories'
import SidebarForm from '@/components/(Blog)/SidebarForm'
import RelatedArticlesSidebar from '@/components/(Blog)/RelatedArticlesSidebar'
import { getSafeImageUrl } from '@/lib/image-utils'
import { Calendar, Clock, User, ShieldCheck, ChevronRight, Layers, ArrowLeft } from 'lucide-react'

export const revalidate = 60

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPostBySlug(slug: string) {
  try {
    await connectDB()
    const dbPost = await BlogPost.findOne({ slug }).lean()
    if (dbPost) {
      return {
        ...dbPost,
        image: getSafeImageUrl(dbPost.image),
        _id: String(dbPost._id),
      } as unknown as IBlogPost
    }
  } catch (err) {
    console.error('[BlogPost Page] MongoDB fetch by slug failed:', err)
  }

  // Fallback to static data
  const staticPost = BLOG_POSTS.find((p) => p.slug === slug)
  if (staticPost) {
    return {
      _id: String(staticPost.id),
      title: staticPost.title,
      slug: staticPost.slug,
      excerpt: staticPost.excerpt,
      description: staticPost.excerpt,
      image: staticPost.image,
      imageAlt: staticPost.title,
      category: staticPost.category,
      categorySlug: staticPost.category.toLowerCase(),
      author: staticPost.author,
      verifiedBy: staticPost.verifiedBy,
      readTime: staticPost.readTime,
      date: new Date(staticPost.date),
      content: staticPost.content,
      contentHtml: '',
      seoTitle: staticPost.title,
      metaDescription: staticPost.excerpt,
      primaryKeyword: '',
      secondaryKeywords: [],
      internalLinks: [],
      canonicalUrl: '',
      pageType: 'article' as const,
      pillarSlug: '',
      relatedSlugs: staticPost.relatedSlugs || [],
      tags: staticPost.tags || [],
      isPublished: true,
      publishedAt: staticPost.publishedAt,
    } as IBlogPost
  }

  return null
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Article Not Found | Healthcare Insights',
      description: 'The requested healthcare article could not be found.',
      robots: { index: false, follow: false },
    }
  }

  // Unpublished posts should not be indexed by search engines
  if (!post.isPublished) {
    return {
      title: `[Draft] ${post.title}`,
      robots: { index: false, follow: false },
    }
  }

  const metaTitle = post.seoTitle || `${post.title} | ${SITE.name}`
  const metaDescription =
    post.metaDescription || post.excerpt || post.description || 'Read expert medical insights and healthcare guidelines.'
  const canonicalUrl = post.canonicalUrl || `${SITE.url}/blog/${post.slug}`
  const imageUrl = post.image?.startsWith('http')
    ? post.image
    : post.image?.startsWith('/')
    ? `${SITE.url}${post.image}`
    : `${SITE.url}/blog/Hero.avif`

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.publishedAt
        ? new Date(post.publishedAt).toISOString()
        : post.date
        ? new Date(post.date).toISOString()
        : undefined,
      modifiedTime: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
      authors: [post.author || 'Clinical Team'],
      tags: post.tags || [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Fetch parent pillar info if this is a cluster page
  let parentPillar: { title: string; slug: string } | null = null
  if (post.pageType === 'cluster' && post.pillarSlug) {
    try {
      await connectDB()
      const pillarDoc = await BlogPost.findOne({ slug: post.pillarSlug }).select('title slug').lean()
      if (pillarDoc) {
        parentPillar = { title: (pillarDoc as any).title, slug: (pillarDoc as any).slug }
      }
    } catch {
      // ignore
    }
  }

  // Fetch child cluster articles if this is a pillar page
  let clusterPages: { title: string; slug: string; excerpt: string }[] = []
  if (post.pageType === 'pillar') {
    try {
      await connectDB()
      const clusters = await BlogPost.find({
        isPublished: true,
        pageType: 'cluster',
        pillarSlug: post.slug,
      })
        .select('title slug excerpt')
        .limit(6)
        .lean()

      clusterPages = clusters.map((c: any) => ({
        title: c.title,
        slug: c.slug,
        excerpt: c.excerpt || '',
      }))
    } catch {
      // ignore
    }
  }

  // Fetch latest articles for sidebar (excluding current post)
  let latestPosts: any[] = []
  try {
    await connectDB()
    const dbRecents = await BlogPost.find({ isPublished: true, slug: { $ne: slug } })
      .sort({ date: -1, createdAt: -1 })
      .limit(6)
      .select('title slug image date createdAt')
      .lean()

    if (dbRecents.length > 0) {
      latestPosts = dbRecents.map((p: any) => ({
        id: String(p._id),
        title: p.title,
        slug: p.slug,
        image: getSafeImageUrl(p.image),
        date: p.date
          ? new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : 'Recent',
      }))
    }
  } catch {
    // fallback
    latestPosts = BLOG_POSTS.filter((p) => p.slug !== slug)
      .slice(0, 6)
      .map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        image: getSafeImageUrl(p.image),
        date: p.date,
      }))
  }

  // Fetch recommended stories for bottom section
  let relatedStories: any[] = []
  try {
    await connectDB()
    const query: any = { isPublished: true, slug: { $ne: slug } }
    if (post.category) {
      query.category = post.category
    }
    const dbStories = await BlogPost.find(query)
      .sort({ date: -1 })
      .limit(3)
      .select('title slug image category date author readTime verifiedBy')
      .lean()

    if (dbStories.length > 0) {
      relatedStories = dbStories.map((s: any) => ({
        id: String(s._id),
        title: s.title,
        slug: s.slug,
        image: getSafeImageUrl(s.image),
        category: s.category,
        date: s.date
          ? new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : undefined,
        author: s.author,
        readTime: s.readTime,
        verifiedBy: s.verifiedBy,
      }))
    }
  } catch {
    relatedStories = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3)
  }

  // JSON-LD Structured Data (MedicalWebPage + BlogPosting)
  const canonicalUrl = post.canonicalUrl || `${SITE.url}/blog/${post.slug}`
  const imageUrl = post.image?.startsWith('http')
    ? post.image
    : post.image?.startsWith('/')
    ? `${SITE.url}${post.image}`
    : `${SITE.url}/blog/Hero.avif`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: post.title,
    description: post.metaDescription || post.excerpt || post.description,
    image: [imageUrl],
    url: canonicalUrl,
    datePublished: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : post.date
      ? new Date(post.date).toISOString()
      : undefined,
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
    author: {
      '@type': 'Organization',
      name: post.author || SITE.name,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/icon.png`,
      },
    },
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patients',
    },
  }

  // Breadcrumb schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Healthcare Insights',
        item: `${SITE.url}/blog`,
      },
      ...(parentPillar
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: parentPillar.title,
              item: `${SITE.url}/blog/${parentPillar.slug}`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: post.title,
              item: canonicalUrl,
            },
          ]
        : [
            {
              '@type': 'ListItem',
              position: 3,
              name: post.title,
              item: canonicalUrl,
            },
          ]),
    ],
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent'

  const hasFeaturedImage =
    post.image && (post.image.startsWith('http') || post.image.startsWith('/'))

  return (
    <main className="bg-background text-foreground min-h-screen py-8 lg:py-12">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-text-muted sm:text-sm"
        >
          <Link href="/" className="hover:text-accent-red transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-text-muted/60" />
          <Link href="/blog" className="hover:text-accent-red transition-colors">
            Healthcare Insights
          </Link>

          {parentPillar && (
            <>
              <ChevronRight className="h-3 w-3 text-text-muted/60" />
              <Link
                href={`/blog/${parentPillar.slug}`}
                className="hover:text-accent-red transition-colors font-medium text-medical-line"
              >
                {parentPillar.title}
              </Link>
            </>
          )}

          <ChevronRight className="h-3 w-3 text-text-muted/60" />
          <span className="text-foreground font-medium truncate max-w-xs sm:max-w-md">
            {post.title}
          </span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* ================= LEFT MAIN CONTENT (8 COLS) ================= */}
          <article className="lg:col-span-8 min-w-0">
            {/* Category Tag & Archetype Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block bg-accent-red px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded">
                {post.category || 'HEALTHCARE'}
              </span>

              {post.pageType === 'pillar' && (
                <span className="inline-flex items-center gap-1 rounded bg-purple-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-purple-900 border border-purple-200">
                  <Layers className="h-3 w-3" />
                  Core Guide
                </span>
              )}

              {post.pageType === 'cluster' && parentPillar && (
                <Link
                  href={`/blog/${parentPillar.slug}`}
                  className="inline-flex items-center gap-1 rounded bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800 border border-sky-200 hover:bg-sky-100 transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>Series: {parentPillar.title}</span>
                </Link>
              )}
            </div>

            {/* Primary Article H1 */}
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl font-serif">
              {post.title}
            </h1>

            {/* Article Lead Subtitle / Excerpt */}
            {(post.excerpt || post.description) && (
              <p className="mt-4 text-base italic text-text-muted sm:text-lg leading-relaxed border-l-3 border-accent-red pl-4">
                {post.excerpt || post.description}
              </p>
            )}

            {/* Author & Meta Row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-text-muted border-t border-b border-medical-line/15 py-3.5 uppercase tracking-wider font-semibold">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-medical-line" />
                BY <strong className="text-foreground">{post.author || 'CLINICAL TEAM'}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-medical-line" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-medical-line" />
                {post.readTime || '5 MIN READ'}
              </span>

              {post.verifiedBy && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                    <ShieldCheck className="h-3 w-3" />
                    VERIFIED: {post.verifiedBy}
                  </span>
                </>
              )}
            </div>

            {/* Featured Image */}
            {hasFeaturedImage && (
              <div className="relative my-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-surface border border-medical-line/10 shadow-sm">
                <img
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            )}

            {/* Main Rich-Text Content (Handles HTML, Markdown, Tiptap JSON, Tables, Lists, Images) */}
            <BlogContentRenderer
              content={post.content}
              contentHtml={post.contentHtml}
            />

            {/* If Pillar Page: Display Cluster Sub-topics (Topic Cluster Internal Linking) */}
            {post.pageType === 'pillar' && clusterPages.length > 0 && (
              <section className="mt-12 rounded-2xl border border-medical-line/20 bg-surface/60 p-6 sm:p-8">
                <div className="flex items-center gap-2 text-medical-line mb-3">
                  <Layers className="h-5 w-5 text-accent-red" />
                  <h3 className="text-lg font-bold uppercase tracking-wider text-foreground font-serif">
                    Articles in this Comprehensive Guide
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-text-muted mb-6">
                  Explore focused deep-dives on specific procedures, diagnosis, and recovery:
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {clusterPages.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/blog/${c.slug}`}
                      className="group block rounded-xl border border-medical-line/15 bg-background p-4 transition-all hover:border-accent-red/40 hover:shadow-xs"
                    >
                      <h4 className="text-sm font-bold text-foreground group-hover:text-accent-red transition-colors">
                        {c.title}
                      </h4>
                      {c.excerpt && (
                        <p className="mt-1.5 line-clamp-2 text-xs text-text-muted leading-relaxed">
                          {c.excerpt}
                        </p>
                      )}
                      <span className="mt-3 inline-flex items-center text-xs font-semibold text-accent-red">
                        Read chapter →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Tags footer */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 border-t border-medical-line/15 pt-6">
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted mr-3">
                  Related Topics:
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-medical-blue/30 px-2.5 py-1 text-xs font-medium text-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ================= RIGHT SIDEBAR (4 COLS) ================= */}
          <aside className="lg:col-span-4 space-y-10">
            {/* 1. Compact Appointment Form */}
            <SidebarForm />

            {/* 2. Latest Articles Sidebar */}
            <RelatedArticlesSidebar posts={latestPosts} />

            {/* 3. Follow Us / Social Links */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground border-b-2 border-foreground pb-2">
                FOLLOW OUR HEALTH UPDATES
              </h3>
              <p className="text-xs text-text-muted">
                Receive doctor verified health tips & medical updates directly:
              </p>

              <div className="space-y-2">
                <a
                  href={`https://wa.me/${SITE.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.982 9.982 0 004.779 1.221h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.667-1.037-5.176-2.922-7.062A9.923 9.923 0 0012.012 2z" />
                  </svg>
                  WhatsApp Consultation
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* ================= BOTTOM RECOMMENDED STORIES SECTION ================= */}
        <RelatedStories stories={relatedStories} />
      </div>
    </main>
  )
}
