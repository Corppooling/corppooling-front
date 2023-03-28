<script lang="ts" setup>
import { ref } from "vue";
import PrimeInput from "@/components/atoms/PrimeInput.vue";
import Button from "@/components/molecules/Button.vue";
import InputText from "primevue/inputtext";

const email = ref<string>("");
</script>

<template>
  <div class="py-8 px-8 xl:px-24">
    <h1 class="font-bold text-5xl text-center mt-10">
      {{ $t("auth.register") }}
    </h1>
    <p class="pt-16 text-lg text-justify">
      {{ $t("auth.recontactDesc") }}
    </p>
    <div class="pt-16 pb-20">
      <PrimeInput id="username" placeholder="Email" class="mb-14">
        <InputText class="w-full" id="username" type="email" v-model="email" />
      </PrimeInput>
      <Button bg-color="content-base" :text="$t('auth.recontact')" />
      <RouterLink
        :to="{ name: 'login' }"
        class="block mt-10 text-center hover:underline"
      >
        {{ $t("auth.toLogin") }}
      </RouterLink>
    </div>
  </div>
</template>
