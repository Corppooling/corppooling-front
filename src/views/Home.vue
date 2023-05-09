<script lang="ts" setup>
import Title from '@/components/atoms/Title.vue';
import LastTripsSlider from '@/modules/trips/components/molecules/LastTripsSlider.vue';
import HomeHeader from '@/components/molecules/HomeHeader.vue';
import TripTypeSwitch from '@/modules/trips/components/molecules/TripTypeSwitch.vue';
import { computed, ref } from 'vue';
import { TripType } from '@/interfaces/trip.interface';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import search_driver from '@/assets/images/tutorial/search_driver.svg';
import search_passenger from '@/assets/images/tutorial/search_passenger.svg';
import talk_driver from '@/assets/images/tutorial/talk_driver.svg';
import talk_passenger from '@/assets/images/tutorial/talk_passenger.svg';
import car_driver from '@/assets/images/tutorial/car_driver.svg';
import car_passenger from '@/assets/images/tutorial/car_passenger.svg';
import { useUserStore } from '@/stores/user';
import { i18nGlobal } from '@/support/i18n';

const type = ref<TripType>(TripType.DRIVER);
const userStore = useUserStore();

const { t } = i18nGlobal;

const tutorialElements = computed((): Array<Record<string, string>> => {
  switch (type.value) {
    case TripType.PASSENGER:
      return [
        { image: search_passenger, text: t('home.tutorial.searchPassenger') },
        { image: talk_passenger, text: t('home.tutorial.talkPassenger') },
        { image: car_passenger, text: t('home.tutorial.carPassenger') },
      ];
    default:
      return [
        { image: search_driver, text: t('home.tutorial.searchDriver') },
        { image: talk_driver, text: t('home.tutorial.talkDriver') },
        { image: car_driver, text: t('home.tutorial.carDriver') },
      ];
  }
});
</script>

<template>
  <div>
    <HomeHeader />
    <section class="mx-auto mt-28 max-w-screen-2xl px-6 pt-6 sm:py-8 md:px-12 lg:mt-0">
      <template v-if="userStore.isAuth">
        <LastTripsSlider />
      </template>
      <div class="flex flex-wrap items-center justify-between">
        <Title class="my-4 sm:my-0" logoColor="base" :content="$t('home.howTo')" />
        <TripTypeSwitch :type="type" @update:type="type = $event" />
      </div>
      <p class="mt-4 text-lg md:text-xl">
        <FontAwesomeIcon
          :icon="type === TripType.DRIVER ? 'fa-car' : 'fa-thumbs-up'"
          class="mr-2"
        />
        {{ type === TripType.DRIVER ? $t('trip.searchPassengers') : $t('trip.searchDriver') }}
      </p>
      <div class="mt-14 flex w-full flex-col justify-evenly md:flex-row">
        <template v-for="(element, index) in tutorialElements" :key="index">
          <div class="flex w-full flex-col items-center justify-center md:w-80">
            <div class="my-auto h-52 max-h-52">
              <img class="h-full" :src="element.image" alt="" />
            </div>
            <div class="my-6 h-24 text-justify md:mb-0">
              <p>{{ element.text }}</p>
            </div>
          </div>
          <hr
            v-if="index < tutorialElements.length - 1"
            class="mx-auto mb-20 h-1 w-24 rotate-90 rounded-full border-none md:mx-4 md:my-auto md:rotate-0"
            :class="type === TripType.DRIVER ? 'bg-main-base' : 'bg-content-glight'"
          />
        </template>
      </div>
    </section>
  </div>
</template>
