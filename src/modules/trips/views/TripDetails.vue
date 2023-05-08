<script lang="ts" setup>
import { useTripStore } from '@/stores/trip';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import type { Trip } from '@/interfaces/trip.interface';
import { TripType } from '@/interfaces/trip.interface';
import { dateFormatedOnlyHours, dateFormatedShort } from '@/support/luxon';
import { useWindowSize } from '@vueuse/core';
import ProfileImage from '@/modules/trips/components/atoms/ProfileImage.vue';
import Button from '@/components/molecules/Button.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { formatPrice } from '@/support/format';
import { bgTypeColor } from '@/composables/typeColor';
import Spinner from '@/components/atoms/Spinner.vue';
import ContactModal from '@/modules/trips/components/organisms/ContactModal.vue';

const { width } = useWindowSize();
const route = useRoute();
const tripStore = useTripStore();
const trip = ref<Trip | undefined>();
const displayContactModal = ref<boolean>(false);

const lineLength = computed((): number => (width.value <= 768 ? width.value - 100 : 450));

onMounted(async () => {
  await tripStore.setTrip(route.params.id as string);
  trip.value = tripStore.getTrip;
});
</script>

<template>
  <template v-if="!tripStore.requestLoading">
    <div class="p-4 max-w-screen-lg mx-auto">
      <div class="flex flex-wrap justify-between items-center py-10">
        <h1 v-if="trip" class="capitalize text-4xl mr-4 my-2">
          {{ dateFormatedShort(trip?.departure_time) }}
        </h1>
        <div class="flex items-center py-2 px-4 rounded-md my-2" :class="bgTypeColor(trip?.type)">
          <p
            v-html="
              trip?.type === TripType.DRIVER ? $t('trip.searchPassengers') : $t('trip.searchDriver')
            "
          />
          <FontAwesomeIcon
            :icon="trip?.type === TripType.DRIVER ? 'fa-car' : 'fa-thumbs-up'"
            class="ml-3"
            size="2xl"
          />
        </div>
      </div>
      <div class="flex justify-center flex-col md:flex-row md:my-10">
        <div class="flex flex-col md:justify-center md:items-end py-4 md:p-4">
          <span class="font-bold text-lg">{{ trip?.departure_location }}</span>
          <span v-if="trip">
            {{ dateFormatedOnlyHours(trip?.departure_time) }}
          </span>
        </div>
        <div class="mx-auto md:mx-0">
          <img
            class="hidden md:block relative top-4 w-10 car-animate ml-8"
            src="@/assets/images/logos/logo_content.svg"
            alt=""
          />
          <svg :width="lineLength + 30" height="30">
            <circle cx="20" cy="15" r="10" stroke="#F6B26B" stroke-width="2" fill="none" />
            <line x1="30" y1="15" y2="15" :x2="lineLength" stroke="#F6B26B" stroke-width="2" />
            <circle
              :cx="lineLength + 10"
              cy="15"
              r="10"
              stroke="#F6B26B"
              stroke-width="2"
              fill="none"
            />
          </svg>
        </div>
        <div class="flex flex-col items-end md:justify-center md:items-start py-4 md:p-4">
          <span class="font-bold text-lg">{{ trip?.arrival_location }}</span>
        </div>
      </div>
      <hr class="opacity-25" />
      <div v-if="trip?.type === TripType.DRIVER && trip.price">
        <div class="flex justify-between my-4 p-4">
          <p>{{ $t('trip.price') }}</p>
          <span class="font-bold text-xl">
            {{ formatPrice(trip?.price) }}
          </span>
        </div>
        <hr class="opacity-25" />
      </div>
      <div v-if="trip?.message" class="p-4 my-4">
        <p class="text-justify">{{ trip?.message }}</p>
      </div>
      <RouterLink
        to=""
        class="flex justify-between items-center p-4 rounded hover:bg-content-flight hover:bg-opacity-25"
      >
        <div class="flex flex-col">
          <span class="font-bold text-md">
            {{ `${trip?.announcer.firstname} ${trip?.announcer.lastname}` }}
          </span>
          <span class="text-sm mt-1">{{ trip?.company.name }}</span>
          <span class="text-xs opacity-40">
            {{ trip?.announcer.department.name }}
          </span>
        </div>
        <div class="flex items-center justify-center">
          <ProfileImage v-if="trip" :trip="trip" />
          <FontAwesomeIcon class="ml-4" icon="chevron-right" />
        </div>
      </RouterLink>
      <div
        @click="displayContactModal = true"
        class="flex items-center p-4 mb-4 rounded hover:bg-content-flight hover:bg-opacity-25 cursor-pointer"
      >
        <FontAwesomeIcon class="mr-4 text-xl" icon="fa-regular fa-comments" />
        <span>
          {{ $t('trip.contact', { name: trip?.announcer.firstname }) }}
        </span>
      </div>
      <hr class="opacity-25" />
      <div v-if="trip?.type === TripType.DRIVER && trip.car_model">
        <div class="p-4 mt-4">
          <p class="text-md">
            {{ $t('trip.availableSeats', { count: trip?.available_seats }) }}
          </p>
        </div>
        <div class="p-4 mb-4 flex items-center">
          <FontAwesomeIcon class="mr-4 text-xl" icon="fa-car-side" />
          <div class="flex flex-col">
            <span class="text-lg font-bold">{{ trip?.car_model }}</span>
            <span class="opacity-40">{{ trip?.car_color }}</span>
          </div>
        </div>
        <hr class="opacity-25" />
      </div>
      <div class="mt-8 mb-16">
        <Button
          :text="$t('trip.joinThisTrip')"
          class="md:w-1/2 mx-auto"
          bgColor="content-light"
          iconPosition="right"
        />
      </div>
    </div>
  </template>
  <template v-else>
    <div class="h-screen flex justify-center items-center">
      <Spinner :size="8" color="content-base" />
    </div>
  </template>
  <ContactModal
    :isOpen="displayContactModal"
    @update:isOpen="(value) => (displayContactModal = value)"
  />
</template>

<style lang="scss" scoped>
.car-animate {
  position: relative;
  animation-name: moveCar;
  animation-duration: 6s;
  animation-iteration-count: infinite;
}

@keyframes moveCar {
  0% {
    left: 0;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    left: 79%;
    opacity: 0;
  }
}
</style>
