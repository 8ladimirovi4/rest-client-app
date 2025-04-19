import { describe, it, beforeEach, vi, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from 'tests/providers/renderWithProviders';
import { mockFirebase } from 'tests/moks/firebaseMocks';
import { useRouter } from 'next/navigation';
import { mockRouter } from 'tests/moks/mockRouter';
import { RootState } from 'app/providers/StoreProvider/config/store';
import {apiRequest}from 'shared/api/apiRequest';

const setAndStoreValue = vi.fn();
vi.mock('shared/lib/hooks/useLocalStorage', () => ({
  useLocalStorage: () => [[], setAndStoreValue],
}));

import RestfulClient from '../RestfulClient/RestfulClient';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(),
  };
});
  
describe('QueryTab feature', () => {
  const mockState = {
    user: {
      isUserLoggedIn: true,
      isAuthChecked: true,
      user: null,
      loading: false,
      error: null,
    },
    alert: {},
    apiRequest: {
        query: [{ key: '', value: '' }],
        body: '',
        method: 'GET',
        headers: [{ key: '', value: '' }],
        variables: [{ key: '', value: '' }],
        textMode: false,
        status: 'N/A',
        id: '1',
        browserUrl: 'http://localhost:3000',
        date: '',
    },
  };

  const preloadedState: Partial<RootState> = {
    user: mockState.user,
    apiRequest: mockState.apiRequest,
  };

  beforeEach(() => {
    mockFirebase();
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
  });
  it('renders correctly when user is authenticated', () => {
    const {getByText} = renderWithProviders(
    <RestfulClient />, { preloadedState });
    expect(getByText(/Query/i)).toBeInTheDocument();
  });
  it('renders Search and TabView with correct tabs', () => {
    renderWithProviders(<RestfulClient />, { preloadedState });
    expect(screen.getByText('Query')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
    expect(screen.getByText('Code generator')).toBeInTheDocument();
  });
  it('calls apiRequest on mount and when id changes', async () => {
    vi.mock('shared/api/apiRequest', () => ({
        apiRequest: vi.fn().mockResolvedValue({ status: '200', data: { ok: true } }),
      }));
    renderWithProviders(<RestfulClient />, { preloadedState });
   
    await waitFor(() => {
      expect(apiRequest).toHaveBeenCalled();
    });
  });
  it('saves new request to localStorage', async () => {
 
    renderWithProviders(<RestfulClient />, { preloadedState });
    await waitFor(() => {
      expect(setAndStoreValue).toHaveBeenCalled();
    });
  });
  it('displays server response in Editor', async () => {

  vi.mock('shared/api/apiRequest', () => ({
    apiRequest: vi.fn().mockResolvedValue({ status: '200', data: { result: 'ok' } }),
  }));

  renderWithProviders(<RestfulClient />, { preloadedState });
  await waitFor(() => {
    expect(screen.getByText(/Response status/i)).toBeInTheDocument();
  });
});
});
