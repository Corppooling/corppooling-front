<script setup lang="ts">
import { Role } from '@/interfaces/user.interface';
import { ref, watch } from 'vue';
import MultiSelect from 'primevue/multiselect';
import axiosClient from '@/support/axiosClient';
import { useConfirm } from 'primevue/useconfirm';
import { i18nGlobal } from '@/support/i18n';
import { useToast } from '@/composables/toast';

const props = defineProps<{
  roles: Role[];
  userId: number;
  disabled?: boolean;
}>();

const confirm = useConfirm();
const { t } = i18nGlobal;
const toast = useToast();

interface RoleOption {
  name: string;
  code: Role;
}

const rolesOptions = ref<RoleOption[]>([
  {
    name: t('account.myManagement.userRights.admin'),
    code: Role.ADMIN,
  },
  {
    name: t('account.myManagement.userRights.manager'),
    code: Role.MANAGER,
  },
  {
    name: t('account.myManagement.userRights.user'),
    code: Role.USER,
  },
]);

const selectedRoles = ref<Role[]>(props.roles);
const sessionSelection = ref<Role[]>(props.roles);

watch(selectedRoles, (newValue) => {
  if (newValue.length === 0) {
    selectedRoles.value = [rolesOptions.value[2].code];
  }
});

const submitRole = (): void => {
  confirm.require({
    header: t('action.update'),
    message: t('account.myManagement.userRights.confirmUpdate'),
    icon: 'pi pi-exclamation-triangle',
    position: 'top',
    acceptLabel: t('action.yes'),
    rejectLabel: t('action.no'),
    accept: async () => {
      await axiosClient
        .put(`/api/users/${props.userId}`, {
          roles: selectedRoles.value,
        })
        .then(() => {
          toast.success(t('account.myManagement.userRights.updateSuccess'));
          sessionSelection.value = selectedRoles.value;
        })
        .catch(() => {
          toast.error();
        });
    },
    reject: () => {
      selectedRoles.value = sessionSelection.value;
    },
  });
};
</script>

<template>
  <MultiSelect
    v-model="selectedRoles"
    :options="rolesOptions"
    optionLabel="name"
    optionValue="code"
    :disabled="props.disabled"
    @change="submitRole"
    @click.stop
  />
</template>
