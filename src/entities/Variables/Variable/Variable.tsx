'use client';
import React, { useState } from 'react';
import { VariableProps } from '../types';
import { Input } from 'shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';

export const Variable = ({
  variable,
  updateVariable,
  removeVariable,
  id,
}: VariableProps) => {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <>
      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
        <th
          scope="row"
          className="text-lg min-w-[300px] w-[300px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {!isEdit ? (
            <p>{variable.key}</p>
          ) : (
            <Input
              id={id.toString()}
              type={'text'}
              value={variable.key}
              onChange={(evt) => {
                updateVariable(id, evt.target.value, variable.value);
              }}
            />
          )}
        </th>
        <td className="text-lg min-w-[300px] px-6 py-4">
          {!isEdit ? (
            <p>{variable.value}</p>
          ) : (
            <Input
              id={id.toString()}
              type={'text'}
              value={variable.value}
              onChange={(evt) => {
                updateVariable(id, variable.key, evt.target.value);
              }}
            />
          )}
        </td>
        <td className="text-lg px-6 py-4 w-[200px]">
          <a
            href="#"
            onClick={() => setIsEdit((prev) => !prev)}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {!isEdit ? `${t('EmptyState.Edit')}` : `${t('EmptyState.Done')}`}
          </a>
        </td>
        <td className="text-lg px-6 py-4 w-[200px]">
          <a
            href="#"
            onClick={() => removeVariable(id)}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {t('EmptyState.Remove')}
          </a>
        </td>
      </tr>
    </>
  );
};

Variable.displayName = 'Variable';
