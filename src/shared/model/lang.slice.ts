import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LangState } from './types';
import { LANGS } from 'shared/constants/langs';

const initialState: LangState = {
  lang: 'en',
  langs: LANGS,
};

const langSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLang: (state: LangState, action: PayloadAction<{ value: string }>) => {
      const { value } = action.payload;
      state.lang = value;
    },
  },
});

export const { actions: langActions } = langSlice;
export const { reducer: langSliceReducer } = langSlice;
