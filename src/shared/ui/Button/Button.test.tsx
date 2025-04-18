import { describe, it, vi, afterEach, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Button } from './Button';

describe('Button component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders with default props', () => {
    const { getByRole } = render(<Button />);
    const btn = getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('button');
    expect(btn).toHaveStyle({ width: '100px', height: '40px' });
    expect(btn.className).toContain('bg-blue-700');
    expect(btn).not.toBeDisabled();
  });
  it('renders with custom title and dimensions', () => {
    const { getByRole } = render(
      <Button title="Test" width={200} height={50} />
    );
    const btn = getByRole('button', {
      name: /Test/i,
    });

    expect(btn).toHaveTextContent('Test');
    expect(btn).toHaveStyle({ width: '200px', height: '50px' });
  });
  it('applies correct class for red color', () => {
    const { getByRole } = render(<Button color="red" />);
    const btn = getByRole('button');
    expect(btn.className).toContain('bg-red-700');
  });
  it('applies gray style when disabled', () => {
    const { getByRole } = render(<Button color="blue" disabled />);
    const btn = getByRole('button');
    expect(btn).toHaveClass('bg-gray-500');
    expect(btn).toBeDisabled();
  });
  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const { getByRole } = render(<Button onClick={handleClick} />);
    await userEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const { getByRole } = render(<Button onClick={handleClick} disabled />);
    await userEvent.click(getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
  it('sets button type attribute', () => {
    const { getByRole } = render(<Button type="submit" />);
    expect(getByRole('button')).toHaveAttribute('type', 'submit');
  });
  it('has displayName set', () => {
    expect(Button.displayName).toBe('Button');
  });
  it('does not throw error when clicked without onClick prop', () => {
    const { getByRole } = render(<Button />);
    const btn = getByRole('button');
    expect(() => fireEvent.click(btn)).not.toThrow();
  });
});
