'use client';

import { useSelector } from 'react-redux';
import { RootState } from 'app/providers/StoreProvider/config/store.ts';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage';
import { HistoryItem } from './HistoryItem';
import { ApiRequestState } from 'shared/model/types';
import styles from './styles.module.css'

export const HistoryList = () => {
  const { isAuthChecked } = useSelector((store: RootState) => store.user);
  const [storagedHistory] = useLocalStorage<ApiRequestState[] | []>(
      {
        key: 'restful-client',
        defaultValue: [],
      }
    );

  if (!isAuthChecked) return null;
  return (
    <AuthGuards requireAuth={true}>
      <div className={styles["history-item-wrapper"]}>
      {storagedHistory && storagedHistory.map(history =>( 
        <HistoryItem key={history.id} history={history}/>
))}
</div>
    </AuthGuards>
  );
};

HistoryList.displayName = 'HistoryList';
