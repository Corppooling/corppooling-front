<script lang="ts" setup>
import { computed, ref } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Spinner from '@/components/atoms/Spinner.vue';
import defaultProfileImage from '@/assets/images/logos/logo_white.svg?url';
import ContactSection from '@/modules/account/components/molecules/ContactSection.vue';
import axiosClient from '@/support/axiosClient';
import { User } from '@/interfaces/user.interface';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const isLoading = ref<boolean>(false);
const publicUser = ref<User>();
const userStore = useUserStore();

onMounted(async () => {
  isLoading.value = true;
  await axiosClient
    .get(`/api/users/${router.currentRoute.value.params.id}`)
    .then((res) => {
      publicUser.value = res.data;
    })
    .catch((res) => {
      router.push({ name: 'error', params: { code: res.response.status } });
    });
  isLoading.value = false;
});

const fullName = computed<string>(
  () => `${publicUser.value?.firstname} ${publicUser.value?.lastname}`
);
</script>

<template>
  <div v-if="!isLoading" class="mx-auto w-full max-w-screen-md px-4 py-14 md:p-20">
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <h1 class="text-4xl">{{ fullName }}</h1>
        <span class="mt-2 text-lg font-bold">{{ publicUser?.company.name }}</span>
        <span class="text-md opacity-40">
          {{ publicUser?.department.name }}
        </span>
      </div>
      <div
        class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-content-glight p-1"
      >
        <img class="w-full" :src="defaultProfileImage" alt="profile picture" />
      </div>
    </div>
    <div v-if="publicUser?.presentation || publicUser?.presentation?.trim() !== ''" class="my-4">
      <span class="mb-2 font-bold">{{ $t('account.publicProfile.presentation') }}:</span>
      <p>{{ publicUser?.presentation }}</p>
    </div>
    <h3 class="my-8 text-2xl">{{ $t('account.publicProfile.stats') }}</h3>
    <div class="flex w-full flex-col text-lg">
      <div class="flex justify-between">
        <span>{{ $t('account.myProfile.publishedTrips') }}:</span>
        <span class="ml-4 font-bold">{{ publicUser?.trips.length }}</span>
      </div>
      <div class="flex justify-between py-2">
        <span>{{ $t('account.myProfile.bookedTrips') }}:</span>
        <span class="ml-4 font-bold">{{ publicUser?.reservations.length }}</span>
      </div>
    </div>
    <h3 class="my-8 text-2xl">{{ $t('account.publicProfile.contact') }}</h3>
    <div>
      <p>
        <span class="mr-2 font-bold">{{ $t('account.publicProfile.email') }}:</span>
        <a :href="`mailto:${publicUser?.email}`" class="animate-underline text-base">
          {{ publicUser?.email }}
        </a>
      </p>
      <div v-if="publicUser?.id !== userStore.user?.id" class="my-4">
        <ContactSection v-if="publicUser" :user="publicUser" />
      </div>
    </div>
  </div>
  <div
    v-else
    class="flex h-[calc(100vh-14.1rem)] items-center justify-center md:h-[calc(100vh-12.9rem)]"
  >
    <Spinner :size="8" color="content-base" />
  </div>
</template>
