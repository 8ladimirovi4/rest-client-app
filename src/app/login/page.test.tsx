import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PageAuth from './page';

it('render component', () => {
  render(<PageAuth />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
