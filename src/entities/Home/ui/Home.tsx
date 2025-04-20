'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/providers/StoreProvider/config/store.ts';
import styles from './styles.module.css';
import { AuthLinks } from 'shared/ui/AuthLinks/AuthLinks.tsx';
import { PrivateNav } from 'shared/ui/PrivateNav/PrivateNav.tsx';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import aleksandrPhoto from 'shared/assets/images/Aleksandr.jpeg';
import vladimirPhoto from 'shared/assets/images/Vladimir.jpeg';

const textClass = 'text-gray-700 dark:text-white';

export const Home = () => {
  const { isAuthChecked, isUserLoggedIn, user } = useSelector(
    (state: RootState) => state.user
  );
  const { t } = useTranslation();

  if (!isAuthChecked) return null;

  return (
    <div className={styles['container']}>
      <p className={`${textClass} text-2xl`}>
        {isUserLoggedIn
          ? `${t('Home.Welcome back')}, ${user?.name}!`
          : `${t('Home.Welcome')}!`}
      </p>
      {isAuthChecked && isUserLoggedIn ? <PrivateNav /> : <AuthLinks />}
      <p className={`${textClass} pl-5 pr-5 text-lg`}>{t('Home.About us')}</p>
      <p className="w"></p>
      <p className={`${textClass} text-xl`}>{t('Home.Our team')}</p>
      <div className={styles['images-container']}>
        <div className={styles['image']}>
          <p className={`${textClass} text-lg`}>{t('Home.Vladimir')}</p>
          <Image
            src={vladimirPhoto}
            alt="vladimir-photo"
            width={150}
            height={150}
          />
          <p className={`${textClass} text-lg`}>Team-lead</p>
          <p className={`${textClass} text-lg`}>Frontend developer</p>
        </div>
        <div className={styles['image']}>
          <p className={`${textClass} text-lg`}>{t('Home.Aleksandr')}</p>
          <Image
            src={aleksandrPhoto}
            alt="vladimir-photo"
            width={150}
            height={150}
          />
          <p className={`${textClass} text-lg`}>Frontend developer</p>
        </div>
      </div>
      <ul className={`${textClass} pl-5 pr-5`}>
        <li className="text-xl mb-5">{t('Home.Our app.App')}</li>
        <li>{t('Home.Our app.1')}</li>
        <li>{t('Home.Our app.2')}</li>
        <li>{t('Home.Our app.3')}</li>
        <li>{t('Home.Our app.4')}</li>
        <li>{t('Home.Our app.5')}</li>
        <li>{t('Home.Our app.6')}</li>
        <li>{t('Home.Our app.7')}</li>
      </ul>
      <p className={`${textClass} p-5 text-lg`}>{t('Home.School info')}</p>
    </div>
  );
};

Home.displayName = 'Home';
