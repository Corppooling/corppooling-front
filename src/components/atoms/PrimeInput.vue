<script lang="ts" setup>
const props = defineProps<{
  id: string;
  placeholder: string;
}>();
</script>

<template>
  <span
    class="p-float-label border border-content-xlight rounded-2xl shadow-md"
  >
    <slot />
    <label class="font-bold" :for="props.id">{{ props.placeholder }}</label>
  </span>
</template>
