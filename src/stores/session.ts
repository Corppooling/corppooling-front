import { defineStore } from "pinia";
import type { User } from "@/interfaces/user.interface";
import { useAuthStore } from "@/stores/auth";
import axiosClient from "@/support/axiosClient";
export const useSessionStore = defineStore({
  id: "session",
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async setUser(): Promise<void> {
      if (useAuthStore().token !== null && this.user === null) {
        try {
          await axiosClient.get("/api/user/me").then((res) => {
            this.user = res.data;
          });
        } catch (e) {
          await useAuthStore().refreshToken();
        }
      }
    },
    unsetUser(): void {
      this.user = null;
    },
  },
});
