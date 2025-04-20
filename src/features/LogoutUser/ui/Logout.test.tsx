import { describe, it, vi, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Logout } from './Logout';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../shared/config/i18n/i18n.ts';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userActions, userReducer } from 'shared/model/user.slice.ts';
import { userEvent } from '@testing-library/user-event';
import { signOut } from 'firebase/auth';

vi.mock('firebase/auth', () => ({
  signOut: vi.fn(),
}));
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));
vi.mock('../../../../firebase.ts', async () => {
  return await import('../../../tests/moks/firebase.mock.ts');
});

describe('Logout', () => {
  it('should be render', async () => {
    const store = configureStore({
      reducer: { user: userReducer },
      preloadedState: {
        user: {
          user: {
            name: 'John',
            uid: 'O6sdNeve9wdi9Nvwx0OshzoSNQg1',
            email: 'test@example.com',
          },
          loading: false,
          error: null,
          isUserLoggedIn: true,
          isAuthChecked: true,
        },
      },
    });

    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <AuthGuards requireAuth={true}>
            <Logout />
          </AuthGuards>
        </Provider>
      </I18nextProvider>
    );

    const signOutBtn = screen.getByText('Sign Out');
    expect(signOutBtn).toBeInTheDocument();
  });

  it('should logout', async () => {
    const store = configureStore({
      reducer: { user: userReducer },
      preloadedState: {
        user: {
          user: null,
          loading: false,
          error: null,
          isUserLoggedIn: false,
          isAuthChecked: true,
        },
      },
    });
    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <AuthGuards requireAuth={false}>
            <Logout />
          </AuthGuards>
        </Provider>
      </I18nextProvider>
    );

    const signOutBtn = screen.getByText('Sign Out');
    expect(signOutBtn).toBeInTheDocument();

    await userEvent.click(signOutBtn);

    await waitFor(() => expect(signOut).toHaveBeenCalledTimes(1));
    expect(signOut).toHaveBeenCalledWith(expect.anything());

    store.dispatch(userActions.clearUser());
  });
});
