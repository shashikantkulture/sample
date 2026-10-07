'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import Link from 'next/link';

export default function AnnouncementBar() {
  const { isAnnouncementOpen, closeAnnouncement } = useAppStore();

  return (
    <AnimatePresence>
      {isAnnouncementOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-50 overflow-hidden bg-[#14110e] border-b border-[#c5a059]/20 text-[#ede8df]"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 sm:py-2.5 flex items-center justify-between text-xs tracking-[0.14em] uppercase font-light">
            <div className="w-8 hidden sm:block" />
            <div className="flex-1 flex items-center justify-center gap-2 text-center text-[11px] sm:text-xs">
              <Sparkles className="w-3 h-3 text-[#c5a059] animate-pulse" />
              <span>Complimentary White-Glove Shipping on Orders Above ₹25,000</span>
              <span className="text-[#c5a059] hidden md:inline">•</span>
              <Link
                href="/shop"
                className="text-[#dfba73] hover:text-white underline underline-offset-4 decoration-[#c5a059]/50 transition-colors ml-1 hidden md:inline"
              >
                Explore New Arrivals
              </Link>
            </div>
            <button
              onClick={closeAnnouncement}
              className="p-1 text-[#c8c1b3] hover:text-[#f7f4ed] hover:rotate-90 transition-all duration-300"
              aria-label="Close Announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
