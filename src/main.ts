import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { i18n } from './locales/i18n'
import './index.css'

import '@iconify/iconify'
import '@purge-icons/generated'

const projectApp = createApp(App)
projectApp.use(router)
projectApp.use(i18n)
projectApp.mount('#app')
