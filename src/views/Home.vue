<script lang="ts" setup>
import Title from "@/components/atoms/Title.vue";
import { type Trip, TripType } from "@/interfaces/trip.interface";
import type { User } from "@/interfaces/user.interface";
import TripCard from "@/modules/trips/components/molecules/TripCard.vue";

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
];
</script>

<template>
  <div>
    <section class="w-full h-80 bg-content-flight">
      <div
        class="w-5/6 h-full mx-auto flex justify-center items-center flex flex-col"
      >
        <h1
          class="text-content-base text-5xl md:text-6xl text-center mb-16 font-medium"
        >
          {{ $t("home.find") }}
        </h1>
        <div class="bg-white w-full h-14 rounded-2xl shadow-md max-w-4xl"></div>
      </div>
    </section>
    <section class="p-14">
      <Title class="mt-8" logoColor="base" :content="$t('home.popularTrips')" />
      <div class="flex gap-6 mt-10 mb-24">
        <template v-for="trip in trips" :key="trip.id">
          <TripCard :trip="trip" />
        </template>
      </div>
      <Title class="mt-8" logoColor="base" :content="$t('home.howTo')" />
    </section>
  </div>
</template>
