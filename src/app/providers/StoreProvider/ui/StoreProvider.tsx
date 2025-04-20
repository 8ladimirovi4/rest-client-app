import { Provider } from 'react-redux';
import { store } from '../config/store.ts';
import { StoreProviderProps } from './types.ts';

export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
};
