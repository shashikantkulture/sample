'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import MagneticButton from '@/components/ui/MagneticButton';

export default function CartPage() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    addToast,
  } = useAppStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>('');

  const subtotal = getCartTotal();
  const freeShippingThreshold = 25000;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 1800;
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'HERITAGE10' || code === 'SALON10') {
      setAppliedDiscount(10);
      setCouponMessage('10% Private Collector Privilege Applied');
      addToast({
        title: 'Privilege Applied',
        description: '10% Collector discount deducted from total.',
        type: 'gold',
      });
    } else if (code === 'LUXIGNIA15') {
      setAppliedDiscount(15);
      setCouponMessage('15% Archival Salon Privilege Applied');
      addToast({
        title: 'Privilege Applied',
        description: '15% Archival privilege deducted from total.',
        type: 'gold',
      });
    } else {
      setCouponMessage('Invalid or expired salon invitation code.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0a09] pt-24 pb-32 text-[#ede8df]">
      {/* Page Header */}
      <div className="py-12 border-b border-[#c5a059]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-medium">
            YOUR PRIVATE SALON
          </span>
          <h1 className="font-serif-lux text-3xl sm:text-5xl text-[#f7f4ed] mt-2 font-light">
            Selected Works ({cart.length})
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {cart.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#171412] border border-[#c5a059]/30 flex items-center justify-center mx-auto mb-6 text-[#c5a059]">
              <ShoppingBag className="w-10 h-10 opacity-70" />
            </div>
            <h2 className="font-serif-lux text-3xl text-[#f7f4ed] mb-3">
              Your Private Bag is Empty
            </h2>
            <p className="text-xs sm:text-sm text-[#948777] leading-relaxed mb-8 font-light">
              You haven&apos;t reserved any artifacts yet. Explore our curated catalog of bronzes, statues, and 3D antiquities.
            </p>
            <Link href="/shop">
              <MagneticButton variant="gold" className="px-8 py-3.5 text-xs font-semibold tracking-widest">
                Explore Available Works <ArrowRight className="w-4 h-4 ml-1.5" />
              </MagneticButton>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Items Table */}
            <div className="lg:col-span-8 space-y-6">
              <div className="hidden sm:grid grid-cols-12 text-xs uppercase tracking-widest text-[#807464] pb-4 border-b border-white/10">
                <span className="col-span-6">Work of Art</span>
                <span className="col-span-2 text-center">Unit Price</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Total</span>
              </div>

              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-5 rounded-2xl bg-[#141210] border border-white/5 flex flex-col sm:grid sm:grid-cols-12 items-center gap-4 transition-all hover:border-[#c5a059]/30"
                >
                  {/* Artwork & Details */}
                  <div className="col-span-6 flex items-center gap-4 w-full">
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-black/40 border border-[#c5a059]/20 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#c5a059]">
                        {item.product.category}
                      </span>
                      <Link href={`/shop/${item.product.slug}`}>
                        <h3 className="font-serif-lux text-lg text-[#f7f4ed] hover:text-[#dfba73] transition-colors leading-snug">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-[#8c806f] mt-0.5">{item.product.dimensions}</p>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[11px] text-[#ad4b4b] hover:underline flex items-center gap-1 mt-2"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center text-sm font-medium text-[#c8bcad]">
                    {formatPrice(item.product.price)}
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center border border-[#c5a059]/30 rounded-full px-2.5 py-1 bg-[#171412]">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-1 text-[#8c806f] hover:text-white"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs px-2.5 font-medium text-[#f7f4ed]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-1 text-[#8c806f] hover:text-white"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="col-span-2 text-right font-serif-lux text-lg text-[#dfba73]">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4">
                <Link
                  href="/shop"
                  className="text-xs uppercase tracking-widest text-[#a89b88] hover:text-[#dfba73] transition-colors"
                >
                  ← Continue Exploring Catalog
                </Link>
                <button
                  onClick={clearCart}
                  className="text-xs uppercase tracking-widest text-[#807464] hover:text-[#e05656] transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-7 rounded-2xl bg-[#14120f] border border-[#c5a059]/25 shadow-xl space-y-6">
                <h3 className="font-serif-lux text-2xl text-[#f7f4ed] border-b border-white/5 pb-4">
                  Valuation Summary
                </h3>

                {/* Subtotals */}
                <div className="space-y-3 text-xs text-[#b8ab98]">
                  <div className="flex justify-between">
                    <span>Archival Subtotal</span>
                    <span className="text-[#f7f4ed] font-medium">{formatPrice(subtotal)}</span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-[#dfba73]">
                      <span>Collector Privilege ({appliedDiscount}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Insured White-Glove Shipping</span>
                    <span className="text-[#f7f4ed]">
                      {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex justify-between items-baseline">
                    <span className="font-serif-lux text-base text-[#f7f4ed]">Total Investment</span>
                    <span className="font-serif-lux text-2xl text-[#dfba73] font-semibold">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Coupon Code Entry */}
                <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. HERITAGE10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-[#1a1714] border border-[#c5a059]/20 rounded-full px-4 py-2 text-xs text-[#f7f4ed] placeholder-[#6e6354] outline-none focus:border-[#c5a059]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-full bg-[#1f1b17] border border-[#c5a059]/40 hover:bg-[#c5a059] hover:text-black text-xs uppercase tracking-wider text-[#dfba73] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <p className={`text-[11px] ${appliedDiscount > 0 ? 'text-[#c5a059]' : 'text-[#c95b5b]'}`}>
                      {couponMessage}
                    </p>
                  )}
                </form>

                {/* Checkout Button */}
                <Link href="/checkout" className="block pt-2">
                  <MagneticButton
                    variant="gold"
                    className="w-full py-4 text-xs font-semibold tracking-widest"
                  >
                    Proceed to Secure Acquisition <ArrowRight className="w-4 h-4 ml-1.5" />
                  </MagneticButton>
                </Link>

                {/* Assurance */}
                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#807462]">
                  <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                  <span>Verified 256-Bit SSL Encrypted Escrow</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
