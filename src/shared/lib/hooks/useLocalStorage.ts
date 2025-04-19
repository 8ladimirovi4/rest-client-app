'use client';

import { useState } from 'react';

export type UseLocalStorageArgs<T> = {
  key: string;
  defaultValue: T;
};

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export function useLocalStorage<T>({
  key,
  defaultValue,
}: UseLocalStorageArgs<T>): [T, SetValue<T>] {
  const isClient = typeof window !== 'undefined';


  const [value, setValue] = useState<T>(() => {
    if (isClient) {
      try {
        const rawValue = window.localStorage.getItem(key);
        if (rawValue) return JSON.parse(rawValue);
      } catch (e) {
        console.log('Error while getting value from localStorage', e);
      }
    }
    return defaultValue;
  });

  const setAndStoreValue: SetValue<T> = (newValueOrUpdater) => {
    setValue((prevValue) => {
      const newValue =
        typeof newValueOrUpdater === 'function'
          ? (newValueOrUpdater as (prev: T) => T)(prevValue)
          : newValueOrUpdater;

      try {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.log('Error while setting value to localStorage', error);
      }

      return newValue;
    });
  };

  return [value, setAndStoreValue];
}
