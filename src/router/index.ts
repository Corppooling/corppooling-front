import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "@/views/Home.vue";
import { useAuthStore } from "@/stores/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      authRequired: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/modules/auth/views/Login.vue"),
    meta: {
      authRequired: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/modules/auth/views/Register.vue"),
    meta: {
      authRequired: false,
    },
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to?.meta?.authRequired && !auth.token && !auth.refreshToken) {
    return { name: "login" };
  }
});

export default router;
