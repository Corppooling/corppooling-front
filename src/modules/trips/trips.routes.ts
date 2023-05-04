import { RouteRecordRaw } from 'vue-router';

export const tripRoutes: Array<RouteRecordRaw> = [
  {
    path: '/trips',
    name: 'trips',
    component: () => import('@/modules/trips/views/TripsList.vue'),
    meta: {
      authRequired: true,
      hideFooter: true,
    },
  },
  {
    path: '/trips/:id',
    name: 'trip.show',
    component: () => import('@/modules/trips/views/TripDetails.vue'),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/trips/new-trip',
    name: 'trip.add',
    component: () => import('@/modules/trips/views/AddTrip.vue'),
    meta: {
      authRequired: true,
    },
  },
];
