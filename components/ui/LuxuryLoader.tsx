'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function LuxuryLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if previously loaded in this session to prevent annoyance on subsequent navigation
    const hasSeenLoader = sessionStorage.getItem('luxignia_loader_seen');
    if (hasSeenLoader) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('luxignia_loader_seen', 'true');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: '-100%',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#090807] text-[#f7f4ed] overflow-hidden"
        >
          {/* Subtle radiating golden ambient backdrop */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#c5a059]/10 blur-[130px] pointer-events-none" />

          {/* Luxury Rotating Halo Ring */}
          <motion.div
            initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 360, opacity: 1, scale: 1 }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
            }}
            className="absolute w-[240px] h-[240px] rounded-full border border-[#c5a059]/20 pointer-events-none"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#dfba73] shadow-[0_0_10px_#dfba73]" />
          </motion.div>

          {/* Official LUXIGNIA Monogram Logo as Custom Loading Icon */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 10 }}
              animate={{
                scale: [0.85, 1.02, 1],
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-44 sm:w-56 h-28 sm:h-36 flex items-center justify-center mb-2"
            >
              <Image
                src="/images/luxignia-brand-gold.png"
                alt="LUXIGNIA Official Monogram Logo"
                fill
                unoptimized
                priority
                className="object-contain"
              />
            </motion.div>

            {/* Animated Gold Separator Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ duration: 0.9, delay: 0.4, ease: 'easeInOut' }}
              className="h-[1.5px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent my-3"
            />

            {/* Subtitle Eyebrow with letter stagger */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[10px] sm:text-[11px] uppercase text-[#b8a68b] font-light pl-1"
            >
              ANTIQUE • ART • HERITAGE
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
