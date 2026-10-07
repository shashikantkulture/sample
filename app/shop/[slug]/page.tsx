import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductDetailClient from '@/components/shop/ProductDetailClient';
import { PRODUCTS } from '@/lib/products-data';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) {
    return {
      title: 'Work Not Found — LUXIGNIA',
    };
  }

  return {
    title: `${product.name} — LUXIGNIA Private Vault`,
    description: product.description,
    openGraph: {
      title: `${product.name} | LUXIGNIA Luxury Antiquities`,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  );

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts.length > 0 ? relatedProducts : PRODUCTS.filter(p => p.id !== product.id)}
    />
  );
}
