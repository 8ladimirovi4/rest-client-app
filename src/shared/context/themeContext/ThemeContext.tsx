'use client';
import { createContext } from 'react';
import { THEME } from 'shared/const/theme';

export const ThemeContext = createContext<[THEME, React.Dispatch<THEME>]>([
  THEME.DARK,
  () => {},
]);
