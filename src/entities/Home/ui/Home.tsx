'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/providers/StoreProvider/config/store.ts';
import Link from 'next/link';
import { Spinner } from 'shared/index';

export const Home = () => {
  const { isUserLoggedIn, loading } = useSelector(
    (state: RootState) => state.user
  );
  if (loading) return <Spinner />;
  if (!isUserLoggedIn) return null;

  return (
    <div>
      <Link href="/restful">
        <h1>Restful</h1>
      </Link>
      <Link href="/history">
        <h1>History</h1>
      </Link>
    </div>
  );
};

Home.displayName = 'Home';
