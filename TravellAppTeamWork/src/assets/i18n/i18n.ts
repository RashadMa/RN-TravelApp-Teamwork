import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import az from './az.json';
import ru from './ru.json';
import tr from './tr.json';
import de from './de.json';
import kr from './kr.json'


i18n.use(initReactI18next).init({
  compatibilityJSON:'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    az: az,
    ru: ru,
    tr: tr,
    de: de,
    kr: kr
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  },

});

export default i18n;