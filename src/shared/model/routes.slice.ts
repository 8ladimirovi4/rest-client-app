import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RoutesState } from './types';
import { AppRoutes } from 'shared/constants/routes';
import { Route } from 'next';
import { routes } from 'features/navigation/constants/routes';

const initialState: RoutesState = {
  routes,
  currentRoute: AppRoutes.LOGIN,
};

const langSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setRoutes: (
      state: RoutesState,
      action: PayloadAction<{ isUser: boolean }>
    ) => {
      const { isUser } = action.payload;
      state.routes = routes.filter((route) => {
        if (!isUser) return route.type === 'public';
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
