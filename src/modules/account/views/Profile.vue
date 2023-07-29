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
import SelectButton from 'primevue/selectbutton';
import { useLangTranslation } from '@/composables/langTranslation';
import { dateFormated } from '@/support/luxon';
import Textarea from 'primevue/textarea';

const userStore = useUserStore();
const loading = ref<boolean>(false);
const loadingPresentation = ref<boolean>(false);
const toast = useToast();
const { lang, langOptions } = useLangTranslation();
const { t } = i18nGlobal;

interface FormDataDTO {
  currentPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}

const formData = reactive<FormDataDTO>({
  currentPassword: undefined,
  newPassword: undefined,
  newPasswordConfirmation: undefined,
});

const presentation = ref<string | undefined>(userStore.user?.presentation);

const resetForm = (): void => {
  Object.assign(formData, {
    currentPassword: undefined,
    newPassword: undefined,
    newPasswordConfirmation: undefined,
  });
};

const onSubmitPresentation = async (): Promise<void> => {
  loadingPresentation.value = true;

  await axiosClient
    .put(`api/users/${userStore.user?.id}`, {
      presentation: presentation.value,
    })
    .then(async () => {
      await userStore.setUser(true);
      toast.success(t('account.myProfile.successPresentation'));
    })
    .catch(() => {
      toast.error();
      presentation.value = userStore.user?.presentation;
    });

  loadingPresentation.value = false;
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
    // eslint-disable-next-line no-secrets/no-secrets
    toast.warning(t('account.myProfile.passwordsDoesNotMatch'));
    return;
  }

  loading.value = true;

  const auth = await axiosClient
    .post('/auth', {
      username: userStore.user?.email,
      password: formData.currentPassword,
    })
    .catch(() => {
      toast.error(t('account.myProfile.incorrectPassword'));
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
      // eslint-disable-next-line no-secrets/no-secrets
      toast.success(t('account.myProfile.passwordChanged'));
    })
    .catch(() => {
      toast.error();
    });

  loading.value = false;
};
</script>

<template>
  <div v-if="userStore.isAuth" class="flex max-w-screen-2xl flex-wrap">
    <div class="w-full md:p-4 xl:w-1/3">
      <h3 class="mb-8 text-2xl">{{ $t('account.myProfile.aboutYou') }}</h3>
      <div class="flex w-full flex-col">
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
              <img class="w-full" :src="defaultProfileImage" alt="profile picture" />
            </div>
            <span class="animate-underline mt-2 select-none">{{ $t('action.update') }}</span>
          </div>
        </div>
        <Button
          icon="fa-image-portrait"
          :iconPosition="'left'"
          bgColor="content-glight"
          class="mt-8 w-full"
          :text="t('account.myProfile.publicProfile')"
          :to="{
            name: 'public.profile',
            params: { id: userStore.user?.id },
          }"
        />
      </div>
      <h3 class="my-8 text-2xl">{{ $t('account.myProfile.preferences') }}</h3>
      <div class="flex w-full flex-col text-lg md:pl-4">
        <div class="flex justify-between py-2">
          <span>{{ $t('account.myProfile.language') }}:</span>
          <SelectButton
            v-model="lang"
            :options="langOptions"
            optionLabel="name"
            optionValue="value"
            aria-labelledby="basic"
          />
        </div>
      </div>
      <h3 class="my-8 text-2xl">{{ $t('account.myProfile.yourStats') }}</h3>
      <div class="flex w-full flex-col text-lg md:pl-4">
        <div class="flex justify-between py-2">
          <span>{{ $t('account.myProfile.publishedTrips') }}:</span>
          <span class="ml-4 font-bold">{{ userStore.user?.trips.length }}</span>
        </div>
        <div class="flex justify-between py-2">
          <span>{{ $t('account.myProfile.bookedTrips') }}:</span>
          <span class="ml-4 font-bold">{{ userStore.user?.reservations.length }}</span>
        </div>
      </div>
    </div>
    <div class="mx-auto w-full pt-9 md:p-4 xl:w-1/3">
      <h3 class="mb-8 text-2xl">{{ $t('account.myProfile.updatePresentation') }}</h3>
      <form class="pt-3">
        <PrimeInput
          id="presentation"
          class="mb-10"
          :placeholder="t('account.myProfile.presentation')"
        >
          <Textarea
            v-model="presentation"
            inputId="presentation"
            :rows="9"
            :feedback="false"
            :autoResize="true"
          />
        </PrimeInput>
        <Button
          :fn="onSubmitPresentation"
          :loading="loadingPresentation"
          bgColor="content-light"
          class="w-full"
          :text="t('action.update')"
        />
      </form>
    </div>
    <div class="mx-auto w-full pt-9 md:p-4 xl:w-1/3">
      <h3 class="mb-8 text-2xl">{{ $t('account.myProfile.updatePassword') }}</h3>
      <div v-if="userStore.user?.updated_at" class="mb-8 flex flex-wrap justify-between text-sm">
        <span>{{ $t('account.myProfile.lastUpdate') }}:</span>
        <span>{{ dateFormated(userStore.user?.updated_at) }}</span>
      </div>
      <form class="pt-3">
        <PrimeInput
          id="currentPassword"
          :placeholder="t('account.myProfile.currentPassword')"
          class="mb-14 w-full"
          required
        >
          <Password
            v-model="formData.currentPassword"
            inputId="currentPassword"
            :feedback="false"
            toggleMask
          />
        </PrimeInput>
        <PrimeInput
          id="newPassword"
          :placeholder="t('account.myProfile.newPassword')"
          class="mb-10 w-full"
          required
        >
          <Password
            v-model="formData.newPassword"
            inputId="newPassword"
            toggleMask
            :promptLabel="t('account.myProfile.newPassword')"
            :weakLabel="t('account.myProfile.canDoBetter')"
            :mediumLabel="t('account.myProfile.canDoBetter')"
            :strongLabel="t('account.myProfile.greatPassword')"
          />
        </PrimeInput>
        <PrimeInput
          id="newPasswordConfirmation"
          :placeholder="t('account.myProfile.confirmNewPassword')"
          class="mb-10 w-full"
          required
        >
          <Password
            v-model="formData.newPasswordConfirmation"
            inputId="newPasswordConfirmation"
            toggleMask
            :promptLabel="t('account.myProfile.confirmNewPassword')"
            :weakLabel="t('account.myProfile.canDoBetter')"
            :mediumLabel="t('account.myProfile.canDoBetter')"
            :strongLabel="t('account.myProfile.greatPassword')"
          />
        </PrimeInput>
        <Button
          :fn="onSubmit"
          :loading="loading"
          bgColor="content-light"
          class="w-full"
          :text="t('action.update')"
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

.p-inputtextarea {
  @apply w-full h-full;
}
</style>
