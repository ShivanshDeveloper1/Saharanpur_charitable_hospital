
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { servicesData } from "@/data/servicesData";

export default function ServicesGrid() {
  const [activeImageIndices, setActiveImageIndices] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndices((prev) => {
        const next = { ...prev };

        servicesData.forEach((service) => {
          const images = service.images || [];

          if (images.length > 1) {
            next[service.id] =
              ((prev[service.id] ?? 0) + 1) % images.length;
          }
        });

        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-background min-h-screen py-20 sm:py-24">
      <div className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
  
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={{
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  }}
  className="mx-auto mb-14 max-w-2xl text-center"
>
  <motion.span
    variants={{
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.4 }}
    className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-red/20 bg-accent-red/5 px-4 py-2 text-sm font-semibold text-accent-red"
  >
    <span className="h-2 w-2 rounded-full bg-accent-red" />
    Comprehensive Healthcare
  </motion.span>

  <motion.h2
    variants={{
      hidden: { opacity: 0, y: 12 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.45 }}
    className="mb-5 text-3xl font-bold tracking-tight text-text-dark sm:text-4xl lg:text-5xl"
  >
    Our <span className="ml-2 text-accent-red">Services</span>
  </motion.h2>

  <motion.p
    variants={{
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.4 }}
    className="mx-auto max-w-xl text-base leading-7 text-text-muted sm:text-lg"
  >
    Nine specialties, one trusted hospital — from routine
    checkups to critical emergency care.
  </motion.p>
</motion.div>


        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => {
            const images = service.images?.length
              ? service.images
              : ["/placeholder.jpg"];

            const currentIndex =
              (activeImageIndices[service.id] ?? 0) % images.length;

            const Icon = service.icon;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: (index % 3) * 0.08,
                }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-surface  shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-red/20 hover:shadow-xl"
              >
                {/* Image Carousel */}
                <div className="relative h-60 overflow-hidden rounded-2xl bg-primary-dark/5 sm:h-64">
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.div
                      key={images[currentIndex]}
                      initial={{ opacity: 0, scale: 1.025 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.65 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={images[currentIndex]}
                        alt={service.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Image Counter */}
                  <div className="absolute right-3 top-3 rounded-full bg-primary-dark/75 px-3 py-1.5 text-xs font-medium text-text-light backdrop-blur-md">
                    {currentIndex + 1} / {images.length}
                  </div>

                  {/* Image Pagination */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-primary-dark/60 px-3 py-2 backdrop-blur-md">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          aria-label={`Show image ${idx + 1} for ${service.title}`}
                          aria-pressed={currentIndex === idx}
                          onClick={() =>
                            setActiveImageIndices((prev) => ({
                              ...prev,
                              [service.id]: idx,
                            }))
                          }
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            currentIndex === idx
                              ? "w-6 bg-accent-red"
                              : "w-1.5 bg-white/70 hover:bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col px-3 pb-4 pt-5">
                  <div className="mb-3 flex items-center gap-3">
                    {Icon && (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-red/10 text-accent-red transition-colors duration-300 group-hover:bg-accent-red group-hover:text-white">
                        <Icon size={21} />
                      </div>
                    )}

                    <h3 className="text-xl font-bold leading-snug text-text-dark transition-colors duration-300 group-hover:text-accent-red">
                      {service.title}
                    </h3>
                  </div>

                  <p className="mb-5 text-sm leading-7 text-text-muted">
                    {service.description}
                  </p>

                  {/* Service Tags */}
                  {service.tags?.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2 border-t border-black/5 pt-4">
                      {service.tags.map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="rounded-full border border-black/5 bg-background px-3 py-1.5 text-xs font-medium text-text-muted transition-colors duration-200 group-hover:border-accent-red/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

