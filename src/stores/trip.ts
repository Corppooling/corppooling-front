import { defineStore } from 'pinia';
import axiosClient from '@/support/axiosClient';
import type { Trip } from '@/interfaces/trip.interface';
import { DateTime } from 'luxon';
import { actualDate } from '@/support/luxon';
import { useUserStore } from '@/stores/user';

export const useTripStore = defineStore({
  id: 'trip',
  state: () => ({
    trip: {} as Trip,
    trips: [] as Array<Trip>,
    totalTrips: 1,
    currentPage: 1,
    lastTrips: [] as Array<Trip>,
    extraSorts: [] as Array<string>,
    loading: false,
  }),
  actions: {
    async setTrip(id: string) {
      this.loading = true;
      await axiosClient.get(`api/trips/${id}`).then((res) => {
        this.trip = res.data;
        this.loading = false;
      });
    },
    async setTrips(
      departure?: string,
      arrival?: string,
      date?: string | null,
      reset = true,
      itemsPerPage = 8
    ) {
      this.loading = true;

      if (reset) {
        this.currentPage = 1;
      }

      const endOfDay: string | null | undefined = date
        ? DateTime.fromISO(date).endOf('day').toISO()
        : undefined;

      date = date ?? actualDate();

      const extraSortsObject: Record<string, string> = {};
      for (const extraSort of this.extraSorts) {
        const [key, value] = extraSort.split('=');
        extraSortsObject[key] = value;
      }

      const userStore = useUserStore();

      await axiosClient
        .get('api/trips', {
          params: {
            page: this.currentPage,
            itemsPerPage: itemsPerPage,
            departure_location: departure,
            arrival_location: arrival,
            'departure_time[after]': date,
            'departure_time[before]': endOfDay,
            'company.id':
              userStore.user?.company?.cluster !== null ? undefined : userStore.user?.company?.id,
            'company.cluster.id': userStore.user?.company?.cluster?.id ?? undefined,
            ...extraSortsObject,
          },
        })
        .then((res) => {
          if (reset) {
            this.trips = res.data['hydra:member'];
          } else {
            this.trips = [...this.trips, ...res.data['hydra:member']];
          }
          this.currentPage++;
          this.totalTrips = res.data['hydra:totalItems'];
        });

      this.loading = false;
    },
    async setLatestTrips() {
      const userStore = useUserStore();

      await axiosClient
        .get('api/trips', {
          params: {
            itemsPerPage: 8,
            'order[created_at]': 'desc',
            'departure_time[after]': actualDate(),
            'company.id':
              userStore.user?.company?.cluster !== null ? undefined : userStore.user?.company?.id,
            'company.cluster.id': userStore.user?.company?.cluster?.id ?? undefined,
          },
        })
        .then((res) => {
          this.lastTrips = res.data['hydra:member'];
        });
    },
    setExtraSorts(extraSorts: Array<string>) {
      this.extraSorts = extraSorts;
    },
    resetExtraSorts() {
      this.extraSorts = [];
    },
  },
});
