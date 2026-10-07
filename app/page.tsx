'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import Interactive3DSection from '@/components/home/Interactive3DSection';
import CollectionBanner from '@/components/home/CollectionBanner';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import QuickViewModal from '@/components/shop/QuickViewModal';
import SectionReveal from '@/components/ui/SectionReveal';

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden relative">
      {/* 1. Hero Section (Gallery Entrance) */}
      <HeroSection />

      {/* 2. Horizontal 6 Category Showcase */}
      <SectionReveal offsetY={24} delay={0.02}>
        <CategorySection />
      </SectionReveal>

      {/* 3. Interactive 3D Experience (Handcrafted Heritage Vase) */}
      <SectionReveal offsetY={20} delay={0.02}>
        <Interactive3DSection />
      </SectionReveal>

      {/* 4. Curated Collections Living Salon */}
      <SectionReveal offsetY={24} delay={0.02}>
        <CollectionBanner />
      </SectionReveal>

      {/* 5. Featured Products Carousel */}
      <SectionReveal offsetY={24} delay={0.02}>
        <FeaturedProductsSection />
      </SectionReveal>

      {/* Quick View Modal */}
      <QuickViewModal />
    </div>
  );
}
