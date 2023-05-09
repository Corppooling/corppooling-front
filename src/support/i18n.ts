import { createI18n } from 'vue-i18n';
import fr from '@/lang/fr.json';
import en from '@/lang/en.json';

/**
 * Return the locale language
 */
export const localeLang = (): string => {
  return localStorage.getItem('lang') ?? 'fr';
};

export const i18n = createI18n({
  legacy: false,
  locale: localeLang(),
  globalInjection: true,
  messages: {
    fr,
    en,
  },
});

export const i18nGlobal = i18n.global;
