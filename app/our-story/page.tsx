import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import SectionReveal from '@/components/ui/SectionReveal';

export const metadata = {
  title: 'Our Story & Lineage — LUXIGNIA',
  description:
    'The philosophy, master foundry metallurgy, and heritage craftsmanship behind LUXIGNIA.',
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-[#0b0a09] pt-24 pb-32 text-[#ede8df]">
      {/* Editorial Title Header */}
      <div className="py-20 sm:py-28 border-b border-[#c5a059]/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-[#c5a059] font-medium">
            HERITAGE • ARTISTRY • SOUL
          </span>
          <h1 className="font-serif-lux text-4xl sm:text-7xl text-[#f7f4ed] font-light leading-tight">
            The Art of Preserving Antiquity
          </h1>
          <p className="text-sm sm:text-base text-[#a89b88] max-w-2xl mx-auto font-light leading-relaxed pt-2">
            LUXIGNIA was founded with a singular conviction: that modern architectural sanctuaries deserve objects with history, gravitas, and eternal character.
          </p>
        </div>
      </div>

      {/* Main Editorial Story Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 space-y-32">
        {/* Story Chapter 1: The Genesis */}
        <SectionReveal offsetY={80}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059]">
                CHAPTER I — THE GENESIS
              </span>
              <h2 className="font-serif-lux text-3xl sm:text-5xl text-[#f7f4ed] font-light leading-snug">
                Resurrecting Centuries of European & Eastern Metallurgy
              </h2>
              <p className="text-sm text-[#ab9e8d] leading-relaxed font-light">
                In an era dominated by disposable mass production and lightweight synthetic resin replicas, LUXIGNIA honors the arduous lost-wax techniques perfected during the Renaissance and Hellenistic eras.
              </p>
              <p className="text-sm text-[#ab9e8d] leading-relaxed font-light">
                Our curators journey through archival foundry registers in Tuscany, Kyoto, and Rajasthan, resurrecting moulds and chiseling standards that have defined imperial residences for generations.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#161310] border border-[#c5a059]/25 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80"
                  alt="Classical sculpture"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Story Chapter 2: The Materiality */}
        <SectionReveal offsetY={80}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 lg:order-2 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059]">
                CHAPTER II — MATERIALITY & FIRE
              </span>
              <h2 className="font-serif-lux text-3xl sm:text-5xl text-[#f7f4ed] font-light leading-snug">
                Honest Bronze, Nero Marquina Marble & Pure Gold Leaf
              </h2>
              <p className="text-sm text-[#ab9e8d] leading-relaxed font-light">
                Every LUXIGNIA piece boasts substantial weight. We utilize heavy sculptural alloys of copper, tin, and zinc poured at white-hot furnace temperatures, paired with solid quarried Italian marble bases.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs text-[#d6cfc2]">
                <div className="space-y-1">
                  <strong className="text-[#dfba73] block uppercase tracking-wider text-[11px]">
                    Mineral Patinas
                  </strong>
                  <p className="text-[#8c806f]">Naturally oxidized sulphur and cupric washes.</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-[#dfba73] block uppercase tracking-wider text-[11px]">
                    Hand-Chased Reliefs
                  </strong>
                  <p className="text-[#8c806f]">Individually detailed with steel micro-chisels.</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 lg:order-1">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#161310] border border-[#c5a059]/25 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80"
                  alt="Craftsmanship and antique pottery"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Story Chapter 3: The Philosophy */}
        <SectionReveal offsetY={80}>
          <div id="craft" className="p-10 sm:p-16 rounded-3xl bg-[#14120f] border border-[#c5a059]/25 text-center max-w-4xl mx-auto space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059]">
              OUR PHILOSOPHY
            </span>
            <blockquote className="font-serif-lux text-2xl sm:text-4xl text-[#f7f4ed] font-light leading-relaxed italic">
              &ldquo;An antiquity does not merely occupy physical space—it anchors the soul of a room with quiet, unyielding poise.&rdquo;
            </blockquote>
            <div className="w-16 h-[1px] bg-[#c5a059] mx-auto" />
            <p className="text-xs uppercase tracking-widest text-[#8c806f]">
              The Curatorial Board of LUXIGNIA • London & Florence
            </p>

            <div className="pt-4 flex justify-center gap-4">
              <Link href="/shop">
                <MagneticButton variant="gold" className="px-8 py-3.5 text-xs font-semibold tracking-widest">
                  Acquire an Heirloom <ArrowRight className="w-4 h-4 ml-1.5" />
                </MagneticButton>
              </Link>
            </div>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
