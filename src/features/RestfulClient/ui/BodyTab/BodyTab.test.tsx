import { describe, it, beforeEach, vi, expect } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from 'tests/providers/renderWithProviders';
import { mockFirebase } from 'tests/moks/firebaseMocks';
import { useRouter } from 'next/navigation';
import { mockRouter } from 'tests/moks/mockRouter';
import { RootState } from 'app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';
import { BodyTab } from './BodyTab';
import { ApiRequestState } from 'shared/model/types';
import { apiRequestActions } from 'shared/model/apiRequest.slice';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

vi.mock('@monaco-editor/react', () => ({
  default: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (str: string) => void;
  }) => (
    <textarea
      data-testid="monaco-editor"
      value={value}
      onChange={(evt) => onChange(evt.target.value)}
    />
  ),
}));

describe('BodyTab feature', () => {
  const mockState = {
    user: {},
    alert: {},
    apiRequest: {
      body: '',
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
  it('renders JSON and PlainText buttons', () => {
    const { getByText } = renderWithProviders(<BodyTab />, {
      preloadedState,
    });
    expect(getByText(/🧩/)).toBeInTheDocument();
    expect(getByText(/📝/)).toBeInTheDocument();
  });
  it('changes format on button click', () => {
    const { getByText } = renderWithProviders(<BodyTab />, {
      preloadedState,
    });
    const jsonButton = getByText(/🧩/);
    const textButton = getByText(/📝/);
    fireEvent.click(textButton);
    fireEvent.click(jsonButton);
  });
  it('dispatches setBody on editor change', async () => {
    const { getByTestId } = renderWithProviders(<BodyTab />, {
      preloadedState,
    });

    const editor = getByTestId('monaco-editor');
    fireEvent.change(editor, { target: { value: 'new body' } });

    expect(dispatch).toHaveBeenCalledWith(
      apiRequestActions.setBody({ body: 'new body' })
    );
  });
});
