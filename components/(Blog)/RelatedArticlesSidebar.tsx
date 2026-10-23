import Image from 'next/image'
import Link from 'next/link'

interface Post {
  id: string | number
  title: string
  slug: string
  image: string
  date: string
}

export default function RelatedArticlesSidebar({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-widest text-foreground border-b-2 border-foreground pb-2">
        LATEST ARTICLES
      </h3>

      <div className="space-y-4">
        {posts.map((article) => (
          <article key={article.id} className="flex gap-3 group items-start border-b border-medical-line/10 pb-3 last:border-0">
            <Link href={`/blog/${article.slug}`} className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-surface">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="80px"
              />
            </Link>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold leading-tight text-foreground line-clamp-2 group-hover:text-accent-red transition-colors">
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </h4>
              <span className="mt-1 block text-[10px] font-semibold uppercase text-text-muted">
                {article.date || 'OCTOBER 17, 2026'}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}