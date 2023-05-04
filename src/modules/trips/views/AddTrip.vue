<script lang="ts" setup>
import { ref, watch } from 'vue';
import AutoComplete from 'primevue/autocomplete';
import { useDebounceFn } from '@vueuse/core';
import Button from '@/components/molecules/Button.vue';
import axios, { type AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import Calendar from 'primevue/calendar';

const townsAutocomplete = ref<Array<string>>([]);
const step = ref<number>(1);
const stepLoading = ref<boolean>(false);

const departureLocation = ref<string>('');
const arrivalLocation = ref<string>('');
const departureTime = ref<Date | undefined>(undefined);

const getTowns = useDebounceFn(async (town: string) => {
  await axios
    .get(`https://geo.api.gouv.fr/communes?nom=${town}&fields=nom,code&limit=4&boost=population`)
    .then((res: AxiosResponse<Array<Record<string, string>>>) => {
      townsAutocomplete.value = res.data.map((town: any) => town.nom);
    });
}, 500);

watch(departureLocation, (value) => {
  if (value?.trim()) {
    getTowns(value.trim());
  }
});

watch(arrivalLocation, (value) => {
  if (value?.trim()) {
    getTowns(value.trim());
  }
});

const checkStep = (): void => {
  stepLoading.value = true;

  setTimeout(() => {
    step.value = 1;

    if (departureLocation.value?.trim()) {
      step.value = 2;

      if (arrivalLocation.value?.trim()) {
        step.value = 3;
      }
    }

    stepLoading.value = false;
  }, 500);
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
            <FontAwesomeIcon class="text-content-base" icon="fa-flag-checkered" />
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
            <FontAwesomeIcon class="text-content-base" icon="fa-flag-checkered" />
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
        class="w-fit px-20 mx-auto"
        text="Valider"
      />
    </form>
  </div>
</template>
