'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import MagneticButton from '@/components/ui/MagneticButton';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    getCartTotal,
  } = useAppStore();

  const total = getCartTotal();
  const freeShippingThreshold = 25000;
  const progressPercent = Math.min(100, (total / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-[#110f0d] border-l border-[#c5a059]/20 text-[#ede8df] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#c5a059]/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-[#c5a059]" />
                  <h2 className="font-serif-lux text-xl tracking-wider text-[#f7f4ed]">
                    Your Collection ({cart.length})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#998f82] hover:text-[#f7f4ed] hover:rotate-90 transition-all duration-300"
                  aria-label="Close Cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Meter */}
              <div className="px-6 py-3.5 bg-[#171411] border-b border-[#c5a059]/10">
                <div className="flex justify-between text-xs tracking-wider mb-1.5 font-light">
                  <span>
                    {total >= freeShippingThreshold ? (
                      <span className="text-[#c5a059] font-medium flex items-center gap-1">
                        ✦ Eligible for Complimentary White-Glove Delivery
                      </span>
                    ) : (
                      <span>
                        Add{' '}
                        <strong className="text-[#f7f4ed] font-medium">
                          {formatPrice(freeShippingThreshold - total)}
                        </strong>{' '}
                        for Complimentary Delivery
                      </span>
                    )}
                  </span>
                </div>
                <div className="w-full h-1 bg-[#29241e] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#b89047] to-[#dfba73]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#1c1916] border border-[#c5a059]/20 flex items-center justify-center mb-4 text-[#c5a059]">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>
                    <p className="font-serif-lux text-xl text-[#d4cdbf] mb-2">
                      Your Gallery is Empty
                    </p>
                    <p className="text-xs text-[#9c9181] max-w-xs mb-6">
                      Explore our handpicked curation of timeless heritage pieces and sculptures.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 text-xs uppercase tracking-widest text-[#c5a059] border border-[#c5a059]/40 rounded-full hover:bg-[#c5a059]/10 transition-colors"
                    >
                      Explore Curated Works
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 pb-6 border-b border-white/5 last:border-0"
                    >
                      <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-[#1a1714] border border-[#c5a059]/20 flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-serif-lux text-base text-[#f7f4ed] leading-snug">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-[#807669] hover:text-[#e05656] p-1 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-xs text-[#a89b88] mt-0.5">
                            {item.product.category}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-[#c5a059]/30 rounded-full px-2 py-0.5 bg-[#171412]">
                            <button
                              onClick={() =>
                                updateCartQuantity(item.product.id, item.quantity - 1)
                              }
                              className="p-1 text-[#a89b88] hover:text-white"
                              aria-label="Decrease quantity"
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
                              className="p-1 text-[#a89b88] hover:text-white"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Price */}
                          <span className="text-sm font-medium text-[#dfba73]">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#c5a059]/20 bg-[#14110e] space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#a89b88]">
                      <span>Subtotal</span>
                      <span className="text-[#f7f4ed]">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-[#a89b88]">
                      <span>Estimated White-Glove Shipping</span>
                      <span className="text-[#f7f4ed]">
                        {total >= freeShippingThreshold ? 'Complimentary' : formatPrice(1800)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-serif-lux text-[#f7f4ed] pt-2 border-t border-white/5 font-semibold">
                      <span>Total Valuation</span>
                      <span className="text-[#dfba73]">
                        {formatPrice(
                          total + (total >= freeShippingThreshold ? 0 : 1800)
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 pt-2">
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full"
                    >
                      <MagneticButton
                        variant="gold"
                        className="w-full py-3.5 tracking-widest text-xs"
                      >
                        Proceed to Secure Checkout <ArrowRight className="w-4 h-4 ml-1" />
                      </MagneticButton>
                    </Link>

                    <Link
                      href="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full text-center py-2 text-xs uppercase tracking-widest text-[#a89b88] hover:text-[#f7f4ed] transition-colors"
                    >
                      View Full Bag & Heritage Certifications
                    </Link>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-[#7d7262] pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Insured Courier • Authenticity Guaranteed</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
