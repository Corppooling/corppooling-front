<script lang="ts" setup>
import { ref, watch } from 'vue';
import Calendar from 'primevue/calendar';
import AutoComplete from 'primevue/autocomplete';
import Button from '@/components/molecules/Button.vue';
import { useTripStore } from '@/stores/trip';
import { useRoute, useRouter } from 'vue-router';
import { DateTime } from 'luxon';
import { useGeoGouvAPI } from '@/composables/geoGouvAPI';

const route = useRoute();
const router = useRouter();
const geoGouvAPI = useGeoGouvAPI();
const departureLocation = ref<string | undefined>(route.query['departure'] as string);
const arrivalLocation = ref<string | undefined>(route.query['arrival'] as string);
const departureTime = ref<Date | undefined>(
  route.query['departure_time'] ? new Date(route.query['departure_time'] as string) : undefined
);
const tripStore = useTripStore();
const loading = ref<boolean>(false);
const townsAutocomplete = ref<Array<string>>([]);

const emit = defineEmits<{
  (e: 'closeModal', value: boolean): void;
}>();

const search = async (): Promise<void> => {
  loading.value = true;

  await tripStore.setTrips(
    departureLocation.value?.trim() ? departureLocation.value?.trim() : undefined,
    arrivalLocation.value?.trim() ? arrivalLocation.value?.trim() : undefined,
    departureTime.value
      ? DateTime.fromJSDate(departureTime.value as Date).toISO() ?? undefined
      : undefined
  );

  await router.push({
    name: 'trips',
    query: {
      departure: departureLocation.value?.trim() ? departureLocation.value?.trim() : undefined,
      arrival: arrivalLocation.value?.trim() ? arrivalLocation.value?.trim() : undefined,
      departure_time: departureTime.value
        ? DateTime.fromJSDate(departureTime.value as Date).toISO() ?? undefined
        : undefined,
    },
  });

  loading.value = false;
  emit('closeModal', false);
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

watch(departureLocation, async (value) => {
  if (value?.trim()) {
    townsAutocomplete.value = (await geoGouvAPI.getTowns(value?.trim())) as Array<string>;
  }
});

watch(arrivalLocation, async (value) => {
  if (value?.trim()) {
    townsAutocomplete.value = (await geoGouvAPI.getTowns(value?.trim())) as Array<string>;
  }
});
</script>

<template>
  <div
    class="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white text-xl shadow-md lg:flex-row"
  >
    <div>
      <span
        class="relative mx-6 flex h-full items-center border-b-2 border-black-light px-5 lg:mx-0 lg:w-fit lg:border-b-0 lg:border-r-2"
      >
        <FontAwesomeIcon
          :class="departureLocation?.trim() ? 'opacity-100' : 'opacity-40'"
          class="text-content-base"
          icon="fa-flag-checkered"
        />
        <AutoComplete
          v-model="departureLocation"
          :suggestions="townsAutocomplete"
          :placeholder="$t('trip.filter.departure')"
        />
        <FontAwesomeIcon
          v-if="canReverseLocations()"
          class="absolute right-3 top-4 rotate-90 cursor-pointer text-content-base opacity-60 hover:opacity-100 lg:rotate-0"
          icon="arrow-right-arrow-left"
          @click="reverseLocations"
        />
      </span>
    </div>
    <div>
      <span
        class="mx-6 flex h-full items-center border-b-2 border-black-light px-5 lg:mx-0 lg:w-fit lg:border-b-0 lg:border-r-2"
      >
        <FontAwesomeIcon
          :class="arrivalLocation?.trim() ? 'opacity-100' : 'opacity-40'"
          class="text-content-base"
          icon="fa-map-marker-alt"
        />
        <AutoComplete
          v-model="arrivalLocation"
          class="w-full"
          :suggestions="townsAutocomplete"
          :placeholder="$t('trip.filter.arrival')"
        />
      </span>
    </div>
    <div>
      <span class="mx-6 flex h-full items-center px-5 lg:mx-0 lg:w-fit">
        <FontAwesomeIcon
          :class="departureTime ? 'opacity-100' : 'opacity-40'"
          class="text-content-base"
          icon="calendar"
        />
        <Calendar
          v-model="departureTime"
          class="w-full lg:w-48"
          hourFormat="24"
          dateFormat="dd/mm/yy à"
          :placeholder="$t('trip.filter.departureTime')"
          :minDate="DateTime.now().toJSDate()"
          showTime
          showButtonBar
        />
      </span>
    </div>
    <Button
      :fn="search"
      :loading="loading"
      bgColor="content-light"
      class="min-w-[200px] grow rounded-l-none rounded-tr-none bg-content-light"
      :text="$t('header.search')"
    />
  </div>
</template>

<style lang="scss">
.p-autocomplete,
.p-autocomplete-input {
  width: 100% !important;
}

.p-autocomplete-panel {
  border-radius: 0 0 0.5rem 0.5rem;
}

.p-inputtext {
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
}
</style>
