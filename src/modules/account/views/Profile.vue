<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import defaultProfileImage from '@/assets/images/logos/logo_white.svg?url';

const userStore = useUserStore();
console.log(userStore.user);
</script>

<template>
  <div>
    <h3 class="mb-8 text-2xl">A propos de vous</h3>
    <div class="flex w-full md:p-4 2xl:w-1/3">
      <div class="flex w-2/3 flex-col">
        <span class="text-4xl">{{ userStore.getFullName }}</span>
        <span class="mt-2 text-lg font-bold">{{ userStore.user?.company.name }}</span>
        <span class="text-md opacity-40">
          {{ userStore.user?.department.name }}
        </span>
        <span class="mt-4 text-base font-bold">{{ userStore.user?.email }}</span>
      </div>
      <div class="flex w-1/3 flex-col items-center justify-center">
        <div
          class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-content-glight p-1"
        >
          <img class="w-full" :src="defaultProfileImage" alt="" />
        </div>
        <span class="animate-underline mt-2">Modifier</span>
      </div>
    </div>
  </div>
</template>
