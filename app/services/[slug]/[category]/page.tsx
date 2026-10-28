import React from 'react';
import { servicesData } from '@/data/servicesData'; // Adjust path to your servicesData file
import { notFound } from 'next/navigation';
import SpecialtyPage from '@/components/(services)/EevrySubService';


interface PageProps {
  params: {
    slug: string;
    category: string;
  };
}

// Helper to convert text to slug matching the card component

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

interface PageProps {
  params: Promise<{ slug: string; category: string }>;
}

export async function generateStaticParams() {
  return servicesData.flatMap((service) =>
    service.problems.map((problem) => ({
      slug: service.slug,
      category: problem.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, category } = await params;

  const service = servicesData.find((s) => s.slug === slug);
  const problem = service?.problems.find((p) => p.slug === category);

  if (!service || !problem) {
    return { title: "Page Not Found | SCHARI Hospital" };
  }

  const url = `${BASE_URL}/services/${service.slug}/${problem.slug}`;
  const title = `${problem.title} Treatment in Saharanpur | SCHARI Hospital`;
  const description = problem.description;
  const image = problem.img || service.images?.[0];

  const keywords = Array.from(
    new Set([
      ...(problem.keywords ?? []),
      ...(service.keywords ?? []),
    ])
  );

  return {
    title,
    description,
    ...(keywords.length ? { keywords } : {}),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "SCHARI Hospital",
      type: "article",
      ...(image ? { images: [{ url: image, alt: problem.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function ServiceCategoryPage({ params }: PageProps) {
  const { slug, category } = await params;

  // Find the matching service
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  // Find the matching problem/category
 const problem = service.problems.find(
  (p) => p.slug === category
);

  if (!problem) {
    notFound();
  }

const { icon, ...serviceData } = service;

return (
  <SpecialtyPage
    service={serviceData}
    problem={problem}
  />
);
} 