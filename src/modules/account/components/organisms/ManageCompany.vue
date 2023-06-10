<script setup lang="ts">
import { Company } from '@/interfaces/company.interface';
import PrimeInput from '@/components/atoms/PrimeInput.vue';

const props = defineProps<{
  company: Company;
}>();
</script>

<template>
  <div v-if="props.company" class="w-full xl:w-96">
    <form><PrimeInput id="name" placeholder=""></PrimeInput></form>
  </div>
</template>
