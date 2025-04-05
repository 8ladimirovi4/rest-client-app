'use client';

import React from 'react';
import { auth, db } from '../../../../firebase.ts';
import { Input } from 'shared/ui/Input/Input.tsx';
import { Button } from 'shared/ui/Button/Button.tsx';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  RootState,
} from 'app/providers/StoreProvider/config/store.ts';
import { userActions } from 'shared/model/user.slice.ts';
import { Spinner } from 'shared/ui/Spinner/Spinner.tsx';
import styles from '../../../shared/styles/form.module.css';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginSchema } from 'shared/lib/validation/loginSchema.ts';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';
import { useTranslation } from 'react-i18next';

interface User {
  email: string;
  password: string;
}

export function LoginUser() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({
    resolver: yupResolver(useLoginSchema()),
    mode: 'onChange',
  });
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthChecked } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmitForm = async (data: User) => {
    try {
      dispatch(userActions.setLoading(true));
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const usersRef = collection(db, 'users');
      const userQuery = query(usersRef, where('uid', '==', user.uid));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        dispatch(userActions.setError(null));
        dispatch(
          userActions.setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
          })
        );
        router.push('/');
        return userData;
      } else {
        return null;
      }
    } catch (err) {
      const error = err as FirebaseError;
      console.error(err);
      dispatch(userActions.setError(error.code));
    } finally {
      dispatch(userActions.setLoading(false));
    }
  };

  if (!isAuthChecked) return null;

  return (
    <AuthGuards requireAuth={false}>
      <div className={styles.container}>
        <h3 className={styles.title}>{t('Sign in')}</h3>
        {loading ? (
          <Spinner />
        ) : (
          <form
            className={styles.form}
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  error={errors.email?.message}
                  placeholder={t('Email')}
                  label={t('Email')}
                  type={'text'}
                  id={'email'}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  error={errors.password?.message}
                  placeholder={t('Password')}
                  label={t('Password')}
                  type={'password'}
                  id={'password'}
                />
              )}
            />
            <Button
              title={t('Sign in')}
              type="submit"
              disabled={!isValid}
            ></Button>
          </form>
        )}
        {error && <p className={styles['error-message']}>{error}</p>}
      </div>
    </AuthGuards>
  );
}

LoginUser.displayName = 'LoginUser';
