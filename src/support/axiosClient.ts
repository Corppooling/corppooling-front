import axios, { type AxiosRequestConfig, HttpStatusCode } from 'axios';
import router from '@/router';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers === undefined) {
    config.headers = {};
  }

  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
      originalRequest._retry = true;

      const { useAuthStore } = await import('@/stores/auth');
      await useAuthStore().refreshToken();
      return axiosClient(originalRequest);
    }

    if (error.response.status === HttpStatusCode.NotFound) {
      await router.push({
        name: 'error',
        params: {
          code: error.response.status,
        },
      });
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
