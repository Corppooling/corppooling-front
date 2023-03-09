<script lang="ts" setup></script>

<template>
  <section class="w-full h-80 bg-content-flight relative overflow-hidden">
    <div
      class="w-5/6 h-full mx-auto flex justify-center items-center flex flex-col relative z-10"
    >
      <h1
        class="text-content-base text-5xl sm:text-6xl text-center mb-16 font-medium"
      >
        {{ $t("home.find") }}
      </h1>
      <div class="bg-white w-full h-14 rounded-2xl shadow-md max-w-4xl"></div>
    </div>
    <div>
      <img
        class="hidden lg:block absolute z-0 top-24 right-10 w-24 animate-floating"
        src="@/assets/images/shapes/shape_2.svg"
        alt=""
      />
      <img
        class="absolute z-0 top-5 left-1/4 w-16 animate-floating"
        src="@/assets/images/shapes/shape_2.svg"
        alt=""
      />
      <img
        class="absolute z-0 bottom-0 left-2/3 w-64 animate-floating"
        src="@/assets/images/shapes/shape_3.svg"
        alt=""
      />
      <img
        class="hidden lg:block absolute z-0 bottom-10 left-10 w-64 animate-floating"
        src="@/assets/images/shapes/shape_4.svg"
        alt=""
      />
      <img
        class="hidden sm:block absolute z-0 bottom-0 left-1/3 w-32 animate-floating rotate-6"
        src="@/assets/images/shapes/shape_1.svg"
        alt=""
      />
    </div>
  </section>
</template>
