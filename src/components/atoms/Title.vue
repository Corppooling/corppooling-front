<script lang="ts" setup>
import logo_base from '@/assets/images/logos/logo_base.svg';
import logo_content from '@/assets/images/logos/logo_content.svg';
import logo_light from '@/assets/images/logos/logo_light.svg';
import logo_xlight from '@/assets/images/logos/logo_xlight.svg';
import logo_glight from '@/assets/images/logos/logo_glight.svg';
import logo_flight from '@/assets/images/logos/logo_flight.svg';
import logo_white from '@/assets/images/logos/logo_white.svg';
import { computed } from 'vue';

const props = defineProps<{
  content: string;
  logoColor?: 'base' | 'content' | 'light' | 'xlight' | 'glight' | 'flight' | 'white';
}>();

const logo = computed((): string => {
  switch (props.logoColor) {
    case 'content':
      return logo_content;
    case 'light':
      return logo_light;
    case 'xlight':
      return logo_xlight;
    case 'glight':
      return logo_glight;
    case 'flight':
      return logo_flight;
    case 'white':
      return logo_white;
    default:
      return logo_base;
  }
});
</script>

<template>
  <div class="flex items-center">
    <div class="w-12 sm:w-14">
      <img :src="logo" alt="" />
    </div>
    <h2 class="ml-2 text-3xl font-light text-content-base">
      {{ props.content }}
    </h2>
  </div>
</template>
