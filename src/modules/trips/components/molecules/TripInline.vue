<script lang="ts" setup>
import { type Trip, TripType } from '@/interfaces/trip.interface';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Button from '@/components/molecules/Button.vue';
import { dateFormated } from '@/support/luxon';
import { bgTypeColor } from '@/composables/typeColor';
import ProfileImage from '@/modules/trips/components/atoms/ProfileImage.vue';
import { i18nGlobal } from '@/support/i18n';

const { t } = i18nGlobal;

const props = defineProps<{
  trip: Trip;
  withDelete?: boolean;
}>();

const emit = defineEmits<{
  (e: 'delete:trip'): void;
}>();
</script>

<template>
  <div
    class="flex w-full overflow-hidden rounded-2xl p-1 shadow-md hover:shadow-lg"
    :class="bgTypeColor(props.trip.type)"
  >
    <div class="relative flex w-full flex-col justify-between rounded-2xl bg-white p-6 sm:flex-row">
      <div
        v-if="props.withDelete"
        class="absolute right-0 top-0 rounded-bl-2xl bg-opacity-40 p-3"
        :class="bgTypeColor(props.trip.type)"
      >
        <FontAwesomeIcon
          class="mx-1 cursor-pointer text-xl text-error-base"
          icon="fa-trash-can"
          @click="emit('delete:trip')"
        />
      </div>
      <div class="ml-4 hidden flex-col items-center justify-center sm:flex">
        <ProfileImage class="mb-2" :trip="props.trip" />
        <div class="flex text-center">
          <span>
            {{ props.trip.announcer.firstname }}
            {{ props.trip.announcer.lastname }}
          </span>
        </div>
      </div>
      <div class="flex flex-col justify-between sm:w-1/3">
        <div class="py-1">
          <FontAwesomeIcon class="w-4" icon="fa-flag-checkered" />
          <span class="ml-1">{{ props.trip.departure_location }}</span>
        </div>
        <div class="py-1">
          <FontAwesomeIcon class="w-4" icon="fa-map-marker-alt" />
          <span class="ml-1">{{ props.trip.arrival_location }}</span>
        </div>
      </div>
      <div class="flex flex-col justify-between sm:w-1/3">
        <div class="whitespace-nowrap py-1">
          <FontAwesomeIcon class="w-4" icon="fa-calendar" />
          <span class="ml-1">{{ dateFormated(props.trip.departure_time) }}</span>
        </div>
        <div class="py-1">
          <FontAwesomeIcon class="w-4" icon="fa-users" />
          <span v-if="trip.type === TripType.DRIVER && props.trip.available_seats" class="ml-1">
            {{
              `${props.trip.members.length}/${t('trip.passenger', {
                count: props.trip.available_seats + 1,
              })}`
            }}
          </span>
          <span v-else class="ml-1">
            {{
              $t('trip.passenger', {
                count: props.trip.members.length + 1,
              })
            }}
          </span>
        </div>
      </div>
    </div>
    <div class="mx-4 flex !w-14 flex-col items-center justify-between">
      <FontAwesomeIcon
        :icon="props.trip.type === TripType.DRIVER ? 'fa-car' : 'fa-thumbs-up'"
        size="2xl"
        class="mt-2"
      />
      <Button
        :to="{ name: 'trip.show', params: { id: props.trip.id } }"
        icon="fa-location-arrow"
        iconClass="rotate-45"
        bgColor="content-light"
        class="mb-2"
      />
    </div>
  </div>
</template>
