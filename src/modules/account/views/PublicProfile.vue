<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Spinner from '@/components/atoms/Spinner.vue';
import defaultProfileImage from '@/assets/images/logos/logo_white.svg?url';

const userStore = useUserStore();
const router = useRouter();
const isLoading = ref<boolean>(false);

onMounted(async () => {
  isLoading.value = true;
  await userStore.setPublicUser(parseInt(router.currentRoute.value.params.id as string));
  isLoading.value = false;
});

const fullName = computed<string>(
  () => `${userStore.publicUser?.firstname} ${userStore.publicUser?.lastname}`
);
</script>

<template>
  <div v-if="!isLoading" class="mx-auto w-full max-w-screen-md p-20">
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <h1 class="text-4xl">{{ fullName }}</h1>
        <span class="mt-2 text-lg font-bold">{{ userStore.user?.company.name }}</span>
        <span class="text-md opacity-40">
          {{ userStore.user?.department.name }}
        </span>
        <span class="mt-4 text-base font-bold">{{ userStore.user?.email }}</span>
      </div>
      <div
        class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-content-glight p-1"
      >
        <img class="w-full" :src="defaultProfileImage" alt="profile picture" />
      </div>
    </div>
  </div>
  <div v-else class="flex h-[calc(100vh-13rem)] items-center justify-center">
    <Spinner :size="8" color="content-base" />
  </div>
</template>
