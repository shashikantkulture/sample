'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, Box, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import MagneticButton from '@/components/ui/MagneticButton';

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isInWishlist } =
    useAppStore();

  if (!quickViewProduct) return null;

  const isLiked = isInWishlist(quickViewProduct.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-3xl bg-[#12100e] border border-[#c5a059]/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 my-auto text-[#ede8df]"
        >
          {/* Close Button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-[#a89b88] hover:text-white border border-white/10 hover:border-[#c5a059]/50 transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Image Frame */}
            <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] bg-[#1a1714]">
              <Image
                src={quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12100e]/80 via-transparent to-transparent" />
            </div>

            {/* Product Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#c5a059] font-medium">
                  {quickViewProduct.category}
                </span>
                <h3 className="font-serif-lux text-2xl sm:text-3xl text-[#f7f4ed] mt-1 leading-tight">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-[#a89b88] mt-2 font-light leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif-lux text-2xl text-[#f7f4ed] font-medium">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.compareAtPrice && (
                    <span className="text-sm text-[#706455] line-through">
                      {formatPrice(quickViewProduct.compareAtPrice)}
                    </span>
                  )}
                </div>

                {/* Specifications Snippet */}
                <div className="mt-5 space-y-1.5 text-xs text-[#8c806f] border-t border-white/5 pt-4">
                  <p>
                    <strong className="text-[#cfc4b2] font-normal">Material:</strong>{' '}
                    {quickViewProduct.material}
                  </p>
                  <p>
                    <strong className="text-[#cfc4b2] font-normal">Dimensions:</strong>{' '}
                    {quickViewProduct.dimensions}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  <MagneticButton
                    variant="gold"
                    onClick={() => {
                      addToCart(quickViewProduct, 1);
                      closeQuickView();
                    }}
                    className="flex-1 py-3 text-xs"
                  >
                    <ShoppingBag className="w-4 h-4 mr-1.5" />
                    Acquire Item
                  </MagneticButton>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className="p-3 rounded-full border border-[#c5a059]/40 bg-[#171412] text-[#f7f4ed] hover:border-[#c5a059] transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#c5a059] text-[#c5a059]' : ''}`} />
                  </button>
                </div>

                <Link
                  href={`/shop/${quickViewProduct.slug}`}
                  onClick={closeQuickView}
                  className="block text-center text-xs tracking-widest uppercase text-[#c5a059] hover:text-[#f7f4ed] transition-colors py-1 flex items-center justify-center gap-1"
                >
                  <span>Explore Full Archival File</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
