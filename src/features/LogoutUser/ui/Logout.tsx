import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase.ts';
import { AppDispatch } from 'app/providers/StoreProvider/config/store.ts';
import { useDispatch } from 'react-redux';
import { userActions } from 'shared/model/user.slice.ts';
import Link from 'next/link';
import { routesActions } from 'shared/model/routes.slice';

interface Props {
  isUserLoggedIn: boolean;
}

export const Logout = ({ isUserLoggedIn }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { setCurrentRoute } = routesActions;

  const logout = async () => {
    await signOut(auth);
    dispatch(userActions.clearUser());
    dispatch(setCurrentRoute(!isUserLoggedIn ? '/login' : '/home'));
  };

  return (
    <Link
      href={!isUserLoggedIn ? '/login' : '/home'}
      onClick={logout}
      className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800  whitespace-nowrap"
    >
      Sign Out
    </Link>
  );
};

Logout.displayName = 'Logout';
