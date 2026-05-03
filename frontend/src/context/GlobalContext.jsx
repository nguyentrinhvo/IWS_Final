import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchExchangeRates } from '../services/exchangeApi';
import en from '../assets/locales/en.json';
import vi from '../assets/locales/vi.json';

const GlobalContext = createContext();

const translations = {
  EN: en,
  VI: vi
};

export const GlobalProvider = ({ children }) => {
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'VND');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'EN');
  const [rates, setRates] = useState(null);

  useEffect(() => {
    const getRates = async () => {
      const cacheKey = `rates_${currency}`;
      const cachedData = localStorage.getItem(cacheKey);
      const now = Date.now();

      if (cachedData) {
        const { rates: storedRates, timestamp } = JSON.parse(cachedData);
        if (now - timestamp < 3600000) {
          setRates(storedRates);
          return;
        }
      }

      const data = await fetchExchangeRates(currency);
      if (data) {
        setRates(data);
        localStorage.setItem(cacheKey, JSON.stringify({
          rates: data,
          timestamp: now
        }));
      }
    };
    getRates();
  }, [currency]);

  const t = (key) => {
    const langKey = language?.toUpperCase() || 'EN';
    return translations[langKey]?.[key] || key;
  };

  return (
    <GlobalContext.Provider value={{ currency, setCurrency, language, setLanguage, rates, t }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
