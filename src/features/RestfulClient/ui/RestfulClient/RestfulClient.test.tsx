import { describe, it, beforeEach, vi, expect } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import { renderWithProviders } from 'tests/providers/renderWithProviders';
import { mockFirebase } from 'tests/moks/firebaseMocks';
import { useRouter } from 'next/navigation';
import { mockRouter } from 'tests/moks/mockRouter';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { apiRequest } from 'shared/api/apiRequest';
import { ApiRequestState } from 'shared/model/types';
import { UserState } from 'shared/model/user.slice';

const setAndStoreValue = vi.fn();
vi.mock('shared/lib/hooks/useLocalStorage', () => ({
  useLocalStorage: () => [[], setAndStoreValue],
}));

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(),
  };
});

import RestfulClient from '../RestfulClient/RestfulClient';
describe('QueryTab feature', () => {
  const mockState = {
    user: {
      isUserLoggedIn: true,
      isAuthChecked: true,
    },
    alert: {},
    apiRequest: {
      query: [{ key: '', value: '' }],
      body: '',
      method: 'GET',
      headers: [{ key: '', value: '' }],
      variables: [{ key: '', value: '' }],
      id: '1',
      browserUrl: 'http://localhost:3000',
    },
  };

  const preloadedState: Partial<RootState> = {
    user: mockState.user as UserState,
    apiRequest: mockState.apiRequest as ApiRequestState,
  };

  beforeEach(() => {
    mockFirebase();
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
  });
  it('renders correctly when user is authenticated', () => {
    const { getByText } = renderWithProviders(<RestfulClient />, {
      preloadedState,
    });
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
      apiRequest: vi
        .fn()
        .mockResolvedValue({ status: '200', data: { ok: true } }),
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
      apiRequest: vi
        .fn()
        .mockResolvedValue({ status: '200', data: { result: 'ok' } }),
    }));

    renderWithProviders(<RestfulClient />, { preloadedState });
    await waitFor(() => {
      expect(screen.getByText(/Response status/i)).toBeInTheDocument();
    });
  });
  it('displays spinner while loading', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({}),
      status: 200,
      ok: true,
    } as Response);

    const { getByTestId } = renderWithProviders(<RestfulClient />, {
      preloadedState,
    });

    await waitFor(() => {
      const spinner = getByTestId('spinner');
      expect(spinner).toBeInTheDocument();
    });
  });
  it('displays flayout on error', async () => {
    vi.mocked(apiRequest).mockImplementationOnce(async ({ catchComplite }) => {
      catchComplite?.(new Error('Something went wrong'));
      return null;
    });

    const { getByText } = renderWithProviders(<RestfulClient />, {
      preloadedState,
    });

    await waitFor(() => {
      expect(getByText('Something went wrong')).toBeInTheDocument();
    });
  });
  it('does not fetch if browserUrl is empty', async () => {
    const emptyUrlState = {
      ...preloadedState,
      apiRequest: {
        ...(preloadedState.apiRequest as ApiRequestState),
        browserUrl: '',
      },
    };

    const apiRequestSpy = vi.fn();
    vi.mocked(apiRequest).mockImplementation(apiRequestSpy);

    renderWithProviders(<RestfulClient />, {
      preloadedState: emptyUrlState,
    });

    await waitFor(() => {
      expect(apiRequestSpy).not.toHaveBeenCalled();
    });
  });
  it('stores new request to localStorage if not in history', async () => {
    const dateNow = new Date();
    vi.setSystemTime(dateNow);

    const mockResponse = { status: '200 OK', data: {} };
    vi.mocked(apiRequest).mockImplementationOnce(async ({ resComplite }) => {
      resComplite?.(mockResponse);
      return mockResponse;
    });

    renderWithProviders(<RestfulClient />, {
      preloadedState,
    });

    await waitFor(() => {
      expect(setAndStoreValue).toHaveBeenCalledWith([
        expect.objectContaining({
          status: '200 OK',
          date: expect.any(String),
        }),
      ]);
    });
  });
  it('shows error message if apiRequest fails (catchComplite)', async () => {
    const error = new Error('Network error');
    vi.mocked(apiRequest).mockImplementationOnce(
      async ({ catchComplite, finnalyComplite }) => {
        catchComplite?.(error);
        finnalyComplite?.();
        return null;
      }
    );

    const { getByText } = renderWithProviders(<RestfulClient />, {
      preloadedState,
    });

    await waitFor(() => {
      expect(getByText('Network error')).toBeInTheDocument();
    });
  });
  it('displays and hides spinner based on loading state (finnalyComplite)', async () => {
    vi.mocked(apiRequest).mockImplementationOnce(
      async ({ resComplite, finnalyComplite }) => {
        setTimeout(() => {
          resComplite?.({ status: '200 OK', data: {} });
          finnalyComplite?.();
        }, 50);

        return { status: '200 OK', data: {} };
      }
    );

    const { getByTestId, queryByTestId } = renderWithProviders(
      <RestfulClient />,
      {
        preloadedState,
      }
    );

    await waitFor(() => {
      expect(getByTestId('spinner')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });
  it('closes Flayout on close click', async () => {
    vi.mocked(apiRequest).mockImplementationOnce(
      async ({ catchComplite, finnalyComplite }) => {
        catchComplite?.(new Error('Some error'));
        finnalyComplite?.();
        return null;
      }
    );

    const { getByTestId, getByText, queryByText } = renderWithProviders(
      <RestfulClient />,
      {
        preloadedState,
      }
    );

    await waitFor(() => {
      expect(getByText('Some error')).toBeInTheDocument();
    });

    const closeButton = getByTestId('qatype-flayout-button');
    fireEvent.click(closeButton);

    expect(queryByText('Some error')).not.toBeInTheDocument();
  });
});
