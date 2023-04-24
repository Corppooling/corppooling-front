import { RouteRecordRaw } from 'vue-router';

export const accountRoutes: Array<RouteRecordRaw> = [
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/modules/account/views/Profile.vue'),
    meta: {
      authRequired: true,
    },
  },
];
