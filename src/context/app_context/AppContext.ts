'use client';

import { useState, useCallback, useEffect } from 'react';

type Theme = 'dark' | 'light';

export const useCreateAppContext = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme((prevValue) => (prevValue === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme, mounted]);

  return { theme, toggleTheme, mounted };
};
