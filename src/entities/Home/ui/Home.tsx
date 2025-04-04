'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/providers/StoreProvider/config/store.ts';
import styles from './styles.module.css';
import { AuthLinks } from 'shared/ui/AuthLinks/AuthLinks.tsx';
import { PrivateNav } from 'shared/ui/PrivateNav/PrivateNav.tsx';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { isAuthChecked, isUserLoggedIn, user } = useSelector(
    (state: RootState) => state.user
  );
  const { t } = useTranslation();

  if (!isAuthChecked) return null;

  return (
    <div className={styles['container']}>
      <p className="text-2xl text-gray-200">
        {isUserLoggedIn
          ? `${t('Welcome back')}, ${user?.name}!`
          : `${t('Welcome')}!`}
      </p>
      {isAuthChecked && isUserLoggedIn ? <PrivateNav /> : <AuthLinks />}
    </div>
  );
};

Home.displayName = 'Home';
