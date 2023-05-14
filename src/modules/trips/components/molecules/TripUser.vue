<script lang="ts" setup>
import ProfileImage from '@/modules/trips/components/atoms/ProfileImage.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Trip } from '@/interfaces/trip.interface';
import { computed } from 'vue';
import { User } from '@/interfaces/user.interface';

const props = defineProps<{
  user: User;
  trip?: Trip;
}>();

const fullName = computed<string>(() => `${props.user.firstname} ${props.user.lastname}`);
</script>

<template>
  <RouterLink
    to=""
    class="flex items-center justify-between rounded p-4 hover:bg-content-flight hover:bg-opacity-25"
  >
    <div class="flex flex-col">
      <span class="text-md font-bold">
        {{ fullName }}
      </span>
      <span class="mt-1 text-sm">{{ user.company.name }}</span>
      <span class="text-xs opacity-40">
        {{ user.department.name }}
      </span>
    </div>
    <div class="flex items-center justify-center">
      <ProfileImage v-if="trip" :trip="trip" />
      <FontAwesomeIcon class="ml-4" icon="chevron-right" />
    </div>
  </RouterLink>
</template>
