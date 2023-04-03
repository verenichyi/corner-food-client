export interface RegisterUserDto {
  username: string;
  password: string;
  email: string;
}
export interface FormRegisterUserDto {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginUserDto {
  password: string;
  email: string;
}
