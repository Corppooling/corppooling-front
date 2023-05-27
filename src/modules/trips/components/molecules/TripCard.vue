<script lang="ts" setup>
import { type Trip, TripType } from '@/interfaces/trip.interface';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Button from '@/components/molecules/Button.vue';
import { dateFormated } from '@/support/luxon';
import ProfileImage from '@/modules/trips/components/atoms/ProfileImage.vue';
import { bgTypeColor } from '@/composables/typeColor';
import { i18nGlobal } from '@/support/i18n';

const { t } = i18nGlobal;

const props = defineProps<{
  trip: Trip;
}>();
</script>

<template>
  <div
    class="flex w-fit flex-col rounded-2xl p-1 shadow-md hover:shadow-lg"
    :class="bgTypeColor(props.trip.type)"
  >
    <div class="flex h-14 w-full items-center justify-between px-4">
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
    <div class="max-w-[350px] rounded-2xl bg-white p-6 sm:w-[350px]">
      <div class="flex justify-around">
        <div class="flex flex-col">
          <div class="whitespace-nowrap py-1">
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
        <div class="ml-4 hidden flex-col items-center justify-center sm:flex">
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
