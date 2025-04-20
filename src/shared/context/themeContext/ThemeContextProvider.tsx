'use client';
import { useState, useEffect, PropsWithChildren } from 'react';
import { ThemeContext } from './ThemeContext';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage';
import { THEME } from 'shared/const/theme';

const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [userTheme, setUserTheme] = useLocalStorage({
    key: 'theme',
    defaultValue: THEME.DARK,
  });
  const [theme, setTheme] = useState<THEME>(userTheme);

  useEffect(() => {
    setUserTheme(theme);
    document.body.className = theme;
  }, [theme, setUserTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
