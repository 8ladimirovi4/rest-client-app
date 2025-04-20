'use client';
import { useState, useEffect, PropsWithChildren } from 'react';
import { ThemeContext } from './ThemeContext';
import { THEME } from 'shared/const/theme';

const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<THEME | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as THEME | null;
    const actualTheme = storedTheme ?? THEME.DARK;
    setTheme(actualTheme);
    document.body.className = actualTheme;
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme);
      document.body.className = theme;
    }
  }, [theme]);

  if (!theme) return null;
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
