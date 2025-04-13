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

export type RefreshResponse = {
  accessToken: string;
};
