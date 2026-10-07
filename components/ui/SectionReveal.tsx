'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  offsetY?: number;
}

export default function SectionReveal({
  children,
  className,
  delay = 0,
  offsetY = 28,
}: SectionRevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: offsetY,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: '-40px 0px -40px 0px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn('w-full', className)}
    >
      {children}
    </motion.div>
  );
}
