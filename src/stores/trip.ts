import { defineStore } from "pinia";
import axiosClient from "@/support/axiosClient";
import type { Trip } from "@/interfaces/trip.interface";
import { DateTime } from "luxon";
export const useTripStore = defineStore({
  id: "trip",
  state: () => ({
    trips: [] as Array<Trip>,
    lastTrips: [] as Array<Trip>,
    extraSorts: [] as Array<string>,
  }),
  actions: {
    async setTrips(
      departure?: string,
      arrival?: string,
      date?: string,
      page?: number,
      itemsPerPage?: number
    ) {
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
            page: page,
            itemsPerPage: itemsPerPage,
            departure_location: departure,
            arrival_location: arrival,
            "departure_time[after]": date,
            "departure_time[before]": endOfDay,
            ...extraSortsObject,
          },
        })
        .then((res) => {
          this.trips = res.data["hydra:member"];
        });
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
  },
});
