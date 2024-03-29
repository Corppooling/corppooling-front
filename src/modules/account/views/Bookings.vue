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
const trips = ref<Trip[]>(userStore.user?.reservations ?? []);
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
    message: t('account.myBookings.deleteConfirm'),
    icon: 'pi pi-exclamation-triangle',
    position: 'top',
    acceptLabel: t('action.yes'),
    rejectLabel: t('action.no'),
    accept: async () => {
      await axiosClient
        .delete(`/api/reservations`, {
          data: {
            userId: userStore.user?.id,
            tripId: tripId,
          },
        })
        .then(() => {
          if (!userStore.user) return;
          userStore.user.reservations = userStore.user.reservations.filter((t) => t.id !== tripId);
          trips.value = userStore.user.reservations;
          toast.info(t('account.myBookings.deleteSuccess'));
        })
        .catch(() => {
          toast.error();
        });
    },
  });
};
</script>

<template>
  <div class="flex flex-wrap gap-8">
    <div class="w-full">
      <h3 class="mb-8 text-2xl">{{ $t('account.myBookings.upcoming') }}</h3>
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
            icon="suitcase"
            class="mr-2 text-2xl"
            style="transform: rotateY(180deg)"
          />
          <p class="text-lg">{{ $t('account.myBookings.noUpcoming') }}</p>
        </div>
        <Button
          :to="{ name: 'trips' }"
          class="w-fit"
          icon="fa-search"
          :text="$t('header.search')"
          iconSize="2xl"
        />
      </div>
    </div>
    <div class="mt-8 w-full">
      <h3 class="mb-8 text-2xl">{{ $t('account.myBookings.archived') }}</h3>
      <div
        v-if="passedTrips.length > 0"
        class="grid-cols-[repeat(auto-fill, w-full)] grid gap-8 lg:grid-cols-[repeat(auto-fill,650px)]"
      >
        <TripInline v-for="trip in passedTrips" :key="trip.id" :trip="trip" />
      </div>
      <div v-else class="flex items-center">
        <FontAwesomeIcon icon="suitcase-rolling" class="mr-2 text-2xl" />
        <p class="text-lg">{{ $t('account.myBookings.noArchived') }}</p>
      </div>
    </div>
  </div>
</template>
