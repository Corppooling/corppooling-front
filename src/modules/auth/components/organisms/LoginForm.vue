<script lang="ts" setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "@/components/molecules/Button.vue";
import PrimeInput from "@/components/atoms/PrimeInput.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const email = ref<string>("");
const password = ref<string>("");

const onSubmit = () => {
  if (email.value && password.value) {
    authStore.login(email.value, password.value);
  }
};
</script>

<template>
  <div class="py-8 px-8 xl:px-24">
    <h1 class="font-bold text-5xl text-center mt-10">
      {{ $t("auth.login") }}
    </h1>
    <div class="pt-24 pb-20">
      <PrimeInput id="username" placeholder="Email" class="mb-14">
        <InputText class="w-full" id="username" type="email" v-model="email" />
      </PrimeInput>
      <PrimeInput
        id="password"
        :placeholder="$t('auth.password')"
        class="mb-14"
      >
        <Password
          id="password"
          type="password"
          v-model="password"
          :feedback="false"
          toggleMask
        />
      </PrimeInput>
      <Button
        @click="onSubmit"
        bg-color="content-base"
        :text="$t('auth.loggingIn')"
      />
      <RouterLink
        :to="{ name: 'register' }"
        class="block mt-10 text-center hover:underline"
      >
        {{ $t("auth.registerMyCompany") }}
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