import dynamic from 'next/dynamic';
import { Spinner } from 'shared/ui/Spinner/Spinner.tsx';

const CreateUser = dynamic(() => import('features/CreateUser'), {
  loading: () => <Spinner />,
});

const PageRegister = () => {
  return <CreateUser />;
};

export default PageRegister;
