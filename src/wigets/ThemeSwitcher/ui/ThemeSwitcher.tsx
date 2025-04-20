import { useTheme } from 'shared/lib/hooks/useTheme.ts';
import styles from './ThemeSwitcher.module.css';
import { THEME } from 'shared/const/theme.ts';
import { backgrounds } from 'shared/styles/styles.ts';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`${styles['theme-btn']} ${theme === THEME.DARK ? styles['_dark'] : ''} text-white dark:text-gray-900 bg-gray-700 dark:bg-gray-400`}
    >
      <span className={styles['theme-btn-text']}>
        {theme === THEME.DARK ? 'dark mode' : 'light mode'}
      </span>
      <div className={`${styles['theme-btn-circle']} ${backgrounds}`}></div>
    </button>
  );
};
