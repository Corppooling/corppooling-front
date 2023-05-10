<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { Trip } from '@/interfaces/trip.interface';
import { actualFullDate } from '@/support/luxon';
import TripInline from '@/modules/trips/components/molecules/TripInline.vue';

const userStore = useUserStore();
const trips = ref<Trip[]>(
  userStore.getUser?.trips.sort((a, b) => (a.departure_time > b.departure_time ? 1 : -1)) ?? []
);

const passedTrips = computed<Trip[]>(() => {
  return trips.value.filter((trip) => trip.departure_time < actualFullDate());
});
const upcomingTrips = computed<Trip[]>(() => {
  return trips.value.filter((trip) => trip.departure_time >= actualFullDate());
});

const deleteTrip = (tripId: number): void => {
  //trips.value = trips.value.filter((t) => t.id !== trip.id);
  // eslint-disable-next-line no-console
  console.log(tripId);
};
</script>

<template>
  <div class="p-10">
    <h1 class="text-4xl font-bold">Mes trajets</h1>
    <div>
      <div v-if="trips.length > 0" class="my-8 flex flex-wrap gap-8">
        <div class="w-full">
          <h3 class="mb-8 text-2xl">Trajets à venir</h3>
          <div
            v-if="upcomingTrips.length > 0"
            class="grid-cols-[repeat(auto-fill, w-full)] grid gap-8 lg:grid-cols-[repeat(auto-fill,650px)]"
          >
            <TripInline
              v-for="trip in upcomingTrips"
              :key="trip.id"
              :trip="trip"
              withDelete
              @delete:trip="(id) => deleteTrip(id)"
            />
          </div>
        </div>
        <div class="mt-8 w-full">
          <h3 class="mb-8 text-2xl">Trajets passés</h3>
          <div
            v-if="passedTrips.length > 0"
            class="grid-cols-[repeat(auto-fill, w-full)] grid gap-8 lg:grid-cols-[repeat(auto-fill,650px)]"
          >
            <TripInline v-for="trip in passedTrips" :key="trip.id" :trip="trip" />
          </div>
        </div>
      </div>
      <template v-else></template>
    </div>
  </div>
</template>
