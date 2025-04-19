import { mockFirebase } from 'tests/moks/firebaseMocks';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { useSelector } from 'react-redux';
import { GlobalLayout } from 'shared/index';

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
    mockFirebase();
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

    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <GlobalLayout>
          <header></header>
        </GlobalLayout>
      </I18nextProvider>
    );
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

    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <GlobalLayout>
          <header></header>
        </GlobalLayout>
      </I18nextProvider>
    );

    expect(getByText('RESTful API')).toBeInTheDocument();
    expect(screen.getByText('Main page')).toBeInTheDocument();
    expect(screen.getByTestId('logout')).toBeInTheDocument();
  });
  it('renders theme and language switcher', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <GlobalLayout>
          <header></header>
        </GlobalLayout>
      </I18nextProvider>
    );

    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
    expect(screen.getByTestId('lang-switcher')).toBeInTheDocument();
  });
  it('adds scrolled class when page is scrolled', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <GlobalLayout>
          <header></header>
        </GlobalLayout>
      </I18nextProvider>
    );
    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    const headerElement = screen.getByTestId('qatype-app-header');
    expect(headerElement.className).toMatch(/scrolled/);
  });
  it('removes scrolled class when page is not scrolled', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <GlobalLayout>
          <header></header>
        </GlobalLayout>
      </I18nextProvider>
    );

    const headerElement = screen.getByTestId('qatype-app-header');
    expect(headerElement.className).not.toMatch(/scrolled/);
  });
});
