import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    home: "Home",
    reports: "Market Reports",
    marketplace: "Marketplace",
    dashboard: "Dashboard",
    welcome: "Welcome",
    terminalAccess: "Terminal Access",
    intelligenceDashboard: "Market Intelligence Dashboard",
    liveData: "Live Data Sync",
    logout: "Logout",
    login: "Login",
    signUp: "Sign Up",
    profile: "My Profile",
    searchPlaceholder: "Search commodities, reports...",
    cmdK: "Press Cmd + K to search"
  },
  hi: {
    home: "होम",
    reports: "मार्केट रिपोर्ट्स",
    marketplace: "मार्केटप्लेस",
    dashboard: "डैशबोर्ड",
    welcome: "स्वागत है",
    terminalAccess: "टर्मिनल एक्सेस",
    intelligenceDashboard: "मार्केट इंटेलिजेंस डैशबोर्ड",
    liveData: "लाइव डेटा सिंक",
    logout: "लॉगआउट",
    login: "लॉगिन",
    signUp: "साइन अप",
    profile: "मेरी प्रोफाइल",
    searchPlaceholder: "वस्तुएं, रिपोर्ट खोजें...",
    cmdK: "खोजने के लिए Cmd + K दबाएं"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('klang') || 'en');

  useEffect(() => {
    localStorage.setItem('klang', lang);
  }, [lang]);

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
