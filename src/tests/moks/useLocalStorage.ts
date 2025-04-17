import { vi } from 'vitest';

export let value = '';

export const setValue = vi.fn((newValue) => {
  value = newValue;
});

export const useLocalStorage = () => [value, setValue];