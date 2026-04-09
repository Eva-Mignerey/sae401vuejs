import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n'
import router from './router'
import { createPinia } from 'pinia'
import './assets/scss/styles.scss'

const app = createApp(App)

app.use(i18n)
app.use(router)
app.use(createPinia())
app.mount('#app')