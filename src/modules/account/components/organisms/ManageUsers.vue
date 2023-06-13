<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axiosClient from '@/support/axiosClient';
import { Company } from '@/interfaces/company.interface';
import { Role, User } from '@/interfaces/user.interface';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import { useRouter } from 'vue-router';
import Column from 'primevue/column';
import RolesMultiSelect from '@/modules/account/components/molecules/RolesMultiSelect.vue';
import { HttpStatusCode } from 'axios';
import { useUserStore } from '@/stores/user';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from '@/composables/toast';

const props = defineProps<{
  company: Company;
}>();

const users = ref<User[]>([]);
const router = useRouter();
const userStore = useUserStore();
const confirm = useConfirm();
const toast = useToast();

const filters = ref({
  global: { value: null, matchMode: 'contains' },
});

const fetchUsers = async (): Promise<void> => {
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
};

onMounted(async () => {
  await fetchUsers();
});

// eslint-disable-next-line
const redirect = (event: any): void => {
  router.push({ name: 'public.profile', params: { id: event.data.id } });
};

const deleteUser = (userId: number, el: HTMLElement): void => {
  confirm.require({
    target: el,
    header: 'Suppression',
    message: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
    icon: 'pi pi-exclamation-triangle',
    position: 'top',
    acceptLabel: 'Oui',
    rejectLabel: 'Non',
    accept: async () => {
      await axiosClient
        .delete(`/api/users/${userId}`)
        .then(async () => {
          await fetchUsers();
          toast.success('Utilisateur supprimé avec succès');
        })
        .catch(() => {
          toast.error();
        });
    },
  });
};

const userHasEnoughRights = (user: User): boolean => {
  return userStore.isAdmin && userStore.user?.id !== user.id && !user.roles.includes(Role.ADMIN);
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
          <RolesMultiSelect
            v-if="userHasEnoughRights(data)"
            :roles="data?.roles"
            :userId="data?.id"
          />
          <RolesMultiSelect v-else :roles="data?.roles" :userId="data?.id" disabled />
        </template>
      </Column>
      <Column field="actions" header="Actions">
        <template #body="{ data }">
          <FontAwesomeIcon
            v-if="userHasEnoughRights(data)"
            icon="trash-can"
            class="mx-auto mr-2 text-xl"
            @click.stop="deleteUser(data?.id, $event.target)"
          />
          <span v-else>Aucune</span>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
