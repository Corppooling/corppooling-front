import { ref, watch } from 'vue';
import { i18nGlobal } from '@/support/i18n';
const { locale } = i18nGlobal;

/**
 * Composable for language preference
 */
export const useLangTranslation = () => {
  const enum Lang {
    FR = 'fr',
    EN = 'en',
  }

  const lang = ref<Lang.FR | Lang.EN>((localStorage.getItem('lang') as Lang) ?? Lang.FR);

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

  return {
    lang,
    langOptions,
  };
};
