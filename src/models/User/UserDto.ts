export interface RegisterUserDto {
  username: string;
  password: string;
  email: string;
}

export interface LoginUserDto {
  password: string;
  email: string;
}
