import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { alertSliceReducer } from 'shared/model/alert.slice';
import { langSliceReducer } from 'shared/model/lang.slice';

const rootReducer = combineSlices({
  alert: alertSliceReducer,
  lang: langSliceReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  setupListeners(store.dispatch);
  return store;
};
export const store = makeStore();

export type AppStore = typeof store;
