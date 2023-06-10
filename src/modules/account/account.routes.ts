import { RouteRecordRaw } from 'vue-router';

export const accountRoutes: Array<RouteRecordRaw> = [
  {
    path: '/account',
    name: 'account',
    component: () => import('@/modules/account/layouts/Account.vue'),
    redirect: { name: 'account.profile' },
    meta: {
      authRequired: true,
      hideFooter: true,
    },
    children: [
      {
        path: 'profile',
        name: 'account.profile',
        component: () => import('@/modules/account/views/Profile.vue'),
      },
      {
        path: 'trips',
        name: 'account.trips',
        component: () => import('@/modules/account/views/Trips.vue'),
      },
      {
        path: 'bookings',
        name: 'account.bookings',
        component: () => import('@/modules/account/views/Bookings.vue'),
      },
      {
        path: 'company',
        name: 'account.company',
        component: () => import('@/modules/account/views/Company.vue'),
      },
      {
        path: 'management',
        name: 'account.management',
        component: () => import('@/modules/account/views/Management.vue'),
      },
    ],
  },
  {
    path: '/profile/:id',
    name: 'public.profile',
    component: () => import('@/modules/account/views/PublicProfile.vue'),
    meta: {
      authRequired: true,
    },
  },
];
