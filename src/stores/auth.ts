import { defineStore } from "pinia";
import type { AxiosResponse } from "axios";
import { router } from "@/router";
import axiosClient from "@/support/axiosClient";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: localStorage.getItem("user") as string | null,
    refreshToken: localStorage.getItem("refreshToken") as string | null,
  }),
  actions: {
    async login(username: string, password: string): Promise<void> {
      await axiosClient
        .post("/api/login_check", {
          username: username,
          password: password,
        })
        .then(async (res: AxiosResponse<Record<string, string>>) => {
          this.token = res.data.token;
          // @ts-ignore
          this.refreshToken = res.data.refresh_token;
          localStorage.setItem("user", this.token);
          localStorage.setItem("refreshToken", this.refreshToken);
          //await useUserStore().setUser();
          await router.push({ name: "home" });
        });
    },
    async refreshToken(): Promise<void> {
      await axiosClient
        .post("/api/token/refresh", {
          refresh_token: this.refreshToken,
        })
        .then(async (res: AxiosResponse<Record<string, string>>) => {
          this.token = res.data.token;
          // @ts-ignore
          this.refreshToken = res.data.refresh_token;
          localStorage.setItem("user", this.token);
          localStorage.setItem("refreshToken", this.refreshToken);
        });
    },
    async logout(): Promise<void> {
      this.token = null;
      // @ts-ignore
      this.refreshToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
      //useUserStore().unsetUser();
      await router.push({ name: "home" });
    },
  },
});
