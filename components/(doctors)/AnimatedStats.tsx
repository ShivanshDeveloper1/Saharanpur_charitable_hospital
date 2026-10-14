'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, motion } from 'framer-motion';

interface AnimatedStatsProps {
  target: number;
  suffix?: string;
  formatK?: boolean;
}

export default function AnimatedStats({ target, suffix = '', formatK = false }: AnimatedStatsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  
  // Formats numbers smoothly when scrolling into view
  const rounded = useTransform(count, (latest) => {
    if (formatK && latest >= 1000) {
      return (latest / 1000).toFixed(0) + 'K';
    }
    return Math.floor(latest).toLocaleString();
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1], // Smooth professional easing
      });
      return controls.stop;
    }
  }, [inView, target, count]);

  return (
    <span ref={ref} className="inline-flex items-center">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}