import dynamic from 'next/dynamic';
import { Spinner } from 'shared/ui/Spinner/Spinner.tsx';

const VariablesList = dynamic(
  () => import('entities/Variables/VariablesList/VariablesList'),
  {
    loading: () => <Spinner />,
  }
);

const PageVariables = () => {
  return (
    <>
      <VariablesList />
    </>
  );
};

export default PageVariables;
