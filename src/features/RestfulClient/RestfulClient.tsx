'use client';
import { RootState } from 'app/providers/StoreProvider/config/store.ts';
import { useSelector } from 'react-redux';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';

const RestfulClient = () => {
  const { isAuthChecked } = useSelector((store: RootState) => store.user);

  if (!isAuthChecked) return null;

  return (
    <AuthGuards requireAuth={true}>
      <h1>Rest client page</h1>
    </AuthGuards>
  );
};

export default RestfulClient;
