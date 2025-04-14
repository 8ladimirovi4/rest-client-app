'use client';
import { Button, Input } from 'shared/index';
import React from 'react';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { useTranslation } from 'react-i18next';

export const HeadersTab = () => {
  const { t } = useTranslation();
  const { headers } = useSelector((state: RootState) => state.apiRequest);
  const dispatch = useDispatch();

  const { setHeaders } = apiRequestActions;

  const addHeader = () => {
    dispatch(setHeaders({ headers: [...headers, { key: '', value: '' }] }));
  };

  const removeHeader = (idx: number) => {
    if (headers && headers.length === 1) {
      dispatch(setHeaders({ headers: [{ key: '', value: '' }] }));
      return;
    }
    const newHeaders = headers.filter((_, i) => i !== idx);
    dispatch(setHeaders({ headers: newHeaders }));
  };

  const updateHeader = (idx: number, key: string, value: string) => {
    const newHeaders = [...headers];
    newHeaders[idx] = { key, value };
    dispatch(setHeaders({ headers: newHeaders }));
  };

  return (
    <div className={styles['restful-wrapper_tabview-container__tab-wrapper']}>
      <div className={styles['restful-wrapper_tabview-container_query-button']}>
        <Button
          title={
            <>
              <span className="mr-2">+</span>
              <span>{t('Buttons.Add')}</span>
            </>
          }
          onClick={addHeader}
        />
      </div>
      {headers.map((header, idx) => (
        <div
          key={idx}
          className={styles['restful-wrapper_tabview-container_query']}
        >
          <Input
            id={idx.toString()}
            type="text"
            value={header.key}
            onChange={(e) => updateHeader(idx, e.target.value, header.value)}
            placeholder={t('Placeholders.Key')}
          />
          <Input
            id={(idx + 1).toString()}
            type="text"
            value={header.value}
            onChange={(e) => updateHeader(idx, header.key, e.target.value)}
            placeholder={t('Placeholders.Value')}
          />
          <Button
            color="red"
            title={t('Buttons.Remove')}
            onClick={() => removeHeader(idx)}
          />
        </div>
      ))}
    </div>
  );
};

HeadersTab.displayName = 'HeadersTab';
