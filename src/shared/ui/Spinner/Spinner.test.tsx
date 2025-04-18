import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders with default size', () => {
    const { getByRole, getByText } = render(<Spinner />);
    const spinner = getByRole('status');
    const svg = spinner.querySelector('svg');

    expect(spinner).toBeInTheDocument();
    expect(svg).toHaveStyle({ width: '50px', height: '50px' });
    expect(getByText('Loading...')).toBeInTheDocument();
  });
  it('renders with custom size', () => {
    const { getByRole } = render(<Spinner size={4} />);
    const svg = getByRole('status').querySelector('svg');

    expect(svg).toHaveStyle({ width: '20px', height: '20px' });
  });
});
