import { describe, it, beforeEach, vi, expect } from 'vitest';
import { renderWithProviders } from 'tests/providers/renderWithProviders';
import { mockFirebase } from 'tests/moks/firebaseMocks';
import { useRouter } from 'next/navigation';
import { mockRouter } from 'tests/moks/mockRouter';
import { KeyValueList } from './KeyValueList';

describe('HistoryItem entity', () => {
  const mockItems = [{ key: '', value: '' }];

  beforeEach(() => {
    mockFirebase();
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
  });
  it('render with default props', () => {
    const { getByText } = renderWithProviders(
      <KeyValueList title="items" items={mockItems} />
    );
    expect(getByText('items')).toBeInTheDocument();
  });
});
