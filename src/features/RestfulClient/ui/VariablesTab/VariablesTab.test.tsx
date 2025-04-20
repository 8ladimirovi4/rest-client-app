import { describe, it, beforeEach, vi, expect } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from 'tests/providers/renderWithProviders';
import { mockFirebase } from 'tests/moks/firebaseMocks';
import { useRouter } from 'next/navigation';
import { mockRouter } from 'tests/moks/mockRouter';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { ApiRequestState } from 'shared/model/types';
import { VariablesTab } from './VariablesTab';
import { apiRequestActions } from 'shared/model/apiRequest.slice';

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
  it('should render VariablesTab component correctly', () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <VariablesTab />,
      { preloadedState }
    );
    expect(getByText('Add')).toBeInTheDocument();
    expect(getByPlaceholderText('Key')).toBeInTheDocument();
    expect(getByPlaceholderText('Value')).toBeInTheDocument();
  });
  it('should add a new variable when the "Add" button is clicked', () => {
    const { getByText } = renderWithProviders(<VariablesTab />, {
      preloadedState,
    });
    const addButton = getByText('Add');
    fireEvent.click(addButton);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'apiRequest/setVariables',
        payload: expect.objectContaining({
          variables: [
            { key: '', value: '' },
            { key: '', value: '' },
          ],
        }),
      })
    );
  });
  it('updates variables key and value when input fields are changed', async () => {
    const { getByPlaceholderText } = renderWithProviders(<VariablesTab />, {
      preloadedState,
    });

    const keyInput = getByPlaceholderText('Key');
    const valueInput = getByPlaceholderText('Value');

    fireEvent.change(keyInput, { target: { value: 'new-key' } });
    expect(dispatch).toHaveBeenCalledWith(
      apiRequestActions.setVariables({
        variables: [{ key: 'new-key', value: '' }],
      })
    );

    fireEvent.change(valueInput, { target: { value: 'new-value' } });
    expect(dispatch).toHaveBeenCalledWith(
      apiRequestActions.setVariables({
        variables: [{ key: '', value: 'new-value' }],
      })
    );
  });
  it('removes a variables when the remove button is clicked', async () => {
    const { getByText } = renderWithProviders(<VariablesTab />, {
      preloadedState,
    });

    const removeButton = getByText(/remove/i);
    fireEvent.click(removeButton);
    expect(dispatch).toHaveBeenCalledWith(
      apiRequestActions.setVariables({
        variables: [{ key: '', value: '' }],
      })
    );
  });
});
