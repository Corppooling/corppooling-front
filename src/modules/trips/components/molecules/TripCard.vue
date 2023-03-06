<script lang="ts" setup>
import type { Trip } from "@/interfaces/trip.interface";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { DateTime } from "luxon";

const props = defineProps<{
  trip: Trip;
}>();
</script>

<template>
  <div class="bg-content-xlight">
    <div class="bg-white flex">
      <div class="flex flex-col">
        <div>
          <font-awesome-icon icon="fa-calendar" />
          <span class="ml-1">{{
            DateTime.fromISO(props.trip.departure_time).toLocaleString({
              month: "long",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
          }}</span>
        </div>
        <div>
          <font-awesome-icon icon="fa-map-marker-alt" />
          <span class="ml-1">{{ props.trip.departure_location }}</span>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>
