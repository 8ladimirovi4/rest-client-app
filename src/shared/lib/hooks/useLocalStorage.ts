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
    if (typeof window === 'undefined') return defaultValue;
    try {
      const rawValue = window.localStorage.getItem(key);
      if (rawValue) return JSON.parse(rawValue);
    } catch (e) {
      console.log('Error while getting value from localStorage', e);
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
