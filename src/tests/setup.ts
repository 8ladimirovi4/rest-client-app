import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

const originalConsoleError = console.error;
const jsDomCssError = 'Error: Could not parse CSS stylesheet';
console.error = (...params) => {
  if (!params.find((p) => p?.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

vi.mock('*.module.css', () => ({}));

Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(),
  };
});

afterEach(() => {
  cleanup();
});
