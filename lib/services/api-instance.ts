import axios from 'axios';

// Create Axios instance with default base URL
const axiosInstance = axios.create({
  baseURL: 'https://dimeji-masters.onrender.com/v1', // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage?.getItem('ACCESS_TOKEN');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
