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

export interface LogoutResponse {
  message: string;
}

// Register/Sign Up Types
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface RegsterResponse {
  message?: string;
  _id: string;
  name: string;
  email: string;
}
// Update Profile Types
export interface UpdateData {
  name?: string;
  email?: string;
  password?: string;
}

export interface UpdateResponse {
  message?: string;
  _id: string;
  name: string;
  email: string;
}
