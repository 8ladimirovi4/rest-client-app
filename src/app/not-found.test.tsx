import { describe, it, vi, expect } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

const mockBack = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));
vi.mock('../../firebase.ts', async () => {
  return await import('../tests/moks/firebase.mock.ts');
});

import NotFound from 'app/not-found.tsx';
describe('Not found', () => {
  it('should be render', async () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('404')).toBeInTheDocument();
    expect(getByText('Страница не найдена')).toBeInTheDocument();
  });

  it('should be navigate back', async () => {
    const { getByTestId } = render(<NotFound />);
    const btn = getByTestId('go-back-button');
    fireEvent.click(btn);
    expect(mockBack).toHaveBeenCalled();
  });
});
