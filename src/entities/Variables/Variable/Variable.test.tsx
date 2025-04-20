import { describe, it, beforeEach, vi, expect } from 'vitest';
import { renderWithProviders } from 'tests/providers/renderWithProviders';
import { mockFirebase } from 'tests/moks/firebaseMocks';
import { useRouter } from 'next/navigation';
import { mockRouter } from 'tests/moks/mockRouter';
import { Variable } from './Variable';

describe('VariableItem entity', () => {
  const mockVariable = {
    key: '',
    value: '',
  };

  beforeEach(() => {
    mockFirebase();
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter);
  });
  it('render with default props', () => {
    const { getByText } = renderWithProviders(
      <Variable
        id={1}
        variable={mockVariable}
        updateVariable={() => {}}
        removeVariable={() => {}}
      />
    );
    expect(getByText('Edit')).toBeInTheDocument();
    expect(getByText('Remove')).toBeInTheDocument();
  });
});
