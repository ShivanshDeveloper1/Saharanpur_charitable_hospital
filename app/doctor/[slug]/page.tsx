import React from 'react';
import { Metadata } from 'next';
import { doctorsData } from '@/data/doctors';
import Link from 'next/link';

import DoctorProfileClient from '@/components/(doctors)/DoctorDisclaimer';

interface Props {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

// ---------------------------------------------------------
// Basic SEO: Dynamic Metadata Generation for Each Doctor
// ---------------------------------------------------------
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctor = doctorsData.find((d) => d.slug === slug);

  if (!doctor) {
    return {
      title: 'Doctor Not Found | Saksham Hospital',
      description: 'The requested doctor profile does not exist at Saksham Hospital, Saharanpur.',
    };
  }

  return {
    title: `${doctor.name} - ${doctor.specialty} | Saksham Hospital`,
    description: doctor.about || `Book an appointment with ${doctor.name} (${doctor.specialty}) at Saksham Hospital, Saharanpur. Check OPD timings, qualifications, and consultation fees.`,
    openGraph: {
      title: `${doctor.name} - ${doctor.specialty} | Saksham Hospital`,
      description: doctor.about || `Book an appointment with ${doctor.name} at Saksham Hospital.`,
      images: [{ url: doctor.image }],
    },
  };
}

export default async function DoctorProfilePage({ params }: Props) {
  const { slug } = await params;
  const doctor = doctorsData.find((d) => d.slug === slug);



  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-4">
        <h1 className="text-2xl font-bold mb-2">Doctor Not Found</h1>
        <p className="text-[var(--color-text-muted)] mb-4 text-center">The doctor profile you are looking for does not exist.</p>
        <Link href="/#doctors-section" className="text-[var(--color-accent-red)] hover:underline font-medium">
          &larr; Back to View All Doctors
        </Link>
      </div>
    );
  }

  return (
   <DoctorProfileClient doctor={doctor ?? null} />
  );
}