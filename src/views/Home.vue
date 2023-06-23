<script lang="ts" setup>
import Title from '@/components/atoms/Title.vue';
import LastTripsSlider from '@/modules/trips/components/molecules/LastTripsSlider.vue';
import HomeHeader from '@/components/molecules/HomeHeader.vue';
import TripTypeSwitch from '@/modules/trips/components/molecules/TripTypeSwitch.vue';
import { computed, ref } from 'vue';
import { TripType } from '@/interfaces/trip.interface';
import search_driver from '@/assets/images/tutorial/search_driver.svg';
import search_passenger from '@/assets/images/tutorial/search_passenger.svg';
import talk_driver from '@/assets/images/tutorial/talk_driver.svg';
import talk_passenger from '@/assets/images/tutorial/talk_passenger.svg';
import car_driver from '@/assets/images/tutorial/car_driver.svg';
import car_passenger from '@/assets/images/tutorial/car_passenger.svg';
import { useUserStore } from '@/stores/user';
import { i18nGlobal } from '@/support/i18n';
import { useRouter } from 'vue-router';

const type = ref<TripType>(TripType.DRIVER);
const userStore = useUserStore();
const router = useRouter();

const { t } = i18nGlobal;

const tutorialElements = computed(
  (): {
    image: string;
    text: string;
  }[] => {
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
  }
);

interface PopularTrip {
  departureLocation: string;
  arrivalLocation: string;
}

const popularTrips: PopularTrip[] = [
  {
    departureLocation: 'Marseille',
    arrivalLocation: 'Lyon',
  },
  {
    departureLocation: 'Bordeaux',
    arrivalLocation: 'Toulouse',
  },
  {
    departureLocation: 'Rennes',
    arrivalLocation: 'Nantes',
  },
  {
    departureLocation: 'Paris',
    arrivalLocation: 'Lille',
  },
];

const redirectPopularTrip = (departureLocation: string, arrivalLocation: string): void => {
  if (userStore.isAuth) {
    router.push({
      name: 'trips',
      query: {
        departure: departureLocation,
        arrival: arrivalLocation,
      },
    });
  } else {
    router.push({
      name: 'login',
    });
  }
};
</script>

<template>
  <div>
    <HomeHeader />
    <div class="mx-auto max-w-screen-2xl px-6 pt-6 sm:py-8 md:px-12 lg:mt-0">
      <section class="mt-32 lg:mt-0" v-if="userStore.isAuth">
        <LastTripsSlider />
      </section>
      <section>
        <div class="mb-10">
          <Title class="my-4 sm:my-0" logoColor="base" :content="$t('home.news.title')" />
          <div class="mb-4 flex flex-col lg:flex-row">
            <div class="flex w-full items-center justify-center lg:w-1/2">
              <img class="max-w-[450px]" src="@/assets/images/home_news_1.svg" alt="home news 1" />
            </div>
            <div class="flex w-full flex-col justify-center p-4 lg:w-1/2">
              <h3 class="text-3xl">{{ $t('home.news.news1Title') }}</h3>
              <p class="mt-4 text-lg">
                {{ $t('home.news.news1Desc') }}
              </p>
            </div>
          </div>
          <div class="mb-4 flex flex-col lg:flex-row">
            <div class="flex w-full flex-col justify-center p-4 lg:w-1/2">
              <h3 class="text-3xl">{{ $t('home.news.news2Title') }}</h3>
              <p class="mt-4 text-lg">
                {{ $t('home.news.news2Desc') }}
                <br />
                <small>{{ $t('home.news.news2Asterisk') }}</small>
              </p>
            </div>
            <div class="flex w-full items-center justify-center lg:w-1/2">
              <img class="max-w-[450px]" src="@/assets/images/home_news_2.svg" alt="home news 2" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="mb-16">
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
                  <p class="text-lg">{{ element.text }}</p>
                </div>
              </div>
              <hr
                v-if="index < tutorialElements.length - 1"
                class="mx-auto mb-20 h-1 w-24 rotate-90 rounded-full border-none md:mx-4 md:my-auto md:rotate-0"
                :class="type === TripType.DRIVER ? 'bg-main-base' : 'bg-content-glight'"
              />
            </template>
          </div>
        </div>
      </section>
      <section>
        <div class="mb-16 rounded-2xl bg-main-base p-4">
          <Title
            class="my-4 sm:my-0"
            logoColor="content"
            :content="$t('home.popularTrips.title')"
          />
          <div class="flex flex-wrap justify-around gap-4 p-8">
            <div
              v-for="(trip, index) in popularTrips"
              :key="index"
              class="flex w-72 cursor-pointer items-center justify-between rounded-2xl bg-white p-6 transition-all duration-300 ease-in-out hover:drop-shadow-md"
              @click="redirectPopularTrip(trip.departureLocation, trip.arrivalLocation)"
            >
              <div class="flex items-center text-lg">
                <span>{{ trip.departureLocation }}</span>
                <FontAwesomeIcon icon="fa-arrow-right" class="mx-2" />
                <span>{{ trip.arrivalLocation }}</span>
              </div>
              <div class="ml-8 flex items-center justify-center">
                <FontAwesomeIcon icon="fa-angle-right" class="mx-2" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Title class="my-4 sm:my-0" logoColor="base" :content="$t('home.bonusCorppooling.title')" />
        <div class="mb-10 mt-3 flex flex-wrap">
          <div class="flex w-full flex-col p-3 text-left lg:w-1/3">
            <div class="mt-4 flex items-center">
              <FontAwesomeIcon icon="fa-euro-sign" class="mr-3 text-2xl text-main-base" />
              <span class="text-lg font-bold">{{ $t('home.bonusCorppooling.bonus1Title') }}</span>
            </div>
            <p class="mt-4 text-justify text-lg">
              {{ $t('home.bonusCorppooling.bonus1Desc') }}
            </p>
          </div>
          <div class="flex w-full flex-col p-3 text-left lg:w-1/3">
            <div class="mt-4 flex items-center">
              <FontAwesomeIcon icon="fa-handshake" class="mr-3 text-2xl text-main-base" />
              <span class="text-lg font-bold">{{ $t('home.bonusCorppooling.bonus2Title') }}</span>
            </div>
            <p class="mt-4 text-justify text-lg">
              {{ $t('home.bonusCorppooling.bonus2Desc') }}
            </p>
          </div>
          <div class="flex w-full flex-col p-3 text-left lg:w-1/3">
            <div class="mt-4 flex items-center">
              <FontAwesomeIcon icon="fa-rocket" class="mr-3 text-2xl text-main-base" />
              <span class="text-lg font-bold">{{ $t('home.bonusCorppooling.bonus3Title') }}</span>
            </div>
            <p class="mt-4 text-justify text-lg">
              {{ $t('home.bonusCorppooling.bonus3Desc') }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
