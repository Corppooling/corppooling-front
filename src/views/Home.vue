<script lang="ts" setup>
import Title from "@/components/atoms/Title.vue";
import TripsSlider from "@/modules/trips/components/molecules/TripsSlider.vue";
</script>

<template>
  <div>
    <section class="w-full h-80 bg-content-flight">
      <div
        class="w-5/6 h-full mx-auto flex justify-center items-center flex flex-col"
      >
        <h1
          class="text-content-base text-5xl sm:text-6xl text-center mb-16 font-medium"
        >
          {{ $t("home.find") }}
        </h1>
        <div class="bg-white w-full h-14 rounded-2xl shadow-md max-w-4xl"></div>
      </div>
    </section>
    <section class="py-8 px-6 md:px-12">
      <Title logoColor="base" :content="$t('home.popularTrips')" />
      <TripsSlider />
      <Title logoColor="base" :content="$t('home.howTo')" />
    </section>
  </div>
</template>
