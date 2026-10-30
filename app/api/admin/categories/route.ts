import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import BlogCategory from '@/models/BlogCategory'

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export async function GET() {
  await connectDB()
  const categories = await BlogCategory.find().sort({ name: 1 }).lean()
  return NextResponse.json({ categories })
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()
  const name = String(body.name || '').trim()
  if (!name) return NextResponse.json({ error: 'Category name is required.' }, { status: 400 })

  const category = await BlogCategory.findOneAndUpdate(
    { slug: slugify(name) },
    { $set: { name, slug: slugify(name), description: String(body.description || ''), isActive: true } },
    { upsert: true, new: true }
  )

  return NextResponse.json({ category })
}

export async function PATCH(req: Request) {
  await connectDB()
  const body = await req.json()
  const id = String(body.id || '')
  const name = String(body.name || '').trim()

  if (!id || !name) return NextResponse.json({ error: 'Category id and name are required.' }, { status: 400 })

  const category = await BlogCategory.findByIdAndUpdate(
    id,
    { $set: { name, slug: slugify(name), description: String(body.description || '') } },
    { new: true }
  )

  return NextResponse.json({ category })
}

export async function DELETE(req: Request) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) return NextResponse.json({ error: 'Category id is required.' }, { status: 400 })

  await BlogCategory.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
