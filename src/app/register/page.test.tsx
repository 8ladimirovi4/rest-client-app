import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CreateUser from './page';

it('render component', () => {
  render(<CreateUser />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
