<script lang="ts" setup>
import { type Trip, TripType } from '@/interfaces/trip.interface';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Button from '@/components/molecules/Button.vue';
import { dateFormated } from '@/support/luxon';
import ProfileImage from '@/modules/trips/components/atoms/ProfileImage.vue';
import { bgTypeColor } from '@/composables/typeColor';

const props = defineProps<{
  trip: Trip;
}>();
</script>

<template>
  <div
    class="flex flex-col p-1 rounded-2xl shadow-md hover:shadow-lg w-fit"
    :class="bgTypeColor(props.trip.type)"
  >
    <div class="w-full h-14 flex justify-between items-center px-4">
      <p
        v-html="
          props.trip.type === TripType.DRIVER
            ? $t('trip.searchPassengers')
            : $t('trip.searchDriver')
        "
      />
      <FontAwesomeIcon
        :icon="props.trip.type === TripType.DRIVER ? 'fa-car' : 'fa-thumbs-up'"
        class="ml-2"
        size="2xl"
      />
    </div>
    <div class="bg-white p-6 rounded-2xl max-w-[350px] sm:w-[350px]">
      <div class="flex justify-around">
        <div class="flex flex-col">
          <div class="py-1 whitespace-nowrap">
            <FontAwesomeIcon class="w-4" icon="fa-calendar" />
            <span class="ml-1">{{ dateFormated(props.trip.departure_time) }}</span>
          </div>
          <div class="py-1">
            <FontAwesomeIcon class="w-4" icon="fa-flag-checkered" />
            <span class="ml-1">{{ props.trip.departure_location }}</span>
          </div>
          <div class="py-1">
            <FontAwesomeIcon class="w-4" icon="fa-map-marker-alt" />
            <span class="ml-1">{{ props.trip.arrival_location }}</span>
          </div>
          <div class="py-1">
            <FontAwesomeIcon class="w-4" icon="fa-users" />
            <span class="ml-1">
              {{
                $t('trip.passenger', {
                  count: props.trip.available_seats,
                })
              }}
            </span>
          </div>
        </div>
        <div class="hidden sm:flex flex-col justify-center items-center ml-4">
          <ProfileImage class="mb-2" :trip="props.trip" />
          <div class="flex text-center">
            <span>
              {{ props.trip.announcer.firstname }}
              {{ props.trip.announcer.lastname }}
            </span>
          </div>
        </div>
      </div>
      <div class="pt-6">
        <Button
          :to="{ name: 'trip.show', params: { id: props.trip.id } }"
          :text="$t('trip.join')"
          icon="fa-location-arrow"
          iconClass="rotate-45"
          bgColor="content-light"
          iconPosition="right"
        />
      </div>
    </div>
  </div>
</template>
