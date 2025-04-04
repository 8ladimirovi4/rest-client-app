'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { routesActions } from 'shared/model/routes.slice.ts';
import { useTranslation } from 'react-i18next';

export const AuthLinks = () => {
  const dispatch = useDispatch();
  const { setCurrentRoute } = routesActions;
  const { t } = useTranslation();

  return (
    <div className="flex">
      <Link
        href={'/login'}
        onClick={() => {
          dispatch(setCurrentRoute('/login'));
        }}
        className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800  whitespace-nowrap"
      >
        {t('Sign in')}
      </Link>
      <Link
        href={'/register'}
        onClick={() => {
          dispatch(setCurrentRoute('/register'));
        }}
        className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800  whitespace-nowrap"
      >
        {t('Sign up')}
      </Link>
    </div>
  );
};
AuthLinks.displayName = 'AuthLinks';
