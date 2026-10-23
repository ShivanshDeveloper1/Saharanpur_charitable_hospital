"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { SITE } from "@/lib/site"

// Only the image and the short message change. The H1 below never changes,
// so Google always sees ONE clear main heading.
const slides = [
  {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=75&w=1600&auto=format&fit=crop",
       alt: "Healthcare professionals in a clinical setting",
    message:
      "Ayushman Bharat beneficiaries can access eligible treatments at our hospital, subject to scheme rules.",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=75&w=1600&auto=format&fit=crop",
     alt: "Medical care in a modern healthcare setting",
    message:
      "Explore our medical specialties, doctors, and available treatment services.",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  // Auto-slide every 6s. Restarts after a manual click. Off for "reduce motion" users.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(next, 6000);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <section
      aria-label="Welcome"
      className="group relative h-[70vh] min-h-[540px] w-full overflow-hidden bg-primary-dark lg:h-[calc(100vh-140px)]"
    >
      {/* Background images */}
      {slides.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          fill
          sizes="100vw"
          priority={i === 0} // first image = LCP, load it first
          className={`object-cover transition-opacity duration-1000 motion-reduce:transition-none ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark gradient from the left so the text is always readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/60 to-primary-dark/10" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Text (static, so it is great for SEO and loads instantly) */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
        <div className="max-w-4xl text-text-light">
          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight drop-shadow-md sm:text-5xl lg:text-7xl">
            Multi-Speciality Hospital in Saharanpur
            <span className="mt-4 block text-xl font-medium leading-snug tracking-normal text-white/85 sm:text-2xl lg:text-3xl">
             Provinding Advanced Mediacal Care &amp; 24x7 emergency services, and expert specialists .
            </span>
          </h1>

          {/* Rotating message: both stacked in one grid cell, so nothing jumps */}
          <div className="mt-8 grid border-l-4 border-accent-red pl-4">
            {slides.map((s, i) => (
              <p
                key={s.message}
                aria-hidden={i !== index}
                className={`max-w-xl text-base text-slate-200 transition-all duration-700 [grid-area:1/1] motion-reduce:transition-none sm:text-lg ${
                  i === index ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                {s.message}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
           
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/40 px-6 font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-primary-dark"
            >
              <Phone className="h-4 w-4" aria-hidden /> {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Arrows (desktop) */}
      {[
        { fn: prev, label: "Previous slide", pos: "left-4", Icon: ChevronLeft },
        { fn: next, label: "Next slide", pos: "right-4", Icon: ChevronRight },
      ].map(({ fn, label, pos, Icon }) => (
        <button
          key={label}
          onClick={fn}
          aria-label={label}
          className={`absolute ${pos} top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white hover:text-primary-dark focus:opacity-100 md:flex md:opacity-0 md:group-hover:opacity-100`}
        >
          <Icon className="h-6 w-6" />
        </button>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-accent-red" : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}