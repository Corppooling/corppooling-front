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

const type = ref<TripType>(TripType.DRIVER);

const { t } = useI18n();

const tutorialImages = computed((): Array<string> => {
  switch (type.value) {
    case TripType.PASSENGER:
      return [search_passenger, talk_passenger, car_passenger];
    default:
      return [search_driver, talk_driver, car_driver];
  }
});

const tutorialTexts = computed((): Array<string> => {
  switch (type.value) {
    case TripType.PASSENGER:
      return [
        t("home.tutorial.searchPassenger"),
        t("home.tutorial.talkPassenger"),
        t("home.tutorial.carPassenger"),
      ];
    default:
      return [
        t("home.tutorial.searchDriver"),
        t("home.tutorial.talkDriver"),
        t("home.tutorial.carDriver"),
      ];
  }
});
</script>

<template>
  <div>
    <HomeHeader />
    <section class="pt-6 sm:pt-8 pb-28 px-6 md:px-12 max-w-screen-2xl mx-auto">
      <Title logoColor="base" :content="$t('home.popularTrips')" />
      <TripsSlider />
      <div class="flex flex-wrap justify-between items-center">
        <Title
          class="my-4 sm:my-0"
          logoColor="base"
          :content="$t('home.howTo')"
        />
        <TripTypeSwitch :type="type" @update:type="type = $event" />
      </div>
      <p class="mt-4 text-xl">
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
      <div class="flex justify-evenly w-full mt-14">
        <template v-for="(image, index) in tutorialImages" :key="index">
          <div class="flex flex-col h-52 w-80 flex justify-center items-center">
            <div class="h-full my-auto">
              <img class="h-full" :src="image" alt="" />
            </div>
            <div class="mt-4">
              <p>{{ tutorialTexts[index] }}</p>
            </div>
          </div>
          <hr
            v-if="index < tutorialImages.length - 1"
            class="border-none h-1 rounded-full w-24 my-auto mx-4"
            :class="
              type === TripType.DRIVER ? 'bg-main-base' : 'bg-content-glight'
            "
          />
        </template>
      </div>
    </section>
  </div>
</template>
