import React from 'react';
import dynamic from 'next/dynamic';
import { Spinner } from 'shared/ui/Spinner/Spinner.tsx';

const RestfulClient = dynamic(
  () => import('features/RestfulClient/ui/RestfulClient'),
  {
    loading: () => <Spinner />,
  }
);

const PageRestful = () => {
  return <RestfulClient />;
};

export default PageRestful;
