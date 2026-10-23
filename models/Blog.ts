
import mongoose, { Schema, models, model } from 'mongoose'

const ContentBlockSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['paragraph', 'heading', 'list'],
      required: true,
    },
    // Text segments allow links to appear naturally inside a paragraph.
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
    excerpt: { type: String, required: true, maxlength: 300 },
    image: { type: String, required: true },
    category: { type: String, required: true, index: true },
    author: { type: String, default: 'Clinical Team' },
    verifiedBy: { type: String, default: '' },
    readTime: { type: String, default: '5 min read' },
    date: { type: Date, default: Date.now },
    content: { type: [ContentBlockSchema], default: [] },


      // SEO Topic Cluster Structure
    pageType: {
      type: String,
      enum: ['pillar', 'cluster', 'article'],
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

        relatedSlugs: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],



    tags: [{ type: String, trim: true, lowercase: true }],
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

// Useful for fetching published articles in date order.
BlogPostSchema.index({ isPublished: 1, date: -1 })

const BlogPost =
  models.BlogPost || model('BlogPost', BlogPostSchema)

export default BlogPost
