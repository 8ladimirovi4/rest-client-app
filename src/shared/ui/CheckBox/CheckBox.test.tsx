import { describe, it, vi, expect } from 'vitest';
import { render } from '@testing-library/react';

import { CheckBox } from './CheckBox';

describe('Checkbox component', () => {
  it('renders with default props', () => {
    const checked = false;
    const onChange = vi.fn();
    const { getByRole } = render(
      <CheckBox id={'1'} checked={checked} onChange={onChange} />
    );
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });
});
