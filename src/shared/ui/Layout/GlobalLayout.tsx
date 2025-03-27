'use client';
import React, { ReactNode } from 'react';
import ThemeContextProvider from 'shared/context/themeContext/ThemeContextProvider';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Provider } from 'react-redux';
import { store } from 'app/providers/StoreProvider/config/store';
import { ErrorFallback } from 'wigets/PageError';
import styles from './styles.module.css';

export const GlobalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ErrorBoundary errorComponent={ErrorFallback}>
        <ThemeContextProvider>
          <div className={styles['app-wrapper']}>
            <header className={styles['app-header']}>APP HEADER</header>
            <main className={styles['app-content']}>{children}</main>
            <footer className={styles['app-footer']}>APP FOOTER</footer>
          </div>
        </ThemeContextProvider>
      </ErrorBoundary>
    </Provider>
  );
};

GlobalLayout.displayName = 'GlobalLayout';
