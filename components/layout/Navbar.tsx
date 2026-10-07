'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, Menu, X, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import MagneticButton from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    getCartCount,
    setIsCartOpen,
    wishlist,
    setIsSearchOpen,
    setCursor,
    resetCursor,
  } = useAppStore();

  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/collections' },
    { name: 'Custom Design', href: '/custom-design' },
    { name: 'Our Story', href: '/our-story' },
  ];

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-500',
          isScrolled
            ? 'bg-[#0e0c0b]/85 backdrop-blur-md border-b border-[#c5a059]/15 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with Official Monogram */}
          <Link
            href="/"
            className="group flex items-center transition-all py-0.5"
            onMouseEnter={() => setCursor('link')}
            onMouseLeave={resetCursor}
          >
            <div className="relative w-28 sm:w-36 h-12 sm:h-14 flex items-center">
              <Image
                src="/images/luxignia-brand-gold.png"
                alt="LUXIGNIA"
                fill
                unoptimized
                priority
                className="object-contain object-left transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setCursor('link')}
                  onMouseLeave={resetCursor}
                  className="group relative py-1 text-[13px] font-normal tracking-[0.16em] uppercase text-[#d6cfc2] transition-colors hover:text-[#f7f4ed]"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
                    {link.name}
                  </span>
                  {/* Growing gold underline from center */}
                  <span
                    className={cn(
                      'absolute bottom-0 left-1/2 h-[1.5px] -translate-x-1/2 bg-[#c5a059] transition-all duration-300 ease-out',
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action Icons and CTA */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="p-2 sm:p-2.5 text-[#d6cfc2] hover:text-[#f7e8c3] transition-colors rounded-full hover:bg-white/5"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/shop?filter=wishlist"
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="relative p-2 sm:p-2.5 text-[#d6cfc2] hover:text-[#f7e8c3] transition-colors rounded-full hover:bg-white/5"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a059] text-[9px] font-bold text-[#0c0a09]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              onMouseEnter={() => setCursor('link')}
              onMouseLeave={resetCursor}
              className="relative p-2 sm:p-2.5 text-[#d6cfc2] hover:text-[#f7e8c3] transition-colors rounded-full hover:bg-white/5"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              <motion.span
                key={cartCount}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a059] text-[9px] font-bold text-[#0c0a09]"
              >
                {cartCount}
              </motion.span>
            </button>

            {/* Contact Us Magnetic Button */}
            <div className="hidden sm:block">
              <Link href="/custom-design">
                <MagneticButton
                  variant="primary"
                  className="px-5 py-2 text-xs tracking-[0.14em] !rounded-full bg-[#e8decb] text-[#141210] hover:bg-[#f7f2e7]"
                >
                  Contact Us
                </MagneticButton>
              </Link>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#d6cfc2] hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[65px] z-30 bg-[#0e0c0b]/98 backdrop-blur-xl border-b border-[#c5a059]/20 p-6 lg:hidden"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif-lux text-2xl tracking-wider text-[#ede8df] hover:text-[#c5a059] transition-colors py-1 border-b border-white/5"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="/custom-design"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center bg-[#c5a059] text-black uppercase tracking-widest text-xs font-semibold rounded-full"
                >
                  Contact Us / Bespoke Inquiries
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
