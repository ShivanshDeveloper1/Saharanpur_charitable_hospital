import React from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { IBlogBlock } from '@/models/Blog'

interface BlogContentRendererProps {
  content: any
  contentHtml?: string
}

// Convert Tiptap JSON nodes to clean HTML or renderable structure if needed
function renderTiptapNode(node: any, index: number): React.ReactNode {
  if (!node) return null

  switch (node.type) {
    case 'heading': {
      const level = node.attrs?.level || 2
      const text = node.content?.map((c: any) => c.text).join('') || ''
      const className =
        level === 2
          ? 'mt-8 mb-4 text-2xl font-bold tracking-tight text-foreground border-b border-medical-line/20 pb-2'
          : level === 3
          ? 'mt-6 mb-3 text-xl font-bold text-foreground'
          : 'mt-5 mb-2 text-lg font-semibold text-foreground'

      if (level === 2) return <h2 key={index} className={className}>{text}</h2>
      if (level === 3) return <h3 key={index} className={className}>{text}</h3>
      return <h4 key={index} className={className}>{text}</h4>
    }
    case 'paragraph': {
      return (
        <p key={index} className="text-base sm:text-lg mt-4 leading-relaxed text-foreground/90">
          {node.content?.map((c: any, i: number) => {
            if (c.marks?.some((m: any) => m.type === 'link')) {
              const linkMark = c.marks.find((m: any) => m.type === 'link')
              const href = linkMark?.attrs?.href || '#'
              return (
                <Link
                  key={i}
                  href={href}
                  className="text-accent-red font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  {c.text}
                </Link>
              )
            }
            if (c.marks?.some((m: any) => m.type === 'bold')) {
              return <strong key={i} className="font-semibold text-foreground">{c.text}</strong>
            }
            if (c.marks?.some((m: any) => m.type === 'italic')) {
              return <em key={i} className="italic">{c.text}</em>
            }
            return <span key={i}>{c.text}</span>
          })}
        </p>
      )
    }
    case 'bulletList': {
      return (
        <ul key={index} className="my-4 space-y-2 list-disc list-inside text-text-muted text-base sm:text-lg">
          {node.content?.map((item: any, i: number) => (
            <li key={i}>{item.content?.map((p: any) => p.content?.map((c: any) => c.text).join('')).join(' ')}</li>
          ))}
        </ul>
      )
    }
    case 'orderedList': {
      return (
        <ol key={index} className="my-4 space-y-2 list-decimal list-inside text-text-muted text-base sm:text-lg">
          {node.content?.map((item: any, i: number) => (
            <li key={i}>{item.content?.map((p: any) => p.content?.map((c: any) => c.text).join('')).join(' ')}</li>
          ))}
        </ol>
      )
    }
    case 'blockquote': {
      const text = node.content?.map((c: any) => c.content?.map((t: any) => t.text).join('')).join(' ')
      return (
        <blockquote key={index} className="my-6 border-l-4 border-accent-red pl-4 italic text-text-muted">
          {text}
        </blockquote>
      )
    }
    case 'image': {
      return (
        <div key={index} className="my-6 overflow-hidden rounded-xl bg-surface border border-medical-line/10">
          <img
            src={node.attrs?.src}
            alt={node.attrs?.alt || 'Article image'}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      )
    }
    default:
      return null
  }
}

export default function BlogContentRenderer({ content, contentHtml }: BlogContentRendererProps) {
  // 1. Check if content is an array of legacy blocks: [{ type: 'paragraph', segments: [...] }, ...]
  if (Array.isArray(content) && content.length > 0 && (content[0].type || content[0].segments)) {
    return (
      <div className="prose prose-lg max-w-none text-foreground leading-relaxed">
        {content.map((block: IBlogBlock, index: number) => {
          if (block.type === 'paragraph' && block.segments) {
            return (
              <p key={index} className="text-base sm:text-lg mt-4 leading-relaxed text-foreground/90">
                {block.segments.map((segment, sIndex) => {
                  if (segment.isLink && segment.slug) {
                    const href = segment.slug.startsWith('/')
                      ? segment.slug
                      : segment.slug.startsWith('http')
                      ? segment.slug
                      : `/blog/${segment.slug}`
                    return (
                      <Link
                        key={sIndex}
                        href={href}
                        className="text-accent-red font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
                      >
                        {segment.text}
                      </Link>
                    )
                  }
                  return <span key={sIndex}>{segment.text}</span>
                })}
              </p>
            )
          }

          if (block.type === 'heading') {
            const headingText = block.segments?.[0]?.text || ''
            return (
              <h2
                key={index}
                className="mt-10 mb-4 text-2xl font-bold tracking-tight text-foreground border-b border-medical-line/20 pb-2"
              >
                {headingText}
              </h2>
            )
          }

          if (block.type === 'list' && block.items) {
            return (
              <ul key={index} className="mt-4 space-y-2 list-disc list-inside text-text-muted text-base sm:text-lg">
                {block.items.map((item, iIndex) => (
                  <li key={iIndex}>{item}</li>
                ))}
              </ul>
            )
          }

          return null
        })}
      </div>
    )
  }

  // 2. Check if content is Tiptap JSON doc: { type: 'doc', content: [...] }
  let parsedContent = content
  if (typeof content === 'string' && (content.startsWith('{"type":"doc"') || content.startsWith('{"type": "doc"'))) {
    try {
      parsedContent = JSON.parse(content)
    } catch {
      // not JSON
    }
  }

  if (parsedContent && typeof parsedContent === 'object' && parsedContent.type === 'doc' && Array.isArray(parsedContent.content)) {
    return (
      <div className="prose prose-lg max-w-none text-foreground leading-relaxed">
        {parsedContent.content.map((node: any, i: number) => renderTiptapNode(node, i))}
      </div>
    )
  }

  // 3. String content (HTML or Markdown or Markdown wrapped in HTML)
  const rawString = typeof content === 'string' && content.trim() ? content : contentHtml || ''

  if (!rawString) {
    return (
      <div className="text-text-muted italic py-6">
        No content available for this article yet.
      </div>
    )
  }

  // Check if string contains markdown indicators (like "##", "###", "| --- |", "- **")
  const looksLikeMarkdown =
    /(^|\n)#{1,6}\s/m.test(rawString) ||
    /\|\s*---+\s*\|/.test(rawString) ||
    /(^|\n)[-*]\s+\*\*/m.test(rawString) ||
    rawString.includes('<p>##')

  // Clean any accidental `<p>## Heading</p>` or `<p>### Heading</p>` wraps from generators
  let cleanedString = rawString
  if (cleanedString.includes('<p>##') || cleanedString.includes('<p>###') || cleanedString.includes('<p>- ')) {
    cleanedString = cleanedString
      .replace(/<p>(#{1,6}\s+[^<]+)<\/p>/g, '$1\n\n')
      .replace(/<p>([*-]\s+[^<]+)<\/p>/g, '$1\n\n')
      .replace(/<p>/g, '\n\n')
      .replace(/<\/p>/g, '\n\n')
      .replace(/<br\s*\/?>/g, '\n')
  }

  if (looksLikeMarkdown) {
    return (
      <div className="prose prose-lg max-w-none text-foreground leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h2 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-foreground border-b border-medical-line/20 pb-2">
                {children}
              </h2>
            ),
            h2: ({ children }) => (
              <h2 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-foreground border-b border-medical-line/20 pb-2">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-6 mb-3 text-xl font-bold text-foreground">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="mt-5 mb-2 text-lg font-semibold text-foreground">
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-foreground/90">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="my-4 space-y-2 list-disc list-inside text-text-muted text-base sm:text-lg">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="my-4 space-y-2 list-decimal list-inside text-text-muted text-base sm:text-lg">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed">
                {children}
              </li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="my-6 border-l-4 border-accent-red pl-4 italic text-text-muted bg-surface/50 py-2 rounded-r-lg">
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => {
              const isInternal = href?.startsWith('/') || href?.startsWith('#')
              if (isInternal) {
                return (
                  <Link
                    href={href || '#'}
                    className="text-accent-red font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    {children}
                  </Link>
                )
              }
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-red font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  {children}
                </a>
              )
            },
            table: ({ children }) => (
              <div className="my-6 overflow-x-auto rounded-xl border border-medical-line/20 shadow-sm">
                <table className="min-w-full divide-y divide-medical-line/20 text-left text-sm">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-medical-blue/20 text-xs font-semibold uppercase tracking-wider text-foreground">
                {children}
              </thead>
            ),
            tbody: ({ children }) => (
              <tbody className="divide-y divide-medical-line/10 bg-surface">
                {children}
              </tbody>
            ),
            tr: ({ children }) => (
              <tr className="hover:bg-medical-blue/5 transition-colors">
                {children}
              </tr>
            ),
            th: ({ children }) => (
              <th className="px-4 py-3 font-semibold text-foreground">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-4 py-3 text-text-muted leading-relaxed">
                {children}
              </td>
            ),
            img: ({ src, alt }) => (
              <span className="my-6 block overflow-hidden rounded-xl bg-surface border border-medical-line/10">
                <img
                  src={src}
                  alt={alt || 'Article visual'}
                  className="w-full h-auto object-cover max-h-[500px]"
                  loading="lazy"
                />
              </span>
            ),
          }}
        >
          {cleanedString}
        </ReactMarkdown>
      </div>
    )
  }

  // 4. Standard rich HTML
  let htmlToRender = rawString
  if (htmlToRender.includes('<table') && !htmlToRender.includes('overflow-x-auto')) {
    htmlToRender = htmlToRender
      .replace(/<table/gi, '<div class="overflow-x-auto my-6 rounded-xl border border-medical-line/20 shadow-xs"><table')
      .replace(/<\/table>/gi, '</table></div>')
  }

  return (
    <div
      className="prose prose-lg max-w-none text-foreground leading-relaxed
        prose-headings:text-foreground prose-headings:font-bold
        prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-2xl prose-h2:border-b prose-h2:border-medical-line/20 prose-h2:pb-2
        prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-xl
        prose-h4:mt-5 prose-h4:mb-2 prose-h4:text-lg
        prose-p:mt-4 prose-p:text-base sm:prose-p:text-lg prose-p:leading-relaxed prose-p:text-foreground/90
        prose-a:text-accent-red prose-a:underline prose-a:underline-offset-4 hover:prose-a:opacity-80
        prose-blockquote:border-l-4 prose-blockquote:border-accent-red prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-text-muted
        prose-ul:my-4 prose-ul:list-disc prose-ul:list-inside prose-ul:text-text-muted
        prose-ol:my-4 prose-ol:list-decimal prose-ol:list-inside prose-ol:text-text-muted
        prose-img:rounded-xl prose-img:border prose-img:border-medical-line/10 prose-img:shadow-sm prose-img:max-h-[500px] prose-img:w-full prose-img:object-cover
        [&_table]:min-w-full [&_table]:border-collapse [&_table]:text-sm
        [&_thead]:bg-medical-blue/20
        [&_th]:bg-medical-blue/20 [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:border [&_th]:border-medical-line/20 [&_th]:text-foreground
        [&_td]:p-3 [&_td]:border [&_td]:border-medical-line/15 [&_td]:text-text-muted
        [&_div:has(>table)]:overflow-x-auto [&_div:has(>table)]:my-6 [&_div:has(>table)]:rounded-xl [&_div:has(>table)]:border [&_div:has(>table)]:border-medical-line/20"
      dangerouslySetInnerHTML={{ __html: htmlToRender }}
    />
  )
}

