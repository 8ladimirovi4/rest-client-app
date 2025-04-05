'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export const PrivateNav = () => {
  const { t } = useTranslation();

  return (
    <div className="flex">
      <Link
        href="/restful"
        className="text-gray-200 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800  whitespace-nowrap"
      >
        {t('Restful')}
      </Link>
      <Link
        href="/history"
        className="text-gray-200 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800  whitespace-nowrap"
      >
        {t('History')}
      </Link>
      <Link
        href="/variables"
        className="text-gray-200 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800  whitespace-nowrap"
      >
        {t('Variables')}
      </Link>
    </div>
  );
};

PrivateNav.displayName = 'PrivateNav';
