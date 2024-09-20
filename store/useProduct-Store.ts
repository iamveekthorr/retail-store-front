import axiosInstance from '@/lib/services/api-instance';
import { create } from 'zustand';

export interface Product {
  _id: string;
  productName: string;
  category: string;
  store: {
    _id: string;
    name: string;
    description: string;
  };
  description: string;
  price: number;
  quantity: number;
  id: string;
  image: string; // New field for the image URL
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  success: boolean;
  fetchProducts: () => Promise<void>;
  createProduct: (productData: object) => Promise<void>;
  updateProduct: (productId: string, productData: object) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,
  success: false,

  fetchProducts: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await axiosInstance.get('/products');
      set({ products: response.data.data.products, loading: false, success: true });
    } catch (error) {
      set({ loading: false, error:  'Failed to fetch products', success: false });
    }
  },

  createProduct: async (productData) => {
    set({ loading: true, error: null, success: false });
    try {
      await axiosInstance.post('/products', productData);
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, error:  'Failed to create product', success: false });
    }
  },

  updateProduct: async (productId, productData) => {
    set({ loading: true, error: null, success: false });
    try {
      await axiosInstance.patch(`/products/${productId}`, productData);
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, error:  'Failed to update product', success: false });
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true, error: null, success: false });
    try {
      await axiosInstance.delete(`/products/${productId}`);
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, error:  'Failed to delete product', success: false });
    }
  },
}));
