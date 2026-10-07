import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/lib/products-data';
import MagneticButton from '@/components/ui/MagneticButton';
import ProductCard from '@/components/shop/ProductCard';
import SectionReveal from '@/components/ui/SectionReveal';

export const metadata = {
  title: 'Curated Collections — LUXIGNIA',
  description:
    'Discover curated thematic collections designed to bestow character and heritage upon distinguished interiors.',
};

export default function CollectionsPage() {
  const collections = [
    {
      title: 'Imperial Heritage',
      epoch: '18th & 19th Century European Classical',
      description:
        'Austrian court bronzes, Florentine acanthus vessels, and neoclassical equestrian statues that anchor expansive halls.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      categorySlug: 'sculptures',
      curatedItemCount: 18,
    },
    {
      title: 'Sanctuary & Soul',
      epoch: 'Eastern Zen & Sacred Temple Castings',
      description:
        'Serene meditative Buddha heads, archaic libation bowls, and patinated incense vessels bringing tranquility to modern living.',
      image: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=1200&q=80',
      categorySlug: 'sculptures',
      curatedItemCount: 14,
    },
    {
      title: 'Celestial Relics & Friezes',
      epoch: 'Hellenistic Astrolabe & Medallion Arts',
      description:
        'Concentric bronze astronomical discs and architectural reliefs chiseled with ancient planetary mathematics.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      categorySlug: 'wall-decor',
      curatedItemCount: 12,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0a09] pt-24 pb-32 text-[#ede8df]">
      {/* Editorial Header */}
      <div className="py-16 sm:py-24 border-b border-[#c5a059]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#c5a059] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EDITORIAL CURATIONS</span>
          </div>
          <h1 className="font-serif-lux text-4xl sm:text-6xl text-[#f7f4ed] font-light">
            Spaces with Character
          </h1>
          <p className="text-xs sm:text-sm text-[#a89b88] max-w-xl mx-auto mt-4 font-light leading-relaxed">
            Each collection is thoughtfully composed to harmonize antique provenance with contemporary minimalist architecture.
          </p>
        </div>
      </div>

      {/* Featured Curations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-24">
        {collections.map((col, index) => (
          <SectionReveal key={col.title} offsetY={80} delay={0.05 * index}>
            <div
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Frame */}
              <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-[#161310] border border-[#c5a059]/25 shadow-2xl group">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a]/90 via-transparent to-black/30 pointer-events-none" />
                  <div className="absolute bottom-6 left-6 text-xs text-[#dfba73] tracking-widest uppercase">
                    {col.epoch}
                  </div>
                </div>
              </div>

              {/* Description & Link */}
              <div className={`lg:col-span-5 space-y-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="text-xs uppercase tracking-widest text-[#c5a059]">
                  Curated Series 0{index + 1}
                </span>
                <h2 className="font-serif-lux text-3xl sm:text-4xl text-[#f7f4ed] leading-tight">
                  {col.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#a89b88] font-light leading-relaxed">
                  {col.description}
                </p>
                <div className="pt-2">
                  <Link href={`/shop?category=${col.categorySlug}`}>
                    <MagneticButton variant="secondary" className="px-7 py-3 text-xs tracking-widest">
                      Explore This Collection <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </MagneticButton>
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  );
}
