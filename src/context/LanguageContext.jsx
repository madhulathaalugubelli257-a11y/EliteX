import { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../translations/en';
import { hi } from '../translations/hi';
import { te } from '../translations/te';

const translations = { en, hi, te };

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  // Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('elitex-language');
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('elitex-language', lang);
    }
  };

  // Utility to get nested translation (e.g., 'home.heroTitle')
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Fallback to English if translation is missing
        let fallbackValue = translations['en'];
        for (const fk of keys) {
          if (fallbackValue && fallbackValue[fk]) {
            fallbackValue = fallbackValue[fk];
          } else {
            return key; // return key itself if not found even in English
          }
        }
        return fallbackValue;
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
