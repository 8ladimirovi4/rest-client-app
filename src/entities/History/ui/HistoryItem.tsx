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

export const HistoryItem = ({
  history,
  handleClearHistoryItem,
}: HistoryProps) => {
  const { body, browserUrl, headers, id, method, query, status, variables } =
    history;

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
          <Button title="Go" onClick={handleHistoryAction} />
          <Button
            title="Remove"
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
            <strong>Status:</strong> {status ?? 'N/A'}
          </p>
          <p>
            <strong>Body:</strong> {replaceVariables(body, variables) || '—'}
          </p>
          <KeyValueList
            title="Headers"
            items={replaceVariables(headers, variables)}
          />
          <KeyValueList
            title="Query"
            items={replaceVariables(query, variables)}
          />
          <KeyValueList title="Variables" items={variables} />
        </div>
      )}
    </div>
  );
};

HistoryItem.displayName = 'HistoryItem';
