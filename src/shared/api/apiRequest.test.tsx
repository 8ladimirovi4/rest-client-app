import { describe, expect, it } from 'vitest';

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
    it('should', () => {
        
    })
})