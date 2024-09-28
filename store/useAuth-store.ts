'use client';
import axiosInstance from '@/lib/services/api-instance';
import { create } from 'zustand';

type User = Record<string, string>;

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user:
    typeof window !== 'undefined' && localStorage?.getItem('USER')
      ? JSON.parse(localStorage.getItem('USER') ?? '')
      : null,
  accessToken:
    typeof window !== 'undefined' && localStorage.getItem('ACCESS_TOKEN')
      ? (localStorage.getItem('ACCESS_TOKEN') as string)
      : null,
  refreshToken: null,
  loading: false,
  error: null,
  success: false,

  login: async (email, password) => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      const { user, tokens } = response.data.data;

      // Store tokens in localStorage
      localStorage?.setItem('ACCESS_TOKEN', tokens.accessToken);
      localStorage?.setItem('REFRESH_TOKEN', tokens.refreshToken);
      localStorage?.setItem('USER', JSON.stringify(user));

      // Attach token to Axios instance
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${tokens.accessToken}`;

      set({
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        loading: false,
        success: true,
      });
    } catch (error: unknown) {
      set({ loading: false, error: 'Login failed', success: false });
    }
  },

  register: async (email, password, confirmPassword) => {
    set({ loading: true, error: null, success: false });
    try {
      await axiosInstance.post('/auth/create-account', {
        email,
        password,
        confirmPassword,
      });
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, error: 'Registration failed', success: false });
    }
  },

  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      success: false,
    });
    localStorage?.removeItem('ACCESS_TOKEN');
    localStorage?.removeItem('REFRESH_TOKEN');
    delete axiosInstance.defaults.headers.common['Authorization'];
  },
}));
