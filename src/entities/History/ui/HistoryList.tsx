'use client';
import { RootState } from 'app/providers/StoreProvider/config/store.ts';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage';
import { HistoryItem } from './HistoryItem';
import { ApiRequestState } from 'shared/model/types';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spinner } from 'shared/index';
import Link from 'next/link';
import { buildUrl } from 'shared/utils/help';
import { useEffect } from 'react';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { useTranslation } from 'react-i18next';

export const HistoryList = () => {
  const { t } = useTranslation();
  const { isAuthChecked } = useSelector((store: RootState) => store.user);
  const { method, browserUrl } = useSelector(
    (state: RootState) => state.apiRequest
  );
  const [storagedHistory, setStoragedHistory] = useLocalStorage<
    ApiRequestState[] | []
  >({
    key: 'restful-client',
    defaultValue: [],
  });
  const dispatch = useDispatch();

  const { setBrowserUrl, setHistoryState } = apiRequestActions;
  const currentUrl =
    typeof window !== 'undefined' ? new URL(window.location.href) : null;

  const handleClearHistoryItem = (id: string): void => {
    setStoragedHistory((prev) => prev.filter((item) => item.id !== id));
    dispatch(setHistoryState({}));
  };

  const handleClearHistory = (): void => {
    setStoragedHistory(() => []);
    dispatch(setHistoryState({}));
  };

  useEffect(() => {
    if (storagedHistory && !storagedHistory.length)
      dispatch(setBrowserUrl({ browserUrl: '' }));
  }, [dispatch, setBrowserUrl, storagedHistory]);

  if (!isAuthChecked) return null;
  if (!storagedHistory) return <Spinner />;
  return (
    <AuthGuards requireAuth={true}>
      <div className={styles['history-item-wrapper']}>
        {storagedHistory && storagedHistory.length ? (
          <>
            <div className={styles['history-item-wrapper__button-container']}>
              <Button
                title={t('Buttons.ClearAll')}
                onClick={handleClearHistory}
                color="red"
              />
            </div>
            {[...storagedHistory].reverse().map((history) => (
              <HistoryItem
                key={history.id}
                history={history}
                handleClearHistoryItem={handleClearHistoryItem}
              />
            ))}
          </>
        ) : (
          <>
            <p className="text-4xl text-gray-500 dark:text-gray-400 text-center py-4">
              {t('EmptyState.NoRequests')}
            </p>
            <p className="text-4xl text-gray-500 dark:text-gray-400 text-center py-4">
              {t('EmptyState.EmptyPrompt')}
            </p>
            <p className="text-2xl text-gray-500 dark:text-gray-400 text-center py-4">
              <Link
                href={
                  currentUrl
                    ? buildUrl(currentUrl, method, browserUrl)
                    : 'restful'
                }
                className="text-blue-500 hover:underline"
              >
                {t('EmptyState.RestfulClientLink')}
              </Link>
            </p>
          </>
        )}
      </div>
    </AuthGuards>
  );
};

HistoryList.displayName = 'HistoryList';
