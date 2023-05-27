<script lang="ts" setup>
import Searchbar from '@/modules/trips/components/organisms/Searchbar.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
  <section class="relative h-80 w-full bg-content-flight">
    <div class="relative z-10 mx-auto flex h-full w-5/6 flex-col items-center justify-center">
      <h1 class="mb-16 text-center text-5xl font-medium text-content-base sm:text-6xl">
        {{ userStore.isAuth ? $t('home.find') : $t('home.welcome') }}
      </h1>
      <Searchbar v-if="userStore.isAuth" class="absolute -bottom-28 lg:static" />
      <h2 v-else class="rounded-md px-5 py-1 text-center text-4xl">
        {{ $t('home.description') }}
      </h2>
    </div>
    <div class="absolute left-0 top-0 h-full w-full overflow-hidden">
      <img
        class="absolute right-10 top-24 z-0 hidden w-24 animate-floating lg:block"
        style="animation-delay: 4s"
        src="@/assets/images/shapes/shape_2.svg"
        alt=""
      />
      <img
        class="absolute left-1/4 top-5 z-0 w-16 animate-floating"
        style="animation-delay: 3s"
        src="@/assets/images/shapes/shape_2.svg"
        alt=""
      />
      <img
        class="absolute bottom-0 left-2/3 z-0 w-64 animate-floating"
        style="animation-delay: 2s"
        src="@/assets/images/shapes/shape_3.svg"
        alt=""
      />
      <img
        class="absolute bottom-10 left-10 z-0 hidden w-64 animate-floating lg:block"
        style="animation-delay: 5s"
        src="@/assets/images/shapes/shape_4.svg"
        alt=""
      />
      <img
        class="absolute bottom-0 left-1/3 z-0 hidden w-32 rotate-6 animate-floating sm:block"
        style="animation-delay: 0s"
        src="@/assets/images/shapes/shape_1.svg"
        alt=""
      />
    </div>
  </section>
</template>
