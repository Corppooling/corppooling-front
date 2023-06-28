<script setup lang="ts">
import { Department } from '@/interfaces/department.interface';
import axiosClient from '@/support/axiosClient';
import { computed, ref } from 'vue';
import Dropdown from 'primevue/dropdown';
import { Company } from '@/interfaces/company.interface';
import { useToast } from '@/composables/toast';
import { useConfirm } from 'primevue/useconfirm';
import { i18nGlobal } from '@/support/i18n';
import { useDepartmentStore } from '@/stores/department';

const props = defineProps<{
  department: Department;
  company: Company;
  userId: number;
  disabled?: boolean;
}>();

const confirm = useConfirm();
const { t } = i18nGlobal;
const toast = useToast();
const departmentStore = useDepartmentStore();

interface DepartmentOption {
  name: string;
  code: number;
}

const departmentsOptions = computed<DepartmentOption[]>(() => {
  return departmentStore.departments.map((department: Department) => ({
    name: department.name,
    code: department.id,
  }));
});

const selectedDepartment = ref<number>(props.department.id);
const sessionSelection = ref<number>(props.department.id);

const submitDepartment = (): void => {
  confirm.require({
    header: t('action.update'),
    message: t('account.myManagement.manageDepartments.updateDepartmentUserConfirm'),
    icon: 'pi pi-exclamation-triangle',
    position: 'top',
    acceptLabel: t('action.yes'),
    rejectLabel: t('action.no'),
    accept: async () => {
      await axiosClient
        .put(`/api/users/${props.userId}`, {
          department: `/api/departments/${selectedDepartment.value}`,
        })
        .then(() => {
          toast.success(t('account.myManagement.manageDepartments.updateDepartmentUserSuccess'));
          sessionSelection.value = selectedDepartment.value;
        })
        .catch(() => {
          toast.error();
        });
    },
    reject: () => {
      selectedDepartment.value = sessionSelection.value;
    },
  });
};
</script>

<template>
  <Dropdown
    v-model="selectedDepartment"
    :options="departmentsOptions"
    optionLabel="name"
    optionValue="code"
    :disabled="disabled"
    @change="submitDepartment"
    @click.stop
  />
</template>
