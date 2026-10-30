"use client"

import { useParams } from 'next/navigation'
import BlogEditor from '@/components/(admin)/admin/BlogEditor'

export default function EditBlogPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id

  if (!id) {
    return (
      <div className="mx-auto max-w-4xl p-6 md:p-10 text-center">
        <p className="text-sm text-slate-500">Invalid blog ID.</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <BlogEditor blogId={id} />
    </main>
  )
}
