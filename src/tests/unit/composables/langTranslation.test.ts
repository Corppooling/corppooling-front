import { beforeEach, describe, expect, it } from 'vitest';
import { useLangTranslation } from '@/composables/langTranslation';

describe('langTranslation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should lang be FR', function () {
    const { lang, langOptions } = useLangTranslation();
    lang.value = langOptions[0].value; // FR
    expect(lang.value).toEqual('fr');
  });

  it('should lang be EN', function () {
    const { lang, langOptions } = useLangTranslation();
    lang.value = langOptions[1].value; // EN
    expect(lang.value).toEqual('en');
  });

  it('should localStorage lang be FR', function () {
    const { lang, langOptions } = useLangTranslation();
    lang.value = langOptions[0].value; // FR
    setTimeout(() => {
      expect(localStorage.getItem('lang')).toEqual('fr');
    }, 500);
  });

  it('should localStorage lang be EN', function () {
    const { lang, langOptions } = useLangTranslation();
    lang.value = langOptions[1].value; // EN
    setTimeout(() => {
      expect(localStorage.getItem('lang')).toEqual('en');
    }, 500);
  });
});
