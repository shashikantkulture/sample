'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/lib/store';
import { PRODUCTS, CATEGORIES } from '@/lib/products-data';
import { formatPrice } from '@/lib/utils';

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen } = useAppStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const popularSearches = ['Heritage Amphora', 'Bronze Stallion', 'Temple Buddha', 'Mandala Disc', 'Brass Luminary'];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dark Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsSearchOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Search Content */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-4xl mx-auto px-6 pt-16 sm:pt-24 z-10"
          >
            {/* Top Close */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#a89b88] hover:text-[#f7f4ed] group"
              >
                <span>Close</span>
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Big Cinematic Search Input */}
            <div className="relative border-b-2 border-[#c5a059]/40 pb-4 focus-within:border-[#c5a059] transition-colors">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 text-[#c5a059]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search antiquities, sculptures, or categories..."
                className="w-full bg-transparent pl-12 pr-4 text-2xl sm:text-3xl font-serif-lux text-[#f7f4ed] placeholder-[#6e6355] outline-none"
              />
            </div>

            {/* Quick Suggestion Tags */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-[#7a6f5e] mr-2">
                Popular Discoveries:
              </span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 rounded-full bg-[#1c1916] border border-[#c5a059]/20 text-xs text-[#cfc5b4] hover:text-white hover:border-[#c5a059] transition-all"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Live Search Results */}
            <div className="mt-10 max-h-[50vh] overflow-y-auto space-y-4 pr-2">
              {query.trim() && (
                <div className="text-xs uppercase tracking-widest text-[#a89b88] mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Found {filteredProducts.length} archival match{filteredProducts.length === 1 ? '' : 'es'}</span>
                </div>
              )}

              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="group flex items-center justify-between p-4 rounded-xl bg-[#141210]/70 hover:bg-[#1a1714] border border-white/5 hover:border-[#c5a059]/40 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-16 rounded overflow-hidden bg-black/40 flex-shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif-lux text-lg text-[#f7f4ed] group-hover:text-[#dfba73] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#8c8070]">{product.category} • {product.era || 'Heritage'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-serif-lux text-base text-[#c5a059]">
                      {formatPrice(product.price)}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#7d715f] group-hover:text-[#f7f4ed] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </Link>
              ))}

              {query.trim() && filteredProducts.length === 0 && (
                <div className="py-12 text-center text-[#8a7e6e]">
                  <p className="font-serif-lux text-xl text-[#cfc5b4] mb-2">No matching antiquities</p>
                  <p className="text-xs">Try searching for &quot;Amphora&quot;, &quot;Vase&quot;, &quot;Bronze&quot;, or browse our full collections.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
