// Auth/Login User Types
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message?: string;
  _id: string;
  name: string;
  email: string;
}

export interface UserPayload {
  _id: string;
  name: string;
  email: string;
}

export interface AuthState {
  userInfo: UserPayload | null;
}
