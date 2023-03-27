<script lang="ts" setup>
import Dropdown from "@/components/organisms/Dropdown.vue";
import { MenuButton, MenuItem } from "@headlessui/vue";
</script>

<template>
  <Dropdown>
    <template #cta>
      <MenuButton
        class="ml-2 bg-content-flight h-full aspect-square rounded-full shadow-md flex justify-center items-center"
      >
        <img
          class="w-full p-2"
          src="@/assets/images/logos/logo_white.svg"
          alt="icon"
        />
      </MenuButton>
    </template>
    <template #content>
      <MenuItem v-slot="{ active }">
        <RouterLink
          :to="{ name: 'login' }"
          :class="[
            active ? 'bg-content-base text-white' : 'text-content-base',
            'group flex w-full items-center rounded-md p-2 text-base transition-all duration-150 ease-in-out',
          ]"
        >
          {{ $t("auth.login") }}
        </RouterLink>
      </MenuItem>
    </template>
  </Dropdown>
</template>
