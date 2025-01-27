import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './global.css'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { 
  FaAngleRight, 
  FaAngleDoubleRight, 
  FaAngleDoubleLeft, 
  FaAngleLeft 
} from 'oh-vue-icons/icons'

const pinia = createPinia()

addIcons(FaAngleRight, FaAngleDoubleRight, FaAngleDoubleLeft, FaAngleLeft)

const app = createApp(App).use(pinia).use(router)
app.component('v-icon', OhVueIcon)

app.mount('#app')
