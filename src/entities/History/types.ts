import { ApiRequestState } from 'shared/model/types';

export interface HistoryProps {
  history: ApiRequestState;
  handleClearHistoryItem: (id: string) => void;
}

interface Item {
  key: string;
  value: string;
}
export interface KeyValueListProps {
  title: string;
  items: Item[] | string;
}
