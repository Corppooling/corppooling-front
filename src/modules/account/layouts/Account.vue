<script lang="ts" setup>
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';
import { RouteLocationRaw } from 'vue-router';

interface Tab {
  name: string;
  label: string;
  icon: FontAwesomeIconProps['icon'];
  to: RouteLocationRaw;
}

const tabs: Array<Tab> = [
  {
    name: 'profile',
    label: 'Mon profil',
    icon: 'fa-user',
    to: { name: 'profile' },
  },
  {
    name: 'bookings',
    label: 'Mes réservations',
    icon: 'fa-calendar-alt',
    to: '',
  },
  {
    name: 'company',
    label: 'Mon entreprise',
    icon: 'fa-building',
    to: '',
  },
];
</script>

<template>
  <div class="flex flex-col md:flex-row flex-1">
    <div class="order-2 flex-1">
      <slot />
    </div>
    <div
      class="hidden md:flex order-1 sticky flex-1 top-0 left-0 bg-content-base text-white max-w-fit"
    >
      <div class="flex flex-col">
        <template v-for="tab in tabs" :key="tab.name">
          <RouterLink :to="tab.to" class="flex items-center py-5 px-8 hover:bg-main-base group">
            <FontAwesomeIcon :icon="tab.icon" class="mr-4 group-hover:text-content-base text-lg" />
            <span class="">{{ tab.label }}</span>
          </RouterLink>
        </template>
      </div>
    </div>
    <div class="md:hidden flex order-3 sticky bottom-0 bg-content-base text-white">
      <div class="flex justify-between w-full">
        <template v-for="tab in tabs" :key="tab.name">
          <RouterLink
            :to="tab.to"
            class="text-white hover:bg-main-base w-1/3 py-4 flex justify-center items-center"
          >
            <FontAwesomeIcon :icon="tab.icon" class="text-lg" />
          </RouterLink>
        </template>
      </div>
    </div>
  </div>
</template>
