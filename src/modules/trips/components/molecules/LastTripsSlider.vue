<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import Title from '@/components/atoms/Title.vue';
import TripCard from '@/modules/trips/components/molecules/TripCard.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, type SwiperOptions } from 'swiper';
import 'swiper/css/effect-cards';
import 'swiper/css';
import 'swiper/css/navigation';
import { useTripStore } from '@/stores/trip';
import type { Trip } from '@/interfaces/trip.interface';
import Spinner from '@/components/atoms/Spinner.vue';

const tripStore = useTripStore();
const trips = ref<Array<Trip>>([]);
const loading = ref<boolean>(false);

onBeforeMount(async () => {
  loading.value = true;
  await tripStore.setLatestTrips();
  trips.value = tripStore.lastTrips;
  loading.value = false;
});

const swiperOptions = ref<SwiperOptions>({
  modules: [Navigation],
  centeredSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  allowTouchMove: true,
  observer: true,
  observeParents: true,
  breakpoints: {
    0: {
      slidesPerView: 'auto',
      spaceBetween: 26,
    },
  },
});
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center justify-between">
      <Title logoColor="base" :content="$t('home.popularTrips')" />
      <RouterLink :to="{ name: 'trips' }" class="block p-2 text-lg hover:underline">
        {{ $t('home.seeAll') }}
      </RouterLink>
    </div>
    <template v-if="loading">
      <div class="my-28 flex items-center justify-center">
        <Spinner :size="6" color="content-base" />
      </div>
    </template>
    <template v-else-if="trips.length > 0">
      <Swiper
        class="w-full"
        :options="swiperOptions"
        :modules="swiperOptions.modules"
        :navigation="swiperOptions.navigation"
        :breakpoints="swiperOptions.breakpoints"
      >
        <SwiperSlide
          v-for="trip in trips"
          :key="trip.id"
          class="mx-auto my-10 flex max-w-full justify-center sm:mx-0 sm:max-w-fit"
        >
          <TripCard :trip="trip" />
        </SwiperSlide>
        <div>
          <div
            class="swiper-button-prev flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md after:content-none"
          >
            <font-awesome-icon icon="fa-chevron-left" size="xl" class="text-content-base" />
          </div>
          <div
            class="swiper-button-next flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md after:content-none"
          >
            <font-awesome-icon icon="fa-chevron-right" size="xl" class="text-content-base" />
          </div>
        </div>
      </Swiper>
    </template>
    <template v-else>
      <div class="my-28 text-center text-xl">
        <font-awesome-icon class="text-content-base opacity-40" icon="fa-flag-checkered" />
        <p class="opacity-70">{{ $t('trip.noTripsNow') }}</p>
      </div>
    </template>
  </div>
</template>
