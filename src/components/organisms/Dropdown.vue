<script lang="ts" setup>
import { Menu, MenuItems } from '@headlessui/vue';

const props = withDefaults(
  defineProps<{
    class?: string;
  }>(),
  {
    class: 'w-56 p-2',
  }
);
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <slot name="cta" />
    <transition
      enterActiveClass="transition duration-100 ease-out"
      enterFromClass="transform scale-95 opacity-0"
      enterToClass="transform scale-100 opacity-100"
      leaveActiveClass="transition duration-75 ease-in"
      leaveFromClass="transform scale-100 opacity-100"
      leaveToClass="transform scale-95 opacity-0"
    >
      <MenuItems
        :class="props.class"
        class="absolute right-0 mt-6 origin-top-right rounded-md bg-white p-2 shadow-md ring-1 ring-content-glight"
      >
        <slot name="content" />
      </MenuItems>
    </transition>
  </Menu>
</template>
