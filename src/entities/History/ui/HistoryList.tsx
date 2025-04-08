'use client';

import { RootState } from 'app/providers/StoreProvider/config/store.ts';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage';
import { HistoryItem } from './HistoryItem';
import { ApiRequestState } from 'shared/model/types';
import styles from './styles.module.css'
import { useSelector } from 'react-redux';
import { Button } from 'shared/index';

export const HistoryList = () => {
  const { isAuthChecked } = useSelector((store: RootState) => store.user);
  const [storagedHistory, setStoragedHistory] = useLocalStorage<ApiRequestState[] | []>(
      {
        key: 'restful-client',
        defaultValue: [],
      }
    );
    const handleClearHistoryItem = (id: string):void => {
      setStoragedHistory(prev => prev.filter(item => item.id !== id))
    }

  if (!isAuthChecked) return null;
  return (
    <AuthGuards requireAuth={true}>
      <div className={styles["history-item-wrapper"]}>
        <div className={styles["history-item-wrapper__button-container"]}>
          {storagedHistory && storagedHistory.length ? <Button  title="Clear All" onClick={() => {setStoragedHistory(() => [])}} color="red"/> : null}
          </div>
      {storagedHistory && [...storagedHistory].reverse().map(history =>( 
        <HistoryItem key={history.id} history={history} handleClearHistoryItem={handleClearHistoryItem}/>
))}
</div>
    </AuthGuards>
  );
};

HistoryList.displayName = 'HistoryList';
