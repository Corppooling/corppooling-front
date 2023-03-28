<script lang="ts" setup>
import Title from "@/components/atoms/Title.vue";
import TripsSlider from "@/modules/trips/components/molecules/TripsSlider.vue";
import HomeHeader from "@/components/molecules/HomeHeader.vue";
import TripTypeSwitch from "@/modules/trips/components/molecules/TripTypeSwitch.vue";
import { computed, ref } from "vue";
import { TripType } from "@/interfaces/trip.interface";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import search_driver from "@/assets/images/tutorial/search_driver.svg";
import search_passenger from "@/assets/images/tutorial/search_passenger.svg";
import talk_driver from "@/assets/images/tutorial/talk_driver.svg";
import talk_passenger from "@/assets/images/tutorial/talk_passenger.svg";
import car_driver from "@/assets/images/tutorial/car_driver.svg";
import car_passenger from "@/assets/images/tutorial/car_passenger.svg";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/user";

const type = ref<TripType>(TripType.DRIVER);
const userStore = useUserStore();
userStore.setUser();

const { t } = useI18n();

const tutorialElements = computed((): Array<Record<string, string>> => {
  switch (type.value) {
    case TripType.PASSENGER:
      return [
        { image: search_passenger, text: t("home.tutorial.searchPassenger") },
        { image: talk_passenger, text: t("home.tutorial.talkPassenger") },
        { image: car_passenger, text: t("home.tutorial.carPassenger") },
      ];
    default:
      return [
        { image: search_driver, text: t("home.tutorial.searchDriver") },
        { image: talk_driver, text: t("home.tutorial.talkDriver") },
        { image: car_driver, text: t("home.tutorial.carDriver") },
      ];
  }
});
</script>

<template>
  <div>
    <HomeHeader />
    <section
      class="pt-6 sm:py-8 px-6 md:px-12 max-w-screen-2xl mx-auto mt-28 lg:mt-0"
    >
      <template v-if="userStore.user">
        <Title logoColor="base" :content="$t('home.popularTrips')" />
        <TripsSlider />
      </template>
      <div class="flex flex-wrap justify-between items-center">
        <Title
          class="my-4 sm:my-0"
          logoColor="base"
          :content="$t('home.howTo')"
        />
        <TripTypeSwitch :type="type" @update:type="type = $event" />
      </div>
      <p class="mt-4 text-lg md:text-xl">
        <font-awesome-icon
          :icon="type === TripType.DRIVER ? 'fa-car' : 'fa-thumbs-up'"
          class="mr-2"
        />
        {{
          type === TripType.DRIVER
            ? $t("trip.searchPassengers")
            : $t("trip.searchDriver")
        }}
      </p>
      <div class="flex flex-col md:flex-row justify-evenly w-full mt-14">
        <template v-for="(element, index) in tutorialElements" :key="index">
          <div
            class="flex flex-col w-full md:w-80 flex justify-center items-center"
          >
            <div class="h-52 max-h-52 my-auto">
              <img class="h-full" :src="element.image" alt="" />
            </div>
            <div class="my-6 h-24 md:mb-0 text-justify">
              <p>{{ element.text }}</p>
            </div>
          </div>
          <hr
            v-if="index < tutorialElements.length - 1"
            class="rotate-90 md:rotate-0 border-none h-1 rounded-full w-24 mb-20 md:my-auto mx-auto md:mx-4"
            :class="
              type === TripType.DRIVER ? 'bg-main-base' : 'bg-content-glight'
            "
          />
        </template>
      </div>
    </section>
  </div>
</template>
