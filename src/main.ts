import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './global.css'

const pinia = createPinia()

const app = createApp(App).use(pinia).use(router)

app.mount('#app')
