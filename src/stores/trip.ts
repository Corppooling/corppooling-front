import { defineStore } from "pinia";
import axiosClient from "@/support/axiosClient";
import type { Trip } from "@/interfaces/trip.interface";
export const useTripStore = defineStore({
  id: "trip",
  state: () => ({
    trips: [] as Array<Trip>,
    lastTrips: [] as Array<Trip>,
  }),
  actions: {
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
    getLastTrips(): Array<Trip> {
      return this.lastTrips;
    },
  },
});
