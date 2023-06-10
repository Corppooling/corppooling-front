<script setup lang="ts">
import { Company } from '@/interfaces/company.interface';
import PrimeInput from '@/components/atoms/PrimeInput.vue';
import InputText from 'primevue/inputtext';
import { reactive, ref } from 'vue';
import Button from '@/components/molecules/Button.vue';
import { i18nGlobal } from '@/support/i18n';
import { useToast } from '@/composables/toast';
import { useUserStore } from '@/stores/user';
import axiosClient from '@/support/axiosClient';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
  company: Company;
}>();

const loading = ref<boolean>(false);
const { t } = i18nGlobal;
const toast = useToast();
const userStore = useUserStore();

interface FormDataDTO {
  name: string;
  siren: string;
  auth_code: string;
  logo: string;
}

const formData = reactive<FormDataDTO>({
  name: props.company.name,
  siren: props.company.siren,
  auth_code: props.company.auth_code,
  logo: props.company.logo,
});

const resetForm = async (refreshUser = false): Promise<void> => {
  if (refreshUser) {
    await userStore.setUser(true);
  } else {
    toast.info('Champs réinitialisés');
  }

  const company: Company | undefined = userStore.user?.company;

  Object.assign(formData, {
    name: company?.name ?? props.company.name,
    siren: company?.siren ?? props.company.siren,
    auth_code: company?.auth_code ?? props.company.auth_code,
    logo: company?.logo ?? props.company.logo,
  });
};

const onSubmit = async (): Promise<void> => {
  if (
    !formData.name?.trim() ||
    !formData.siren?.trim() ||
    !formData.auth_code?.trim() ||
    !formData.logo?.trim()
  ) {
    toast.warning(t('form.empties'));
    return;
  }

  loading.value = true;

  await axiosClient
    .put(`api/companies/${props.company.id}`, formData)
    .then(async () => {
      await resetForm(true);
      toast.success('Votre entreprise a bien été modifiée');
    })
    .catch(async () => {
      await resetForm();
      toast.error();
    });

  loading.value = false;
};
</script>

<template>
  <div v-if="props.company" class="w-full xl:w-96">
    <div class="flex justify-end">
      <span class="cursor-pointer p-2" @click="resetForm()">
        <FontAwesomeIcon
          size="lg"
          icon="arrows-rotate"
          class="text-content-base opacity-40 hover:opacity-100"
        />
      </span>
    </div>
    <form class="pt-4">
      <PrimeInput id="name" class="mb-10 w-full" placeholder="Nom">
        <InputText v-model="formData.name" type="text" />
      </PrimeInput>
      <PrimeInput id="siren" class="mb-10 w-full" placeholder="SIREN">
        <InputText v-model="formData.siren" type="text" />
      </PrimeInput>
      <PrimeInput id="auth_code" class="mb-10 w-full" placeholder="Code d'authentification">
        <InputText v-model="formData.auth_code" type="text" />
      </PrimeInput>
      <div class="mb-10 flex w-1/2 items-center">
        <img class="object-contain" :src="formData.logo" alt="URL incorrect" />
      </div>
      <PrimeInput id="logo" class="mb-10 w-full" placeholder="Lien logo">
        <InputText v-model="formData.logo" type="text" />
      </PrimeInput>
      <Button
        :fn="onSubmit"
        :loading="loading"
        bgColor="content-light"
        class="w-full"
        text="Modifier"
      />
    </form>
  </div>
</template>

<style lang="scss">
.p-inputtext {
  @apply w-full;
}
</style>
