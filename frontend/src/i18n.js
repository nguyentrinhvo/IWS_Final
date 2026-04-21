import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import adminEn from './locales/en/admin.json';
import adminVi from './locales/vi/admin.json';

const savedLanguage = localStorage.getItem('i18nextLng_admin') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { admin: adminEn },
      vi: { admin: adminVi }
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    defaultNS: 'admin',
    interpolation: {
      escapeValue: false
    }
  });

// Setup listener to save lang to local storage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng_admin', lng);
});

export default i18n;
