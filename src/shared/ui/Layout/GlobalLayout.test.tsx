import { mockFirebase } from 'tests/moks/firebaseMocks';
import { describe, it, beforeEach, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { GlobalLayout } from './GlobalLayout';
describe('GlobalLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFirebase();
  });

  it('renders children with header and footer', async () => {
    const { getByTestId, getByRole } = render(
      <GlobalLayout>
        <div data-testid="child-content">Hello</div>
      </GlobalLayout>
    );
    screen.debug();
    expect(getByTestId('child-content')).toHaveTextContent('Hello');
    expect(getByRole('banner')).toBeInTheDocument();
    expect(getByRole('contentinfo')).toBeInTheDocument();
  });
});
