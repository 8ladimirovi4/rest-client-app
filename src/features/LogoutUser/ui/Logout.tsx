import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase.ts';
import { AppDispatch } from 'app/providers/StoreProvider/config/store.ts';
import { useDispatch } from 'react-redux';
import { userActions } from 'shared/model/user.slice.ts';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface Props {
  isUserLoggedIn: boolean;
}

export const Logout = ({ isUserLoggedIn }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const logout = async () => {
    await signOut(auth);
    dispatch(userActions.clearUser());
  };

  return (
    <Link
      href={!isUserLoggedIn ? '/login' : '/'}
      onClick={logout}
      className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800  whitespace-nowrap"
    >
      {t('Sign out')}
    </Link>
  );
};

Logout.displayName = 'Logout';
