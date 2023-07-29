<script lang="ts" setup>
const props = defineProps<{
  id: string;
  placeholder: string;
  required?: boolean;
}>();
</script>

<template>
  <span class="p-float-label rounded-2xl border border-content-xlight shadow-md">
    <slot />
    <label class="flex font-bold" :for="props.id">
      {{ props.placeholder }}
      <span v-if="required" class="text-error-base">*</span>
    </label>
  </span>
</template>
