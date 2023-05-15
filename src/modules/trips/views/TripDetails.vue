<script lang="ts" setup>
import { useTripStore } from '@/stores/trip';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import type { Trip } from '@/interfaces/trip.interface';
import { TripType } from '@/interfaces/trip.interface';
import { dateFormatedOnlyHours, dateFormatedShort } from '@/support/luxon';
import { useWindowSize } from '@vueuse/core';
import Button from '@/components/molecules/Button.vue';
import { formatPrice } from '@/support/format';
import { bgTypeColor } from '@/composables/typeColor';
import Spinner from '@/components/atoms/Spinner.vue';
import ContactModal from '@/modules/trips/components/organisms/ContactModal.vue';
import { useUserStore } from '@/stores/user';
import { useConfirm } from 'primevue/useconfirm';
import axiosClient from '@/support/axiosClient';
import { useToast } from '@/composables/toast';
import { User } from '@/interfaces/user.interface';
import TripUser from '@/modules/trips/components/molecules/TripUser.vue';
import { i18nGlobal } from '@/support/i18n';

const confirm = useConfirm();
const userStore = useUserStore();
const router = useRouter();
const { width } = useWindowSize();
const route = useRoute();
const tripStore = useTripStore();
const toast = useToast();
const { t } = i18nGlobal;
const trip = ref<Trip>();
const user = ref<User | null>(userStore.user);
const displayContactModal = ref<boolean>(false);
const joinLoading = ref<boolean>(false);

const lineLength = computed<number>(() => (width.value <= 768 ? width.value - 100 : 450));
const readySeats = computed<number>(() => {
  if (trip.value?.type === TripType.DRIVER && trip.value?.available_seats !== null) {
    return trip.value?.available_seats - trip.value?.members?.length;
  }
  return 0;
});

onMounted(async () => {
  await tripStore.setTrip(route.params.id as string);
  trip.value = tripStore.getTrip;
});

const canJoin = computed<boolean>(() => {
  if (trip.value?.members?.find((u) => u.id === user.value?.id)) return false;
  if (trip.value?.announcer.id === user.value?.id) return false;
  if (
    typeof trip.value !== 'undefined' &&
    trip.value?.type === TripType.DRIVER &&
    trip.value?.available_seats !== null &&
    readySeats.value <= 0
  ) {
    return false;
  }
  return true;
});

const joinTrip = async (el: HTMLElement) => {
  confirm.require({
    target: el,
    header: t('action.confirm'),
    message: t('trip.confirmBooking'),
    icon: 'pi pi-car',
    position: 'center',
    acceptLabel: t('action.yes'),
    rejectLabel: t('action.no'),
    accept: async () => {
      joinLoading.value = true;
      await axiosClient
        .post(`/api/reservations`, {
          userId: user.value?.id,
          tripId: trip.value?.id,
        })
        .then(() => {
          router.push({ name: 'account.bookings' });
          toast.success(t('trip.bookingRegistered'));
        })
        .catch(() => {
          toast.error();
        });
      joinLoading.value = false;
    },
  });
};
</script>

<template>
  <template v-if="!tripStore.requestLoading">
    <div class="mx-auto max-w-screen-md p-4">
      <div class="flex flex-wrap items-center justify-between py-10">
        <h1 v-if="trip" class="my-2 mr-4 text-4xl capitalize">
          {{ dateFormatedShort(trip?.departure_time) }}
        </h1>
        <div class="my-2 flex items-center rounded-md px-4 py-2" :class="bgTypeColor(trip?.type)">
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
      <div class="flex flex-col justify-center md:my-10 md:flex-row">
        <div class="flex flex-col py-4 md:items-end md:justify-center md:p-4">
          <span class="text-lg font-bold">{{ trip?.departure_location }}</span>
          <span v-if="trip">
            {{ dateFormatedOnlyHours(trip?.departure_time) }}
          </span>
        </div>
        <div class="mx-auto md:mx-0">
          <img
            class="car-animate relative top-4 ml-8 hidden w-10 md:block"
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
        <div class="flex flex-col items-end py-4 md:items-start md:justify-center md:p-4">
          <span class="text-lg font-bold">{{ trip?.arrival_location }}</span>
        </div>
      </div>
      <hr class="opacity-25" />
      <div v-if="trip?.type === TripType.DRIVER && trip.price">
        <div class="my-4 flex justify-between p-4">
          <p>{{ $t('trip.price') }}</p>
          <span class="text-xl font-bold">
            {{ formatPrice(trip?.price) }}
          </span>
        </div>
        <hr class="opacity-25" />
      </div>
      <div v-if="trip?.message" class="my-4 p-4">
        <p class="text-justify">{{ trip?.message }}</p>
      </div>
      <TripUser v-if="trip?.announcer" :user="trip.announcer" :trip="trip" />
      <div
        class="mb-4 flex cursor-pointer items-center rounded p-4 hover:bg-content-flight hover:bg-opacity-25"
        @click="displayContactModal = true"
      >
        <FontAwesomeIcon class="mr-4 text-xl" icon="fa-regular fa-comments" />
        <span>
          {{ $t('trip.contact', { name: trip?.announcer.firstname }) }}
        </span>
      </div>
      <hr class="opacity-25" />
      <div v-if="trip?.type === TripType.DRIVER && trip.car_model">
        <div class="mt-4 p-4">
          <p class="text-md">
            {{ $t('trip.availableSeats', { count: readySeats }) }}
          </p>
        </div>
        <div class="mb-4 flex items-center p-4">
          <FontAwesomeIcon class="mr-4 text-xl" icon="fa-car-side" />
          <div class="flex flex-col">
            <span class="text-lg font-bold">{{ trip?.car_model }}</span>
            <span class="opacity-40">{{ trip?.car_color }}</span>
          </div>
        </div>
        <hr class="opacity-25" />
      </div>
      <div v-if="canJoin" class="mb-10 mt-8">
        <Button
          :loading="joinLoading"
          :text="$t('trip.joinThisTrip')"
          class="mx-auto md:w-1/2"
          bgColor="content-light"
          iconPosition="right"
          @click="joinTrip($el)"
        />
      </div>
      <div class="mb-16 mt-8">
        <h4 class="text-2xl">
          {{
            trip?.type === TripType.DRIVER ? t('trip.othersPassengers') : t('trip.othersInterested')
          }}
        </h4>
        <div v-if="trip?.members?.length! > 0" class="my-4">
          <TripUser v-for="member in trip?.members" :key="member.id" :user="member" />
        </div>
        <div v-else class="my-4 flex items-center">
          <FontAwesomeIcon icon="user-tie" class="mr-2 text-xl" />
          <p class="py-4 text-lg">{{ $t('trip.noPassengers') }}</p>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="flex h-screen items-center justify-center">
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
