<script lang="ts" setup>
import Button from "@/components/molecules/Button.vue";
</script>

<template>
  <div class="h-20 py-4 px-5 shadow-md flex justify-between">
    <div class="w-52">
      <img
        class="w-full h-full"
        src="@/assets/images/logos/logo_full.svg"
        alt=""
      />
    </div>
    <div class="hidden md:flex">
      <Button class="mx-2" icon="fa-search" icon-size="2xl" />
      <Button
        class="mx-2"
        icon="fa-plus"
        :text="$t('global.header.newTrip')"
        icon-size="2xl"
      />
      <Button class="mx-2" icon="fa-regular fa-bell" icon-size="2xl" />
      <div
        class="ml-2 bg-content-flight h-full aspect-square rounded-full shadow-md cursor-pointer flex justify-center items-center"
      >
        <font-awesome-icon
          size="xl"
          class="text-white"
          icon="fa-regular fa-user"
        />
      </div>
    </div>
    <div class="md:hidden">
      <Button class="mx-2" icon="fa-bars" icon-size="2xl" />
    </div>
  </div>
</template>
