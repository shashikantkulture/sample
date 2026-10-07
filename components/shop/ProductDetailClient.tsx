'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  Box,
  Image as ImageIcon,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  Plus,
  Minus,
} from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import ProductViewer3D from '@/components/3d/ProductViewer3D';
import MagneticButton from '@/components/ui/MagneticButton';
import ProductCard from '@/components/shop/ProductCard';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useAppStore();
  const [activeTab, setActiveTab] = useState<'3d' | 'image'>(product.model3D ? '3d' : 'image');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeInfoTab, setActiveInfoTab] = useState<'story' | 'craftsmanship' | 'specs' | 'delivery'>('story');

  const isLiked = isInWishlist(product.id);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#0b0a09] pt-24 pb-32 text-[#ede8df]">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-xs text-[#8c806f] uppercase tracking-wider font-light">
          <Link href="/" className="hover:text-[#dfba73] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-[#dfba73] transition-colors">
            Catalog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/shop?category=${product.categorySlug}`}
            className="hover:text-[#dfba73] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#f7f4ed] truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Left Column: 3D / Image Viewer & Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Mode Switcher: 3D Interactive vs High-Res Archival Photography */}
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                {product.model3D && (
                  <button
                    onClick={() => setActiveTab('3d')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all ${
                      activeTab === '3d'
                        ? 'bg-[#c5a059] text-black font-semibold shadow-md'
                        : 'bg-[#141210] text-[#a89b88] hover:text-[#f7f4ed] border border-white/5'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>3D Interactive Studio</span>
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('image')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all ${
                    activeTab === 'image'
                      ? 'bg-[#c5a059] text-black font-semibold shadow-md'
                      : 'bg-[#141210] text-[#a89b88] hover:text-[#f7f4ed] border border-white/5'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Archival Plate</span>
                </button>
              </div>

              <span className="text-[11px] text-[#807462] uppercase tracking-wider hidden sm:inline">
                {product.origin || 'Archival Series'}
              </span>
            </div>

            {/* Stage Viewport */}
            <div className="relative w-full aspect-[4/4] sm:aspect-[4/3] rounded-3xl overflow-hidden bg-[#12100e] border border-[#c5a059]/25 shadow-2xl">
              {activeTab === '3d' ? (
                <ProductViewer3D
                  modelType={product.model3D?.type || 'vase'}
                  color={product.model3D?.color || '#8c6d46'}
                  className="h-full w-full"
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={product.images[selectedImageIndex] || product.images[0]}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a]/60 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
            </div>

            {/* Thumbnail Selection Strip */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImageIndex(idx);
                    setActiveTab('image');
                  }}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden bg-[#161311] border transition-all flex-shrink-0 ${
                    activeTab === 'image' && selectedImageIndex === idx
                      ? 'border-[#c5a059] scale-105 shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Commercial Attributes & Transactional Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-7">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium">
                  {product.collection}
                </span>
                <span className="text-xs text-[#dfba73]">★ {product.rating} ({product.reviewsCount} reviews)</span>
              </div>

              <h1 className="font-serif-lux text-3xl sm:text-5xl text-[#f7f4ed] font-light leading-tight">
                {product.name}
              </h1>

              {product.subtitle && (
                <p className="text-xs uppercase tracking-widest text-[#a89b88] font-light">
                  {product.subtitle}
                </p>
              )}

              {/* Price & Availability */}
              <div className="pt-2 flex items-baseline gap-4">
                <span className="font-serif-lux text-3xl sm:text-4xl text-[#f7f4ed] font-medium">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-[#736655] line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
                <span className="text-xs uppercase tracking-wider text-[#63a375] px-2.5 py-0.5 rounded-full bg-[#63a375]/10 border border-[#63a375]/30">
                  {product.stock > 0 ? `${product.stock} Available in Vault` : 'Waitlist Only'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#ab9f8d] font-light leading-relaxed pt-2">
                {product.longDescription || product.description}
              </p>

              {/* Material & Physical Specifications Table */}
              <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/5 text-xs text-[#b8ab98]">
                <div>
                  <span className="text-[#736756] block uppercase tracking-wider text-[10px]">
                    Material
                  </span>
                  <span className="text-[#f7f4ed] font-medium">{product.material}</span>
                </div>
                <div>
                  <span className="text-[#736756] block uppercase tracking-wider text-[10px]">
                    Dimensions
                  </span>
                  <span className="text-[#f7f4ed] font-medium">{product.dimensions}</span>
                </div>
                <div>
                  <span className="text-[#736756] block uppercase tracking-wider text-[10px]">
                    Net Weight
                  </span>
                  <span className="text-[#f7f4ed] font-medium">{product.weight}</span>
                </div>
                <div>
                  <span className="text-[#736756] block uppercase tracking-wider text-[10px]">
                    Epoch / Style
                  </span>
                  <span className="text-[#f7f4ed] font-medium">{product.era || 'Archival Reproduction'}</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector, Add to Cart & Buy Now */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-[#c5a059]/30 rounded-full px-3 py-1.5 bg-[#141210]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#8c806f] hover:text-white"
                    aria-label="Decrease"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm px-4 font-medium text-[#f7f4ed]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#8c806f] hover:text-white"
                    aria-label="Increase"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <MagneticButton
                  variant="primary"
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-4 text-xs font-semibold tracking-widest bg-[#ede8df] text-[#12100e]"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Collection
                </MagneticButton>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-full border transition-all ${
                    isLiked
                      ? 'bg-[#c5a059] border-[#c5a059] text-black shadow-lg'
                      : 'border-[#c5a059]/30 bg-[#141210] text-[#f7f4ed] hover:border-[#c5a059]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-black' : ''}`} />
                </button>
              </div>

              {/* Direct Buy Now */}
              <MagneticButton
                variant="gold"
                onClick={handleBuyNow}
                className="w-full py-4 text-xs font-semibold tracking-widest"
              >
                Instant Archival Acquisition ({formatPrice(product.price * quantity)})
              </MagneticButton>

              {/* Trust & Guarantee Markers */}
              <div className="pt-4 grid grid-cols-3 gap-3 text-center border-t border-white/5 text-[11px] text-[#8c806f] font-light">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#c5a059]" />
                  <span>White-Glove Insured Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                  <span>Hallmarked Authenticity</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-[#c5a059]" />
                  <span>30-Day Private Salon Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Editorial Section Below */}
        <div className="mt-24 border-t border-[#c5a059]/20 pt-12">
          {/* Tabs */}
          <div className="flex border-b border-white/10 gap-8 overflow-x-auto pb-3 text-xs uppercase tracking-[0.2em]">
            <button
              onClick={() => setActiveInfoTab('story')}
              className={`pb-3 transition-colors ${
                activeInfoTab === 'story'
                  ? 'text-[#dfba73] border-b-2 border-[#c5a059] font-medium'
                  : 'text-[#8c806f] hover:text-[#f7f4ed]'
              }`}
            >
              The Story & Lineage
            </button>
            <button
              onClick={() => setActiveInfoTab('craftsmanship')}
              className={`pb-3 transition-colors ${
                activeInfoTab === 'craftsmanship'
                  ? 'text-[#dfba73] border-b-2 border-[#c5a059] font-medium'
                  : 'text-[#8c806f] hover:text-[#f7f4ed]'
              }`}
            >
              Master Metallurgy
            </button>
            <button
              onClick={() => setActiveInfoTab('specs')}
              className={`pb-3 transition-colors ${
                activeInfoTab === 'specs'
                  ? 'text-[#dfba73] border-b-2 border-[#c5a059] font-medium'
                  : 'text-[#8c806f] hover:text-[#f7f4ed]'
              }`}
            >
              Archival File & Specs
            </button>
            <button
              onClick={() => setActiveInfoTab('delivery')}
              className={`pb-3 transition-colors ${
                activeInfoTab === 'delivery'
                  ? 'text-[#dfba73] border-b-2 border-[#c5a059] font-medium'
                  : 'text-[#8c806f] hover:text-[#f7f4ed]'
              }`}
            >
              White-Glove Protocol
            </button>
          </div>

          {/* Content */}
          <div className="py-8 max-w-4xl text-sm text-[#b8ab98] leading-relaxed font-light">
            {activeInfoTab === 'story' && (
              <div className="space-y-4">
                <h3 className="font-serif-lux text-2xl text-[#f7f4ed]">
                  {product.story || 'A Timeless Heirloom with Uncompromising Dignity'}
                </h3>
                <p>
                  Every piece in LUXIGNIA&apos;s archival vaults represents months of research, historic casting mold reconstruction, and bespoke artisanal finishing. Unlike mass-manufactured reproduction decor, our works undergo genuine fire patination, mineral wash weathering, and hand wax application that will age gracefully across generations.
                </p>
              </div>
            )}

            {activeInfoTab === 'craftsmanship' && (
              <div className="space-y-4">
                <h3 className="font-serif-lux text-2xl text-[#f7f4ed]">
                  Lost-Wax Bronze & Gold Leaf Application
                </h3>
                <p>
                  Hand-poured at temperatures exceeding 1,150°C, the molten bronze alloy contains balanced copper, tin, and zinc ratios to produce deep resonance and substantial gravitational weight. Each decorative carving is afterwards individually dressed with fine steel burins and burnishing stones.
                </p>
              </div>
            )}

            {activeInfoTab === 'specs' && (
              <div className="space-y-3">
                <h3 className="font-serif-lux text-2xl text-[#f7f4ed] mb-4">
                  Archival Registry Data
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {product.specifications ? (
                    Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="p-3 bg-[#14120f] rounded-lg border border-white/5">
                        <strong className="text-[#dfba73] block mb-1">{key}</strong>
                        <span>{val}</span>
                      </div>
                    ))
                  ) : (
                    <p>Verified Museum Reproduction Edition.</p>
                  )}
                </div>
              </div>
            )}

            {activeInfoTab === 'delivery' && (
              <div className="space-y-4">
                <h3 className="font-serif-lux text-2xl text-[#f7f4ed]">
                  Insured Custom Wooden Crate Transport
                </h3>
                <p>
                  Items above ₹25,000 receive complimentary White-Glove delivery. Your sculpture arrives in a custom-built, shock-buffered birchwood crate accompanied by handling cotton gloves and an official embossed ownership certificate.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-[#c5a059]/20 pt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#c5a059]">
                  COMPLEMENTARY MASTERPIECES
                </span>
                <h2 className="font-serif-lux text-3xl text-[#f7f4ed] mt-1 font-light">
                  Works from the Same Era
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs uppercase tracking-widest text-[#a89b88] hover:text-[#dfba73] transition-colors"
              >
                View Full Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.slice(0, 3).map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
