<script lang="ts" setup>
import Button from '@/components/molecules/Button.vue';
import { i18nGlobal } from '@/support/i18n';
import { computed } from 'vue';
import { HttpStatusCode } from 'axios';

const { t } = i18nGlobal;

const props = withDefaults(
  defineProps<{
    code?: HttpStatusCode;
  }>(),
  {
    code: HttpStatusCode.NotFound,
  }
);

const codeError = computed<string>(() => {
  if (props.code in HttpStatusCode) {
    return props.code.toString();
  }
  return HttpStatusCode.NotFound.toString();
});

const buildTranslation = (type: 'title' | 'subtitle' | 'ban' | 'description') => {
  const magicString = `errors.${codeError.value}.${type}`;
  const value = t(magicString).toString();
  return value !== magicString ? value : false;
};
</script>

<template>
  <div
    class="relative flex h-[calc(100vh-14.1rem)] w-full items-center justify-center bg-content-flight md:h-[calc(100vh-12.9rem)]"
  >
    <span
      class="absolute left-0 top-0 flex h-full w-full select-none items-center justify-center text-[10rem] font-bold text-content-flight drop-shadow-neon-light sm:text-[20rem] lg:text-[30rem] xl:text-[40rem]"
    >
      {{ codeError }}
    </span>
    <div class="flex items-center justify-center text-center">
      <div class="absolute flex flex-col gap-2 lg:gap-4">
        <h1 v-if="buildTranslation('title')" class="text-7xl">{{ buildTranslation('title') }}</h1>
        <h2 v-if="buildTranslation('subtitle')" class="text-3xl font-normal">
          {{ buildTranslation('subtitle') }}

          <strong v-if="buildTranslation('ban')">{{ buildTranslation('ban') }}</strong>
        </h2>
        <p
          v-if="buildTranslation('description')"
          class="text-md max-w-[650px] font-normal md:text-xl"
          v-html="buildTranslation('description')"
        />
        <div class="mt-4 flex items-center justify-center">
          <Button bgColor="content-base" :to="{ name: 'home' }">
            {{ $t('errors.links.home') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
