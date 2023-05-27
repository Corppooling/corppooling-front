<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import defaultProfileImage from '@/assets/images/logos/logo_white.svg?url';

const userStore = useUserStore();
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
        <span class="animate-underline mt-2 select-none">Modifier</span>
      </div>
    </div>
    <h3 class="my-8 text-2xl">Vos statistiques</h3>
    <div class="flex w-full flex-col text-lg md:w-96 md:pl-4">
      <div class="flex justify-between py-2">
        <span>Nombre de trajets publiés:</span>
        <span class="ml-4 font-bold">{{ userStore.user?.trips.length }}</span>
      </div>
      <div class="flex justify-between py-2">
        <span>Nombre de réservations effectuées:</span>
        <span class="ml-4 font-bold">{{ userStore.user?.reservations.length }}</span>
      </div>
    </div>
  </div>
</template>
