import { describe, it, beforeEach, vi, expect } from 'vitest';
import { renderWithProviders } from 'tests/providers/renderWithProviders';
import { mockFirebase } from 'tests/moks/firebaseMocks';
import { useRouter } from 'next/navigation';
import { mockRouter } from 'tests/moks/mockRouter';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { UserState } from 'shared/model/user.slice';
import { ApiRequestState } from 'shared/model/types';
import VariablesList from './VariablesList';

describe('VariablesList entity', () => {
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
      browserUrl: '',
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
    const { getByText } = renderWithProviders(<VariablesList />, {
      preloadedState,
    });
    expect(getByText('Add')).toBeInTheDocument();
    expect(getByText('Clear All')).toBeInTheDocument();
  });
});
