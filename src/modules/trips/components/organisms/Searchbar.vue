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
    departureTime.value ? DateTime.fromJSDate(departureTime.value).toISO() ?? undefined : undefined
  );
  await router.push({
    name: 'trips',
    query: {
      departure: departureLocation.value?.trim() ? departureLocation.value?.trim() : undefined,
      arrival: arrivalLocation.value?.trim() ? arrivalLocation.value?.trim() : undefined,
      departure_time: departureTime.value
        ? DateTime.fromJSDate(departureTime.value).toISO()
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
    townsAutocomplete.value = await geoGouvAPI.getTowns(value.trim());
  }
});

watch(arrivalLocation, async (value) => {
  if (value?.trim()) {
    townsAutocomplete.value = await geoGouvAPI.getTowns(value.trim());
  }
});
</script>

<template>
  <div
    class="bg-white w-full rounded-2xl shadow-md max-w-4xl overflow-hidden flex flex-col lg:flex-row text-xl"
  >
    <div>
      <span
        class="flex items-center h-full px-5 mx-6 lg:mx-0 lg:w-fit border-b-2 lg:border-b-0 lg:border-r-2 border-black-light relative"
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
          @click="reverseLocations"
          class="absolute right-3 top-4 text-content-base opacity-60 hover:opacity-100 cursor-pointer rotate-90 lg:rotate-0"
          icon="arrow-right-arrow-left"
        />
      </span>
    </div>
    <div>
      <span
        class="flex items-center h-full px-5 mx-6 lg:mx-0 lg:w-fit border-b-2 lg:border-b-0 lg:border-r-2 border-black-light"
      >
        <FontAwesomeIcon
          :class="arrivalLocation?.trim() ? 'opacity-100' : 'opacity-40'"
          class="text-content-base"
          icon="fa-map-marker-alt"
        />
        <AutoComplete
          class="w-full"
          v-model="arrivalLocation"
          :suggestions="townsAutocomplete"
          :placeholder="$t('trip.filter.arrival')"
        />
      </span>
    </div>
    <div>
      <span class="flex items-center h-full px-5 mx-6 lg:mx-0 lg:w-fit">
        <FontAwesomeIcon
          :class="departureTime ? 'opacity-100' : 'opacity-40'"
          class="text-content-base"
          icon="calendar"
        />
        <Calendar
          class="w-full lg:w-48"
          v-model="departureTime"
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
      class="grow min-w-[200px] rounded-tr-none rounded-l-none bg-content-light"
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
