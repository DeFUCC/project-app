import { createI18n } from 'vue-i18n'
import en from './en.yaml'
import ru from './ru.yaml'

export const i18n = createI18n({
  legacy: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ru,
  },
})

export const locale = i18n.global.locale

export const locales = ['en', 'ru']

export function changeLocale(loc) {
  i18n.global.locale = loc
}
