import { useContext } from 'react';
import { ThemeContext } from 'shared/context/themeContext/ThemeContext';
import { THEME } from 'shared/const/theme.ts';

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    setTheme?.(newTheme);
  };

  return { theme, toggleTheme };
};
