"use client"

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { UploadCloud, X, RefreshCw, Image as ImageIcon, AlertCircle } from 'lucide-react'

interface FeaturedImageUploadProps {
  value: string
  altText?: string
  onChange: (url: string) => void
  onAltChange?: (alt: string) => void
}

export default function FeaturedImageUpload({
  value,
  altText = '',
  onChange,
  onAltChange,
}: FeaturedImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isManualUrlOpen, setIsManualUrlOpen] = useState(false)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Basic client checks
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPEG, PNG, WebP, etc.).')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Image size is too large (max 10MB).')
      return
    }

    setIsUploading(true)
    setErrorMessage(null)

    try {
      console.log('[Cloudinary Upload] Uploading selected image:', file.name)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('altText', altText)

      const response = await fetch('/api/admin/blogs/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image to Cloudinary.')
      }

      console.log('[Cloudinary Upload] Upload successful:', data.url)
      onChange(data.url)
    } catch (err: any) {
      console.error('[Cloudinary Upload] Upload failed:', err?.message || err)
      setErrorMessage(err?.message || 'Image upload failed. You can paste an image URL directly.')
      setIsManualUrlOpen(true)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onChange('')
    setErrorMessage(null)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-800">
          Featured Image <span className="text-red-500">*</span>
        </label>
        <button
          type="button"
          onClick={() => setIsManualUrlOpen(!isManualUrlOpen)}
          className="text-xs text-sky-600 hover:text-sky-700 font-medium"
        >
          {isManualUrlOpen ? 'Hide URL input' : 'Paste URL manually'}
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Error alert */}
      {errorMessage && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Upload failed</p>
            <p className="mt-0.5">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Preview or Upload Dropzone */}
      {value ? (
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="relative aspect-[16/9] w-full max-h-72 overflow-hidden rounded-lg bg-slate-100">
            {value.startsWith('/') || value.startsWith('http') ? (
              <img
                src={value}
                alt={altText || 'Featured image preview'}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-400">
                <ImageIcon className="h-10 w-10" />
              </div>
            )}

            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                <RefreshCw className="h-6 w-6 animate-spin" />
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="truncate text-xs text-slate-500 font-mono">
              {value}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isUploading ? 'animate-spin' : ''}`} />
                Replace
              </button>

              <button
                type="button"
                onClick={handleRemove}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100 disabled:opacity-50"
              >
                <X className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-8 text-center transition hover:border-sky-500 hover:bg-sky-50/20 ${
            isUploading ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="h-8 w-8 animate-spin text-sky-600" />
              <p className="text-sm font-medium text-slate-700">Uploading to Cloudinary...</p>
              <p className="text-xs text-slate-400">Optimizing image format and resolution</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-sky-100 p-3 text-sky-600">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Click to select and upload featured image
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  PNG, JPG, WebP up to 10MB. Automatically optimized with Cloudinary.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Manual URL entry fallback */}
      {isManualUrlOpen && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Manual Image URL (or Cloudinary URL)
          </label>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://res.cloudinary.com/..."
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>
      )}

      {/* Alt text field for SEO */}
      {onAltChange && (
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Featured Image Alt Text (for SEO & Accessibility)
          </label>
          <input
            type="text"
            value={altText}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="Descriptive alt text for the featured image"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-100"
          />
        </div>
      )}
    </div>
  )
}

