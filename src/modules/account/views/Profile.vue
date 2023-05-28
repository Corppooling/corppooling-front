<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import defaultProfileImage from '@/assets/images/logos/logo_white.svg?url';
import Password from 'primevue/password';
import { reactive, ref } from 'vue';
import PrimeInput from '@/components/atoms/PrimeInput.vue';
import Button from '@/components/molecules/Button.vue';
import { useToast } from '@/composables/toast';
import { i18nGlobal } from '@/support/i18n';
import axiosClient from '@/support/axiosClient';
import { AxiosResponse } from 'axios';

const userStore = useUserStore();
const loading = ref<boolean>(false);
const toast = useToast();
const { t } = i18nGlobal;

interface FormDataI {
  currentPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}

const formData = reactive<FormDataI>({
  currentPassword: undefined,
  newPassword: undefined,
  newPasswordConfirmation: undefined,
});

const resetForm = (): void => {
  Object.assign(formData, {
    currentPassword: undefined,
    newPassword: undefined,
    newPasswordConfirmation: undefined,
  });
};

const onSubmit = async (): Promise<void> => {
  if (
    !formData.currentPassword?.trim() ||
    !formData.newPassword?.trim() ||
    !formData.newPasswordConfirmation?.trim()
  ) {
    toast.warning(t('form.empties'));
    return;
  }

  if (formData.newPassword !== formData.newPasswordConfirmation) {
    toast.warning('Les mots de passe ne correspondent pas');
    return;
  }

  loading.value = true;

  const auth = await axiosClient
    .post('/auth', {
      username: userStore.user?.email,
      password: formData.currentPassword,
    })
    .catch(() => {
      toast.error('Le mot de passe actuel est incorrect');
    });

  if (typeof auth === 'undefined') {
    loading.value = false;
    return;
  }

  await axiosClient
    .put('api/users', {
      email: userStore.user?.email,
      firstname: userStore.user?.firstname,
      lastname: userStore.user?.lastname,
      password: formData.newPassword,
    })
    .then(async (res: AxiosResponse<Record<string, string>>) => {
      localStorage.setItem('token', res.data.jwt);
      resetForm();
      toast.success('Votre mot de passe a bien été modifié');
    })
    .catch(() => {
      toast.error();
    });

  loading.value = false;
};
</script>

<template>
  <div class="flex max-w-screen-2xl flex-wrap">
    <div class="w-full md:p-4 xl:w-96">
      <h3 class="mb-8 text-2xl">A propos de vous</h3>
      <div class="flex w-full">
        <div class="flex w-2/3 flex-col">
          <span class="text-4xl">{{ userStore.getFullName }}</span>
          <span class="mt-2 text-lg font-bold">{{ userStore.user?.company.name }}</span>
          <span class="text-md opacity-40">
            {{ userStore.user?.department.name }}
          </span>
          <span class="mt-4 text-base font-bold">{{ userStore.user?.email }}</span>
        </div>
        <div class="flex w-1/3 flex-col items-center justify-center">
          <div
            class="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-content-glight p-1"
          >
            <img class="w-full" :src="defaultProfileImage" alt="" />
          </div>
          <span class="animate-underline mt-2 select-none">Modifier</span>
        </div>
      </div>
      <h3 class="my-8 text-2xl">Vos statistiques</h3>
      <div class="flex w-full flex-col text-lg md:pl-4">
        <div class="flex justify-between py-2">
          <span>Nombre de trajets publiés:</span>
          <span class="ml-4 font-bold">{{ userStore.user?.trips.length }}</span>
        </div>
        <div class="flex justify-between py-2">
          <span>Nombre de réservations effectuées:</span>
          <span class="ml-4 font-bold">{{ userStore.user?.reservations.length }}</span>
        </div>
      </div>
    </div>
    <div class="mx-auto w-full pt-8 md:p-4 xl:w-96">
      <h3 class="mb-8 text-2xl">Modifier votre mot de passe</h3>
      <form class="pt-3">
        <PrimeInput id="currentPassword" placeholder="Mot de passe actuel" class="mb-12 w-full">
          <Password
            v-model="formData.currentPassword"
            inputId="currentPassword"
            :feedback="false"
            toggleMask
          />
        </PrimeInput>
        <PrimeInput id="newPassword" placeholder="Nouveau mot de passe" class="mb-10 w-full">
          <Password
            v-model="formData.newPassword"
            inputId="newPassword"
            toggleMask
            promptLabel="Nouveau mot de passe"
            weakLabel="Trop simple"
            mediumLabel="Peu mieux faire"
            strongLabel="Super"
          />
        </PrimeInput>
        <PrimeInput
          id="newPasswordConfirmation"
          placeholder="Confirmer votre nouveau mot de passe"
          class="mb-10 w-full"
        >
          <Password
            v-model="formData.newPasswordConfirmation"
            inputId="newPasswordConfirmation"
            toggleMask
            promptLabel="Confirmer votre nouveau mot de passe"
            weakLabel="Trop simple"
            mediumLabel="Peu mieux faire"
            strongLabel="Super"
          />
        </PrimeInput>
        <Button
          :fn="onSubmit"
          :loading="loading"
          bgColor="content-light"
          class="w-full"
          text="Modifier mon mot de passe"
        />
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.p-password {
  @apply w-full;

  .p-password-input {
    @apply w-full;
  }
}
</style>
