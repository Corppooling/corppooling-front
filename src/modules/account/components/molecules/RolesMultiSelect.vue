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

const roles = ref<RoleOption[]>([
  {
    name: 'Administrateur',
    code: Role.ADMIN,
  },
  {
    name: 'Manager',
    code: Role.MANAGER,
  },
  {
    name: 'Utilisateur',
    code: Role.USER,
  },
]);

const selectedRoles = ref<Role[]>(props.roles);

watch(selectedRoles, (newValue) => {
  if (newValue.length === 0) {
    selectedRoles.value = [roles.value[2].code];
  }
});

const submitRole = (): void => {
  confirm.require({
    header: t('action.update'),
    message: 'Êtes-vous sûr de vouloir modifier les droits de cet utilisateur ?',
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
          toast.success('Les droits ont été modifiés avec succès !');
        })
        .catch(() => {
          toast.error();
        });
    },
    reject: () => {
      selectedRoles.value = props.roles;
    },
  });
};
</script>

<template>
  <MultiSelect
    v-model="selectedRoles"
    :options="roles"
    optionLabel="name"
    optionValue="code"
    :disabled="props.disabled"
    @change="submitRole"
    @click.stop
  />
</template>
