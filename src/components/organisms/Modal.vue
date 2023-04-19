<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    className?: string;
  }>(),
  {
    isOpen: false,
    className: "max-w-md bg-white",
  }
);

const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();
</script>
<template>
  <TransitionRoot appear :show="props.isOpen" as="template">
    <Dialog
      as="div"
      @close="emit('update:isOpen', false)"
      class="relative z-50 text-content-base"
    >
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
        <div
          class="flex min-h-full items-end lg:items-center justify-center lg:p-4"
        >
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
              class="min-w-full lg:min-w-fit rounded-t-3xl rounded-b-0 lg:rounded-2xl overflow-hidden flex flex-col ring-1 ring-content-base"
              :class="props.className"
            >
              <div class="w-full flex justify-end bg-black-base">
                <font-awesome-icon
                  icon="times"
                  class="absolute p-6 text-2xl cursor-pointer"
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
