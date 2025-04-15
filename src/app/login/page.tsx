import dynamic from 'next/dynamic';
import { Spinner } from 'shared/ui/Spinner/Spinner.tsx';

const LoginUser = dynamic(() => import('features/LoginUser'), {
  loading: () => <Spinner />,
});

const PageAuth = () => {
  return <LoginUser />;
};

export default PageAuth;
