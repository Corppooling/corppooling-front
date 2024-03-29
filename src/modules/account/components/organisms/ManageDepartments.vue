<script setup lang="ts">
import { Company } from '@/interfaces/company.interface';
import { onMounted, reactive, ref } from 'vue';
import axiosClient from '@/support/axiosClient';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import { i18nGlobal } from '@/support/i18n';
import Column from 'primevue/column';
import { dateClassicFormated } from '@/support/luxon';
import { useToast } from '@/composables/toast';
import { useConfirm } from 'primevue/useconfirm';
import Button from '@/components/molecules/Button.vue';
import Modal from '@/components/organisms/Modal.vue';
import PrimeInput from '@/components/atoms/PrimeInput.vue';
import { useDepartmentStore } from '@/stores/department';

const props = defineProps<{
  company: Company;
}>();

const { t } = i18nGlobal;
const toast = useToast();
const confirm = useConfirm();
const departmentStore = useDepartmentStore();

const filters = ref({
  global: { value: null, matchMode: 'contains' },
});

onMounted(async () => {
  await departmentStore.fetchDepartments();
});

const deleteDepartment = (departmentId: number, el: HTMLElement): void => {
  confirm.require({
    target: el,
    header: t('action.delete'),
    message: t('account.myManagement.manageDepartments.deleteConfirm'),
    icon: 'pi pi-exclamation-triangle',
    position: 'top',
    accept: async () => {
      await axiosClient
        .delete(`/api/departments/${departmentId}`)
        .then(async () => {
          await departmentStore.fetchDepartments();
          toast.success(t('account.myManagement.manageDepartments.deleteSuccess'));
        })
        .catch(() => {
          toast.error(
            t('account.myManagement.manageDepartments.cantDelete'),
            t('account.myManagement.manageDepartments.cantDeleteBody')
          );
        });
    },
  });
};

const showUpdateModal = ref<boolean>(false);
const showAddModal = ref<boolean>(false);
const selectedDepartmentId = ref<number>();

const displayAddModal = (): void => {
  formData.name = '';
  showAddModal.value = true;
};

// eslint-disable-next-line
const displayUpdateModal = (event: any): void => {
  formData.name = event.data.name;
  selectedDepartmentId.value = event.data.id;
  showUpdateModal.value = true;
};

interface departmentDTO {
  name: string;
  company: string;
}

const formData = reactive<departmentDTO>({
  name: '',
  company: `/api/companies/${props.company.id}`,
});

const resetForm = (): void => {
  Object.assign(formData, {
    name: '',
    company_id: props.company.id,
  });
};

const addDepartment = async (): Promise<void> => {
  if (!formData.name.trim()) {
    toast.warning(t('account.myManagement.manageDepartments.addDepartmentName'));
    return;
  }

  await axiosClient
    .post('/api/departments', formData)
    .then(async () => {
      await departmentStore.fetchDepartments();
      toast.success(t('account.myManagement.manageDepartments.addDepartmentSuccess'));
      showAddModal.value = false;
      resetForm();
    })
    .catch(() => {
      toast.error();
    });
};

const updateDepartment = async (): Promise<void> => {
  if (!formData.name.trim()) {
    toast.warning(t('account.myManagement.manageDepartments.addDepartmentName'));
    return;
  }

  await axiosClient
    .put(`/api/departments/${selectedDepartmentId.value}`, {
      name: formData.name,
    })
    .then(async () => {
      await departmentStore.fetchDepartments();
      toast.success(t('account.myManagement.manageDepartments.updateDepartmentSuccess'));
      showUpdateModal.value = false;
      resetForm();
    })
    .catch(() => {
      toast.error();
    });
};
</script>

<template>
  <div>
    <DataTable
      v-model:filters="filters"
      :value="departmentStore.departments"
      paginator
      rowHover
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :totalRecords="departmentStore.departments.length"
      :rows="10"
      :rowsPerPageOptions="[10, 25, 50]"
      responsiveLayout="scroll"
      :rowStyle="'cursor: pointer'"
      :loading="departmentStore.isLoading"
      @rowClick="displayUpdateModal"
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
            <Button
              icon="fa-add"
              :text="t('action.add')"
              bgColor="content-light"
              @click="displayAddModal"
            />
          </div>
        </div>
      </template>
      <template #empty>
        <div class="text-center">
          <FontAwesomeIcon class="mr-2" :icon="['fas', 'frown']" />
          <span>{{ t('account.myManagement.manageDepartments.noResults') }}</span>
        </div>
      </template>
      <Column field="id" header="ID" sortable />
      <Column field="name" :header="t('account.myManagement.manageDepartments.name')" sortable />
      <Column
        field="updated_at"
        :header="t('account.myManagement.manageDepartments.updatedAt')"
        sortable
      >
        <template #body="{ data }">
          <span>{{ dateClassicFormated(data?.updated_at) }}</span>
        </template>
      </Column>
      <Column
        field="created_at"
        :header="t('account.myManagement.manageDepartments.createdAt')"
        sortable
      >
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
  <!--add modal-->
  <Modal
    :title="t('account.myManagement.manageDepartments.addDepartment')"
    :isOpen="showAddModal"
    @update:isOpen="showAddModal = false"
  >
    <form class="flex h-full w-full flex-col p-6">
      <PrimeInput
        id="name"
        :placeholder="t('account.myManagement.manageDepartments.name')"
        class="mb-12 w-full lg:w-96"
      >
        <InputText v-model="formData.name" inputId="name" />
      </PrimeInput>
      <Button :text="t('action.add')" bgColor="content-light" @click="addDepartment" />
    </form>
  </Modal>
  <!--update modal-->
  <Modal
    :title="t('account.myManagement.manageDepartments.updateDepartment')"
    :isOpen="showUpdateModal"
    @update:isOpen="showUpdateModal = false"
  >
    <form class="flex h-full w-full flex-col p-6">
      <PrimeInput
        id="name"
        :placeholder="t('account.myManagement.manageDepartments.name')"
        class="mb-12 w-full lg:w-96"
      >
        <InputText v-model="formData.name" inputId="name" />
      </PrimeInput>
      <Button :text="t('action.update')" bgColor="content-light" @click="updateDepartment" />
    </form>
  </Modal>
</template>
