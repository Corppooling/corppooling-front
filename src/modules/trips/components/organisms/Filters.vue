<script lang="ts" setup>
import { ref, watch } from 'vue';
import RadioButton from 'primevue/radiobutton';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useTripStore } from '@/stores/trip';
import { useRoute } from 'vue-router';
import { TripType } from '@/interfaces/trip.interface';
import { useToast } from '@/composables/toast';
import { i18nGlobal } from '@/support/i18n';

const { t } = i18nGlobal;
const tripStore = useTripStore();
const route = useRoute();
const toast = useToast();
const sorts = ref<Record<string, string>>({
  orderSort: 'order[departure_time]=asc',
  typeSort: '',
});
const displayFilters = ref<boolean>(window.innerWidth > 1024);

watch(
  sorts,
  () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
    tripStore.setExtraSorts([sorts.value.orderSort, sorts.value.typeSort]);
    tripStore.setTrips(
      route.query['departure'] as string,
      route.query['arrival'] as string,
      route.query['departure_time'] as string
    );
  },
  { deep: true }
);

const resetFilters = (): void => {
  sorts.value.orderSort = 'order[departure_time]=asc';
  sorts.value.typeSort = '';
  tripStore.resetExtraSorts();
  toast.info(t('trip.filter.reset'));
};

window.addEventListener('resize', (): void => {
  displayFilters.value = window.innerWidth > 1024;
});
</script>

<template>
  <Transition name="bounce">
    <div
      v-if="displayFilters"
      class="sticky top-32 z-10 mb-10 flex h-fit max-h-fit flex-col rounded-2xl bg-white p-4 shadow-md ring-1 ring-content-flight md:min-w-[350px]"
    >
      <div class="flex items-center justify-between">
        <h3 class="text-xl">{{ $t('trip.filter.filterBy') }}</h3>
        <div class="flex items-center">
          <span class="cursor-pointer p-2" @click="resetFilters">
            <FontAwesomeIcon
              size="lg"
              icon="trash-can"
              class="text-content-base opacity-40 hover:opacity-100"
            />
          </span>
          <FontAwesomeIcon
            size="xl"
            icon="times"
            class="ml-6 cursor-pointer p-2 lg:hidden"
            @click="displayFilters = false"
          />
        </div>
      </div>
      <div class="mt-4 flex flex-col">
        <div class="flex items-center p-2">
          <RadioButton
            v-model="sorts.orderSort"
            inputId="departureTimeASC"
            name="orderSort"
            value="order[departure_time]=asc"
          />
          <label for="departureTimeASC" class="ml-2 cursor-pointer">
            {{ $t('trip.filter.departureTimeASC') }}
          </label>
        </div>
        <div class="flex items-center p-2">
          <RadioButton
            v-model="sorts.orderSort"
            inputId="departureTimeDESC"
            name="orderSort"
            value="order[departure_time]=desc"
          />
          <label for="departureTimeDESC" class="ml-2 cursor-pointer">
            {{ $t('trip.filter.departureTimeDESC') }}
          </label>
        </div>
        <div class="flex items-center p-2">
          <RadioButton
            v-model="sorts.orderSort"
            inputId="priceASC"
            name="orderSort"
            value="order[price]=asc"
          />
          <label for="priceASC" class="ml-2 cursor-pointer">
            {{ $t('trip.filter.priceASC') }}
          </label>
        </div>
      </div>
      <hr class="my-4 border-b-2 opacity-10" />
      <h3 class="text-xl">{{ $t('trip.filter.iAm') }}</h3>
      <div class="mt-4 flex flex-col">
        <div class="flex items-center p-2">
          <RadioButton
            v-model="sorts.typeSort"
            inputId="typeSortPassenger"
            name="typeSort"
            :value="`type=${TripType.PASSENGER}`"
          />
          <label for="typeSortPassenger" class="ml-2 cursor-pointer">
            {{ $t('trip.filter.driver') }}
          </label>
        </div>
        <div class="flex items-center p-2">
          <RadioButton
            v-model="sorts.typeSort"
            inputId="typeSortDriver"
            name="typeSort"
            :value="`type=${TripType.DRIVER}`"
          />
          <label for="typeSortDriver" class="ml-2 cursor-pointer">
            {{ $t('trip.filter.passenger') }}
          </label>
        </div>
      </div>
    </div>
  </Transition>
  <Transition name="bounce">
    <div
      v-if="!displayFilters"
      class="sticky top-32 z-10 mb-10 ml-auto flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white drop-shadow-md"
      @click="displayFilters = true"
    >
      <FontAwesomeIcon size="lg" icon="filter" class="text-content-base" />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-out 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
