import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router.js'
import './index.css'

const projectApp = createApp(App)

projectApp.use(router)
projectApp.mount('#app')
