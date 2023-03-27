<script lang="ts" setup>
import AuthBanner from "@/modules/auth/components/molecules/AuthBanner.vue";
import LoginForm from "@/modules/auth/components/organisms/LoginForm.vue";
</script>

<template>
  <div class="flex">
    <AuthBanner />
    <div class="w-1/2">
      <LoginForm />
    </div>
  </div>
</template>
