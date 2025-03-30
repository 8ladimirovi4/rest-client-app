'use client';
import React, { ChangeEvent } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import { Select } from 'shared/index';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/providers/StoreProvider/config/store.ts';
import Image from 'next/image';
import { Logout } from 'features/LogoutUser';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage';
import { LANGS } from 'shared/constants/langs';
import { langActions } from 'shared/model/lang.slice';

export const Header = () => {
  const dispatch = useDispatch();
  const [_, setLocalStoragelang] = useLocalStorage({
    key: 'lang',
    defaultValue: 'en',
  });
  const { lang } = useSelector((state: RootState) => state.lang);
  const { isUserLoggedIn } = useSelector((state: RootState) => state.user);

  const { setLang } = langActions;
  const handleSetLanguage = (evt: ChangeEvent<HTMLSelectElement>) => {
    const { value } = evt.target;
    setLocalStoragelang(value);
    dispatch(setLang({ value }));
  };

  return (
    <header className={styles['app-header']}>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          <Link
            href={!isUserLoggedIn ? '/' : '/home'}
            onClick={() => {}}
            className="flex items-center"
          >
            <Image
              src="/icon/rest.png"
              className="mr-3  "
              alt="Restful Logo"
              width={30}
              height={30}
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              RESTful API
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <Select
              id="1"
              options={LANGS}
              value={lang}
              onChange={handleSetLanguage}
            />
            {!isUserLoggedIn && (
              <>
                <Link
                  href={!isUserLoggedIn ? '/' : '/home'}
                  onClick={() => {}}
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800  whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  href={!isUserLoggedIn ? '/register' : '/home'}
                  onClick={() => {}}
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800  whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </>
            )}
            {isUserLoggedIn && <Logout isUserLoggedIn={isUserLoggedIn} />}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          ></div>
        </div>
      </nav>
    </header>
  );
};

Header.displayName = 'Header';
