'use client';
import { createContext } from 'react';
import { THEME } from 'shared/lib/utils';

export const ThemeContext = createContext<[THEME, React.Dispatch<THEME>]>([
  THEME.DARK,
  () => {},
]);
