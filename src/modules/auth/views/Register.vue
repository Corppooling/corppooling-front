<script lang="ts" setup>
import AuthBanner from '@/modules/auth/components/molecules/AuthBanner.vue';
import RegisterForm from '@/modules/auth/components/organisms/RegisterForm.vue';
</script>

<template>
  <div class="flex h-[calc(100vh-5rem)] overflow-hidden">
    <AuthBanner />
    <div class="w-full overflow-y-auto md:w-1/2">
      <RegisterForm />
    </div>
  </div>
</template>
