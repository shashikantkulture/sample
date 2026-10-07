'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import MagneticButton from '@/components/ui/MagneticButton';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart, addToast } = useAppStore();

  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vanderbilt',
    email: 'eleanor.vanderbilt@private.com',
    phone: '+91 98765 43210',
    address: '42 Royal Crescent, Kensington Enclave',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
    country: 'India',
    paymentMethod: 'card',
    deliveryMethod: 'white-glove',
    notes: 'Please ensure custom padded wooden crate handling upon delivery.',
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const shippingFee = subtotal >= 25000 || subtotal === 0 ? 0 : 1800;
  const total = subtotal + shippingFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedId = `LX-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setOrderConfirmed(true);
      clearCart();

      // Confetti celebratory effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c5a059', '#dfba73', '#ede8df', '#ffffff'],
        });
      } catch (err) {
        // Safe fallback
      }

      addToast({
        title: 'Acquisition Confirmed',
        description: `Your order #${generatedId} has been registered with our private concierge.`,
        type: 'gold',
      });
    }, 1400);
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-[#0b0a09] pt-28 pb-32 flex items-center justify-center text-[#ede8df] px-4">
        <div className="max-w-xl w-full p-8 sm:p-12 rounded-3xl bg-[#14120f] border border-[#c5a059]/30 text-center shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center mx-auto text-[#c5a059]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059]">
            COMMISSION ACQUIRED
          </span>

          <h1 className="font-serif-lux text-3xl sm:text-4xl text-[#f7f4ed]">
            Thank You, {formData.firstName}
          </h1>

          <p className="text-xs sm:text-sm text-[#a89b88] leading-relaxed font-light">
            Your archival acquisition dossier has been assigned to reference{' '}
            <strong className="text-[#dfba73] font-mono font-medium">#{orderId}</strong>. A private curator from the LUXIGNIA atelier will contact you to coordinate insured white-glove transit to your residence.
          </p>

          <div className="p-4 rounded-xl bg-[#1a1714] border border-white/5 text-xs text-left space-y-1 text-[#b8ab98]">
            <p>
              <strong className="text-[#f7f4ed]">Destination:</strong> {formData.address},{' '}
              {formData.city}, {formData.postalCode}
            </p>
            <p>
              <strong className="text-[#f7f4ed]">Payment Verification:</strong> Confirmed via Private Escrow
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-4">
            <Link href="/shop">
              <MagneticButton variant="gold" className="px-8 py-3.5 text-xs font-semibold tracking-widest">
                Return to Gallery <ArrowRight className="w-4 h-4 ml-1.5" />
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0a09] pt-24 pb-32 text-[#ede8df]">
      {/* Header */}
      <div className="py-12 border-b border-[#c5a059]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-medium">
              LUXURY ESCROW PROTOCOL
            </span>
            <h1 className="font-serif-lux text-3xl sm:text-5xl text-[#f7f4ed] mt-1 font-light">
              Archival Acquisition
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#8c806f]">
            <Lock className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>256-Bit Encrypted Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form: Client Details, Address, Payment */}
          <div className="lg:col-span-7 space-y-10">
            {/* Section 1: Collector Details */}
            <div className="space-y-4">
              <h2 className="font-serif-lux text-2xl text-[#f7f4ed] border-b border-white/5 pb-3">
                1. Collector Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-[#141210] border border-[#c5a059]/20 rounded-xl p-3 text-xs text-[#f7f4ed] outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-[#141210] border border-[#c5a059]/20 rounded-xl p-3 text-xs text-[#f7f4ed] outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#141210] border border-[#c5a059]/20 rounded-xl p-3 text-xs text-[#f7f4ed] outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1.5">
                    Private Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#141210] border border-[#c5a059]/20 rounded-xl p-3 text-xs text-[#f7f4ed] outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Residence */}
            <div className="space-y-4">
              <h2 className="font-serif-lux text-2xl text-[#f7f4ed] border-b border-white/5 pb-3">
                2. Residence / Gallery Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1.5">
                    Street Address & Suite
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-[#141210] border border-[#c5a059]/20 rounded-xl p-3 text-xs text-[#f7f4ed] outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-[#141210] border border-[#c5a059]/20 rounded-xl p-3 text-xs text-[#f7f4ed] outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1.5">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full bg-[#141210] border border-[#c5a059]/20 rounded-xl p-3 text-xs text-[#f7f4ed] outline-none focus:border-[#c5a059]"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs uppercase tracking-wider text-[#a89b88] mb-1.5">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-[#141210] border border-[#c5a059]/20 rounded-xl p-3 text-xs text-[#f7f4ed] outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Payment Method */}
            <div className="space-y-4">
              <h2 className="font-serif-lux text-2xl text-[#f7f4ed] border-b border-white/5 pb-3">
                3. Secure Payment Gateway
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'card', name: 'Credit / Debit Card', desc: 'Visa, Amex, Mastercard via Stripe' },
                  { id: 'razorpay', name: 'UPI & NetBanking', desc: 'Instant transfer via Razorpay' },
                  { id: 'cod', name: 'Concierge COD', desc: 'Pay upon white-glove inspection' },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      formData.paymentMethod === method.id
                        ? 'border-[#c5a059] bg-[#1a1714] shadow-[0_0_15px_rgba(197,160,89,0.2)]'
                        : 'border-white/5 bg-[#141210] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif-lux text-sm text-[#f7f4ed] font-medium">
                        {method.name}
                      </span>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="accent-[#c5a059]"
                      />
                    </div>
                    <span className="text-[11px] text-[#8c806f]">{method.desc}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Summary Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-[#14120f] border border-[#c5a059]/25 shadow-xl space-y-6 sticky top-28">
              <h3 className="font-serif-lux text-2xl text-[#f7f4ed] border-b border-white/5 pb-3">
                Acquisition Summary
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-xs text-[#8c806f]">No items in current collection session.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded bg-black/40 overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-serif-lux text-sm text-[#f7f4ed] line-clamp-1">
                            {item.product.name}
                          </p>
                          <span className="text-[#8c806f]">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-serif-lux text-sm text-[#dfba73]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Totals */}
              <div className="pt-4 border-t border-white/5 space-y-2.5 text-xs text-[#b8ab98]">
                <div className="flex justify-between">
                  <span>Archival Subtotal</span>
                  <span className="text-[#f7f4ed]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>White-Glove Insured Courier</span>
                  <span className="text-[#f7f4ed]">
                    {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="pt-3 border-t border-white/5 flex justify-between items-baseline font-serif-lux">
                  <span className="text-base text-[#f7f4ed]">Total Due</span>
                  <span className="text-2xl text-[#dfba73] font-semibold">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <MagneticButton
                variant="gold"
                disabled={isProcessing || cart.length === 0}
                className="w-full py-4 text-xs font-semibold tracking-widest"
              >
                {isProcessing ? 'Verifying with Vault...' : 'Authorize Commission & Place Order'}
              </MagneticButton>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#786b59] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Complimentary Vault Storage for 30 Days Included</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
