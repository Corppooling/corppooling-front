<script lang="ts" setup>
import { useTripStore } from "@/stores/trip";
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import type { Trip } from "@/interfaces/trip.interface";
import { dateFormatedOnlyHours, dateFormatedShort } from "@/support/luxon";
import { useWindowSize } from "@vueuse/core";
import ProfileImage from "@/modules/trips/components/atoms/ProfileImage.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const { width } = useWindowSize();

const route = useRoute();
const tripStore = useTripStore();
const trip = ref<Trip | undefined>();
const lineLength = computed((): number =>
  width.value <= 768 ? width.value - 100 : 450
);

onMounted(async () => {
  await tripStore.setTrip(route.params.id as string);
  trip.value = tripStore.getTrip;
});
</script>

<template>
  <div class="max-w-screen-2xl mx-auto">
    <h1 v-if="trip" class="capitalize text-center p-10 text-4xl">
      {{ dateFormatedShort(trip?.departure_time) }}
    </h1>
    <div class="flex flex-col md:flex-row my-10">
      <div class="flex flex-col md:justify-center md:items-end py-4 md:p-4">
        <span class="font-bold text-lg">{{ trip?.departure_location }}</span>
        <span v-if="trip">
          {{ dateFormatedOnlyHours(trip?.departure_time) }}
        </span>
      </div>
      <div class="mx-auto">
        <img
          class="hidden md:block relative top-4 w-10 car-animate ml-8"
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
      <div
        class="flex flex-col items-end md:justify-center md:items-start py-4 md:p-4"
      >
        <span class="font-bold text-lg">{{ trip?.arrival_location }}</span>
      </div>
    </div>
    <hr class="opacity-25" />
    <RouterLink
      to=""
      class="flex justify-between my-4 items-center p-4 rounded hover:bg-content-flight hover:bg-opacity-25"
    >
      <div class="flex flex-col">
        <span class="font-bold text-md">
          {{ `${trip?.announcer.firstname} ${trip?.announcer.lastname}` }}
        </span>
        <span class="text-sm">
          {{ trip?.announcer.department.name }}
        </span>
      </div>
      <div class="flex items-center justify-center">
        <ProfileImage v-if="trip" :trip="trip" />
        <font-awesome-icon class="ml-4" icon="chevron-right" />
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.car-animate {
  position: relative;
  animation-name: moveCar;
  animation-duration: 6s;
  animation-iteration-count: infinite;
}

@keyframes moveCar {
  0% {
    left: 0;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    left: 79%;
    opacity: 0;
  }
}
</style>
