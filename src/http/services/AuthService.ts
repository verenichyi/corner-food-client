import { $api, $authApi } from '../api';
import { AxiosResponse } from 'axios';
import { LoginUserDto, RegisterUserDto } from '../../models/User/UserDto';
import { AuthResponse } from '../../models/Auth/authResponse';
import { CredentialResponse } from '@react-oauth/google';

const signUpPath = '/auth/registration';
const signInPath = '/auth/login';
const googleAuthPath = '/auth/google';
const checkPath = '/auth/check';

export default class AuthService {
  static async signUp(body: RegisterUserDto): Promise<AxiosResponse<AuthResponse>> {
    return $api.post(signUpPath, body);
  }

  static async signIn(body: LoginUserDto): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(signInPath, body);
  }

  static async googleAuth(
    credentialResponse: CredentialResponse,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(googleAuthPath, { token: credentialResponse.credential });
  }

  static async check(): Promise<AxiosResponse<AuthResponse>> {
    return $authApi.get<AuthResponse>(checkPath);
  }
}
