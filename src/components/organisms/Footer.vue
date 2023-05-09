<script lang="ts" setup>
import { ref, watch } from 'vue';
import SelectButton from 'primevue/selectbutton';
import { useRoute } from 'vue-router';
import { i18nGlobal } from '@/support/i18n';

const route = useRoute();
const { locale } = i18nGlobal;
const enum Lang {
  FR = 'fr',
  EN = 'en',
}

const currentYear: number = new Date(Date.now()).getFullYear();
const lang = ref<Lang>((localStorage.getItem('lang') as Lang) ?? Lang.FR);
const langOptions = [
  { name: 'Français', value: Lang.FR },
  { name: 'English', value: Lang.EN },
] as Array<Record<string, string>>;

watch(
  lang,
  (newLang: Lang) => {
    switch (newLang) {
      case Lang.FR:
        locale.value = Lang.FR;
        localStorage.setItem('lang', Lang.FR);
        break;
      case Lang.EN:
        locale.value = Lang.EN;
        localStorage.setItem('lang', Lang.EN);
        break;
      default:
        lang.value = Lang.FR;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    v-if="!route.meta.hideFooter"
    class="relative mt-auto w-full overflow-hidden bg-content-base py-2 text-main-base"
  >
    <div class="relative z-10 mx-auto flex max-w-screen-sm flex-col justify-end">
      <div class="flex flex-wrap justify-between py-2">
        <div class="mx-auto p-2 sm:mx-0">
          <SelectButton
            v-model="lang"
            :options="langOptions"
            optionLabel="name"
            optionValue="value"
            aria-labelledby="basic"
          />
        </div>
        <div class="mx-auto flex items-center p-2 sm:mx-0">
          <a href="#" target="_blank">
            <font-awesome-icon icon="fa-brands fa-facebook" class="fa-2x p-2" />
          </a>
          <a href="#" target="_blank">
            <font-awesome-icon icon="fa-brands fa-twitter" class="fa-2x p-2" />
          </a>
          <a href="#" target="_blank">
            <font-awesome-icon icon="fa-brands fa-youtube" class="fa-2x p-2" />
          </a>
          <a href="#" target="_blank">
            <font-awesome-icon icon="fa-brands fa-instagram" class="fa-2x p-2" />
          </a>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center py-1 text-sm md:flex-row">
        <span>Copyright © 2022 - {{ currentYear }} Corppooling</span>
        <span class="mx-1 hidden md:block">|</span>
        <div class="flex flex-wrap justify-center">
          <a class="hover:underline" target="_blank" href="#">
            {{ $t('footer.privacy') }}
          </a>
          <span class="mx-1">-</span>
          <a class="hover:underline" target="_blank" href="#">
            {{ $t('footer.terms') }}
          </a>
        </div>
      </div>
    </div>
    <div>
      <img
        class="absolute right-10 top-20 z-0 hidden w-24 animate-floating lg:block"
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
        src="@/assets/images/shapes/shape_4.svg"
        alt=""
      />
      <img
        class="absolute bottom-0 left-10 z-0 hidden w-64 animate-floating lg:block"
        style="animation-delay: 5s"
        src="@/assets/images/shapes/shape_3.svg"
        alt=""
      />
      <img
        class="absolute bottom-0 left-1/3 z-0 hidden w-32 rotate-6 animate-floating sm:block"
        style="animation-delay: 0s"
        src="@/assets/images/shapes/shape_1.svg"
        alt=""
      />
    </div>
  </div>
</template>
