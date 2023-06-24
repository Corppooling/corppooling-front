<script setup lang="ts">
import { Company } from '@/interfaces/company.interface';
import { Department } from '@/interfaces/department.interface';
import { onMounted, ref } from 'vue';
import axiosClient from '@/support/axiosClient';
import { HttpStatusCode } from 'axios';
import router from '@/router';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import { i18nGlobal } from '@/support/i18n';
import Column from 'primevue/column';
import { dateClassicFormated } from '@/support/luxon';
import { useToast } from '@/composables/toast';
import { useConfirm } from 'primevue/useconfirm';
import Button from '@/components/molecules/Button.vue';

const props = defineProps<{
  company: Company;
}>();

const { t } = i18nGlobal;
const toast = useToast();
const confirm = useConfirm();
const departments = ref<Department[]>([]);

const filters = ref({
  global: { value: null, matchMode: 'contains' },
});

const fetchDepartments = async (): Promise<void> => {
  await axiosClient
    .get('/api/departments', {
      params: {
        'company.id': props.company.id,
      },
    })
    .then((res) => {
      departments.value = res.data['hydra:member'];
    })
    .catch(() => {
      router.push({ name: 'error', params: { code: HttpStatusCode.InternalServerError } });
    });
};

onMounted(async () => {
  await fetchDepartments();
});

const deleteDepartment = (departmentId: number, el: HTMLElement): void => {
  confirm.require({
    target: el,
    header: t('action.delete'),
    message: 'Êtes-vous sûr de vouloir supprimer ce pôle ?',
    icon: 'pi pi-exclamation-triangle',
    position: 'top',
    accept: async () => {
      await axiosClient
        .delete(`/api/departments/${departmentId}`)
        .then(async () => {
          await fetchDepartments();
          toast.success('Le pôle a bien été supprimé');
        })
        .catch(() => {
          toast.error('Suppression impossible', 'Le pôle est lié à des utilisateurs');
        });
    },
  });
};

// eslint-disable-next-line
const displayUpdatePopup = (event: any): void => {
  //TODO
};

// eslint-disable-next-line
const displayAddPopup = (event: any): void => {
  //TODO
};
</script>

<template>
  <div>
    <DataTable
      v-model:filters="filters"
      :value="departments"
      paginator
      rowHover
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :totalRecords="departments.length"
      :rows="10"
      :rowsPerPageOptions="[10, 25, 50]"
      responsiveLayout="scroll"
      :rowStyle="'cursor: pointer'"
      @rowClick="displayUpdatePopup"
    >
      <template #header>
        <div class="flex flex-wrap justify-between">
          <div class="m-2">
            <span class="flex items-center">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                :placeholder="t('account.myManagement.search')"
              />
            </span>
          </div>
          <div class="m-2">
            <Button icon="fa-add" text="Ajouter" bgColor="content-light" @click="displayAddPopup" />
          </div>
        </div>
      </template>
      <template #empty>
        <div class="text-center">
          <FontAwesomeIcon class="mr-2" :icon="['fas', 'frown']" />
          <span>Aucun pôle ne correspond à votre recherche</span>
        </div>
      </template>
      <Column field="id" header="ID" sortable />
      <Column field="name" header="Nom" sortable />
      <Column field="updated_at" header="Modifié le" sortable>
        <template #body="{ data }">
          <span>{{ dateClassicFormated(data?.updated_at) }}</span>
        </template>
      </Column>
      <Column field="created_at" header="Créé le" sortable>
        <template #body="{ data }">
          <span>{{ dateClassicFormated(data?.created_at) }}</span>
        </template>
      </Column>
      <Column field="actions" :header="t('account.myManagement.actions')">
        <template #body="{ data }">
          <FontAwesomeIcon
            icon="trash-can"
            class="mx-auto mr-2 text-xl"
            @click.stop="deleteDepartment(data?.id, $event.target)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
