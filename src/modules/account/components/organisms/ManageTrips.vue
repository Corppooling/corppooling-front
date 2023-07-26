<script setup lang="ts">
import { ref } from 'vue';
import { Trip, TripType } from '@/interfaces/trip.interface';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Column from 'primevue/column';
import { useRouter } from 'vue-router';
import { dateFormated } from '@/support/luxon';
import { bgTypeColor } from '@/support/typeColor';
import axiosClient from '@/support/axiosClient';
import { useConfirm } from 'primevue/useconfirm';
import { i18nGlobal } from '@/support/i18n';
import { useToast } from '@/composables/toast';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const confirm = useConfirm();
const toast = useToast();
const userStore = useUserStore();
const { t } = i18nGlobal;

const props = defineProps<{
  trips: Trip[];
}>();

const sortedTrips = ref<Trip[]>(props.trips);
sortedTrips.value.sort((a, b) => (a.departure_time < b.departure_time ? 1 : -1));

const filters = ref({
  global: { value: null, matchMode: 'contains' },
});

// eslint-disable-next-line
const redirect = (event: any): void => {
  router.push({ name: 'trip.show', params: { id: event.data.id } });
};

const tripIsPassed = (departureTime: string): boolean => {
  return new Date(departureTime) < new Date(Date.now());
};

const deleteTrip = (tripId: number, el: HTMLElement): void => {
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
          sortedTrips.value = sortedTrips.value.filter((t) => t.id !== tripId);
          userStore.setUser(true);
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
  <div>
    <DataTable
      v-model:filters="filters"
      :value="sortedTrips"
      paginator
      rowHover
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :totalRecords="sortedTrips.length"
      :rows="10"
      :rowsPerPageOptions="[10, 25, 50]"
      responsiveLayout="scroll"
      :rowStyle="'cursor: pointer'"
      @rowClick="redirect"
    >
      <template #header>
        <div class="flex flex-wrap">
          <div class="m-2">
            <span class="flex items-center">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                :placeholder="$t('account.myManagement.search')"
              />
            </span>
          </div>
        </div>
      </template>
      <template #empty>
        <div class="text-center">
          <FontAwesomeIcon class="mr-2" :icon="['fas', 'frown']" />
          <span>{{ $t('account.myManagement.manageTrips.noResults') }}</span>
        </div>
      </template>
      <Column field="id" header="ID" sortable />
      <Column field="type" :header="t('account.myManagement.manageTrips.type')" :sortable="true">
        <template #body="{ data }">
          <span
            class="rounded p-1"
            :class="bgTypeColor(data?.type)"
            v-html="
              data?.type === TripType.DRIVER ? t('trip.filter.driver') : t('trip.filter.passenger')
            "
          />
        </template>
      </Column>
      <Column field="departure_location" :header="t('trip.filter.departure')" sortable />
      <Column field="arrival_location" :header="t('trip.filter.arrival')" sortable />
      <Column
        field="departure_time"
        :header="t('account.myManagement.manageTrips.departureTime')"
        sortable
      >
        <template #body="{ data }">
          <span :class="{ 'text-error-base': tripIsPassed(data?.departure_time) }">
            {{ dateFormated(data?.departure_time) }}
          </span>
        </template>
      </Column>
      <Column
        field="members"
        :header="t('account.myManagement.manageTrips.membersNumber')"
        sortable
      >
        <template #body="{ data }">
          <span>{{ data?.members.length }}</span>
        </template>
      </Column>
      <Column field="actions" :header="t('account.myManagement.actions')">
        <template #body="{ data }">
          <FontAwesomeIcon
            v-if="!tripIsPassed(data?.departure_time)"
            icon="trash-can"
            class="mx-auto mr-2 text-xl"
            @click.stop="deleteTrip(data?.id, $event.target)"
          />
          <span v-else>{{ t('account.myManagement.noActions') }}</span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped lang="scss">
::v-deep(.p-paginator) {
  justify-content: end;
}
</style>
