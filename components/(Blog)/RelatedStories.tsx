import Image from 'next/image'
import Link from 'next/link'

export interface Post {
  id: string | number
  title: string
  slug: string
  image: string
  category?: string
  date?: string
  author?: string
  readTime?: string
  verifiedBy?: string
}

export default function RelatedStories({ stories }: { stories: Post[] }) {
  if (!stories || stories.length === 0) return null

  return (
    <section className="mt-16 border-t border-medical-line/20 pt-10">
      {/* Header with Subtext */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground uppercase font-serif">
            Recommended Medical Insights
          </h2>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Explore related clinical guides and doctor-verified resources.
          </p>
        </div>
        <Link 
          href="/blog" 
          className="hidden sm:inline-flex text-xs font-bold uppercase tracking-wider text-accent-red hover:underline"
        >
          View All Articles →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <article 
            key={story.id} 
            className="group flex flex-col justify-between rounded-xl border border-medical-line/10 bg-surface p-4 transition-all duration-300 hover:border-medical-line/30 hover:shadow-md"
          >
            <div>
              {/* Image Container with Hover Scale */}
              <Link
                href={`/blog/${story.slug}`}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted block mb-4"
              >
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </Link>

              {/* Category & Read Time Badge Row */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-block bg-accent-red/10 text-accent-red px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded">
                  {story.category || 'HEALTHCARE'}
                </span>
                <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">
                  {story.readTime || '5 MIN READ'}
                </span>
              </div>

              {/* Article Title */}
              <h3 className="text-base font-bold leading-snug text-foreground group-hover:text-accent-red transition-colors line-clamp-2 font-serif">
                <Link href={`/blog/${story.slug}`}>{story.title}</Link>
              </h3>
            </div>

            {/* Author & Clinical Verification */}
            <div className="mt-4 border-t border-medical-line/10 pt-3 flex items-center justify-between text-[11px] font-medium text-text-muted uppercase tracking-wider">
              <span>{story.author || 'CLINICAL TEAM'}</span>
              
              {story.verifiedBy && (
                <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                  VERIFIED
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}