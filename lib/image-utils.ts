/**
 * Safely resolves an image URL to ensure Next.js Image component never crashes.
 *
 * Handles:
 * - Undefined, null, empty strings
 * - Relative root paths (e.g. "/blog/Hero.avif")
 * - Valid absolute URLs (e.g. "https://res.cloudinary.com/...")
 * - Invalid non-URL strings (e.g. "fghfghf", dummy text) -> safely falls back
 */
export const DEFAULT_BLOG_FALLBACK_IMAGE = '/blog/Hero.avif'

export function isValidHttpUrl(str: string): boolean {
  try {
    const url = new URL(str)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function getSafeImageUrl(
  src: unknown,
  fallback: string = DEFAULT_BLOG_FALLBACK_IMAGE
): string {
  if (typeof src !== 'string') return fallback

  const trimmed = src.trim()
  if (!trimmed) return fallback

  // 1. Root-relative local static image (e.g. "/blog/Hero.avif" or "/after_surgery.jpg")
  if (trimmed.startsWith('/')) {
    return trimmed
  }

  // 2. Absolute URL (e.g. Cloudinary, Unsplash, external domain)
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    if (isValidHttpUrl(trimmed)) {
      return trimmed
    }
  }

  // 3. Base64 data URI (valid for inline displays)
  if (trimmed.startsWith('data:image/')) {
    return trimmed
  }

  // 4. Invalid or dummy strings (like "fghfghf") -> fallback safely
  return fallback
}

