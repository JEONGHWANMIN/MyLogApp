export interface AccessTokenPayload {
  userId: number;
  email: string;
  nickname: string;
  iat: number;
  exp: number;
}

export interface RefreshTokenPayload {
  userId: number;
  email: string;
  nickname: string;
  refreshToken: string;
  iat: number;
  exp: number;
}
