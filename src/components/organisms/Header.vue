<script lang="ts" setup>
import { ref } from 'vue';
import Button from '@/components/molecules/Button.vue';
import Sidebar from 'primevue/sidebar';
import UserButton from '@/components/molecules/UserButton.vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import ConfirmDialog from 'primevue/confirmdialog';

const authStore = useAuthStore();
const userStore = useUserStore();

const displaySidebar = ref<boolean>(false);
</script>

<template>
  <div class="sticky top-0 z-50 flex h-20 w-full justify-between bg-white px-5 py-4 shadow-md">
    <RouterLink :to="{ name: 'home' }" class="w-52">
      <img class="h-full w-full" src="@/assets/images/logos/logo_full.svg" alt="logo" />
    </RouterLink>
    <div class="hidden md:flex">
      <template v-if="userStore.isAuth">
        <Button class="mx-2" icon="fa-search" iconSize="2xl" :to="{ name: 'trips' }" />
        <Button
          class="mx-2"
          icon="fa-plus"
          :text="$t('header.newTrip')"
          iconSize="2xl"
          :to="{ name: 'trip.add' }"
        />
        <UserButton />
      </template>
      <template v-else>
        <Button
          :to="{ name: 'login' }"
          class="mx-2"
          icon="fa-lock"
          :text="$t('auth.login')"
          iconSize="2xl"
        />
        <Button
          :to="{ name: 'register' }"
          class="mx-2"
          icon="fa-user-plus"
          :text="$t('auth.register')"
          iconSize="2xl"
        />
      </template>
    </div>
    <div class="md:hidden">
      <Button
        class="mx-2"
        icon="fa-bars"
        iconSize="2xl"
        @click="displaySidebar = !displaySidebar"
      />
    </div>
  </div>
  <Sidebar v-model:visible="displaySidebar" position="right">
    <template #header>
      <div class="w-32">
        <img class="w-full" src="@/assets/images/logos/logo_full.svg" alt="" />
      </div>
    </template>
    <div>
      <template v-if="userStore.isAuth">
        <Button
          :to="{ name: 'trips' }"
          class="mx-2 my-4"
          icon="fa-search"
          :text="$t('header.search')"
          iconSize="2xl"
          @click="displaySidebar = false"
        />
        <Button
          :to="{ name: 'trip.add' }"
          class="mx-2 my-4"
          icon="fa-plus"
          :text="$t('header.newTrip')"
          iconSize="2xl"
          @click="displaySidebar = false"
        />
        <Button
          :to="{ name: 'account.profile' }"
          class="mx-2 my-4"
          icon="fa-user"
          :text="$t('header.account')"
          iconSize="2xl"
          @click="displaySidebar = false"
        />
        <Button
          class="mx-2 my-4"
          icon="fa-sign-out-alt"
          :text="$t('auth.logout')"
          iconSize="2xl"
          @click="
            () => {
              authStore.logout();
              displaySidebar = false;
            }
          "
        />
      </template>
      <template v-else>
        <Button
          :to="{ name: 'login' }"
          class="mx-2 mb-4 mt-10"
          icon="fa-lock"
          :text="$t('auth.login')"
          iconSize="2xl"
          @click="displaySidebar = false"
        />
        <Button
          :to="{ name: 'register' }"
          class="mx-2 my-4"
          icon="fa-regular fa-pen-to-square"
          :text="$t('auth.register')"
          iconSize="2xl"
          @click="displaySidebar = false"
        />
      </template>
    </div>
  </Sidebar>
  <ConfirmDialog />
</template>

<style lang="scss">
.p-sidebar-header {
  justify-content: space-between !important;
}

.p-confirm-dialog-accept {
  color: rgb(var(--color-main-base)) !important;

  &:hover {
    color: rgb(var(--color-white)) !important;
  }
}
</style>
