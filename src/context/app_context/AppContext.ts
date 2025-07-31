import { useState, useCallback } from 'react';

type Theme = 'dark' | 'light';

export const useCreateAppContext = function () {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = useCallback(() => {
    setTheme((prevValue: Theme) => (prevValue === 'light' ? 'dark' : 'light'));
  }, []);

  return {
    theme,
    toggleTheme,
  };
};
