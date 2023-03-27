import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/modules/auth/views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/modules/auth/views/Register.vue"),
    },
  ],
});

export default router;
