import { create } from 'zustand';
import { CartItem, Product, Discount } from '../types';

interface CartState {
  items: CartItem[];
  discount: Discount | null;
  taxRate: number;
  serviceChargeRate: number;
  
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setDiscount: (discount: Discount | null) => void;
  clearCart: () => void;
  
  getTotals: () => {
    subtotal: number;
    tax: number;
    serviceCharge: number;
    discountAmount: number;
    total: number;
  };
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  discount: null,
  taxRate: 0.1, // 10%
  serviceChargeRate: 0.05, // 5%

  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity: 1 }] };
    });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  setDiscount: (discount) => set({ discount }),
  
  clearCart: () => set({ items: [], discount: null }),

  getTotals: () => {
    const { items, discount, taxRate, serviceChargeRate } = get();
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    let discountAmount = 0;
    if (discount) {
      if (discount.type === 'percentage') {
        discountAmount = subtotal * (discount.value / 100);
      } else {
        discountAmount = discount.value;
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const tax = discountedSubtotal * taxRate;
    const serviceCharge = discountedSubtotal * serviceChargeRate;
    const total = discountedSubtotal + tax + serviceCharge;

    return {
      subtotal,
      tax,
      serviceCharge,
      discountAmount,
      total,
    };
  },
}));
