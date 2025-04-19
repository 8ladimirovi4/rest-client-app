import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Flayout } from './Flayout';

describe('Flayout component', () => {
  const handleClick = vi.fn();
  beforeEach(() => {
    handleClick.mockClear();
  });
  it('renders with default props', () => {
    const { getByTestId } = render(<Flayout title={'message'} />);
    const flayout = getByTestId('qatype-flayout');
    expect(flayout).toBeInTheDocument();
  });
  it('calls onClick when close button is clicked', async () => {
    const { getByRole } = render(
      <Flayout title={'message'} onClick={handleClick} />
    );
    await userEvent.click(getByRole('button', { name: /Close/i }));
    expect(handleClick).toHaveBeenCalled();
  });
  it('does not throw error when clicked without onClick prop', () => {
    const { getByRole } = render(<Flayout title={'message'} />);
    const btn = getByRole('button', { name: /Close/i });
    expect(() => fireEvent.click(btn)).not.toThrow();
  });
  it('calls onClick after 5 seconds', () => {
    vi.useFakeTimers();
    render(<Flayout title="Test title" onClick={handleClick} />);

    vi.advanceTimersByTime(5000);
    expect(handleClick).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
