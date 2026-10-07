'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Award, Sparkles, Check } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useAppStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    addToast({
      title: 'Welcome to Private Salon',
      description: 'Exclusive previews of newly acquired antiques will be delivered to your inbox.',
      type: 'gold',
    });
  };

  return (
    <footer className="relative bg-[#080706] border-t border-[#c5a059]/15 text-[#a89b88] pt-20 pb-12 overflow-hidden">
      {/* Decorative Gold Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#c5a059]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Brand Manifesto */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-block">
              <div className="relative w-36 sm:w-44 h-14 sm:h-16 flex items-center">
                <Image
                  src="/images/luxignia-brand-gold.png"
                  alt="LUXIGNIA"
                  fill
                  unoptimized
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-[#8c806f] leading-relaxed max-w-md font-light">
              Purveyors of timeless antique masterpieces, hand-carved heritage decor, and collectible bronzes. Each artifact carries centuries of European and Eastern artisan lineage, carefully curated for discriminating contemporary sanctuaries.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#cfc4b2]">
                <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                <span>Museum Provenance</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#cfc4b2]">
                <Award className="w-4 h-4 text-[#c5a059]" />
                <span>Handcrafted Castings</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#f7f4ed] font-medium">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              {['Sculptures', 'Wall Decor', 'Vases & Planters', 'Lighting', 'Table Decor', 'Bespoke Relics'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/shop"
                      className="hover:text-[#dfba73] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Maison Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#f7f4ed] font-medium">
              The Maison
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              {[
                { name: 'Our Heritage', href: '/our-story' },
                { name: 'Artisan Ateliers', href: '/our-story#craft' },
                { name: 'Custom Commissions', href: '/custom-design' },
                { name: 'White-Glove Delivery', href: '/our-story' },
                { name: 'Private Concierge', href: '/custom-design' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-[#dfba73] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Private Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#f7f4ed] font-medium">
              Private Salon Access
            </h4>
            <p className="text-xs text-[#8c806f] leading-relaxed">
              Receive private invitations to confidential archival drops, private showroom viewings, and bespoke design previews.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-lg bg-[#14120f] border border-[#c5a059]/40 text-[#c5a059] text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You have been entered into our private salon roster.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter private email"
                  required
                  className="w-full bg-[#14120f] border border-[#c5a059]/30 rounded-full py-2.5 pl-4 pr-11 text-xs text-[#f7f4ed] placeholder-[#6b6152] outline-none focus:border-[#c5a059]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#c5a059] text-black flex items-center justify-center hover:bg-[#dfba73] transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Rights & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-light text-[#6e6354] gap-4">
          <p>© {new Date().getFullYear()} LUXIGNIA Maison d&apos;Art. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/our-story" className="hover:text-[#a89b88] transition-colors">
              Terms of Salon
            </Link>
            <Link href="/our-story" className="hover:text-[#a89b88] transition-colors">
              Authenticity Warranty
            </Link>
            <Link href="/our-story" className="hover:text-[#a89b88] transition-colors">
              Privacy Protocol
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
