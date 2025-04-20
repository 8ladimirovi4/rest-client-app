import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Input } from './Input';
import styles from './styles.module.css';
describe('Input component', () => {
  const handleChange = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders with default props', async () => {
    const { getByRole } = render(
      <Input id={'1'} value={'text'} onChange={handleChange} />
    );

    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });
  it('calls onChange when user types', () => {
    const { getByPlaceholderText } = render(
      <Input
        id="input-text"
        placeholder="name"
        value=""
        onChange={handleChange}
      />
    );

    const input = getByPlaceholderText('name');
    fireEvent.change(input, { target: { value: 'new text' } });
    expect(handleChange).toHaveBeenCalled();
  });
  it('disables input when disabled prop is true', () => {
    const { getByDisplayValue } = render(
      <Input
        id="input-text"
        disabled={true}
        value="not active"
        onChange={() => {}}
      />
    );

    const input = getByDisplayValue('not active') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
  it('renders label when label and id are provided', () => {
    const { getByText } = render(
      <Input label="name" id="name-input" value="" onChange={() => {}} />
    );
    const label = getByText('name');
    expect(label).toBeInTheDocument();
    expect(label.getAttribute('for')).toBe('name-input');
  });
  it('does not render error message when error is not provided', () => {
    render(<Input id="input text" value="" onChange={() => {}} />);
    const errorElement = document.querySelector(`.${styles['error-message']}`);
    expect(errorElement).toBeNull();
  });
  it('shows error message when error is passed', () => {
    const { getByText } = render(
      <Input
        id="input text"
        error="field required"
        value=""
        onChange={() => {}}
      />
    );
    const errorText = getByText('field required');
    expect(errorText).toBeInTheDocument();
  });
  it('renders with empty string when value is undefined', () => {
    const { getByRole } = render(<Input id="input-text" onChange={() => {}} />);
    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('');
  });
});
