import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RoutesState } from './types';
import { AppRoutes } from 'shared/constants/routes';
import { Route } from 'next';
import { routes } from 'features/navigation/constants/routes';

const initialState: RoutesState = {
  routes,
  currentRoute: AppRoutes.HOME,
};

const langSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setRoutes: (
      state: RoutesState,
      action: PayloadAction<{ isUserLoggedIn: boolean }>
    ) => {
      const { isUserLoggedIn } = action.payload;
      state.routes = routes.filter((route) => {
        if (!isUserLoggedIn) return route.type === 'public';
        return route.type === 'protected';
      });
    },
    setCurrentRoute: (state: RoutesState, action: PayloadAction<Route>) => {
      state.currentRoute = action.payload;
    },
  },
});

export const { actions: routesActions } = langSlice;
export const { reducer: routesSliceReducer } = langSlice;
