<script lang="ts" setup>
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';

const route = useRoute();
const userStore = useUserStore();

interface Tab {
  name: string;
  icon: FontAwesomeIconProps['icon'];
  class?: string;
}

const tabs = ref<Array<Tab>>([
  {
    name: 'account.profile',
    icon: 'fa-user',
  },
  {
    name: 'account.trips',
    icon: 'fa-car',
  },
  {
    name: 'account.bookings',
    icon: 'fa-calendar-alt',
  },
  {
    name: 'account.company',
    icon: 'fa-building',
  },
]);

onMounted(() => {
  if (userStore.isManager) {
    tabs.value.push({
      name: 'account.management',
      icon: 'fa-gear',
      class: 'md:mt-auto',
    });
  }
});

const currentLabel = computed<string>(() => {
  const tab = tabs.value.find((tab) => tab.name === route.name);
  return tab ? tab.name : '';
});
</script>

<template>
  <div class="flex max-h-[calc(100vh-5rem)] flex-1 flex-col overflow-hidden md:flex-row">
    <div class="order-2 flex-1 overflow-y-auto">
      <div class="p-10">
        <h1 v-if="currentLabel.trim()" class="text-4xl font-bold">{{ $t(currentLabel) }}</h1>
        <div class="my-8">
          <Suspense>
            <RouterView />
          </Suspense>
        </div>
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
            :class="[{ 'bg-content-xlight text-white': route.name === tab.name }, tab.class]"
          >
            <FontAwesomeIcon :icon="tab.icon" class="mr-4 text-lg" />
            <span>{{ $t(tab.name) }}</span>
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
            class="flex w-full items-center justify-center pb-8 pt-4 hover:bg-content-xlight hover:text-white"
            :class="[{ 'bg-content-xlight text-white': route.name === tab.name }, tab.class]"
          >
            <FontAwesomeIcon :icon="tab.icon" class="text-lg" />
          </RouterLink>
        </template>
      </div>
    </div>
  </div>
</template>
