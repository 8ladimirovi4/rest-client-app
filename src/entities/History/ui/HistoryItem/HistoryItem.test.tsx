import { describe, it, beforeEach, vi, expect } from 'vitest';
import { renderWithProviders } from 'tests/providers/renderWithProviders';
import { mockFirebase } from 'tests/moks/firebaseMocks';
import { useRouter } from 'next/navigation';
import { mockRouter } from 'tests/moks/mockRouter';
import { HistoryItem } from './HistoryItem';

describe('HistoryItem entity', () => {
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
      textMode: true,
      status: 'N/A',
      date: '',
    },
  };

  const mockHistory = {
    ...mockState.apiRequest,
  };

  beforeEach(() => {
    mockFirebase();
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
  });
  it('render with default props', () => {
    const { getByText } = renderWithProviders(
      <HistoryItem history={mockHistory} handleClearHistoryItem={() => {}} />
    );
    expect(getByText('Rest')).toBeInTheDocument();
    expect(getByText('Go')).toBeInTheDocument();
    expect(getByText('Remove')).toBeInTheDocument();
  });
});
