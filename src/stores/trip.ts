import { defineStore } from "pinia";
import axiosClient from "@/support/axiosClient";
import type { Trip } from "@/interfaces/trip.interface";
import { DateTime } from "luxon";
export const useTripStore = defineStore({
  id: "trip",
  state: () => ({
    trips: [] as Array<Trip>,
    lastTrips: [] as Array<Trip>,
  }),
  actions: {
    async setTrips(
      page?: number,
      itemsPerPage?: number,
      order?: string,
      orderDir?: string,
      departure?: string,
      arrival?: string,
      date?: string
    ) {
      const endOfDay = date
        ? DateTime.fromISO(date).endOf("day").toISO()
        : undefined;

      await axiosClient
        .get("api/trips", {
          params: {
            page: page,
            itemsPerPage: itemsPerPage,
            departure_location: departure,
            arrival_location: arrival,
            "departure_time[after]": date,
            "departure_time[before]": endOfDay,
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
