<script lang="ts" setup>
import defaultProfileImage from '@/assets/images/logos/logo_white.svg';
import type { Trip } from '@/interfaces/trip.interface';
import { bgTypeColor } from '@/composables/typeColor';

const props = defineProps<{
  trip: Trip;
}>();
</script>

<template>
  <div
    class="rounded-full w-16 h-16 overflow-hidden p-1 flex justify-center items-center"
    :class="bgTypeColor(props.trip.type)"
  >
    <img class="w-full" :src="defaultProfileImage" alt="" />
  </div>
</template>
