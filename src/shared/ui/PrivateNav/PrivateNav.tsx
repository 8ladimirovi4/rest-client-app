'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { buildUrl } from 'shared/utils/help';
import { backgrounds, linkStyles } from 'shared/styles/styles.ts';

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
        className={`${linkStyles} ${backgrounds} `}
      >
        {t('Restful')}
      </Link>
      <Link href="/history" className={`${linkStyles} ${backgrounds}`}>
        {t('History')}
      </Link>
      <Link href="/variables" className={`${linkStyles} ${backgrounds}`}>
        {t('Variables')}
      </Link>
    </div>
  );
};

PrivateNav.displayName = 'PrivateNav';
