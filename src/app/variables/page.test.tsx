import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PageVariables from './page';

it('render component', () => {
  render(<PageVariables />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
