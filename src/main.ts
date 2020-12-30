import { createApp } from 'vue'
import { register } from 'timeago.js'
import App from './App.vue'
import { router } from './router'
import './tools/locale'
import './index.css'

import '@iconify/iconify'
import '@purge-icons/generated'

const projectApp = createApp(App)
projectApp.use(router)
projectApp.mount('#app')
