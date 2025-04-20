import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase.ts';
import { AppDispatch } from 'app/providers/StoreProvider/config/store.ts';
import { useDispatch } from 'react-redux';
import { userActions } from 'shared/model/user.slice.ts';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { linkStyles } from 'shared/styles/styles.ts';

export const Logout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const logout = async () => {
    await signOut(auth);
    dispatch(userActions.clearUser());
  };

  return (
    <Link href={'/'} onClick={logout} className={linkStyles}>
      {t('Sign out')}
    </Link>
  );
};

Logout.displayName = 'Logout';
