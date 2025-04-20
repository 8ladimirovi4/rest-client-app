import { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextProviderProps {
  children: ReactNode;
}

export interface ThemeContextProps {
  children: React.ReactNode;
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
