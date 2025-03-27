import { useContext } from 'react';
import { ThemeContext } from 'shared/context/themeContext/ThemeContext';

export const useTheme = () => useContext(ThemeContext);
