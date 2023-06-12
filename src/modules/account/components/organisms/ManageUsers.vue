<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axiosClient from '@/support/axiosClient';
import { Company } from '@/interfaces/company.interface';
import { User } from '@/interfaces/user.interface';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import { useRouter } from 'vue-router';
import Column from 'primevue/column';
import RolesMultiSelect from '@/modules/account/components/molecules/RolesMultiSelect.vue';
import { HttpStatusCode } from 'axios';

const props = defineProps<{
  company: Company;
}>();

const users = ref<User[]>([]);
const router = useRouter();

const filters = ref({
  global: { value: null, matchMode: 'contains' },
});

onMounted(async () => {
  await axiosClient
    .get('/api/users', {
      params: {
        'company.id': props.company.id,
      },
    })
    .then((res) => {
      users.value = res.data['hydra:member'];
    })
    .catch(() => {
      router.push({ name: 'error', params: { code: HttpStatusCode.InternalServerError } });
    });
});

// eslint-disable-next-line
const redirect = (event: any): void => {
  router.push({ name: 'public.profile', params: { id: event.data.id } });
};
</script>

<template>
  <div>
    <DataTable
      v-model:filters="filters"
      :value="users"
      paginator
      rowHover
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :totalRecords="users.length"
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
          <span>Aucun utilisateur ne correspond à votre recherche</span>
        </div>
      </template>
      <Column field="id" header="ID" sortable />
      <Column field="firstname" header="Prénom" sortable />
      <Column field="lastname" header="Nom" sortable />
      <Column field="email" header="Email" sortable>
        <template #body="{ data }">
          <a :href="`mailto:${data?.email}`">{{ data?.email }}</a>
        </template>
      </Column>
      <!-- <Column field="phone" header="Téléphone" sortable />-->
      <Column field="department" header="Pôle" sortable>
        <template #body="{ data }">
          <span>{{ data?.department?.name }}</span>
        </template>
      </Column>
      <Column field="roles" header="Rôles">
        <template #body="{ data }">
          <RolesMultiSelect :roles="data?.roles" />
        </template>
      </Column>
      <Column field="actions" header="Actions">
        <template>
          <FontAwesomeIcon icon="trash-can" class="mx-auto mr-2 text-xl" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
