import { describe, it, beforeEach, vi } from 'vitest';
// import { screen } from '@testing-library/react';
import { renderWithProviders } from 'tests/providers/renderWithProviders';
import { mockFirebase } from 'tests/moks/firebaseMocks';
import RestfulClient from '../RestfulClient/RestfulClient';
import { useRouter } from 'next/navigation';
import { mockRouter } from 'tests/moks/mockRouter';
import { RootState } from 'app/providers/StoreProvider/config/store';

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
    apiRequest: {},
  };

  const preloadedState: Partial<RootState> = {
    user: mockState.user,
  };

  beforeEach(() => {
    mockFirebase();
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
  });
  it('renders', () => {
    renderWithProviders(<RestfulClient />, { preloadedState });
  });
});
