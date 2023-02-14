import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import "@/assets/styles/main.scss";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { createI18n, useI18n } from "vue-i18n";
import fr from "@/lang/fr.json";
import en from "@/lang/en.json";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  globalInjection: true,
  messages: {
    fr,
    en,
  },
});

library.add(fas, far, fab);

const app = createApp(App, {
  setup() {
    const { t } = useI18n();
    return { t };
  },
});

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(i18n);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.mount("#app");
