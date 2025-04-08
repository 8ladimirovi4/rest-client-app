import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ApiRequestState } from './types';

const initialState: ApiRequestState = {
  query: [{ key: '', value: '' }],
  body: '',
  method: 'GET',
  headers: [{ key: '', value: '' }],
  variables: [{ key: '', value: '' }],
  textMode: false,
  status: 'N/A',
  id: '',
  browserUrl: '',
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
    setVariables: (
      state: ApiRequestState,
      {
        payload,
      }: PayloadAction<{ variables: { key: string; value: string }[] }>
    ) => {
      const { variables } = payload;
      state.variables = variables;
    },
    setApiId: (
      state: ApiRequestState,
      {
        payload,
      }: PayloadAction<{ id: string }>
    ) => {
      const { id } = payload;
      state.id = id;
    },
    setApiStatus: (
      state: ApiRequestState,
      {
        payload,
      }: PayloadAction<{ status: string }>
    ) => {
      const { status } = payload;
      state.status = status;
    },
    setHistoryState: (
        _,
      {
        payload,
      }: PayloadAction<ApiRequestState | {}>
    ) => {
      if (Object.keys(payload).length === 0) {
        return initialState; 
      }
      return {
        ...initialState, 
        ...payload,      
      };
    },
  },
});

export const { actions: apiRequestActions } = apiRequestSlice;
export const { reducer: apiRequestSliceReducer } = apiRequestSlice;
