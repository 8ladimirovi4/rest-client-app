import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string | null;
  uid: string | null;
  email: string | null;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isUserLoggedIn: boolean;
  isAuthChecked: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isUserLoggedIn: false,
  isAuthChecked: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.isUserLoggedIn = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isUserLoggedIn = false;
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
