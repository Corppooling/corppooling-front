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
        <font-awesome-icon
          size="xl"
          class="text-white"
          icon="fa-regular fa-user"
        />
      </MenuButton>
    </template>
    <template #content>
      <MenuItem v-slot="{ active }">
        <button
          :class="[
            active ? 'bg-main-base text-white' : 'text-content-base',
            'group flex w-full items-center rounded-md p-2 text-base transition-all duration-150 ease-in-out',
          ]"
        >
          {{ $t("header.login") }}
        </button>
      </MenuItem>
      <MenuItem v-slot="{ active }">
        <button
          :class="[
            active ? 'bg-main-base text-white' : 'text-content-base',
            'group flex w-full items-center rounded-md p-2 text-base transition-all duration-150 ease-in-out',
          ]"
        >
          {{ $t("header.register") }}
        </button>
      </MenuItem>
    </template>
  </Dropdown>
</template>
