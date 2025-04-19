'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { buildUrl } from 'shared/utils/help';

export const PrivateNav = () => {
  const { t } = useTranslation();
  const { browserUrl, method } = useSelector(
    (state: RootState) => state.apiRequest
  );
  const currentUrl = new URL(window.location.href);

  return (
    <div data-testid={'private-nav'} className="flex">
      <Link
        href={buildUrl(currentUrl, method, browserUrl)}
        className="text-gray-200 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800  whitespace-nowrap"
      >
        {t('Restful')}
      </Link>
      <Link
        href="/history"
        className="text-gray-200 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800  whitespace-nowrap"
      >
        {t('History')}
      </Link>
      <Link
        href="/variables"
        className="text-gray-200 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800  whitespace-nowrap"
      >
        {t('Variables')}
      </Link>
    </div>
  );
};

PrivateNav.displayName = 'PrivateNav';
