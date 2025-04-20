import { describe, it, beforeEach, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { Footer } from './Footer';
import styles from './styles.module.css';
import { renderWithProviders } from 'tests/providers/renderWithProviders';
import { ImgHTMLAttributes } from 'react';

vi.mock('next/image', () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe('Footer widget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('click outside block close menu', async () => {
    const { container, getByTestId } = renderWithProviders(<Footer />);
    const image = getByTestId('qatype-git-hub-logo');
    await userEvent.click(image);
    expect(container.querySelector(`.${styles['_open']}`)).toBeInTheDocument();

    await userEvent.click(image);

    expect(
      container.querySelector(`.${styles['_open']}`)
    ).not.toBeInTheDocument();
  });
});
