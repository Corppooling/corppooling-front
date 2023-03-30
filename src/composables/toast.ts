import { ToastSeverity } from "primevue/api";
import app from "@/main";
import { i18n } from "@/support/i18n";

const { t } = await i18n.global;
const lifeTime = 3000;

export const info = (title: string = t("toast.info"), body?: string): void => {
  app.config.globalProperties.$toast.add({
    severity: ToastSeverity.INFO,
    summary: title,
    detail: body,
    life: lifeTime,
  });
};

export const success = (
  title: string = t("toast.success"),
  body?: string
): void => {
  app.config.globalProperties.$toast.add({
    severity: ToastSeverity.SUCCESS,
    summary: title,
    detail: body,
    life: lifeTime,
  });
};

export const warning = (
  title: string = t("toast.warning"),
  body?: string
): void => {
  app.config.globalProperties.$toast.add({
    severity: ToastSeverity.WARN,
    summary: title,
    detail: body,
    life: lifeTime,
  });
};

export const error = (
  title: string = t("toast.error"),
  body: string = t("toast.errorBody")
): void => {
  app.config.globalProperties.$toast.add({
    severity: ToastSeverity.ERROR,
    summary: title,
    detail: body,
    life: lifeTime,
  });
};
