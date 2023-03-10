<script lang="ts" setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";

const departureLocation = ref<string>("");
const arrivalLocation = ref<string>("");
const departureDate = ref<Date | null>(null);
</script>

<template>
  <div
    class="bg-white w-full rounded-2xl shadow-md max-w-4xl overflow-hidden flex text-xl"
  >
    <div>
      <span class="px-5 py-1 border-r-2 border-black-light">
        <font-awesome-icon
          class="text-content-base opacity-40"
          icon="fa-flag-checkered"
        />
        <InputText v-model="departureLocation" placeholder="Départ" />
      </span>
    </div>
    <div>
      <span class="px-5 py-1 border-r-2 border-black-light">
        <font-awesome-icon
          class="text-content-base opacity-40"
          icon="fa-map-marker-alt"
        />
        <InputText v-model="arrivalLocation" placeholder="Arrivée" />
      </span>
    </div>
    <div>
      <span class="px-5 py-1 border-r-2 border-black-light">
        <font-awesome-icon
          class="text-content-base opacity-40"
          icon="calendar"
        />
        <Calendar
          v-model="departureDate"
          dateFormat="DD/mm/yy"
          placeholder="Aujourd'hui"
          [locale]="calendar_fr"
        />
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.p-inputtext {
  border: none !important;
}
</style>
