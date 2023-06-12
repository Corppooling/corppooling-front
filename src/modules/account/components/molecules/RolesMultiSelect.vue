<script setup lang="ts">
import { Role } from '@/interfaces/user.interface';
import { ref, watch } from 'vue';
import MultiSelect from 'primevue/multiselect';

const props = defineProps<{
  roles: Role[];
}>();

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
</script>

<template>
  <MultiSelect
    v-model="selectedRoles"
    :options="roles"
    optionLabel="name"
    optionValue="code"
    @click.stop
  />
</template>
