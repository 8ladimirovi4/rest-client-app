'use client';
import { createContext } from 'react';
import { THEME } from 'shared/const/theme';

export interface IThemeContext {
  theme?: THEME;
  setTheme?: (theme: THEME) => void;
}

export const ThemeContext = createContext<IThemeContext>({});
