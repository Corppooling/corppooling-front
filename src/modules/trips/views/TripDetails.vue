<script lang="ts" setup>
import { useTripStore } from "@/stores/trip";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import type { Trip } from "@/interfaces/trip.interface";
import { dateFormatedOnlyHours, dateFormatedShort } from "@/support/luxon";

const route = useRoute();
const tripStore = useTripStore();
const trip = ref<Trip>({} as Trip);
const lineLength = ref<number>(400);

onMounted(async () => {
  await tripStore.setTrip(route.params.id as string);
  trip.value = tripStore.getTrip;
  console.log(trip.value);
});
</script>

<template>
  <div class="max-w-screen-2xl mx-auto">
    <h1 class="capitalize text-center p-10 text-4xl">
      {{ dateFormatedShort(trip.departure_time) }}
    </h1>
    <div class="flex flex-col md:flex-row my-10">
      <div class="flex flex-col justify-center items-end p-4">
        <span>{{ trip.departure_location }}</span>
        <span>{{ dateFormatedOnlyHours(trip.departure_time) }}</span>
      </div>
      <div>
        <img
          class="w-10 car-animate"
          src="@/assets/images/logos/logo_content.svg"
          alt=""
        />
        <svg :width="lineLength + 30" height="30">
          <circle
            cx="20"
            cy="15"
            r="10"
            stroke="#F6B26B"
            stroke-width="2"
            fill="none"
          />
          <line
            x1="30"
            y1="15"
            y2="15"
            :x2="lineLength"
            stroke="#F6B26B"
            stroke-width="2"
          />
          <circle
            :cx="lineLength + 10"
            cy="15"
            r="10"
            stroke="#F6B26B"
            stroke-width="2"
            fill="none"
          />
        </svg>
      </div>
      <div class="flex flex-col justify-center items-start p-4">
        <span>{{ trip.arrival_location }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.car-animate {
  position: relative;
  animation-name: moveCar;
  animation-duration: 10s;
  animation-iteration-count: infinite;
}

@keyframes moveCar {
  0% {
    left: 0;
  }
  100% {
    left: 90%;
  }
}
</style>
