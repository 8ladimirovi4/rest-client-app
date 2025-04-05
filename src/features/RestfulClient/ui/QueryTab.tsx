'use client';
import { Button, Input } from 'shared/index';
import React from 'react';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { RootState } from 'app/providers/StoreProvider/config/store';

export const QueryTab = () => {
  const { query } = useSelector((state: RootState) => state.apiRequest);
  const dispatch = useDispatch();

  const { setQuery } = apiRequestActions;

  const addQueryParam = () => {
    dispatch(setQuery({ query: [...query, { key: '', value: '' }] }));
  };

  const removeQueryParam = (idx: number) => {
    const newParams = query.filter((_, i) => i !== idx);
    dispatch(setQuery({ query: newParams }));
  };

  const updateQueryParam = (idx: number, key: string, value: string) => {
    const newParams = [...query];
    newParams[idx] = { key, value };
    dispatch(setQuery({ query: newParams }));
  };

  return (
    <div>
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
            placeholder="Key"
          />
          <Input
            id={(idx + 1).toString()}
            type="text"
            value={param.value}
            onChange={(e) => updateQueryParam(idx, param.key, e.target.value)}
            placeholder="Value"
          />
          <Button title={'remove'} onClick={() => removeQueryParam(idx)} />
        </div>
      ))}
      <div className={styles['restful-wrapper_tabview-container_query-button']}>
        <Button title={'add param'} onClick={addQueryParam} />
      </div>
    </div>
  );
};

QueryTab.displayName = 'QueryTab';
