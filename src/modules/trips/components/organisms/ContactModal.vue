<script lang="ts" setup>
import { ref } from 'vue';
import Modal from '@/components/organisms/Modal.vue';
import Button from '@/components/molecules/Button.vue';
import Textarea from 'primevue/textarea';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
}>();

const message = ref<string>('');

const sendMessage = (): void => {
  message.value = '';
  emit('update:isOpen', false);
};
</script>

<template>
  <Modal
    class="w-64"
    :title="$t('contact.sendMessage')"
    :isOpen="props.isOpen"
    @update:isOpen="emit('update:isOpen', $event)"
  >
    <form class="flex h-full w-full flex-col items-center justify-center p-6">
      <span class="p-float-label my-4 w-full">
        <Textarea v-model="message" class="w-full lg:w-[40rem]" rows="5" />
        <label>{{ $t('contact.yourMessage') }}</label>
      </span>
      <Button
        bgColor="content-light"
        :text="$t('contact.send')"
        class="mr-auto px-10"
        @click="sendMessage"
      />
    </form>
  </Modal>
</template>

<style lang="scss">
.p-inputtextarea {
  border: 1px solid #d9d9d9 !important;
}
</style>
