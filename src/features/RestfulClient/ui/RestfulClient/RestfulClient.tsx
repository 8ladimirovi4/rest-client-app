'use client';
import React, { useEffect, useState } from 'react';
import { TabView } from '../TabView/TabView';
import styles from '../styles.module.css';
import { Search } from '../Search/Search';
import { QueryTab } from '../QueryTab/QueryTab';
import { useLocalStorage } from 'shared/lib/hooks/useLocalStorage';
import { apiRequest } from 'shared/api/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { ApiRequestState } from 'shared/model/types';
import { Flayout, Spinner } from 'shared/index';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';
import { BodyTab } from '../BodyTab/BodyTab';
import { HeadersTab } from '../HeadersTab/HeadersTab';
import { VariablesTab } from '../VariablesTab/VariablesTab';
import { formatDateToString, replaceVariables } from 'shared/utils/help';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { ApiResponse } from 'shared/api/types';
import { HeadersType, QueryParam } from '../../types';
import { GenerateCodeTab } from '../GenerateCodeTab/GenerateCodeTab';
import Editor from '@monaco-editor/react';
import { useTranslation } from 'react-i18next';

const RestfulClient = () => {
  const [dateNow] = useState<Date>(new Date());
  const { t } = useTranslation();
  const { isAuthChecked } = useSelector((store: RootState) => store.user);
  const [servResponse, setServResponse] = useState<ApiResponse<unknown>>({
    status: '',
    data: null,
  });
  const [servData, setServData] = useState<ApiResponse<unknown> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const apiData = useSelector((state: RootState) => state.apiRequest);
  const [apiStoragedData, setApiStoragedData] = useLocalStorage<
    ApiRequestState[]
  >({
    key: 'restful-client',
    defaultValue: [],
  });
  const dispatch = useDispatch();

  const { browserUrl, method, query, body, headers, variables, id } = apiData;
  const { setApiStatus } = apiRequestActions;
  const resComplite = (res: ApiResponse): void => {
    setServResponse(res);
    dispatch(setApiStatus({ status: res.status }));
    const isHistoryRequest = apiStoragedData.some((req) => req.id === id);
    if (!isHistoryRequest)
      setApiStoragedData([
        ...apiStoragedData,
        {
          ...apiData,
          status: res.status,
          date: formatDateToString(dateNow),
        },
      ]);
  };

  const catchComplite = (error: Error): void => {
    setError(error.message);
  };
  const finnalyComplite = (): void => {
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
      browserUrl: replaceVariables(browserUrl, variables) as string,
      method,
      query: replaceVariables(query, variables) as QueryParam[],
      body: replaceVariables(body, variables) as string,
      headers: replaceVariables(headers, variables) as HeadersType[],
    });
    setServData(data as ApiResponse<unknown>);
  };

  const handleHideFlayout = () => {
    setError('');
  };

  useEffect(() => {
    if (!apiStoragedData) setApiStoragedData([]);
  }, []);

  useEffect(() => {
    fetchData();
  }, [id]);

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
                content: <VariablesTab />,
              },
              {
                label: 'CODE',
                content: <GenerateCodeTab />,
              },
            ]}
          />
        </div>
        <div className={styles['restful-wrapper__spacer']} />
        {error && <Flayout title={error} onClick={handleHideFlayout} />}
        {loading && <Spinner />}
        {servData && (
          <h1 className="text-lg">
            {`${t('EmptyState.ResponseStatus')} ${servResponse && servResponse.status}`}
          </h1>
        )}
        <div className={styles['restful-wrapper_tabview-container_response']}>
          {servData && (
            <Editor
              height="300px"
              defaultLanguage={'json'}
              defaultValue=""
              value={JSON.stringify(servData, null, 2)}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                formatOnType: true,
                formatOnPaste: true,
                lineNumbers: 'off',
                renderLineHighlight: 'none',
                glyphMargin: false,
                folding: false,
                scrollBeyondLastLine: false,
                domReadOnly: true,
                readOnly: true,
              }}
            />
          )}
        </div>
      </div>
    </AuthGuards>
  );
};

export default RestfulClient;
RestfulClient.displayName = 'RestfulClient';
