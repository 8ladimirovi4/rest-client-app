import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { Select } from './Select';
import { Option } from './types';

describe('Select component', () => {
  const mockOptions = [{ id: '1', value: 'text', label: 'text' }];
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders with default props', () => {
    const { getByRole } = render(
      <Select
        id="input-select"
        value={'text'}
        onChange={() => {}}
        options={mockOptions}
      />
    );

    const select = getByRole('combobox');
    expect(select).toBeInTheDocument();
  });
  it('renders label when label and id are provided', () => {
    const { getByText } = render(
      <Select
        id="input-select"
        label="countries"
        value={'text'}
        onChange={() => {}}
        options={mockOptions}
      />
    );
    const label = getByText('countries');
    expect(label).toBeInTheDocument();
    expect(label.getAttribute('for')).toBe('input-select');
  });
  it('renders fallback option when options are empty', () => {
    const options: Option[] = [];
    const { getByRole } = render(
      <Select
        id="input-select"
        label="countries"
        value={'text'}
        onChange={() => {}}
        options={options}
      />
    );
    const select = getByRole('combobox') as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select.options.length).toBe(1);
    expect(select.options[0].text).toBe('');
  });
});
