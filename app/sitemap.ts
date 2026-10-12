// app/sitemap.ts
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.yourdomain.com";
  return ["", "/contact", "/services"].map((p) => ({ url: base + p, lastModified: new Date() }));
}