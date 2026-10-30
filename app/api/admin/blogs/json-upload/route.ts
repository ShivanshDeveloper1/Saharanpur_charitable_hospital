import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import BlogPost from '@/models/Blog'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { validateBlogJson } from '@/app/(admin)/admin/json-upload/json-validator'

export const runtime = 'nodejs'

// Helper to upload a base64 image or local image to Cloudinary
async function ensureCloudinaryUrl(imageInput: string, altText: string = ''): Promise<string> {
  if (!imageInput) return ''

  // If it's already an HTTP/HTTPS URL or static root path (/...), keep it as is
  if (imageInput.startsWith('http://') || imageInput.startsWith('https://') || imageInput.startsWith('/')) {
    return imageInput
  }

  // If it's a base64 data URI, upload to Cloudinary
  if (imageInput.startsWith('data:image/')) {
    try {
      console.log('[JSON Upload] Uploading base64 image to Cloudinary...')
      const upload = await uploadToCloudinary(imageInput, {
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      })
      console.log('[JSON Upload] Image uploaded:', upload.url)
      return upload.url
    } catch (err: any) {
      console.warn('[JSON Upload] Cloudinary upload failed for base64 image, keeping original:', err?.message || err)
      return imageInput
    }
  }

  return imageInput
}

// Helper to replace base64 images in HTML/markdown content with Cloudinary URLs
async function processContentImages(content: any): Promise<any> {
  if (typeof content === 'string') {
    let updated = content

    // 1. Process HTML <img src="data:image/...">
    const htmlImgRegex = /<img[^>]+src=["'](data:image\/[^"']+)["'][^>]*>/gi
    const matches = Array.from(content.matchAll(htmlImgRegex))

    for (const match of matches) {
      const fullImgTag = match[0]
      const base64Src = match[1]
      try {
        const cldUrl = await ensureCloudinaryUrl(base64Src, 'Article visual')
        const updatedImgTag = fullImgTag.replace(base64Src, cldUrl)
        updated = updated.replace(fullImgTag, updatedImgTag)
      } catch (e) {
        console.warn('[JSON Upload] Could not replace inline base64 image:', e)
      }
    }

    // 2. Process Markdown ![alt](data:image/...)
    const mdImgRegex = /!\[([^\]]*)\]\((data:image\/[^\)]+)\)/gi
    const mdMatches = Array.from(updated.matchAll(mdImgRegex))

    for (const match of mdMatches) {
      const fullMd = match[0]
      const alt = match[1]
      const base64Src = match[2]
      try {
        const cldUrl = await ensureCloudinaryUrl(base64Src, alt)
        const updatedMd = `![${alt}](${cldUrl})`
        updated = updated.replace(fullMd, updatedMd)
      } catch (e) {
        console.warn('[JSON Upload] Could not replace markdown base64 image:', e)
      }
    }

    return updated
  }

  // If content is Tiptap JSON object
  if (content && typeof content === 'object') {
    const jsonStr = JSON.stringify(content)
    if (jsonStr.includes('data:image/')) {
      // Process JSON nodes recursively
      const traverse = async (node: any) => {
        if (!node) return
        if (node.type === 'image' && node.attrs?.src?.startsWith('data:image/')) {
          node.attrs.src = await ensureCloudinaryUrl(node.attrs.src, node.attrs.alt || '')
        }
        if (Array.isArray(node.content)) {
          for (const child of node.content) {
            await traverse(child)
          }
        }
      }
      const clone = JSON.parse(jsonStr)
      await traverse(clone)
      return clone
    }
  }

  return content
}

export async function POST(req: Request) {
  try {
    console.log('[JSON Upload API] Processing incoming blog JSON...')
    const contentType = req.headers.get('content-type') || ''
    let rawPayload: any

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const jsonFile = formData.get('file')

      if (jsonFile instanceof File) {
        const text = await jsonFile.text()
        rawPayload = JSON.parse(text)
      } else {
        const jsonText = String(formData.get('json') || '')
        if (!jsonText) {
          return NextResponse.json({ error: 'No JSON payload provided in form data.' }, { status: 400 })
        }
        rawPayload = JSON.parse(jsonText)
      }
    } else {
      rawPayload = await req.json()
    }

    // 1. Validate JSON against our exact model
    const validation = validateBlogJson(rawPayload)
    if (!validation.isValid || !validation.data) {
      console.warn('[JSON Upload API] Validation failed:', validation.errors)
      return NextResponse.json(
        {
          error: 'Invalid blog JSON structure.',
          details: validation.errors,
          warnings: validation.warnings,
        },
        { status: 400 }
      )
    }

    const blogData = validation.data

    // 2. Process Featured Image (upload to Cloudinary if needed)
    if (blogData.image) {
      blogData.image = await ensureCloudinaryUrl(blogData.image, blogData.imageAlt || blogData.title)
    }

    // 3. Process any inline images inside the article content
    blogData.content = await processContentImages(blogData.content)
    blogData.contentHtml = typeof blogData.content === 'string' ? blogData.content : ''

    // 4. Connect to MongoDB and save
    await connectDB()

    // Check duplicate slug
    const existing = await BlogPost.findOne({ slug: blogData.slug }).lean()
    if (existing) {
      return NextResponse.json(
        {
          error: `A blog post with the slug "${blogData.slug}" already exists in MongoDB. Please modify the slug.`,
        },
        { status: 409 }
      )
    }

    // Verify parent pillar exists if pageType is cluster
    if (blogData.pageType === 'cluster') {
      const pillarExists = await BlogPost.findOne({ slug: blogData.pillarSlug, pageType: 'pillar' }).lean()
      if (!pillarExists) {
        return NextResponse.json(
          {
            error: `Parent pillar page "${blogData.pillarSlug}" was not found in MongoDB. Create or specify an existing pillar first.`,
          },
          { status: 400 }
        )
      }
    }

    // Create blog post in MongoDB
    const createdDoc = await BlogPost.create(blogData)
    console.log('[JSON Upload API] Blog saved successfully:', createdDoc._id, createdDoc.slug)

    return NextResponse.json({
      success: true,
      blogId: String(createdDoc._id),
      slug: createdDoc.slug,
      title: createdDoc.title,
      isPublished: createdDoc.isPublished,
      message: createdDoc.isPublished
        ? 'Blog JSON successfully uploaded, processed, and published!'
        : 'Blog JSON saved as draft.',
      warnings: validation.warnings,
    })
  } catch (error: any) {
    console.error('[JSON Upload API] Error stack:', error?.stack || error)
    return NextResponse.json(
      {
        error: error instanceof SyntaxError ? 'Malformed JSON string. Please verify syntax.' : error?.message || 'Failed to upload blog JSON.',
      },
      { status: 500 }
    )
  }
}

