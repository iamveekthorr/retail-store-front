import api from "./api-instance";

export const loginUser = async (credentials: { email: string; password: string }) => {
  const { data } = await api.post('/auth/login', credentials);
  return data.data;  // Returning user and tokens from the response
};

export const registerUser = async (credentials: { email: string; password: string; confirmPassword: string }) => {
  const { data } = await api.post('/auth/create-account', credentials);
  return data;
};
