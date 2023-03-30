import { defineStore } from "pinia";
import type { AxiosResponse } from "axios";
import { router } from "@/router";
import axiosClient from "@/support/axiosClient";
import { useUserStore } from "@/stores/user";
import { error } from "@/support/toast";
import type { AxiosError } from "axios";
import { i18n } from "@/support/i18n";
import StatusCode from "status-code-enum";

const { t } = i18n.global;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: localStorage.getItem("token"),
    refresh_token: localStorage.getItem("refreshToken"),
  }),
  actions: {
    async login(username: string, password: string): Promise<void> {
      await axiosClient
        .post("/auth", {
          username: username,
          password: password,
        })
        .then(async (res: AxiosResponse<Record<string, string>>) => {
          await this.setAllAuthItems(res.data.token, res.data.refresh_token);
          await router.push({ name: "home" });
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === StatusCode.ClientErrorUnauthorized) {
            error(undefined, t("auth.badCredentials"));
          } else {
            error();
          }
        });
    },
    async refreshToken(): Promise<void> {
      localStorage.removeItem("token");
      await axiosClient
        .post("/api/token/refresh", {
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
      await router.push({ name: "login" });
    },
    async setAllAuthItems(token: string, refresh_token: string): Promise<void> {
      this.token = token;
      this.refresh_token = refresh_token;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refresh_token);
      await useUserStore().setUser();
    },
    unsetAllAuthItems(): void {
      this.token = null;
      this.refresh_token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      useUserStore().unsetUser();
    },
  },
});
