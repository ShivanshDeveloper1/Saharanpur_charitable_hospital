
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaArrowRightLong,
} from "react-icons/fa6";
import { doctorsData } from "@/data/doctors";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

export default function DoctorsSection() {
  return (
    <section
      className="py-16 px-4 bg-primary-dark text-text-light sm:px-6 lg:px-8 min-h-screen"
      id="doctors-section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Meet Our Experts
          </h2>

          <div className="w-12 h-1 bg-accent-red mx-auto rounded-full mb-4" />

          <p className="text-sm sm:text-base text-text-light/70 max-w-xl mx-auto">
            We Are The First Fully Accredited{" "}
            <span className="font-bold text-text-light">NABH</span> Hospital
            in Entire Saharanpur
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {doctorsData.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col justify-between"
            >
              {/* Doctor image and profile link */}
              <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
                <Link
                  href={`/doctor/${doctor.slug}`}
                  className="absolute inset-0 z-0"
                  aria-label={`View ${doctor.name}'s profile`}
                >
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Social links are outside the profile Link */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-surface/90 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg flex items-center gap-3">
                  {doctor.socials.facebook && (
                    <a
                      href={doctor.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${doctor.name}'s Facebook`}
                      className="text-text-muted hover:text-blue-600 transition-colors"
                    >
                      <FaFacebookF className="w-4 h-4" />
                    </a>
                  )}

                  {doctor.socials.instagram && (
                    <a
                      href={doctor.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${doctor.name}'s Instagram`}
                      className="text-text-muted hover:text-accent-red transition-colors"
                    >
                      <FaInstagram className="w-4 h-4" />
                    </a>
                  )}

                  {doctor.socials.linkedin && (
                    <a
                      href={doctor.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${doctor.name}'s LinkedIn`}
                      className="text-text-muted hover:text-blue-700 transition-colors"
                    >
                      <FaLinkedinIn className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Doctor details */}
              <div className="p-5 flex flex-1 flex-col">
                <Link
                  href={`/doctor/${doctor.slug}`}
                  className="group/name"
                >
                  <h3 className="text-lg font-bold text-primary-dark mb-1 leading-snug group-hover/name:text-accent-red transition-colors">
                    {doctor.name}
                  </h3>
                </Link>

                <p className="text-xs text-text-muted font-normal leading-relaxed">
                  {doctor.specialty}
                </p>

                <div className="flex flex-col gap-2 mt-3 text-sm">
                  <p className="flex justify-between items-start gap-3">
                    <span className="text-text-muted">Experience:</span>
                    <span className="font-bold text-text-dark text-right">
                      {doctor.Experience}
                    </span>
                  </p>

                  <p className="flex justify-between items-start gap-3">
                    <span className="text-text-muted">Qualification:</span>
                    <span className="font-bold text-right text-text-dark">
                      {doctor.Qualification}
                    </span>
                  </p>
                </div>

                {/* Appointment button */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    window.location.href = `/doctor/${doctor.slug}`;
                  }}
                  className="mt-4 flex w-full items-center justify-between gap-3 rounded-xl bg-accent-red px-4 py-2.5 font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-red"
                >
                  <span className="text-sm">Book Appointment</span>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-accent-red transition-transform duration-300 group-hover:translate-x-1">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-accent-red rotate-[-45deg]">
                      <FaArrowRightLong />
                    </span>
                  </span>
                </motion.button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
