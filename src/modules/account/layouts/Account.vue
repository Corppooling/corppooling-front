<script lang="ts" setup>
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';
import { useRoute } from 'vue-router';
import { i18nGlobal } from '@/support/i18n';
import { computed } from 'vue';

const route = useRoute();
const { t } = i18nGlobal;

interface Tab {
  name: string;
  label: string;
  icon: FontAwesomeIconProps['icon'];
}

const tabs: Array<Tab> = [
  {
    name: 'account.profile',
    label: t('account.profile'),
    icon: 'fa-user',
  },
  {
    name: 'account.trips',
    label: t('account.trips'),
    icon: 'fa-car',
  },
  {
    name: 'account.bookings',
    label: t('account.bookings'),
    icon: 'fa-calendar-alt',
  },
  {
    name: 'account.company',
    label: t('account.company'),
    icon: 'fa-building',
  },
];

const currentLabel = computed<string>(() => {
  const tab = tabs.find((tab) => tab.name === route.name);
  return tab ? tab.label : '';
});
</script>

<template>
  <div class="flex flex-1 flex-col md:flex-row">
    <div class="order-2 flex-1">
      <div class="p-10">
        <h1 class="text-4xl font-bold">{{ currentLabel }}</h1>
        <Suspense>
          <RouterView />
        </Suspense>
      </div>
    </div>
    <div
      class="sticky left-0 top-0 order-1 hidden max-w-fit flex-1 bg-content-flight text-content-base shadow-md md:flex"
    >
      <div class="flex flex-col">
        <template v-for="tab in tabs" :key="tab.name">
          <RouterLink
            v-ripple
            :to="{ name: tab.name }"
            class="flex items-center px-8 py-5 hover:bg-content-xlight hover:text-white"
            :class="{ 'bg-content-xlight text-white': route.name === tab.name }"
          >
            <FontAwesomeIcon :icon="tab.icon" class="mr-4 text-lg" />
            <span>{{ tab.label }}</span>
          </RouterLink>
        </template>
      </div>
    </div>
    <div
      class="sticky bottom-0 order-3 -mb-px flex bg-content-flight text-content-base shadow-md md:hidden"
    >
      <div class="flex w-full justify-between">
        <template v-for="tab in tabs" :key="tab.name">
          <RouterLink
            v-ripple
            :to="{ name: tab.name }"
            class="flex w-full items-center justify-center py-4 hover:bg-content-xlight hover:text-white"
            :class="{ 'bg-content-xlight text-white': route.name === tab.name }"
          >
            <FontAwesomeIcon :icon="tab.icon" class="text-lg" />
          </RouterLink>
        </template>
      </div>
    </div>
  </div>
</template>
