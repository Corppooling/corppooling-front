<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  color?:
    | 'main-base'
    | 'content-base'
    | 'content-light'
    | 'content-xlight'
    | 'content-glight'
    | 'content-flight';
}>();

const sizeClasses = computed((): string => {
  switch (props.size) {
    case 1:
      return 'h-3 w-3';
    case 2:
      return 'h-4 w-4';
    case 3:
      return 'h-5 w-5';
    case 4:
      return 'h-6 w-6';
    case 5:
      return 'h-8 w-8';
    case 6:
      return 'h-10 w-10';
    case 7:
      return 'h-12 w-12';
    case 8:
      return 'h-16 w-16';
    case 9:
      return 'h-20 w-20';
    case 10:
      return 'h-24 w-24';
    default:
      return 'h-5 w-5';
  }
});

const colorClass = computed((): string => {
  switch (props.color) {
    case 'main-base':
      return '#F6B26B';
    case 'content-base':
      return '#20124D';
    case 'content-light':
      return '#351C75';
    case 'content-xlight':
      return '#8E7CC3';
    case 'content-glight':
      return '#B4A7D6';
    case 'content-flight':
      return '#D9D2E9';
    default:
      return 'currentColor';
  }
});
</script>

<template>
  <svg
    :class="sizeClasses"
    class="-ml-1 mr-3 animate-spin text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      class="opacity-40"
      cx="12"
      cy="12"
      r="10"
      :stroke="colorClass"
      stroke-width="4"
    ></circle>
    <path
      class="opacity-100"
      :fill="colorClass"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
</template>
