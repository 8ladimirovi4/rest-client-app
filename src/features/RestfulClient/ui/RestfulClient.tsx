//@ts-nocheck
'use client';
import React, { useEffect, useState } from 'react';
import { TabView } from './TabView';
import styles from './styles.module.css';
import Search from './Search';
import { QueryTab } from './QueryTab';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage';
import { apiRequest } from 'shared/api/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { ApiRequestState } from 'shared/model/types';
import { Spinner } from 'shared/index';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';
import { BodyTab } from './BodyTab';
import { HeadersTab } from './HeadersTab';

export const RestfulClient = () => {
  const { isAuthChecked } = useSelector((store: RootState) => store.user);
  const [servResponse, setServResponse] = useState(null);
  const [servData, setServData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiData = useSelector((state: RootState) => state.apiRequest);
  const [storagedData, setApiStoragedData] = useLocalStorage<ApiRequestState[]>(
    {
      key: 'restful-client',
      defaultValue: [],
    }
  );

  const { browserUrl, method, query, triggerFetch, body, headers } = apiData;
  const resComplite = (res) => {
    setServResponse(res);
  };
  const catchComplite = (error: Error) => {
    setError(error.message);
  };
  const finnalyComplite = () => {
    setLoading(false);
  };
  const fetchData = async () => {
    setLoading(true);
    setError('');
    setServData(null);

    if (!browserUrl.trim()) {
      setLoading(false);
      return;
    }

    const data = await apiRequest({
      resComplite,
      catchComplite,
      finnalyComplite,
      browserUrl: `/api/proxy?url=${browserUrl}`,
      method,
      query,
      body,
      headers,
    });
    setApiStoragedData([...storagedData, apiData]);
    setServData(data);
  };

  useEffect(() => {
    if (!storagedData) setApiStoragedData([]);
  }, []);

  useEffect(() => {
    fetchData();
  }, [triggerFetch]);

  if (!isAuthChecked) return null;

  return (
    <AuthGuards requireAuth={true}>
      <div className={styles['restful-wrapper']}>
        <Search />
        <div className={styles['restful-wrapper_tabview-container']}>
          <TabView
            tabs={[
              {
                label: 'QUERY',
                content: <QueryTab />,
              },
              {
                label: 'BODY',
                content: <BodyTab />,
              },
              {
                label: 'HEADERS',
                content: <HeadersTab />,
              },
              {
                label: 'VARIABLES',
                content: <p>This is the Contacts tab content.</p>,
              },
            ]}
          />
        </div>
        {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
        {loading && <Spinner />}
        {servData && (
          <h1>Response status {servResponse && servResponse.status}</h1>
        )}

        <pre className={styles['restful-wrapper_respose-text']}>
          {servData && JSON.stringify(servData, null, 2)}
        </pre>
      </div>
    </AuthGuards>
  );
};

RestfulClient.displayName = 'RestfulClient';
