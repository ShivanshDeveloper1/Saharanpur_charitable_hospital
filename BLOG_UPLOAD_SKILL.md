# Skill: AI Blog JSON Generation for Hospital Website

Use this prompt/skill instruction with any AI model (Gemini, Claude, GPT, etc.) to generate 100% valid, production-ready blog JSON that directly uploads and renders through the hospital admin panel.

---

## 1. System Context & Overview

- **Platform**: Next.js App Router, React 19, Tailwind CSS with `@tailwindcss/typography`.
- **Database**: MongoDB with Mongoose.
- **Image Pipeline**: Cloudinary (handles secure delivery, responsive transforms, and auto-optimization).
- **Public URL**: `/blog/[slug]`.
- **Admin JSON Upload Endpoint**: `/admin/blogs/new` (JSON Upload tab) or API `POST /api/admin/blogs/json-upload`.

---

## 2. Exact MongoDB Blog Model Schema

Your output JSON must strictly match this MongoDB `BlogPost` model (`/models/Blog.ts`):

```typescript
{
  title: string;              // Required. Clear, compelling clinical headline.
  slug: string;               // Required. Lowercase, hyphenated URL slug. Unique.
  excerpt: string;            // Required. 2-3 sentence summary (max 500 chars).
  description?: string;       // Optional alias for excerpt.
  content: string;            // Required. HTML string containing article body (H2, H3, tables, lists).
  category: string;           // Required. Clinical specialty (e.g. "Orthopedics", "Cardiology").
  categorySlug?: string;       // Auto-generated lowercase slug of category.
  image?: string;             // Featured image URL (Cloudinary, Unsplash, or base64 data URI).
  imageAlt?: string;          // Descriptive alt text for SEO & accessibility.
  author?: string;            // Author name. Default: "Clinical Team".
  verifiedBy?: string;        // Reviewing authority (e.g. "Medical Review Board").
  readTime?: string;          // Estimated read duration (e.g. "5 min read").
  pageType: "pillar" | "cluster" | "article" | "standalone"; // Content hierarchy archetype.
  pillarSlug?: string;        // REQUIRED if pageType is "cluster". Must match parent pillar slug.
  relatedSlugs?: string[];    // Array of related article slugs.
  tags?: string[];            // Lowercase topic tags (e.g. ["knee pain", "joint care"]).
  seoTitle?: string;          // Meta title for Google (50-60 chars).
  metaDescription?: string;   // Meta description (140-160 chars).
  primaryKeyword?: string;    // Main SEO focus keyword.
  secondaryKeywords?: string[]; // 3-5 semantic supporting keywords.
  internalLinks?: string[];   // Suggested internal link paths (e.g. ["/blog/pillar-slug"]).
  canonicalUrl?: string;      // Canonical URL override (leave empty unless syndicating).
  isPublished?: boolean;      // true to publish live immediately, false for draft.
}
```

---

## 3. Pillar, Cluster, and Standalone Architecture

| Archetype (`pageType`) | When to Use | `pillarSlug` Rule |
| :--- | :--- | :--- |
| `"pillar"` | Comprehensive cornerstone guide covering an entire medical domain (e.g. Complete Joint Care Guide). | Must be empty `""`. |
| `"cluster"` | Specific chapter or sub-topic exploring one procedure or symptom (e.g. Knee Replacement Recovery). | **REQUIRED**. Must match the exact slug of its parent pillar. |
| `"article"` | Standard educational blog post or healthcare announcement. | Empty `""`. |
| `"standalone"` | Independent, self-contained article that does not belong to any topic cluster. | Empty `""`. |

---

## 4. Content Formatting & Rendering Rules

The `content` field should be formatted as semantic, clean HTML.

### A. Headings
- **Never include an `<h1>` tag inside `content`**. The page title is already the primary H1.
- Use `<h2>` for main sections.
- Use `<h3>` for sub-sections.
- Use `<h4>` for minor sub-points.

### B. Tables (Doctor Comparisons, Diagnostic Stages, Timelines)
Always provide clean table markup. The frontend automatically wraps all tables in responsive containers:
```html
<table>
  <thead>
    <tr>
      <th>Stage / Procedure</th>
      <th>Key Symptoms / Indications</th>
      <th>Recommended Clinical Care</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Early Osteoarthritis</td>
      <td>Stiffness after rest under 30 mins</td>
      <td>Physiotherapy, targeted low-impact exercises</td>
    </tr>
  </tbody>
</table>
```

### C. Lists
- Use `<ul>` and `<li>` for unordered lists.
- Use `<ol>` and `<li>` for step-by-step ordered procedures or recovery timelines.

### D. Blockquotes
Use `<blockquote>` for key clinical takeaways, patient precautions, or doctor notes:
```html
<blockquote>Early evaluation prevents irreversible cartilage breakdown and improves long-term outcomes.</blockquote>
```

### E. Links & Internal Linking
Use `<a href="/blog/target-slug">anchor text</a>` to link to other articles or parent pillars.

### F. Images Inside Content
Use `<img src="IMAGE_URL" alt="Descriptive alt text" />`. Remote URLs or base64 data URIs will automatically be uploaded to Cloudinary on import.

---

## 5. Complete Valid Blog JSON Template

```json
{
  "title": "5 Warning Signs You Need to See an Orthopedic Doctor in Saharanpur",
  "slug": "signs-to-see-orthopedic-doctor-saharanpur",
  "excerpt": "Wondering if lingering joint pain or morning stiffness requires specialist attention? Learn the 5 warning signs that indicate it is time to visit an orthopedic doctor.",
  "category": "Orthopedics",
  "pageType": "cluster",
  "pillarSlug": "signs-you-need-to-see-orthopedic-doctor-saharanpur",
  "image": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
  "imageAlt": "Orthopedic physician reviewing diagnostic knee x-ray with patient",
  "author": "Clinical Orthopedic Team",
  "verifiedBy": "Medical Review Board",
  "readTime": "6 min read",
  "tags": [
    "orthopedics",
    "joint pain",
    "knee health",
    "saharanpur"
  ],
  "seoTitle": "Signs to See an Orthopedic Doctor in Saharanpur | Joint Care",
  "metaDescription": "Learn key warning symptoms that indicate you should consult an orthopedic specialist in Saharanpur for joint and bone pain relief.",
  "primaryKeyword": "orthopedic doctor in saharanpur",
  "secondaryKeywords": [
    "knee pain specialist",
    "joint stiffness treatment",
    "bone clinic saharanpur"
  ],
  "isPublished": true,
  "content": "<h2>When Does Routine Discomfort Require Specialist Care?</h2>\n<p>Musculoskeletal discomfort is among the most frequent reasons adults seek medical advice. Delaying consultation often allows manageable joint inflammation to advance into irreversible cartilage degeneration.</p>\n\n<h2>Clinical Symptom Severity Matrix</h2>\n<table>\n  <thead>\n    <tr>\n      <th>Warning Sign</th>\n      <th>Clinical Implication</th>\n      <th>Recommended Action</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Persistent pain > 2 weeks</td>\n      <td>Possible chronic inflammation or wear</td>\n      <td>Digital radiography & clinical evaluation</td>\n    </tr>\n    <tr>\n      <td>Inability to bear weight</td>\n      <td>Ligament tear or hairline fracture</td>\n      <td>Immediate orthopedic consultation</td>\n    </tr>\n    <tr>\n      <td>Joint redness & warmth</td>\n      <td>Acute synovitis, gout, or infection</td>\n      <td>Urgent diagnostic aspiration / blood panel</td>\n    </tr>\n  </tbody>\n</table>\n\n<h3>Key Warning Signs to Monitor</h3>\n<ul>\n  <li><strong>Morning Joint Stiffness:</strong> Stiffness lasting greater than 30 minutes.</li>\n  <li><strong>Catching or Giving Way:</strong> Sensation of instability in the knee or ankle.</li>\n  <li><strong>Radiating Pain:</strong> Lower back discomfort travelling down the leg (sciatica).</li>\n</ul>\n\n<blockquote>Emergency Alert: If joint pain is accompanied by high fever or visible bone deformity following a fall, visit emergency trauma care immediately.</blockquote>\n\n<p>For specialized care, schedule a consultation with our <a href=\"/blog/signs-you-need-to-see-orthopedic-doctor-saharanpur\">orthopedic team in Saharanpur</a>.</p>"
}
```

---

## 6. AI Prompting Instructions (What AI Must & Must Not Do)

### MUST DO:
1. **Output ONLY the raw JSON object** inside a standard JSON block (no conversational preamble or postscript).
2. **Ensure proper JSON escaping**: Double quotes inside HTML attributes must be escaped (`\"`) or use single quotes (`'`). Newlines must be written as `\n`.
3. **Include tables and lists**: Every comprehensive guide should feature at least one structured comparison or summary table.
4. **Use patient-friendly, trustworthy medical terminology**: Maintain empathetic, informative, and medically responsible tone.
5. **Set `isPublished: true`** unless specifically requested as a draft.

### MUST NOT DO:
1. **Never use `<h1>` in `content`**.
2. **Never wrap headings inside `<p>` tags** (e.g. never `<p>## Heading</p>`).
3. **Never omit `pillarSlug` when `pageType` is `"cluster"`**.
4. **Never leave `title`, `slug`, `excerpt`, `content`, or `category` empty**.
5. **Never output invalid JSON syntax** (trailing commas, unescaped quotes).

