import i18nConfig from '@/locales'

export const useLocale: () => [
  string,
  (locale: typeof i18nConfig.global.locale.value) => void
] = () => {
  const currentLocal = uni.getLocale()

  function setLocale(locale: typeof i18nConfig.global.locale.value) {
    uni.setLocale(locale)
    i18nConfig.global.locale.value = locale
  }

  return [currentLocal, setLocale]
}
