/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Lang = 'ka' | 'en';
type Theme = 'light' | 'dark';

interface AppContextType {
  lang: Lang;
  theme: Theme;
  toggleLang: () => void;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations = {
  ka: {
    heroTitle: 'ინტერაქტიული\nსამეცნიერო\nნავიგატორი',
    heroSub: 'აღმოაჩინე შენი აკადემიური გზა 3D კოსმოსური რუკის გამოყენებით.',
    science: 'მეცნიერება',
    map: 'რუკა',
    test: 'კარიერის ტესტი',
    community: 'ფორუმი',
    about: 'ჩვენ შესახებ',
    path: 'აკადემიური გზა',
    resources: 'უნარები & რესურსები',
    help: 'დახმარება',
    contact: 'კონტაქტი',
    login: 'შესვლა',
    langText: 'ენა',
    themeText: 'თემა',
    footer: 'Academy Compass. შექმნილია საქართველოში.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use'
  },
  en: {
    heroTitle: 'Interactive\nScientific\nNavigator',
    heroSub: 'Discover your academic path using the 3D cosmic map.',
    science: 'Science',
    map: 'Map',
    test: 'Career Quiz',
    community: 'Forum',
    about: 'About Us',
    path: 'Academic Path',
    resources: 'Skills & Resources',
    help: 'Help',
    contact: 'Contact',
    login: 'Login',
    langText: 'Lang',
    themeText: 'Theme',
    footer: 'Academy Compass. Created in Georgia.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use'
  }
};

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('ka');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    if (document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
    const savedLang = localStorage.getItem('lang') as Lang | null;
    if (savedLang && (savedLang === 'en' || savedLang === 'ka')) {
      setLang(savedLang);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleLang = () => {
    const newLang = lang === 'ka' ? 'en' : 'ka';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
  };

  const t = (key: string): string => {
    const dict = translations[lang];
    return (dict as Record<string, string>)[key] ?? key;
  };

  return (
    <AppContext.Provider value={{ lang, theme, toggleLang, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within GlobalProvider');
  return context;
}
