'use client';
import { Button, Input } from 'shared/index';
import React, { useState } from 'react';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { apiRequestActions } from 'shared/model/apiRequest.slice';

export const HeadersTab = () => {
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const dispatch = useDispatch();

  const { setHeaders: setRequestHeaders } = apiRequestActions;

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (idx: number) => {
    const newHeaders = headers.filter((_, i) => i !== idx);
    setHeaders(newHeaders);
  };

  const updateHeader = (idx: number, key: string, value: string) => {
    const newHeaders = [...headers];
    newHeaders[idx] = { key, value };
    setHeaders(newHeaders);
    dispatch(setRequestHeaders({ headers: newHeaders }));
  };

  return (
    <div>
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
            placeholder="Key"
          />
          <Input
            id={(idx + 1).toString()}
            type="text"
            value={header.value}
            onChange={(e) => updateHeader(idx, header.key, e.target.value)}
            placeholder="Value"
          />
          <Button title={'remove'} onClick={() => removeHeader(idx)} />
        </div>
      ))}
      <div className={styles['restful-wrapper_tabview-container_query-button']}>
        <Button title={'add header'} onClick={addHeader} />
      </div>
    </div>
  );
};

HeadersTab.displayName = 'HeadersTab';
