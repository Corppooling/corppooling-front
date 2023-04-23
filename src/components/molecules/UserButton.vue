<script lang="ts" setup>
import Dropdown from '@/components/organisms/Dropdown.vue';
import { MenuButton, MenuItem } from '@headlessui/vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <Dropdown>
    <template #cta>
      <MenuButton
        class="ml-2 bg-content-flight h-full aspect-square rounded-full shadow-md flex justify-center items-center w-12"
      >
        <img class="w-full p-2" src="@/assets/images/logos/logo_white.svg" alt="icon" />
      </MenuButton>
    </template>
    <template #content>
      <MenuItem v-slot="{ active }">
        <RouterLink
          :to="{ name: '' }"
          :class="[
            active ? 'bg-content-base text-white' : 'text-content-base',
            'group flex w-full items-center rounded-md p-2 text-base transition-all duration-150 ease-in-out',
          ]"
        >
          {{ $t('header.account') }}
        </RouterLink>
      </MenuItem>
      <MenuItem v-slot="{ active }">
        <div
          @click="authStore.logout()"
          :class="[
            active ? 'bg-main-base text-white' : 'text-content-base',
            'group flex w-full items-center rounded-md p-2 text-base transition-all duration-150 ease-in-out cursor-pointer',
          ]"
        >
          {{ $t('auth.logout') }}
        </div>
      </MenuItem>
    </template>
  </Dropdown>
</template>
