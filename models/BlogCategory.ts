import mongoose, { Schema, models, model } from 'mongoose'

const BlogCategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

const BlogCategory = models.BlogCategory || model('BlogCategory', BlogCategorySchema)

export default BlogCategory
