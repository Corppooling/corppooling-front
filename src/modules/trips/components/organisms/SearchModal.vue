<script lang="ts" setup>
import Modal from "@/components/organisms/Modal.vue";
import Searchbar from "@/modules/trips/components/organisms/Searchbar.vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();
</script>

<template>
  <Modal
    size="max-w-screen-2xl w-fit"
    :isOpen="props.isOpen"
    @update:isOpen="emit('update:isOpen', $event)"
  >
    <div
      class="w-full h-full px-10 py-14 flex flex-col items-center justify-center"
    >
      <h2 class="font-bold text-3xl pb-14">Où souhaitez-vous aller ?</h2>
      <Searchbar />
    </div>
  </Modal>
</template>
