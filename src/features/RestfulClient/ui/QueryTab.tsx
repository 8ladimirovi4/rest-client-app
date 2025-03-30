'use client';
import { Button, Input } from 'shared/index';
import React from 'react';
import styles from './styles.module.css';
import { QueryTabProps } from '../types';

export const QueryTab = ({ setQueryParams, queryParams }: QueryTabProps) => {
  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: '', value: '' }]);
  };

  const removeQueryParam = (idx: number) => {
    const newParams = queryParams.filter((_, i) => i !== idx);
    setQueryParams(newParams);
  };

  const updateQueryParam = (idx: number, key: string, value: string) => {
    const newParams = [...queryParams];
    newParams[idx] = { key, value };
    setQueryParams(newParams);
  };
  return (
    <div>
      {queryParams.map((param, idx) => (
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
