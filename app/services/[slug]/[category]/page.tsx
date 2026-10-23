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
const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};


export async function generateStaticParams() {
  const paths: { slug: string; category: string }[] = [];
  
  servicesData.forEach((service) => {
    service.problems.forEach((problem) => {
      paths.push({
        slug: service.slug,
        category: createSlug(problem.title),
      });
    });
  });

  return paths;
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
    (p) => createSlug(p.title) === category
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