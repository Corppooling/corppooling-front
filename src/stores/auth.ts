import { defineStore } from "pinia";
import type { AxiosResponse } from "axios";
import { router } from "@/router";
import axiosClient from "@/support/axiosClient";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: localStorage.getItem("user"),
    refreshToken: localStorage.getItem("refreshToken"),
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
          this.refreshToken = res.data.refresh_token;
          localStorage.setItem("user", this.token);
          localStorage.setItem("refreshToken", this.refreshToken);
          //await useUserStore().setUser();
          await router.push({ name: "home" });
        });
    },
    async logout(): Promise<void> {
      this.token = null;
      this.refreshToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
      //useUserStore().unsetUser();
      await router.push({ name: "home" });
    },
  },
});
