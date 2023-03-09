<script lang="ts" setup>
import Header from "@/components/organisms/Header.vue";
import Footer from "@/components/organisms/Footer.vue";
</script>
<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>
