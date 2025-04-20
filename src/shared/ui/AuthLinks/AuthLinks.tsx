'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { backgrounds, linkStyles } from 'shared/styles/styles.ts';

export const AuthLinks = () => {
  const { t } = useTranslation();

  return (
    <div className="flex">
      <Link href={'/login'} className={`${linkStyles} ${backgrounds}`}>
        {t('Sign in')}
      </Link>
      <Link href={'/register'} className={`${linkStyles} ${backgrounds}`}>
        {t('Sign up')}
      </Link>
    </div>
  );
};
AuthLinks.displayName = 'AuthLinks';
