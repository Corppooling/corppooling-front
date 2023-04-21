<script lang="ts" setup>
import Searchbar from '@/modules/trips/components/organisms/Searchbar.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
userStore.setUser();
</script>

<template>
  <section class="w-full h-80 bg-content-flight relative">
    <div class="w-5/6 h-full mx-auto flex justify-center items-center flex flex-col relative z-10">
      <h1 class="text-content-base text-5xl sm:text-6xl text-center mb-16 font-medium">
        {{ userStore.isAuth ? $t('home.find') : $t('home.welcome') }}
      </h1>
      <Searchbar v-if="userStore.isAuth" class="absolute lg:static -bottom-28" />
      <h2 v-else class="text-4xl py-1 px-5 rounded-md text-center">
        {{ $t('home.description') }}
      </h2>
    </div>
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
      <img
        class="hidden lg:block absolute z-0 top-24 right-10 w-24 animate-floating"
        style="animation-delay: 4s"
        src="@/assets/images/shapes/shape_2.svg"
        alt=""
      />
      <img
        class="absolute z-0 top-5 left-1/4 w-16 animate-floating"
        style="animation-delay: 3s"
        src="@/assets/images/shapes/shape_2.svg"
        alt=""
      />
      <img
        class="absolute z-0 bottom-0 left-2/3 w-64 animate-floating"
        style="animation-delay: 2s"
        src="@/assets/images/shapes/shape_3.svg"
        alt=""
      />
      <img
        class="hidden lg:block absolute z-0 bottom-10 left-10 w-64 animate-floating"
        style="animation-delay: 5s"
        src="@/assets/images/shapes/shape_4.svg"
        alt=""
      />
      <img
        class="hidden sm:block absolute z-0 bottom-0 left-1/3 w-32 animate-floating rotate-6"
        style="animation-delay: 0s"
        src="@/assets/images/shapes/shape_1.svg"
        alt=""
      />
    </div>
  </section>
</template>
