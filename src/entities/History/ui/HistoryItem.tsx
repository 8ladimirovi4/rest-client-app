'use client';
import React, { useState } from 'react';
import { HistoryProps } from '../types';
import { Button } from 'shared/index';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { useRouter } from 'next/navigation';
import { buildUrl, replaceVariables } from 'shared/utils/help';
import { KeyValueList } from './KeyValueList';
import { useTranslation } from 'react-i18next';

export const HistoryItem = ({
  history,
  handleClearHistoryItem,
}: HistoryProps) => {
  const { t } = useTranslation();
  const {
    body,
    browserUrl,
    headers,
    id,
    method,
    query,
    status,
    variables,
    date,
  } = history;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { setHistoryState } = apiRequestActions;
  const currentUrl =
    typeof window !== 'undefined' ? new URL(window.location.href) : null;

  const handleHistoryAction = (): void => {
    dispatch(setHistoryState(history));
    router.push(
      currentUrl ? buildUrl(currentUrl, method, browserUrl) : 'restful'
    );
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {date && (
        <div className="p-2  border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          <strong className="text-base">{t('EmptyState.RequestCreated')}: </strong>
          <span className='text-base'>{date}</span>
        </div>
      )}
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
          >
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>

          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Rest
          </p>
          <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
            {method}
          </p>
          <p className="flex-1 text-lg text-gray-700 dark:text-gray-400 truncate">
            {replaceVariables(browserUrl, variables)}
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
          <Button title={t('Buttons.Go')} onClick={handleHistoryAction} />
          <Button
            title={t('Buttons.Remove')}
            onClick={() => {
              handleClearHistoryItem(id);
            }}
            color="red"
          />
        </div>
      </div>
      {isOpen && (
        <div className="px-4 pb-4 pt-0 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>{`${t('Rest.Status')}:`}</strong> {status ?? 'N/A'}
          </p>
          <p>
            <strong>{`${t('Rest.Body')}:`}</strong>{' '}
            {replaceVariables(body, variables) || '—'}
          </p>
          <KeyValueList
            title={`${t('Rest.Headers')}:`}
            items={replaceVariables(headers, variables)}
          />
          <KeyValueList
            title={`${t('Rest.Query')}:`}
            items={replaceVariables(query, variables)}
          />
          <KeyValueList title={`${t('Rest.Variables')}:`} items={variables} />
        </div>
      )}
    </div>
  );
};

HistoryItem.displayName = 'HistoryItem';
