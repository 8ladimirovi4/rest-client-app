import { describe, it, vi, afterEach, expect } from 'vitest';
import { ApiRequestType } from './types';
import { apiRequest } from './apiRequest';
import {
  setupStaticFetch,
  resetMockFetch,
  setupFetchError,
} from 'tests/setupMockFetch';

global.fetch = vi.fn();
describe('apiRequest', () => {
  const jsonData = { success: true };
  const mockResponse = {
    status: '200',
    statusText: 'OK',
    headers: { 'x-custom-header': 'value' },
    json: jsonData,
  };
  const mockResponseWithoutHeaders = {
    status: '200',
    statusText: 'OK',
    headers: {},
    json: jsonData,
  };
  const resComplite = vi.fn();
  const catchComplite = vi.fn();
  const finnalyComplite = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
    resetMockFetch();
  });

  it('should call resComplite', async () => {
    setupStaticFetch(mockResponse);

    const requestParams: ApiRequestType = {
      resComplite,
      catchComplite,
      finnalyComplite,
      browserUrl: 'https://example.com/api',
      method: 'GET',
      body: null,
      headers: [{ key: 'Authorization', value: 'Bearer token' }],
    };

    const data = await apiRequest(requestParams);

    expect(global.fetch).toHaveBeenCalledOnce();

    expect(resComplite).toHaveBeenCalledWith({
      status: '200',
      statusText: 'OK',
      headers: { 'x-custom-header': 'value' },
      data: jsonData,
    });
    expect(catchComplite).not.toHaveBeenCalled();
    expect(finnalyComplite).toHaveBeenCalled();
    expect(data).toEqual(jsonData);
  });

  it('should call catchComplite', async () => {
    const error = new Error('Request Error');
    setupFetchError(error);

    const requestParams: ApiRequestType = {
      resComplite,
      catchComplite,
      finnalyComplite,
      browserUrl: 'https://example.com/api',
      method: 'POST',
      body: '{"foo":"bar"}',
      headers: [],
    };
    await apiRequest(requestParams);
    expect(catchComplite).toHaveBeenCalledWith(error);
    expect(finnalyComplite).toHaveBeenCalled();
    expect(resComplite).not.toHaveBeenCalled();
  });
  it('should return data if GET success', async () => {
    setupStaticFetch(mockResponse);

    const result = await apiRequest({
      browserUrl: 'https://api.example.com/test',
      method: 'GET',
      resComplite,
      catchComplite,
      finnalyComplite,
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/GET/'),
      expect.objectContaining({
        method: 'GET',
      })
    );
    expect(resComplite).toHaveBeenCalledWith(
      expect.objectContaining({
        status: '200',
        data: jsonData,
      })
    );
    expect(result).toEqual(jsonData);
    expect(catchComplite).not.toHaveBeenCalled();
    expect(finnalyComplite).toHaveBeenCalled();
  });
  it('should add default Content-Type header if not provided', async () => {
    setupStaticFetch(mockResponseWithoutHeaders);

    await apiRequest({
      resComplite,
      catchComplite,
      finnalyComplite,
      browserUrl: 'https://test.com',
      method: 'GET',
      headers: [], // 👈 Content-Type не передан
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/GET/'),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      })
    );
  });
  it('should not add default Content-Type header if already provided', async () => {
    setupStaticFetch(mockResponseWithoutHeaders);

    await apiRequest({
      resComplite,
      catchComplite,
      finnalyComplite,
      browserUrl: 'https://test.com',
      method: 'GET',
      headers: [{ key: 'Content-Type', value: 'application/xml' }],
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/xml',
        }),
      })
    );
  });
});
