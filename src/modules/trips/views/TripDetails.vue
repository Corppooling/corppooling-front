<script lang="ts" setup>
import { useTripStore } from "@/stores/trip";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();
const tripStore = useTripStore();

onMounted(async () => {
  await tripStore.setTrip(route.params.id as string);
});
</script>

<template>
  <div></div>
</template>
