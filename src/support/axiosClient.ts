import axios, { type AxiosRequestConfig } from "axios";

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

export default axiosClient;
