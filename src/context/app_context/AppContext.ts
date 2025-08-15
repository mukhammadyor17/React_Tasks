'use client';

import { useState, useCallback, useEffect } from 'react';

type Theme = 'dark' | 'light';

export const useCreateAppContext = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'light';
    }
    return 'light'; // при SSR
  });

  const toggleTheme = useCallback(() => {
    setTheme((prevValue) => (prevValue === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return { theme, toggleTheme };
};
