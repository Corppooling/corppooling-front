<script lang="ts" setup>
import { ref } from "vue";
import Title from "@/components/atoms/Title.vue";
import { type Trip, TripType } from "@/interfaces/trip.interface";
import type { User } from "@/interfaces/user.interface";
import TripCard from "@/modules/trips/components/molecules/TripCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { type SwiperOptions, Navigation } from "swiper";
import "swiper/css/effect-cards";
import "swiper/css";
import "swiper/css/navigation";

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
    departure_time: "2023-03-10T10:00:00",
    announcer: user,
    available_seats: 1,
    type: TripType.DRIVER,
  },
  {
    id: 2,
    departure_location: "Lyon",
    arrival_location: "Nice",
    departure_time: "2023-03-12T14:30:00",
    announcer: user,
    available_seats: 3,
    type: TripType.PASSENGER,
  },
  {
    id: 3,
    departure_location: "Paris",
    arrival_location: "Marseille",
    departure_time: "2023-03-10T10:00:00",
    announcer: user,
    available_seats: 1,
    type: TripType.DRIVER,
  },
  {
    id: 4,
    departure_location: "Lyon",
    arrival_location: "Nice",
    departure_time: "2023-03-12T14:30:00",
    announcer: user,
    available_seats: 3,
    type: TripType.PASSENGER,
  },
  {
    id: 5,
    departure_location: "Paris",
    arrival_location: "Marseille",
    departure_time: "2023-03-10T10:00:00",
    announcer: user,
    available_seats: 1,
    type: TripType.DRIVER,
  },
  {
    id: 6,
    departure_location: "Lyon",
    arrival_location: "Nice",
    departure_time: "2023-03-12T14:30:00",
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
  <div>
    <section class="w-full h-80 bg-content-flight">
      <div
        class="w-5/6 h-full mx-auto flex justify-center items-center flex flex-col"
      >
        <h1
          class="text-content-base text-5xl sm:text-6xl text-center mb-16 font-medium"
        >
          {{ $t("home.find") }}
        </h1>
        <div class="bg-white w-full h-14 rounded-2xl shadow-md max-w-4xl"></div>
      </div>
    </section>
    <section class="py-8 px-6 md:px-12">
      <Title logoColor="base" :content="$t('home.popularTrips')" />
      <Swiper
        class="w-full"
        :options="swiperOptions"
        :modules="swiperOptions.modules"
        :navigation="swiperOptions.navigation"
        :breakpoints="swiperOptions.breakpoints"
      >
        <SwiperSlide
          class="my-8 mx-auto sm:mx-0 max-w-full flex justify-center sm:max-w-fit"
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
      <Title logoColor="base" :content="$t('home.howTo')" />
    </section>
  </div>
</template>
