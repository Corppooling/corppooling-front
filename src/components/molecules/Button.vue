<script lang="ts" setup>
import { computed, ref } from "vue";

const props = defineProps<{
  to?: Record<string, string>;
  text?: string;
  icon?: string;
  textSize?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  iconSize?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  bgColor?: string;
  textColor?: string;
  fn?: () => void;
}>();

const bgColorClass = computed(() => {
  if (props.bgColor) return `bg-${props.bgColor}`;
  return "bg-content-glight";
});

const textColorClass = computed(() => {
  if (props.textColor) return `text-${props.textColor}`;
  return "text-white";
});

const generateSizeClass = (size?: string) => {
  switch (size) {
    case "sm":
      return "text-sm";
    case "md":
      return "text-md";
    case "lg":
      return "text-lg";
    case "xl":
      return "text-xl";
    case "2xl":
      return "text-2xl";
    case "3xl":
      return "text-3xl";
    case "4xl":
      return "text-4xl";
    case "5xl":
      return "text-5xl";
    case "6xl":
      return "text-6xl";
    case "7xl":
      return "text-7xl";
    case "8xl":
      return "text-8xl";
    case "9xl":
      return "text-9xl";
    default:
      return "text-base";
  }
};

const iconSizeClass = computed(() => {
  return generateSizeClass(props.iconSize);
});

const textSizeClass = computed(() => {
  return generateSizeClass(props.textSize);
});

const loading = ref<boolean>(false);

const handleClick = () => {
  if (props.fn) {
    loading.value = true;
    props.fn();
    setTimeout(() => {
      loading.value = false;
    }, 2000);
  }
};
</script>

<template>
  <component
    :is="to ? 'router-link' : 'div'"
    :to="to"
    class="flex p-3 justify-center items-center shadow-md rounded-2xl cursor-pointer hover:saturate-150 transition-all duration-200 hover:drop-shadow-md whitespace-nowrap select-none"
    :class="[bgColorClass, textColorClass]"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <font-awesome-icon
      v-if="props.icon && !loading"
      :class="iconSizeClass"
      :icon="props.icon"
    />
    <span :class="[textSizeClass, icon && text && 'ml-2']">{{
      props.text
    }}</span>
  </component>
</template>
