<script lang="ts" setup>
import { useTripStore } from "@/stores/trip";
import { useRoute } from "vue-router";

const route = useRoute();
const tripStore = useTripStore();
await tripStore.setTrip(route.params.id as string);
</script>

<template>
  <div></div>
</template>
