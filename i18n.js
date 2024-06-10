import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/eng.json";
import translationUA from "./locales/ukr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    ua: {
      translation: translationUA,
    },
  },
  lng: "en", // Устанавливаем язык по умолчанию
  fallbackLng: "en", // Язык по умолчанию, если нет соответствующих переводов
  interpolation: {
    escapeValue: false, // Необходимо для интерполяции react
  },
});

export default i18n;
