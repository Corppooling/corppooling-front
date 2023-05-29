<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Spinner from '@/components/atoms/Spinner.vue';
import defaultProfileImage from '@/assets/images/logos/logo_white.svg?url';
import ContactSection from '@/modules/account/components/molecules/ContactSection.vue';

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
  <div v-if="!isLoading" class="mx-auto w-full max-w-screen-md px-4 py-14 md:p-20">
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <h1 class="text-4xl">{{ fullName }}</h1>
        <span class="mt-2 text-lg font-bold">{{ userStore.publicUser?.company.name }}</span>
        <span class="text-md opacity-40">
          {{ userStore.publicUser?.department.name }}
        </span>
      </div>
      <div
        class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-content-glight p-1"
      >
        <img class="w-full" :src="defaultProfileImage" alt="profile picture" />
      </div>
    </div>
    <h3 class="my-8 text-2xl">{{ $t('account.publicProfile.stats') }}</h3>
    <div class="flex w-full flex-col text-lg">
      <div class="flex justify-between">
        <span>{{ $t('account.myProfile.publishedTrips') }}:</span>
        <span class="ml-4 font-bold">{{ userStore.publicUser?.trips.length }}</span>
      </div>
      <div class="flex justify-between py-2">
        <span>{{ $t('account.myProfile.bookedTrips') }}:</span>
        <span class="ml-4 font-bold">{{ userStore.publicUser?.reservations.length }}</span>
      </div>
    </div>
    <h3 class="my-8 text-2xl">{{ $t('account.publicProfile.contact') }}</h3>
    <div>
      <p>
        <span class="mr-2 font-bold">{{ $t('account.publicProfile.email') }}:</span>
        <a :href="`mailto:${userStore.publicUser?.email}`" class="animate-underline text-base">
          {{ userStore.publicUser?.email }}
        </a>
      </p>
      <div class="my-4">
        <ContactSection v-if="userStore.publicUser" :user="userStore.publicUser" />
      </div>
    </div>
  </div>
  <div v-else class="flex h-[calc(100vh-13rem)] items-center justify-center">
    <Spinner :size="8" color="content-base" />
  </div>
</template>
