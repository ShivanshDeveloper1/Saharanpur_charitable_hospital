import Image from "next/image";
import Link from "next/link";
import { Poppins, Playfair_Display } from "next/font/google";
import { servicesData, getServiceBySlug } from "@/data/servicesData";
import ProblemsWeTreat from "@/components/(notSure)/ProblemsWeTreat";
import HospitalIntroduction from "@/components/(notSure)/HospitalIntroduction";
import DoctorSpecialist from "@/components/(notSure)/DoctorSpecialist";
import FrequesntlyAskedQuestion from "@/components/(notSure)/FrequesntlyAskedQuestion";

const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
});

const serif = Playfair_Display({
  subsets: ["latin"],
  style: "italic",
  weight: "600",
});

// Dot grid with CSS only
const dots = (color: string) => ({
  backgroundImage: `radial-gradient(${color} 2px, transparent 2.5px)`,
  backgroundSize: "24px 24px",
});

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const doc = service.doctor;

  return (
    <main className={`${sans.className} min-h-screen overflow-x-hidden bg-medical-blue text-foreground`}>
      <section className="mx-auto grid max-w-8xl items-start gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:p-0 lg:pt-6">
        {/* LEFT */}
        <div className="relative mb-6 mr-0 lg:mb-12 lg:mr-10">
          {/* Offset frame line - hidden on mobile to prevent clipping, visible on lg+ */}
          <div className="absolute inset-0 hidden lg:block translate-x-8 translate-y-9 border border-primary-dark/40" />

          <div className="relative bg-surface p-6 sm:p-8 lg:p-16 shadow-sm lg:shadow-none">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-text-muted">
              {service.subtitle}
            </p>

            <h1 className="mt-4 sm:mt-6 text-4xl sm:text-6xl font-extrabold uppercase leading-[1.05] sm:leading-[0.95] text-primary-dark lg:text-7xl">
              ADVANCED
              <span
                className={`${serif.className} block text-5xl sm:text-7xl font-semibold normal-case lg:text-8xl`}
              >
                {service.title}
              </span>
              CARE
            </h1>

            <p className="mt-6 sm:mt-10 max-w-md text-sm sm:text-base leading-6 sm:leading-7 text-text-muted">
              {service.description}
            </p>

            <div className="mt-8 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-0">
              <button className="bg-accent-red px-4 py-4 sm:py-5 text-sm sm:text-base font-semibold text-text-light transition hover:bg-accent-red/90 w-full sm:w-auto text-center">
                Book appointment
              </button>

              <span className="hidden sm:inline-block h-px w-20 bg-primary-dark/40" />

              <span className="hidden sm:grid h-10 w-10 place-items-center rounded-full border border-primary-dark/40">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Red dots */}
            <div
              className="absolute bottom-3 right-3 hidden h-36 w-48 sm:block"
              style={dots("#E11D48")}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[839/750]">
          {/* L-shaped background panels - responsive adjustments */}
          <div className="absolute right-0 top-0 h-full w-[24%] bg-background hidden sm:block" />
          <div className="absolute bottom-0 right-0 h-[27%] w-[52%] bg-background hidden sm:block" />

          {/* Dot patterns */}
          <div
            className="absolute right-0 top-[17%] h-[20%] w-[20%] hidden sm:block"
            style={dots("#E11D48")}
          />

          <div
            className="absolute bottom-[2%] left-[26%] h-[19%] w-[17%] hidden sm:block"
            style={dots("#CBD5E1")}
          />

          {/* Photo */}
          <div className="relative h-full w-full sm:h-[73%] sm:w-[76%]">
            <Image
              src={service.images[0] || "https://images.unsplash.com/photo-1624716472114-a7c5f18ac832"}
              alt={service.title}
              fill
              priority
              sizes="(min-width:1024px) 40vw, 90vw"
              className="object-cover rounded-lg sm:rounded-none"
            />
          </div>

          {/* Offer frame */}
          <div className="absolute bottom-4 right-4 sm:bottom-[8%] sm:right-[13%] grid h-12 w-28 sm:h-[12%] sm:w-[35%] place-items-center border border-primary-dark/40 bg-surface shadow-md sm:shadow-none">
            <span className="text-xl sm:text-2xl font-extrabold text-accent-red lg:text-4xl">
              {service.discount}
            </span>
          </div>
        </div>
      </section>

      {/* DOCTOR SECTION DYNAMIC MAPPING */}

      {/* Hospital Sub-components */}
      <main className="min-h-screen bg-primary-dark">
        <HospitalIntroduction serviceTitle={service.title} subtitle={service.subtitle} />
        <DoctorSpecialist doctor={service.doctor} serviceTitle={service.title} serviceSlug={service.slug} /> 
        <ProblemsWeTreat problems={service.problems} serviceTitle={service.title} serviceSlug={service.slug} />
        <FrequesntlyAskedQuestion />
      </main>
    </main>
  );
}