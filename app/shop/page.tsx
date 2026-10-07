import React, { Suspense } from 'react';
import ShopClient from '@/components/shop/ShopClient';

export const metadata = {
  title: 'Shop All Antiquities & Luxury Decor — LUXIGNIA',
  description:
    'Browse our comprehensive catalog of antique bronzes, sculptures, vases, lighting, and bespoke heritage decor.',
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0a09] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
