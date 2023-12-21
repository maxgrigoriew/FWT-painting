import components from '@/global-components.ts';
import vClickOutside from 'click-outside-vue3';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/scss/main.scss';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(vClickOutside);

Object.entries(components).forEach(([name, component]) =>
  app.component(name, component)
);

app.mount('#app');
