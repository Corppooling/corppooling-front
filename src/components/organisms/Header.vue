<script lang="ts" setup>
import { ref } from "vue";
import Button from "@/components/molecules/Button.vue";
import Sidebar from "primevue/sidebar";

const displaySidebar = ref<boolean>(false);
</script>

<template>
  <div
    class="sticky z-50 top-0 bg-white w-full h-20 py-4 px-5 shadow-md flex justify-between"
  >
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
        :text="$t('header.newTrip')"
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
      <Button
        class="mx-2"
        icon="fa-bars"
        icon-size="2xl"
        @click="displaySidebar = !displaySidebar"
      />
    </div>
  </div>
  <Sidebar v-model:visible="displaySidebar" position="right">
    <template #header>
      <div class="w-14">
        <img class="w-full" src="@/assets/images/logos/logo_base.svg" alt="" />
      </div>
    </template>
    <div>
      <Button
        class="mx-2 my-4"
        icon="fa-search"
        :text="$t('header.search')"
        icon-size="2xl"
      />
      <Button
        class="mx-2 my-4"
        icon="fa-plus"
        :text="$t('header.newTrip')"
        icon-size="2xl"
      />
      <Button
        class="mx-2 my-4"
        icon="fa-regular fa-bell"
        :text="$t('header.notifications')"
        icon-size="2xl"
      />
    </div>
  </Sidebar>
</template>

<style lang="scss">
.p-sidebar-header {
  justify-content: space-between !important;
}
</style>
