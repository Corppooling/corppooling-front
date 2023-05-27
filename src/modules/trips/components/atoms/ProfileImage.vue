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
    class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full p-1"
    :class="bgTypeColor(props.trip.type)"
  >
    <img class="w-full" :src="defaultProfileImage" alt="" />
  </div>
</template>
