import '../styles/globals.css';
// I18N
import { I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import i18next from 'i18next';
import spanishLiterals from '../i18n/es.json';
import englishLiterals from '../i18n/en.json';

i18next.use(LanguageDetector).init({
  interpolation: {
    // React already does escaping
    escapeValue: false
  },
  fallbackLng: 'en',
  // lng: 'en',
  debug: true,
  // Using simple hardcoded resources for simple example
  resources: {
    es: {
      translation: spanishLiterals
    },
    en: {
      translation: englishLiterals
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <I18nextProvider i18n={i18next}>
      <Component {...pageProps} />
    </I18nextProvider>
  );
}

export default MyApp;
