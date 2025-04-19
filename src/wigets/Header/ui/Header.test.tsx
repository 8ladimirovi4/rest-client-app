import { describe, it, beforeEach, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { Header } from './Header';
import { renderWithProviders } from 'tests/providers/renderWithProviders';

vi.mock('features/LogoutUser', () => ({
  Logout: () => <div data-testid="logout" />,
}));
vi.mock('shared/ui/AuthLinks/AuthLinks.tsx', () => ({
  AuthLinks: () => <div data-testid="auth-links" />,
}));
vi.mock('wigets/LangSwitcher', () => ({
  LangSwitcher: () => <div data-testid="lang-switcher" />,
}));
vi.mock('wigets/ThemeSwitcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher" />,
}));

vi.mock('react-redux', async () => {
  const actual =
    await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});

describe('Header widget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders with user not logged in (AuthLinks shown)', () => {
    vi.mocked(useSelector).mockImplementation((selectorFn) =>
      selectorFn({
        user: {
          isUserLoggedIn: false,
          isAuthChecked: true,
        },
      })
    );

    const { getByText } = renderWithProviders(<Header />);
    expect(getByText('RESTful API')).toBeInTheDocument();
    expect(screen.getByTestId('auth-links')).toBeInTheDocument();
  });
  it('renders with user logged in (Logout and Main page links shown)', () => {
    vi.mocked(useSelector).mockImplementation((selectorFn) =>
      selectorFn({
        user: {
          isUserLoggedIn: true,
          isAuthChecked: true,
        },
      })
    );

    const { getByText } = renderWithProviders(<Header />);
    expect(getByText('RESTful API')).toBeInTheDocument();
    expect(screen.getByText('Main page')).toBeInTheDocument();
    expect(screen.getByTestId('logout')).toBeInTheDocument();
  });
  it('renders theme and language switcher', () => {
    const { getByTestId } = renderWithProviders(<Header />);
    expect(getByTestId('theme-switcher')).toBeInTheDocument();
    expect(getByTestId('lang-switcher')).toBeInTheDocument();
  });
  it('adds scrolled class when page is scrolled', async () => {
    const { getByTestId } = renderWithProviders(<Header />);
    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    const headerElement = getByTestId('qatype-app-header');
    expect(headerElement.className).toMatch(/scrolled/);
  });
  it('removes scrolled class when page is not scrolled', async () => {
    const { getByTestId } = renderWithProviders(<Header />);
    const headerElement = getByTestId('qatype-app-header');
    expect(headerElement.className).not.toMatch(/scrolled/);
  });
});
