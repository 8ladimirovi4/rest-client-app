import { describe, it, beforeEach, vi, expect } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from 'tests/providers/renderWithProviders';
import { mockFirebase } from 'tests/moks/firebaseMocks';
import { useRouter } from 'next/navigation';
import { mockRouter } from 'tests/moks/mockRouter';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { ApiRequestState } from 'shared/model/types';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { Search } from './Search';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

describe('Search feature', () => {
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
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <Search />,
      { preloadedState }
    );
    expect(getByText('SEND')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter URL')).toBeInTheDocument();
  });
  it('should dispatch setMethod action when HTTP method is selected', async () => {
    const { getByRole } = renderWithProviders(<Search />, { preloadedState });
    const select = getByRole('combobox');
    fireEvent.change(select, { target: { value: 'POST' } });

    expect(dispatch).toHaveBeenCalledWith(
      apiRequestActions.setMethod({ method: 'POST' })
    );
  });
  it('should dispatch setBrowserUrl action when URL is entered', async () => {
    const { getByRole } = renderWithProviders(<Search />, { preloadedState });
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'http://new-url.com' } });

    expect(dispatch).toHaveBeenCalledWith(
      apiRequestActions.setBrowserUrl({ browserUrl: 'http://new-url.com' })
    );
  });
  it('should dispatch setApiId action when Send button is clicked', async () => {
    const { getByText } = renderWithProviders(<Search />, { preloadedState });
    const button = getByText('SEND');
    fireEvent.click(button);

    expect(dispatch).toHaveBeenCalledWith(
      apiRequestActions.setApiId({ id: expect.any(String) })
    );
  });
});
