'use client';
import { Button, Input } from 'shared/index';
import React from 'react';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { useTranslation } from 'react-i18next';

export const QueryTab = () => {
  const { t } = useTranslation();
  const { query } = useSelector((state: RootState) => state.apiRequest);
  const dispatch = useDispatch();

  const { setQuery } = apiRequestActions;

  const addQueryParam = () => {
    dispatch(setQuery({ query: [...query, { key: '', value: '' }] }));
  };

  const removeQueryParam = (idx: number) => {
    if (query && query.length === 1) {
      dispatch(setQuery({ query: [{ key: '', value: '' }] }));
      return;
    }
    const newParams = query.filter((_, i) => i !== idx);
    dispatch(setQuery({ query: newParams }));
  };

  const updateQueryParam = (idx: number, key: string, value: string) => {
    const newParams = [...query];
    newParams[idx] = { key, value };
    dispatch(setQuery({ query: newParams }));
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
          onClick={addQueryParam}
        />
      </div>
      {query.map((param, idx) => (
        <div
          key={idx}
          className={styles['restful-wrapper_tabview-container_query']}
        >
          <Input
            id={idx.toString()}
            type="text"
            value={param.key}
            onChange={(e) => updateQueryParam(idx, e.target.value, param.value)}
            placeholder={t('Placeholders.Key')}
          />
          <Input
            id={(idx + 1).toString()}
            type="text"
            value={param.value}
            onChange={(e) => updateQueryParam(idx, param.key, e.target.value)}
            placeholder={t('Placeholders.Value')}
          />
          <Button
            color="red"
            title={t('Buttons.Remove')}
            onClick={() => removeQueryParam(idx)}
          />
        </div>
      ))}
    </div>
  );
};

QueryTab.displayName = 'QueryTab';
