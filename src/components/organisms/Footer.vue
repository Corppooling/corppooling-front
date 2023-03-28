<script lang="ts" setup>
import { ref, watch } from "vue";
import SelectButton from "primevue/selectbutton";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const enum Lang {
  FR = "fr",
  EN = "en",
}

const currentYear: number = new Date(Date.now()).getFullYear();
const lang = ref<Lang>((localStorage.getItem("lang") as Lang) ?? Lang.FR);
const langOptions = [
  { name: "Français", value: Lang.FR },
  { name: "English", value: Lang.EN },
] as Array<Record<string, string>>;

watch(
  lang,
  (newLang: Lang) => {
    switch (newLang) {
      case Lang.FR:
        locale.value = Lang.FR;
        localStorage.setItem("lang", Lang.FR);
        break;
      case Lang.EN:
        locale.value = Lang.EN;
        localStorage.setItem("lang", Lang.EN);
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
    class="w-full bg-content-base text-main-base py-2 relative overflow-hidden mt-auto"
  >
    <div
      class="max-w-screen-sm mx-auto flex flex-col justify-end relative z-10"
    >
      <div class="flex flex-wrap justify-between py-2">
        <div class="p-2 mx-auto sm:mx-0">
          <SelectButton
            v-model="lang"
            :options="langOptions"
            optionLabel="name"
            optionValue="value"
            aria-labelledby="basic"
          />
        </div>
        <div class="p-2 flex items-center mx-auto sm:mx-0">
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
            <font-awesome-icon
              icon="fa-brands fa-instagram"
              class="fa-2x p-2"
            />
          </a>
        </div>
      </div>
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
    <div>
      <img
        class="hidden lg:block absolute z-0 top-20 right-10 w-24 animate-floating"
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
        src="@/assets/images/shapes/shape_4.svg"
        alt=""
      />
      <img
        class="hidden lg:block absolute z-0 bottom-0 left-10 w-64 animate-floating"
        style="animation-delay: 5s"
        src="@/assets/images/shapes/shape_3.svg"
        alt=""
      />
      <img
        class="hidden sm:block absolute z-0 bottom-0 left-1/3 w-32 animate-floating rotate-6"
        style="animation-delay: 0s"
        src="@/assets/images/shapes/shape_1.svg"
        alt=""
      />
    </div>
  </div>
</template>
