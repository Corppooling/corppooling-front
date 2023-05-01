<script lang="ts" setup>
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';
import { type RouteLocationRaw, useRoute } from 'vue-router';

const route = useRoute();

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
    to: { name: 'bookings' },
  },
  {
    name: 'company',
    label: 'Mon entreprise',
    icon: 'fa-building',
    to: { name: 'company' },
  },
];
</script>

<template>
  <div class="flex flex-col md:flex-row flex-1">
    <div class="order-2 flex-1">
      <slot />
    </div>
    <div
      class="hidden md:flex order-1 sticky flex-1 top-0 left-0 bg-content-flight text-content-base max-w-fit shadow-md"
    >
      <div class="flex flex-col">
        <template v-for="tab in tabs" :key="tab.name">
          <RouterLink
            :to="tab.to"
            class="flex items-center py-5 px-8 hover:bg-content-xlight hover:text-white"
            :class="{ 'bg-content-xlight text-white': route.name === tab.name }"
          >
            <FontAwesomeIcon :icon="tab.icon" class="mr-4 text-lg" />
            <span>{{ tab.label }}</span>
          </RouterLink>
        </template>
      </div>
    </div>
    <div
      class="md:hidden flex order-3 sticky bottom-0 bg-content-flight text-content-base shadow-md -mb-px"
    >
      <div class="flex justify-between w-full">
        <template v-for="tab in tabs" :key="tab.name">
          <RouterLink
            :to="tab.to"
            class="hover:bg-content-xlight hover:text-white w-1/3 py-4 flex justify-center items-center"
            :class="{ 'bg-content-xlight text-white': route.name === tab.name }"
          >
            <FontAwesomeIcon :icon="tab.icon" class="text-lg" />
          </RouterLink>
        </template>
      </div>
    </div>
  </div>
</template>
