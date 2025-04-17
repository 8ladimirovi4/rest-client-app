import { vi } from 'vitest';


type MockFetchResponse<T = unknown> = {
  status?: string;
  statusText?: string;
  headers?: Record<string, string>;
  json?: T;
};

export const createMockFetchResponse = ({
  status = '200',
  statusText = 'OK',
  headers = {},
  json = {},
}: MockFetchResponse): Response => {
  return {
    status,
    statusText,
    headers: {
      entries: () => Object.entries(headers)[Symbol.iterator](),
    } as Headers,
    json: () => Promise.resolve(json),
  } as unknown as Response;
};

export const setupMockFetch = (mockImpl: (url: string, options?: RequestInit) => Promise<Response>) => {
  vi.stubGlobal('fetch', vi.fn().mockImplementation(mockImpl));
};

export const setupStaticFetch = (response: MockFetchResponse) => {
  const mock = createMockFetchResponse(response);
  setupMockFetch(() => Promise.resolve(mock));
};

export const setupFetchError = (error: Error = new Error('Request Error')) => {
    setupMockFetch(() => Promise.reject(error));
  };

export const resetMockFetch = () => {
  vi.restoreAllMocks();
};
