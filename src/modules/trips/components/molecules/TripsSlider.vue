<script lang="ts" setup>
import { ref } from "vue";
import TripCard from "@/modules/trips/components/molecules/TripCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { type SwiperOptions, Navigation } from "swiper";
import "swiper/css/effect-cards";
import "swiper/css";
import "swiper/css/navigation";
import type { User } from "@/interfaces/user.interface";
import { type Trip, TripType } from "@/interfaces/trip.interface";

const user: User = {
  id: 1,
  firstName: "Maxime",
  lastName: "Didier",
  email: "maxime.didier@aol.com",
  profile_image:
    "https://media.licdn.com/dms/image/C4E03AQFChS5oChTUeg/profile-displayphoto-shrink_400_400/0/1634940221677?e=1683763200&v=beta&t=l8TB14fChpB1l2Pr6ZcdmAlwR5UB2Ugj4IjihKMNUxQ",
};

const trips: Array<Trip> = [
  {
    id: 1,
    departure_location: "Paris",
    arrival_location: "Marseille",
    departure_date: "2023-03-10T10:00:00",
    announcer: user,
    available_seats: 1,
    type: TripType.DRIVER,
  },
  {
    id: 2,
    departure_location: "Lyon",
    arrival_location: "Nice",
    departure_date: "2023-03-12T14:30:00",
    announcer: user,
    available_seats: 3,
    type: TripType.PASSENGER,
  },
  {
    id: 3,
    departure_location: "Paris",
    arrival_location: "Marseille",
    departure_date: "2023-03-10T10:00:00",
    announcer: user,
    available_seats: 1,
    type: TripType.DRIVER,
  },
  {
    id: 4,
    departure_location: "Lyon",
    arrival_location: "Nice",
    departure_date: "2023-03-12T14:30:00",
    announcer: user,
    available_seats: 3,
    type: TripType.PASSENGER,
  },
  {
    id: 5,
    departure_location: "Paris",
    arrival_location: "Marseille",
    departure_date: "2023-03-10T10:00:00",
    announcer: user,
    available_seats: 1,
    type: TripType.DRIVER,
  },
  {
    id: 6,
    departure_location: "Lyon",
    arrival_location: "Nice",
    departure_date: "2023-03-12T14:30:00",
    announcer: user,
    available_seats: 3,
    type: TripType.PASSENGER,
  },
];

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
</template>
