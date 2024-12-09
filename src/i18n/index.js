import { createI18n } from 'vue-i18n'
import nl from './locales/nl.json'
import en from './locales/en.json'

export default createI18n({
  locale: localStorage.getItem('locale') || import.meta.env.VITE_DEFAULT_LOCALE,
  legacy: false,
  globalInjection: true,
  messages: {
    nl,
    en
  }
})
