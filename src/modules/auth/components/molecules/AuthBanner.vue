<script lang="ts" setup>
import loginImage from '@/assets/images/login.svg?url';
</script>

<template>
  <div
    class="hidden w-1/2 flex-col justify-end bg-content-glight bg-contain bg-center bg-no-repeat md:flex"
    :style="`background-image: url('${loginImage}')`"
  >
    <div class="ml-auto w-44 p-4">
      <img src="@/assets/images/logos/logo_full.svg" alt="logo" />
    </div>
  </div>
</template>
