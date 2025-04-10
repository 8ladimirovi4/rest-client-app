import { ApiRequestType, ApiResponse } from './types';

export const apiRequest = async ({
  resComplite,
  catchComplite,
  finnalyComplite,
  browserUrl,
  method = 'GET',
  query = [],
  body = null,
  headers = [],
}: ApiRequestType) => {
  try {
    const queryString = query.length
      ? `?${query
          .map((param) => {
            const { key, value } = param;
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          })
          .join('&')}`
      : '';

    const headersObject = headers.reduce<Record<string, string>>(
      (acc, header) => {
        const { key, value } = header;
        if (key) acc[key] = value;
        return acc;
      },
      {}
    );

    const normalizedHeaders = Object.keys(headersObject).map((key) =>
      key.toLowerCase()
    );
    const shouldAddContentType = !normalizedHeaders.includes('content-type');

    const fullUrl = `${browserUrl}${queryString}`;
    const encodedUrl = encodeURIComponent(btoa(fullUrl));

    const options: RequestInit = {
      method: method || 'GET',
      headers: {
        ...(shouldAddContentType ? { 'Content-Type': 'application/json' } : {}),
        ...headersObject,
      },
    };

    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      options.body = body || '{}';
    }

    const response = await fetch(`/api/proxy?url=${encodedUrl}`, options);
    const data = await response.json();

    const apiResponse: ApiResponse = {
      status: response.status.toString(),
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      data,
    };

    resComplite(apiResponse);
    return data;
  } catch (error) {
    const err = error as Error;
    catchComplite(err);
  } finally {
    finnalyComplite();
  }
};
