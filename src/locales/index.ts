import { createI18n } from "vue-i18n";
import LangEN from "./lang/en";
import LangZH from "./lang/zh";

const i18nConfig = createI18n({
  locale: uni.getLocale() || "zh",
  messages: {
    en: LangEN,
    zh: LangZH,
  },
  fallbackLocale: "zh", // 回退语言
  legacy: false,
});

export default i18nConfig;
