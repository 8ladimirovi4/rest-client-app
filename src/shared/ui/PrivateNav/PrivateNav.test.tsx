import { describe, it, vi, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PrivateNav } from './PrivateNav';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../shared/config/i18n/i18n.ts';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from 'shared/model/user.slice.ts';
import { apiRequestSliceReducer } from 'shared/model/apiRequest.slice.ts';

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
}));
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));
vi.mock('../../../../firebase.ts', async () => {
  return await import('../../../tests/moks/firebase.mock.ts');
});

describe('PrivateNav', () => {
  it('should be render', () => {
    const store = configureStore({
      reducer: { user: userReducer, apiRequest: apiRequestSliceReducer },
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

    const { getByTestId } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <AuthGuards requireAuth={true}>
            <PrivateNav />
          </AuthGuards>
        </Provider>
      </I18nextProvider>
    );

    const privateNav = getByTestId('private-nav');
    expect(privateNav).toBeInTheDocument();
  });
});
