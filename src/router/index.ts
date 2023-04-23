import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/Home.vue';
import { useUserStore } from '@/stores/user';
import { authRoutes } from '@/modules/auth/router';
import { tripRoutes } from '@/modules/trips/router';
import { accountRoutes } from '@/modules/account/router';

const routes: Array<RouteRecordRaw> = [
  ...authRoutes,
  ...tripRoutes,
  ...accountRoutes,
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      authRequired: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
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

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  await userStore.setUser();

  if (to.meta.authRequired && !userStore.isAuth) {
    await router.push({ name: 'login' });
  } else if (userStore.isAuth && (to.name === 'login' || to.name === 'register')) {
    await router.push({ name: 'home' });
  }
});

export default router;
