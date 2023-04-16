import { defineStore } from "pinia";
import axiosClient from "@/support/axiosClient";
import type { Trip } from "@/interfaces/trip.interface";
import { DateTime } from "luxon";
export const useTripStore = defineStore({
  id: "trip",
  state: () => ({
    trips: [] as Array<Trip>,
    totalTrips: 1,
    currentPage: 1,
    lastTrips: [] as Array<Trip>,
    extraSorts: [] as Array<string>,
    loading: false,
  }),
  actions: {
    async setTrips(
      departure?: string,
      arrival?: string,
      date?: string,
      reset = true,
      itemsPerPage = 8
    ) {
      this.loading = true;

      const endOfDay: string | undefined = date
        ? DateTime.fromISO(date).endOf("day").toISO()
        : undefined;

      const extraSortsObject: Record<string, string> = {};
      for (const extraSort of this.extraSorts) {
        const [key, value] = extraSort.split("=");
        extraSortsObject[key] = value;
      }

      await axiosClient
        .get("api/trips", {
          params: {
            page: this.currentPage,
            itemsPerPage: itemsPerPage,
            departure_location: departure,
            arrival_location: arrival,
            "departure_time[after]": date,
            "departure_time[before]": endOfDay,
            ...extraSortsObject,
          },
        })
        .then((res) => {
          if (reset) {
            this.trips = res.data["hydra:member"];
            this.currentPage = 1;
          } else {
            this.trips = [...this.trips, ...res.data["hydra:member"]];
            this.currentPage++;
          }
          this.totalTrips = res.data["hydra:totalItems"];
        });

      this.loading = false;
    },
    async setLatestTrips() {
      await axiosClient
        .get("api/trips", {
          params: {
            itemsPerPage: 8,
            "order[created_at]": "desc",
          },
        })
        .then((res) => {
          this.lastTrips = res.data["hydra:member"];
        });
    },
    setExtraSorts(extraSorts: Array<string>) {
      this.extraSorts = extraSorts;
    },
    resetExtraSorts() {
      this.extraSorts = [];
    },
  },
  getters: {
    getTrips(): Array<Trip> {
      return this.trips;
    },
    getLastTrips(): Array<Trip> {
      return this.lastTrips;
    },
    requestLoading(): boolean {
      return this.loading;
    },
  },
});
