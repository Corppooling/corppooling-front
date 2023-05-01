import { RouteRecordRaw } from 'vue-router';

export const accountRoutes: Array<RouteRecordRaw> = [
  {
    path: '/account',
    name: 'account',
    meta: {
      authRequired: true,
      hideFooter: true,
    },
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/modules/account/views/Profile.vue'),
      },
      {
        path: 'bookings',
        name: 'bookings',
        component: () => import('@/modules/account/views/Bookings.vue'),
      },
      {
        path: 'company',
        name: 'company',
        component: () => import('@/modules/account/views/Company.vue'),
      },
    ],
  },
];
