import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse } from '../../models/Auth/authResponse';
import { User } from '../../models/User/User';
import { checkAuth, loginUser, registerUser } from '../asyncActions/auth';
import { localStorageTokenKey } from '../../constants/auth';

interface State {
  user: User | null;
  isAuthorized: boolean;
  loading: boolean;
  success: boolean;
  error: string | null;
}

export const initialState: State = {
  isAuthorized: false,
  user: null,
  loading: false,
  success: false,
  error: null,
};

const isError = (action: AnyAction) => action.type.endsWith('rejected');

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(localStorageTokenKey);
      state.user = null;
      state.isAuthorized = false;
    },
    resetError: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.loading = false;
      localStorage.setItem(localStorageTokenKey, action.payload.token);
      state.user = action.payload.user;
      state.isAuthorized = true;
      state.success = true;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.loading = false;
      localStorage.setItem(localStorageTokenKey, action.payload.token);
      state.user = action.payload.user;
      state.isAuthorized = true;
      state.success = true;
    });

    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(checkAuth.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.loading = false;
      localStorage.setItem(localStorageTokenKey, action.payload.token);
      state.user = action.payload.user;
      state.isAuthorized = true;
    });

    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

export const authActions = auth.actions;
export default auth.reducer;
