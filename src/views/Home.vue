<script lang="ts" setup>
import Title from "@/components/atoms/Title.vue";
import TripsSlider from "@/modules/trips/components/molecules/TripsSlider.vue";
import HomeHeader from "@/components/molecules/HomeHeader.vue";
import TripTypeSwitch from "@/modules/trips/components/molecules/TripTypeSwitch.vue";
</script>

<template>
  <div>
    <HomeHeader />
    <section class="pt-8 pb-28 px-6 md:px-12 max-w-screen-2xl mx-auto">
      <Title logoColor="base" :content="$t('home.popularTrips')" />
      <TripsSlider />
      <div class="flex justify-between items-center">
        <Title logoColor="base" :content="$t('home.howTo')" />
        <TripTypeSwitch />
      </div>
    </section>
  </div>
</template>
