enum myRole {
  admin,
  user,
}

export interface User {
  username: string;
  email?: string;
  password: string;
  // role?: myRole;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
