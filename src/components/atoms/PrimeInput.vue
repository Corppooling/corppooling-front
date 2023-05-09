<script lang="ts" setup>
const props = defineProps<{
  id: string;
  placeholder: string;
}>();
</script>

<template>
  <span class="p-float-label rounded-2xl border border-content-xlight shadow-md">
    <slot />
    <label class="font-bold" :for="props.id">{{ props.placeholder }}</label>
  </span>
</template>
