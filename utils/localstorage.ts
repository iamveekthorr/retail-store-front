'use client';
// Function to get an item from localStorage
export const getLocalStorageItem = (key: string): string | null => {
  try {
    const value = localStorage?.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error getting localStorage key "${key}":, error`);
    return null;
  }
};

// Function to set an item in localStorage
export const setLocalStorageItem = (key: string, value: unknown): void => {
  try {
    localStorage?.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":, error`);
  }
};

// Function to remove an item from localStorage
export const removeLocalStorageItem = (key: string): void => {
  try {
    localStorage?.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":, error`);
  }
};
