//@ts-nocheck
'use client';
import React, { useEffect, useState } from 'react';
import { TabView } from './TabView';
import styles from './styles.module.css';
import Search from './Search';
import { QueryTab } from './QueryTab';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage';
import { apiRequest } from 'shared/api/apiRequest';
import { useSelector } from 'react-redux';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { ApiRequestState } from 'shared/model/types';

export const RestfulClient = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiData = useSelector((state: RootState) => state.apiRequest)
  const [storagedData, setApiStoragedData] = useLocalStorage<ApiRequestState[]>({
      key: 'restful-client',
      defaultValue: []
    });
  const {browserUrl, method, query} = apiData
  const fetchData = async () => {
    const data = await apiRequest({
      browserUrl:`/api/proxy?url=${browserUrl}`,
      method,
      query
    })
    setApiStoragedData([...storagedData, apiData])
    setResponse(data)
  }
  // const fetchData = async () => {
  //   setLoading(true);
  //   setError('');
  //   setResponse(null);

  //   if (!apiUrl.trim()) {
  //     setError('Set API URL');
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const res = await fetch(finalUrl);
  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.error || 'Ошибка запроса');
  //     }

  //     setResponse(data);
  //   } catch (error) {
  //     const err = error as Error;
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
useEffect(() => {
if(!storagedData) setApiStoragedData([])
},[])

  return (
    <div className={styles['restful-wrapper']}>
      <Search fetchData={fetchData} />
      <div className={styles['restful-wrapper_tabview-container']}>
        <TabView
          tabs={[
            {
              label: 'QUERY',
              content: (
                <QueryTab
                />
              ),
            },
            {
              label: 'BODY',
              content: <p>This is the Dashboard tab content.</p>,
            },
            {
              label: 'HEADERS',
              content: <p>This is the Settings tab content.</p>,
            },
            {
              label: 'VARIABLES',
              content: <p>This is the Contacts tab content.</p>,
            },
          ]}
        />
      </div>
      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}

      {response && (
        <pre className={styles['restful-wrapper_respose-text']}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
};

RestfulClient.displayName = 'RestfulClient';
