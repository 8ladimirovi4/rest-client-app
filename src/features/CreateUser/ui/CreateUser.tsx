'use client';

import React from 'react';
import { auth, db } from '../../../../firebase.ts';
import { Input } from 'shared/ui/Input/Input.tsx';
import { Button } from 'shared/ui/Button/Button.tsx';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
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
import { registerSchema } from 'shared/lib/validation/registerSchema.ts';
import { getPasswordStrength } from 'shared/lib/password/getPasswordStrength.ts';
import { routesActions } from 'shared/model/routes.slice';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function CreateUser() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<User>({
    resolver: yupResolver(registerSchema),
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
      dispatch(userActions.setError(null));
      dispatch(userActions.setLoading(true));
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const userAuth = res.user;
      await addDoc(collection(db, 'users'), {
        uid: userAuth.uid,
        name: data.name,
        authProvider: 'local',
        email: data.email,
      });
      dispatch(
        userActions.setUser({
          uid: userAuth.uid,
          email: data.email,
          name: data.name,
        })
      );
      router.push('/');
      dispatch(routesActions.setCurrentRoute('/'));
    } catch (err) {
      const error = err as FirebaseError;
      dispatch(userActions.setError(error.code));
      console.error(err);
    } finally {
      dispatch(userActions.setLoading(false));
    }
  };

  if (!isAuthChecked) return null;

  return (
    <AuthGuards requireAuth={false}>
      <div className={styles.container}>
        <h3 className={styles.title}>Sign Up</h3>
        {loading ? (
          <Spinner />
        ) : (
          <form
            className={styles.form}
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  error={errors.name?.message}
                  placeholder={'First name'}
                  label={'First name'}
                  type={'text'}
                  id={'name'}
                />
              )}
            />
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
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  error={errors.confirmPassword?.message}
                  placeholder={'Confirm Password'}
                  label={'Confirm Password'}
                  type={'password'}
                  id={'confirmPassword'}
                />
              )}
            />
            <Button title="Register" type="submit" disabled={!isValid}></Button>
          </form>
        )}
        {error && <p className={styles['error-message']}>{error}</p>}
      </div>
    </AuthGuards>
  );
}

CreateUser.displayName = 'CreateUser';
