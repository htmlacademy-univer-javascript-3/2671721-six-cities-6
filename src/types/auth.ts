export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export interface AuthError {
  type: string;
  message: string;
}
