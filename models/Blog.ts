import mongoose, { Schema, models, model } from 'mongoose'

export interface IBlogSegment {
  text: string
  slug?: string
  isLink?: boolean
}

export interface IBlogBlock {
  type: 'paragraph' | 'heading' | 'list'
  segments?: IBlogSegment[]
  items?: string[]
}

export interface IBlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  description?: string
  image: string
  imageAlt: string
  category: string
  categorySlug: string
  author: string
  verifiedBy: string
  readTime: string
  date: Date
  content: any
  contentHtml: string
  seoTitle: string
  metaDescription: string
  primaryKeyword: string
  secondaryKeywords: string[]
  internalLinks: string[]
  canonicalUrl: string
  pageType: 'pillar' | 'cluster' | 'article' | 'standalone'
  pillarSlug: string
  relatedSlugs: string[]
  tags: string[]
  isPublished: boolean
  publishedAt: Date | null
  createdAt?: Date
  updatedAt?: Date
}

const ContentBlockSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['paragraph', 'heading', 'list'],
      required: true,
    },
    segments: [
      {
        text: { type: String, required: true },
        slug: { type: String, default: '' },
        isLink: { type: Boolean, default: false },
      },
    ],
    items: [{ type: String }],
  },
  { _id: false }
)

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    excerpt: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    imageAlt: { type: String, default: '' },
    category: { type: String, default: '', index: true },
    categorySlug: { type: String, default: '', trim: true, lowercase: true },
    author: { type: String, default: 'Clinical Team' },
    verifiedBy: { type: String, default: '' },
    readTime: { type: String, default: '5 min read' },
    date: { type: Date, default: Date.now },
    content: { type: Schema.Types.Mixed, default: [] },
    contentHtml: { type: String, default: '' },
    seoTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    primaryKeyword: { type: String, default: '' },
    secondaryKeywords: [{ type: String, trim: true, lowercase: true }],
    internalLinks: [{ type: String, trim: true }],
    canonicalUrl: { type: String, default: '' },
    pageType: {
      type: String,
      enum: ['pillar', 'cluster', 'article', 'standalone'],
      default: 'article',
      index: true,
    },
    pillarSlug: {
      type: String,
      default: '',
      lowercase: true,
      trim: true,
      index: true,
    },
    relatedSlugs: [{ type: String, lowercase: true, trim: true }],
    tags: [{ type: String, trim: true, lowercase: true }],
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

BlogPostSchema.pre('save', function () {
  if (!this.excerpt && this.description) {
    this.excerpt = this.description
  } else if (!this.description && this.excerpt) {
    this.description = this.excerpt
  }
})

BlogPostSchema.index({ isPublished: 1, date: -1 })
BlogPostSchema.index({ pageType: 1, pillarSlug: 1 })

const BlogPost = models.BlogPost || model('BlogPost', BlogPostSchema)

export default BlogPost
