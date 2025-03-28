'use client';
import React, { ReactNode } from 'react';
import ThemeContextProvider from 'shared/context/themeContext/ThemeContextProvider';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Provider } from 'react-redux';
import { store } from 'app/providers/StoreProvider/config/store';
import styles from './styles.module.css';
import { ErrorFallback, Header } from 'wigets/index';

export const GlobalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ErrorBoundary errorComponent={ErrorFallback}>
        <ThemeContextProvider>
          <div className={styles['app-wrapper']}>
            <Header />
            <main className={styles['app-content']}>{children}</main>
            <footer className={styles['app-footer']}>APP FOOTER</footer>
          </div>
        </ThemeContextProvider>
      </ErrorBoundary>
    </Provider>
  );
};

GlobalLayout.displayName = 'GlobalLayout';
