import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AlertState } from './types';

const initialState: AlertState = {
  show: false,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlertShow: (
      state: AlertState,
      action: PayloadAction<{ show: boolean }>
    ) => {
      const { show } = action.payload;
      state.show = show;
    },
  },
});

export const { actions: alertActions } = alertSlice;
export const { reducer: alertSliceReducer } = alertSlice;
