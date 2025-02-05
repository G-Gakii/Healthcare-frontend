export interface User {
  username: string;
  email?: string;
  password: string;
  role?: 'admin' | 'user';
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
