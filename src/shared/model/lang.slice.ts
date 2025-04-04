import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LangState } from './types';

const initialState: LangState = {
  lang: 'ru',
  langs: [
    { id: '1', value: 'ru', label: 'ru' },
    { id: '2', value: 'en', label: 'en' },
  ],
};

const langSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLang: (state: LangState, action: PayloadAction<{ lang: string }>) => {
      const { lang } = action.payload;
      state.lang = lang;
    },
  },
});

export const { actions: langActions } = langSlice;
export const { reducer: langSliceReducer } = langSlice;
