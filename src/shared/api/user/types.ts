export interface UserResponse {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface SignInRequest {
  login: string;
  password: string;
}

// TODO: Типизировать
export interface SignInResponse {}
