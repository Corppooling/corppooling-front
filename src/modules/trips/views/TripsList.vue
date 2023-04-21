<script lang="ts" setup>
import { type Component, onBeforeMount, onUnmounted, ref, shallowRef, watch } from 'vue';
import Searchbar from '@/modules/trips/components/organisms/Searchbar.vue';
import Filters from '@/modules/trips/components/organisms/Filters.vue';
import { useTripStore } from '@/stores/trip';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import TripCard from '@/modules/trips/components/molecules/TripCard.vue';
import TripInline from '@/modules/trips/components/molecules/TripInline.vue';
import { useRoute } from 'vue-router';
import Spinner from '@/components/atoms/Spinner.vue';

const enum Layout {
  GRID = 'grid',
  LIST = 'list',
}
const tripComponent = shallowRef<Component>(TripCard);
const tripStore = useTripStore();
const layout = ref<Layout>(Layout.LIST);
const route = useRoute();

watch(
  layout,
  () => {
    switch (layout.value) {
      case Layout.GRID:
        tripComponent.value = TripCard;
        break;
      case Layout.LIST:
        tripComponent.value = TripInline;
        break;
    }
  },
  { immediate: true }
);

onBeforeMount(async () => {
  tripStore.resetExtraSorts();
  await tripStore.setTrips(
    route.query['departure'] as string,
    route.query['arrival'] as string,
    route.query['departure_time'] as string,
    true
  );
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleScroll = (): void => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight && tripStore.trips.length < tripStore.totalTrips) {
    tripStore.setTrips(
      route.query['departure'] as string,
      route.query['arrival'] as string,
      route.query['departure_time'] as string,
      false
    );
  }
};
</script>

<template>
  <div>
    <div class="flex flex-col items-center py-10 px-6 bg-content-flight">
      <Searchbar />
    </div>
    <div class="flex flex-col lg:flex-row p-10 max-w-[1246px] mx-auto">
      <Filters />
      <div class="flex flex-col px-0 lg:px-10 w-full">
        <div class="pb-10 flex justify-between items-center">
          <h2 class="text-3xl">{{ $t('trip.title') }}</h2>
          <DataViewLayoutOptions v-model="layout" />
        </div>
        <div
          v-if="tripStore.trips.length > 0"
          :class="layout === Layout.GRID ? 'flex-wrap' : 'flex-col'"
          class="flex justify-center lg:justify-start gap-5"
        >
          <template v-for="(trip, index) in tripStore.trips" :key="index">
            <component :is="tripComponent" :trip="trip" />
          </template>
        </div>
        <div class="h-screen" v-if="tripStore.requestLoading">
          <div class="flex justify-center items-center my-8">
            <Spinner :size="6" color="content-base" />
          </div>
        </div>
        <div v-if="tripStore.totalTrips === 0" class="text-xl text-center my-8">
          <font-awesome-icon class="text-content-base opacity-40" icon="fa-flag-checkered" />
          <p class="opacity-70">
            {{ $t('trip.noTrips') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
