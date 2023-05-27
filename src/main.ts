import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import { ripple } from '@/directives/ripple';
import '@/assets/styles/main.scss';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { i18n } from '@/support/i18n';
import { registerSW } from 'virtual:pwa-register';

library.add(fas, far, fab);

if ('serviceWorker' in navigator) {
  registerSW();
}

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(i18n);
app.use(ConfirmationService);
app.directive('tooltip', Tooltip);
app.directive('ripple', ripple);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');

export default app;
