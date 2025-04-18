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
import styles from '../../../shared/styles/form.module.css';
import firebase from 'firebase/app';
import FirebaseError = firebase.FirebaseError;
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRegisterSchema } from 'shared/lib/validation/registerSchema.ts';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';
import { useTranslation } from 'react-i18next';

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function CreateUser() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({
    resolver: yupResolver(useRegisterSchema()),
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
        <h3 className={styles.title}>{t('Sign up')}</h3>
        <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                error={errors.name?.message}
                placeholder={t('First name')}
                label={t('First name')}
                type={'text'}
                id={'name'}
                disabled={loading}
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
                placeholder={t('Email')}
                label={t('Email')}
                type={'text'}
                id={'email'}
                disabled={loading}
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
                disabled={loading}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                error={errors.confirmPassword?.message}
                placeholder={t('Confirm password')}
                label={t('Confirm password')}
                type={'password'}
                id={'confirmPassword'}
                disabled={loading}
              />
            )}
          />
          {loading ? (
            <Spinner className="mr-auto ml-0" />
          ) : (
            <Button
              title={t('Sign up')}
              type="submit"
              disabled={!isValid}
            ></Button>
          )}
        </form>
        {error && <p className={styles['error-message']}>{error}</p>}
      </div>
    </AuthGuards>
  );
}

CreateUser.displayName = 'CreateUser';
