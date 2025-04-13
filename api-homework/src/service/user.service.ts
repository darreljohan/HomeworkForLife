import { AuthError } from "@supabase/supabase-js";
import supabase from "../application/database";
import { logger } from "../application/log";
import { Validation } from "../application/validation";
import {
  AuthRequest,
  AuthResponse,
  UserAuth,
  UserData,
  UserRefreshTokenRequest,
  UserRefreshTokenResponse,
} from "../model/user.model";
import { UserValidationService } from "../validation/user.validation";
import { ResponseError } from "../error/response.error";

export class UserService {
  static async register(request: AuthRequest): Promise<AuthResponse> {
    const registerRequest = Validation.validate(
      UserValidationService.USER_ACCOUNT,
      request
    );

    logger.info({
      location: "userService.register",
      message: "contacting supabase to register account",
      body: request.email,
    });

    const { data, error } = await supabase.auth.signUp({
      email: registerRequest.email,
      password: registerRequest.password,
      options: {
        data: {
          displayName: "{Default name}",
          birthDate: new Date(2000, 1, 1).toISOString(),
          ageExpentancy: 60,
        },
      },
    });

    if (error) {
      throw new ResponseError(error.status!, error.message);
    }
    if (!data.user || !data.user.id || !data.user.email) {
      throw new ResponseError(
        500,
        "User registration failed: No user data returned"
      );
    }

    logger.info({
      location: "userService.register",
      message: "Success registering accoung to supabase",
      body: data.user.email,
    });

    const response: AuthResponse = {
      id: data.user.id,
      email: data.user.email,
    };

    return response;
  }

  static async login(request: AuthRequest): Promise<AuthResponse> {
    const loginRequest = Validation.validate(
      UserValidationService.USER_ACCOUNT,
      request
    );

    logger.info({
      location: "userService.login",
      message: "contacting supabase to login account",
      body: request.email,
    });

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginRequest.email,
      password: loginRequest.password,
    });

    if (error) {
      throw new AuthError(error.message, error.status);
    }

    if (!data.user || !data.session) {
      throw new ResponseError(
        500,
        "User login failed: No user data or session returned"
      );
    }

    logger.info({
      location: "userService.login",
      message: "Success generating user session",
      body: data.user.email,
    });

    const response: AuthResponse = {
      id: data.user.id || "",
      email: data.user.email || "",
      accessToken: data.session.access_token || "",
      refreshToken: data.session.refresh_token || "",
      config: data.user.user_metadata as UserData,
    };

    return response;
  }

  static async refreshToken(
    request: UserRefreshTokenRequest
  ): Promise<UserRefreshTokenResponse> {
    const refreshRequest = Validation.validate(
      UserValidationService.REFRESH_TOKEN,
      request
    );

    logger.info({
      location: "userService.refreshToken",
      message: "contacting supabase to refresh user access token",
    });

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshRequest.refreshToken,
    });

    if (error) {
      throw new AuthError(error.message, error.status);
    }
    if (!data.session?.access_token) {
      throw new ResponseError(
        500,
        "Refresh user token failed: No user token returned"
      );
    }

    logger.info({
      location: "UserService.refreshToken",
      message: `Success Refreshing user access token`,
    });

    return {
      accessToken: data.session?.access_token,
    };
  }

  static async updateUserConfig(
    user: UserAuth,
    request: UserData,
    refreshToken: string
  ): Promise<AuthResponse> {
    const updateRequest = Validation.validate(
      UserValidationService.USER_CONFIG,
      request
    );

    logger.info({
      location: "userService.updateUserConfig",
      message: "contacting supabase to refresh user access token",
      body: { user: user.id, request: updateRequest },
    });

    const { data, error } = await supabase.auth.updateUser({
      data: updateRequest,
    });

    const refreshAccessToken = await this.refreshToken({
      refreshToken: refreshToken,
    });

    if (error) {
      throw new ResponseError(400, error.message);
    }

    logger.info({
      location: "userService.updateUserConfig",
      message: "Success Update User Data in Supabase",
      body: data.user.user_metadata,
    });

    const response: AuthResponse = {
      id: user.id,
      email: user.email,
      accessToken: refreshAccessToken.accessToken,
      config: data.user.user_metadata as UserData,
    };

    return response;
  }
}
