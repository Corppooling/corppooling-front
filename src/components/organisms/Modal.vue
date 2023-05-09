<script lang="ts" setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    className?: string;
  }>(),
  {
    isOpen: false,
    className: 'max-w-md bg-white',
  }
);

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
}>();
</script>
<template>
  <TransitionRoot appear :show="props.isOpen" as="template">
    <Dialog as="div" class="relative z-50 text-content-base" @close="emit('update:isOpen', false)">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-200 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div class="fixed inset-0 bg-black-base bg-opacity-50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center lg:items-center lg:p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              class="rounded-b-0 flex min-w-full flex-col overflow-hidden rounded-t-3xl ring-1 ring-content-base lg:min-w-fit lg:rounded-2xl"
              :class="props.className"
            >
              <div class="flex w-full justify-end bg-black-base">
                <FontAwesomeIcon
                  icon="times"
                  class="absolute cursor-pointer p-6 text-2xl"
                  @click="emit('update:isOpen', false)"
                />
              </div>
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
