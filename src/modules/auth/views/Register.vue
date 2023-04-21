<script lang="ts" setup>
import AuthBanner from '@/modules/auth/components/molecules/AuthBanner.vue';
import RegisterForm from '@/modules/auth/components/organisms/RegisterForm.vue';
</script>

<template>
  <div class="flex min-h-[calc(100vh-5rem)]">
    <AuthBanner />
    <div class="w-full md:w-1/2">
      <RegisterForm />
    </div>
  </div>
</template>
