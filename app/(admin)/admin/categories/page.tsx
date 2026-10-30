"use client"

import { useEffect, useState } from 'react'

type Category = {
  _id: string
  name: string
  slug: string
  description?: string
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  async function loadCategories() {
    const response = await fetch('/api/admin/categories')
    const data = await response.json()
    setCategories(data.categories || [])
  }

  useEffect(() => {
    loadCategories()
  }, [])

  async function saveCategory() {
    const payload = { name, description }
    const response = await fetch('/api/admin/categories', {
      method: editingId ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingId ? { ...payload, id: editingId } : payload),
    })

    const data = await response.json()
    if (!response.ok) {
      setMessage(data.error || 'Failed to save category.')
      return
    }

    setMessage('Category saved successfully.')
    setName('')
    setDescription('')
    setEditingId(null)
    loadCategories()
  }

  async function deleteCategory(id: string) {
    const response = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' })
    if (response.ok) {
      setMessage('Category deleted.')
      loadCategories()
    }
  }

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6 md:p-10">
      <div>
        <p className="text-sm text-sky-600">Admin / Content</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Blog categories</h1>
      </div>

      {message && (
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">{message}</div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_2fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            {editingId ? 'Edit category' : 'Create category'}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Name</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                placeholder="Testimonials"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Description</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                placeholder="Optional category summary"
              />
            </div>

            <button
              type="button"
              onClick={saveCategory}
              className="rounded-xl bg-sky-600 px-4 py-2.5 font-semibold text-white transition hover:bg-sky-700"
            >
              {editingId ? 'Update category' : 'Add category'}
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Existing categories</h2>

          <ul className="space-y-3">
            {categories.length === 0 && <li className="text-sm text-slate-500">No categories yet.</li>}
            {categories.map((category) => (
              <li key={category._id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <div>
                  <p className="font-medium text-slate-800">{category.name}</p>
                  <p className="text-xs text-slate-500">/{category.slug}</p>
                  {category.description && <p className="mt-1 text-xs text-slate-500">{category.description}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(category._id)
                      setName(category.name)
                      setDescription(category.description || '')
                    }}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteCategory(category._id)}
                    className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
