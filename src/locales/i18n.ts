import { watch } from 'vue'
import { watchEffect } from 'vue'
import { usePreferredLanguages } from '@vueuse/core'
import { createI18n } from 'vue-i18n'
import en from './en.yaml'
import ru from './ru.yaml'
const messages = {
  en,
  ru,
}

export const i18n = createI18n({
  legacy: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export const locale = i18n.global.locale

export const locales = ['en', 'ru']

export function changeLocale(loc) {
  i18n.global.locale = loc
}

const languages = usePreferredLanguages()

for (let i = 0; i < languages.value.length; i++) {
  const lang = languages.value[i]
  console.log(lang == locales[1])
  if (messages[lang]) {
    changeLocale(lang)
    break
  }
}
