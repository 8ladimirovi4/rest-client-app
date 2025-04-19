import { describe, it, beforeEach, vi } from 'vitest';
import { renderWithProviders } from 'tests/providers/renderWithProviders';
import { mockFirebase } from 'tests/moks/firebaseMocks';
import { useRouter } from 'next/navigation';
import { mockRouter } from 'tests/moks/mockRouter';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { ApiRequestState } from 'shared/model/types';
import { VariablesTab } from './VariablesTab';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(),
  };
});

describe('VariablesTab feature', () => {
  const mockState = {
    user: {},
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
    apiRequest: mockState.apiRequest as ApiRequestState,
  };
  const dispatch = vi.fn();

  beforeEach(() => {
    mockFirebase();
    vi.clearAllMocks();
    vi.mocked(useDispatch).mockReturnValue(dispatch);
    vi.mocked(useRouter).mockReturnValue(mockRouter);
  });
  it('should render QueryTab component correctly', () => {
    renderWithProviders(<VariablesTab />, { preloadedState });
  });
});
