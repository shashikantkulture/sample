'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Box, Sparkles } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { useAppStore } from '@/lib/store';

const slides = [
  {
    eyebrow: 'TIMELESS ART',
    title: 'Antique Pieces\nfor Modern Spaces',
    description:
      'Curated collectibles and handcrafted decor that bring heritage, elegance and soul to your home.',
    image: '/images/hero-horse.png',
    modelLink: '/shop/handcrafted-heritage-vase',
    number: '01',
    objectName: 'Archival Bronze Stallion, Vienna',
  },
  {
    eyebrow: 'HELLENISTIC REVIVAL',
    title: 'Heritage Urns\n& Sculpted Vessels',
    description:
      'Chiselled acanthus engravings and hand-patinated bronzes cast with centuries-old European mastery.',
    image: '/images/heritage-vase.jpg',
    modelLink: '/shop/handcrafted-heritage-vase',
    number: '02',
    objectName: '19th Century Acanthus Amphora',
  },
  {
    eyebrow: 'SACRED SANCTUARY',
    title: 'Tranquil Statuary\n& Temple Bronzes',
    description:
      'Timeless contemplative artifacts designed to bestow quiet presence upon modern architectural salons.',
    image: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=1200&q=80',
    modelLink: '/shop/serene-gautama-buddha-bust',
    number: '03',
    objectName: 'Kyoto Sanctuary Bronze Bust',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const { setCursor, resetCursor } = useAppStore();

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];

  // Mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMouseOffset({ x, y });
  };

  return (
    <section
      id="section-hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0c0a09] pt-8 pb-16"
    >
      {/* Background Architectural Ambient Texture */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')`,
            transform: `translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px)`,
          }}
        />
        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/70 to-[#0c0a09]/90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0c0a09]/60 to-[#0c0a09]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 sm:pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8">
            {/* Eyebrow */}
            <motion.div
              key={`eyebrow-${currentSlide}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2.5 text-xs tracking-[0.28em] uppercase text-[#c5a059] font-medium"
            >
              <span className="w-6 h-[1px] bg-[#c5a059]" />
              <span>{slide.eyebrow}</span>
            </motion.div>

            {/* Main Editorial Heading */}
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-serif-lux text-4xl sm:text-6xl lg:text-7xl font-light text-[#f7f4ed] leading-[1.08] tracking-tight whitespace-pre-line"
            >
              {slide.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm sm:text-base text-[#b8ab99] max-w-xl font-light leading-relaxed"
            >
              {slide.description}
            </motion.p>

            {/* Hero CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link href="/shop">
                <MagneticButton
                  variant="primary"
                  className="px-8 py-4 text-xs font-semibold tracking-[0.16em]"
                >
                  Shop Collection <ArrowRight className="w-4 h-4 ml-1" />
                </MagneticButton>
              </Link>

              <Link href="#interactive-3d">
                <MagneticButton
                  variant="secondary"
                  className="px-7 py-4 text-xs tracking-[0.16em]"
                >
                  <Box className="w-4 h-4 mr-1.5 text-[#c5a059]" />
                  Explore in 3D
                </MagneticButton>
              </Link>
            </motion.div>

            {/* Hero Statistics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="pt-8 sm:pt-12 border-t border-[#c5a059]/15 grid grid-cols-3 gap-4 max-w-lg"
            >
              <div>
                <span className="font-serif-lux text-2xl sm:text-3xl font-medium text-[#f7f4ed]">
                  500+
                </span>
                <p className="text-[11px] sm:text-xs text-[#8c806f] tracking-wider uppercase mt-0.5">
                  Curated Products
                </p>
              </div>
              <div>
                <span className="font-serif-lux text-2xl sm:text-3xl font-medium text-[#f7f4ed]">
                  10K+
                </span>
                <p className="text-[11px] sm:text-xs text-[#8c806f] tracking-wider uppercase mt-0.5">
                  Happy Customers
                </p>
              </div>
              <div>
                <span className="font-serif-lux text-2xl sm:text-3xl font-medium text-[#f7f4ed] flex items-center gap-1">
                  4.8 <span className="text-[#dfba73] text-lg">★</span>
                </span>
                <p className="text-[11px] sm:text-xs text-[#8c806f] tracking-wider uppercase mt-0.5">
                  Customer Rating
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Showcase Column (Sculpture Image & Controls) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Ambient Gold Radial Glow Behind Object */}
            <div className="absolute w-[360px] h-[360px] rounded-full bg-[#c5a059]/15 blur-[100px] pointer-events-none" />

            {/* Main Featured Sculpture Frame with Parallax */}
            <motion.div
              key={`img-frame-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: `translate(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px)`,
              }}
              className="relative w-full aspect-[3/4] max-w-[420px] rounded-3xl overflow-hidden border border-[#c5a059]/25 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#12100e]"
              onMouseEnter={() => setCursor('discover', 'DISCOVER')}
              onMouseLeave={resetCursor}
            >
              <Image
                src={slide.image}
                alt={slide.objectName}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a]/90 via-transparent to-black/20 pointer-events-none" />

              {/* Slide Object Tag */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059]">
                    Permanent Archival Collection
                  </span>
                  <p className="font-serif-lux text-base text-[#f7f4ed]">
                    {slide.objectName}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Slider Navigation Arrows & Counters */}
            <div className="w-full max-w-[420px] mt-6 flex items-center justify-between px-2">
              {/* Slide Counter: 01 | 02 | 03 */}
              <div className="flex items-center gap-3 text-xs tracking-widest font-mono text-[#8c806f]">
                {slides.map((s, idx) => (
                  <button
                    key={s.number}
                    onClick={() => setCurrentSlide(idx)}
                    className={`transition-colors ${
                      idx === currentSlide
                        ? 'text-[#f7f4ed] font-bold border-b border-[#c5a059]'
                        : 'hover:text-[#c5a059]'
                    }`}
                  >
                    {s.number}
                  </button>
                ))}
              </div>

              {/* Prev / Next Circular Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-full border border-white/10 hover:border-[#c5a059] bg-[#141210] text-[#a89b88] hover:text-[#f7f4ed] transition-all"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-full border border-white/10 hover:border-[#c5a059] bg-[#141210] text-[#a89b88] hover:text-[#f7f4ed] transition-all"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
