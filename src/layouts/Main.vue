<script lang="ts" setup>
import Header from '@/components/organisms/Header.vue';
import Footer from '@/components/organisms/Footer.vue';
import Toast from 'primevue/toast';
</script>
<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <Toast />
    <slot />
    <Footer />
  </div>
</template>
