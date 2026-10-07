'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, ArrowUpDown, Search, Check, Sparkles, X } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import QuickViewModal from '@/components/shop/QuickViewModal';
import { PRODUCTS, CATEGORIES } from '@/lib/products-data';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const filterParam = searchParams.get('filter');

  const { wishlist } = useAppStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [filterWishlistOnly, setFilterWishlistOnly] = useState<boolean>(filterParam === 'wishlist');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.categorySlug !== selectedCategory) {
        return false;
      }
      // Wishlist filter
      if (filterWishlistOnly && !wishlist.includes(product.id)) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Stock
      if (inStockOnly && product.stock <= 0) {
        return false;
      }
      // Search query
      if (
        searchFilter.trim() &&
        !product.name.toLowerCase().includes(searchFilter.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchFilter.toLowerCase())
      ) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-asc') return a.price - b.price;
      if (selectedSort === 'price-desc') return b.price - a.price;
      if (selectedSort === 'rating') return b.rating - a.rating;
      if (selectedSort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // Default featured
    });
  }, [
    selectedCategory,
    filterWishlistOnly,
    wishlist,
    maxPrice,
    inStockOnly,
    searchFilter,
    selectedSort,
  ]);

  return (
    <div className="min-h-screen bg-[#0b0a09] pt-24 pb-28">
      {/* Shop Hero Banner */}
      <div className="relative py-16 sm:py-24 border-b border-[#c5a059]/15 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#241c14]/40 via-[#0b0a09]/90 to-[#0b0a09] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-medium">
            MUSEUM ARCHIVES & ANTIQUITIES
          </span>
          <h1 className="font-serif-lux text-4xl sm:text-6xl text-[#f7f4ed] mt-3 font-light">
            The Permanent Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#a89b88] max-w-xl mx-auto mt-4 font-light leading-relaxed">
            Acquire certified heritage artifacts, lost-wax cast bronzes, and classical European statuary individually catalogued by our master restorers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Top Control Bar: Search, Category Tabs, Sort */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 pb-8 border-b border-white/5">
          {/* Category Tabs (Desktop) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setFilterWishlistOnly(false);
              }}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'all' && !filterWishlistOnly
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'bg-[#141210] text-[#a89b88] hover:text-[#f7f4ed] border border-white/5'
              }`}
            >
              All Works ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setFilterWishlistOnly(false);
                }}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat.slug && !filterWishlistOnly
                    ? 'bg-[#c5a059] text-black font-semibold'
                    : 'bg-[#141210] text-[#a89b88] hover:text-[#f7f4ed] border border-white/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
            <button
              onClick={() => setFilterWishlistOnly(!filterWishlistOnly)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                filterWishlistOnly
                  ? 'bg-[#c5a059] text-black font-semibold'
                  : 'bg-[#141210] text-[#a89b88] hover:text-[#f7f4ed] border border-white/5'
              }`}
            >
              Saved ({wishlist.length})
            </button>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8c806f]" />
              <input
                type="text"
                placeholder="Filter works..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-[#141210] border border-[#c5a059]/20 rounded-full py-2 pl-9 pr-3 text-xs text-[#f7f4ed] placeholder-[#7d7162] outline-none focus:border-[#c5a059]"
              />
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="appearance-none bg-[#141210] border border-[#c5a059]/20 rounded-full py-2 pl-4 pr-9 text-xs text-[#d6cfc2] outline-none focus:border-[#c5a059] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8c806f] pointer-events-none" />
            </div>

            {/* Filter Toggle Button for mobile */}
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="lg:hidden p-2 rounded-full bg-[#141210] border border-[#c5a059]/20 text-[#a89b88]"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Layout: Sidebar Filters & Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Desktop Left Filter Sidebar */}
          <div className="hidden lg:block space-y-8 pr-4 border-r border-white/5">
            {/* Price Filter */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#f7f4ed] font-medium mb-3">
                Valuation Cap
              </h4>
              <input
                type="range"
                min="5000"
                max="50000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#c5a059] cursor-pointer"
              />
              <div className="flex justify-between text-xs text-[#a89b88] mt-2">
                <span>₹5,000</span>
                <span className="text-[#dfba73] font-medium">{formatPrice(maxPrice)}</span>
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-4 border-t border-white/5">
              <label className="flex items-center gap-3 cursor-pointer text-xs text-[#d6cfc2]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[#c5a059] accent-[#c5a059] w-4 h-4"
                />
                <span>Available for Immediate Dispatch</span>
              </label>
            </div>

            {/* Archival Assurance Badge */}
            <div className="p-4 rounded-xl bg-[#14120f] border border-[#c5a059]/20 text-xs text-[#8c806f] space-y-2">
              <div className="flex items-center gap-2 text-[#c5a059]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-medium uppercase tracking-wider text-[10px]">
                  Verified Provenance
                </span>
              </div>
              <p className="leading-relaxed">
                All antiquities undergo metallurgical carbon verification and include wax-sealed certificates of archival authenticity.
              </p>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-serif-lux text-2xl text-[#f7f4ed] mb-2">No Matching Works Found</p>
                <p className="text-xs text-[#8c806f] max-w-sm mx-auto mb-6">
                  Try adjusting your valuation cap, clearing search keywords, or selecting a different category.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setMaxPrice(50000);
                    setSearchFilter('');
                    setFilterWishlistOnly(false);
                  }}
                  className="px-6 py-2.5 text-xs uppercase tracking-widest text-black bg-[#c5a059] rounded-full hover:bg-[#dfba73] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal />
    </div>
  );
}
