import { useState, useCallback, useEffect } from 'react';

type Theme = 'dark' | 'light';

export const useCreateAppContext = function () {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  });

  const toggleTheme = useCallback(() => {
    setTheme((prevValue: Theme) => (prevValue === 'light' ? 'dark' : 'light'));
  }, []);

  // Persist theme to localStorage and apply to document
  useEffect(() => {
    localStorage.setItem('theme', theme);

    // Apply theme class to document element
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return {
    theme,
    toggleTheme,
  };
};
