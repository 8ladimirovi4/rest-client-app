import { describe, it, vi, beforeEach, expect } from 'vitest';
import { ApiRequestType } from './types';
import { apiRequest } from './apiRequest';

const resComplite = vi.fn();
const catchComplite = vi.fn();
const finnalyComplite = vi.fn();

const mockResponse = {
    status: 200,
    statusText: 'OK',
    json: async () => ({ success: true }),
    headers: new Headers({ 'x-custom-header': 'value' }),
  };

describe('apiRequest', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        global.fetch = vi.fn(() => Promise.resolve(mockResponse)) as any;
      });
      
    it('should call resComplite', async () => {
            const params: ApiRequestType = {
              resComplite,
              catchComplite,
              finnalyComplite,
              browserUrl: 'https://example.com/api',
              method: 'GET',
              headers: [{ key: 'Authorization', value: 'Bearer token' }],
            };
            const data = await apiRequest(params);

    expect(fetch).toHaveBeenCalledOnce();
    const calledUrl = (fetch as any).mock.calls[0][0];
    expect(calledUrl).toContain('/api/GET/');
    expect(resComplite).toHaveBeenCalledWith({
      status: '200',
      statusText: 'OK',
      headers: { 'x-custom-header': 'value' },
      data: { success: true },
    });
    expect(catchComplite).not.toHaveBeenCalled();
    expect(finnalyComplite).toHaveBeenCalled();
    expect(data).toEqual({ success: true });
    })
})