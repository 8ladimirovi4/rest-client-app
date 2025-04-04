import i18n from 'i18next';
import en from '../../locales/en.json';
import ru from '../../locales/ru.json';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  supportedLngs: ['en', 'ru'],
  interpolation: { escapeValue: false },
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
});

export default i18n;
