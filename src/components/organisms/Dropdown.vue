<script lang="ts" setup>
import { Menu, MenuItems } from "@headlessui/vue";

const props = withDefaults(
  defineProps<{
    class?: string;
  }>(),
  {
    class: "w-56 p-2",
  }
);
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <slot name="cta" />
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        :class="props.class"
        class="absolute right-0 mt-6 origin-top-right bg-white rounded-md p-2 shadow-md ring-1 ring-content-glight"
      >
        <slot name="content" />
      </MenuItems>
    </transition>
  </Menu>
</template>
