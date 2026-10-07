'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { useAppStore } from '@/lib/store';

export default function CollectionBanner() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { setCursor, resetCursor } = useAppStore();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 15;
    const y = (clientY / innerHeight - 0.5) * 15;
    setOffset({ x, y });
  };

  return (
    <section
      id="section-collections"
      onMouseMove={handleMouseMove}
      className="relative min-h-[550px] sm:min-h-[640px] w-full flex items-center justify-center overflow-hidden border-t border-[#c5a059]/15"
      onMouseEnter={() => setCursor('discover', 'DISCOVER')}
      onMouseLeave={resetCursor}
    >
      {/* Background High-End Living Salon Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80')`,
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      />

      {/* Dark Vignette & Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a09]/95 via-[#0c0a09]/80 to-[#0c0a09]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-[#0c0a09]/80" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#c5a059] font-medium">
            <span className="w-6 h-[1px] bg-[#c5a059]" />
            <span>CURATED COLLECTIONS</span>
          </div>

          <h2 className="font-serif-lux text-4xl sm:text-6xl text-[#f7f4ed] font-light leading-[1.1] tracking-tight">
            Spaces with Character
          </h2>

          <p className="text-sm sm:text-base text-[#c8bcad] font-light leading-relaxed">
            Discover timeless pieces that add depth, beauty and personality to your living spaces. Curated from historic Mediterranean villas, Kyoto zen sanctums, and Vienna classical archives.
          </p>

          <div className="pt-2">
            <Link href="/collections">
              <MagneticButton
                variant="secondary"
                className="px-8 py-4 text-xs font-semibold tracking-widest text-[#f7f4ed] border-[#c5a059]/60 hover:bg-[#c5a059]/15"
              >
                Explore Collections <ArrowRight className="w-4 h-4 ml-1.5" />
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
