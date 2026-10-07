'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import { PRODUCTS } from '@/lib/products-data';

export default function FeaturedProductsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  // Select featured products
  const featuredList = PRODUCTS.filter((p) => p.featured || p.bestseller || p.isNew);

  return (
    <section id="section-featured" className="py-24 sm:py-32 bg-[#0c0a09] relative border-t border-[#c5a059]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-[#c5a059] font-medium mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>PRIVATE CURATION</span>
            </div>
            <h2 className="font-serif-lux text-3xl sm:text-5xl text-[#f7f4ed] font-light">
              Featured Products
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#a89b88] hover:text-[#dfba73] transition-colors mr-2"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="p-3 rounded-full border border-white/10 hover:border-[#c5a059] bg-[#141210] text-[#a89b88] hover:text-[#f7f4ed] transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                className="p-3 rounded-full border border-white/10 hover:border-[#c5a059] bg-[#141210] text-[#a89b88] hover:text-[#f7f4ed] transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Container */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredList.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] md:w-[340px] flex-shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
