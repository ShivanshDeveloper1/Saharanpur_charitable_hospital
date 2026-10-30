"use client"

import { useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

const buttonClass =
  'inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:border-sky-300 hover:text-sky-700'

function ToolbarButton({
  active,
  disabled,
  label,
  onClick,
}: {
  active?: boolean
  disabled?: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${buttonClass} ${
        active ? 'border-sky-400 bg-sky-50 text-sky-700 font-semibold' : ''
      } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
      {label}
    </button>
  )
}

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-sky-700 underline underline-offset-4',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'min-w-full divide-y divide-slate-200 border border-slate-200 text-left text-sm',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || '<p>Start writing your blog article...</p>',
    editorProps: {
      attributes: {
        class:
          'prose prose-slate max-w-none min-h-[300px] rounded-b-xl bg-white p-5 text-[15px] leading-7 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) return
    const currentHTML = editor.getHTML()
    if (value !== currentHTML) {
      editor.commands.setContent(value || '<p></p>', { emitUpdate: false })
    }
  }, [editor, value])

  if (!editor) return null

  const handleImageUpload = async () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'
    fileInput.onchange = async () => {
      const file = fileInput.files?.[0]
      if (!file) return

      try {
        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('/api/admin/blogs/upload', {
          method: 'POST',
          body: formData,
        })

        const data = await res.json()
        if (!res.ok) {
          const fallbackUrl = window.prompt(
            'Cloudinary upload failed: ' + (data.error || 'Unknown error') + '\nEnter image URL directly:'
          )
          if (fallbackUrl) {
            editor.chain().focus().setImage({ src: fallbackUrl, alt: 'Blog illustration' }).run()
          }
          return
        }

        editor.chain().focus().setImage({ src: data.url, alt: file.name || 'Blog image' }).run()
      } catch (err: any) {
        const fallbackUrl = window.prompt('Upload failed. Enter image URL directly:')
        if (fallbackUrl) {
          editor.chain().focus().setImage({ src: fallbackUrl, alt: 'Blog illustration' }).run()
        }
      }
    }
    fileInput.click()
  }

  const handleInsertImageUrl = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url, alt: 'Blog illustration' }).run()
    }
  }

  const isTableActive = editor.isActive('table')

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
      {/* Primary Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 bg-white p-2.5">
        <ToolbarButton
          label="H2"
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          label="H3"
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <ToolbarButton
          label="H4"
          active={editor.isActive('heading', { level: 4 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        />

        <div className="mx-1 h-4 w-px bg-slate-200" />

        <ToolbarButton
          label="Bold"
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="Italic"
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="Underline"
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />

        <div className="mx-1 h-4 w-px bg-slate-200" />

        <ToolbarButton
          label="Link"
          active={editor.isActive('link')}
          onClick={() => {
            const previousUrl = editor.getAttributes('link').href || ''
            const url = window.prompt('Enter link URL (e.g. /blog/other-post or https://...):', previousUrl)
            if (url === null) return
            if (url === '') {
              editor.chain().focus().unsetLink().run()
              return
            }
            editor.chain().focus().setLink({ href: url }).run()
          }}
        />

        <ToolbarButton
          label="Quote"
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarButton
          label="Bullet List"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="Numbered List"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />

        <div className="mx-1 h-4 w-px bg-slate-200" />

        <ToolbarButton
          label="Align Left"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        />
        <ToolbarButton
          label="Align Center"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        />
        <ToolbarButton
          label="Align Right"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        />

        <div className="mx-1 h-4 w-px bg-slate-200" />

        <ToolbarButton
          label="Insert Table"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        />

        <ToolbarButton label="Upload Image" onClick={handleImageUpload} />
        <ToolbarButton label="Image URL" onClick={handleInsertImageUrl} />

        <div className="mx-1 h-4 w-px bg-slate-200" />

        <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()} />
        <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()} />
      </div>

      {/* Table controls sub-bar (appears when cursor is inside a table) */}
      {isTableActive && (
        <div className="flex flex-wrap items-center gap-1 border-b border-sky-100 bg-sky-50/70 px-3 py-1.5 text-xs">
          <span className="font-semibold text-sky-800 mr-2">Table:</span>
          <button
            type="button"
            className="rounded px-2 py-0.5 bg-white text-slate-700 hover:bg-sky-100"
            onClick={() => editor.chain().focus().addColumnBefore().run()}
          >
            + Col Left
          </button>
          <button
            type="button"
            className="rounded px-2 py-0.5 bg-white text-slate-700 hover:bg-sky-100"
            onClick={() => editor.chain().focus().addColumnAfter().run()}
          >
            + Col Right
          </button>
          <button
            type="button"
            className="rounded px-2 py-0.5 bg-white text-slate-700 hover:bg-sky-100"
            onClick={() => editor.chain().focus().deleteColumn().run()}
          >
            - Delete Col
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            className="rounded px-2 py-0.5 bg-white text-slate-700 hover:bg-sky-100"
            onClick={() => editor.chain().focus().addRowBefore().run()}
          >
            + Row Above
          </button>
          <button
            type="button"
            className="rounded px-2 py-0.5 bg-white text-slate-700 hover:bg-sky-100"
            onClick={() => editor.chain().focus().addRowAfter().run()}
          >
            + Row Below
          </button>
          <button
            type="button"
            className="rounded px-2 py-0.5 bg-white text-slate-700 hover:bg-sky-100"
            onClick={() => editor.chain().focus().deleteRow().run()}
          >
            - Delete Row
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            className="rounded px-2 py-0.5 bg-red-100 text-red-700 hover:bg-red-200"
            onClick={() => editor.chain().focus().deleteTable().run()}
          >
            Delete Table
          </button>
        </div>
      )}

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  )
}
