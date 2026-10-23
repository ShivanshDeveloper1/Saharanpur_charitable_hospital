import { z } from "zod";

export const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const generatedBlogSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  seoTitle: z.string(),
  metaDescription: z.string(),
  primaryKeyword: z.string(),
  secondaryKeywords: z.array(z.string()),
  heroImageAlt: z.string(),
  internalLinks: z.array(z.string()),
  faqs: z.array(faqSchema),
  sourceReferences: z.array(z.string()),
  medicalReviewRequired: z.boolean(),
});

export type GeneratedBlog = z.infer<typeof generatedBlogSchema>;

export const emptyBlog: GeneratedBlog = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Health Education",
  tags: [],
  seoTitle: "",
  metaDescription: "",
  primaryKeyword: "",
  secondaryKeywords: [],
  heroImageAlt: "",
  internalLinks: [],
  faqs: [],
  sourceReferences: [],
  medicalReviewRequired: true,
};