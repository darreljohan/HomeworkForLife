import { Request } from "express";

export type AuthRequest = {
  email: string;
  password: string;
};

export type UserData = {
  displayName: string;
  birthDate: string;
  ageExpentancy: number;
};

export type AuthResponse = {
  id: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
  config?: UserData;
};

export type UserAuth = {
  id: string;
  email: string;
};
export interface UserAuthRequest extends Request {
  user?: UserAuth;
}

export type UserRefreshTokenRequest = {
  refreshToken: string;
};

export type UserRefreshTokenResponse = {
  accessToken: string;
};
