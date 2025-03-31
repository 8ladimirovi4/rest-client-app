import { useSelector } from 'react-redux';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RootState } from 'app/providers/StoreProvider/config/store.ts';

interface AuthGuardsProps {
  children?: ReactNode;
  requireAuth?: boolean;
}

export const AuthGuards = (props: AuthGuardsProps) => {
  const router = useRouter();
  const { requireAuth = true, children } = props;

  const { isUserLoggedIn, isAuthChecked } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (!isUserLoggedIn && requireAuth && isAuthChecked) {
      router.push('/login');
    } else if (isUserLoggedIn && !requireAuth && isAuthChecked) {
      router.push('/');
    }
  }, [isAuthChecked, isUserLoggedIn, requireAuth, router]);

  if (
    (requireAuth && !isUserLoggedIn && isAuthChecked) ||
    (!requireAuth && isUserLoggedIn && isAuthChecked)
  ) {
    return null;
  }

  return <>{children}</>;
};
