<script setup lang="ts">
import { ref } from 'vue';
import ContactModal from '@/modules/trips/components/organisms/ContactModal.vue';
import { User } from '@/interfaces/user.interface';

const displayContactModal = ref<boolean>(false);

defineProps<{
  user: User;
}>();
</script>

<template>
  <div
    class="mb-4 flex cursor-pointer items-center rounded p-4 hover:bg-content-flight hover:bg-opacity-25"
    @click="displayContactModal = true"
  >
    <FontAwesomeIcon class="mr-4 text-xl" icon="fa-regular fa-comments" />
    <span>
      {{ $t('trip.contact', { name: user.firstname }) }}
    </span>
  </div>
  <ContactModal
    :isOpen="displayContactModal"
    @update:isOpen="(value) => (displayContactModal = value)"
  />
</template>
