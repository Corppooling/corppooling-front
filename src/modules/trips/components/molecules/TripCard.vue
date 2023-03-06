<script lang="ts" setup>
import { type Trip, TripType } from "@/interfaces/trip.interface";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { DateTime } from "luxon";
import { computed } from "vue";

const props = defineProps<{
  trip: Trip;
}>();

const bgTypeColor = computed((): string => {
  switch (props.trip.type) {
    case TripType.DRIVER:
      return "bg-main-base";
    case TripType.PASSENGER:
      return "bg-content-flight";
  }
  return "";
});
</script>

<template>
  <div
    class="flex flex-col p-1 rounded-2xl shadow-md hover:shadow-lg"
    :class="bgTypeColor"
  >
    <div class="w-full h-14 flex justify-between items-center justify-end px-4">
      <p
        v-html="
          props.trip.type === TripType.DRIVER
            ? 'Je recherche des <b>passagers</b>'
            : 'Je recherche un <b>conducteur</b>'
        "
      />
      <font-awesome-icon
        :icon="props.trip.type === TripType.DRIVER ? 'fa-car' : 'fa-thumbs-up'"
        size="2xl"
      />
    </div>
    <div class="bg-white flex-col p-6 rounded-2xl w-[350px]">
      <div class="flex justify-around">
        <div class="flex flex-col">
          <div class="py-1">
            <font-awesome-icon class="w-4" icon="fa-calendar" />
            <span class="ml-1">{{
              DateTime.fromISO(props.trip.departure_time).toLocaleString({
                month: "long",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            }}</span>
          </div>
          <div class="py-1">
            <font-awesome-icon class="w-4" icon="fa-map-marker-alt" />
            <span class="ml-1">{{ props.trip.departure_location }}</span>
          </div>
          <div class="py-1">
            <font-awesome-icon class="w-4" icon="fa-flag-checkered" />
            <span class="ml-1">{{ props.trip.arrival_location }}</span>
          </div>
          <div class="py-1">
            <font-awesome-icon class="w-4" icon="fa-users" />
            <span class="ml-1">{{ props.trip.available_seats }} passagers</span>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center ml-4">
          <div
            class="rounded-full w-16 h-16 overflow-hidden p-1 mb-2"
            :class="bgTypeColor"
          >
            <img
              class="w-full rounded-full"
              :src="props.trip.announcer.profile_image"
              alt=""
            />
          </div>
          <div>
            <span>
              {{ props.trip.announcer.firstName }}
              {{ props.trip.announcer.lastName }}
            </span>
          </div>
        </div>
      </div>
      <div class="pt-6">
        <div
          class="bg-content-base text-white flex items-center w-fit mx-auto rounded-2xl py-2 px-10 cursor-pointer hover:drop-shadow-md"
        >
          <span class="mr-2">Rejoindre</span>
          <font-awesome-icon icon="fa-location-arrow" class="rotate-45" />
        </div>
      </div>
    </div>
  </div>
</template>
