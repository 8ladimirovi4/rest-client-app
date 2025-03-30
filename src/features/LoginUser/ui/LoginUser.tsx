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
import styles from './styles.module.css';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from 'shared/lib/validation/loginSchema.ts';
import { getPasswordStrength } from 'shared/lib/password/getPasswordStrength.ts';
import { routesActions } from 'shared/model/routes.slice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';

interface User {
  email: string;
  password: string;
}

export function LoginUser() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<User>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });
  const password = watch('password');
  let strength = 0;
  if (password) {
    strength = getPasswordStrength(password);
  }
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthChecked } = useSelector(
    (state: RootState) => state.user
  );
  const router = useRouter();

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
        dispatch(routesActions.setCurrentRoute('/'));
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
        <h3 className={styles.title}>Sign In</h3>
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
                  placeholder={'Email'}
                  label={'Email'}
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
                  placeholder={'Password'}
                  label={'Password'}
                  type={'password'}
                  id={'password'}
                />
              )}
            />
            <div className={styles['progress-bar']}>
              <div
                className={`${styles['progress-fill']} ${styles[`strength-${strength}`]}`}
                style={{ width: `${(strength / 5) * 100}%` }}
              />
            </div>
            <Button title="Login" type="submit" disabled={!isValid}></Button>
          </form>
        )}
        {error && <p className={styles['error-message']}>{error}</p>}
      </div>
    </AuthGuards>
  );
}

LoginUser.displayName = 'LoginUser';
