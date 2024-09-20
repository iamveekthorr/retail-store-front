import axiosInstance from "@/lib/services/api-instance";
import { create } from "zustand";
import { Product } from "./useProduct-Store";

interface CartItem<TProduct = Product> {
  product: TProduct;
  quantity: number;
}

interface Cart<TUser = string, TCartItem = CartItem> {
  totalCost: number;
  user: TUser; // User type is generic, default is string (could be object in other cases)
  cartId: string;
  items: TCartItem[];
}

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  checkout: (cartId: string, shippingAddress: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  loading: false,
  error: null,
  success: false,

  fetchCart: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await axiosInstance.get("/carts");
      set({ cart: response.data.data, loading: false, success: true });
    } catch (error) {
      set({ loading: false, error: "Failed to fetch cart", success: false });
    }
  },

  addToCart: async (productId, quantity) => {
    set({ loading: true, error: null, success: false });
    try {
      await axiosInstance.post("/carts", { productId, quantity });
      await useCartStore.getState().fetchCart();

      set({ loading: false, success: true });
    } catch (error) {
      set({
        loading: false,
        error: "Failed to add item to cart",
        success: false,
      });
    }
  },

  updateCartItem: async (productId, quantity) => {
    set({ loading: true, error: null, success: false });
    try {
      await axiosInstance.patch("/carts", { productId, quantity });
      await useCartStore.getState().fetchCart();

      set({ loading: false, success: true });
    } catch (error) {
      set({
        loading: false,
        error: "Failed to update item in cart",
        success: false,
      });
    }
  },

  removeFromCart: async (productId) => {
    set({ loading: true, error: null, success: false });
    try {
      await axiosInstance.delete(`/carts/${productId}`);
      await useCartStore.getState().fetchCart();

      set({ loading: false, success: true });
    } catch (error) {
      set({
        loading: false,
        error: "Failed to remove item from cart",
        success: false,
      });
    }
  },

  checkout: async (cartId, shippingAddress) => {
    set({ loading: true, error: null, success: false });

    try {
      await axiosInstance.post("/carts/checkout", { cartId, shippingAddress });
      await useCartStore.getState().fetchCart();

      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, error: "Checkout failed", success: false });
    }
  },
}));
