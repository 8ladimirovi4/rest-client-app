import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ApiRequestState } from './types';

const initialState: ApiRequestState = {
  url: '',
  query: [],
  body: '',
  method: 'GET',
  headers: [],
  variables: [],
  textMode: false,
  type: '',
  status: null,
  id: '',
  browserUrl: '',
  triggerFetch: false,
};

const apiRequestSlice = createSlice({
  name: 'apiRequest',
  initialState,
  reducers: {
    setBrowserUrl: (
      state: ApiRequestState,
      { payload }: PayloadAction<{ browserUrl: string }>
    ) => {
      const { browserUrl } = payload;
      state.browserUrl = browserUrl;
    },
    setMethod: (
      state: ApiRequestState,
      { payload }: PayloadAction<{ method: string }>
    ) => {
      const { method } = payload;
      state.method = method;
    },
    setQuery: (
      state: ApiRequestState,
      { payload }: PayloadAction<{ query: { key: string; value: string }[] }>
    ) => {
      const { query } = payload;
      state.query = query;
    },
    setBody: (
      state: ApiRequestState,
      { payload }: PayloadAction<{ body: string }>
    ) => {
      const { body } = payload;
      state.body = body;
    },
    setHeaders: (
      state: ApiRequestState,
      { payload }: PayloadAction<{ headers: { key: string; value: string }[] }>
    ) => {
      const { headers } = payload;
      state.headers = headers;
    },
    setVariables:(
      state: ApiRequestState,
      { payload }: PayloadAction<{ variables: { key: string; value: string }[] }>
    ) => {
      const { variables } = payload;
      state.variables = variables;
    },
    setTriggerFetch: (state: ApiRequestState) => {
      state.triggerFetch = !state.triggerFetch;
    },
  },
});

export const { actions: apiRequestActions } = apiRequestSlice;
export const { reducer: apiRequestSliceReducer } = apiRequestSlice;
