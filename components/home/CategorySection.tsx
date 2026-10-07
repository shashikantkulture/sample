'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/products-data';
import { useAppStore } from '@/lib/store';

export default function CategorySection() {
  const { setCursor, resetCursor } = useAppStore();

  return (
    <section id="section-categories" className="py-20 sm:py-28 bg-[#0b0a09] border-t border-[#c5a059]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.26em] text-[#c5a059] font-medium">
              ARCHIVAL CURATION
            </span>
            <h2 className="font-serif-lux text-3xl sm:text-4xl lg:text-5xl text-[#f7f4ed] mt-2 font-light">
              Explore by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#a89b88] hover:text-[#dfba73] transition-colors"
          >
            <span>View Full Archives</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Category Cards Grid (Responsive 2 cols mobile, 3 cols tablet, 6 cols desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              onMouseEnter={() => setCursor('product', 'VIEW')}
              onMouseLeave={resetCursor}
              className="group relative flex flex-col rounded-2xl bg-[#14110f] border border-[#c5a059]/15 overflow-hidden transition-all duration-500 hover:border-[#c5a059]/60 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
            >
              {/* Category Image Box */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#181512]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14110f] via-transparent to-transparent opacity-80" />
              </div>

              {/* Title & View Collection CTA */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif-lux text-base sm:text-lg text-[#f7f4ed] group-hover:text-[#dfba73] transition-colors">
                    {category.name}
                  </h3>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#998b77] group-hover:text-[#f7f4ed] transition-colors">
                  <span>View Collection</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
