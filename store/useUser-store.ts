import axiosInstance from "@/lib/services/api-instance";
import { create } from "zustand";

interface User {
  id: string;
  email: string;
  role: string[];
}

interface UserState {
  user: User | null;
  users: User[];  // List of users fetched by profile
  loading: boolean;
  error: string | null;
  fetchUserProfile: () => Promise<void>;
  fetchAllUsersByProfile: () => Promise<void>;
  fetchUserById: (userId: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  users: [],  // Initialize an empty array for users
  loading: false,
  error: null,

  // Fetch Current User Profile
  fetchUserProfile: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/users/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      set({ user: response.data.data, loading: false });
    } catch (error) {
      set({ loading: false, error: "Failed to fetch user profile" });
    }
  },

  // Fetch All Users by Profile
  fetchAllUsersByProfile: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/users/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      set({ users: response.data.data, loading: false });
    } catch (error) {
      set({ loading: false, error: "Failed to fetch users by profile" });
    }
  },

  // Fetch User by ID
  fetchUserById: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      set({ user: response.data.data, loading: false });
    } catch (error) {
      set({ loading: false, error: `Failed to fetch user with ID: ${userId}` });
    }
  },
}));
