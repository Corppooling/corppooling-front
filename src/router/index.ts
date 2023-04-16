import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "@/views/Home.vue";
import { useUserStore } from "@/stores/user";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/NotFound.vue"),
    meta: {
      authRequired: false,
    },
  },
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
      hideFooter: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/modules/auth/views/Register.vue"),
    meta: {
      authRequired: false,
      hideFooter: true,
    },
  },
  {
    path: "/trips",
    name: "trips",
    component: () => import("@/modules/trips/views/TripsList.vue"),
    meta: {
      authRequired: true,
      hideFooter: true,
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

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  await userStore.setUser();

  if (to.meta.authRequired && !userStore.isAuth) {
    await router.push({ name: "login" });
  } else if (
    userStore.isAuth &&
    (to.name === "login" || to.name === "register")
  ) {
    await router.push({ name: "home" });
  }
});

export default router;
