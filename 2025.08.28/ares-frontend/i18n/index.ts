import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./locales/en-US/translations.json";
import translationKo from "./locales/ko-KR/translations.json";

const resources = {
  en: { translation: translationEn },
  ko: { translation: translationKo },
};

const LANGUAGE_KEY = "@app_language";

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: (callback: (lang: string) => void) => {
    AsyncStorage.getItem(LANGUAGE_KEY)
      .then((savedLanguage) => {
        if (savedLanguage) {
          callback(savedLanguage);
          return;
        }

        const deviceLocales = Localization.getLocales();
        const deviceLocale = deviceLocales[0]?.languageTag || "ko-KR";
        const languageCode = deviceLocale.split("-")[0];

        if (languageCode in resources) {
          callback(languageCode);
        } else {
          callback("ko");
        }
      })
      .catch(() => {
        callback("ko");
      });
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    if (typeof window !== "undefined") {
      await AsyncStorage.setItem(LANGUAGE_KEY, lng);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: {
      "en-*": ["en"],
      "ko-*": ["ko"],
      default: ["ko"],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
    detection: {
      order: ["asyncStorage"],
    },
  });

export default i18n;
