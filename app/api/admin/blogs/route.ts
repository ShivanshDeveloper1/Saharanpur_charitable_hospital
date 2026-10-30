import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import BlogPost from '@/models/Blog'
import { getSafeImageUrl } from '@/lib/image-utils'

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim().toLowerCase()).filter(Boolean)
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean)
  }
  return []
}

function normalizeArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

async function findRelated(slug: string, pillarSlug: string, category: string, tags: string[]) {
  const or: Record<string, unknown>[] = []

  if (pillarSlug) {
    or.push({ pillarSlug })
    or.push({ slug: pillarSlug })
  }
  if (category) {
    or.push({ category })
  }
  if (tags.length) {
    or.push({ tags: { $in: tags } })
  }

  if (!or.length) return []

  const docs = await BlogPost.find({ isPublished: true, slug: { $ne: slug }, $or: or })
    .sort({ date: -1 })
    .limit(4)
    .select('slug')
    .lean()

  return docs.map((doc: any) => String(doc.slug))
}

export async function GET(req: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    const id = searchParams.get('id')
    const pageType = searchParams.get('pageType')

    if (slug) {
      const blog = await BlogPost.findOne({ slug }).lean()
      if (!blog) {
        return NextResponse.json({ error: 'Blog post not found.' }, { status: 404 })
      }
      return NextResponse.json({ blog })
    }

    if (id) {
      const blog = await BlogPost.findById(id).lean()
      if (!blog) {
        return NextResponse.json({ error: 'Blog post not found.' }, { status: 404 })
      }
      return NextResponse.json({ blog })
    }

    const query: Record<string, unknown> = {}
    if (pageType) {
      query.pageType = pageType
    }

    const blogs = await BlogPost.find(query).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ blogs })
  } catch (error: any) {
    console.error('[Blog API] GET failed:', error?.message || error)
    return NextResponse.json({ error: 'Failed to fetch blogs.' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    console.log('[Blog API] Blog creation started')
    await connectDB()
    const body = await req.json()

    const title = String(body.title || '').trim()
    const rawSlug = String(body.slug || title)
    const slug = slugify(rawSlug)
    const excerpt = String(body.excerpt || body.description || '').trim()
    const content = body.content ?? ''
    const category = String(body.category || '').trim()
    const pageType = body.pageType || 'article'
    const pillarSlug = String(body.pillarSlug || '').trim().toLowerCase()

    // Validation
    const validationErrors: string[] = []
    if (!title) validationErrors.push('Article title is required.')
    if (!slug) validationErrors.push('URL slug is required.')
    if (!excerpt) validationErrors.push('Excerpt or description is required.')
    if (!content || (typeof content === 'string' && !content.trim())) {
      validationErrors.push('Article content is required.')
    }
    if (!category) validationErrors.push('Category is required.')

    if (pageType === 'cluster' && !pillarSlug) {
      validationErrors.push('Select a parent pillar page for cluster articles.')
    }

    if (validationErrors.length > 0) {
      console.warn('[Blog API] Blog validation failed:', validationErrors)
      return NextResponse.json({ error: validationErrors.join(' ') }, { status: 400 })
    }

    // Check if slug is unique
    const existing = await BlogPost.findOne({ slug }).lean()
    if (existing) {
      return NextResponse.json(
        { error: `The slug "${slug}" is already in use. Please choose a unique slug.` },
        { status: 409 }
      )
    }

    const normalizedTags = normalizeTags(body.tags)
    const relatedSlugs =
      Array.isArray(body.relatedSlugs) && body.relatedSlugs.length
        ? normalizeArray(body.relatedSlugs)
        : await findRelated(slug, pillarSlug, category, normalizedTags)

    const isPublished = Boolean(body.isPublished)

    const blog = await BlogPost.create({
      title,
      slug,
      excerpt,
      description: excerpt,
      image: getSafeImageUrl(body.image || body.featuredImage || ''),
      imageAlt: String(body.imageAlt || body.heroImageAlt || title),
      category,
      categorySlug: slugify(category),
      tags: normalizedTags,
      content,
      contentHtml: typeof content === 'string' ? content : '',
      seoTitle: String(body.seoTitle || body.metaTitle || title),
      metaDescription: String(body.metaDescription || excerpt),
      primaryKeyword: String(body.primaryKeyword || ''),
      secondaryKeywords: normalizeArray(body.secondaryKeywords),
      internalLinks: normalizeArray(body.internalLinks),
      canonicalUrl: String(body.canonicalUrl || ''),
      pageType,
      pillarSlug: pageType === 'cluster' ? pillarSlug : '',
      relatedSlugs,
      author: String(body.author || 'Clinical Team'),
      verifiedBy: String(body.verifiedBy || 'Medical Review Board'),
      readTime: String(body.readTime || '5 min read'),
      isPublished,
      publishedAt: isPublished ? (body.publishedAt ? new Date(body.publishedAt) : new Date()) : null,
    })

    console.log('[Blog API] Blog created successfully:', blog._id, blog.slug)
    return NextResponse.json({
      success: true,
      blogId: String(blog._id),
      slug: blog.slug,
      message: isPublished ? 'Blog published successfully!' : 'Blog draft saved successfully!',
    })
  } catch (error: any) {
    if (error?.code === 11000) {
      return NextResponse.json({ error: 'This slug already exists. Please choose another slug.' }, { status: 409 })
    }
    console.error('[Blog API] MongoDB blog creation failed:', error?.message || error)
    return NextResponse.json({ error: error?.message || 'Could not save the blog.' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    console.log('[Blog API] Blog update started')
    await connectDB()
    const body = await req.json()
    const id = body.id || body._id

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required for updating.' }, { status: 400 })
    }

    const existingBlog = await BlogPost.findById(id)
    if (!existingBlog) {
      return NextResponse.json({ error: 'Blog not found.' }, { status: 404 })
    }

    const title = String(body.title || existingBlog.title).trim()
    const rawSlug = String(body.slug || existingBlog.slug)
    const slug = slugify(rawSlug)
    const excerpt = String(body.excerpt || body.description || existingBlog.excerpt).trim()
    const content = body.content !== undefined ? body.content : existingBlog.content
    const category = String(body.category || existingBlog.category).trim()
    const pageType = body.pageType || existingBlog.pageType || 'article'
    const pillarSlug = String(body.pillarSlug || '').trim().toLowerCase()

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Title, slug, excerpt and content cannot be empty.' },
        { status: 400 }
      )
    }

    if (pageType === 'cluster' && !pillarSlug) {
      return NextResponse.json(
        { error: 'Select a parent pillar page for cluster articles.' },
        { status: 400 }
      )
    }

    // If slug changed, ensure no conflict
    if (slug !== existingBlog.slug) {
      const duplicateSlug = await BlogPost.findOne({ slug, _id: { $ne: id } }).lean()
      if (duplicateSlug) {
        return NextResponse.json(
          { error: `The slug "${slug}" is already in use by another article.` },
          { status: 409 }
        )
      }
    }

    const normalizedTags = body.tags !== undefined ? normalizeTags(body.tags) : existingBlog.tags
    const isPublished = body.isPublished !== undefined ? Boolean(body.isPublished) : existingBlog.isPublished

    existingBlog.title = title
    existingBlog.slug = slug
    existingBlog.excerpt = excerpt
    existingBlog.description = excerpt
    if (body.image !== undefined) existingBlog.image = getSafeImageUrl(body.image)
    if (body.imageAlt !== undefined) existingBlog.imageAlt = String(body.imageAlt)
    existingBlog.category = category
    existingBlog.categorySlug = slugify(category)
    existingBlog.tags = normalizedTags
    existingBlog.content = content
    existingBlog.contentHtml = typeof content === 'string' ? content : existingBlog.contentHtml
    if (body.seoTitle !== undefined) existingBlog.seoTitle = String(body.seoTitle)
    if (body.metaDescription !== undefined) existingBlog.metaDescription = String(body.metaDescription)
    if (body.primaryKeyword !== undefined) existingBlog.primaryKeyword = String(body.primaryKeyword)
    if (body.secondaryKeywords !== undefined) existingBlog.secondaryKeywords = normalizeArray(body.secondaryKeywords)
    if (body.internalLinks !== undefined) existingBlog.internalLinks = normalizeArray(body.internalLinks)
    if (body.canonicalUrl !== undefined) existingBlog.canonicalUrl = String(body.canonicalUrl)
    existingBlog.pageType = pageType
    existingBlog.pillarSlug = pageType === 'cluster' ? pillarSlug : ''
    if (body.author !== undefined) existingBlog.author = String(body.author)
    if (body.verifiedBy !== undefined) existingBlog.verifiedBy = String(body.verifiedBy)
    if (body.readTime !== undefined) existingBlog.readTime = String(body.readTime)

    // Handle publishing state change
    if (isPublished && !existingBlog.isPublished) {
      existingBlog.publishedAt = new Date()
    }
    existingBlog.isPublished = isPublished

    await existingBlog.save()
    console.log('[Blog API] Blog updated successfully:', existingBlog._id)

    return NextResponse.json({
      success: true,
      blogId: String(existingBlog._id),
      slug: existingBlog.slug,
      message: 'Blog updated successfully!',
    })
  } catch (error: any) {
    console.error('[Blog API] Blog update failed:', error?.message || error)
    return NextResponse.json({ error: error?.message || 'Failed to update blog.' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    const id = body.id || body._id

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required.' }, { status: 400 })
    }

    const blog = await BlogPost.findById(id)
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found.' }, { status: 404 })
    }

    if (body.isPublished !== undefined) {
      blog.isPublished = Boolean(body.isPublished)
      if (blog.isPublished && !blog.publishedAt) {
        blog.publishedAt = new Date()
      }
    }

    await blog.save()
    return NextResponse.json({ success: true, blog })
  } catch (error: any) {
    console.error('[Blog API] PATCH failed:', error?.message || error)
    return NextResponse.json({ error: 'Failed to update blog status.' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    let id = searchParams.get('id')

    if (!id) {
      try {
        const body = await req.json()
        id = body.id || body._id
      } catch {
        // body might be empty
      }
    }

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required.' }, { status: 400 })
    }

    const deleted = await BlogPost.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ error: 'Blog not found.' }, { status: 404 })
    }

    console.log('[Blog API] Blog deleted:', id)
    return NextResponse.json({ success: true, message: 'Blog deleted successfully.' })
  } catch (error: any) {
    console.error('[Blog API] Delete failed:', error?.message || error)
    return NextResponse.json({ error: 'Failed to delete blog.' }, { status: 500 })
  }
}
