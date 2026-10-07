import { create } from 'zustand';
import { Product, CartItem, CursorVariant } from '@/types';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'gold';
}

interface AppState {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Cursor
  cursorVariant: CursorVariant;
  cursorText: string;
  setCursor: (variant: CursorVariant, text?: string) => void;
  resetCursor: () => void;

  // Search Overlay
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Quick View
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Announcement Bar
  isAnnouncementOpen: boolean;
  closeAnnouncement: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Cart state
  cart: [],
  isCartOpen: false,
  setIsCartOpen: (open) => set({ isCartOpen: open }),
  addToCart: (product, quantity = 1) => {
    set((state) => {
      const existingIndex = state.cart.findIndex((item) => item.product.id === product.id);
      let updatedCart: CartItem[];
      if (existingIndex > -1) {
        updatedCart = [...state.cart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + quantity,
        };
      } else {
        updatedCart = [...state.cart, { product, quantity }];
      }
      return { cart: updatedCart, isCartOpen: true };
    });

    // Automatically trigger luxury toast
    get().addToast({
      title: 'Added to Collection',
      description: `${product.name} (Qty: ${quantity}) is in your private bag.`,
      type: 'gold',
    });
  },
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    })),
  updateCartQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          cart: state.cart.filter((item) => item.product.id !== productId),
        };
      }
      return {
        cart: state.cart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      };
    }),
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    return get().cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  },
  getCartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },

  // Wishlist
  wishlist: ['lux-01'],
  toggleWishlist: (productId) => {
    set((state) => {
      const exists = state.wishlist.includes(productId);
      const updated = exists
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId];
      
      const toastTitle = exists ? 'Removed from Wishlist' : 'Saved to Wishlist';
      get().addToast({
        title: toastTitle,
        description: exists ? 'Item removed from your personal curation.' : 'Item preserved in your private gallery.',
        type: 'info',
      });

      return { wishlist: updated };
    });
  },
  isInWishlist: (productId) => get().wishlist.includes(productId),

  // Cursor
  cursorVariant: 'default',
  cursorText: '',
  setCursor: (variant, text = '') => set({ cursorVariant: variant, cursorText: text }),
  resetCursor: () => set({ cursorVariant: 'default', cursorText: '' }),

  // Search
  isSearchOpen: false,
  setIsSearchOpen: (open) => set({ isSearchOpen: open }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Quick View
  quickViewProduct: null,
  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),

  // Announcement
  isAnnouncementOpen: true,
  closeAnnouncement: () => set({ isAnnouncementOpen: false }),

  // Toast
  toasts: [],
  addToast: ({ title, description, type = 'gold' }) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, title, description, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 4500);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
