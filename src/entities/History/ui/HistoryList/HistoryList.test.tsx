import { describe, it, beforeEach, vi, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from 'tests/providers/renderWithProviders';
import { mockFirebase } from 'tests/moks/firebaseMocks';
import { useRouter } from 'next/navigation';
import { mockRouter } from 'tests/moks/mockRouter';
import HistoryList from './HistoryList';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { UserState } from 'shared/model/user.slice';
import { ApiRequestState } from 'shared/model/types';

describe('HistoryList entity', () => {
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
  it('render with default props', () => {
    const { getByText } = renderWithProviders(<HistoryList />, {
      preloadedState,
    });
    screen.debug();
    expect(getByText('RESTful client')).toBeInTheDocument();
  });
});
