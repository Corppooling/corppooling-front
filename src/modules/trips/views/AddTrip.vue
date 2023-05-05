<script lang="ts" setup>
import { ref, watch } from 'vue';
import AutoComplete from 'primevue/autocomplete';
import Button from '@/components/molecules/Button.vue';
import { DateTime } from 'luxon';
import Calendar from 'primevue/calendar';
import { useGeoGouvAPI } from '@/composables/geoGouvAPI';

const geoGouvAPI = useGeoGouvAPI();
const townsAutocomplete = ref<Array<string>>([]);
const step = ref<number>(1);
const stepLoading = ref<boolean>(false);

const departureLocation = ref<string>('');
const arrivalLocation = ref<string>('');
const departureTime = ref<Date | undefined>(undefined);

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

const conditions: Array<() => boolean> = [
  () => !!departureLocation.value?.trim(),
  () => !!arrivalLocation.value?.trim(),
];

const checkStep = (): void => {
  stepLoading.value = true;

  setTimeout(() => {
    for (let i = 1; i <= conditions.length; i++) {
      if (conditions[i - 1]()) {
        step.value = i + 1;
      } else {
        step.value = i;
        break;
      }
    }

    stepLoading.value = false;
  }, 400);
};
</script>

<template>
  <div class="px-4 pt-12 max-w-screen-md mx-auto w-full">
    <h1 class="text-4xl text-center font-bold mb-16">Nouveau trajet</h1>
    <form class="flex flex-col gap-10">
      <div v-if="step >= 1">
        <h2 class="text-2xl mb-6">D’où partez-vous ?</h2>
        <div>
          <span class="flex items-center h-full px-5 border-b-2 border-black-light relative">
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
          </span>
        </div>
      </div>
      <div v-if="step >= 2">
        <h2 class="text-2xl mb-6">Où allez-vous ?</h2>
        <div>
          <span class="flex items-center h-full px-5 border-b-2 border-black-light relative">
            <FontAwesomeIcon
              :class="arrivalLocation?.trim() ? 'opacity-100' : 'opacity-40'"
              class="text-content-base"
              icon="fa-map-marker-alt"
            />
            <AutoComplete
              v-model="arrivalLocation"
              :suggestions="townsAutocomplete"
              :placeholder="$t('trip.filter.arrival')"
            />
          </span>
        </div>
      </div>
      <div v-if="step >= 3">
        <h2 class="text-2xl mb-6">Quand partez-vous ?</h2>
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
      </div>
      <Button
        :disabled="!departureLocation?.trim() || !arrivalLocation?.trim()"
        @click="checkStep"
        :loading="stepLoading"
        bgColor="content-light"
        class="w-fit px-20 mx-auto"
        text="Valider"
      />
    </form>
  </div>
</template>
