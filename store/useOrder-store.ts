import axiosInstance from '@/lib/services/api-instance';
import { create } from 'zustand';

interface OrderState {
  orders: object[];
  loading: boolean;
  error: string | null;
  success: boolean;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: string) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  loading: false,
  error: null,
  success: false,

  fetchOrders: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await axiosInstance.get('/orders');
      set({ orders: response.data, loading: false, success: true });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch orders', success: false });
    }
  },

  updateOrderStatus: async (orderId, status) => {
    set({ loading: true, error: null, success: false });
    try {
      await axiosInstance.patch(`/orders/${orderId}/status`, { status });
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, error:  'Failed to update order status', success: false });
    }
  },
}));
