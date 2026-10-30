import { v2 as cloudinary } from 'cloudinary'

const rawCloudName = process.env.CLOUDINARY_CLOUD_NAME || ''
const sanitizedCloudName = rawCloudName.replace(/\s*\(.*?\)\s*/g, '').trim()

cloudinary.config({
  cloud_name: sanitizedCloudName,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function uploadToCloudinary(
  file: Buffer | string,
  options: {
    folder?: string
    mimeType?: string
    transformation?: Record<string, unknown>[]
    [key: string]: unknown
  } = {}
) {
  try {
    if (!sanitizedCloudName || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary environment variables (CLOUD_NAME, API_KEY, API_SECRET) are missing or incomplete.')
    }

    const uploadOptions = {
      folder: options.folder || 'hospital-blogs',
      quality: 'auto',
      fetch_format: 'auto',
      ...options,
    }

    let payload = file
    if (Buffer.isBuffer(file)) {
      const mime = options.mimeType || 'image/jpeg'
      payload = `data:${mime};base64,${file.toString('base64')}`
    }

    const result = await cloudinary.uploader.upload(payload as string, uploadOptions)

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    }
  } catch (error: any) {
    console.error('[Cloudinary] Upload failed:', error?.message || error)
    throw error
  }
}
