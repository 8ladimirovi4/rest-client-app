import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PageHistory from './page';

it('render component', () => {
  render(<PageHistory />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
