import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { apiRequest } from './queryClient';
import type { CartItemWithProduct, Product } from '@shared/schema';

interface CartState {
  items: CartItemWithProduct[];
  sessionId: string;
  isOpen: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  
  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Cart operations
  addItem: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  
  // Initialization
  initializeCart: () => Promise<void>;
  
  // Computed properties
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Create the cart store
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      sessionId: nanoid(),
      isOpen: false,
      isLoading: false,
      isInitialized: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),

      addItem: async (product, quantity = 1) => {
        try {
          set({ isLoading: true });
          
          // Send API request to add item to cart
          const response = await apiRequest('POST', '/api/cart', {
            productId: product.id,
            quantity,
            sessionId: get().sessionId
          });
          
          const newItem = await response.json();
          
          // Add item to local state
          set(state => ({
            items: [...state.items, newItem],
            isLoading: false
          }));
          
          // Open the cart when adding an item
          get().openCart();
        } catch (error) {
          console.error('Failed to add item to cart:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      updateQuantity: async (cartItemId, quantity) => {
        try {
          set({ isLoading: true });
          
          // Send API request to update item quantity
          const response = await apiRequest('PUT', `/api/cart/${cartItemId}`, { quantity });
          const updatedItem = await response.json();
          
          // Update local state
          set(state => ({
            items: state.items.map(item => 
              item.id === cartItemId ? updatedItem : item
            ),
            isLoading: false
          }));
        } catch (error) {
          console.error('Failed to update item quantity:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      removeItem: async (cartItemId) => {
        try {
          set({ isLoading: true });
          
          // Send API request to remove item
          await apiRequest('DELETE', `/api/cart/${cartItemId}`);
          
          // Update local state
          set(state => ({
            items: state.items.filter(item => item.id !== cartItemId),
            isLoading: false
          }));
        } catch (error) {
          console.error('Failed to remove item from cart:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      clearCart: async () => {
        try {
          set({ isLoading: true });
          
          // Send API request to clear cart
          await apiRequest('DELETE', `/api/cart?sessionId=${get().sessionId}`);
          
          // Update local state
          set({ items: [], isLoading: false });
        } catch (error) {
          console.error('Failed to clear cart:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      initializeCart: async () => {
        if (get().isInitialized) return;
        
        try {
          set({ isLoading: true });
          
          // Fetch cart items from API
          const response = await fetch(`/api/cart?sessionId=${get().sessionId}`, {
            credentials: 'include'
          });
          
          if (response.ok) {
            const items = await response.json();
            set({ items, isInitialized: true, isLoading: false });
          }
        } catch (error) {
          console.error('Failed to initialize cart:', error);
          set({ isLoading: false });
        }
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.discountPrice || item.product.price;
          return total + (price * item.quantity);
        }, 0);
      }
    }),
    {
      name: 'whitepepper-cart',
      // Only persist the sessionId
      partialize: (state) => ({ sessionId: state.sessionId })
    }
  )
);
