'use client';

import { useSelector } from 'react-redux';
import { RootState } from 'app/providers/StoreProvider/config/store.ts';
import { AuthGuards } from 'shared/lib/AuthGuard/AuthGuards.tsx';

export const History = () => {
  const { isAuthChecked } = useSelector((store: RootState) => store.user);

  if (!isAuthChecked) return null;

  return (
    <AuthGuards requireAuth={true}>
      <h1>Content</h1>
    </AuthGuards>
  );
};

History.displayName = 'History';
