<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Title from "@/components/atoms/Title.vue";
import TripCard from "@/modules/trips/components/molecules/TripCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { type SwiperOptions, Navigation } from "swiper";
import "swiper/css/effect-cards";
import "swiper/css";
import "swiper/css/navigation";
import { useTripStore } from "@/stores/trip";
import type { Trip } from "@/interfaces/trip.interface";

const tripStore = useTripStore();
const trips = ref<Array<Trip>>([]);

onMounted(async () => {
  await tripStore.setLatestTrips();
  trips.value = tripStore.lastTrips;
});

const swiperOptions = ref<SwiperOptions>({
  modules: [Navigation],
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  allowTouchMove: true,
  observer: true,
  observeParents: true,
  breakpoints: {
    0: {
      slidesPerView: "auto",
      spaceBetween: 26,
    },
  },
});
</script>

<template>
  <div>
    <Title
      v-if="trips.length > 0"
      logoColor="base"
      :content="$t('home.popularTrips')"
    />
    <Swiper
      class="w-full"
      :options="swiperOptions"
      :modules="swiperOptions.modules"
      :navigation="swiperOptions.navigation"
      :breakpoints="swiperOptions.breakpoints"
    >
      <SwiperSlide
        class="my-10 mx-auto sm:mx-0 max-w-full flex justify-center sm:max-w-fit"
        v-for="trip in trips"
        :key="trip.id"
      >
        <TripCard :trip="trip" />
      </SwiperSlide>
      <div>
        <div
          class="swiper-button-prev shadow-md rounded-full w-10 h-10 bg-white flex justify-center items-center after:content-none"
        >
          <font-awesome-icon
            icon="fa-chevron-left"
            size="xl"
            class="text-content-base"
          />
        </div>
        <div
          class="swiper-button-next shadow-md rounded-full w-10 h-10 bg-white flex justify-center items-center after:content-none"
        >
          <font-awesome-icon
            icon="fa-chevron-right"
            size="xl"
            class="text-content-base"
          />
        </div>
      </div>
    </Swiper>
  </div>
</template>
