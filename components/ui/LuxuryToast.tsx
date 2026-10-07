'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Sparkles, X, Check } from 'lucide-react';

export default function LuxuryToast() {
  const { toasts, removeToast } = useAppStore();

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col gap-3 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto p-4 rounded-xl bg-[#141210]/95 backdrop-blur-xl border border-[#c5a059]/40 shadow-[0_10px_35px_rgba(0,0,0,0.7)] text-[#ede8df] flex items-start gap-3.5"
          >
            <div className="w-7 h-7 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center flex-shrink-0 text-[#c5a059] mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 pr-2">
              <h5 className="font-serif-lux text-sm text-[#f7f4ed] leading-snug font-medium">
                {toast.title}
              </h5>
              {toast.description && (
                <p className="text-[11px] text-[#a89b88] mt-0.5 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#7d715f] hover:text-[#ede8df] p-1 transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
