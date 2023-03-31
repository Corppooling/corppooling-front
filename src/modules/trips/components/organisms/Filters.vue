<script lang="ts" setup>
import { ref } from "vue";
import RadioButton from "primevue/radiobutton";

const enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

const priceOrder = ref<Order | null>(null);
</script>

<template>
  <div
    class="flex flex-col ring-1 rounded-2xl ring-content-flight shadow-md p-4 min-w-[350px] max-h-fit h-fit sticky top-32"
  >
    <div class="flex justify-between items-center">
      <h3 class="text-xl">Trier par</h3>
      <span class="cursor-pointer">Tout effacer</span>
    </div>
    <div class="flex flex-col mt-4">
      <div class="flex items-center p-2">
        <RadioButton
          v-model="priceOrder"
          inputId="priceASC"
          name="price"
          :value="Order.ASC"
        />
        <label for="priceASC" class="ml-2">Prix croissant</label>
      </div>
      <div class="flex items-center p-2">
        <RadioButton
          v-model="priceOrder"
          inputId="priceDESC"
          name="price"
          :value="Order.DESC"
        />
        <label for="priceDESC" class="ml-2">Prix décroissant</label>
      </div>
    </div>
  </div>
</template>
