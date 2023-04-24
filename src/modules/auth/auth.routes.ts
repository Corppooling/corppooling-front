import { RouteRecordRaw } from 'vue-router';

export const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/modules/auth/views/Login.vue'),
    meta: {
      authRequired: false,
      hideFooter: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/modules/auth/views/Register.vue'),
    meta: {
      authRequired: false,
      hideFooter: true,
    },
  },
];
