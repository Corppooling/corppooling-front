<script lang="ts" setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import Button from "@/components/molecules/Button.vue";
import { useTripStore } from "@/stores/trip";
import { useRoute, useRouter } from "vue-router";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const route = useRoute();
const router = useRouter();
const departureLocation = ref<string | undefined>(
  route.query["departure"] as string
);
const arrivalLocation = ref<string | undefined>(
  route.query["arrival"] as string
);
const departureTime = ref<Date | undefined>(
  route.query["departure_time"]
    ? new Date(route.query["departure_time"] as string)
    : undefined
);
const tripStore = useTripStore();
const loading = ref<boolean>(false);

const search = async (): Promise<void> => {
  loading.value = true;
  await tripStore.setTrips(
    departureLocation.value,
    arrivalLocation.value,
    departureTime.value
      ? DateTime.fromJSDate(departureTime.value).toISO()
      : undefined
  );
  await router.push({
    name: "trips",
    query: {
      departure: departureLocation.value,
      arrival: arrivalLocation.value,
      departure_time: departureTime.value
        ? DateTime.fromJSDate(departureTime.value).toISO()
        : undefined,
    },
  });
  loading.value = false;
};

const canReverseLocations = (): boolean => {
  return (
    (!!departureLocation.value?.trim() || !!arrivalLocation.value?.trim()) &&
    departureLocation.value !== arrivalLocation.value
  );
};

const reverseLocations = (): void => {
  const temp: string | undefined = departureLocation.value?.trim();
  departureLocation.value = arrivalLocation.value?.trim();
  arrivalLocation.value = temp;
};
</script>

<template>
  <div
    class="bg-white w-full rounded-2xl shadow-md max-w-4xl overflow-hidden flex flex-col lg:flex-row text-xl"
  >
    <div>
      <span
        class="flex items-center h-full px-5 mx-6 lg:mx-0 block lg:w-fit border-b-2 lg:border-b-0 lg:border-r-2 border-black-light relative"
      >
        <font-awesome-icon
          :class="departureLocation?.trim() ? 'opacity-100' : 'opacity-40'"
          class="text-content-base"
          icon="fa-flag-checkered"
        />
        <InputText
          class="w-full"
          v-model="departureLocation"
          placeholder="Départ"
        />
        <font-awesome-icon
          v-if="canReverseLocations()"
          @click="reverseLocations"
          class="absolute right-3 top-4 text-content-base opacity-60 hover:opacity-100 cursor-pointer rotate-90 lg:rotate-0"
          size="md"
          icon="arrow-right-arrow-left"
        />
      </span>
    </div>
    <div>
      <span
        class="flex items-center h-full px-5 mx-6 lg:mx-0 block lg:w-fit border-b-2 lg:border-b-0 lg:border-r-2 border-black-light"
      >
        <font-awesome-icon
          :class="arrivalLocation?.trim() ? 'opacity-100' : 'opacity-40'"
          class="text-content-base"
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
          :class="departureTime ? 'opacity-100' : 'opacity-40'"
          class="text-content-base"
          icon="calendar"
        />
        <Calendar
          class="w-full lg:w-48"
          v-model="departureTime"
          hourFormat="24"
          dateFormat="dd/mm/yy à"
          placeholder="Toutes les dates"
          :min-date="DateTime.now().toJSDate()"
          showTime
          showButtonBar
        />
      </span>
    </div>
    <Button
      :fn="search"
      :loading="loading"
      bg-color="content-light"
      class="grow min-w-[200px] rounded-tr-none rounded-l-none bg-content-light"
      :text="$t('header.search')"
    />
  </div>
</template>

<style lang="scss">
.p-inputtext {
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
}
</style>
