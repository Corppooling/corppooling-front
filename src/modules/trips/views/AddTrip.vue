<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import AutoComplete from 'primevue/autocomplete';
import Button from '@/components/molecules/Button.vue';
import { DateTime } from 'luxon';
import Calendar from 'primevue/calendar';
import RadioButton from 'primevue/radiobutton';
import Textarea from 'primevue/textarea';
import { useGeoGouvAPI } from '@/composables/geoGouvAPI';
import { TripType } from '@/interfaces/trip.interface';

const geoGouvAPI = useGeoGouvAPI();
const townsAutocomplete = ref<Array<string>>([]);
const step = ref<number>(1);
const stepLoading = ref<boolean>(false);

const departureLocation = ref<string>('test');
const arrivalLocation = ref<string>('test');
const departureTime = ref<Date>(DateTime.now().toJSDate());
const type = ref<TripType>(TripType.PASSENGER);
const message = ref<string>('');
const availableSeats = ref<number>(0);

onMounted(() => {
  checkStep();
});

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

const commonConditions: Array<() => boolean> = [
  () => !!departureLocation.value?.trim(),
  () => !!arrivalLocation.value?.trim(),
  () => !!departureTime.value,
  () => !!type.value,
  () => true,
];
const driverConditions: Array<() => boolean> = [() => availableSeats.value >= 1];
const conditions: Array<() => boolean> = [...commonConditions, ...driverConditions];

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

const formCanBeSend = computed<boolean>(() => {
  if (type.value === TripType.PASSENGER) {
    return commonConditions.every((condition) => condition());
  }

  return conditions.every((condition) => condition());
});

const buttonText = computed<string>(() => {
  return formCanBeSend.value ? 'Publier' : 'Suivant';
});
</script>

<template>
  <div class="px-4 pt-12 max-w-screen-md mx-auto w-full">
    <h1 class="text-4xl text-center font-bold mb-16">Nouveau trajet</h1>
    <form class="flex flex-col gap-10">
      <div v-if="step >= 1">
        <h3 class="text-2xl mb-6">D’où partez-vous ?</h3>
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
        <h3 class="text-2xl mb-6">Où allez-vous ?</h3>
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
        <h3 class="text-2xl mb-6">Quand partez-vous ?</h3>
        <div>
          <span class="flex items-center h-full px-5 border-b-2 border-black-light relative">
            <FontAwesomeIcon
              :class="departureTime ? 'opacity-100' : 'opacity-40'"
              class="text-content-base"
              icon="calendar"
            />
            <Calendar
              class="w-full"
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
      <div v-if="step >= 4">
        <h3 class="text-2xl mb-6">Êtes-vous vous conducteur ou passager ?</h3>
        <div>
          <div class="flex items-center mb-4">
            <RadioButton v-model="type" inputId="driver" name="driver" :value="TripType.DRIVER" />
            <label for="driver" class="ml-2 cursor-pointer">Conducteur</label>
          </div>
          <div class="flex items-center">
            <RadioButton
              v-model="type"
              inputId="passenger"
              name="passenger"
              :value="TripType.PASSENGER"
            />
            <label for="passenger" class="ml-2 cursor-pointer">Passager</label>
          </div>
        </div>
      </div>
      <div v-if="step >= 5">
        <h3 class="text-2xl mb-6">Un message à transmettre ?</h3>
        <div class="border-2 border-black-light">
          <Textarea class="w-full" rows="4" v-model="message" placeholder="Votre message" />
        </div>
      </div>
      <Button
        :fn="checkStep"
        :loading="stepLoading"
        bgColor="content-light"
        class="w-fit px-20 mx-auto"
        :text="buttonText"
      />
    </form>
  </div>
</template>
