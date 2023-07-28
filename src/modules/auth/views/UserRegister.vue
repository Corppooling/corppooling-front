<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { Company } from '@/interfaces/company.interface';
import axiosClient from '@/support/axiosClient';
import { useRoute, useRouter } from 'vue-router';
import { HttpStatusCode } from 'axios';
import { Department } from '@/interfaces/department.interface';
import Spinner from '@/components/atoms/Spinner.vue';
import PrimeInput from '@/components/atoms/PrimeInput.vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { i18nGlobal } from '@/support/i18n';
import { useDepartmentStore } from '@/stores/department';
import Dropdown from 'primevue/dropdown';
import Button from '@/components/molecules/Button.vue';

const route = useRoute();
const router = useRouter();
const { t } = i18nGlobal;
const company = ref<Company>();
const departmentStore = useDepartmentStore();
const authCode = ref<string>(route.params.authCode as string);
const isLoading = ref<boolean>(false);

const fetchCompany = async () => {
  await axiosClient.get('/api/companies', { params: { auth_code: authCode.value } }).then((res) => {
    if (res.data['hydra:member'].length !== 1) {
      router.push({
        name: 'error',
        params: {
          code: HttpStatusCode.NotFound,
        },
      });
    } else {
      company.value = res.data['hydra:member'][0];
    }
  });
};

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

onMounted(async () => {
  isLoading.value = true;
  await fetchCompany();
  await departmentStore.fetchDepartments();
  isLoading.value = false;
});

interface formDataDTO {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  departmentId?: number;
}

const formData = reactive<formDataDTO>({
  firstname: undefined,
  lastname: undefined,
  email: undefined,
  phone: undefined,
  departmentId: undefined,
  password: undefined,
  confirmPassword: undefined,
});

const onSubmit = (): void => {};
</script>

<template>
  <div v-if="!isLoading && company" class="mx-auto w-full max-w-screen-md px-4 py-14 md:p-14">
    <div class="mb-3 flex flex-wrap items-center justify-between gap-4">
      <h1 class="text-4xl">Inscription</h1>
      <div class="flex items-center">
        <img class="mr-3 aspect-auto w-10" :src="company.logo" :alt="company.name" />
        <span class="text-2xl">{{ company.name }}</span>
      </div>
    </div>
    <form class="my-10">
      <div class="flex flex-col md:flex-row md:gap-4">
        <PrimeInput id="firstname" class="mb-10 w-full" placeholder="Prénom">
          <InputText v-model="formData.firstname" type="text" />
        </PrimeInput>
        <PrimeInput id="lastname" class="mb-10 w-full" placeholder="Nom">
          <InputText v-model="formData.lastname" type="text" />
        </PrimeInput>
      </div>
      <PrimeInput id="email" class="mb-10 w-full" placeholder="Email">
        <InputText v-model="formData.email" type="email" />
      </PrimeInput>
      <PrimeInput id="phone" class="mb-10 w-full" placeholder="Téléphone">
        <InputText v-model="formData.phone" type="tel" />
      </PrimeInput>
      <Dropdown
        v-model="formData.departmentId"
        class="mb-10 w-full"
        :options="departmentsOptions"
        optionLabel="name"
        optionValue="code"
        placeholder="Pôle"
      />
      <PrimeInput id="password" class="mb-10 w-full" placeholder="Mot de passe">
        <Password
          v-model="formData.password"
          inputId="password"
          toggleMask
          promptLabel="Mot de passe"
          :weakLabel="t('account.myProfile.canDoBetter')"
          :mediumLabel="t('account.myProfile.canDoBetter')"
          :strongLabel="t('account.myProfile.greatPassword')"
        />
      </PrimeInput>
      <PrimeInput id="confirmPassword" class="mb-10 w-full" placeholder="Confirmer le mot de passe">
        <Password
          v-model="formData.confirmPassword"
          inputId="confirmPassword"
          toggleMask
          promptLabel="Confirmer le mot de passe"
          :weakLabel="t('account.myProfile.canDoBetter')"
          :mediumLabel="t('account.myProfile.canDoBetter')"
          :strongLabel="t('account.myProfile.greatPassword')"
        />
      </PrimeInput>
      <Button :fn="onSubmit" bgColor="content-light" class="w-full" text="Créer mon compte" />
    </form>
  </div>
  <div
    v-else
    class="flex h-[calc(100vh-14.1rem)] items-center justify-center md:h-[calc(100vh-12.9rem)]"
  >
    <Spinner :size="8" color="content-base" />
  </div>
</template>

<style lang="scss">
.p-inputtext {
  @apply w-full;
}

.p-password {
  @apply w-full;

  .p-password-input {
    @apply w-full;
  }
}

.p-dropdown {
  @apply rounded-2xl;
}
</style>
