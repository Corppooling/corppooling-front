<script lang="ts" setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "@/components/molecules/Button.vue";
import PrimeInput from "@/components/atoms/PrimeInput.vue";

const email = ref<string>("");
const password = ref<string>("");
</script>

<template>
  <div class="p-8">
    <h1 class="font-bold text-5xl text-center mt-10">
      {{ $t("auth.login") }}
    </h1>
    <div class="p-24">
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
      <Button bg-color="content-base" :text="$t('auth.loggingIn')" />
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
