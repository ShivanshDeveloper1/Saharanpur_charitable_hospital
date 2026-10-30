import { getSafeImageUrl } from '@/lib/image-utils'

export interface ValidatedBlogPayload {
  title: string
  slug: string
  excerpt: string
  description?: string
  content: any
  contentHtml?: string
  category: string
  categorySlug?: string
  image?: string
  imageAlt?: string
  author?: string
  verifiedBy?: string
  readTime?: string
  pageType: 'pillar' | 'cluster' | 'article' | 'standalone'
  pillarSlug?: string
  relatedSlugs?: string[]
  tags?: string[]
  seoTitle?: string
  metaDescription?: string
  primaryKeyword?: string
  secondaryKeywords?: string[]
  internalLinks?: string[]
  canonicalUrl?: string
  isPublished?: boolean
  publishedAt?: Date | string
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  data?: ValidatedBlogPayload
}

export function slugify(text: string): string {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function validateBlogJson(input: unknown): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return {
      isValid: false,
      errors: ['The JSON payload must be an object (not an array or primitive).'],
      warnings: [],
    }
  }

  const raw = input as Record<string, any>

  // 1. Title
  const title = String(raw.title || '').trim()
  if (!title) {
    errors.push('Missing "title": Every blog must have a title string.')
  }

  // 2. Slug
  let slug = slugify(String(raw.slug || title))
  if (!slug) {
    errors.push('Missing or invalid "slug": Could not determine URL slug.')
  }

  // 3. Excerpt / Description
  const excerpt = String(raw.excerpt || raw.description || '').trim()
  if (!excerpt) {
    errors.push('Missing "excerpt" (or "description"): A short summary is required for listings and SEO.')
  }

  // 4. Content
  const content = raw.content ?? raw.contentHtml
  if (!content) {
    errors.push('Missing "content" (or "contentHtml"): Blog article body cannot be empty.')
  } else if (typeof content === 'string' && !content.trim()) {
    errors.push('Empty "content": Content string is empty.')
  } else if (Array.isArray(content) && content.length === 0) {
    errors.push('Empty "content": Content block array is empty.')
  }

  // 5. Category
  const category = String(raw.category || '').trim()
  if (!category) {
    errors.push('Missing "category": Please specify a clinical department or category.')
  }

  // 6. Archetype / PageType
  let pageType = raw.pageType || 'article'
  if (!['pillar', 'cluster', 'article', 'standalone'].includes(pageType)) {
    warnings.push(`Unknown "pageType" ("${pageType}"). Defaulting to "article".`)
    pageType = 'article'
  }

  // 7. Pillar Slug for Clusters
  const pillarSlug = slugify(String(raw.pillarSlug || ''))
  if (pageType === 'cluster' && !pillarSlug) {
    errors.push('Missing "pillarSlug": Cluster pages must specify the parent pillar page slug.')
  }

  // 8. Image warnings & safe normalization
  const rawImage = String(raw.image || raw.featuredImage || '').trim()
  const safeImage = getSafeImageUrl(rawImage)
  if (!rawImage) {
    warnings.push('No featured "image" provided. A default medical banner will be shown.')
  } else if (rawImage !== safeImage && safeImage === '/blog/Hero.avif') {
    warnings.push(`Provided image "${rawImage}" is not a valid URL. Safe fallback image will be used.`)
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings }
  }

  const sanitizedTags: string[] = Array.isArray(raw.tags)
    ? raw.tags.map((t: any) => String(t).trim().toLowerCase()).filter(Boolean)
    : typeof raw.tags === 'string'
    ? raw.tags.split(',').map((t: string) => t.trim().toLowerCase()).filter(Boolean)
    : []

  const secondaryKeywords: string[] = Array.isArray(raw.secondaryKeywords)
    ? raw.secondaryKeywords.map((k: any) => String(k).trim()).filter(Boolean)
    : []

  const validated: ValidatedBlogPayload = {
    title,
    slug,
    excerpt,
    description: excerpt,
    content,
    contentHtml: typeof content === 'string' ? content : '',
    category,
    categorySlug: slugify(category),
    image: safeImage,
    imageAlt: String(raw.imageAlt || raw.heroImageAlt || title),
    author: String(raw.author || 'Clinical Team'),
    verifiedBy: String(raw.verifiedBy || 'Medical Review Board'),
    readTime: String(raw.readTime || '5 min read'),
    pageType,
    pillarSlug: pageType === 'cluster' ? pillarSlug : '',
    relatedSlugs: Array.isArray(raw.relatedSlugs) ? raw.relatedSlugs.map((s: any) => slugify(String(s))) : [],
    tags: sanitizedTags,
    seoTitle: String(raw.seoTitle || raw.metaTitle || title),
    metaDescription: String(raw.metaDescription || excerpt),
    primaryKeyword: String(raw.primaryKeyword || ''),
    secondaryKeywords,
    internalLinks: Array.isArray(raw.internalLinks) ? raw.internalLinks.map(String) : [],
    canonicalUrl: String(raw.canonicalUrl || ''),
    isPublished: raw.isPublished !== undefined ? Boolean(raw.isPublished) : true,
    publishedAt: raw.publishedAt ? new Date(raw.publishedAt) : new Date(),
  }

  return {
    isValid: true,
    errors: [],
    warnings,
    data: validated,
  }
}

