'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  return (
    <footer
      className={classNames(
        styles['app-footer'],
        'bg-white  shadow-sm dark:bg-gray-900 m-0'
      )}
    >
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div ref={ref} className={styles['git-hub']}>
            <Image
              onClick={() => setOpen(!open)}
              src="/logos/git.png"
              className={styles['app-footer_logo']}
              alt="Rs-school Logo"
              width={30}
              height={30}
            />
            <div
              className={`${styles['git-hub__links']} ${open ? styles['_open'] : ''}`}
            >
              <a
                href="https://github.com/8ladimirovi4"
                target="_blank"
                className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                rel="noreferrer"
              >
                <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
                  Vladimir
                </span>
              </a>
              <a
                href="https://github.com/alekseng"
                target="_blank"
                className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                rel="noreferrer"
              >
                <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
                  Aleksandr
                </span>
              </a>
            </div>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <span className="me-4 md:me-6">© 2025 {t('Copyright')}</span>
            </li>
          </ul>
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            rel="noreferrer"
          >
            <Image
              src="/logos/rss-logo.svg"
              className={styles['app-footer_logo']}
              alt="Rs-school Logo"
              width={30}
              height={30}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              RS SCHOOL
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
