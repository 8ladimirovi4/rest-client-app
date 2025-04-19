import { describe, it, vi, expect, Mock } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginUser from './LoginUser';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../shared/config/i18n/i18n.ts';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userActions, userReducer } from 'shared/model/user.slice.ts';
import { userEvent } from '@testing-library/user-event';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
}));
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));
vi.mock('../../../../firebase.ts', async () => {
  return await import('../../../tests/moks/firebase.mock.ts');
});

describe('LoginUser', () => {
  it('should be render', () => {
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
            <LoginUser />
          </AuthGuards>
        </Provider>
      </I18nextProvider>
    );

    const loginForm = screen.getByTestId('login');
    expect(loginForm).toBeInTheDocument();
  });

  it('should show loader when receiving user data', () => {
    const store = configureStore({
      reducer: { user: userReducer },
      preloadedState: {
        user: {
          user: null,
          loading: true,
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
            <LoginUser />
          </AuthGuards>
        </Provider>
      </I18nextProvider>
    );

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('the login button should be displayed when no data is transferred', async () => {
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
            <LoginUser />
          </AuthGuards>
        </Provider>
      </I18nextProvider>
    );

    const loginBtn = await screen.findByTestId('login-button');
    expect(loginBtn).toBeInTheDocument();
  });

  it('should render and submit the form correctly', async () => {
    const push = vi.fn();
    (useRouter as Mock).mockReturnValue({ push });

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
            <LoginUser />
          </AuthGuards>
        </Provider>
      </I18nextProvider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByTestId('login-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '1q!Q1q!Q' } });

    await userEvent.click(submitButton);

    await waitFor(() =>
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1)
    );
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      'test@example.com',
      '1q!Q1q!Q'
    );

    store.dispatch(
      userActions.setUser({
        name: 'John Doe',
        email: 'john.doe@example.com',
        uid: '123',
      })
    );

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/');
    });
  });

  it('should show an error message if login fails', async () => {
    const push = vi.fn();
    (useRouter as Mock).mockReturnValue({ push });

    const error = {
      code: 'auth/invalid-credential',
      message: 'Incorrect password',
      name: 'FirebaseError',
    } as FirebaseError;

    (signInWithEmailAndPassword as Mock).mockRejectedValueOnce(error);

    const store = configureStore({
      reducer: { user: userReducer },
      preloadedState: {
        user: {
          user: null,
          loading: false,
          error: error.code,
          isUserLoggedIn: false,
          isAuthChecked: true,
        },
      },
    });
    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <AuthGuards requireAuth={false}>
            <LoginUser />
          </AuthGuards>
        </Provider>
      </I18nextProvider>
    );

    await waitFor(() =>
      expect(screen.getByTestId('error-element')).toBeInTheDocument()
    );
  });
});
