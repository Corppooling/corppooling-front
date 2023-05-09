<script lang="ts" setup>
import { computed } from 'vue';
import Spinner from '@/components/atoms/Spinner.vue';
import type { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
  to?: RouteLocationRaw;
  text?: string;
  icon?: string;
  textSize?:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  iconSize?:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  iconClass?: string;
  iconPosition?: 'left' | 'right';
  bgColor?: string;
  textColor?: string;
  fn?: () => void;
  loading?: boolean;
  disabled?: boolean;
}>();

const bgColorClass = computed<string>(() => {
  if (props.bgColor) return `bg-${props.bgColor}`;
  return 'bg-content-glight';
});

const textColorClass = computed<string>(() => {
  if (props.textColor) return `text-${props.textColor}`;
  return 'text-white';
});

const generateSizeClass = (size?: string): string => {
  switch (size) {
    case 'sm':
      return 'text-sm';
    case 'md':
      return 'text-md';
    case 'lg':
      return 'text-lg';
    case 'xl':
      return 'text-xl';
    case '2xl':
      return 'text-2xl';
    case '3xl':
      return 'text-3xl';
    case '4xl':
      return 'text-4xl';
    case '5xl':
      return 'text-5xl';
    case '6xl':
      return 'text-6xl';
    case '7xl':
      return 'text-7xl';
    case '8xl':
      return 'text-8xl';
    case '9xl':
      return 'text-9xl';
    default:
      return 'text-base';
  }
};

const iconSizeClass = computed<string>(() => {
  return generateSizeClass(props.iconSize);
});

const textSizeClass = computed<string>(() => {
  return generateSizeClass(props.textSize);
});

const disabledClass = computed<string>(() => {
  if (props.disabled) return 'bg-black-light hover:drop-shadow-none cursor-not-allowed';
  return '';
});

const handleClick = (): void => {
  if (!props.disabled && props.fn) props.fn();
};
</script>

<template>
  <component
    :is="to ? 'router-link' : 'div'"
    v-ripple
    :to="to"
    class="flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-2xl p-3 shadow-md transition-all duration-200 hover:drop-shadow-md hover:saturate-150"
    :class="[bgColorClass, textColorClass, disabledClass]"
    @click="handleClick"
  >
    <Spinner v-if="!props.disabled && props.loading" />
    <font-awesome-icon
      v-if="props.icon && !props.loading && (props.iconPosition === 'left' || !props.iconPosition)"
      :class="[iconSizeClass, props.iconClass]"
      :icon="props.icon"
    />
    <span :class="[textSizeClass, props.icon && props.text && 'mx-2']">{{ props.text }}</span>
    <font-awesome-icon
      v-if="props.icon && !props.loading && props.iconPosition === 'right'"
      :class="[iconSizeClass, props.iconClass]"
      :icon="props.icon"
    />
  </component>
</template>
