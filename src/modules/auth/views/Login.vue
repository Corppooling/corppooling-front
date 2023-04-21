<script lang="ts" setup>
import AuthBanner from '@/modules/auth/components/molecules/AuthBanner.vue';
import LoginForm from '@/modules/auth/components/organisms/LoginForm.vue';
</script>

<template>
  <div class="flex min-h-[calc(100vh-5rem)]">
    <AuthBanner />
    <div class="w-full md:w-1/2">
      <LoginForm />
    </div>
  </div>
</template>
