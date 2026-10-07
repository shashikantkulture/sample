import { NextResponse } from 'next/server';
import { PRODUCTS, CATEGORIES } from '@/lib/products-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('q');
  const featured = searchParams.get('featured');

  let results = [...PRODUCTS];

  if (category && category !== 'all') {
    results = results.filter((p) => p.categorySlug === category);
  }

  if (featured === 'true') {
    results = results.filter((p) => p.featured || p.bestseller || p.isNew);
  }

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    data: results,
  });
}
