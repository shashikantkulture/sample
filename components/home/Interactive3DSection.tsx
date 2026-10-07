'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCw,
  Award,
  ArrowRight,
} from 'lucide-react';
import ProductViewer3D from '@/components/3d/ProductViewer3D';
import MagneticButton from '@/components/ui/MagneticButton';
import { PRODUCTS } from '@/lib/products-data';
import { formatPrice } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

export default function Interactive3DSection() {
  const heritageProduct = PRODUCTS.find((p) => p.slug === 'handcrafted-heritage-vase') || PRODUCTS[0];
  const { addToCart, toggleWishlist, isInWishlist } = useAppStore();
  const isLiked = isInWishlist(heritageProduct.id);

  const [activeAngleIndex, setActiveAngleIndex] = useState(0);

  const thumbnails = [
    '/images/heritage-vase.jpg',
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=500&q=80',
  ];

  return (
    <section id="interactive-3d" className="py-24 sm:py-32 bg-[#0d0b09] relative overflow-hidden border-t border-[#c5a059]/15">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c5a059]/6 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Information & CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.28em] uppercase text-[#c5a059] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>INTERACTIVE EXPERIENCE</span>
            </div>

            <h2 className="font-serif-lux text-3xl sm:text-5xl text-[#f7f4ed] leading-[1.12] font-light">
              Experience Every Detail in 3D
            </h2>

            <p className="text-sm sm:text-base text-[#ab9e8d] font-light leading-relaxed">
              Rotate, zoom and explore our products from every angle before you buy. Inspect the hand-chiselled acanthus leaves, lost-wax metallurgy, and rich gold-leaf highlights in true real-time WebGL.
            </p>

            <div className="pt-2">
              <Link href={`/shop/${heritageProduct.slug}`}>
                <MagneticButton
                  variant="secondary"
                  className="px-7 py-3.5 text-xs font-semibold tracking-widest text-[#f7f4ed]"
                >
                  View in 3D Showroom <ArrowRight className="w-4 h-4 ml-1.5" />
                </MagneticButton>
              </Link>
            </div>
          </div>

          {/* Center Column: Big 3D Interactive WebGL Stage */}
          <div className="lg:col-span-5 relative">
            <ProductViewer3D
              modelType="vase"
              color="#8c6d46"
              className="h-[460px] sm:h-[520px] w-full"
            />
          </div>

          {/* Right Column: Angle Thumbnails & Product Information Card */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* 3 Detail Angle Thumbnails */}
            <div className="flex lg:flex-row gap-3">
              {thumbnails.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveAngleIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden bg-[#181512] border transition-all ${
                    activeAngleIndex === idx
                      ? 'border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.3)] scale-105'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View angle ${idx + 1}`}
                >
                  <Image
                    src={imgUrl}
                    alt={`Detail view ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Product Information Card matching Reference Image */}
            <div className="p-6 rounded-2xl bg-[#14120f]/90 border border-[#c5a059]/25 shadow-xl space-y-4">
              <div>
                <h3 className="font-serif-lux text-xl sm:text-2xl text-[#f7f4ed] leading-snug">
                  {heritageProduct.name}
                </h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-serif-lux text-xl sm:text-2xl font-semibold text-[#dfba73]">
                    {formatPrice(heritageProduct.price)}
                  </span>
                  {heritageProduct.compareAtPrice && (
                    <span className="text-xs text-[#706453] line-through">
                      {formatPrice(heritageProduct.compareAtPrice)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#9c8f7d] mt-2 font-light leading-relaxed">
                  {heritageProduct.description}
                </p>
              </div>

              {/* Bullet Features Checklist */}
              <div className="space-y-2 py-2 border-y border-white/5 text-xs text-[#cfc4b2]">
                <div className="flex items-center gap-2.5">
                  <RotateCw className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>360° Interactive View</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Premium Handcrafted</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Free White-Glove Shipping</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Easy 30-Day Guaranteed Returns</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-2.5 pt-1">
                <MagneticButton
                  variant="gold"
                  onClick={() => addToCart(heritageProduct, 1)}
                  className="flex-1 py-3 text-xs tracking-wider"
                >
                  <ShoppingBag className="w-4 h-4 mr-1.5" />
                  Add to Cart
                </MagneticButton>

                <button
                  onClick={() => toggleWishlist(heritageProduct.id)}
                  className="p-3 rounded-full border border-[#c5a059]/40 bg-[#171412] text-[#f7f4ed] hover:border-[#c5a059] transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#c5a059] text-[#c5a059]' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
