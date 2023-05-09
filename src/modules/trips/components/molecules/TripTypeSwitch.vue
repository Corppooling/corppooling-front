<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Switch } from '@headlessui/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { TripType } from '@/interfaces/trip.interface';

const props = withDefaults(
  defineProps<{
    type?: TripType;
  }>(),
  {
    type: TripType.PASSENGER,
  }
);

const emit = defineEmits<{
  (event: 'update:type', value: TripType): void;
}>();

const booleanType = ref<boolean>(props.type === TripType.PASSENGER);
const stringType = ref<TripType>(props.type);

watch(booleanType, (booleanType) => {
  booleanType ? (stringType.value = TripType.PASSENGER) : (stringType.value = TripType.DRIVER);

  emit('update:type', stringType.value);
});
</script>

<template>
  <Switch
    v-model="booleanType"
    :class="booleanType ? 'bg-content-glight text-content-glight' : 'bg-main-base text-main-base'"
    class="relative inline-flex h-8 w-16 items-center rounded-full shadow-md"
  >
    <span
      :class="booleanType ? 'translate-x-9' : 'translate-x-1'"
      class="flex h-6 w-6 transform items-center justify-center rounded-full bg-white transition"
    >
      <FontAwesomeIcon :icon="booleanType ? 'fa-thumbs-up' : 'fa-car'" />
    </span>
  </Switch>
</template>
