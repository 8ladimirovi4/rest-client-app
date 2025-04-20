import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PageRestful from './page';

it('render component', () => {
  render(<PageRestful />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
