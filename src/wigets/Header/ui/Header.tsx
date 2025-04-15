'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from 'app/providers/StoreProvider/config/store.ts';
import Image from 'next/image';
import { Logout } from 'features/LogoutUser';
import { AuthLinks } from 'shared/ui/AuthLinks/AuthLinks.tsx';
import { LangSwitcher } from 'wigets/LangSwitcher';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();
  const { isUserLoggedIn, isAuthChecked } = useSelector(
    (state: RootState) => state.user
  );
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`${styles['app-header']} ${isScrolled ? styles['scrolled'] : ''}`}
    >
      <nav className=" border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          <Link href={'/'} className="flex items-center">
            <Image
              src="/icon/rest.png"
              className={styles['app-header_rs-logo']}
              alt="Restful Logo"
              width={30}
              height={30}
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              RESTful API
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {isAuthChecked && isUserLoggedIn ? (
              <>
                <Link
                  href={'/'}
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800  whitespace-nowrap"
                >
                  {t('Main page')}
                </Link>
                <Logout isUserLoggedIn={isUserLoggedIn} />
              </>
            ) : (
              <AuthLinks />
            )}
            <LangSwitcher />
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-lg text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
