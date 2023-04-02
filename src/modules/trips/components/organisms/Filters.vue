<script lang="ts" setup>
import { ref, watch } from "vue";
import RadioButton from "primevue/radiobutton";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useTripStore } from "@/stores/trip";
import { useRoute } from "vue-router";

const tripStore = useTripStore();
const route = useRoute();
const orderSort = ref<string>();
const displayFilters = ref<boolean>(true);

watch(orderSort, () => {
  tripStore.setExtraSorts([orderSort.value ?? ""]);
  tripStore.setTrips(
    route.query["departure"] as string,
    route.query["arrival"] as string,
    route.query["departure_time"] as string
  );
});

const resetFilters = () => {
  orderSort.value = undefined;
  tripStore.resetExtraSorts();
};

window.addEventListener("resize", () => {
  displayFilters.value = window.innerWidth > 1024;
});
</script>

<template>
  <Transition name="bounce">
    <div
      v-if="displayFilters"
      class="flex flex-col ring-1 rounded-2xl ring-content-flight shadow-md p-4 md:min-w-[350px] max-h-fit h-fit bg-white sticky top-32 z-10 mb-10"
    >
      <div class="flex justify-between items-center">
        <h3 class="text-xl">Trier par</h3>
        <div class="flex items-center">
          <span @click="resetFilters" class="cursor-pointer p-2">
            Tout effacer
          </span>
          <font-awesome-icon
            size="xl"
            icon="times"
            class="lg:hidden p-2 cursor-pointer ml-6"
            @click="displayFilters = false"
          />
        </div>
      </div>
      <div class="flex flex-col mt-4">
        <div class="flex items-center p-2">
          <RadioButton
            v-model="orderSort"
            inputId="departureTimeASC"
            name="orderSort"
            value="order[departure_time]=asc"
          />
          <label for="departureTimeASC" class="ml-2 cursor-pointer">
            Départ le plus tôt
          </label>
        </div>
        <div class="flex items-center p-2">
          <RadioButton
            v-model="orderSort"
            inputId="priceASC"
            name="orderSort"
            value="order[price]=asc"
          />
          <label for="priceASC" class="ml-2 cursor-pointer">
            Prix le plus bas
          </label>
        </div>
      </div>
    </div>
  </Transition>
  <Transition name="bounce">
    <div
      v-if="!displayFilters"
      class="bg-white drop-shadow-md rounded-full w-14 h-14 flex justify-center items-center cursor-pointer ml-auto sticky top-32 z-10 mb-10"
      @click="displayFilters = true"
    >
      <font-awesome-icon size="lg" icon="filter" class="text-content-base" />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-out 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
