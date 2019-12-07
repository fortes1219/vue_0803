import Vue from 'vue'
import Cookies from 'js-cookie'
import VueI18n from 'vue-i18n'
import twLocale from './zh_tw'
import enLocale from './en'
import jpLocale from './jp'
import locale_TW from 'element-ui/lib/locale/lang/zh-TW'
import locale_EN from 'element-ui/lib/locale/lang/en'
import locale_JA from 'element-ui/lib/locale/lang/ja'
// 這裡需要element UI 的locale設置
import locale from 'element-ui/lib/locale'

Vue.use(VueI18n)

// element UI 所使用的多語切換
locale.i18n((key, value) => i18n.t(key, value)) // i18n.t(key, value) = $t(key, value)

const messages = {
  en: {
    ...enLocale,
    ...locale_EN
  },
  zh_tw: {
    ...twLocale,
    ...locale_TW
  },
  jp: {
    ...jpLocale,
    ...locale_JA
  }
}

const languageKey = 'language'
const chooseLanguage = Cookies.get('language')

export const getLanguage = () => {
  Cookies.get(languageKey)
  if (chooseLanguage) { return chooseLanguage }

  // 如果沒有選擇任何一項語言
  const language = (navigator.language).toLowerCase() // 將瀏覽器回傳語value字串統一為小寫
  const locales = Object.keys(messages) // { en, zh_tw, jp }
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'zh_tw' // 沒選擇語言的時候，預設轉到繁體中文
}

export const setLanguage = (language) => {
  i18n.locale = language
  Cookies.set(languageKey, language)
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  messages,
  silentTranslationWarn: true
})

export default i18n
