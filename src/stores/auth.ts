import { defineStore } from 'pinia';
import type { AxiosResponse } from 'axios';
import { router } from '@/router';
import axiosClient from '@/support/axiosClient';
import { useUserStore } from '@/stores/user';
import type { AxiosError } from 'axios';
import { i18nGlobal } from '@/support/i18n';
import StatusCode from 'status-code-enum';
import axios from 'axios';

const { t } = i18nGlobal;

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: localStorage.getItem('token'),
    refresh_token: localStorage.getItem('refreshToken'),
  }),
  actions: {
    async login(username: string, password: string): Promise<void> {
      const { useToast } = await import('@/composables/toast');
      const toast = useToast();

      await axiosClient
        .post('/auth', {
          username: username,
          password: password,
        })
        .then(async (res: AxiosResponse<Record<string, string>>) => {
          await this.setAllAuthItems(res.data.token, res.data.refresh_token);
          await router.push({ name: 'home' });
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === StatusCode.ClientErrorUnauthorized) {
            toast.error(undefined, t('auth.badCredentials'));
          } else {
            toast.error();
          }
        });
    },
    async refreshToken(): Promise<void> {
      localStorage.removeItem('token');
      await axios
        .create({
          baseURL: import.meta.env.VITE_API_URL,
        })
        .post('/api/token/refresh', {
          refresh_token: this.refresh_token,
        })
        .then(async (res: AxiosResponse<Record<string, string>>) => {
          await this.setAllAuthItems(res.data.token, res.data.refresh_token);
        })
        .catch(async () => {
          await this.logout();
        });
    },
    async logout(): Promise<void> {
      this.unsetAllAuthItems();
      await router.push({ name: 'login' });
    },
    async setAllAuthItems(token: string, refresh_token: string): Promise<void> {
      this.token = token;
      this.refresh_token = refresh_token;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refresh_token);
      await useUserStore().setUser();
    },
    unsetAllAuthItems(): void {
      this.token = null;
      this.refresh_token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      useUserStore().unsetUser();
    },
  },
});
