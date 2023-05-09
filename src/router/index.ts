import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Home.vue';
import { useUserStore } from '@/stores/user';
import { authRoutes } from '@/modules/auth/auth.routes';
import { tripRoutes } from '@/modules/trips/trips.routes';
import { accountRoutes } from '@/modules/account/account.routes';

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
