import { vi } from 'vitest';
export const mockRouter = {
  //ts require to put all useRouter methods to mock
  push: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
};
