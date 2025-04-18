import { describe, it, vi, afterEach, beforeEach, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Button } from './Button';

describe('Button component', () => {
    afterEach(() => {
        vi.clearAllMocks();
      });
it('should render', () => {
    const { container } = render(<Button />)

    expect(container).toBeInTheDocument();
})
it('renders with custom title and dimensions', () => {
    const { getByRole } =  render(<Button title="Test" width={200} height={50} />);
    const btn = getByRole('button',{
        name: /Test/i
    });

    expect(btn).toHaveTextContent('Test');
    expect(btn).toHaveStyle({ width: '200px', height: '50px' });
  });

})
