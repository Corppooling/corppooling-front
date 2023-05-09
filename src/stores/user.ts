import { defineStore } from 'pinia';
import type { User } from '@/interfaces/user.interface';
import axiosClient from '@/support/axiosClient';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async setUser(): Promise<void> {
      const { useAuthStore } = await import('@/stores/auth');
      const authStore = useAuthStore();

      if (authStore.token !== null && !this.isAuth) {
        try {
          await axiosClient.get('/api/user/me').then((res) => {
            this.user = res.data;
          });
        } catch (e) {
          await authStore.refreshToken();
        }
      }
    },
    unsetUser(): void {
      this.user = null;
    },
  },
  getters: {
    isAuth(): boolean {
      return this.user !== null;
    },
    getUser(): User | null {
      return this.user;
    },
    getFullName(): string {
      return this.user?.firstname + ' ' + this.user?.lastname;
    },
  },
});
