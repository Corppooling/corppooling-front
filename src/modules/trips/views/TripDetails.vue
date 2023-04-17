<script lang="ts" setup>
import { useTripStore } from "@/stores/trip";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import type { Trip } from "@/interfaces/trip.interface";
import { dateFormatedShort } from "@/support/luxon";

const route = useRoute();
const tripStore = useTripStore();
const trip = ref<Trip>({} as Trip);

onMounted(async () => {
  await tripStore.setTrip(route.params.id as string);
  trip.value = tripStore.getTrip;
  console.log(trip.value);
});
</script>

<template>
  <div>
    <h1 class="capitalize text-center p-10 text-4xl">
      {{ dateFormatedShort(trip.departure_time) }}
    </h1>
  </div>
</template>
