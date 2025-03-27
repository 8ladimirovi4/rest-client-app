import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { alertSliceReducer } from 'shared/model/alert.slice';

const rootReducer = combineSlices({
  alert: alertSliceReducer,
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
