<script lang="ts" setup>
import { ref } from 'vue';
import PrimeInput from '@/components/atoms/PrimeInput.vue';
import Button from '@/components/molecules/Button.vue';
import InputText from 'primevue/inputtext';

const email = ref<string>('');
</script>

<template>
  <div class="p-8 xl:px-24">
    <h1 class="mt-10 text-center text-5xl font-bold">
      {{ $t('auth.register') }}
    </h1>
    <p class="pt-16 text-justify text-lg">
      {{ $t('auth.recontactDesc') }}
    </p>
    <div class="pb-20 pt-16">
      <PrimeInput id="username" placeholder="Email" class="mb-14">
        <InputText id="username" v-model="email" class="w-full" type="email" />
      </PrimeInput>
      <Button bgColor="content-base" :text="$t('auth.recontact')" />
      <RouterLink :to="{ name: 'login' }" class="mt-10 block text-center hover:underline">
        {{ $t('auth.toLogin') }}
      </RouterLink>
    </div>
  </div>
</template>
