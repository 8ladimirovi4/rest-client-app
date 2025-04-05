import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { alertSliceReducer } from 'shared/model/alert.slice';
import { userReducer } from 'shared/model/user.slice.ts';
import { apiRequestSliceReducer } from 'shared/model/apiRequest.slice';

const rootReducer = combineSlices({
  alert: alertSliceReducer,
  user: userReducer,
  apiRequest: apiRequestSliceReducer,
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
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
