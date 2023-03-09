<script lang="ts" setup>
const currentYear: number = new Date(Date.now()).getFullYear();
</script>

<template>
  <div
    class="w-full h-48 bg-content-base text-main-base flex flex-col justify-end"
  >
    <div
      class="flex flex-col md:flex-row justify-center items-center py-1 text-sm"
    >
      <span>Copyright © 2022 - {{ currentYear }} Corppooling</span>
      <span class="mx-1 hidden md:block">|</span>
      <div class="flex flex-wrap justify-center">
        <a class="hover:underline" target="_blank" href="#">
          {{ $t("footer.privacy") }}
        </a>
        <span class="mx-1">-</span>
        <a class="hover:underline" target="_blank" href="#">
          {{ $t("footer.terms") }}
        </a>
      </div>
    </div>
  </div>
</template>
