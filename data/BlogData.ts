export interface BlogSegment {
  text: string
  slug?: string
  isLink?: boolean
}

export interface BlogBlock {
  type: 'paragraph' | 'heading' | 'list'
  segments?: BlogSegment[]
  items?: string[]
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  category: string
  date: string
  image: string
  excerpt: string
  author: string
  verifiedBy: string
  readTime: string
  tags: string[]
  isPublished: boolean
  publishedAt: Date
  relatedSlugs: string[]
  content: BlogBlock[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Understanding Common Symptoms of Seasonal Allergies',
    slug: 'understanding-common-symptoms-seasonal-allergies',
    category: 'Healthcare',
   date: 'October 12, 2026',
    image: '/after_surgery.jpg',
    excerpt: 'Learn about common seasonal allergy symptoms, potential triggers, and when to seek advice from a qualified healthcare professional.',
    author: 'Clinical Team',
    verifiedBy: 'Medical Review Board',
    readTime: '5 min read',
    tags: ['seasonal allergies', 'symptoms', 'healthcare'],
    isPublished: true,
    publishedAt: new Date('2026-10-12T10:00:00Z'),
    relatedSlugs: [
      'modern-advancements-minimally-invasive-surgery',
      '10-essential-daily-habits-heart-health',
    ],
    content: [
      {
        type: 'paragraph',
        segments: [
          {
            text: 'Seasonal allergies may cause sneezing, a runny or blocked nose, itchy eyes, and other symptoms. Symptoms vary from person to person, so persistent or concerning symptoms should be discussed with a qualified healthcare professional.',
          },
        ],
      },
      {
        type: 'heading',
        segments: [{ text: 'Common symptoms' }],
      },
      {
        type: 'list',
        items: [
          'Sneezing and nasal irritation',
          'Runny or congested nose',
          'Itchy or watery eyes',
          'Symptoms that recur during particular seasons',
        ],
      },
      {
        type: 'paragraph',
        segments: [
          {
            text: 'The right care depends on your symptoms and medical history. A healthcare professional can help assess persistent symptoms and discuss suitable options.',
          },
        ],
      },
      {
        type: 'paragraph',
        segments: [
          {
            text: 'You can also explore our guide to ',
          },
          {
            text: 'modern advancements in minimally invasive surgery',
            slug: 'modern-advancements-minimally-invasive-surgery',
            isLink: true,
          },
          {
            text: ' for another perspective on how treatment approaches continue to evolve.',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Modern Advancements in Minimally Invasive Surgery',
    slug: 'modern-advancements-minimally-invasive-surgery',
    category: 'Treatments',
    date: 'October 12, 2026',
    image: '/after_surgery.jpg',
    excerpt: 'Discover how minimally invasive surgical approaches may use smaller incisions and specialized instruments, depending on the procedure.',
    author: 'Clinical Team',
    verifiedBy: 'Medical Review Board',
    readTime: '6 min read',
    tags: ['surgery', 'treatments', 'medical technology'],
    isPublished: true,
    publishedAt: new Date('2026-10-08T10:00:00Z'),
    relatedSlugs: [
      'understanding-common-symptoms-seasonal-allergies',
    ],
    content: [
      {
        type: 'paragraph',
        segments: [
          {
            text: 'Minimally invasive surgery describes procedures performed using specialized instruments and techniques, often through smaller incisions than traditional open surgery. The appropriate approach depends on the condition, procedure, and individual patient.',
          },
        ],
      },
      {
        type: 'heading',
        segments: [{ text: 'Potential benefits and considerations' }],
      },
      {
        type: 'list',
        items: [
          'Some procedures may involve smaller incisions.',
          'Recovery and hospital stays vary by procedure and patient.',
          'Not every condition is suitable for a minimally invasive approach.',
          'A qualified surgeon can explain the risks, benefits, and alternatives.',
        ],
      },
      {
        type: 'paragraph',
        segments: [
          {
            text: 'Treatment decisions should always be based on an individual clinical assessment rather than general information alone.',
          },
        ],
      },
      {
        type: 'paragraph',
        segments: [
          {
            text: 'For more healthcare reading, see ',
          },
          {
            text: 'our guide to seasonal allergy symptoms',
            slug: 'understanding-common-symptoms-seasonal-allergies',
            isLink: true,
          },
          {
            text: ' to learn about a different area of patient health.',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: '10 Essential Daily Habits for Better Heart Health',
    slug: '10-essential-daily-habits-heart-health',
    category: 'Wellness',
    date: 'October 12, 2026',
    image: '/after_surgery.jpg',
    excerpt: 'Incorporate these ten simple, doctor-recommended habits into your daily routine to strengthen cardiovascular health over time.',
    author: 'Clinical Team',
    verifiedBy: 'Medical Review Board',
    readTime: '7 min read',
    tags: ['heart health', 'wellness', 'habits'],
    isPublished: true,
    publishedAt: new Date('2026-10-01T10:00:00Z'),
    relatedSlugs: [
      'understanding-common-symptoms-seasonal-allergies',
    ],
    content: [
      {
        type: 'paragraph',
        segments: [
          {
            text: 'Maintaining cardiovascular health requires consistent, daily lifestyle choices. Small adjustments in diet, physical activity, and stress management can yield substantial long-term benefits for your heart.',
          },
        ],
      },
      {
        type: 'heading',
        segments: [{ text: 'Core daily practices' }],
      },
      {
        type: 'list',
        items: [
          'Engage in at least 30 minutes of moderate aerobic activity daily.',
          'Prioritize a diet rich in leafy greens, whole grains, and lean proteins.',
          'Monitor blood pressure levels regularly.',
          'Ensure 7 to 8 hours of restorative sleep each night.',
        ],
      },
      {
        type: 'paragraph',
        segments: [
          {
            text: 'Consistent checkups with your physician ensure that your heart metrics stay within a healthy range.',
          },
        ],
      },
      {
        type: 'paragraph',
        segments: [
          {
            text: 'You may also want to read our article on ',
          },
          {
            text: 'navigating chronic illness',
            slug: 'navigating-chronic-illness-tips',
            isLink: true,
          },
          {
            text: ' for guidance on long-term wellness management.',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Navigating Chronic Illness: Tips for Patients and Caregivers',
    slug: 'navigating-chronic-illness-tips',
    category: 'Illnesses',
    date: 'October 12, 2026',
    image: '/after_surgery.jpg',
    excerpt: 'Practical advice, emotional support strategies, and structured approaches for individuals managing chronic conditions and their caregivers.',
    author: 'Clinical Team',
    verifiedBy: 'Medical Review Board',
    readTime: '8 min read',
    tags: ['chronic illness', 'caregivers', 'patient care'],
    isPublished: true,
    publishedAt: new Date('2026-09-25T10:00:00Z'),
    relatedSlugs: [
      '10-essential-daily-habits-heart-health',
    ],
    content: [
      {
        type: 'paragraph',
        segments: [
          {
            text: 'Living with or caring for someone with a chronic illness presents unique daily challenges. Establishing a reliable support network and open communication channels with healthcare providers is essential.',
          },
        ],
      },
      {
        type: 'heading',
        segments: [{ text: 'Key coping strategies' }],
      },
      {
        type: 'list',
        items: [
          'Keep detailed records of symptoms, medications, and appointments.',
          'Join local or online support groups for shared experiences.',
          'Take scheduled respite breaks to prevent caregiver burnout.',
          'Communicate openly with your clinical care team about treatment adjustments.',
        ],
      },
      {
        type: 'paragraph',
        segments: [
          {
            text: 'Remember that managing a condition is a gradual journey that requires patience and structured clinical guidance.',
          },
        ],
      },
      {
        type: 'paragraph',
        segments: [
          {
            text: 'Explore our preventive wellness guide in ',
          },
          {
            text: '10 essential daily habits for better heart health',
            slug: '10-essential-daily-habits-heart-health',
            isLink: true,
          },
          {
            text: ' to support overall vitality.',
          },
        ],
      },
    ],
  },
]