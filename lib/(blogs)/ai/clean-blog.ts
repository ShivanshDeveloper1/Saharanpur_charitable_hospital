import { generatedBlogSchema, type GeneratedBlog } from "./blog-schema";

function cleanText(value: string): string {
  return value
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(/[\t ]+/g, " ")
    .replace(/ *\n */g, "\n")
    .trim();
}

function uniqueStrings(items: string[]): string[] {
  const seen = new Set<string>();
  return items
    .map(cleanText)
    .filter(Boolean)
    .filter((item) => {
      const key = item.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function cleanMarkdown(markdown: string): string {
  const blocks = cleanText(markdown).split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  const seen = new Set<string>();

  return blocks
    .filter((block) => {
      if (/^#{1,6}\s/.test(block)) return true;
      const key = block.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join("\n\n");
}

export function cleanGeneratedBlog(input: unknown): GeneratedBlog {
  const blog = generatedBlogSchema.parse(input);

  const slug = cleanText(blog.slug || blog.title)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const seenFaqs = new Set<string>();
  const faqs = blog.faqs
    .map((faq) => ({
      question: cleanText(faq.question),
      answer: cleanText(faq.answer),
    }))
    .filter((faq) => {
      if (!faq.question || !faq.answer) return false;
      const key = faq.question.toLowerCase();
      if (seenFaqs.has(key)) return false;
      seenFaqs.add(key);
      return true;
    });

  return {
    ...blog,
    title: cleanText(blog.title),
    slug,
    excerpt: cleanText(blog.excerpt),
    content: cleanMarkdown(blog.content),
    category: cleanText(blog.category),
    tags: uniqueStrings(blog.tags),
    seoTitle: cleanText(blog.seoTitle),
    metaDescription: cleanText(blog.metaDescription),
    primaryKeyword: cleanText(blog.primaryKeyword),
    secondaryKeywords: uniqueStrings(blog.secondaryKeywords),
    heroImageAlt: cleanText(blog.heroImageAlt),
    internalLinks: uniqueStrings(blog.internalLinks),
    sourceReferences: uniqueStrings(blog.sourceReferences),
    faqs,
    medicalReviewRequired: blog.medicalReviewRequired,
  };
}