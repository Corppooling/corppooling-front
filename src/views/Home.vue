<script lang="ts" setup>
import Title from "@/components/atoms/Title.vue";
import TripsSlider from "@/modules/trips/components/molecules/TripsSlider.vue";
import HomeHeader from "@/components/molecules/HomeHeader.vue";
import TripTypeSwitch from "@/modules/trips/components/molecules/TripTypeSwitch.vue";
import { ref } from "vue";
import { TripType } from "@/interfaces/trip.interface";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const type = ref<TripType>(TripType.DRIVER);
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
    </section>
  </div>
</template>
