import axios, { type AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/auth";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// @ts-ignore
axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers === undefined) {
    config.headers = {};
  }

  if (localStorage.getItem("token")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      await useAuthStore().refreshToken();
      return axiosClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
