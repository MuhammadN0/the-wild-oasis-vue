import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import validation from './plugins/validation'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(validation)
app.mount('#app')
