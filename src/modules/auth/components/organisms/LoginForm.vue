<script lang="ts" setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from '@/components/molecules/Button.vue';
import PrimeInput from '@/components/atoms/PrimeInput.vue';
import { useAuthStore } from '@/stores/auth';
import { useToast } from '@/composables/toast';
import { i18nGlobal } from '@/support/i18n';

const { t } = i18nGlobal;
const authStore = useAuthStore();
const toast = useToast();
const email = ref<string>('');
const password = ref<string>('');
const loading = ref<boolean>(false);

const onSubmit = async () => {
  if (!!email.value.trim() && !!password.value.trim()) {
    loading.value = true;
    await authStore.login(email.value, password.value);
    loading.value = false;
  } else {
    toast.warning(t('form.empties'));
  }
};
</script>

<template>
  <div class="p-8 xl:px-24">
    <h1 class="mt-10 text-center text-5xl font-bold">
      {{ $t('auth.login') }}
    </h1>
    <div class="pb-20 pt-24">
      <PrimeInput id="username" placeholder="Email" class="mb-14">
        <InputText id="username" v-model="email" class="w-full" type="email" />
      </PrimeInput>
      <PrimeInput id="password" :placeholder="$t('auth.password')" class="mb-14">
        <Password id="password" v-model="password" type="password" :feedback="false" toggleMask />
      </PrimeInput>
      <Button
        :fn="onSubmit"
        :loading="loading"
        bgColor="content-base"
        :text="$t('auth.loggingIn')"
      />
      <RouterLink :to="{ name: 'register' }" class="mt-10 block text-center hover:underline">
        {{ $t('auth.registerMyCompany') }}
      </RouterLink>
    </div>
    <div></div>
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
