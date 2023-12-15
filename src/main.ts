import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/scss/main.scss'
import components from '@/global-components.ts'
const app = createApp(App)

app.use(createPinia())

Object.entries(components).forEach(([name, component]) =>
  app.component(name, component)
)

app.mount('#app')
