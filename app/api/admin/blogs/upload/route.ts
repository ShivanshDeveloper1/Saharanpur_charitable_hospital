import { NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/lib/cloudinary'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || ''

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const file = formData.get('file')
      const altText = String(formData.get('altText') || '')

      if (!(file instanceof File)) {
        return NextResponse.json({ error: 'No image file uploaded.' }, { status: 400 })
      }

      // Check file size (e.g. max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: 'Image size must be under 10MB.' }, { status: 400 })
      }

      const bytes = Buffer.from(await file.arrayBuffer())
      const result = await uploadToCloudinary(bytes, {
        mimeType: file.type || 'image/jpeg',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      })

      return NextResponse.json({
        url: result.url,
        altText,
        publicId: result.publicId,
        width: result.width,
        height: result.height,
      })
    }

    const body = await req.json()
    const image = body.image || body.url

    if (!image) {
      return NextResponse.json({ error: 'Missing image data or URL.' }, { status: 400 })
    }

    const upload = await uploadToCloudinary(image, {
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    })

    return NextResponse.json({
      url: upload.url,
      publicId: upload.publicId,
      width: upload.width,
      height: upload.height,
    })
  } catch (error: any) {
    const message = error?.message || 'Image upload failed.'
    console.error('[Upload API] Cloudinary upload error:', message)
    return NextResponse.json(
      {
        error: message.includes('missing permissions')
          ? 'Cloudinary Access Key lacks upload permissions. Please check Cloudinary credentials or provide image URL.'
          : message,
      },
      { status: 500 }
    )
  }
}
