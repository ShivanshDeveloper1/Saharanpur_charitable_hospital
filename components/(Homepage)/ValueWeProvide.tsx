
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  UserCheck,
  Stethoscope,
  Award,
  Activity,
} from "lucide-react";

// Left column data
const leftValues = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description:
      "Every patient is treated with kindness & respect, creating a supportive healthcare experience.",
  },
  {
    icon: ShieldCheck,
    title: "Patient Safety",
    description:
      "We follow the highest clinical standards, advanced protocols, and modern practices to ensure safety.",
  },
  {
    icon: UserCheck,
    title: "Personalized Treatment",
    description:
      "Every care plan is thoughtfully tailored to your health needs, lifestyle & long-term wellbeing.",
  },
];

// Right column data
const rightValues = [
  {
    icon: Stethoscope,
    title: "Medical Excellence",
    description:
      "Our experienced specialists combine clinical expertise with innovative technology to deliver results.",
  },
  {
    icon: Award,
    title: "Trusted Professionals",
    description:
      "Transparency & continuous learning allow our expert team to provide reliable care everytime.",
  },
  {
    icon: Activity,
    title: "Lifelong Wellness",
    description:
      "We focus on prevention, education, and ongoing support to help patients maintain healthier lives.",
  },
];

const ValueWeProvide = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center py-12 px-4 bg-bg-light">
      {/* Header Section */}
  
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }}
  className="mx-auto mb-12 max-w-xl space-y-3 text-center"
>
  {/* Label */}
  <motion.p
    variants={{
      hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted"
  >
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-red/50 opacity-75" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-red" />
    </span>
    OUR VALUES
  </motion.p>

  {/* Heading */}
  <motion.h2
    variants={{
      hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    }}
    transition={{ duration: 0.75, ease: "easeOut" }}
    className="text-3xl font-bold tracking-tight text-text-dark md:text-4xl"
  >
    Values That Guide Every Patient Experience
  </motion.h2>

  {/* Description */}
  <motion.p
    variants={{
      hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    }}
    transition={{ duration: 0.65, ease: "easeOut" }}
    className="text-sm leading-relaxed text-text-muted md:text-base"
  >
    Compassion, expertise, and integrity shape every treatment, helping
    patients feel confident, supported, and cared for.
  </motion.p>
</motion.div>
      {/* Main Grid Container */}
      <div className="max-w-7xl mx-auto w-full bg-surface rounded-3xl border border-text-muted/10 shadow-sm grid grid-cols-1 lg:grid-cols-3 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-text-muted/10">
        {/* Left Column - 3 Cards */}
        <div className="flex flex-col divide-y divide-text-muted/10">
          {leftValues.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="p-8 flex flex-col justify-center flex-1 space-y-3 transition hover:bg-bg-light"
              >
                <div className="w-10 h-10 rounded-full bg-accent-red/10 flex items-center justify-center text-accent-red">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>

                <h3 className="text-lg font-bold text-text-dark">
                  {item.title}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Center Column - Hospital Image */}
        <div className="p-6 flex items-center justify-center bg-bg-light">
          <div className="relative w-full h-[480px] lg:h-full min-h-[380px] rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="https://plus.unsplash.com/premium_photo-1664478214797-c3c932160cef?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              alt="Medical facility and equipment"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>

        {/* Right Column - 3 Cards */}
        <div className="flex flex-col divide-y divide-text-muted/10">
          {rightValues.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="p-8 flex flex-col justify-center flex-1 space-y-3 transition hover:bg-bg-light"
              >
                <div className="w-10 h-10 rounded-full bg-accent-red/10 flex items-center justify-center text-accent-red">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>

                <h3 className="text-lg font-bold text-text-dark">
                  {item.title}
                </h3>

                <p className="text-text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default ValueWeProvide;
