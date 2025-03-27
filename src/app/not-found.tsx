'use client';
import React from 'react';
import styles from './styles.module.css';
import { Button } from 'shared';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();
  return (
    <div className={styles['not-found-wrapper']}>
      <div className={styles['not-found-wrapper_title']}>404</div>
      <p className={styles['not-found-wrapper_message']}>Страница не найдена</p>
      <div className={styles['not-found-wrapper_button']}></div>
      <div>
        <Button
          title={'Go back'}
          onClick={() => {
            router.back();
          }}
        />
      </div>
    </div>
  );
};

export default NotFound;
