"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { footerData } from "@/data/footerData";

// Render corresponding react-icon based on social media ID
const renderSocialIcon = (id: string) => {
  switch (id) {
    case "facebook":
      return <FaFacebookF className="w-4 h-4 text-white" />;
    case "youtube":
      return <FaYoutube className="w-4 h-4 text-white" />;
    case "instagram":
      return <FaInstagram className="w-4 h-4 text-white" />;
    case "linkedin":
      return <FaLinkedinIn className="w-4 h-4 text-white" />;
    default:
      return null;
  }
};

// Animation variants for container staggering
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Footer() {
  const { hospitalInfo, usefulLinks, ourServices, newsEvents, socialLinks } = footerData;

  return (
    <footer className="bg-bg-light border-t border-slate-200/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Column 1: Hospital Details (Spans 4 columns on large screens) */}
        <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col space-y-4">
          {/* Hospital Logo */}
          <div className="flex items-center space-x-3 mb-2">
            <div className="relative w-12 h-12 bg-primary-dark rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm">
             S
            </div>
            <div>
              <span className="block text-2xl font-black tracking-wide text-primary-dark leading-none">
                Schari
              </span>
              <span className="block text-[10px] font-medium tracking-wider text-text-muted uppercase mt-0.5">
                The Super Speciality Hospital
              </span>
              <span className="block text-[9px] font-semibold text-accent-red tracking-widest uppercase">
                We Care... He Cures
              </span>
            </div>
          </div>

          {/* Hospital Info & Address */}
          <div className="space-y-2 text-sm text-text-muted leading-relaxed">
            <h3 className="font-bold text-text-dark text-base">
              {hospitalInfo.name}
            </h3>
            <p className="max-w-sm">{hospitalInfo.address}</p>
            <p className="text-xs text-slate-500 font-medium">
              {hospitalInfo.landmark}
            </p>
          </div>

          {/* Contact Details */}
          <div className="pt-2 space-y-1 text-sm">
            <p className="text-text-muted">
              <span className="font-bold text-text-dark">Phone:</span>{" "}
              <a
                href={`tel:${hospitalInfo.phone}`}
                className="hover:text-accent-red transition-colors"
              >
                {hospitalInfo.phone}
              </a>
            </p>
            <p className="text-text-muted">
              <span className="font-bold text-text-dark">Email:</span>{" "}
              <a
                href={`mailto:${hospitalInfo.email}`}
                className="hover:text-accent-red transition-colors"
              >
                {hospitalInfo.email}
              </a>
            </p>
          </div>
        </motion.div>

        {/* Column 2: Useful Links (Spans 2 columns) */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-text-dark tracking-tight">
            Useful Links
          </h3>
          <ul className="space-y-2.5 text-sm">
            {usefulLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-text-muted hover:text-accent-red transition-colors duration-200 inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 3: Our Services (Spans 2 columns) */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-text-dark tracking-tight">
            Our Services
          </h3>
          <ul className="space-y-2.5 text-sm">
            {ourServices.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-text-muted hover:text-accent-red transition-colors duration-200 inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 4: News & Events (Spans 2 columns) */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-text-dark tracking-tight">
            News & Events
          </h3>
          <ul className="space-y-2.5 text-sm">
            {newsEvents.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-text-muted hover:text-accent-red transition-colors duration-200 inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 5: Social Link (Spans 2 columns) */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-text-dark tracking-tight">
            Social Link
          </h3>
          <div className="flex flex-row space-x-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                // Using primary-dark for the background circle instead of arbitrary colors
                className="w-9 h-9 rounded-full bg-primary-dark flex items-center justify-center shadow-sm hover:bg-accent-red hover:shadow-md transition-all duration-300"
                aria-label={social.name}
              >
                {renderSocialIcon(social.id)}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-200/60 text-center text-xs text-text-muted">
        <p>© {new Date().getFullYear()} Medigram Super Speciality Hospital. All Rights Reserved.</p>
      </div>
    </footer>
  );
}