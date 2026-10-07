export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  story?: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  categorySlug: string;
  collection: string;
  images: string[];
  model3D?: {
    type: 'vase' | 'sculpture' | 'bowl' | 'custom';
    color?: string;
    roughness?: number;
    metalness?: number;
    scale?: number;
  };
  material: string;
  dimensions: string;
  weight: string;
  origin?: string;
  era?: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  limited?: boolean;
  handcrafted?: boolean;
  tags: string[];
  specifications?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export type CursorVariant = 'default' | 'link' | 'product' | '3d' | 'drag' | 'add' | 'discover';

export interface CustomerOrder {
  id: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: 'stripe' | 'razorpay' | 'cod';
  status: 'pending' | 'confirmed' | 'shipped';
  createdAt: string;
}
