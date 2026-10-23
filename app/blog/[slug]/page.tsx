import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_POSTS } from '@/data/BlogData'
import RelatedStories from '@/components/(Blog)/RelatedStories'
import SidebarForm from '@/components/(Blog)/SidebarForm'
import RelatedArticlesSidebar from '@/components/(Blog)/RelatedArticlesSidebar'


interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  'headline': post.title,
  'description': post.excerpt,
  'image': post.image,
  'datePublished': post.date,
  'author': {
    '@type': 'Person',
    'name': post.author || 'Clinical Specialist',
    'jobTitle': 'Senior Consultant'
  },
  'reviewedBy': {
    '@type': 'Person',
    'name': 'Medical Review Board'
  }
}

  if (!post) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: `${post.title} | Healthcare Insights`,
    description: post.excerpt || 'Read expert medical insights and healthcare guidelines.',
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  

  if (!post) {
    notFound()
  }

  // Filter latest articles (excluding current post)
  const latestPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 6)
  
  // Related stories for bottom section
  const relatedStories = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <main className="bg-background text-foreground min-h-screen py-8 lg:py-12">
        {/* <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/> */}
      {/* Breadcrumb Navigation */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <nav className="mb-6 flex items-center gap-2 text-xs text-text-muted sm:text-sm">
          <Link href="/" className="hover:text-accent-red transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-accent-red transition-colors">Healthcare Insights</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-xs">{post.title}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          
          {/* ================= LEFT MAIN CONTENT (8 COLS) ================= */}
          <article className="lg:col-span-8">
            
            {/* Category Tag */}
            <span className="inline-block bg-accent-red px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              {post.category || 'HEALTHCARE'}
            </span>

            {/* Main Headline */}
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl font-serif">
              {post.title}
            </h1>

            {/* Article Lead Subtitle */}
            <p className="mt-4 text-base italic text-text-muted sm:text-lg leading-relaxed border-l-2 border-accent-red pl-4">
              {post.excerpt || 'Explore expert clinical insights and practical guidance on symptoms, treatments, and medical care.'}
            </p>

            {/* Author & Meta Row */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-text-muted border-t border-b border-medical-line/15 py-3 uppercase tracking-wider font-semibold">
              <span>BY <strong className="text-foreground">{post.author || 'DR. CLINICAL TEAM'}</strong></span>
              <span>•</span>
              <span>
  {post.date instanceof Date 
    ? post.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) 
    : post.date || 'OCTOBER 17, 2026'}
</span>
              <span>•</span>
              <span>5 MIN READ</span>
            </div>

            {/* Hero Featured Image */}
            <div className="relative my-8 aspect-[16/9] w-full overflow-hidden rounded-xl bg-surface border border-medical-line/10">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            {/* Body Content with Drop Cap Hierarchy */}
       <div className="prose prose-lg max-w-none text-foreground leading-relaxed">
  {post.content.map((block, index) => {
    // 1. Render Paragraphs & Inline Links Safely
    if (block.type === 'paragraph') {
      return (
        <p key={index} className="text-base sm:text-lg mt-4 leading-relaxed">
          {block.segments.map((segment, sIndex) => {
            if (segment.isLink && segment.slug) {
              // Check if the target slug exists in database
              const targetExists = BLOG_POSTS.some((p) => p.slug === segment.slug);

              if (targetExists) {
                return (
                  <Link 
                    key={sIndex} 
                    href={`/blog/${segment.slug}`} 
                    className="text-accent-red font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    {segment.text}
                  </Link>
                );
              } else {
                // Fallback gracefully if article is unavailable in database
                return <span key={sIndex} className="text-foreground">{segment.text}</span>;
              }
            }
            return <span key={sIndex}>{segment.text}</span>;
          })}
        </p>
      );
    }

    // 2. Render Headings
    if (block.type === 'heading') {
      return (
        <h2 key={index} className="mt-10 mb-4 text-2xl font-bold tracking-tight text-foreground border-b border-medical-line/20 pb-2">
          {block.segments[0]?.text}
        </h2>
      );
    }

    // 3. Render Lists
    if (block.type === 'list') {
      return (
        <ul key={index} className="mt-4 space-y-2 list-disc list-inside text-text-muted text-base">
          {block.items.map((item, iIndex) => (
            <li key={iIndex}>{item}</li>
          ))}
        </ul>
      );
    }

    return null;
  })}
</div>
            {/* Article Navigation Footer */}
          
          </article>

          {/* ================= RIGHT SIDEBAR (4 COLS) ================= */}
          <aside className="lg:col-span-4 space-y-10">
            
            {/* 1. Compact Solution/Appointment Form */}
            <SidebarForm />

            {/* 2. Latest Articles Sidebar */}
            <RelatedArticlesSidebar posts={latestPosts} />

            {/* 3. Follow Us / Social Links */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground border-b-2 border-foreground pb-2">
                FOLLOW US
              </h3>
              <p className="text-xs text-text-muted">Get health tips & medical news directly in your feed:</p>
              
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-3 rounded-lg bg-[#0088cc] px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                  Telegram Channel
                </a>
                <a href="#" className="flex items-center gap-3 rounded-lg bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.982 9.982 0 004.779 1.221h.004c5.505 0 9.988-4.478 9.989-9.985 0-2.667-1.037-5.176-2.922-7.062A9.923 9.923 0 0012.012 2z"/></svg>
                  WhatsApp Channel
                </a>
                <a href="#" className="flex items-center gap-3 rounded-lg bg-[#FF0000] px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  YouTube - Health Tips
                </a>
              </div>
            </div>

          </aside>
        </div>

        {/* ================= BOTTOM RELATED STORIES SECTION ================= */}
        <RelatedStories stories={relatedStories} />

      </div>
    </main>
  )
}