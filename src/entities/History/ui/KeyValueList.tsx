'use client';
import { v4 } from 'uuid';
import { KeyValueListProps } from '../types';

export const KeyValueList = ({ title, items }: KeyValueListProps) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-2">
      <p className="font-semibold text-gray-800 dark:text-gray-200 text-base">{title}</p>
      <ul className="pl-4 list-disc text-gray-700 dark:text-gray-300">
        {typeof items !== 'string' &&
          items.map(({ key, value }) => (
            <li key={v4()} className="mb-1">
              <span className="font-medium text-base">{key || '(empty)'}:</span> <span className="text-base">{value}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

KeyValueList.displayName = 'KeyValueList';
