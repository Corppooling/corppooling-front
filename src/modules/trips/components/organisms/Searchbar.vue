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
    class="bg-white w-full rounded-2xl shadow-md max-w-4xl overflow-hidden flex flex-col lg:flex-row text-xl"
  >
    <div>
      <span
        class="flex items-center h-full px-5 mx-6 lg:mx-0 block lg:w-fit border-b-2 lg:border-b-0 lg:border-r-2 border-black-light"
      >
        <font-awesome-icon
          class="text-content-base opacity-40"
          icon="fa-flag-checkered"
        />
        <InputText
          class="w-full"
          v-model="departureLocation"
          placeholder="Départ"
        />
      </span>
    </div>
    <div>
      <span
        class="flex items-center h-full px-5 mx-6 lg:mx-0 block lg:w-fit border-b-2 lg:border-b-0 lg:border-r-2 border-black-light"
      >
        <font-awesome-icon
          class="text-content-base opacity-40"
          icon="fa-map-marker-alt"
        />
        <InputText
          class="w-full"
          v-model="arrivalLocation"
          placeholder="Arrivée"
        />
      </span>
    </div>
    <div>
      <span class="flex items-center h-full px-5 mx-6 lg:mx-0 block lg:w-fit">
        <font-awesome-icon
          class="text-content-base opacity-40"
          icon="calendar"
        />
        <Calendar
          class="w-full lg:w-36"
          v-model="departureDate"
          dateFormat="dd/mm/yy"
          placeholder="Date"
          :min-date="new Date(Date.now())"
        />
      </span>
    </div>
    <div
      class="bg-content-light flex grow justify-center items-center cursor-pointer py-4 min-w-[200px]"
    >
      <span class="text-white text-base">Rechercher</span>
    </div>
  </div>
</template>

<style lang="scss">
.p-inputtext {
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
}
</style>
