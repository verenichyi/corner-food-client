import { User } from '../User/User';

export type AuthResponse = {
  token: string;
  user: User;
};
