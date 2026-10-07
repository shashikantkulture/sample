'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye, Box } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView, setCursor, resetCursor } =
    useAppStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const isLiked = isInWishlist(product.id);

  // Subtle 3D tilt on card mousemove
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / -25);
    setRotateY((x - centerX) / 25);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    resetCursor();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={cn(
        'group relative flex flex-col rounded-2xl bg-[#13110f] border border-[#c5a059]/15 overflow-hidden transition-all duration-500 hover:border-[#c5a059]/60 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:-translate-y-1.5',
        className
      )}
    >
      {/* Product Image Frame */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#181512]"
        onMouseEnter={() => setCursor('product', 'VIEW')}
        onMouseLeave={resetCursor}
      >
        <Link href={`/shop/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        </Link>

        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a]/90 via-transparent to-black/20 pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase bg-[#f7f4ed] text-[#0e0c0a] rounded-sm shadow-md">
              New
            </span>
          )}
          {product.bestseller && (
            <span className="px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase bg-[#c5a059] text-black rounded-sm shadow-md">
              Bestseller
            </span>
          )}
          {product.limited && (
            <span className="px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase bg-[#2a241c] text-[#dfba73] border border-[#dfba73]/40 rounded-sm">
              Limited
            </span>
          )}
          {product.handcrafted && !product.isNew && !product.bestseller && (
            <span className="px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase bg-[#1a1714]/80 text-[#dfba73] border border-[#c5a059]/30 rounded-sm backdrop-blur-sm">
              Handcrafted
            </span>
          )}
        </div>

        {/* Action Buttons: Wishlist & 3D Indicator */}
        <div className="absolute top-3.5 right-3.5 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={cn(
              'p-2.5 rounded-full backdrop-blur-md transition-all duration-300',
              isLiked
                ? 'bg-[#c5a059] text-black shadow-lg scale-105'
                : 'bg-black/50 text-[#d4cbbe] hover:bg-[#c5a059]/20 hover:text-white border border-white/10'
            )}
            aria-label="Save to Wishlist"
          >
            <Heart className={cn('w-4 h-4', isLiked ? 'fill-black' : '')} />
          </button>

          {product.model3D && (
            <Link
              href={`/shop/${product.slug}`}
              className="p-2.5 rounded-full bg-black/50 hover:bg-[#c5a059] hover:text-black backdrop-blur-md border border-white/10 text-[#c5a059] transition-all"
              title="Interactive 3D Available"
            >
              <Box className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Quick View Button (Reveals on Hover) */}
        <div className="absolute bottom-3 inset-x-3 flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              openQuickView(product);
            }}
            className="flex-1 py-2.5 px-3 rounded-full bg-[#171412]/90 backdrop-blur-md border border-[#c5a059]/40 hover:border-[#c5a059] text-[#f7f4ed] hover:text-[#dfba73] text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#13110f] to-[#0e0c0a]">
        <div>
          <div className="flex items-center justify-between text-[11px] tracking-widest uppercase text-[#968977] mb-1">
            <span>{product.category}</span>
            {product.rating && (
              <span className="text-[#dfba73]">★ {product.rating.toFixed(1)}</span>
            )}
          </div>
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-serif-lux text-lg sm:text-xl text-[#f7f4ed] group-hover:text-[#dfba73] transition-colors leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-[#807464] line-clamp-1 mt-1 font-light">
            {product.subtitle || product.material}
          </p>
        </div>

        {/* Price and Add to Cart Action */}
        <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-lux text-lg sm:text-xl font-medium text-[#f7f4ed]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-[#6e6354] line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            onMouseEnter={() => setCursor('add', 'ADD')}
            onMouseLeave={resetCursor}
            className="p-2.5 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 hover:bg-[#c5a059] text-[#dfba73] hover:text-black transition-all duration-300 shadow-sm"
            aria-label="Add to private bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
