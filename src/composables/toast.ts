import { ToastSeverity } from 'primevue/api';
import app from '@/main';
import { i18nGlobal } from '@/support/i18n';

const { t } = i18nGlobal;
const lifeTime = 3500;

/**
 * Composable to use PrimeVue Toast
 */
export const useToast = () => {
  /**
   * Add a toast with info severity
   * @param title
   * @param body
   */
  const info = (title?: string, body?: string): void => {
    app.config.globalProperties.$toast.add({
      severity: ToastSeverity.INFO,
      summary: title ?? t('toast.info'),
      detail: body,
      life: lifeTime,
    });
  };

  /**
   * Add a toast with success severity
   * @param title
   * @param body
   */
  const success = (title?: string, body?: string): void => {
    app.config.globalProperties.$toast.add({
      severity: ToastSeverity.SUCCESS,
      summary: title ?? t('toast.success'),
      detail: body,
      life: lifeTime,
    });
  };

  /**
   * Add a toast with warning severity
   * @param title
   * @param body
   */
  const warning = (title?: string, body?: string): void => {
    app.config.globalProperties.$toast.add({
      severity: ToastSeverity.WARN,
      summary: title ?? t('toast.warning'),
      detail: body,
      life: lifeTime,
    });
  };

  /**
   * Add a toast with error severity
   * @param title
   * @param body
   */
  const error = (title?: string, body?: string): void => {
    app.config.globalProperties.$toast.add({
      severity: ToastSeverity.ERROR,
      summary: title ?? t('toast.error'),
      detail: body ?? t('toast.errorBody'),
      life: lifeTime,
    });
  };

  return {
    info,
    success,
    warning,
    error,
  };
};
