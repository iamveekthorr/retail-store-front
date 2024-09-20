import axiosInstance from '@/lib/services/api-instance';
import { create } from 'zustand';

interface StoreState {
  stores: object[];
  loading: boolean;
  error: string | null;
  success: boolean;
  fetchStores: () => Promise<void>;
  createStore: (name: string, description: string) => Promise<void>;
  updateStore: (storeId: string, name: string) => Promise<void>;
  deleteStore: (storeId: string) => Promise<void>;
}

export const useStoreStore = create<StoreState>((set) => ({
  stores: [],
  loading: false,
  error: null,
  success: false,

  fetchStores: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await axiosInstance.get('/stores/my');
      set({ stores: response.data, loading: false, success: true });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch stores', success: false });
    }
  },

  createStore: async (name, description) => {
    set({ loading: true, error: null, success: false });
    try {
      await axiosInstance.post('/stores/', { name, description });
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, error: 'Failed to create store', success: false });
    }
  },

  updateStore: async (storeId, name) => {
    set({ loading: true, error: null, success: false });
    try {
      await axiosInstance.patch(`/stores/${storeId}`, { name });
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, error: 'Failed to update store', success: false });
    }
  },

  deleteStore: async (storeId) => {
    set({ loading: true, error: null, success: false });
    try {
      await axiosInstance.delete(`/stores/${storeId}`);
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, error: 'Failed to delete store', success: false });
    }
  },
}));
