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
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.linkedin.com%2Fin%2Fmaxime-didier-8b25751ba&psig=AOvVaw0IJelvHtNEhLdPF0unLVh6&ust=1678189002082000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJCskK-bx_0CFQAAAAAdAAAAABAE",
};

const trips: Array<Trip> = [
  {
    id: 1,
    departure_location: "Paris",
    arrival_location: "Marseille",
    departure_time: "2023-03-10T10:00:00",
    announcer: user,
    available_seats: 2,
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
          Trouvez votre trajet
        </h1>
        <div class="bg-white w-full h-14 rounded-2xl shadow-md max-w-4xl"></div>
      </div>
    </section>
    <section class="p-14">
      <Title class="mt-8" logoColor="base" content="Trajets à la une !" />
      <div class="flex">
        <template v-for="trip in trips" :key="trip.id">
          <TripCard :trip="trip" />
        </template>
      </div>
      <Title class="mt-8" logoColor="base" content="Comment ça marche ?" />
    </section>
  </div>
</template>
