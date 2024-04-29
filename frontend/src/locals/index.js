import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './resources';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallBackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
