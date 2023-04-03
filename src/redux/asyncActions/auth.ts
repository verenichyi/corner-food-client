import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../http/services/AuthService';
import { LoginUserDto, RegisterUserDto } from '../../models/User/UserDto';
import { AuthResponse } from '../../models/Auth/authResponse';
import { handleAxiosError } from '../../utils/handleAxiosErrors';
import { CredentialResponse } from '@react-oauth/google';

export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterUserDto,
  { rejectValue: string }
>('auth/registration', async (body, { rejectWithValue }) => {
  try {
    const { data } = await AuthService.signUp(body);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const loginUser = createAsyncThunk<AuthResponse, LoginUserDto, { rejectValue: string }>(
  'auth/login',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.signIn(body);
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const loginWithGoogle = createAsyncThunk<
  AuthResponse,
  CredentialResponse,
  { rejectValue: string }
>('auth/loginWithGoogle', async (credentialResponse, { rejectWithValue }) => {
  try {
    const { data } = await AuthService.googleAuth(credentialResponse);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const checkAuth = createAsyncThunk<AuthResponse, void, { rejectValue: string }>(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.check();
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
