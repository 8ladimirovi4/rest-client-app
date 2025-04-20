import dynamic from 'next/dynamic';
import { Spinner } from 'shared/ui/Spinner/Spinner.tsx';

const HistoryList = dynamic(
  () => import('entities/History/ui/HistoryList/HistoryList'),
  {
    loading: () => <Spinner />,
  }
);
const PageHistory = () => {
  return <HistoryList />;
};

export default PageHistory;
