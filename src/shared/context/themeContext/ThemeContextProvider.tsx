'use client';
import { useState, useEffect, PropsWithChildren } from 'react';
import { ThemeContext } from './ThemeContext';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage';
import { THEME } from 'shared/lib/utils';
import { useRunOnce } from 'shared/lib/hooks/useRunOnce';

const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [userTheme, setUserTheme] = useLocalStorage({
    key: 'theme',
    defaultValue: THEME.LIGHT,
  });

  const [themeValue, setThemeValue] = useState(THEME.LIGHT);

  useRunOnce(
    {
      fn: () => setThemeValue(userTheme),
    },
    [userTheme]
  );

  useEffect(() => {
    setUserTheme(themeValue);
    document.body.className = themeValue;
  }, [setUserTheme, themeValue]);

  return (
    <ThemeContext.Provider value={[themeValue, setThemeValue]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
