<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { Trip } from '@/interfaces/trip.interface';
import { actualFullDate } from '@/support/luxon';
import TripInline from '@/modules/trips/components/molecules/TripInline.vue';
import axiosClient from '@/support/axiosClient';
import { useToast } from '@/composables/toast';
import { useConfirm } from 'primevue/useconfirm';
import Button from '@/components/molecules/Button.vue';
import { i18nGlobal } from '@/support/i18n';

const confirm = useConfirm();
const toast = useToast();
const userStore = useUserStore();
await userStore.setUser(true);
const trips = ref<Trip[]>(userStore.user?.trips ?? []);
const { t } = i18nGlobal;

const sortedTrips = computed<Trip[]>(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  return trips.value.sort((a, b) => (a.departure_time > b.departure_time ? 1 : -1));
});

const passedTrips = computed<Trip[]>(() => {
  return sortedTrips.value.filter((trip) => trip.departure_time < actualFullDate());
});
const upcomingTrips = computed<Trip[]>(() => {
  return sortedTrips.value.filter((trip) => trip.departure_time >= actualFullDate());
});

const deleteTrip = async (tripId: number, el: HTMLElement): Promise<void> => {
  confirm.require({
    target: el,
    header: t('action.delete'),
    message: t('account.myTrips.deleteConfirm'),
    icon: 'pi pi-exclamation-triangle',
    position: 'top',
    acceptLabel: t('action.yes'),
    rejectLabel: t('action.no'),
    accept: async () => {
      await axiosClient
        .delete(`/api/trips/${tripId}`)
        .then(() => {
          if (!userStore.user) return;
          userStore.user.trips = userStore.user.trips.filter((t) => t.id !== tripId);
          trips.value = userStore.user.trips;
          toast.info(t('account.myTrips.deleteSuccess'));
        })
        .catch(() => {
          toast.error();
        });
    },
  });
};
</script>

<template>
  <div class="my-8">
    <div class="flex flex-wrap gap-8">
      <div class="w-full">
        <h3 class="mb-8 text-2xl">{{ $t('account.myTrips.upcoming') }}</h3>
        <div
          v-if="upcomingTrips.length > 0"
          class="grid-cols-[repeat(auto-fill, w-full)] grid gap-8 lg:grid-cols-[repeat(auto-fill,650px)]"
        >
          <TripInline
            v-for="trip in upcomingTrips"
            :key="trip.id"
            :trip="trip"
            withDelete
            @delete:trip="deleteTrip(trip.id, $el)"
          />
        </div>
        <div v-else>
          <div class="mb-4 flex items-center">
            <FontAwesomeIcon
              icon="person-walking-luggage"
              class="mr-2 text-2xl"
              style="transform: rotateY(180deg)"
            />
            <p class="text-lg">{{ $t('account.myTrips.noUpcoming') }}</p>
          </div>
          <Button
            :to="{ name: 'trip.add' }"
            class="w-fit"
            icon="fa-plus"
            :text="$t('header.newTrip')"
            iconSize="2xl"
          />
        </div>
      </div>
      <div class="mt-8 w-full">
        <h3 class="mb-8 text-2xl">{{ $t('account.myTrips.archived') }}</h3>
        <div
          v-if="passedTrips.length > 0"
          class="grid-cols-[repeat(auto-fill, w-full)] grid gap-8 lg:grid-cols-[repeat(auto-fill,650px)]"
        >
          <TripInline v-for="trip in passedTrips" :key="trip.id" :trip="trip" />
        </div>
        <div v-else class="flex items-center">
          <FontAwesomeIcon icon="person-walking-luggage" class="mr-2 text-2xl" />
          <p class="text-lg">{{ $t('account.myTrips.noArchived') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
