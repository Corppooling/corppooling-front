<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { Trip } from '@/interfaces/trip.interface';
import { actualFullDate } from '@/support/luxon';
import TripInline from '@/modules/trips/components/molecules/TripInline.vue';
import axiosClient from '@/support/axiosClient';
import { useToast } from '@/composables/toast';

import { useConfirm } from 'primevue/useconfirm';

const confirm = useConfirm();
const toast = useToast();
const userStore = useUserStore();
const trips = ref<Trip[]>(userStore.user?.trips ?? []);

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
    header: 'Suppression',
    message: 'Êtes-vous sûr de vouloir supprimer ce trajet ?',
    icon: 'pi pi-exclamation-triangle',
    position: 'top',
    accept: async () => {
      await axiosClient
        .delete(`/api/trips/${tripId}`)
        .then(() => {
          if (!userStore.user) return;
          userStore.user.trips = userStore.user.trips.filter((t) => t.id !== tripId);
          trips.value = userStore.user.trips;
          toast.info('Votre trajet a bien été supprimé');
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
    <div v-if="trips.length > 0" class="flex flex-wrap gap-8">
      <div class="w-full">
        <h3 class="mb-8 text-2xl">Trajets à venir</h3>
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
      </div>
      <div class="mt-8 w-full">
        <h3 class="mb-8 text-2xl">Trajets archivés</h3>
        <div
          v-if="passedTrips.length > 0"
          class="grid-cols-[repeat(auto-fill, w-full)] grid gap-8 lg:grid-cols-[repeat(auto-fill,650px)]"
        >
          <TripInline v-for="trip in passedTrips" :key="trip.id" :trip="trip" />
        </div>
      </div>
    </div>
    <template v-else></template>
  </div>
</template>

<style lang="scss">
.p-confirm-dialog-accept {
  color: rgb(var(--color-main-base)) !important;

  &:hover {
    color: rgb(var(--color-white)) !important;
  }
}
</style>
