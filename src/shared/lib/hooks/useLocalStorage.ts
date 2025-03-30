'use client';

import { useEffect, useState } from 'react';

export type UseLocalStorageArgs<T> = {
  key: string;
  defaultValue: T;
};

export function useLocalStorage<T>({
  key,
  defaultValue,
}: UseLocalStorageArgs<T>): [T, React.Dispatch<T>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue; // Безопасность для SSR
    try {
      const rawValue = window.localStorage.getItem(key);
      if (rawValue) {
        // Проверка, является ли строка JSON
        return rawValue.startsWith("{") || rawValue.startsWith("[") || rawValue.startsWith('"')
          ? JSON.parse(rawValue)
          : rawValue ?? defaultValue;
      }
      return defaultValue; // Если записи нет, вернуть значение по умолчанию
    } catch (e) {
      console.log('Error while getting value from localStorage', e);
      return defaultValue; // В случае ошибки вернуть значение по умолчанию
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('Error while setting value to localStorage', error);
    }
  }, [key, value]);

  return [value, setValue];
}
