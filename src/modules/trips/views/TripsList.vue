<script lang="ts" setup>
import { type Component, onMounted, ref, watch } from "vue";
import Searchbar from "@/modules/trips/components/organisms/Searchbar.vue";
import Filters from "@/modules/trips/components/organisms/Filters.vue";
import { useTripStore } from "@/stores/trip";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import TripCard from "@/modules/trips/components/molecules/TripCard.vue";
import TripInline from "@/modules/trips/components/molecules/TripInline.vue";
import { useRoute } from "vue-router";

const enum Layout {
  GRID = "grid",
  LIST = "list",
}
const tripComponent = ref<Component>(TripCard);
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

onMounted(() => {
  tripStore.resetExtraSorts();
  tripStore.setTrips(
    route.query["departure"] as string,
    route.query["arrival"] as string,
    route.query["departure_time"] as string
  );
});
</script>

<template>
  <div>
    <div>
      <div class="flex flex-col items-center py-10 px-6 bg-content-flight">
        <Searchbar />
      </div>
      <div class="flex flex-col lg:flex-row p-10 max-w-[1246px] mx-auto">
        <Filters />
        <div class="flex flex-col px-0 lg:px-10 w-full">
          <div class="pb-10 flex justify-between items-center">
            <h2 class="text-3xl">Voyages</h2>
            <DataViewLayoutOptions v-model="layout" />
          </div>
          <div
            :class="layout === Layout.GRID ? 'flex-wrap' : 'flex-col'"
            class="flex justify-center lg:justify-start gap-5"
          >
            <template v-for="trip in tripStore.trips" :key="trip.id">
              <component :is="tripComponent" :trip="trip" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
