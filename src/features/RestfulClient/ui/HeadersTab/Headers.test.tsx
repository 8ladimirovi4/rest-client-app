import { describe, it, beforeEach, vi, expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from 'tests/providers/renderWithProviders';
import { mockFirebase } from 'tests/moks/firebaseMocks';
import { useRouter } from 'next/navigation';
import { mockRouter } from 'tests/moks/mockRouter';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { ApiRequestState } from 'shared/model/types';
import { apiRequestActions } from 'shared/model/apiRequest.slice';
import { HeadersTab } from './HeadersTab';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

describe('HeadersTab feature', () => {
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
  it('renders existing headers and add button', () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <HeadersTab />,
      { preloadedState }
    );
    expect(getByText('+')).toBeInTheDocument();
    expect(getByPlaceholderText('Key')).toBeInTheDocument();
    expect(getByPlaceholderText('Value')).toBeInTheDocument();
  });
  it('adds a new header when the add button is clicked', async () => {
    const { getByText } = renderWithProviders(<HeadersTab />, {
      preloadedState,
    });

    const addButton = getByText(/add/i);
    fireEvent.click(addButton);

    expect(dispatch).toHaveBeenCalledWith(
      apiRequestActions.setHeaders({
        headers: [
          { key: '', value: '' },
          { key: '', value: '' },
        ],
      })
    );
  });
  it('updates header key and value when input fields are changed', async () => {
    const { getByPlaceholderText } = renderWithProviders(<HeadersTab />, {
      preloadedState,
    });

    const keyInput = getByPlaceholderText('Key');
    const valueInput = getByPlaceholderText('Value');

    fireEvent.change(keyInput, { target: { value: 'new-key' } });
    expect(dispatch).toHaveBeenCalledWith(
      apiRequestActions.setHeaders({
        headers: [{ key: 'new-key', value: '' }],
      })
    );

    fireEvent.change(valueInput, { target: { value: 'new-value' } });
    expect(dispatch).toHaveBeenCalledWith(
      apiRequestActions.setHeaders({
        headers: [{ key: '', value: 'new-value' }],
      })
    );
  });
  it('removes a header when the remove button is clicked', async () => {
    renderWithProviders(<HeadersTab />, { preloadedState });

    const removeButton = screen.getByText(/remove/i);
    fireEvent.click(removeButton);
    expect(dispatch).toHaveBeenCalledWith(
      apiRequestActions.setHeaders({
        headers: [{ key: '', value: '' }],
      })
    );
  });
});
